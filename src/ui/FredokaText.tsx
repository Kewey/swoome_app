import { useTheme } from '@react-navigation/native'
import { FONTS } from '@types/Fonts'
import { Text as NativeText, TextProps } from 'react-native'

interface TextProp extends TextProps {}

const FredokaText = ({ children, ...props }: TextProp) => {
	const { colors } = useTheme()
	return (
		<NativeText
			{...props}
			style={[
				{ fontFamily: FONTS.FREDOKAONE, color: colors.text },
				props.style,
			]}
		>
			{children}
		</NativeText>
	)
}

export default FredokaText
