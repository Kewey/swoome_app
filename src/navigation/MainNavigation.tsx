import { White } from '@constants/Colors'
import { sideMargin } from '@constants/Layout'
import { useNavigation, useTheme } from '@react-navigation/native'
import { CardStyleInterpolators } from '@react-navigation/stack'
import AddExpenseModal from '@screens/tabs/AddExpenseModal'
import AccountScreen from '@screens/profile/AccountScreen'
import PreferencesScreen from '@screens/profile/PreferencesScreen'
import ProfileScreen from '@screens/profile/ProfileScreen'
import CircleButton from '@ui/CircleButton'
import { NavArrowLeft } from 'iconoir-react-native'
import React, { ReactElement } from 'react'
import { View } from 'react-native'
import { MainStack, MainScreens, ProfileStack, ProfileScreens } from './Routes'
import TabNavigation from './TabNavigation'

const MainNavigation = (): ReactElement => {
	const { colors } = useTheme()

	return (
		<MainStack.Navigator
			initialRouteName={MainScreens.Home}
			screenOptions={{
				headerStyle: {
					backgroundColor: colors.card,
				},
				headerLeft: () => {
					const navigation = useNavigation()
					return (
						<View style={{ marginLeft: sideMargin }}>
							<CircleButton
								backgroundColor={colors.card}
								onPress={() => navigation.goBack()}
							>
								<NavArrowLeft height={25} width={25} color={colors.text} />
							</CircleButton>
						</View>
					)
				},
			}}
		>
			<MainStack.Group>
				<MainStack.Screen
					name={MainScreens.Home}
					component={TabNavigation}
					options={{ headerShown: false }}
				/>
				<MainStack.Screen
					name={MainScreens.Profile}
					component={ProfileStackScreen}
					options={{ headerShown: false }}
				/>
			</MainStack.Group>
			<MainStack.Group
				screenOptions={{
					presentation: 'modal',
					gestureEnabled: true,
					cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
					headerStyle: {
						backgroundColor: colors.card,
					},
					headerLeft: () => {
						const navigation = useNavigation()
						return (
							<View style={{ marginLeft: sideMargin }}>
								<CircleButton
									backgroundColor={colors.card}
									onPress={() => navigation.goBack()}
								>
									<NavArrowLeft
										height={25}
										width={25}
										rotation={-90}
										color={colors.text}
									/>
								</CircleButton>
							</View>
						)
					},
				}}
			>
				<MainStack.Screen
					name={MainScreens.AddExpense}
					options={({ route }) => ({
						title: !!route.params?.expense
							? 'Modifier une dépense'
							: 'Ajouter une dépense',
					})}
					component={AddExpenseModal}
				/>
			</MainStack.Group>
		</MainStack.Navigator>
	)
}

export default MainNavigation

const ProfileStackScreen = (): ReactElement => {
	return (
		<ProfileStack.Navigator initialRouteName={ProfileScreens.Profile}>
			<ProfileStack.Screen
				name={ProfileScreens.Profile}
				component={ProfileScreen}
				options={{
					title: 'Profil',
				}}
			/>
			<ProfileStack.Screen
				name={ProfileScreens.Account}
				component={AccountScreen}
				options={{
					title: 'Profil',
				}}
			/>
			<ProfileStack.Screen
				name={ProfileScreens.Preferences}
				component={PreferencesScreen}
				options={{
					title: 'Profil',
				}}
			/>
		</ProfileStack.Navigator>
	)
}
