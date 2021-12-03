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
import { FredokaText, Text } from './StyledText'

interface ButtonInterface {
	variant?: 'blue' | 'black' | 'white' | 'cyan'
	after?: ReactChild
	before?: ReactChild
	children?: ReactChild
	buttonStyle?: StyleProp<ViewStyle>
	textStyle?: StyleProp<TextStyle>
	size?: 'small' | 'medium' | 'large'
	block?: boolean
	circle?: boolean
	text?: boolean
	onPress?: () => void
}

export default function Button({
	after,
	before,
	children,
	buttonStyle,
	textStyle,
	onPress,
	size = 'medium',
	variant = 'blue',
	block = false,
	circle = false,
	text = false,
	...props
}: React.ComponentProps<typeof TouchableOpacity> & ButtonInterface) {
	if (text) {
		return (
			<Pressable
				{...props}
				onPress={onPress}
				style={block && { width: '100%' }}
			>
				{before}
				<Text
					bold
					style={[{ textAlign: 'center' }, fontSizes[size], textStyle]}
				>
					{children}
				</Text>
				{after}
			</Pressable>
		)
	}

	return (
		<Pressable
			onPress={onPress}
			style={[
				styles.buttonBase,
				variants[variant],
				sizes[size],
				buttonStyle,
				props.style,
				block && { width: '100%' },
				circle && { borderRadius: 50 },
			]}
			{...props}
		>
			<View style={styles.groupBase}>
				{before}
				<FredokaText
					style={[
						{ textAlign: 'center' },
						variants[variant],
						fontSizes[size],
						textStyle,
					]}
				>
					{children}
				</FredokaText>
				{after}
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	buttonBase: {
		alignSelf: 'flex-start',
	},
	groupBase: {
		flexDirection: 'row',
		justifyContent: 'center',
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

const sizes = StyleSheet.create({
	small: {
		padding: 8,
		borderRadius: 4,
	},
	medium: {
		padding: 14,
		borderRadius: 6,
	},
	large: {
		padding: 20,
		borderRadius: 10,
	},
})

const fontSizes = StyleSheet.create({
	small: {
		fontSize: 12,
	},
	medium: {
		fontSize: 14,
	},
	large: {
		fontSize: 17,
	},
})
