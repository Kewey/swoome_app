import React, { useEffect, useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { GroupScreens } from '@navigation/Routes'
import { GroupNavigationProp } from '@types/routes'
import Text from '@ui/Text'
import { getCurrentUser, setToken, setUser } from '@redux/user.reducer'
import { useDispatch, useSelector } from 'react-redux'
import { Group } from '@types/Group'
import { SafeAreaView } from 'react-native-safe-area-context'
import FredokaText from '@ui/FredokaText'
import Button from '@ui/Button'
import { setGroup } from '@redux/group.reducer'
import { getUserGroups } from '@services/userService'

type GroupIndexProps = {
	navigation: GroupNavigationProp<GroupScreens.Index>
}

export default function GroupIndexScreen({ navigation }: GroupIndexProps) {
	const currentUser = useSelector(getCurrentUser)
	const [groups, setGroups] = useState<Group[]>([])
	const dispatch = useDispatch()

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

	useEffect(() => {
		if (!currentUser) return

		getUserGroups(currentUser.id).then(({ groups: group, totalItems }) => {
			setGroups(groups)
		})
	}, [])
	console.log('groups', groups)

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
					Hello {currentUser?.username} 👋
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
			<FlatList
				style={{ flex: 1 }}
				renderItem={(data) => {
					console.log('data', data)
					return (
						<View>
							<Text>test</Text>
						</View>
					)
				}}
				data={groups}
			/>
			<View
				style={{
					position: 'absolute',
					bottom: 20,
					left: 20,
					right: 20,
				}}
			>
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
