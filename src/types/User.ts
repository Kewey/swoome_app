import { Group } from './Group'

export type User = {
	name: string
	email: string
	groups: Group[]
} | null

export type UserLogin = {
	email: string
	password: string
}

export type UserAction = {
	type: string
	user: User
}

export type UserSignUp = {
	username: string
	email: string
	password: string
}

export type DispatchType = (args: UserAction) => UserAction
