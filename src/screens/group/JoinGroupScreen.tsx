import { View } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import Text from '@ui/Text'

const JoinGroupScreen = () => {
	// Pour utiliser les couleurs en fonction du theme
	// const {colors} = useTheme()

	// Pour le formulaire -> https://react-hook-form.com/get-started#ReactNative
	// const { control, handleSubmit } = useForm<string>()

	// Pour le call API tu peux utiliser du async / await, il faut ajouter la fonction
	// dans le fichier groupService (tu peux copier les autres fonctions si besoin)

	// Englobe le tout d'un KeyboardAvoidingView

	return (
		<View>
			<Text>JoinGroupScreen</Text>
		</View>
	)
}

export default JoinGroupScreen
