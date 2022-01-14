import MultiStep from '@components/MultiStepForm'
import { Text } from '@components/StyledText'
import { View } from '@components/Themed'
import { layout } from '@styles/layout'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const GroupCreateScreen = () => {
	return (
		<SafeAreaView style={layout.container}>
			<MultiStep>
				<MultiStep.Child
					title='Pour quelle occasion souhaites-tu créer un groupe ?'
					content='Connaitre ton prénom va nous permettre de personnaliser ton expérience.'
					list={[{}]}
				/>
			</MultiStep>
		</SafeAreaView>
	)
}

export default GroupCreateScreen
