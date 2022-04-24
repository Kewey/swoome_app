import { AuthScreens } from '@navigation/Routes'
import { useTheme } from '@react-navigation/native'
import { setToken, setUser } from '@redux/user.reducer'
import { createUser } from '@services/userService'
import { AuthNavigationProp } from '@types/routes'
import { UserSignUp } from '@types/user'
import Button from '@ui/Button'
import CircleButton from '@ui/CircleButton'
import FredokaText from '@ui/FredokaText'
import Text from '@ui/Text'
import TextInput from '@ui/TextInput'
import { NavArrowLeft } from 'iconoir-react-native'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
// import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker'
import { File } from '@types/Media'
import { addMedia } from '@services/mediaService'

const NB_STEPS = 4

type SignUpScreenProps = {
	navigation: AuthNavigationProp<AuthScreens.SignIn>
}

const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
	const [isLoading, setLoading] = useState(false)
	const { colors } = useTheme()

	const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions()

	const [currentStep, setCurrentStep] = useState<number>(0)
	const [avatar, setAvatar] = useState<File | null>(null)
	const width = (145 / (NB_STEPS - 1)) * currentStep

	useEffect(() => {
		if (currentStep !== 3) return

		if (!status) return

		requestPermission()
	}, [currentStep])

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
					onPress={() => navigation.navigate(AuthScreens.SignIn)}
				>
					<Text weight='bold'>Déjà un compte ?</Text>
				</TouchableOpacity>
			</View>
		),
	})

	const { control, handleSubmit } = useForm<UserSignUp>({
		mode: 'onChange',
		defaultValues: {
			username: '',
			email: '',
			password: '',
			avatar: '',
		},
	})

	const onSubmit = async ({ email, username, password }: UserSignUp) => {
		try {
			setLoading(true)
			const user = await createUser(username, email, password)
			console.log('user', user)
		} catch (error) {}
		setLoading(false)
	}

	const onPressSelectMedia = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		})

		const image = result as File
		const response = await fetch(image.uri)
		const blob = await response.blob()

		console.log(blob)

		addMedia('avatar', blob)
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<KeyboardAwareScrollView
				contentContainerStyle={{
					flex: 1,
					paddingHorizontal: 30,
					paddingBottom: 15,
				}}
			>
				<View style={{ marginBottom: 40, alignItems: 'center' }}>
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
				{currentStep === 0 && (
					<>
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
													<Text style={{ marginBottom: 5 }}>
														{error.message}
													</Text>
												)}
												<TextInput
													style={{
														marginBottom: 10,
													}}
													placeholder='Ex. Michel'
													onBlur={onBlur}
													onChangeText={onChange}
													value={value}
													autoFocus
												/>
												<Button
													size='large'
													disabled={!isDirty || invalid}
													onPress={() => {
														setCurrentStep(currentStep + 1)
													}}
												>
													Continuer
												</Button>
											</>
										)}
										name='username'
									/>
								</View>
							</View>
						</View>
					</>
				)}

				{currentStep === 1 && (
					<>
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
											pattern: {
												value:
													/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
												message: 'Ca ne ressemble pas à un mail 😳',
											},
										}}
										render={({
											field: { onChange, onBlur, value },
											fieldState: { isDirty, invalid, error },
										}) => (
											<>
												{error && (
													<Text style={{ marginBottom: 5 }}>
														{error.message}
													</Text>
												)}
												<TextInput
													style={{
														marginBottom: 10,
													}}
													placeholder='Ex. ilovepotatoes@mail.com'
													onBlur={onBlur}
													onChangeText={onChange}
													value={value}
													keyboardType='email-address'
													autoFocus
												/>
												<Button
													size='large'
													disabled={!isDirty || invalid}
													onPress={() => setCurrentStep(currentStep + 1)}
												>
													Continuer
												</Button>
											</>
										)}
										name='email'
									/>
								</View>
							</View>
						</View>
					</>
				)}

				{currentStep === 2 && (
					<>
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
											minLength: {
												value: 6,
												message:
													'Pour un max de sécurité il faut 6 caractères minimun',
											},
										}}
										render={({
											field: { onChange, onBlur, value },
											fieldState: { isDirty, invalid, error },
										}) => (
											<>
												{error && (
													<Text style={{ marginBottom: 5 }}>
														{error.message}
													</Text>
												)}
												<TextInput
													style={{
														marginBottom: 10,
													}}
													placeholder='TuTr0uv3r4_P4s'
													onBlur={onBlur}
													onChangeText={onChange}
													value={value}
													secureTextEntry
													autoFocus
												/>
												<Button
													size='large'
													disabled={!isDirty || invalid || isLoading}
													onPress={() => setCurrentStep(currentStep + 1)}
												>
													Continuer
												</Button>
											</>
										)}
										name='password'
									/>
								</View>
							</View>
						</View>
					</>
				)}

				{currentStep === 3 && (
					<>
						<View style={{ flex: 1, justifyContent: 'center' }}>
							<View style={{ marginBottom: 50 }}>
								<FredokaText
									style={{
										fontSize: 30,
										textAlign: 'center',
										marginBottom: 20,
									}}
								>
									A quoi tu ressembles ?
								</FredokaText>
								<Text
									style={{ textAlign: 'center', opacity: 0.55, fontSize: 13 }}
								>
									Envoie ton plus beau sourire mon gros BG.
								</Text>
							</View>
							<View style={{ flex: 1 }}>
								<View style={{ marginBottom: 15, flex: 1 }}>
									<Controller
										control={control}
										rules={{
											required: true,
											pattern: {
												value:
													/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
												message: 'Ca ne ressemble pas à un mail 😳',
											},
										}}
										render={({
											field: { onChange, onBlur, value },
											fieldState: { isDirty, invalid, error },
										}) => (
											<View style={{ flex: 1 }}>
												<View style={{ flex: 1 }}>
													<Button onPress={onPressSelectMedia}>
														Choisir une image
													</Button>
												</View>

												<Button
													size='large'
													disabled={!isDirty || invalid || isLoading}
													onPress={handleSubmit(onSubmit)}
												>
													{isLoading ? 'Chargement' : "M'inscrire"}
												</Button>
											</View>
										)}
										name='avatar'
									/>
								</View>
							</View>
						</View>
					</>
				)}
			</KeyboardAwareScrollView>
		</SafeAreaView>
	)
}

export default SignUpScreen
