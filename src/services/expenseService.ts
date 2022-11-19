import { Expense } from '@types/Expense'
import { ExpenseType } from '@types/ExpenseType'
import { API } from './apiService'

export async function getGroupExpenses(groupId: string): Promise<{
  expenses: Expense[]
  totalItems: number
}> {
  const {
    data: { 'hydra:member': expenses, 'hydra:totalItems': totalItems },
  } = await API.get(`/groups/${groupId}/expenses`, {
    params: {
      'order[createdAt]': 'desc',
    },
  })
  return { expenses, totalItems }
}

export async function addExpense(
  groupId: string,
  name: string,
  price: string,
  typeIri: string,
  participants: string[],
  description?: string,
  expenseAt?: string,
  madeById?: string | null
): Promise<Expense> {
  const { data: expense } = await API.post(`/expenses`, {
    name,
    description,
    price: parseFloat(price),
    type: typeIri,
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
  typeIri: string,
  participants: string[],
  description?: string,
  expenseAt?: string,
  madeById?: string | null
) {
  await API.put(`/expenses/${expenseId}`, {
    name,
    description,
    price: parseFloat(price),
    type: typeIri,
    madeBy: madeById,
    expenseAt,
    participants,
  })
}

export function formatPrice(price: number | undefined): string {
  if (!price) return '0,00'
  return (price * 100).toFixed(0)
}

export function displayPrice(price: number | undefined): string {
  if (!price) return '0,00'

  return (price / 100).toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })
}
