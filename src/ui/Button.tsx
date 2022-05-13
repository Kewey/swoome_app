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
					ButtonStyle[variant],
					ButtonStyle[size],
					ButtonStyle.default,
					props.disabled && { opacity: 0.5 },
				]}
			>
				<FredokaText
					style={[
						LabelStyle[size],
						ButtonStyle[variant],
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
		color: White,
	},

	secondary: {
		backgroundColor: Cyan,
		color: White,
	},

	danger: {
		backgroundColor: 'red',
		color: White,
	},

	neutral: {
		backgroundColor: theme.colors.border,
		color: DarkGrey,
	},

	transparent: {
		backgroundColor: White,
		color: DarkerBlue,
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
