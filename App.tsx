import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { StatusBar } from 'expo-status-bar'
import AuthNavigation from '@navigation/AuthNavigation'
import GroupNavigation from '@navigation/GroupNavigation'
import userReducer, {
	getTheme,
	getToken,
	getCurrentUser,
	setUser,
} from '@redux/user.reducer'
import { configureStore } from '@reduxjs/toolkit'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import persistReducer from 'redux-persist/es/persistReducer'
import { combineReducers } from 'redux'
import groupReducer, { getCurrentGroup } from '@redux/group.reducer'
import { getUser } from '@services/userService'
import { API, injectStore } from '@services/apiService'
import MainNavigation from '@navigation/MainNavigation'
import * as SplashScreen from 'expo-splash-screen'
import { FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one'
import {
	Montserrat_300Light,
	Montserrat_400Regular,
	Montserrat_700Bold,
} from '@expo-google-fonts/montserrat'
import {
	DarkTheme,
	NavigationContainer,
	useTheme,
} from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import { darkTheme, theme } from '@styles/theme'
import { useColorScheme } from 'react-native'

SplashScreen.preventAutoHideAsync().catch(() => {})

const persistConfig = {
	key: 'root',
	version: 1,
	storage: AsyncStorage,
}

const rootReducer = combineReducers({
	user: userReducer,
	group: groupReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})

let persistor = persistStore(store)

injectStore(store)

export type RootState = ReturnType<typeof store.getState>

export function App() {
	const dispatch = useDispatch()
	const token = useSelector(getToken)
	const isDarkTheme = useSelector(getTheme)
	const currentUser = useSelector(getCurrentUser)
	const { colors } = useTheme()

	const [fontLoaded] = useFonts({
		FredokaOne_400Regular,
		Montserrat_400Regular,
		Montserrat_700Bold,
		Montserrat_300Light,
	})

	useEffect(() => {
		async function prepare() {
			try {
				// Keep the splash screen visible while we fetch resources
				// Pre-load fonts, make any API calls you need to do here

				if (!token) {
					dispatch(setUser(null))
					return
				}

				// @ts-ignore
				API.defaults.headers['Authorization'] = `Bearer ${token}`
				const user = await getUser()

				if (user) {
					dispatch(setUser(user))
				}
			} catch (e) {
				console.log(e)
			} finally {
				// Tell the application to render
				await SplashScreen.hideAsync()
			}
		}

		prepare()
	}, [])

	const selectedGroup = useSelector(getCurrentGroup)

	if (!fontLoaded) {
		return null
	}

	return (
		<SafeAreaProvider style={{ backgroundColor: colors.background }}>
			<StatusBar style={isDarkTheme ? 'light' : 'dark'} />
			<NavigationContainer theme={isDarkTheme ? darkTheme : theme}>
				{!currentUser ? (
					<AuthNavigation />
				) : !selectedGroup ? (
					<GroupNavigation />
				) : (
					<MainNavigation />
				)}
			</NavigationContainer>
		</SafeAreaProvider>
	)
}

export default function AppWrapper(): ReactElement {
	return (
		<>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<App />
				</PersistGate>
			</Provider>
			<Toast />
		</>
	)
}
