import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { StatusBar } from 'expo-status-bar'
import AuthNavigation from '@navigation/AuthNavigation'
import GroupNavigation from '@navigation/GroupNavigation'
import userReducer, { getTheme, getToken, setUser } from '@redux/user.reducer'
import { configureStore } from '@reduxjs/toolkit'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font'
import { View } from 'react-native'
import Text from '@ui/Text'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import persistReducer from 'redux-persist/es/persistReducer'
import { combineReducers } from 'redux'
import groupReducer, { getCurrentGroup } from '@redux/group.reducer'
import { getUser } from '@services/userService'
import { User } from '@types/user'
import { API, injectStore } from '@services/apiService'
import MainNavigation from '@navigation/MainNavigation'
import * as SplashScreen from 'expo-splash-screen'
import { FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one'
import {
	Montserrat_300Light,
	Montserrat_400Regular,
	Montserrat_700Bold,
} from '@expo-google-fonts/montserrat'
import { useTheme } from '@react-navigation/native'
import Toast from 'react-native-toast-message'

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
				ignoredActions: ['persist/PERSIST'],
			},
		}),
})

let persistor = persistStore(store)

injectStore(store)

export type RootState = ReturnType<typeof store.getState>

export function App() {
	const [isReady, setIsReady] = useState(false)
	const isDarkTheme = useSelector(getTheme)
	const { colors } = useTheme()
	const [currentUser, setCurrentUser] = useState<User>(null)
	const dispatch = useDispatch()
	const token = useSelector(getToken)
	// @ts-ignore
	API.defaults.headers['Authorization'] = `Bearer ${token}`

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
				await SplashScreen.preventAutoHideAsync()
				// Pre-load fonts, make any API calls you need to do here

				const user = await getUser()
				if (user) {
					setCurrentUser(user)
					dispatch(setUser(user))
				}
			} catch (e) {
				console.warn(e)
			} finally {
				// Tell the application to render
				setIsReady(true)
			}
		}

		prepare()
	}, [])

	const onLayoutRootView = useCallback(async () => {
		if (isReady && fontLoaded) {
			// This tells the splash screen to hide immediately! If we call this after
			// `setAppIsReady`, then we may see a blank screen while the app is
			// loading its initial state and rendering its first pixels. So instead,
			// we hide the splash screen once we know the root view has already
			// performed layout.
			await SplashScreen.hideAsync()
		}
	}, [isReady])

	const selectedGroup = useSelector(getCurrentGroup)

	if (!isReady && !fontLoaded) {
		return null
	}

	return (
		<View style={{ flex: 1 }} onLayout={onLayoutRootView}>
			<SafeAreaProvider style={{ backgroundColor: colors.background }}>
				<StatusBar style={isDarkTheme ? 'light' : 'dark'} />
				{!token ? (
					<AuthNavigation />
				) : !selectedGroup ? (
					<GroupNavigation />
				) : (
					<MainNavigation />
				)}
			</SafeAreaProvider>
		</View>
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
