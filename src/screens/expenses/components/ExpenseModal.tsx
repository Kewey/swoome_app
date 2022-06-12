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
import Avatar from '@ui/Avatar'
import dayjs from 'dayjs'

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
		participants,
		expenseAt,
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
		await updateExpense({
			...expense,
			id,
			name,
			price,
			madeBy,
			description,
			participants,
		})
		closeModal()
	}

	return (
		<BottomSheetModal isOpen={isOpen} closeModal={closeModal}>
			<View style={{ marginBottom: 15 }}>
				<FredokaText style={{ fontSize: 25 }}>{name}</FredokaText>
				<Text weight='bold'>{displayPrice(price)} €</Text>
				{!!description && <Text>{description}</Text>}
			</View>
			<View style={[layout.rowSBCenter, { marginBottom: 10 }]}>
				<View style={{ flexDirection: 'row', flex: 1 }}>
					<Text style={{ color: colors.border, marginRight: 5 }}>Par</Text>
					<Avatar source={madeBy.avatar} username={madeBy.username} />
				</View>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ color: colors.border, marginRight: 10 }}>Pour</Text>
					{participants.map((participant) => (
						<View key={participant['@id']} style={{ marginLeft: -5 }}>
							<Avatar
								source={participant.avatar}
								username={participant.username}
							/>
						</View>
					))}
				</View>
			</View>
			<Text style={{ color: colors.border }}>
				Ajouté le {dayjs(expenseAt).format('dddd D MMMM YYYY')}
			</Text>
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
