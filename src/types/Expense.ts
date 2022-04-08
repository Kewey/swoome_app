import { APIHydraType } from '@services/apiService'
import { User } from './user'

export interface Expense extends APIHydraType {
	name: string
	price: number
	description: string
	madeBy: User
	participants: User[]
}

export interface ExpenseForm {
	name: string
	description: string
	price: number
	madeBy?: string | null
	participants: string[]
}
