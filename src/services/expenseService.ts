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
	price: string,
	participants: string[],
	description?: string,
	expenseAt?: string,
	madeById?: string | null
): Promise<Expense> {
	const { data: expense } = await API.post(`/expenses`, {
		name,
		description,
		price: parseFloat(price),
		madeBy: madeById,
		expenseGroup: groupId,
		expenseAt,
		participants,
	})
	return expense
}

export async function deleteExpense(expenseId: string) {
	await API.delete(`/expenses/${expenseId}`)
}

export async function putExpense(
	expenseId: string,
	name: string,
	price: string,
	participants: string[],
	description?: string,
	expenseAt?: string,
	madeById?: string | null
) {
	await API.put(`/expenses/${expenseId}`, {
		name,
		description,
		price: parseFloat(price),
		madeBy: madeById,
		expenseAt,
		participants,
	})
}
