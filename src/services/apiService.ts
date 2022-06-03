import axios from 'axios'
import { API_URL } from '@env'
import * as SecureStore from 'expo-secure-store'
import { EnhancedStore } from '@reduxjs/toolkit'
import { RootState } from '../../App'
import { setToken, setUser } from '@redux/user.reducer'
import { HydraError } from '@types/Utils'
import { Toast } from 'react-native-toast-message/lib/src/Toast'

export type APIHydraType = {
	'@id': string
	'@type': string
	id: string
	createdAt: Date
}

let store: EnhancedStore<RootState>
export const injectStore = (_store: EnhancedStore) => {
	store = _store
}

export const API = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

// API.interceptors.request.use(
// 	async (config) => {
// 		const token = await SecureStore.getItemAsync('token')
// 		if (token && config.headers) {
// 			config.headers['Authorization'] = `Bearer ${token}`
// 		}
// 		return config
// 	},
// 	(error) => {
// 		return Promise.reject(error)
// 	}
// )

API.interceptors.response.use(
	(res) => res,
	async ({ config, response }: any) => {
		console.log('-------------------------')
		// console.log(config)
		console.log('** error request **', response.data)

		if (response.data?.message === 'JWT Refresh Token Not Found') {
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
					// @ts-ignore
					API.defaults.headers['Authorization'] = null

					store.dispatch(setToken(''))
					store.dispatch(setUser(null))
					return Promise.reject(_error)
				}
			}
		}

		if (response.data) {
			Toast.show({
				type: 'error',
				text1: response.data['hydra:title'],
				text2: response.data['hydra:description'],
			})
		} else {
			Toast.show({
				type: 'error',
				text1: response.detail,
				text2: response.title,
			})
		}

		return Promise.reject<HydraError>(response.data)
	}
)
