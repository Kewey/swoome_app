import axios from 'axios'
import { API_URL } from '@env'
import { useSelector } from 'react-redux'
import { getToken } from '@redux/user.reducer'

export const API = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

API.interceptors.request.use(
	(config) => {
		// const token = useSelector(getToken)
		// if (!config.headers?.Authorization && config.headers) {
		// 	config.headers.Authorization = `Bearer ${token}`
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
