import React from 'react'
import { FredokaText, Text } from '@components/StyledText'
import { View } from '@components/Themed'
import Button from '@components/Button'
import { SafeAreaView } from 'react-native-safe-area-context'

function GroupHome() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View>
				<FredokaText>Ma maison</FredokaText>
				<Text>
					Commence par créer ou rejoindre une maison pour pouvoir interagir avec
					les membres de ton foyer.
				</Text>
			</View>
			<View>
				<Button block size='large'>
					Créer ma maison
				</Button>
				<Button block size='large'>
					Rejoindre ma maison
				</Button>
			</View>
		</SafeAreaView>
	)
}

export default GroupHome
