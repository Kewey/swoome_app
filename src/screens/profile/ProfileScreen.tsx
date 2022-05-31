import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	disconectUser,
	getCurrentUser,
	getTheme,
	setTheme,
	setToken,
	setUser,
} from '@redux/user.reducer'
import CardWithIcon from '@ui/CardWithIcon'
import FredokaText from '@ui/FredokaText'
import { removeGroup, setGroup } from '@redux/group.reducer'
import Layout from '@ui/Layout'
import { useNavigation } from '@react-navigation/native'
import { ProfileScreens } from '@navigation/Routes'

const ProfileScreen = () => {
	const user = useSelector(getCurrentUser)
	const isDarkTheme = useSelector(getTheme)
	const dispatch = useDispatch()
	const navigation = useNavigation()

	return (
		<Layout>
			<TouchableOpacity
				style={{ marginBottom: 10, marginHorizontal: 20 }}
				onPress={() => navigation.navigate(ProfileScreens.Account)}
			>
				<CardWithIcon
					icon='🙄'
					sublabel='Surnom'
					label={user?.username || 'oups'}
				/>
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
					dispatch(disconectUser())
					dispatch(removeGroup())
				}}
			>
				<CardWithIcon icon='🚪' label='Déconnexion' />
			</TouchableOpacity>
		</Layout>
	)
}

export default ProfileScreen
