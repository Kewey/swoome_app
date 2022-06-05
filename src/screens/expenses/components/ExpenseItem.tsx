import { TouchableHighlight, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Text from '@ui/Text'
import CircleButton from '@ui/CircleButton'
import FredokaText from '@ui/FredokaText'
import { layout } from '@styles/layout'
import { useTheme } from '@react-navigation/native'
import { Expense } from '@types/Expense'
import ExpenseModal from './ExpenseModal'
import { sideMargin } from '@constants/Layout'
import dayjs from 'dayjs'
import { displayPrice } from '@services/expenseService'
import { ArrowLeft, ArrowRight } from 'iconoir-react-native'
import Avatar from '@ui/Avatar'

interface ExpenseItemProps {
	expense: Expense
	updateExpense?: (expense: Expense) => {}
	removeExpense?: (id: string) => {}
}

const ExpenseItem = ({
	expense: {
		id,
		name,
		price,
		madeBy,
		expenseAt,
		description,
		type,
		participants,
		...expense
	},
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
						<Text>{type?.emoji}</Text>
					</CircleButton>

					<View
						style={{
							flex: 1,
						}}
					>
						<View style={[layout.rowSBCenter, { marginBottom: 2 }]}>
							<FredokaText style={{ fontSize: 16 }}>{name}</FredokaText>
							<Text weight='bold' style={{ fontSize: 16 }}>
								{displayPrice(price)} €
							</Text>
						</View>
						<View style={layout.rowSBCenter}>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Text style={{ color: colors.border, marginRight: 5 }}>
									Par
								</Text>
								<Avatar
									source={madeBy.avatar}
									username={madeBy.username}
									size={20}
								/>
								<ArrowRight
									height={15}
									width={15}
									color={colors.text}
									style={{ marginHorizontal: 5 }}
								/>
								{participants.map((participant) => (
									<View key={participant['@id']} style={{ marginRight: -8 }}>
										<Avatar
											source={participant.avatar}
											username={participant.username}
											size={20}
										/>
									</View>
								))}
							</View>
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
					type,
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
