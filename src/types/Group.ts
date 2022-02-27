import { SelectButton } from '@screens/group/CreateGroupScreen'
import { User } from './user'

export type Group = {
	id: string
	name: string
	type: string
	shareCode: string
	members: User[]
}

export type GroupCreate = {
	type: SelectButton
	name: string
}
