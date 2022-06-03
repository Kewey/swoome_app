import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ExpenseType } from '@types/ExpenseType'
import { Group } from '@types/Group'
import { RootState } from '../../App'

interface GroupSlice {
	group: Group | null
	expenseType: ExpenseType[]
}

const initialState: GroupSlice = {
	group: null,
	expenseType: [],
}

const groupSlice = createSlice({
	name: 'group',
	initialState: initialState,
	reducers: {
		setGroup: {
			reducer: (state, action: PayloadAction<Group>) => {
				state.group = action.payload
			},
			prepare: (group: Group) => ({ payload: group }),
		},
		removeGroup: {
			reducer: (state) => {
				state.group = null
			},
			prepare: () => ({ payload: null }),
		},
		setExpenseType: {
			reducer: (state, action: PayloadAction<ExpenseType[]>) => {
				state.expenseType = action.payload
			},
			prepare: (expenseTypes: ExpenseType[]) => ({ payload: expenseTypes }),
		},
	},
})

const getCurrentGroup = (state: RootState) => state.group.group
const getExpenseType = (state: RootState) => state.group.expenseType

export const { setGroup, removeGroup, setExpenseType } = groupSlice.actions
export { getCurrentGroup, getExpenseType }

export default groupSlice.reducer
