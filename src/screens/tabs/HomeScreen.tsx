import React, { useCallback, useEffect, useState } from 'react'
import { getCurrentGroup } from '@redux/group.reducer'
import FredokaText from '@ui/FredokaText'
import { View, ScrollView, TouchableOpacity } from 'react-native'
import { layout } from '@styles/layout'
import { useSelector } from 'react-redux'
import Text from '@ui/Text'
import HomeGraph from './components/HomeGraph'
import { Blue, DarkGrey } from '@constants/Colors'
import ExpenseItem from '@screens/expenses/components/ExpenseItem'
import { User } from '@types/user'
import { useFocusEffect, useTheme } from '@react-navigation/native'
import { getGroupExpenses } from '@services/expenseService'
import { Expense } from '@types/Expense'
import dayjs from 'dayjs'
import { getCurrentUser } from '@redux/user.reducer'

const HomeScreen = () => {
	const currentGroup = useSelector(getCurrentGroup)
	const currentUser = useSelector(getCurrentUser)
	const { colors } = useTheme()
	const [expenses, setExpenses] = useState<Expense[]>([])

	useFocusEffect(
		useCallback(() => {
			updateExpenses()
		}, [])
	)

	const updateExpenses = async () => {
		if (!currentGroup?.id) return
		const { expenses } = await getGroupExpenses(currentGroup.id, 3)
		setExpenses(expenses)
	}

	return (
		<ScrollView
			style={[
				layout.container,
				{ paddingVertical: 25, backgroundColor: colors.background },
			]}
		>
			<View style={{ marginHorizontal: 20 }}>
				<FredokaText style={{ fontSize: 20 }}>
					{currentGroup?.name} en despi 📝
				</FredokaText>
				<Text>Le récap du mois</Text>
				<View style={[layout.rowSBCenter, { marginTop: 20 }]}>
					<Text style={{ color: DarkGrey }}>
						Total :{' '}
						<Text weight='bold' style={{ color: Blue }}>
							760,65 €
						</Text>
					</Text>
					<Text style={{ color: DarkGrey }}>
						Dépenses :{' '}
						<Text weight='bold' style={{ color: '#51A53F' }}>
							437,65 €
						</Text>
					</Text>
				</View>
			</View>

			<HomeGraph />

			<View style={{ marginHorizontal: 20 }}>
				<View
					style={[
						layout.rowSBCenter,
						{
							marginTop: 25,
							marginBottom: 25,
						},
					]}
				>
					<FredokaText style={{ fontSize: 20 }}>
						Dernières transactions
					</FredokaText>
					<TouchableOpacity>
						<Text weight='bold'>Voir toutes</Text>
					</TouchableOpacity>
				</View>
			</View>

			{expenses.map(({ name, price, madeBy, createdAt, id }) => (
				<View style={{ marginHorizontal: 20, marginBottom: 30 }} key={id}>
					<ExpenseItem
						label={name}
						price={price.toString()}
						author={madeBy}
						date={dayjs(createdAt).format('DD/MM/YYYY')}
					/>
				</View>
			))}
		</ScrollView>
	)
}

export default HomeScreen
