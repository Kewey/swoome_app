import React from 'react'
import { getCurrentGroup } from '@redux/group.reducer'
import { getCurrentUser, setToken, setUser } from '@redux/user.reducer'
import FredokaText from '@ui/FredokaText'
import { View, ScrollView, TouchableOpacity } from 'react-native'
import { layout } from '@styles/layout'
import { useDispatch, useSelector } from 'react-redux'
import Text from '@ui/Text'
import { useTheme } from '@react-navigation/native'
import ExpenseItem from './components/ExpenseItem'
import { User } from '@types/user'
import Button from '@ui/Button'

const AddExpenseModal = () => {
	const dispatch = useDispatch()
	const user = useSelector(getCurrentUser)
	const group = useSelector(getCurrentGroup)

	const { colors } = useTheme()

	return (
		<>
			<ScrollView style={[layout.container, { paddingVertical: 25 }]}>
				<View style={{ marginHorizontal: 20, marginBottom: 25 }}>
					<FredokaText style={{ fontSize: 20 }}>
						Vos dernières dépenses
					</FredokaText>
					<Text>Sur ce mois</Text>
				</View>

				<View style={{ marginHorizontal: 20, marginBottom: 30 }}>
					<ExpenseItem
						label='Titre de la transaction'
						price='-25,60'
						author={{ username: 'tet' } as User}
						date={'29/08/1997'}
					/>
				</View>
				<View style={{ marginHorizontal: 20, marginBottom: 30 }}>
					<ExpenseItem
						label='Titre de la transaction'
						price='-25,60'
						author={{ username: 'Jojo' } as User}
						date={'29/08/1997'}
					/>
				</View>
				<View style={{ marginHorizontal: 20, marginBottom: 30 }}>
					<ExpenseItem
						label='Titre de la transaction'
						price='-25,60'
						author={{ username: 'Jojo' } as User}
						date={'29/08/1997'}
					/>
				</View>
				<View style={{ marginHorizontal: 20, marginBottom: 30 }}>
					<ExpenseItem
						label='Titre de la transaction'
						price='-25,60'
						author={{ username: 'Jojo' } as User}
						date={'29/08/1997'}
					/>
				</View>
				<View style={{ marginHorizontal: 20, marginBottom: 30 }}>
					<ExpenseItem
						label='Titre de la transaction'
						price='-25,60'
						author={{ username: 'Jojo' } as User}
						date={'29/08/1997'}
					/>
				</View>
			</ScrollView>
			<View>
				<Button>Ajouter une dépense</Button>
			</View>
		</>
	)
}

export default AddExpenseModal
