import { AuthScreens } from '@navigation/Routes'
import { setToken } from '@redux/reducers/user.reducer'
import { AuthNavigationProp } from '@types/routes'
import Button from '@ui/Button'
import React from 'react'
import { useForm } from 'react-hook-form'
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import { useDispatch } from 'react-redux'

type SignInScreenProps = {
	navigation: AuthNavigationProp<AuthScreens.SignIn>
}

const SignInScreen = ({ navigation }: SignInScreenProps) => {
	const dispatch = useDispatch()
	const { control, handleSubmit } = useForm()

	const onSubmit = () => dispatch(setToken('adzajdoazjd'))

	return (
		<KeyboardAvoidingView
			style={{
				flex: 1,
				padding: 20,
			}}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<Text>Connexion</Text>
			<Button variant='secondary' onPress={handleSubmit(onSubmit)}>
				Gogogogo
			</Button>
		</KeyboardAvoidingView>
	)
}

export default SignInScreen
