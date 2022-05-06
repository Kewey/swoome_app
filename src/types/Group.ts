import { SelectButton } from '@screens/group/CreateGroupScreen'
import { APIHydraType } from '@services/apiService'
import { User } from './user'

export interface Group extends APIHydraType {
	name: string
	type: GroupType
	members: User[]
}

export interface GroupType extends APIHydraType {
	name: string
	emoji: string
}

export type GroupCreate = {
	typeIri: string
	name: string
}
