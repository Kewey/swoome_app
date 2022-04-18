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
import { deleteExpense, getGroupExpenses } from '@services/expenseService'
import { useSelector } from 'react-redux'
import { getCurrentGroup } from '@redux/group.reducer'
import dayjs from 'dayjs'
import { sideMargin, tabbarHeight } from '@constants/Layout'

const Expenses = () => {
	const { colors } = useTheme()
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

	const updateExpense = async (expense: Expense) => {
		try {
			console.log(expense)
		} catch (error) {}
	}

	const removeExpense = async (expenseId: string) => {
		try {
			await deleteExpense(expenseId)
		} catch (error) {}
	}

	return (
		<>
			<ScrollView style={[layout.container, { paddingVertical: sideMargin }]}>
				<View style={{ marginHorizontal: 20, marginBottom: 25 }}>
					<FredokaText style={{ fontSize: 20 }}>
						Vos dernières dépenses
					</FredokaText>
					<Text>Sur ce mois</Text>
				</View>

				{expenses.map((expense) => (
					<View
						style={{ marginHorizontal: 20, marginBottom: 30 }}
						key={expense.id}
					>
						<ExpenseItem
							expense={expense}
							updateExpense={updateExpense}
							removeExpense={removeExpense}
						/>
					</View>
				))}
			</ScrollView>
			<View
				style={{
					position: 'absolute',
					bottom: tabbarHeight,
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
