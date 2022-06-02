import { View, Text, TextInputProps } from 'react-native'
import React from 'react'
import TextInput from './TextInput'
import { FieldError } from 'react-hook-form'

interface InputProps extends TextInputProps {
	label: string
	errors?: FieldError[]
}

const Input = ({ label, errors, ...props }: InputProps) => {
	return (
		<View>
			<Text style={{ marginBottom: 7 }}>{label}</Text>
			<TextInput {...props} />
			{errors?.map(({ message }, index) => (
				<Text key={`error-${index}`}>{message}</Text>
			))}
		</View>
	)
}

export default Input
