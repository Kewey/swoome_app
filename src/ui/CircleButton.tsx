import { ReactElement } from 'react'
import { Light } from '@constants/Colors'
import { View, Pressable, StyleSheet, PressableProps } from 'react-native'

interface CircleButtonProps extends PressableProps {
	size?: number
}

const CircleButton = ({
	size = 35,
	...props
}: CircleButtonProps): ReactElement => {
	return (
		<Pressable {...props}>
			<View
				style={[
					ButtonStyle.default,
					{ height: size, width: size, borderRadius: size / 2 },
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
		backgroundColor: Light,
	},
})

const LabelStyle = StyleSheet.create({})
