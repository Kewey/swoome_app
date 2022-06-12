import {
	Blue,
	Cyan,
	DarkerBlue,
	DarkGrey,
	Light,
	MediumGrey,
	White,
} from '@constants/Colors'
import { DarkTheme, DefaultTheme } from '@react-navigation/native'

export const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: White,
		secondary: Cyan,
		primary: Blue,
		card: Light,
		text: DarkerBlue,
		muted: '#8b949e',
	},
}

export const darkTheme = {
	...DarkTheme,
	colors: {
		...DarkTheme.colors,
		primary: Blue,
		secondary: Cyan,
		border: MediumGrey,
		card: DarkGrey,
		muted: '#8b949e',
	},
}
