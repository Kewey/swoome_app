import { View, TextInputProps } from 'react-native'
import React from 'react'
import TextInput from './TextInput'
import { FieldError } from 'react-hook-form'
import Text from './Text'
import FredokaText from './FredokaText'
import { useTheme } from '@react-navigation/native'

interface InputProps extends TextInputProps {
	label: string
	error?: FieldError
	optionnal?: boolean
}

const Input = ({ label, error, optionnal, ...props }: InputProps) => {
	const { colors } = useTheme()
	return (
		<View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<FredokaText style={{ marginBottom: 5 }}>{label}</FredokaText>
				{optionnal && <Text style={{ marginBottom: 5 }}>(optionnel)</Text>}
			</View>
			<TextInput
				{...props}
				style={{
					marginBottom: 5,
					borderColor: !!error ? colors.notification : colors.border,
				}}
			/>
			{!!error && (
				<Text style={{ color: colors.notification }}>{error.message}</Text>
			)}
		</View>
	)
}

export default Input
