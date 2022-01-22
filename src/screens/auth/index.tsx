import { AuthScreens } from '@navigation/Routes'
import { AuthNavigationProp } from '@types/routes'
import Button from '@ui/Button'
import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Text from '@ui/Text'
import FredokaText from '@ui/FredokaText'

type AuthScreenProps = {
	navigation: AuthNavigationProp<AuthScreens.Auth>
}

export default function AuthScreen({ navigation }: AuthScreenProps) {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ padding: 35, flex: 1, justifyContent: 'space-between' }}>
				<View style={{ flex: 2, justifyContent: 'center' }}>
					<FredokaText
						style={{ fontSize: 30, textAlign: 'center', marginBottom: 20 }}
					>
						Bienvenue jeune dépensier ! 👋🏻
					</FredokaText>
					<Text style={{ fontSize: 13, textAlign: 'center', opacity: 0.5 }}>
						Commence par décliner ton identité pour pouvoir te connecter et
						préparer ta meilleure liste de course.
					</Text>
				</View>
				<View style={{ flex: 1, justifyContent: 'flex-end' }}>
					<Button
						block
						variant='primary'
						style={{ marginBottom: 15 }}
						onPress={() => navigation.navigate(AuthScreens.SignIn)}
					>
						Connexion
					</Button>
					<Button
						variant='secondary'
						onPress={() => navigation.navigate(AuthScreens.SignUp)}
					>
						Inscription
					</Button>

					{/* <Button
						variant='cyan'
						buttonStyle={{ marginBottom: 20 }}
						onPress={() => navigation.navigate(Screens.AuthInscription)}
						block
					>
						Incription par email
					</Button>
					<Button
						onPress={() => navigation.navigate(Screens.AuthConnexion)}
						variant='black'
						buttonStyle={{ marginBottom: 20 }}
						block
					>
						Connexion avec Apple
					</Button>
					<Button
						onPress={() => navigation.navigate(Screens.AuthConnexion)}
						block
					>
						Connexion par mail
					</Button> */}
				</View>
			</View>
		</SafeAreaView>
	)
}
