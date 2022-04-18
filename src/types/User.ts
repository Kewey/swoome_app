import { APIHydraType } from '@services/apiService'
import { Group } from './Group'

export interface User extends APIHydraType {
	id: string
	username: string
	email: string
	groups: string[]
	createdAt?: string
	updatedAt?: string
}

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
