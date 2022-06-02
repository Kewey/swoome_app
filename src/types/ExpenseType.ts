import { APIHydraType } from '@services/apiService'

export interface ExpenseType extends APIHydraType {
	name: string
	emoji: string
}
