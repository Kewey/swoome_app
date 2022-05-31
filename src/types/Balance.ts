import { APIHydraType } from '@services/apiService'
import { User } from './user'

export interface Balance extends APIHydraType {
	balanceUser: User
	value: number
}
