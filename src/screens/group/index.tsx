import React, { useEffect, useLayoutEffect, useState } from 'react'
import Button from '@ui/Button'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, View } from 'react-native'
import { GroupScreens } from '@navigation/Routes'
import { GroupNavigationProp } from '@types/routes'
import FredokaText from '@ui/FredokaText'
import Text from '@ui/Text'
import { getCurrentUser } from '@redux/user.reducer'
import { useSelector } from 'react-redux'

type GroupIndexProps = {
	navigation: GroupNavigationProp<GroupScreens.Index>
}

export default function GroupIndexScreen({ navigation }: GroupIndexProps) {
	const user = useSelector(getCurrentUser)
	console.log('user.groups', user?.groups)

	useLayoutEffect(() => {}, [])

	return (
		<SafeAreaView
			style={{
				flex: 1,
				paddingHorizontal: 30,
				paddingBottom: 30,
			}}
		>
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<FredokaText
					style={{ fontSize: 30, textAlign: 'center', marginBottom: 15 }}
				>
					Bienvenue {user?.firstname}
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
			<FlatList renderItem={() => <Text>test</Text>} data={user?.groups} />
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
			</View>
		</SafeAreaView>
	)
}
