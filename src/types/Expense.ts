import { APIHydraType } from '@services/apiService'
import { User } from './user'

export interface Expense extends APIHydraType {
	name: string
	price: number
	description?: string
	madeBy: User
	participants: User[]
	expenseAt?: string
}

export interface ExpenseForm {
	name: string
	price: string
	category: string
	participants: string[]
	description?: string
	expenseAt?: string
	madeBy?: string | null
}
