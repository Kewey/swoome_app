import React, { ReactElement } from 'react'
import { Provider, useSelector } from 'react-redux'
import { StatusBar } from 'expo-status-bar'
import useColorScheme from '@hooks/useColorScheme'

import AuthNavigation from '@navigation/AuthNavigation'
import MainNavigation from '@navigation/MainNavigation'
import userReducer, { getToken } from '@redux/reducers/user.reducer'
import { configureStore } from '@reduxjs/toolkit'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font'
import { Text, View } from 'react-native'
import { FONTS } from '@types/Fonts'

const store = configureStore({
	reducer: {
		user: userReducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }),
})

export type RootState = ReturnType<typeof store.getState>

export function App(): ReactElement {
	const colorScheme = useColorScheme()
	const [loaded] = useFonts({
		[FONTS.MONTSERRAT_REGULAR]: require('./src/assets/fonts/Montserrat-Regular.ttf'),
		[FONTS.MONTSERRAT_BOLD]: require('./src/assets/fonts/Montserrat-Bold.ttf'),
		[FONTS.MONTSERRAT_LIGHT]: require('./src/assets/fonts/Montserrat-Light.ttf'),
		[FONTS.FREDOKAONE]: require('./src/assets/fonts/FredokaOne-Regular.ttf'),
	})
	const token = useSelector(getToken)

	if (!loaded) {
		return (
			<View>
				<Text>Chargement</Text>
			</View>
		)
	}

	return (
		<SafeAreaProvider>
			<StatusBar style={colorScheme} />
			{token ? <MainNavigation /> : <AuthNavigation />}
		</SafeAreaProvider>
	)
}

export default function AppWrapper(): ReactElement {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	)
}
