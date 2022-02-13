import React, { ReactElement } from 'react'
import { Provider, useSelector } from 'react-redux'
import { StatusBar } from 'expo-status-bar'
import useColorScheme from '@hooks/useColorScheme'
import AuthNavigation from '@navigation/AuthNavigation'
import GroupNavigation from '@navigation/GroupNavigation'
import MainNavigation from '@navigation/MainNavigation'
import userReducer, {
	getToken,
	getUserGroups,
} from '@redux/reducers/user.reducer'
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

const persistConfig = {
	key: 'root',
	version: 1,
	storage: AsyncStorage,
}

const rootReducer = combineReducers({
	user: userReducer,
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
	const [loaded] = useFonts({
		[FONTS.FREDOKAONE]: require('./src/assets/fonts/FredokaOne-Regular.ttf'),
		[FONTS.MONTSERRAT_REGULAR]: require('./src/assets/fonts/Montserrat-Regular.ttf'),
		[FONTS.MONTSERRAT_BOLD]: require('./src/assets/fonts/Montserrat-Bold.ttf'),
		[FONTS.MONTSERRAT_LIGHT]: require('./src/assets/fonts/Montserrat-Light.ttf'),
	})

	const token = useSelector(getToken)
	const haveGroups = useSelector(getUserGroups)

	if (!loaded) {
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
			) : !haveGroups ? (
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
