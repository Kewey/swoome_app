type User = {
	name: string
	email: string
	groupe: any // TODO
}

type UserLogin = {
	email: string
	password: string
}

type UserAction = {
	type: string
	user: User
}

type DispatchType = (args: UserAction) => UserAction
