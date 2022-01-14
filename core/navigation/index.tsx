/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { ColorSchemeName } from 'react-native'

import Colors, {
	colorBlue,
	colorCyan,
	colorDarkBlue,
	colorDarkerBlue,
	colorLight,
	colorWhite,
} from '@constants/Colors'
import useColorScheme from '@hooks/useColorScheme'
import { RootStackParamList } from '@types'
import { Screens } from './screens'
import AuthScreen from '@screens/auth'
import GroupHome from '@screens/group'
import InscriptionScreen from '@screens/auth/InscriptionScreen'
import GroupCreateScreen from '@screens/group/GroupCreateScreen'
import LoginScreen from '@screens/auth/LoginScreen'

const lightTheme = {
	dark: false,
	colors: {
		primary: colorBlue,
		background: colorWhite,
		card: colorLight,
		text: colorDarkerBlue,
		border: colorLight,
		notification: colorCyan,
	},
}

const darkTheme = {
	dark: false,
	colors: {
		primary: colorBlue,
		background: colorDarkerBlue,
		card: colorWhite,
		text: colorWhite,
		border: colorLight,
		notification: colorCyan,
	},
}

const appTheme = lightTheme

export default function Navigation({
	colorScheme,
}: {
	colorScheme: ColorSchemeName
}) {
	return (
		<NavigationContainer theme={appTheme}>
			<RootNavigator />
		</NavigationContainer>
	)
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='Welcome'
				component={AuthFlowNavigator}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name={Screens.Group}
				component={GroupHome}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name={Screens.GroupCreate}
				component={GroupCreateScreen}
				options={{ headerShown: false }}
			/>
			{/* <Stack.Screen
				name='NotFound'
				component={NotFoundScreen}
				options={{ title: 'Oops!' }}
			/>
			<Stack.Group screenOptions={{ presentation: 'modal' }}>
				<Stack.Screen name='Modal' component={ModalScreen} />
			</Stack.Group> */}
		</Stack.Navigator>
	)
}

const AuthStack = createNativeStackNavigator()

const AuthFlowNavigator: React.FunctionComponent = () => {
	return (
		<AuthStack.Navigator
			initialRouteName={Screens.Auth}
			screenOptions={{ headerShown: false }}
		>
			<AuthStack.Screen name={Screens.Auth} component={AuthScreen} />
			<AuthStack.Screen name={Screens.AuthConnexion} component={LoginScreen} />
			<AuthStack.Screen
				name={Screens.AuthInscription}
				component={InscriptionScreen}
			/>
		</AuthStack.Navigator>
	)
}
