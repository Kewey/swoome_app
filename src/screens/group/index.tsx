import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { GroupScreens } from '@navigation/Routes'
import { GroupNavigationProp } from '@types/routes'
import Text from '@ui/Text'
import { getCurrentUser, setToken, setUser } from '@redux/user.reducer'
import { useDispatch, useSelector } from 'react-redux'
import { Group } from '@types/Group'
import { SafeAreaView } from 'react-native-safe-area-context'
import FredokaText from '@ui/FredokaText'
import Button from '@ui/Button'

type GroupIndexProps = {
	navigation: GroupNavigationProp<GroupScreens.Index>
}

export default function GroupIndexScreen({ navigation }: GroupIndexProps) {
	const user = useSelector(getCurrentUser)
	const [groups, setGroups] = useState<Group[]>([])
	const dispatch = useDispatch()
	console.log('user.groups', user?.groups)

	navigation.setOptions({
		headerRight: () => (
			<View style={{ marginRight: 30 }}>
				<TouchableOpacity
					onPress={() => {
						dispatch(setUser(null))
						dispatch(setToken(''))
					}}
				>
					<Text weight='bold'>Mauvais compte ?</Text>
				</TouchableOpacity>
			</View>
		),
	})

	// useFocusEffect(() => {
	// 	if (user) {
	// 		getUserGroups(user.id).then((res) => {
	// 			console.log('res', res)
	// 			setGroups(res)
	// 		})
	// 	}
	// })

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
					Hello {user?.firstname} 👋
				</FredokaText>
				<Text
					style={{
						fontSize: 13,
						textAlign: 'center',
						opacity: 0.55,
						marginBottom: 45,
					}}
				>
					Commence par créer ou rejoindre un groupe pour pouvoir interagir avec
					les membres de ton foyer.
				</Text>
			</View>
			{/* <FlatList renderItem={() => <Text>test</Text>} data={groups} /> */}
			<View>
				<Button
					block
					size='large'
					variant='primary'
					onPress={() => navigation.navigate(GroupScreens.Create)}
				>
					Créer ma maison
				</Button>
			</View>
		</SafeAreaView>
	)
}
