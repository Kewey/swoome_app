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
			reducer: (state, action: PayloadAction<Group | null>) => {
				state.group = action.payload
			},
			prepare: (group: Group | null) => ({ payload: group || null }),
		},
	},
})

const getCurrentGroup = (state: RootState) => state.group.group

export const { setGroup } = groupSlice.actions
export { getCurrentGroup }

export default groupSlice.reducer
