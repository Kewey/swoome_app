import { DarkGrey } from '@constants/Colors'
import { AuthScreens } from '@navigation/Routes'
import { setToken } from '@redux/reducers/user.reducer'
import { AuthNavigationProp } from '@types/routes'
import { UserLogin } from '@types/user'
import Button from '@ui/Button'
import CircleButton from '@ui/CircleButton'
import FredokaText from '@ui/FredokaText'
import Text from '@ui/Text'
import TextInput from '@ui/TextInput'
import { NavArrowLeft } from 'iconoir-react-native'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
	View,
	KeyboardAvoidingView,
	Platform,
	TouchableOpacity,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch } from 'react-redux'

type SignInScreenProps = {
	navigation: AuthNavigationProp<AuthScreens.SignIn>
}

const SignInScreen = ({ navigation }: SignInScreenProps) => {
	const dispatch = useDispatch()
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<UserLogin>()

	const onSubmit = (data: UserLogin) => {
		console.log(`data`, data)
		// TODO login into dispatch user + token

		dispatch(setToken('TODO'))
	}

	return (
		<>
			<View>
				<CircleButton onPress={() => navigation.goBack()}>
					<NavArrowLeft height={25} width={25} color={DarkGrey} />
				</CircleButton>
			</View>
			<KeyboardAwareScrollView
				contentContainerStyle={{
					flex: 1,
					padding: 20,
					justifyContent: 'center',
				}}
			>
				<View style={{ marginBottom: 50 }}>
					<FredokaText
						style={{ fontSize: 30, textAlign: 'center', marginBottom: 20 }}
					>
						Bienvenue jeune dépensier ! 👋🏻
					</FredokaText>
					<Text style={{ textAlign: 'center', opacity: 0.5 }}>
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
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={{
										marginBottom: 5,
									}}
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
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
					</View>
				</View>
				<View>
					<Button size='large' onPress={handleSubmit(onSubmit)}>
						Se connecter
					</Button>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'center',
							marginTop: 10,
						}}
					>
						<Text>Pas encore de compte ?</Text>
						<TouchableOpacity>
							<Text style={{ textDecorationLine: 'underline' }}>
								Inscris-toi
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAwareScrollView>
		</>
	)
}

export default SignInScreen
