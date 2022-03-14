import { API } from '@services/apiService'
import { Group } from '@types/Group'
import { User } from '@types/user'

export interface UserCreation {
	firstname: string
	mail: string
	password: string
}

export interface UserCredential {
	email: string
	password: string
}

export async function getUser(userId?: string): Promise<User | undefined> {
	try {
		if (!userId) {
			const { data } = await API.get(`/me`)
			return data
		} else {
			const { data } = await API.get(`/user/${userId}`)
			return data
		}
	} catch (error) {}
}

export async function login(email: string, password: string): Promise<any> {
	try {
		const { data } = await API.post(`/auth/login`, {
			email,
			password,
		})
		return data
	} catch (error) {
		return Promise.reject(error)
	}
}

export async function createUser(
	username: string,
	email: string,
	password: string
): Promise<User> {
	const {
		// data: { user, token },
		data: user,
	} = await API.post(`/auth/register`, {
		username,
		email,
		password,
	})
	return user
}

export async function getUserGroups(
	userId: string
): Promise<{ groups: Group[]; totalItems: number }> {
	const {
		data: { 'hydra:member': groups, 'hydra:totalItems': totalItems },
	} = await API.get(`/users/${userId}/groups`)
	return { groups, totalItems }
}

export async function logout() {}
