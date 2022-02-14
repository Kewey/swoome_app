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

type GroupCreateProps = {
	navigation: GroupNavigationProp<GroupScreens.Create>
}

const NB_STEPS = 2

// Pass to API
const DATA = [
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1',
		title: 'Colacation',
		icon: '🏠',
	},
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba2',
		title: 'Vie en couple',
		icon: '❤️',
	},
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba3',
		title: 'Voyage',
		icon: '✈️',
	},
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba4',
		title: 'Projet',
		icon: '💎',
	},
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba5',
		title: 'Evenement',
		icon: '🎊',
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
		headerRight: () => (
			<View style={{ marginRight: 30 }}>
				<TouchableOpacity
					onPress={() => navigation.navigate(GroupScreens.Join)}
				>
					<Text weight='bold'>Rejoindre un groupe</Text>
				</TouchableOpacity>
			</View>
		),
	})

	const { control, watch, setValue, handleSubmit } = useForm<GroupCreate>()

	const onSubmit = (data: GroupCreate) => {
		setLoading(true)
		try {
		} catch (error) {}
		setLoading(false)
		console.log(`data`, data)
		// TODO create group + add to user

		// dispatch(setToken('TODO'))
	}

	const renderItem = ({ item }: any) => {
		const backgroundColorIcon =
			item.id === watch('type') ? colors.card : LightGrey
		const backgroundColorCard =
			item.id === watch('type') ? LightGrey : colors.card
		const color = item.id === watch('type') ? Cyan : colors.text

		return (
			<TouchableWithoutFeedback onPress={() => setValue('type', item.id)}>
				<View
					style={{
						backgroundColor: backgroundColorCard,
						flexDirection: 'row',
						paddingHorizontal: 20,
						paddingVertical: 14,
						borderRadius: borderRadius,
						alignItems: 'center',
						marginBottom: 15,
					}}
				>
					<View
						style={{
							backgroundColor: backgroundColorIcon,
							height: 60,
							width: 60,
							borderRadius: 30,
							marginRight: 20,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Text style={{ fontSize: 20 }}>{item.icon}</Text>
					</View>
					<Text weight='bold' style={{ color }}>
						{item.title}
					</Text>
				</View>
			</TouchableWithoutFeedback>
		)
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
					<FlatList
						data={DATA}
						renderItem={renderItem}
						contentContainerStyle={{ paddingHorizontal: 30 }}
						keyExtractor={(item) => item.id}
					/>
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
