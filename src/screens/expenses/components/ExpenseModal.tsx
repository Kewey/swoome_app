import React from 'react'
import {
	View,
	TouchableWithoutFeedback,
	Dimensions,
	Platform,
} from 'react-native'
import Modal from 'react-native-modal'
import { sideMargin } from '@constants/Layout'
import { borderRadius, layout } from '@styles/layout'
import FredokaText from '@ui/FredokaText'
import Text from '@ui/Text'
import Button from '@ui/Button'
import { Expense } from '@types/Expense'
import { useTheme } from '@react-navigation/native'

interface ExpenseModalProps {
	expense: Expense
	updateExpense: (expense: Expense) => void
	removeExpense: (id: string) => void
	isOpen: boolean
	closeModal: () => void
}

const deviceWidth = Dimensions.get('window').width
const deviceHeight =
	Platform.OS === 'ios'
		? Dimensions.get('window').height
		: Dimensions.get('window').height + 60

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
		console.log(id)
		try {
			removeExpense(id)
			closeModal()
		} catch (error) {
			console.log(error)
		}
	}

	const onPressEdit = async () => {
		await updateExpense({ ...expense, id, name, price, madeBy, description })
		closeModal()
	}

	return (
		<Modal
			onBackdropPress={closeModal}
			isVisible={isOpen}
			useNativeDriver={true}
			useNativeDriverForBackdrop={true}
			style={{ justifyContent: 'flex-end', margin: 0 }}
			backdropOpacity={0.2}
			deviceWidth={deviceWidth}
			deviceHeight={deviceHeight}
		>
			<View
				style={{
					padding: sideMargin,
					backgroundColor: colors.card,
					borderTopLeftRadius: borderRadius * 2,
					borderTopRightRadius: borderRadius * 2,
				}}
			>
				<FredokaText style={{ fontSize: 25 }}>{name}</FredokaText>
				<Text weight='bold'>{price} €</Text>
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
					variant='neutral'
					onPress={onPressEdit}
					style={{ marginBottom: 10 }}
				>
					Modifier la dépense
				</Button>
				<Button variant='danger' onPress={() => onPressDelete()}>
					Supprimer la dépense
				</Button>
			</View>
		</Modal>
	)
}

export default ExpenseModal
