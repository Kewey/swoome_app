import { StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '@ui/Text'
import CircleButton from '@ui/CircleButton'
import FredokaText from '@ui/FredokaText'
import { layout } from '@styles/layout'
import { useTheme } from '@react-navigation/native'
import { User } from '@types/user'

interface ExpenseItemProps {
	label: string
	price: string
	author: User
	date: string
}

const ExpenseItem = ({ label, price, author, date }: ExpenseItemProps) => {
	const { colors } = useTheme()
	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
			}}
		>
			<CircleButton size={40} style={{ marginRight: 10 }}>
				<Text>🏠</Text>
			</CircleButton>
			<View
				style={{
					flex: 1,
				}}
			>
				<View style={[layout.rowSBCenter, { marginBottom: 3 }]}>
					<FredokaText>{label}</FredokaText>
					<Text weight='bold'>{price} €</Text>
				</View>
				<View style={layout.rowSBCenter}>
					<Text style={{ color: colors.border }}>Par {author?.username}</Text>
					<Text style={{ color: colors.border }}>{date}</Text>
				</View>
			</View>
		</View>
	)
}

export default ExpenseItem

const styles = StyleSheet.create({})
