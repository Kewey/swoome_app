import React from 'react'
import { getCurrentGroup } from '@redux/group.reducer'
import { getCurrentUser, setToken, setUser } from '@redux/user.reducer'
import FredokaText from '@ui/FredokaText'
import { View, Button, ScrollView, TouchableOpacity } from 'react-native'
import { layout } from '@styles/layout'
import { useDispatch, useSelector } from 'react-redux'
import CircleButton from '@ui/CircleButton'
import Text from '@ui/Text'
import { useTheme } from '@react-navigation/native'
import HomeGraph from './components/HomeGraph'

const HomeScreen = () => {
	const dispatch = useDispatch()
	const user = useSelector(getCurrentUser)
	const group = useSelector(getCurrentGroup)

	const { colors } = useTheme()

	return (
		<ScrollView contentContainerStyle={layout.container}>
			<FredokaText style={{ fontSize: 20 }}>
				{group?.name} en despi 📝
			</FredokaText>
			<Text>Le récap du mois</Text>

			<HomeGraph />

			<View
				style={[
					layout.rowSBCenter,
					{
						marginTop: 25,
						marginBottom: 15,
					},
				]}
			>
				<FredokaText style={{ fontSize: 20 }}>
					Dernières transactions
				</FredokaText>
				<TouchableOpacity>
					<Text>Voir tous</Text>
				</TouchableOpacity>
			</View>

			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					marginBottom: 20,
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
						<FredokaText>Titre de la transaction</FredokaText>
						<Text weight='bold'>-00,00€</Text>
					</View>
					<View style={layout.rowSBCenter}>
						<Text style={{ color: colors.border }}>Par Michel</Text>
						<Text style={{ color: colors.border }}>05/03/2022</Text>
					</View>
				</View>
			</View>

			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					marginBottom: 20,
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
						<FredokaText>Titre de la transaction</FredokaText>
						<Text weight='bold'>-00,00€</Text>
					</View>
					<View style={layout.rowSBCenter}>
						<Text style={{ color: colors.border }}>Par Michel</Text>
						<Text style={{ color: colors.border }}>05/03/2022</Text>
					</View>
				</View>
			</View>

			<Button title='logout' onPress={() => dispatch(setToken(''))} />
		</ScrollView>
	)
}

export default HomeScreen
