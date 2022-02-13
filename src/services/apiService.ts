import axios from 'axios'
import { API_URL } from '@env'

export const API = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

API.interceptors.request.use(
	(config) => {
		// const token = localStorage.getItem('token')
		// if (token) {
		// 	config.headers['Authorization'] = `Bearer ${token}`
		// }
		return config
	},
	(error) => {
		console.error('Fetch :', error)
	}
)

async function getMe() {}

export const userApi = {
	getMe,
}
