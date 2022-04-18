import React, { useCallback, useState } from 'react'
import FredokaText from '@ui/FredokaText'
import { View, ScrollView } from 'react-native'
import { layout } from '@styles/layout'
import Text from '@ui/Text'
import {
	useFocusEffect,
	useNavigation,
	useTheme,
} from '@react-navigation/native'
import ExpenseItem from './components/ExpenseItem'
import { User } from '@types/user'
import Button from '@ui/Button'
import { MainScreens } from '@navigation/Routes'
import { Expense } from '@types/Expense'
import { getGroupExpenses } from '@services/expenseService'
import { useSelector } from 'react-redux'
import { getCurrentGroup } from '@redux/group.reducer'
import dayjs from 'dayjs'

const Expenses = () => {
	const navigation = useNavigation()
	const group = useSelector(getCurrentGroup)
	const [expenses, setExpenses] = useState<Expense[]>([])

	useFocusEffect(
		useCallback(() => {
			getExpenses()
		}, [])
	)

	const getExpenses = async () => {
		if (!group?.id) return
		const { expenses } = await getGroupExpenses(group.id)
		setExpenses(expenses)
	}

	const { colors } = useTheme()

	return (
		<>
			<ScrollView style={[layout.container, { paddingVertical: 25 }]}>
				<View style={{ marginHorizontal: 20, marginBottom: 25 }}>
					<FredokaText style={{ fontSize: 20 }}>
						Vos dernières dépenses
					</FredokaText>
					<Text>Sur ce mois</Text>
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
			<View
				style={{
					position: 'absolute',
					bottom: 10,
					left: 20,
					right: 20,
				}}
			>
				<Button
					onPress={() => {
						navigation.navigate(MainScreens.AddExpense)
					}}
				>
					Ajouter une dépense
				</Button>
			</View>
		</>
	)
}

export default Expenses
