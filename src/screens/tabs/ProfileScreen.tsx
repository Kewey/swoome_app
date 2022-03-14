import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { layout } from '@styles/layout'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser, setToken, setUser } from '@redux/user.reducer'
import CircleButton from '@ui/CircleButton'
import Text from '@ui/Text'
import { Light, White } from '@constants/Colors'
import CardWithIcon from '@ui/CardWithIcon'
import FredokaText from '@ui/FredokaText'
import { setGroup } from '@redux/group.reducer'

const ProfileScreen = () => {
	const user = useSelector(getCurrentUser)
	const dispatch = useDispatch()
	return (
		<ScrollView
			contentContainerStyle={[layout.container, { paddingVertical: 25 }]}
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
			<TouchableOpacity style={{ marginBottom: 10, marginHorizontal: 20 }}>
				<CardWithIcon icon='🌙' sublabel='Theme' label='Clair' />
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
