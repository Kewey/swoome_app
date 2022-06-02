import { View } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import Text from '@ui/Text'
import { joinGroup } from '@services/groupService'
import { useDispatch } from 'react-redux'
import { setGroup } from '@redux/group.reducer'
import FredokaText from '@ui/FredokaText'
import { sideMargin } from '@constants/Layout'
import TextInput from '@ui/TextInput'
import Button from '@ui/Button'

const JoinGroupScreen = () => {
	const [isLoading, setLoading] = useState(false)
	const dispatch = useDispatch()

	// Pour utiliser les couleurs en fonction du theme
	// const {colors} = useTheme()

	// Pour le formulaire -> https://react-hook-form.com/get-started#ReactNative
	const { control, handleSubmit } = useForm<{ code: string }>()

	// Pour le call API tu peux utiliser du async / await, il faut ajouter la fonction
	// dans le fichier groupService (tu peux copier les autres fonctions si besoin)

	// Englobe le tout d'un KeyboardAvoidingView
	const onSubmit = async ({ code }: { code: string }) => {
		setLoading(true)
		try {
			const newGroup = await joinGroup(code)
			dispatch(setGroup(newGroup))
		} catch (error) {}
		setLoading(false)
	}

	return (
		<>
			<View style={{ paddingHorizontal: sideMargin }}>
				<FredokaText
					style={{ fontSize: 30, textAlign: 'center', marginBottom: 20 }}
				>
					Saisi le code du groupe que tu veux rejoindre
				</FredokaText>
				<Text
					style={{
						textAlign: 'center',
						opacity: 0.55,
						fontSize: 13,
						marginBottom: 30,
					}}
				>
					Demande ce code à tes amis, il se trouve dans les paramètres du groupe
					!
				</Text>
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
								placeholder='XXXXXX'
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								autoFocus
							/>
						</>
					)}
					name='code'
				/>
			</View>
			<View
				style={{
					position: 'absolute',
					bottom: 30,
					left: sideMargin,
					right: sideMargin,
				}}
			>
				<Button
					size='large'
					//disabled={!isDirty || invalid || isLoading}
					onPress={handleSubmit(onSubmit)}
				>
					{isLoading ? 'Chargement' : 'Rejoindre un groupe'}
				</Button>
			</View>
		</>
	)
}

export default JoinGroupScreen
