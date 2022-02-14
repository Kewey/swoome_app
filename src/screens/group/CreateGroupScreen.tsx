import {
	FlatList,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import React, { useState } from 'react'
import { GroupNavigationProp } from '@types/routes'
import { GroupScreens } from '@navigation/Routes'
import { useTheme } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { GroupCreate } from '@types/Group'
import { Controller, useForm } from 'react-hook-form'
import CircleButton from '@ui/CircleButton'
import { NavArrowLeft } from 'iconoir-react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Text from '@ui/Text'
import FredokaText from '@ui/FredokaText'
import TextInput from '@ui/TextInput'
import Button from '@ui/Button'
import { Cyan, LightGrey, White } from '@constants/Colors'
import { borderRadius } from '@styles/layout'
import { SafeAreaView } from 'react-native-safe-area-context'
import { setGroup } from '@redux/group.reducer'
import { createGroup } from '@services/groupService'

type GroupCreateProps = {
	navigation: GroupNavigationProp<GroupScreens.Create>
}

export interface SelectButton {
	id: string
	title: string
	icon: string
	selected: boolean
}

// Pass to API
const DATA: SelectButton[] = [
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1',
		title: 'Colacation',
		icon: '🏠',
		selected: false,
	},
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba2',
		title: 'Vie en couple',
		icon: '❤️',
		selected: false,
	},
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba3',
		title: 'Voyage',
		icon: '✈️',
		selected: false,
	},
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba4',
		title: 'Projet',
		icon: '💎',
		selected: false,
	},
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba5',
		title: 'Evenement',
		icon: '🎊',
		selected: false,
	},
]

export default function GroupCreateScreen({ navigation }: GroupCreateProps) {
	const [currentStep, setCurrentStep] = useState<number>(0)
	const [isLoading, setLoading] = useState(false)
	const { colors } = useTheme()
	const dispatch = useDispatch()

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

	const { control, setValue, getValues, handleSubmit } = useForm<GroupCreate>()

	const onSubmit = async ({ name, type }: GroupCreate) => {
		setLoading(true)
		try {
			const res = await createGroup(name)
			dispatch(setGroup(res))
		} catch (error) {}
		setLoading(false)
		// TODO create group + add to user

		// dispatch(setToken('TODO'))
	}

	return (
		<SafeAreaView
			style={{
				flex: 1,
				paddingBottom: 30,
			}}
		>
			{currentStep === 0 && (
				<View style={{ flex: 1 }}>
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
						Pour commencer à utiliser l’application, tu dois créer ou rejoindre
						une maison.
					</Text>

					<Button
						size='large'
						style={{ paddingHorizontal: 30 }}
						// disabled={}
						onPress={() => setCurrentStep(currentStep + 1)}
					>
						Continuer
					</Button>
				</View>
			)}

			{currentStep === 1 && (
				<View
					style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 30 }}
				>
					<View style={{ flex: 1, marginBottom: 50 }}>
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
						<View style={{ marginBottom: 15 }}>
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
