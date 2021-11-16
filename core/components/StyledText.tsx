import { useTheme } from '@react-navigation/native'
import * as React from 'react'

import { Text, TextProps } from './Themed'

export function FredokaText(props: TextProps) {
	const color = useTheme()
	return (
		<Text
			{...props}
			style={[
				{ color: color.colors.text },
				props.style,
				{ fontFamily: 'FredokaOne' },
			]}
		/>
	)
}

export function RegularText(props: TextProps) {
	const color = useTheme()
	return (
		<Text
			{...props}
			style={[
				{ color: color.colors.text },
				props.style,
				{
					fontFamily: 'Montserrat-Regular',
				},
			]}
		/>
	)
}
