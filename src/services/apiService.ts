import axios from 'axios'
import { API_URL } from '@env'

const API = axios.create({
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
		// return config
	},
	(error) => Promise.reject(error)
)

async function getMe() {}

export const userApi = {
	getMe,
}
