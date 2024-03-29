import { AuthScreens } from '@navigation/Routes'
import { useTheme } from '@react-navigation/native'
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
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	TouchableOpacity,
	View,
} from 'react-native'
import * as Notifications from 'expo-notifications'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker'
import { sideMargin } from '@constants/Layout'
import Toast from 'react-native-toast-message'
import { Header } from '@react-navigation/stack'

const NB_STEPS = 3

type SignUpScreenProps = {
	navigation: AuthNavigationProp<AuthScreens.SignIn>
}

const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
	const [isLoading, setLoading] = useState(false)
	const { colors } = useTheme()
	const { bottom } = useSafeAreaInsets()

	const [mediaStatus, mediaRequestPermission] =
		ImagePicker.useMediaLibraryPermissions()
	const [cameraStatus, cameraRequestPermission] =
		ImagePicker.useCameraPermissions()

	const [currentStep, setCurrentStep] = useState<number>(0)
	const width = (145 / (NB_STEPS - 1)) * currentStep

	useEffect(() => {
		if (currentStep !== 3) return

		if (!mediaStatus || !cameraStatus) return

		mediaRequestPermission()
		cameraRequestPermission()
	}, [currentStep])

	navigation.setOptions({
		headerLeft: () => (
			<View style={{ marginLeft: sideMargin }}>
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
			<View style={{ marginRight: sideMargin }}>
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
			avatar: null,
		},
	})

	const onSubmit = async ({
		email,
		username,
		password,
		avatar = null,
	}: UserSignUp) => {
		try {
			setLoading(true)
			const expoToken = await Notifications.getExpoPushTokenAsync()
			const user = await createUser(
				username,
				email.toLowerCase(),
				password,
				avatar,
				expoToken.data
			)
			navigation.navigate(AuthScreens.Auth)
			Toast.show({
				text1: `Bienvenue ${username}`,
				text2: `Valide ton compte par mail puis connecte toi.`,
			})
		} catch (error) {}
		setLoading(false)
	}

	// const onPressOpenMedia = async () => {
	// 	let selectedAvatar = await ImagePicker.launchImageLibraryAsync({
	// 		mediaTypes: ImagePicker.MediaTypeOptions.Images,
	// 		allowsEditing: true,
	// 		aspect: [1, 1],
	// 		quality: 1,
	// 	})

	// 	if (selectedAvatar.cancelled) {
	// 		return
	// 	}

	// 	console.log('avatar', selectedAvatar)

	// 	try {
	// 		await addMedia('avatar', {
	// 			uri: selectedAvatar.base64 || selectedAvatar.uri,
	// 			type: selectedAvatar.type || 'image',
	// 			name: 'avatar',
	// 		})
	// 	} catch (error: any) {
	// 		Toast.show({
	// 			type: 'error',
	// 			text1: "Oups une erreur s'est produite",
	// 			text2: error?.['hydra:description'],
	// 		})
	// 	}
	// }

	// const onPressOpenCamera = async () => {
	// 	let result = await ImagePicker.launchCameraAsync({
	// 		mediaTypes: ImagePicker.MediaTypeOptions.Images,
	// 		allowsEditing: true,
	// 		aspect: [1, 1],
	// 		quality: 1,
	// 	})
	// 	console.log(result)

	// 	// const image = result as File

	// 	addMedia('avatar', result)
	// }

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={Header.HEIGHT + 50}
		>
			<ScrollView
				keyboardShouldPersistTaps='handled'
				contentContainerStyle={{
					flex: 1,
					paddingHorizontal: sideMargin,
					paddingTop: 40,
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
								<View style={{ marginBottom: bottom + 20 }}>
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
													returnKeyType='next'
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
									Elle nous servira pour valider ton compte.
								</Text>
							</View>
							<View>
								<View style={{ marginBottom: bottom + 20 }}>
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
													returnKeyType='next'
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
									Cela permettra de sécuriser ton compte pour que tout le monde ne voit pas tes dépenses. On évite "azerty", "loulou" ou "123456" 🙅‍♂️.
								</Text>
							</View>
							<View>
								<View style={{ marginBottom: bottom + 20 }}>
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
													returnKeyType='next'
													autoFocus
												/>
												<View>
													<Button
														size='large'
														disabled={!isDirty || invalid || isLoading}
														onPress={handleSubmit(onSubmit)}
													>
														{isLoading ? 'Chargement' : "M'inscrire"}
													</Button>
												</View>
											</>
										)}
										name='password'
									/>
								</View>
							</View>
						</View>
					</>
				)}

				{/* {currentStep === 3 && (
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
									Envoie ton plus beau sourire BG.
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
													<View style={{ alignItems: 'center' }}>
														{!value ? (
															<Pressable onPress={onPressOpenMedia}>
																<View
																	style={{
																		height: 200,
																		width: 200,
																		borderRadius: 100,
																		backgroundColor: colors.card,
																		justifyContent: 'center',
																		alignItems: 'center',
																	}}
																>
																	<Text style={{ fontSize: 50 }}>📷</Text>
																	<View style={{ height: 10 }} />
																</View>
															</Pressable>
														) : (
															<Image
																style={{
																	height: 200,
																	width: 200,
																	borderRadius: 100,
																	backgroundColor: colors.card,
																}}
																source={{ uri: value }}
															/>
														)}
													</View>
												</View>

												<View>
													<Button
														size='large'
														disabled={!isDirty || invalid || isLoading}
														onPress={handleSubmit(onSubmit)}
													>
														{isLoading ? 'Chargement' : "M'inscrire"}
													</Button>
												</View>
											</View>
										)}
										name='avatar'
									/>
								</View>
							</View>
						</View>
					</>
				)} */}
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

export default SignUpScreen
