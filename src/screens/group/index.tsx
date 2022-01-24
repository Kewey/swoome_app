import React, { useState } from 'react'
import Button from '@ui/Button'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View } from 'react-native'
import { GroupScreens } from '@navigation/Routes'
import { GroupNavigationProp } from '@types/routes'
import FredokaText from '@ui/FredokaText'
import Text from '@ui/Text'

type GroupIndexProps = {
	navigation: GroupNavigationProp<GroupScreens.Index>
}

export default function GroupIndexScreen({ navigation }: GroupIndexProps) {
	return (
		<>
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<FredokaText
					style={{ fontSize: 30, textAlign: 'center', marginBottom: 15 }}
				>
					Ma maison
				</FredokaText>
				<Text
					style={{
						fontSize: 13,
						textAlign: 'center',
						opacity: 0.55,
						marginBottom: 45,
					}}
				>
					Commence par créer ou rejoindre une maison pour pouvoir interagir avec
					les membres de ton foyer.
				</Text>
			</View>
			<View>
				<Button
					block
					size='large'
					variant='primary'
					style={{ marginBottom: 15 }}
					onPress={() => navigation.navigate(GroupScreens.Create)}
				>
					Créer ma maison
				</Button>
				<Button
					block
					size='large'
					variant='secondary'
					onPress={() => navigation.navigate(GroupScreens.Join)}
				>
					Rejoindre ma maison
				</Button>
			</View>
		</>
	)
}
