import { Blue, DarkerBlue, Light, White } from '@constants/Colors'
import { DefaultTheme } from '@react-navigation/native'

export const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: White,
		primary: Blue,
		card: Light,
		text: DarkerBlue,
	},
}
