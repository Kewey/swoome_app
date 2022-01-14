import axios from 'axios'
import { API_URL } from '@env'

export interface UserCreation {
	firstname: string
	mail: string
	password: string
}

export interface UserLogin {
	mail: string
	password: string
}

export function getUser(id = 'me') {
	axios.get(`${API_URL}/user/${id}`)
}

export function createUser({ firstname, mail, password }: UserCreation) {
	axios.post(`${API_URL}/user/`, {
		firstname,
		mail,
		password,
	})
}
