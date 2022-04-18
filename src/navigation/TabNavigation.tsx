import { DarkBlue, DarkGrey, White } from '@constants/Colors'
import { useNavigation, useTheme } from '@react-navigation/native'
import { getCurrentUser } from '@redux/user.reducer'
import Expenses from '@screens/expenses'
import HomeScreen from '@screens/tabs/HomeScreen'
import ProfileScreen from '@screens/tabs/ProfileScreen'
import { borderRadius } from '@styles/layout'
import CircleButton from '@ui/CircleButton'
import Text from '@ui/Text'
import {
	HomeAlt,
	LotOfCash,
	ProfileCircled,
	Settings,
	ViewGrid,
} from 'iconoir-react-native'
import React, { ReactElement } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { TabStack, TabScreens, MainScreens } from './Routes'

const TabNavigation = (): ReactElement => {
	const { colors } = useTheme()
	return (
		<TabStack.Navigator
			sceneContainerStyle={{
				paddingBottom: 40,
			}}
			initialRouteName={TabScreens.Home}
			screenOptions={{
				headerStyle: {
					backgroundColor: colors.background,
				},
				headerShadowVisible: false,

				tabBarStyle: {
					backgroundColor: colors.background,
					position: 'absolute',
					borderTopLeftRadius: borderRadius * 2,
					borderTopRightRadius: borderRadius * 2,
					elevation: 0,
					shadowOpacity: 0,
				},
				tabBarInactiveTintColor: colors.text,
				tabBarActiveTintColor: colors.primary,
				headerRight: () => {
					const { colors } = useTheme()
					const navigation = useNavigation()
					return (
						<View style={{ marginRight: 20, flexDirection: 'row' }}>
							<CircleButton
								backgroundColor={colors.border}
								style={{ marginRight: 10 }}
								onPress={() =>
									navigation.getParent()?.navigate(MainScreens.AddExpense)
								}
							>
								<ViewGrid
									height={20}
									width={20}
									color={colors.text}
									fill={colors.text}
								/>
							</CircleButton>
							<CircleButton
								backgroundColor={colors.border}
								onPress={() =>
									navigation.getParent()?.navigate(MainScreens.GroupParams)
								}
							>
								<Settings
									height={20}
									width={20}
									color={colors.text}
									fill={colors.text}
								/>
							</CircleButton>
						</View>
					)
				},
			}}
		>
			<TabStack.Screen
				name={TabScreens.Home}
				component={HomeScreen}
				options={{
					title: 'Accueil',
					headerTitle: '',
					tabBarIcon: ({ color }) => {
						return <HomeAlt height={20} width={20} color={color} />
					},
					headerLeft: () => {
						const { username } = useSelector(getCurrentUser)
						return (
							<View style={{ marginLeft: 20 }}>
								<Text>Bien le bonjour</Text>
								<Text weight='bold' style={{ fontSize: 20 }}>
									{username}
								</Text>
							</View>
						)
					},
				}}
			/>
			<TabStack.Screen
				name={TabScreens.Expense}
				component={Expenses}
				options={{
					title: 'Dépenses',
					tabBarIcon: ({ color }) => (
						<LotOfCash height={20} width={20} color={color} />
					),
				}}
			/>
			<TabStack.Screen
				name={TabScreens.Profile}
				component={ProfileScreen}
				options={{
					title: 'Profil',
					tabBarIcon: ({ color }) => (
						<ProfileCircled height={20} width={20} color={color} />
					),
				}}
			/>
		</TabStack.Navigator>
	)
}

export default TabNavigation
