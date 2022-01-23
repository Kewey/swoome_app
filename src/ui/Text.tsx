import { useTheme } from '@react-navigation/native'
import { FONTS } from '@types/Fonts'
import { Text as NativeText, TextProps } from 'react-native'

interface TextProp extends TextProps {
	weight?: 'bold' | 'regular' | 'light'
}

const Text = ({ weight = 'regular', children, ...props }: TextProp) => {
	const { colors } = useTheme()

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
		<NativeText
			{...props}
			style={[{ fontFamily: textWeight, color: colors.text }, props.style]}
		>
			{children}
		</NativeText>
	)
}

export default Text
