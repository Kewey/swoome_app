import { DarkGrey } from '@constants/Colors'
import { AuthScreens } from '@navigation/Routes'
import { setToken, setUser } from '@redux/user.reducer'
import { API } from '@services/apiService'
import { getUser, login } from '@services/userService'
import { AuthNavigationProp } from '@types/routes'
import { UserLogin } from '@types/user'
import Button from '@ui/Button'
import FredokaText from '@ui/FredokaText'
import Text from '@ui/Text'
import TextInput from '@ui/TextInput'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as SecureStore from 'expo-secure-store'
import {
	View,
	TouchableOpacity,
	KeyboardAvoidingView,
	ScrollView,
} from 'react-native'
import { useDispatch } from 'react-redux'

type SignInScreenProps = {
	navigation: AuthNavigationProp<AuthScreens.SignIn>
}

const SignInScreen = ({ navigation }: SignInScreenProps) => {
	const dispatch = useDispatch()
	const [isLoading, setIsLoading] = useState(false)
	const {
		control,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm<UserLogin>()

	const onSubmit = async ({ email, password }: UserLogin) => {
		setIsLoading(true)
		try {
			const { token, refresh_token } = await login(email, password)
			API.defaults.headers['Authorization'] = `Bearer ${token}`
			await SecureStore.setItemAsync('refresh_token', refresh_token)
			const user = await getUser()
			dispatch(setUser(user))
			dispatch(setToken(token))
		} catch (error) {
			console.log('LOGIN |', error)
		}
		setIsLoading(false)
	}

	return (
		<KeyboardAvoidingView
			style={{
				flex: 1,
			}}
		>
			<ScrollView
				style={{ flex: 1, padding: 30 }}
				contentContainerStyle={{ justifyContent: 'center', flexGrow: 1 }}
			>
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<View style={{ marginBottom: 50 }}>
						<FredokaText
							style={{ fontSize: 30, textAlign: 'center', marginBottom: 20 }}
						>
							Bienvenue jeune dépensier ! 👋🏻
						</FredokaText>
						<Text style={{ textAlign: 'center', opacity: 0.55, fontSize: 13 }}>
							Commence par décliner ton identité pour pouvoir te connecter et
							préparer ta meilleure liste de course.
						</Text>
					</View>
					<View>
						<View style={{ marginBottom: 15 }}>
							<Text style={{ marginBottom: 5 }}>Adresse mail</Text>
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
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										style={{
											marginBottom: 5,
										}}
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										autoCapitalize='none'
										keyboardType='email-address'
									/>
								)}
								name='email'
							/>
							{errors.email && <Text>This is required.</Text>}
						</View>

						<View style={{ marginBottom: 25 }}>
							<Text style={{ marginBottom: 5 }}>Mot de passe</Text>
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
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										secureTextEntry
									/>
								)}
								name='password'
							/>
							{errors.password && <Text>This is required.</Text>}
							<TouchableOpacity
								onPress={() => navigation.navigate(AuthScreens.ForgetPassword)}
							>
								<Text
									style={{ marginTop: 5, opacity: 0.5, textAlign: 'right' }}
								>
									Mot de passe oublié ?
								</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View>
						<Button
							size='large'
							disabled={isLoading || (!isDirty && isValid)}
							onPress={handleSubmit(onSubmit)}
						>
							{isLoading ? 'Chargement' : 'Se connecter'}
						</Button>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'center',
								marginTop: 15,
							}}
						>
							<Text>Pas encore de compte ?</Text>
							<TouchableOpacity
								onPress={() => navigation.navigate(AuthScreens.SignUp)}
							>
								<Text style={{ textDecorationLine: 'underline' }}>
									Inscris-toi
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

export default SignInScreen
