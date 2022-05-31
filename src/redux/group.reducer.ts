import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Group } from '@types/Group'
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
		removeGroup: {
			reducer: (state) => {
				state.group = null
			},
			prepare: () => ({ payload: null }),
		},
	},
})

const getCurrentGroup = (state: RootState) => state.group.group

export const { setGroup, removeGroup } = groupSlice.actions
export { getCurrentGroup }

export default groupSlice.reducer
