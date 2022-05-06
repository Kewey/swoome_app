import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { layout } from '@styles/layout'
import { useDispatch, useSelector } from 'react-redux'
import {
	getCurrentUser,
	getTheme,
	setTheme,
	setToken,
	setUser,
} from '@redux/user.reducer'
import CardWithIcon from '@ui/CardWithIcon'
import FredokaText from '@ui/FredokaText'
import { setGroup } from '@redux/group.reducer'
import { useTheme } from '@react-navigation/native'

const ProfileScreen = () => {
	const { colors } = useTheme()
	const user = useSelector(getCurrentUser)
	const isDarkTheme = useSelector(getTheme)
	const dispatch = useDispatch()
	return (
		<ScrollView
			contentContainerStyle={[
				layout.container,
				{ paddingVertical: 25, backgroundColor: colors.background },
			]}
		>
			<TouchableOpacity style={{ marginBottom: 10, marginHorizontal: 20 }}>
				<CardWithIcon icon='🙄' sublabel='Surnom' label={user?.username} />
			</TouchableOpacity>
			<TouchableOpacity style={{ marginBottom: 10, marginHorizontal: 20 }}>
				<CardWithIcon icon='📷' sublabel='Photo de profil' label='A définir' />
			</TouchableOpacity>

			<View style={{ marginHorizontal: 20, marginVertical: 10 }}>
				<FredokaText>Modifier les parametres</FredokaText>
			</View>
			<TouchableOpacity
				style={{ marginBottom: 10, marginHorizontal: 20 }}
				onPress={() => dispatch(setTheme(!isDarkTheme))}
			>
				<CardWithIcon
					icon={isDarkTheme ? '🌙' : '🌞'}
					sublabel='Theme'
					label={isDarkTheme ? 'Sombre' : 'Clair'}
				/>
			</TouchableOpacity>
			<TouchableOpacity style={{ marginBottom: 10, marginHorizontal: 20 }}>
				<CardWithIcon icon='🏁' sublabel='Langue' label='Français' />
			</TouchableOpacity>
			<TouchableOpacity style={{ marginBottom: 10, marginHorizontal: 20 }}>
				<CardWithIcon icon='🔔' sublabel='Notifications' label='Activé' />
			</TouchableOpacity>

			<TouchableOpacity
				style={{ marginTop: 20, marginHorizontal: 20 }}
				onPress={() => {
					dispatch(setUser(null))
					dispatch(setGroup(null))
					dispatch(setToken(''))
				}}
			>
				<CardWithIcon icon='🚪' label='Déconnexion' />
			</TouchableOpacity>
		</ScrollView>
	)
}

export default ProfileScreen

const styles = StyleSheet.create({})
