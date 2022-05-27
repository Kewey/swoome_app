import { ReactElement } from 'react'
import {
	Blue,
	Cyan,
	DarkerBlue,
	DarkGrey,
	Grey,
	White,
} from '@constants/Colors'
import { borderRadius } from '@styles/layout'
import { View, Pressable, PressableProps, StyleSheet } from 'react-native'
import FredokaText from './FredokaText'
import { theme } from '@styles/theme'

interface ButtonProps extends PressableProps {
	variant?: 'primary' | 'secondary' | 'danger' | 'neutral' | 'transparent'
	block?: boolean
	size?: 'large' | 'medium' | 'small'
}

const Button = ({
	block,
	variant = 'primary',
	size = 'medium',
	...props
}: ButtonProps): ReactElement => {
	return (
		<Pressable {...props}>
			<View
				style={[
					ButtonStyle.default,
					ButtonStyle[variant],
					ButtonStyle[size],
					props.disabled && { opacity: 0.5 },
				]}
			>
				<FredokaText
					style={[
						LabelStyle[size],
						TextStyle[variant],
						{
							textAlign: 'center',
						},
					]}
				>
					{props.children}
				</FredokaText>
			</View>
		</Pressable>
	)
}

export default Button

const ButtonStyle = StyleSheet.create({
	primary: {
		backgroundColor: Blue,
	},

	secondary: {
		backgroundColor: Cyan,
	},

	danger: {
		backgroundColor: 'red',
	},

	neutral: {
		backgroundColor: theme.colors.card,
	},

	transparent: {
		backgroundColor: 'transparent',
	},

	default: {
		borderRadius: borderRadius,
	},

	large: {
		paddingVertical: 19,
		paddingHorizontal: 28,
	},

	medium: {
		paddingHorizontal: 22,
		paddingVertical: 16,
	},

	small: {
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
})

const TextStyle = StyleSheet.create({
	primary: {
		color: White,
	},

	secondary: {
		color: White,
	},

	danger: {
		color: White,
	},

	neutral: {
		color: theme.colors.text,
	},

	transparent: {
		color: theme.colors.primary,
	},
})

const LabelStyle = StyleSheet.create({
	large: {
		fontSize: 17,
	},

	medium: {
		fontSize: 14,
	},

	small: {
		fontSize: 12,
	},
})
