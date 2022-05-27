import { View, Text } from 'react-native'
import React from 'react'
import TextInput from './TextInput'
import { FieldError } from 'react-hook-form'

interface InputProps {
	label: string
	errors: any
}

const Input = ({ label, errors, ...props }: InputProps) => {
	return (
		<View>
			<Text>{label}</Text>
			<TextInput {...props} />
			{errors.map(({ message }: FieldError) => (
				<Text>{message}</Text>
			))}
		</View>
	)
}

export default Input
