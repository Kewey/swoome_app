const Blue = '#4361ed'
const DarkBlue = '#090954'
const DarkerBlue = '#070740'
const Cyan = '#4cc8ef'
const Pink = '#f62584'
const Black = '#000'
const White = '#fff'
const Light = '#f8f8f8'
const LightGrey = '#f0f0f0'
const Grey = '#ccc'
const MediumGrey = '#b5b5b5'
const DarkGrey = '#222'

export {
	Blue,
	DarkBlue,
	DarkerBlue,
	Cyan,
	Pink,
	Black,
	White,
	LightGrey,
	Light,
	Grey,
	MediumGrey,
	DarkGrey,
}

export default {
	light: {
		text: DarkerBlue,
		background: Light,
		tint: Blue,
		tabIconDefault: Grey,
		tabIconSelected: Cyan,
	},
	dark: {
		text: White,
		background: DarkerBlue,
		tint: Blue,
		tabIconDefault: Grey,
		tabIconSelected: Cyan,
	},
}
