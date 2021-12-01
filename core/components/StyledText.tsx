import { useTheme } from '@react-navigation/native'
import * as React from 'react'

import { Text as NativeText, TextProps } from './Themed'

export function FredokaText(props: TextProps) {
	const { colors } = useTheme()
	return (
		<NativeText
			{...props}
			style={[
				{ color: colors.text },
				props.style,
				{ fontFamily: 'FredokaOne' },
			]}
		/>
	)
}

export function Text({ bold, ...props }: TextProps & { bold?: boolean }) {
	const { colors } = useTheme()
	return (
		<NativeText
			{...props}
			style={[
				{
					color: colors.text,
					fontFamily: bold ? 'Montserrat-Bold' : 'Montserrat-Regular',
				},
				props.style,
			]}
		/>
	)
}
