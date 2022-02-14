import { API_URL } from '@env'
import { setToken, setUser } from '@redux/user.reducer'
import { API } from '@services/apiService'
import { Group } from '@types/Group'
import { User, UserLogin } from '@types/user'

export interface UserCreation {
	firstname: string
	mail: string
	password: string
}

export interface UserCredential {
	email: string
	password: string
}

export async function getUser(userId = 'me') {
	try {
		if (!userId) {
			return await API.get(`${API_URL}/me`)
		} else {
			return await API.get(`${API_URL}/user/${userId}`)
		}
	} catch (error) {}
}

export async function login(
	email: string,
	password: string
): Promise<User | undefined> {
	try {
		return await API.post(`${API_URL}/auth/login`, {
			email,
			password,
		})
	} catch (error) {}
}

export async function createUser(
	username: string,
	email: string,
	password: string
): Promise<{ user: User; token: string }> {
	const {
		// data: { user, token },
		data: user,
	} = await API.post(`${API_URL}/users`, {
		firstname: username,
		email,
		password,
	})
	const token = 'dzdzada'
	return { user, token }
}

export async function getUserGroups(userId: string[]): Promise<Group[]> {
	const {
		// data: { user, token },
		data: groups,
	} = await API.get(`${API_URL}/users/${userId}/groups`)
	const token = 'dzdzada'
	return groups
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
