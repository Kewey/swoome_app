import React, { createContext, useEffect, useMemo } from 'react'
import * as SecureStore from 'expo-secure-store'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import useCachedResources from '@hooks/useCachedResources'
import useColorScheme from '@hooks/useColorScheme'
import Navigation from '@navigation/index'
import { Text, View } from '@components/Themed'
import useAuth from '@hooks/useAuth'
import { UserCreation, UserLogin } from '@services/userService'

const AuthContext = createContext(null)

export default function App() {
	const [state, dispatch] = useAuth()
	const isLoadingComplete = useCachedResources()
	const colorScheme = useColorScheme()

	useEffect(() => {
		// Fetch the token from storage then navigate to our appropriate place
		const refreshUserToken = async () => {
			let userToken

			try {
				userToken = await SecureStore.getItemAsync('userToken')
			} catch (e) {
				// Restoring token failed
			}

			// After restoring token, we may need to validate it in production apps

			// This will switch to the App screen or Auth screen and this loading
			// screen will be unmounted and thrown away.
			dispatch({ type: 'RESTORE_TOKEN', token: userToken })
		}

		refreshUserToken()
	}, [])

	const authContext = useMemo(
		() => ({
			signIn: async (data: UserLogin) => {
				// TODO : log user
				dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' })
			},
			signOut: () => dispatch({ type: 'SIGN_OUT' }),
			signUp: async (data: UserCreation) => {
				// TODO : signup user
				dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' })
			},
		}),
		[]
	)

	if (!isLoadingComplete) {
		return (
			<View>
				<Text>Chargement</Text>
			</View>
		)
	} else {
		return (
			<SafeAreaProvider>
				<AuthContext.Provider value={authContext}>
					<Navigation colorScheme={colorScheme} />
				</AuthContext.Provider>
				<StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />
			</SafeAreaProvider>
		)
	}
}
