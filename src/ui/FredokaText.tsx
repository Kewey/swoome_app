import { FONTS } from '@types/Fonts'
import { Text as NativeText, TextProps } from 'react-native'

interface TextProp extends TextProps {}

const FredokaText = ({ children, ...props }: TextProp) => {
	return (
		<NativeText
			{...props}
			style={[props.style, { fontFamily: FONTS.FREDOKAONE }]}
		>
			{children}
		</NativeText>
	)
}

export default FredokaText
