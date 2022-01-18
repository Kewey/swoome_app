import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as SecureStorage from 'expo-secure-store'
import { User } from '@types/user'
import { RootState } from '../../../App'

interface UserSlice {
	isLoading: boolean
	user: User | null
	token: string | null
}

async function initTokenFromStorage() {
	return await SecureStorage.getItemAsync('token')
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
				// Add Async
				SecureStorage.setItemAsync('token', action.payload)
				state.token = action.payload
			},
			prepare: (token: string) => ({ payload: token }),
		},
	},
})

const getCurrentUser = (state: RootState) => state.user
const getToken = (state: RootState) => state.user.token
const isCurrentUserLoading = (state: RootState) => state.user.isLoading

export const { setUser, setToken } = userSlice.actions
export { getCurrentUser, getToken, isCurrentUserLoading }

export default userSlice.reducer
