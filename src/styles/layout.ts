import { White } from '@constants/Colors'
import { sideMargin } from '@constants/Layout'
import { StyleSheet } from 'react-native'

export const borderRadius = 8
export const paddingHorizontal = sideMargin

export const layout = StyleSheet.create({
	container: {
		flex: 1,
	},
	rowSBCenter: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
})
