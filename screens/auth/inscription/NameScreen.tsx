import { MultiStepForm, StepFormChild } from '@components/MultiStepForm'
import { Text } from '@components/StyledText'
import { View } from '@components/Themed'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@types/RootTab'
import React from 'react'

export default function NameScreen({
	navigation,
}: {
	navigation: NativeStackScreenProps<RootStackParamList, 'Root'>
}) {
	return (
		<MultiStepForm
		// steps={[
		// 	{
		// 		title: 'Comment tes amis t’appellent-ils ?',
		// 		content:
		// 			'Connaitre ton prénom va nous permettre de personnaliser ton expérience.',
		// 		data: {},
		// 		inputName: 'name',
		// 		actions: [{ text: 'Suivant', action: () => console.log(`click`) }],
		// 	},
		// 	{
		// 		title: 'Quelle est ton adresse mail ?',
		// 		content:
		// 			'Connaitre ton prénom va nous permettre de personnaliser ton expérience. ',
		// 		data: {},
		// 		inputName: 'email',
		// 		actions: [{ text: 'Suivant', action: () => console.log(`click`) }],
		// 	},
		// 	{
		// 		title: 'Choisis un mot de passe',
		// 		content:
		// 			'Connaitre ton prénom va nous permettre de personnaliser ton expérience.',
		// 		data: {},
		// 		inputName: 'password',
		// 		actions: [{ text: 'Suivant', action: () => console.log(`click`) }],
		// 	},
		// 	{
		// 		title: 'Utiliser Face ID pour se connecter',
		// 		content:
		// 			'Connaitre ton prénom va nous permettre de personnaliser ton expérience.',
		// 		data: {},
		// 		inputName: 'FaceID',
		// 		actions: [
		// 			{ text: 'Autoriser FaceID', action: () => console.log(`click`) },
		// 			{ text: 'Pas maintenant', action: () => {} },
		// 		],
		// 	},
		// ]}
		// // navigation={navigation}
		>
			<StepFormChild
				step={{
					title: 'Comment tes amis t’appellent-ils ?',
					content:
						'Connaitre ton prénom va nous permettre de personnaliser ton expérience.',
					inputName: 'name',
				}}
			>
				<>
					<View></View>
					<Text>dzadazdazdza</Text>
				</>
			</StepFormChild>
			<StepFormChild>
				<>
					<View></View>
					<Text>dzadazdazdza</Text>
				</>
			</StepFormChild>
			<StepFormChild>
				<>
					<View></View>
					<Text>dzadazdazdza</Text>
				</>
			</StepFormChild>
			<StepFormChild>
				<>
					<View></View>
					<Text>dzadazdazdza</Text>
				</>
			</StepFormChild>
		</MultiStepForm>
	)
}
