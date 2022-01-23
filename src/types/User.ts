export type User = {
	name: string
	email: string
	group: any // TODO
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
	name: string
	email: string
	password: string
}

export type DispatchType = (args: UserAction) => UserAction
