import { API_URL } from '@env'
import { setToken, setUser } from '@redux/reducers/user.reducer'
import { useDispatch } from 'react-redux'
import { API } from './apiService'

export interface UserCreation {
	firstname: string
	mail: string
	password: string
}

export interface UserCredential {
	email: string
	password: string
}

export async function getUser(id = 'me') {
	try {
		if (id === 'me') {
			return await API.get(`${API_URL}/me`)
		} else {
			return await API.get(`${API_URL}/user/${id}`)
		}
	} catch (error) {}
}

export async function createUser({ firstname, mail, password }: UserCreation) {
	try {
		return await API.post(`${API_URL}/user/`, {
			firstname,
			mail,
			password,
		})
	} catch (error) {}
}

export function logout() {
	return (dispatch: any) => {
		dispatch(setToken(''))
		dispatch(setUser())
	}
}

// export async function login(userCredential: UserCredential) => async (dispatch: any) => {
// 	try {
// 		const {access_token} = await API.post(`${API_URL}/users/`, userCredential)
// 		dispatch(setToken(access_token))

// 	} catch (error) {}
// }
