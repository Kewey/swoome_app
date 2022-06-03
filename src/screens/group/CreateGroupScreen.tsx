import {
	FlatList,
	KeyboardAvoidingView,
	Pressable,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { GroupNavigationProp } from '@types/routes'
import { GroupScreens } from '@navigation/Routes'
import { useTheme } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { Group, GroupCreate, GroupType } from '@types/Group'
import { Controller, useForm } from 'react-hook-form'
import CircleButton from '@ui/CircleButton'
import { NavArrowLeft } from 'iconoir-react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Text from '@ui/Text'
import FredokaText from '@ui/FredokaText'
import TextInput from '@ui/TextInput'
import Button from '@ui/Button'
import { Blue, Cyan, Light, LightGrey, White } from '@constants/Colors'
import { borderRadius } from '@styles/layout'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { setGroup } from '@redux/group.reducer'
import { createGroup, getGroupType } from '@services/groupService'
import { sideMargin } from '@constants/Layout'

type GroupCreateProps = {
	navigation: GroupNavigationProp<GroupScreens.Create>
}

export interface SelectButton {
	id: string
	title: string
	icon: string
	selected: boolean
}

export default function GroupCreateScreen({ navigation }: GroupCreateProps) {
	const [currentStep, setCurrentStep] = useState<number>(0)
	const [isLoading, setLoading] = useState(false)
	const [groupsType, setGroupsType] = useState<GroupType[]>([])
	const { colors } = useTheme()
	const dispatch = useDispatch()
	const { bottom } = useSafeAreaInsets()

	navigation.setOptions({
		headerLeft: () => (
			<View style={{ marginLeft: 30 }}>
				<CircleButton
					backgroundColor={colors.card}
					onPress={() => {
						if (currentStep === 0) {
							navigation.goBack()
						}
						setCurrentStep(currentStep - 1)
					}}
				>
					<NavArrowLeft height={25} width={25} color={colors.text} />
				</CircleButton>
			</View>
		),
	})

	const { control, setValue, handleSubmit } = useForm<GroupCreate>()

	useEffect(() => {
		getGroupType().then(({ groupsType }) => setGroupsType(groupsType))
	}, [])

	const onSubmit = async ({ name, typeIri }: GroupCreate) => {
		setLoading(true)
		try {
			const newGroup = await createGroup(name, typeIri)
			dispatch(setGroup(newGroup))
		} catch (error) {}
		setLoading(false)
	}

	return (
		<SafeAreaView
			keyboardShouldPersistTaps='handled'
			style={{
				flex: 1,
			}}
		>
			{currentStep === 0 && (
				<>
					<View style={{ paddingHorizontal: sideMargin }}>
						<FredokaText
							style={{ fontSize: 30, textAlign: 'center', marginBottom: 20 }}
						>
							Pour quelle occasion souhaites-tu créer un groupe ?
						</FredokaText>
						<Text
							style={{
								textAlign: 'center',
								opacity: 0.55,
								fontSize: 13,
								marginBottom: 30,
							}}
						>
							Pour commencer à utiliser l’application, tu dois créer ou
							rejoindre une maison.
						</Text>
					</View>

					<ScrollView
						style={{
							paddingHorizontal: sideMargin,
						}}
						contentContainerStyle={{
							paddingBottom: 100,
						}}
					>
						<Controller
							control={control}
							rules={{
								required: true,
							}}
							render={({ field: { value: selectedType } }) => (
								<View>
									{groupsType.map((groupType) => (
										<Pressable
											key={groupType.id}
											style={{
												flexDirection: 'row',
												alignItems: 'center',
												padding: 15,
												marginBottom: 10,
												backgroundColor:
													selectedType === groupType['@id']
														? colors.secondary
														: colors.card,
												borderRadius: 8,
											}}
											onPress={() => setValue('typeIri', groupType['@id'])}
										>
											<CircleButton
												style={{ marginRight: 10 }}
												backgroundColor={colors.background}
											>
												<Text>{groupType.emoji}</Text>
											</CircleButton>
											<FredokaText
												style={{
													color:
														selectedType === groupType['@id']
															? colors.background
															: colors.text,
												}}
											>
												{groupType.name}
											</FredokaText>
										</Pressable>
									))}
								</View>
							)}
							name='typeIri'
						/>
					</ScrollView>

					<View
						style={{
							position: 'absolute',
							bottom: bottom + 20,
							left: sideMargin,
							right: sideMargin,
						}}
					>
						<Button
							size='large'
							onPress={() => setCurrentStep(currentStep + 1)}
						>
							Continuer
						</Button>
					</View>
				</>
			)}

			{currentStep === 1 && (
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						paddingHorizontal: sideMargin,
					}}
				>
					<View style={{ flex: 1, marginBottom: bottom }}>
						<FredokaText
							style={{ fontSize: 30, textAlign: 'center', marginBottom: 20 }}
						>
							Donne un nom à ta maison
						</FredokaText>
						<Text style={{ textAlign: 'center', opacity: 0.55, fontSize: 13 }}>
							Pour commencer à utiliser l’application, tu dois créer ou
							rejoindre une maison.
						</Text>
					</View>
					<View>
						<View style={{ marginBottom: 20 }}>
							<Controller
								control={control}
								rules={{
									required: 'Il nous faut un nom !',
									minLength: {
										value: 2,
										message: 'Ton nom doit faire au moins 2 caractères',
									},
								}}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { invalid, isDirty, error },
								}) => (
									<>
										{error && (
											<Text style={{ marginBottom: 5 }}>{error.message}</Text>
										)}
										<TextInput
											style={{
												marginBottom: 10,
												height: 56,
											}}
											placeholder='Ex. Maison du bonheur'
											onBlur={onBlur}
											onChangeText={onChange}
											value={value}
											autoFocus
										/>
										<Button
											size='large'
											disabled={!isDirty || invalid || isLoading}
											onPress={handleSubmit(onSubmit)}
										>
											{isLoading ? 'Chargement' : 'Créer ma maison'}
										</Button>
									</>
								)}
								name='name'
							/>
						</View>
					</View>
				</View>
			)}
		</SafeAreaView>
	)
}
