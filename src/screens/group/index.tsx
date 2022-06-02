import React, { useEffect, useState } from 'react'
import {
	FlatList,
	ListRenderItem,
	ListRenderItemInfo,
	TouchableOpacity,
	View,
} from 'react-native'
import { GroupScreens } from '@navigation/Routes'
import { GroupNavigationProp } from '@types/routes'
import Text from '@ui/Text'
import { getCurrentUser, setToken, setUser } from '@redux/user.reducer'
import { useDispatch, useSelector } from 'react-redux'
import { Group } from '@types/Group'
import { SafeAreaView } from 'react-native-safe-area-context'
import FredokaText from '@ui/FredokaText'
import Button from '@ui/Button'
import { setExpenseType, setGroup } from '@redux/group.reducer'
import { getUserGroups } from '@services/userService'
import GroupItem from './components/GroupItem'
import { sideMargin } from '@constants/Layout'
import { getExpenseType } from '@services/expenseService'
import { getGroup } from '@services/groupService'

type GroupIndexProps = {
	navigation: GroupNavigationProp<GroupScreens.Index>
}

export default function GroupIndexScreen({ navigation }: GroupIndexProps) {
	const currentUser = useSelector(getCurrentUser)
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
		getExpenseType().then(({ expenseType }) => {
			dispatch(setExpenseType(expenseType))
		})
	}, [])

	const setCurrentGroup = async (id: string) => {
		const group = await getGroup(id)
		dispatch(setGroup(group))
	}

	return (
		<SafeAreaView
			style={{
				flex: 1,
				paddingHorizontal: sideMargin,
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
				ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
				renderItem={({ item: group }: ListRenderItemInfo<Group>) => {
					return (
						<GroupItem
							label={group.name}
							icon={group.type.emoji}
							groupName={group.type.name}
							onPress={() => setCurrentGroup(group.id)}
						/>
					)
				}}
				data={currentUser?.groups}
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
					variant='transparent'
					style={{ marginBottom: 10 }}
					onPress={() => navigation.navigate(GroupScreens.JoinGroup)}
				>
					Rejoindre un groupe
				</Button>
				<Button
					block
					size='large'
					variant='primary'
					onPress={() => navigation.navigate(GroupScreens.Create)}
				>
					Créer un groupe
				</Button>
			</View>
		</SafeAreaView>
	)
}
