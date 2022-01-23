import { ReactElement } from 'react'
import { Blue, Cyan, White } from '@constants/Colors'
import { borderRadius } from '@styles/layout'
import { FONTS } from '@types/Fonts'
import { View, Pressable, PressableProps, StyleSheet } from 'react-native'
import FredokaText from './FredokaText'

interface ButtonProps extends PressableProps {
	variant?: 'primary' | 'secondary'
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
					style={{
						color: '#fff',
						textAlign: 'center',
					}}
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

const LabelStyle = StyleSheet.create({})
