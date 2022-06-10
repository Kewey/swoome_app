import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@types/user'
import { Appearance } from 'react-native'
import { RootState } from '../../App'

interface UserSlice {
	user: User | null
	token: string | null
	settings: {
		isDarkTheme: boolean
		isNotificationActive: string
	}
}

const initialState: UserSlice = {
	user: null,
	token: '',
	settings: {
		isDarkTheme: Appearance.getColorScheme() === 'dark',
		isNotificationActive: '',
	},
}

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		setUser: {
			reducer: (state, action: PayloadAction<User>) => {
				state.user = action.payload
			},
			prepare: (user: User) => ({ payload: user }),
		},
		setToken: {
			reducer: (state, action: PayloadAction<string>) => {
				state.token = action.payload
			},
			prepare: (token: string) => ({ payload: token }),
		},
		disconectUser: {
			reducer: (state) => {
				;(state.token = ''), (state.user = null)
			},
			prepare: () => ({ payload: null }),
		},
		setTheme: {
			reducer: (state, action: PayloadAction<boolean>) => {
				state.settings.isDarkTheme = action.payload
			},
			prepare: (isDarkTheme: boolean) => ({ payload: isDarkTheme }),
		},
		setNotification: {
			reducer: (state, action: PayloadAction<string>) => {
				state.settings.isNotificationActive = action.payload
			},
			prepare: (isNotificationActive: string) => ({
				payload: isNotificationActive,
			}),
		},
	},
})

const getCurrentUser = (state: RootState) => state.user.user
const getUserGroups = (state: RootState) => state.user.user?.groups
const getToken = (state: RootState) => state.user.token
const getTheme = (state: RootState) => state.user.settings?.isDarkTheme
const getIsNotificationActive = (state: RootState) =>
	state.user.settings.isNotificationActive

export const { setUser, setToken, setTheme, disconectUser, setNotification } =
	userSlice.actions
export {
	getCurrentUser,
	getToken,
	getUserGroups,
	getTheme,
	getIsNotificationActive,
}

export default userSlice.reducer
