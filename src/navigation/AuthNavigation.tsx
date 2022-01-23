import { Blue, DarkerBlue, White } from '@constants/Colors'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import AuthScreen from '@screens/auth'
import ForgetPassword from '@screens/auth/ForgetPassword'
import SignInScreen from '@screens/auth/SignInScreen'
import SignUpScreen from '@screens/auth/SignUpScreen'
import React, { ReactElement } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthStack, AuthScreens } from './Routes'

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: White,
		primary: Blue,
		text: DarkerBlue,
	},
}

const AuthNavigation = (): ReactElement => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<NavigationContainer theme={theme}>
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
					<AuthStack.Screen
						name={AuthScreens.ForgetPassword}
						component={ForgetPassword}
					/>
				</AuthStack.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	)
}

export default AuthNavigation
