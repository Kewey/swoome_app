import { getCurrentUser, setToken, setUser } from '@redux/user.reducer'
import React from 'react'
import { View, Text, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const HomeScreen = () => {
	const dispatch = useDispatch()
	const user = useSelector(getCurrentUser)

	return (
		<View>
			<Text>Home Screen</Text>
			{user && (
				<>
					<Text>{user.firstname}</Text>
					<Text>{user.email}</Text>
				</>
			)}
			<Button title='logout' onPress={() => dispatch(setToken(''))} />
		</View>
	)
}

export default HomeScreen