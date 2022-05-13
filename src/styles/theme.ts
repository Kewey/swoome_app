import { Blue, Cyan, DarkerBlue, Light, White } from '@constants/Colors'
import { DefaultTheme } from '@react-navigation/native'

export const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: White,
		secondary: Cyan,
		primary: Blue,
		card: Light,
		text: DarkerBlue,
	},
}
