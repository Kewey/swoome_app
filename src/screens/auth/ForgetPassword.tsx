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
import { View, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch } from 'react-redux'

type ForgetPasswordProps = {
	navigation: AuthNavigationProp<AuthScreens.SignIn>
}

const ForgetPassword = ({ navigation }: ForgetPasswordProps) => {
	const dispatch = useDispatch()
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<{ email: string }>()

	const onSubmit = (data: { email: string }) => {
		console.log(`data`, data)
		// TODO login into dispatch user + token

		dispatch(setToken('TODO'))
	}

	return (
		<KeyboardAwareScrollView
			contentContainerStyle={{
				flex: 1,
			}}
		>
			<View>
				<CircleButton onPress={() => navigation.goBack()}>
					<NavArrowLeft height={25} width={25} color={DarkGrey} />
				</CircleButton>
			</View>
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<View style={{ marginBottom: 50 }}>
					<FredokaText
						style={{ fontSize: 30, textAlign: 'center', marginBottom: 20 }}
					>
						Tu as oublié ton mot de passe ?
					</FredokaText>
					<Text style={{ textAlign: 'center', opacity: 0.55, fontSize: 13 }}>
						Tu devrais essayer les mots croisés, c’est bon pour la mémoire.
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
				</View>
				<Button size='large' onPress={handleSubmit(onSubmit)}>
					Recevoir le lien
				</Button>
			</View>
		</KeyboardAwareScrollView>
	)
}

export default ForgetPassword
