import { White } from '@constants/Colors'
import { useTheme } from '@react-navigation/native'
import { borderRadius } from '@styles/layout'
import React from 'react'
import { TextInput as NativeTextInput, TextInputProps } from 'react-native'

interface TextInputProp extends TextInputProps {}

const TextInput = ({ ...props }: TextInputProp) => {
	const { colors } = useTheme()

	return (
		<NativeTextInput
			{...props}
			placeholderTextColor={colors.border}
			underlineColorAndroid={'transparent'}
			style={[
				{
					borderWidth: 1,
					borderStyle: 'solid',
					borderRadius: borderRadius,
					paddingHorizontal: 16,
					paddingVertical: 12,
					backgroundColor: colors.card,
					borderColor: colors.border,
					color: colors.text,
				},
				props.style,
			]}
		/>
	)
}

export default TextInput
