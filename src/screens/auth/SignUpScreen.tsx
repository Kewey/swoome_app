import { AuthScreens } from '@navigation/Routes'
import { useTheme } from '@react-navigation/native'
import { setToken } from '@redux/reducers/user.reducer'
import { AuthNavigationProp } from '@types/routes'
import { UserSignUp } from '@types/user'
import Button from '@ui/Button'
import CircleButton from '@ui/CircleButton'
import FredokaText from '@ui/FredokaText'
import Text from '@ui/Text'
import TextInput from '@ui/TextInput'
import { NavArrowLeft } from 'iconoir-react-native'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch } from 'react-redux'

const NB_STEPS = 3

type SignUpScreenProps = {
	navigation: AuthNavigationProp<AuthScreens.SignIn>
}

const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
	const { colors } = useTheme()
	const dispatch = useDispatch()

	const [currentStep, setStep] = useState<number>(0)
	const width = (145 / (NB_STEPS - 1)) * currentStep

	const {
		control,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<UserSignUp>()

	const onSubmit = (data: UserSignUp) => {
		console.log(`data`, data)
		// TODO login into dispatch user + token

		dispatch(setToken('TODO'))
	}

	function isDisabled() {
		if (
			(currentStep === 0 && !watch('name')) ||
			(currentStep === 1 && !watch('email')) ||
			(currentStep === 2 && !watch('password'))
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

	return (
		<KeyboardAwareScrollView
			contentContainerStyle={{
				flex: 1,
				padding: 30,
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
					onPress={() => navigation.navigate(AuthScreens.SignIn)}
				>
					<Text weight='bold'>Déjà un compte ?</Text>
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
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<View style={{ flex: 1, marginBottom: 50 }}>
						<FredokaText
							style={{ fontSize: 30, textAlign: 'center', marginBottom: 20 }}
						>
							Comment tes amis t’appellent-ils ?
						</FredokaText>
						<Text style={{ textAlign: 'center', opacity: 0.55, fontSize: 13 }}>
							Connaitre ton prénom va nous permettre de personnaliser ton
							expérience.
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
										placeholder='Ex. Michel'
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

			{currentStep === 1 && (
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<View style={{ flex: 1, marginBottom: 50 }}>
						<FredokaText
							style={{ fontSize: 30, textAlign: 'center', marginBottom: 20 }}
						>
							Quelle est ton adresse mail ?
						</FredokaText>
						<Text style={{ textAlign: 'center', opacity: 0.55, fontSize: 13 }}>
							Connaitre ton prénom va nous permettre de personnaliser ton
							expérience.
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
										placeholder='Ex. ilovepotatoes@mail.com'
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										autoFocus
										keyboardType='email-address'
									/>
								)}
								name='email'
							/>
							{errors.email && <Text>This is required.</Text>}
						</View>
					</View>
				</View>
			)}

			{currentStep === 2 && (
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<View style={{ flex: 1, marginBottom: 50 }}>
						<FredokaText
							style={{ fontSize: 30, textAlign: 'center', marginBottom: 20 }}
						>
							Choisis un mot de passe
						</FredokaText>
						<Text style={{ textAlign: 'center', opacity: 0.55, fontSize: 13 }}>
							Connaitre ton prénom va nous permettre de personnaliser ton
							expérience.
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
										placeholder='TuTr0uv3r4_P4s'
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										autoFocus
										secureTextEntry
									/>
								)}
								name='password'
							/>
							{errors.password && <Text>This is required.</Text>}
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
					onPress={handleSubmit(onSubmit)}
				>
					M'inscrire
				</Button>
			)}
		</KeyboardAwareScrollView>
	)
}

export default SignUpScreen
