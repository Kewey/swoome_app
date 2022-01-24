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
	const { colors } = useTheme()
	const dispatch = useDispatch()

	const [currentStep, setStep] = useState<number>(0)
	const width = (145 / (NB_STEPS - 1)) * currentStep

	const {
		control,
		watch,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<GroupCreate>()

	const onSubmit = (data: GroupCreate) => {
		console.log(`data`, data)
		// TODO create group + add to user

		// dispatch(setToken('TODO'))
	}

	function isDisabled() {
		if (
			(currentStep === 0 && !watch('type')) ||
			(currentStep === 1 && !watch('name'))
		) {
			return true
		}
	}

	function goNextStep() {
		if (currentStep === NB_STEPS - 1) {
			return
		}
		setStep(currentStep + 1)
	}

	function goPrevStep() {
		if (currentStep === 0) {
			return navigation.goBack()
		}
		setStep(currentStep - 1)
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
		<View
			style={{
				flex: 1,
			}}
		>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<CircleButton onPress={() => goPrevStep()}>
					<NavArrowLeft height={25} width={25} color={colors.text} />
				</CircleButton>

				<TouchableOpacity
					onPress={() => navigation.navigate(GroupScreens.Join)}
				>
					<Text weight='bold'>Déjà une maison ?</Text>
				</TouchableOpacity>
			</View>
			<View style={{ marginTop: 30, marginBottom: 40, alignItems: 'center' }}>
				<View
					style={{
						height: 5,
						width: 145,
						backgroundColor: colors.border,
						borderRadius: 3,
					}}
				>
					<View
						// animate={{ width }}
						style={{
							width,
							height: 5,
							borderRadius: 3,
							backgroundColor: colors.primary,
						}}
					/>
				</View>
			</View>

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
						keyExtractor={(item) => item.id}
						extraData={watch('type')}
					/>
				</View>
			)}

			{currentStep === 1 && (
				<View style={{ flex: 1, justifyContent: 'center' }}>
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
									required: true,
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										style={{
											marginBottom: 5,
										}}
										placeholder='Ex. Maison du bonheur'
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										autoFocus
									/>
								)}
								name='name'
							/>
							{errors.name && <Text>This is required.</Text>}
						</View>
					</View>
				</View>
			)}

			{currentStep !== NB_STEPS - 1 && (
				<Button
					size='large'
					disabled={isDisabled()}
					onPress={() => goNextStep()}
				>
					Continuer
				</Button>
			)}
			{currentStep === NB_STEPS - 1 && (
				<Button
					size='large'
					disabled={isDisabled()}
					variant='secondary'
					onPress={handleSubmit(onSubmit)}
				>
					Créer ma maison
				</Button>
			)}
		</View>
	)
}
