import { APIHydraType } from '@services/apiService'

export interface Media extends APIHydraType {
	url: string
}

export interface File {
	cancelled: boolean
	height: number
	type: string
	uri: string
	width: number
}
