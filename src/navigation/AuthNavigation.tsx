import { White } from '@constants/Colors'
import {
	NavigationContainer,
	useNavigation,
	useTheme,
} from '@react-navigation/native'
import AuthScreen from '@screens/auth'
import ForgetPassword from '@screens/auth/ForgetPassword'
import SignInScreen from '@screens/auth/SignInScreen'
import SignUpScreen from '@screens/auth/SignUpScreen'
import { theme } from '@styles/theme'
import CircleButton from '@ui/CircleButton'
import Text from '@ui/Text'
import { NavArrowLeft } from 'iconoir-react-native'
import React, { ReactElement } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { AuthStack, AuthScreens } from './Routes'

const AuthNavigation = (): ReactElement => {
	return (
		<NavigationContainer theme={theme}>
			<AuthStack.Navigator
				initialRouteName={AuthScreens.Auth}
				screenOptions={({ navigation }) => ({
					headerTitle: '',
					headerStyle: {
						backgroundColor: White,
					},
					headerLeft: () => {
						const { colors } = useTheme()
						return (
							<View style={{ marginLeft: 30 }}>
								<CircleButton
									backgroundColor={colors.card}
									onPress={() => navigation.goBack()}
								>
									<NavArrowLeft height={25} width={25} color={colors.text} />
								</CircleButton>
							</View>
						)
					},
				})}
			>
				<AuthStack.Screen
					name={AuthScreens.Auth}
					component={AuthScreen}
					options={{ headerShown: false }}
				/>
				<AuthStack.Screen name={AuthScreens.SignIn} component={SignInScreen} />
				<AuthStack.Screen name={AuthScreens.SignUp} component={SignUpScreen} />
				<AuthStack.Screen
					name={AuthScreens.ForgetPassword}
					component={ForgetPassword}
				/>
			</AuthStack.Navigator>
		</NavigationContainer>
	)
}

export default AuthNavigation
