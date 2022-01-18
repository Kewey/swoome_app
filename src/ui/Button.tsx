import Colors, { Blue, Cyan, White } from '@constants/Colors'
import { borderRadius } from '@styles/layout'
import React, { ReactChildren, ReactElement } from 'react'
import { View, Text, Pressable, PressableProps, StyleSheet } from 'react-native'

interface ButtonProps extends PressableProps {
	variant: 'primary' | 'secondary'
	block?: boolean
}

const Button = ({ block, variant, ...props }: ButtonProps): ReactElement => {
	return (
		<Pressable {...props}>
			<Text style={[styles[variant], styles.default]}>{props.children}</Text>
		</Pressable>
	)
}

export default Button

const styles = StyleSheet.create({
	primary: {
		backgroundColor: Blue,
		color: White,
	},

	secondary: {
		backgroundColor: Cyan,
		color: White,
	},

	default: {
		paddingHorizontal: 22,
		paddingVertical: 16,
		borderRadius: borderRadius,
		textAlign: 'center',
	},
})
