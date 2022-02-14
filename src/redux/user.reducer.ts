import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Group } from '@types/Group'
import { User } from '@types/user'
import { RootState } from '../../App'

interface UserSlice {
	isLoading: boolean
	user: User | null
	token: string | null
}

const initialState: UserSlice = {
	isLoading: false,
	user: null,
	token: '',
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
	},
})

const getCurrentUser = (state: RootState) => state.user.user
const getUserGroups = (state: RootState) => state.user.user?.groups
const getToken = (state: RootState) => state.user.token
const isCurrentUserLoading = (state: RootState) => state.user.isLoading

export const { setUser, setToken } = userSlice.actions
export { getCurrentUser, getToken, isCurrentUserLoading, getUserGroups }

export default userSlice.reducer
