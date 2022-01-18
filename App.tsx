import React, { ReactElement } from 'react'
import { Provider, useSelector } from 'react-redux'
import { StatusBar } from 'expo-status-bar'
import useColorScheme from '@hooks/useColorScheme'

import AuthNavigation from '@navigation/AuthNavigation'
import MainNavigation from '@navigation/MainNavigation'
import userReducer, { getToken } from '@redux/reducers/user.reducer'
import { configureStore } from '@reduxjs/toolkit'
import { SafeAreaProvider } from 'react-native-safe-area-context'

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
	const token = useSelector(getToken)

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
