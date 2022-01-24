import { User } from './user'

export type Group = {
	id: string
	name: string
	type: string
	shareCode: string
	membres: User[]
}

export type GroupCreate = {
	type: string
	name: string
}
