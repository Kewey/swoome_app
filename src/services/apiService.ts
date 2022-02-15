import axios from 'axios'
import { API_URL } from '@env'
import * as SecureStore from 'expo-secure-store'
import { FetchResult } from 'react-native'
import { setToken } from '@redux/user.reducer'

export const API = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

API.interceptors.request.use(
	async (config) => {
		const token = await SecureStore.getItemAsync('token')
		if (token && config.headers) {
			config.headers['Authorization'] = `Bearer ${token}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

API.interceptors.response.use(
	(res) => res,
	async ({ config, response }: any) => {
		console.log('error request')
		if (config.url !== '/auth/login' && response) {
			// Access Token was expired
			if (response.status === 401 && !config._retry) {
				config._retry = true
				try {
					const refreshToken = await SecureStore.getItemAsync('refreshToken')
					const { data } = await API.post('/refresh', { refreshToken })
					setToken(data.access_token)
					return API(config)
				} catch (_error) {
					return Promise.reject(_error)
				}
			}
		}
	}
)
