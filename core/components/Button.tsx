import {
	colorBlack,
	colorBlue,
	colorCyan,
	colorDarkerBlue,
	colorLight,
	colorWhite,
} from '@constants/Colors'
import React, { ReactChild } from 'react'
import {
	View,
	TouchableOpacity,
	StyleSheet,
	StyleProp,
	ViewStyle,
	TextStyle,
	TouchableOpacityComponent,
} from 'react-native'
import { FredokaText } from './StyledText'

interface ButtonInterface {
	variant?: 'blue' | 'black' | 'white' | 'cyan'
	after?: ReactChild
	before?: ReactChild
	children?: ReactChild
	buttonStyle?: StyleProp<ViewStyle>
	textStyle?: StyleProp<TextStyle>
	onPress?: () => void
}

export default function Button({
	variant = 'blue',
	after,
	before,
	children,
	buttonStyle,
	textStyle,
	onPress,
	...props
}: React.ComponentProps<typeof TouchableOpacity> & ButtonInterface) {
	return (
		<TouchableOpacity {...props}
			onPress={onPress}
			style={[styles.buttonBase, variants[variant], buttonStyle]}
		>
			<View style={styles.groupBase}>
				{before}
				<FredokaText style={[styles.text, textStyle]}>{children}</FredokaText>
				{after}
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	buttonBase: {
		padding: 20,
		borderRadius: 10,
		width: '100%',
	},
	groupBase: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	text: {
		textAlign: 'center',
		fontSize: 17,
		fontFamily: 'FredokaOne',
	},
})

const variants = StyleSheet.create({
	blue: {
		backgroundColor: colorBlue,
		color: colorWhite,
	},
	cyan: {
		backgroundColor: colorCyan,
		color: colorWhite,
	},
	black: {
		backgroundColor: colorBlack,
		color: colorWhite,
	},
	white: {
		backgroundColor: colorLight,
		color: colorDarkerBlue,
	},
})
