import {
	Modal,
	Pressable,
	StyleSheet,
	TouchableWithoutFeedback,
	TouchableOpacity,
	View,
} from 'react-native'
import React, { useState } from 'react'
import Text from '@ui/Text'
import CircleButton from '@ui/CircleButton'
import FredokaText from '@ui/FredokaText'
import { borderRadius, layout } from '@styles/layout'
import { useTheme } from '@react-navigation/native'
import { sideMargin } from '@constants/Layout'
import { Expense } from '@types/Expense'
import Button from '@ui/Button'

interface ExpenseItemProps {
	expense: Expense
	updateExpense: (expense: Expense) => {}
	removeExpense: (id: string) => {}
}

const ExpenseItem = ({
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
}: ExpenseItemProps) => {
	const [showModal, setShowModal] = useState(false)
	const { colors } = useTheme()

	const onLongPress = () => {
		setShowModal(true)
	}

	const onPressDelete = async () => {
		try {
			removeExpense(id)
			setShowModal(true)
		} catch (error) {}
	}

	const onPressEdit = () => {
		updateExpense({ ...expense, id, name, price, madeBy, description })
		setShowModal(true)
	}

	return (
		<>
			<Pressable
				style={{
					flexDirection: 'row',
					alignItems: 'center',
				}}
				onLongPress={onLongPress}
			>
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
					<View style={[layout.rowSBCenter, { marginBottom: 3 }]}>
						<FredokaText>{name}</FredokaText>
						<Text weight='bold'>{price} €</Text>
					</View>
					<View style={layout.rowSBCenter}>
						<Text style={{ color: colors.border }}>Par {madeBy?.username}</Text>
						{/* <Text style={{ color: colors.border }}>{date}</Text> */}
					</View>
				</View>
			</Pressable>
			<Modal visible={showModal} animationType={'slide'} transparent>
				<TouchableWithoutFeedback onPress={() => setShowModal(false)}>
					<View
						style={{
							flex: 1,
							alignItems: 'center',
							justifyContent: 'flex-end',
							backgroundColor: 'rgba(0,0,0,0.5)',
						}}
					></View>
				</TouchableWithoutFeedback>

				<View
					style={{
						width: '100%',
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
					<Button variant='danger' onPress={onPressDelete}>
						Supprimer la dépense
					</Button>
				</View>
			</Modal>
		</>
	)
}

export default ExpenseItem

const styles = StyleSheet.create({})
