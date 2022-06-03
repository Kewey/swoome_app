import { SelectButton } from '@screens/group/CreateGroupScreen'
import { APIHydraType } from '@services/apiService'
import { Balance } from './Balance'
import { Expense } from './Expense'
import { ExpenseType } from './ExpenseType'
import { Refund } from './Refund'
import { User } from './user'

export interface Group extends APIHydraType {
	name: string
	code: string
	type: GroupType
	members: User[]
	expenses: Expense[]
	refunds: Refund[]
	balances: Balance[]
	expenseTypes: ExpenseType[]
	sumExpenses: number
}

export interface GroupType extends APIHydraType {
	name: string
	emoji: string
}

export type GroupCreate = {
	typeIri: string
	name: string
}
