import { ActivityIndicator, View } from 'react-native'
import React from 'react'
import Text from './Text'
import { useTheme } from '@react-navigation/native'

const Loader = () => {
	const { colors } = useTheme()
	return <ActivityIndicator color={colors.primary} />
}

export default Loader
