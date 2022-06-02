import { SelectButton } from '@screens/group/CreateGroupScreen'
import { APIHydraType } from '@services/apiService'
import { Balance } from './Balance'
import { Expense } from './Expense'
import { Refund } from './Refund'
import { User } from './user'

export interface Group extends APIHydraType {
	name: string
	type: GroupType
	code: string
	members: User[]
	expenses: Expense[]
	refunds: Refund[]
	balances: Balance[]
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
