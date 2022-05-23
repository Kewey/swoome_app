import React, { useCallback, useRef, useState } from 'react'
import { getCurrentGroup } from '@redux/group.reducer'
import FredokaText from '@ui/FredokaText'
import { FlatList, Image, View } from 'react-native'
import { useSelector } from 'react-redux'
import ExpenseItem from '@screens/expenses/components/ExpenseItem'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { deleteExpense, getGroupExpenses } from '@services/expenseService'
import { Expense } from '@types/Expense'
import { sideMargin } from '@constants/Layout'
import Text from '@ui/Text'
import Button from '@ui/Button'
import { MainScreens } from '@navigation/Routes'
import AnimatedHeaderLayout from '@ui/AnimatedHeaderLayout'

const HomeScreen = () => {
	const currentGroup = useSelector(getCurrentGroup)
	const [expenses, setExpenses] = useState<Expense[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const navigation = useNavigation()

	const updateExpenses = async () => {
		setIsLoading(true)
		const { expenses } = await getGroupExpenses(currentGroup.id, 3)
		setExpenses(expenses)
		setIsLoading(false)
	}

	useFocusEffect(
		useCallback(() => {
			updateExpenses()
		}, [])
	)

	const updateExpense = async (expense: Expense) => {
		try {
			navigation.navigate(MainScreens.AddExpense, { expense: expense })
		} catch (error) {}
	}

	const removeExpense = async (expenseId: string) => {
		try {
			await deleteExpense(expenseId)
		} catch (error) {}
	}

	return (
		<AnimatedHeaderLayout title='Dernières activités'>
			{!isLoading && expenses.length === 0 ? (
				<View
					style={{
						flex: 1,
						paddingHorizontal: sideMargin,
						justifyContent: 'center',
					}}
				>
					<View
						style={{
							alignItems: 'center',
							marginBottom: 20,
						}}
					>
						<Image
							source={require('@assets/empty/empty-expenses.png')}
							style={{
								width: 320,
								height: 118,
							}}
							resizeMode='contain'
						/>
					</View>
					<FredokaText
						style={{ textAlign: 'center', marginBottom: 10, fontSize: 18 }}
					>
						Oula c'est vide ici !
					</FredokaText>
					<Text style={{ textAlign: 'center', marginBottom: 10, opacity: 0.6 }}>
						C'est le moment d'ajouter ta toute premiere dépense !
					</Text>
					<Button onPress={() => navigation.navigate(MainScreens.AddExpense)}>
						C'est parti !
					</Button>
				</View>
			) : (
				<FlatList
					data={expenses}
					keyExtractor={(expense) => expense.id}
					renderItem={({ item: expense }) => (
						<ExpenseItem
							expense={expense}
							updateExpense={updateExpense}
							removeExpense={removeExpense}
						/>
					)}
				/>
			)}
		</AnimatedHeaderLayout>
	)
}

export default HomeScreen
