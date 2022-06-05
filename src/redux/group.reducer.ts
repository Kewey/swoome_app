import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Balance } from '@types/Balance'
import { ExpenseType } from '@types/ExpenseType'
import { Group } from '@types/Group'
import { Refund } from '@types/Refund'
import { RootState } from '../../App'

interface GroupSlice {
	group: Group | null
}

const initialState: GroupSlice = {
	group: null,
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
		setRefunds: {
			reducer: (state, action: PayloadAction<Refund[]>) => {
				if (!state.group) return
				state.group.refunds = action.payload
			},
			prepare: (refunds: Refund[]) => ({ payload: refunds }),
		},
		setBalances: {
			reducer: (state, action: PayloadAction<Balance[]>) => {
				if (!state.group) return
				state.group.balances = action.payload
			},
			prepare: (balances: Balance[]) => ({ payload: balances }),
		},
		removeGroup: {
			reducer: (state) => {
				state.group = null
			},
			prepare: () => ({ payload: null }),
		},
	},
})

const getCurrentGroup = (state: RootState) => state.group.group

export const { setGroup, removeGroup, setBalances, setRefunds } =
	groupSlice.actions
export { getCurrentGroup }

export default groupSlice.reducer
