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
	Pressable,
} from 'react-native'
import { FredokaText } from './StyledText'

interface ButtonInterface {
	variant?: 'blue' | 'black' | 'white' | 'cyan'
	after?: ReactChild
	before?: ReactChild
	children?: ReactChild
	buttonStyle?: StyleProp<ViewStyle>
	textStyle?: StyleProp<TextStyle>
	block?: boolean
	onPress?: () => void
}

export default function Button({
	after,
	before,
	children,
	buttonStyle,
	textStyle,
	onPress,
	variant = 'blue',
	block = false,
	...props
}: React.ComponentProps<typeof TouchableOpacity> & ButtonInterface) {
	return (
		<Pressable 
			onPress={onPress}
			style={[styles.buttonBase, variants[variant], buttonStyle, props.style, block && {width : '100%'}]}
			{...props}
		>
			<View style={styles.groupBase}>
				{before}
				<FredokaText style={[styles.text, textStyle]}>{children}</FredokaText>
				{after}
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	buttonBase: {
		padding: 20,
		borderRadius: 10,
		alignSelf: 'flex-start',
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
