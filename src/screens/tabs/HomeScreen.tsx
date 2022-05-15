import React, { useCallback, useRef, useState } from 'react'
import { getCurrentGroup } from '@redux/group.reducer'
import FredokaText from '@ui/FredokaText'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import ExpenseItem from '@screens/expenses/components/ExpenseItem'
import {
	useFocusEffect,
	useNavigation,
	useTheme,
} from '@react-navigation/native'
import { deleteExpense, getGroupExpenses } from '@services/expenseService'
import { Expense } from '@types/Expense'
import { getCurrentUser } from '@redux/user.reducer'
import { sideMargin } from '@constants/Layout'
import Layout from '@styles/components/Layout'
import Text from '@ui/Text'
import { paddingHorizontal } from '@styles/layout'
import Button from '@ui/Button'
import { MainScreens } from '@navigation/Routes'

const HomeScreen = () => {
	const currentGroup = useSelector(getCurrentGroup)
	const [expenses, setExpenses] = useState<Expense[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const navigation = useNavigation()

	useFocusEffect(
		useCallback(() => {
			updateExpenses()
		}, [])
	)

	const updateExpenses = async () => {
		if (!currentGroup?.id) return
		setIsLoading(true)
		const { expenses } = await getGroupExpenses(currentGroup.id, 3)
		setExpenses(expenses)
		setIsLoading(false)
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
		<Layout>
			<FredokaText style={{ fontSize: 32, paddingHorizontal: sideMargin }}>
				Dernières activités
			</FredokaText>

			{!isLoading && expenses.length === 0 && (
				<View style={{ paddingHorizontal: sideMargin, flex: 1 }}>
					<Text style={{ textAlign: 'center', marginBottom: 10 }}>
						Oula c'est vide ici !
					</Text>
					<Text style={{ textAlign: 'center', marginBottom: 10 }}>
						Cliques sur le bouton au milieu en bas de ton écran pour ajouter une
						dépense ou cliques sur le bouton ci dessous
					</Text>
					<Button onPress={() => navigation.navigate(MainScreens.AddExpense)}>
						Ajouter une premiere dépense
					</Button>
				</View>
			)}

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

			<Text>{isLoading ? 'load' : 'done'}</Text>
		</Layout>
	)
}

export default HomeScreen
