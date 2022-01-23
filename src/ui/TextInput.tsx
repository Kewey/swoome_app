import { White } from '@constants/Colors'
import { borderRadius } from '@styles/layout'
import React from 'react'
import { TextInput as NativeTextInput, TextInputProps } from 'react-native'

interface TextInputProp extends TextInputProps {}

const TextInput = ({ ...props }: TextInputProp) => {
	return (
		<NativeTextInput
			{...props}
			style={[
				{
					borderWidth: 1,
					borderStyle: 'solid',
					borderColor: '#ddd',
					borderRadius: borderRadius,
					paddingHorizontal: 16,
					paddingVertical: 12,
					backgroundColor: White,
				},
				props.style,
			]}
		/>
	)
}

export default TextInput
