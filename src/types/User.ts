import { Group } from './Group'

export type User = {
	id: string
	firstname: string
	email: string
	groups: string[]
	createdAt?: string
	updatedAt?: string
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
