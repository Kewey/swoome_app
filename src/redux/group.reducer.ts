import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Group } from '@types/Group'
import { RootState } from '../../App'

interface GroupSlice extends Group {}

const initialState: GroupSlice = {
	id: '',
	name: '',
	type: '',
	shareCode: '',
	membres: [],
}

const groupSlice = createSlice({
	name: 'group',
	initialState: initialState,
	reducers: {
		setGroup: {
			reducer: (state, action: PayloadAction<Group>) => {
				state = action.payload
				console.log('Group', state)
			},
			prepare: (group: Group) => ({ payload: group || null }),
		},
	},
})

const getCurrentGroup = (state: RootState) => state

export const { setGroup } = groupSlice.actions
export { getCurrentGroup }

export default groupSlice.reducer
