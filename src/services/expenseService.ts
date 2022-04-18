import { Expense } from '@types/Expense'
import { API } from './apiService'

export async function getGroupExpenses(
	groupId: string,
	limit: number
): Promise<{
	expenses: Expense[]
	totalItems: number
}> {
	const {
		data: { 'hydra:member': expenses, 'hydra:totalItems': totalItems },
	} = await API.get(`/groups/${groupId}/expenses`, { params: { limit } })
	return { expenses, totalItems }
}

export async function addExpense(
	groupId: string,
	name: string,
	price: string,
	participants: string[],
	description?: string,
	madeById?: string | null
): Promise<Expense> {
	console.log('description', description)
	const { data: expense } = await API.post(`/expenses`, {
		name,
		description,
		price: parseFloat(price),
		madeBy: madeById,
		expenseGroup: groupId,
		participants,
	})
	return expense
}
