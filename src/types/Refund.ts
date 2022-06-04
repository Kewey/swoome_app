import { APIHydraType } from '@services/apiService'
import { User } from './user'

export interface Refund extends APIHydraType {
	price: number
	refunder: User
	receiver: User
}
