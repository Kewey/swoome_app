import { APIHydraType } from '@services/apiService'
import { Group } from './Group'
import { Media } from './Media'

export interface User extends APIHydraType {
	id: string
	username: string
	email: string
	groups: Group[]
	avatar?: Media
	pushToken: string
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
	avatar: string | null
}

export type DispatchType = (args: UserAction) => UserAction
