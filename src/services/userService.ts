import { setToken, setUser } from '@redux/user.reducer'
import { API } from '@services/apiService'
import { Group } from '@types/Group'
import { User } from '@types/user'
import { useDispatch } from 'react-redux'

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
			return await API.get(`/me`)
		} else {
			return await API.get(`/user/${userId}`)
		}
	} catch (error) {}
}

export async function login(email: string, password: string): Promise<any> {
	try {
		return await API.post(`/auth/login`, {
			email,
			password,
		})
	} catch (error) {
		console.log('LOGIN |', error)
	}
}

export async function createUser(
	username: string,
	email: string,
	password: string
): Promise<{ user: User; token: string }> {
	const {
		// data: { user, token },
		data: user,
	} = await API.post(`/users`, {
		firstname: username,
		email,
		password,
	})
	const token = 'dzdzada'
	return { user, token }
}

export async function getUserGroups(userId: string): Promise<Group[]> {
	const {
		// data: { user, token },
		data: groups,
	} = await API.get(`/users/${userId}/groups`)
	const token = 'dzdzada'
	return groups
}
