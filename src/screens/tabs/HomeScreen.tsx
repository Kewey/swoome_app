import React from 'react'
import { getCurrentGroup } from '@redux/group.reducer'
import FredokaText from '@ui/FredokaText'
import { View, ScrollView, TouchableOpacity } from 'react-native'
import { layout } from '@styles/layout'
import { useSelector } from 'react-redux'
import Text from '@ui/Text'
import HomeGraph from './components/HomeGraph'
import { Blue, DarkGrey } from '@constants/Colors'
import ExpenseItem from '@screens/expenses/components/ExpenseItem'
import { User } from '@types/user'

const HomeScreen = () => {
	const group = useSelector(getCurrentGroup)
	return (
		<ScrollView style={[layout.container, { paddingVertical: 25 }]}>
			<View style={{ marginHorizontal: 20 }}>
				<FredokaText style={{ fontSize: 20 }}>
					{group?.name} en despi 📝
				</FredokaText>
				<Text>Le récap du mois</Text>
				<View style={[layout.rowSBCenter, { marginTop: 20 }]}>
					<Text style={{ color: DarkGrey }}>
						Total :{' '}
						<Text weight='bold' style={{ color: Blue }}>
							760,65 €
						</Text>
					</Text>
					<Text style={{ color: DarkGrey }}>
						Dépenses :{' '}
						<Text weight='bold' style={{ color: '#51A53F' }}>
							437,65 €
						</Text>
					</Text>
				</View>
			</View>

			<HomeGraph />

			<View style={{ marginHorizontal: 20 }}>
				<View
					style={[
						layout.rowSBCenter,
						{
							marginTop: 25,
							marginBottom: 25,
						},
					]}
				>
					<FredokaText style={{ fontSize: 20 }}>
						Dernières transactions
					</FredokaText>
					<TouchableOpacity>
						<Text weight='bold'>Voir toutes</Text>
					</TouchableOpacity>
				</View>
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
			<View style={{ marginHorizontal: 20, marginBottom: 10 }}>
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
	)
}

export default HomeScreen
