import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import useCachedResources from '@hooks/useCachedResources'
import useColorScheme from '@hooks/useColorScheme'
import Navigation from '@navigation'
import { Text } from '@components/Themed'

export default function App() {
	const isLoadingComplete = useCachedResources()
	const colorScheme = useColorScheme()

	if (!isLoadingComplete) {
		return null
	} else {
		return (
			<SafeAreaProvider>
				<Navigation colorScheme={colorScheme} />
				<StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />
			</SafeAreaProvider>
		)
	}
}
