import { NavigationContainer } from '@react-navigation/native'
import AuthScreen from '@screens/auth'
import SignInScreen from '@screens/auth/SignInScreen'
import SignUpScreen from '@screens/auth/SignUpScreen'
import React, { ReactElement } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthStack, AuthScreens } from './Routes'

const AuthNavigation = (): ReactElement => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<NavigationContainer>
				<AuthStack.Navigator
					initialRouteName={AuthScreens.Auth}
					screenOptions={{ headerShown: false }}
				>
					<AuthStack.Screen name={AuthScreens.Auth} component={AuthScreen} />
					<AuthStack.Screen
						name={AuthScreens.SignIn}
						component={SignInScreen}
					/>
					<AuthStack.Screen
						name={AuthScreens.SignUp}
						component={SignUpScreen}
					/>
				</AuthStack.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	)
}

export default AuthNavigation
