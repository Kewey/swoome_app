import { useReducer } from 'react'

const useAuth = () => {
	const [state, dispatch] = useReducer(
		(prevState: any, action: any) => {
			switch (action.type) {
				case 'RESTORE_TOKEN':
					return {
						...prevState,
						userToken: action.token,
						isLoading: false,
					}
				case 'SIGN_IN':
					return {
						...prevState,
						isSignout: false,
						userToken: action.token,
					}
				case 'SIGN_OUT':
					return {
						...prevState,
						isSignout: true,
						userToken: null,
					}
			}
		},
		{
			isLoading: true,
			isSignout: false,
			userToken: null,
		}
	)

	return [state, dispatch]
}

export default useAuth
