import * as React from 'react'

import { Text, TextProps } from './Themed'

export function FredokaText(props: TextProps) {
	return <Text {...props} style={[props.style, { fontFamily: 'FredokaOne' }]} />
}

export function RegularText(props: TextProps) {
	return (
		<Text
			{...props}
			style={[props.style, { fontFamily: 'Montserrat-Regular' }]}
		/>
	)
}
