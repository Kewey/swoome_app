import { White } from '@constants/Colors'
import { StyleSheet } from 'react-native'

export const borderRadius = 8

export const layout = StyleSheet.create({
	container: {
		flex: 1,
		padding: 25,
		backgroundColor: White,
	},
	rowSBCenter: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
})
