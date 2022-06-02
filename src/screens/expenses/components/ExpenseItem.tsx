import { Pressable, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Text from '@ui/Text'
import CircleButton from '@ui/CircleButton'
import FredokaText from '@ui/FredokaText'
import { borderRadius, layout } from '@styles/layout'
import { useTheme } from '@react-navigation/native'
import { Expense } from '@types/Expense'
import ExpenseModal from './ExpenseModal'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { sideMargin } from '@constants/Layout'
import dayjs from 'dayjs'

interface ExpenseItemProps {
	expense: Expense
	updateExpense?: (expense: Expense) => {}
	removeExpense?: (id: string) => {}
}

const ExpenseItem = ({
	expense: { id, name, price, madeBy, expenseAt, description, ...expense },
	updateExpense,
	removeExpense,
}: ExpenseItemProps) => {
	const { colors } = useTheme()
	const [showModal, setShowModal] = useState(false)

	const onLongPress = () => {
		setShowModal(true)
	}

	return (
		<>
			<TouchableHighlight
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					paddingHorizontal: sideMargin,
					paddingVertical: 15,
				}}
				underlayColor={colors.card}
				onPress={onLongPress}
			>
				<>
					<CircleButton
						size={40}
						style={{ marginRight: 10 }}
						backgroundColor={colors.card}
					>
						<Text>🏠</Text>
					</CircleButton>

					<View
						style={{
							flex: 1,
						}}
					>
						<View style={[layout.rowSBCenter, { marginBottom: 2 }]}>
							<FredokaText style={{ fontSize: 16 }}>{name}</FredokaText>
							<Text weight='bold' style={{ fontSize: 16 }}>
								{price} €
							</Text>
						</View>
						<View style={layout.rowSBCenter}>
							<Text style={{ color: colors.border }}>
								Par {madeBy?.username}
							</Text>
							<Text style={{ color: colors.border }}>
								le {dayjs(expenseAt).format('DD/MM/YYYY')}
							</Text>
						</View>
					</View>
				</>
			</TouchableHighlight>

			<ExpenseModal
				expense={{
					id,
					name,
					price,
					madeBy,
					expenseAt,
					description,
					...expense,
				}}
				updateExpense={updateExpense}
				removeExpense={removeExpense}
				isOpen={showModal}
				closeModal={() => setShowModal(false)}
			/>
		</>
	)
}

export default ExpenseItem

const styles = StyleSheet.create({})
