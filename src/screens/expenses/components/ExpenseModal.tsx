import React from 'react'
import { View } from 'react-native'
import { layout } from '@styles/layout'
import FredokaText from '@ui/FredokaText'
import Text from '@ui/Text'
import Button from '@ui/Button'
import { Expense } from '@types/Expense'
import { useTheme } from '@react-navigation/native'
import BottomSheetModal from '@ui/BottomSheetModal'
import { displayPrice } from '@services/expenseService'

interface ExpenseModalProps {
	expense: Expense
	updateExpense: (expense: Expense) => void
	removeExpense: (id: string) => void
	isOpen: boolean
	closeModal: () => void
}

const ExpenseModal = ({
	expense: {
		id,
		name,
		price,
		madeBy,
		// date,
		description,
		...expense
	},
	updateExpense,
	removeExpense,
	isOpen = false,
	closeModal,
}: ExpenseModalProps) => {
	const { colors } = useTheme()

	const onPressDelete = async () => {
		try {
			closeModal()
			removeExpense(id)
		} catch (error) {
			console.log(error)
		}
	}

	const onPressEdit = async () => {
		await updateExpense({ ...expense, id, name, price, madeBy, description })
		closeModal()
	}

	return (
		<BottomSheetModal isOpen={isOpen} closeModal={closeModal}>
			<FredokaText style={{ fontSize: 25 }}>{name}</FredokaText>
			<Text weight='bold'>{displayPrice(price)} €</Text>
			{!!description && <Text>{description}</Text>}
			<View style={layout.rowSBCenter}>
				<Text style={{ color: colors.border }}>Par {madeBy?.username}</Text>
				{/* <Text style={{ color: colors.border }}>{date}</Text> */}
			</View>
			<View
				style={{
					height: 1,
					width: '100%',
					backgroundColor: colors.border,
					marginVertical: 10,
				}}
			/>
			<Button
				variant='transparent'
				onPress={onPressEdit}
				style={{ marginBottom: 10 }}
			>
				Modifier la dépense
			</Button>
			<Button variant='danger' onPress={() => onPressDelete()}>
				Supprimer la dépense
			</Button>
		</BottomSheetModal>
	)
}

export default ExpenseModal
