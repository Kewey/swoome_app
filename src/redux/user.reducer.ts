import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@types/user'
import { RootState } from '../../App'

interface UserSlice {
	user: User | null
	token: string | null
	settings: {
		isDarkTheme: boolean
	}
}

const initialState: UserSlice = {
	user: null,
	token: '',
	settings: {
		isDarkTheme: false,
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
			prepare: (user?: User) => ({ payload: user || null }),
		},
		setToken: {
			reducer: (state, action: PayloadAction<string>) => {
				state.token = action.payload
			},
			prepare: (token: string) => ({ payload: token }),
		},
		setTheme: {
			reducer: (state, action: PayloadAction<boolean>) => {
				state.settings = { isDarkTheme: action.payload }
			},
			prepare: (isDarkTheme: boolean) => ({ payload: isDarkTheme }),
		},
	},
})

const getCurrentUser = (state: RootState) => state.user.user
const getUserGroups = (state: RootState) => state.user.user?.groups
const getToken = (state: RootState) => state.user.token
const getTheme = (state: RootState) => state.user.settings?.isDarkTheme

export const { setUser, setToken, setTheme } = userSlice.actions
export { getCurrentUser, getToken, getUserGroups, getTheme }

export default userSlice.reducer
