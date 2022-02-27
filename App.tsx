import React, { ReactElement, useEffect, useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { StatusBar } from 'expo-status-bar'
import useColorScheme from '@hooks/useColorScheme'
import AuthNavigation from '@navigation/AuthNavigation'
import GroupNavigation from '@navigation/GroupNavigation'
import MainNavigation from '@navigation/MainNavigation'
import userReducer, {
	getToken,
	getUserGroups,
	setUser,
} from '@redux/user.reducer'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font'
import { View } from 'react-native'
import { FONTS } from '@types/Fonts'
import Text from '@ui/Text'
import { White } from '@constants/Colors'
import {
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	persistStore,
} from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import persistReducer from 'redux-persist/es/persistReducer'
import { combineReducers } from 'redux'
import groupReducer, { getCurrentGroup } from '@redux/group.reducer'
import { getUser } from '@services/userService'
import { User } from '@types/user'
import { API } from '@services/apiService'

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

export type RootState = ReturnType<typeof store.getState>

export function App(): ReactElement {
	const colorScheme = useColorScheme()
	const [currentUser, setCurrentUser] = useState<User>(null)
	const dispatch = useDispatch()
	const [loaded] = useFonts({
		[FONTS.FREDOKAONE]: require('./src/assets/fonts/FredokaOne-Regular.ttf'),
		[FONTS.MONTSERRAT_REGULAR]: require('./src/assets/fonts/Montserrat-Regular.ttf'),
		[FONTS.MONTSERRAT_BOLD]: require('./src/assets/fonts/Montserrat-Bold.ttf'),
		[FONTS.MONTSERRAT_LIGHT]: require('./src/assets/fonts/Montserrat-Light.ttf'),
	})
	const token = useSelector(getToken)
	API.defaults.headers['Authorization'] = `Bearer ${token}`

	useEffect(() => {
		getUser().then((res) => {
			if (!res) {
				return
			}
			setCurrentUser(res)
			dispatch(setUser(res))
		})
	}, [])

	const selectedGroup = useSelector(getCurrentGroup)

	if (!loaded && !currentUser) {
		return (
			<View>
				<Text>Chargement</Text>
			</View>
		)
	}

	return (
		<SafeAreaProvider style={{ backgroundColor: White }}>
			<StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />
			{!token ? (
				<AuthNavigation />
			) : !selectedGroup ? (
				<GroupNavigation />
			) : (
				<MainNavigation />
			)}
		</SafeAreaProvider>
	)
}

export default function AppWrapper(): ReactElement {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	)
}
