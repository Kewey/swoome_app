import { APIHydraType } from '@services/apiService'
import { ExpenseType } from './ExpenseType'
import { User } from './user'

export interface Expense extends APIHydraType {
	name: string
	price: number
	description?: string
	madeBy: User
	participants: User[]
	expenseAt?: string
	type: ExpenseType
}

export interface ExpenseForm {
	name: string
	price: string
	category: string
	participants: string[]
	type: ExpenseType
	date: Date
	description?: string
	expenseAt?: string
	madeBy?: string | null
}
