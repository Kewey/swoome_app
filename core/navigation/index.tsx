/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { ColorSchemeName, Pressable } from 'react-native'

import Colors, {
	colorBlue,
	colorCyan,
	colorDarkBlue,
	colorDarkerBlue,
	colorLight,
	colorWhite,
} from '@constants/Colors'
import useColorScheme from '@hooks/useColorScheme'
import {
	RootStackParamList,
	RootTabParamList,
	RootTabScreenProps,
} from '@types'
import { Screens } from './screens'
import LinkingConfiguration from './LinkingConfiguration'
import AuthScreen from '@screens/auth'
import GroupHome from '@screens/group'
import InscriptionScreen from '@screens/auth/InscriptionScreen'
import GroupCreateScreen from '@screens/group/GroupCreateScreen'

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
		<NavigationContainer linking={LinkingConfiguration} theme={appTheme}>
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
				name={Screens.Auth}
				component={AuthScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name={Screens.AuthInscription}
				component={InscriptionScreen}
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

// /**
//  * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
//  * https://reactnavigation.org/docs/bottom-tab-navigator
//  */
// const BottomTab = createBottomTabNavigator<RootTabParamList>()

// function BottomTabNavigator() {
// 	const colorScheme = useColorScheme()

// 	return (
// 		<BottomTab.Navigator
// 			initialRouteName='TabOne'
// 			screenOptions={{
// 				tabBarActiveTintColor: Colors[colorScheme].tint,
// 			}}
// 		>
// 			<BottomTab.Screen
// 				name='TabOne'
// 				component={TabOneScreen}
// 				options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
// 					title: 'Tab One',
// 					tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
// 					headerRight: () => (
// 						<Pressable
// 							onPress={() => navigation.navigate('Modal')}
// 							style={({ pressed }) => ({
// 								opacity: pressed ? 0.5 : 1,
// 							})}
// 						>
// 							<FontAwesome
// 								name='info-circle'
// 								size={25}
// 								color={Colors[colorScheme].text}
// 								style={{ marginRight: 15 }}
// 							/>
// 						</Pressable>
// 					),
// 				})}
// 			/>
// 			<BottomTab.Screen
// 				name='TabTwo'
// 				component={TabTwoScreen}
// 				options={{
// 					title: 'Tab Two',
// 					tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
// 				}}
// 			/>
// 		</BottomTab.Navigator>
// 	)
// }

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>['name']
	color: string
}) {
	return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />
}
