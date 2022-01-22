import { FONTS } from '@types/Fonts'
import { Text as NativeText, TextProps } from 'react-native'

interface TextProp extends TextProps {
	weight?: 'bold' | 'regular' | 'light'
}

const Text = ({ weight = 'regular', children, ...props }: TextProp) => {
	let textWeight
	switch (weight) {
		case 'bold':
			textWeight = FONTS.MONTSERRAT_BOLD
			break
		case 'light':
			textWeight = FONTS.MONTSERRAT_LIGHT
			break
		default:
			textWeight = FONTS.MONTSERRAT_REGULAR
			break
	}

	return (
		<NativeText {...props} style={[props.style, { fontFamily: textWeight }]}>
			{children}
		</NativeText>
	)
}

export default Text
