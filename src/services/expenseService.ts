import { Expense } from '@types/Expense'
import { API } from './apiService'

export async function getGroupExpenses(groupId: string): Promise<{
	expenses: Expense[]
	totalItems: number
}> {
	const {
		data: { 'hydra:member': expenses, 'hydra:totalItems': totalItems },
	} = await API.get(`/groups/${groupId}/expenses`)
	return { expenses, totalItems }
}

export async function addExpense(
	groupId: string,
	name: string,
	description: string,
	price: number,
	participants: string[],
	made_by?: string
): Promise<Expense> {
	const { data: expense } = await API.post(`/expenses`, {
		name,
		description,
		price,
		made_by,
		expenseGroup: groupId,
		participants,
	})
	return expense
}
