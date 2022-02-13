import { ReactElement } from 'react'
import { Light } from '@constants/Colors'
import { View, Pressable, StyleSheet, PressableProps } from 'react-native'

interface CircleButtonProps extends PressableProps {
	size?: number
	backgroundColor?: string
}

const CircleButton = ({
	size = 35,
	backgroundColor = Light,
	...props
}: CircleButtonProps): ReactElement => {
	return (
		<Pressable {...props}>
			<View
				style={[
					ButtonStyle.default,
					{
						height: size,
						width: size,
						borderRadius: size / 2,
						backgroundColor,
					},
				]}
			>
				{props.children}
			</View>
		</Pressable>
	)
}

export default CircleButton

const ButtonStyle = StyleSheet.create({
	default: {
		alignItems: 'center',
		justifyContent: 'center',
	},
})

const LabelStyle = StyleSheet.create({})
