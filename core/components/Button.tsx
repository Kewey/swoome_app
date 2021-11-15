import { colorBlue, colorWhite } from '@constants/Colors'
import React, { ReactChild } from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	TextProps,
} from 'react-native'

export default function Button({ varia, children }: { children: ReactChild }) {
	return (
		<TouchableOpacity style={styles.buttonBase}>
			<View>
				<Text style={styles.text}>{children}</Text>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	buttonBase: {
		padding: 20,
		backgroundColor: colorBlue,
		borderRadius: 10,
		width: '100%',
	},
	text: {
		textAlign: 'center',
		fontSize: 17,
		fontFamily: 'FredokaOne',
		color: colorWhite,
	},
})
