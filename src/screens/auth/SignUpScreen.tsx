import { AuthScreens } from '@navigation/Routes'
import { useTheme } from '@react-navigation/native'
import { setToken, setUser } from '@redux/reducers/user.reducer'
import { createUser, login } from '@services/userService'
import { AuthNavigationProp } from '@types/routes'
import { UserSignUp } from '@types/user'
import Button from '@ui/Button'
import FredokaText from '@ui/FredokaText'
import Text from '@ui/Text'
import TextInput from '@ui/TextInput'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'

const NB_STEPS = 3

type SignUpScreenProps = {
	navigation: AuthNavigationProp<AuthScreens.SignIn>
}

const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
	const [isLoading, setLoading] = useState(false)
	const { colors } = useTheme()
	const dispatch = useDispatch()

	const [currentStep, setStep] = useState<number>(0)
	const width = (145 / (NB_STEPS - 1)) * currentStep

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<UserSignUp>({
		mode: 'onChange',
	})

	const onSubmit = async ({ email, username, password }: UserSignUp) => {
		try {
			setLoading(true)
			const { user, token } = await createUser(username, email, password)
			setLoading(false)
			dispatch(setUser(user))
			dispatch(setToken(token))
		} catch (error) {}
	}

	const isUsernameError = currentStep === 0 && errors.username
	const isEmailError = currentStep === 1 && errors.email
	const isPasswordError = currentStep === 2 && errors.password

	function goNextStep() {
		if (currentStep === NB_STEPS - 1) {
			return
		}

		setStep(currentStep + 1)
	}

	// function goPrevStep() {
	// 	if (currentStep === 0) {
	// 		return navigation.goBack()
	// 	}
	// 	setStep(currentStep - 1)
	// }

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<KeyboardAwareScrollView
				contentContainerStyle={{
					flex: 1,
				}}
			>
				<View style={{ marginTop: 30, marginBottom: 10, alignItems: 'center' }}>
					<View
						style={{
							height: 5,
							width: 145,
							backgroundColor: colors.border,
							borderRadius: 3,
						}}
					>
						<View
							style={{
								width,
								height: 5,
								borderRadius: 3,
								backgroundColor: colors.primary,
							}}
						/>
					</View>
				</View>

				<ScrollView contentContainerStyle={{ padding: 30, flex: 1 }}>
					{currentStep === 0 && (
						<View style={{ flex: 1, justifyContent: 'center' }}>
							<View style={{ flex: 1, marginBottom: 50 }}>
								<FredokaText
									style={{
										fontSize: 30,
										textAlign: 'center',
										marginBottom: 20,
									}}
								>
									Comment tes amis t’appellent-ils ?
								</FredokaText>
								<Text
									style={{ textAlign: 'center', opacity: 0.55, fontSize: 13 }}
								>
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
										name='username'
									/>
									{errors.username && <Text>This is required.</Text>}
								</View>
							</View>
						</View>
					)}

					{currentStep === 1 && (
						<View style={{ flex: 1, justifyContent: 'center' }}>
							<View style={{ flex: 1, marginBottom: 50 }}>
								<FredokaText
									style={{
										fontSize: 30,
										textAlign: 'center',
										marginBottom: 20,
									}}
								>
									Quelle est ton adresse mail ?
								</FredokaText>
								<Text
									style={{ textAlign: 'center', opacity: 0.55, fontSize: 13 }}
								>
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
											pattern:
												/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
									style={{
										fontSize: 30,
										textAlign: 'center',
										marginBottom: 20,
									}}
								>
									Choisis un mot de passe
								</FredokaText>
								<Text
									style={{ textAlign: 'center', opacity: 0.55, fontSize: 13 }}
								>
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
											minLength: 6,
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
							disabled={isUsernameError || isEmailError}
							onPress={() => goNextStep()}
						>
							Continuer
						</Button>
					)}
					{currentStep === NB_STEPS - 1 && (
						<Button
							size='large'
							disabled={isPasswordError || isLoading}
							onPress={handleSubmit(onSubmit)}
						>
							{isLoading ? 'Chargement' : "M'inscrire"}
						</Button>
					)}
				</ScrollView>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	)
}

export default SignUpScreen
