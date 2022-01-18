import React from 'react'
import { FredokaText, Text } from '@components/StyledText'
import Button from '@components/Button'
import { SafeAreaView } from 'react-native-safe-area-context'
import { layout } from '@styles/layout'
import { Screens } from '@navigation/screens'
import { View } from 'react-native'
// import { layout } from '@styles/layout'

function GroupHome({ navigation }) {
	return (
		<SafeAreaView style={layout.container}>
			<View>
				<FredokaText>Ma maison</FredokaText>
				<Text>
					Commence par créer ou rejoindre une maison pour pouvoir interagir avec
					les membres de ton foyer.
				</Text>
			</View>
			<View>
				<Button
					block
					variant='cyan'
					size='large'
					onPress={() => navigation.navigate(Screens.GroupCreate)}
				>
					Créer ma maison
				</Button>
				<Button
					block
					size='large'
					onPress={() => navigation.navigate(Screens.GroupJoin)}
				>
					Rejoindre ma maison
				</Button>
			</View>
		</SafeAreaView>
	)
}

export default GroupHome
