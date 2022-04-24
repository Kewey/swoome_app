import axios from 'axios'
import { API_URL } from '@env'
import * as SecureStore from 'expo-secure-store'
import { EnhancedStore } from '@reduxjs/toolkit'
import { RootState } from '../../App'
import { setToken, setUser } from '@redux/user.reducer'

let store: EnhancedStore<RootState>

export type APIHydraType = {
	'@id': string
	'@type': string
	id: string
	createdAt: Date
}

export const injectStore = (_store: EnhancedStore) => {
	store = _store
}

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
		console.log('** error request **', response.data)
		if (response.data?.message === 'JWT Refresh Token Not Found') {
			console.log('token expired', response.config.url)
			// @ts-ignore
			API.defaults.headers['Authorization'] = null

			store.dispatch(setToken(''))
			store.dispatch(setUser(null))
			return
		}

		if (config.url !== '/auth/login' && response) {
			// Access Token was expired
			if (response.status === 401 && !config._retry) {
				config._retry = true
				const refresh_token = await SecureStore.getItemAsync('refresh_token')
				try {
					const {
						data: { token, ...othersData },
					} = await API.post('/auth/refresh', { refresh_token })

					store.dispatch(setToken(token))
					// @ts-ignore
					API.defaults.headers['Authorization'] = `Bearer ${token}`
					const prevCall = {
						...config,
						headers: {
							...config.headers,
							Authorization: `Bearer ${token}`,
						},
					}

					return API(prevCall)
				} catch (_error) {
					console.log('token expired', response.config.url)

					// @ts-ignore
					API.defaults.headers['Authorization'] = null

					store.dispatch(setToken(''))
					store.dispatch(setUser(null))
					return Promise.reject(_error)
				}
			}
		}
	}
)
