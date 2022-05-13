import { Blue, White } from '@constants/Colors'
import { sideMargin } from '@constants/Layout'
import { useNavigation, useTheme } from '@react-navigation/native'
import { setGroup } from '@redux/group.reducer'
import Expenses from '@screens/expenses'
import HomeScreen from '@screens/tabs/HomeScreen'
import ProfileScreen from '@screens/tabs/ProfileScreen'
import { borderRadius } from '@styles/layout'
import CircleButton from '@ui/CircleButton'
import {
	DataTransferBoth,
	HomeSimple,
	Plus,
	ProfileCircled,
	Settings,
	ViewGrid,
} from 'iconoir-react-native'
import React, { ReactElement } from 'react'
import { View } from 'react-native'
import { useDispatch } from 'react-redux'
import { TabStack, TabScreens, MainScreens } from './Routes'

const TabNavigation = (): ReactElement => {
	const { colors } = useTheme()
	return (
		<TabStack.Navigator
			initialRouteName={TabScreens.Home}
			screenOptions={{
				headerShadowVisible: false,
				tabBarShowLabel: false,
				tabBarInactiveTintColor: colors.border,
				tabBarActiveTintColor: colors.text,
				tabBarStyle: {
					backgroundColor: colors.card,
					height: 60,
					position: 'absolute',
					bottom: 10,
					left: sideMargin,
					right: sideMargin,
					borderRadius: borderRadius * 2,
					borderTopWidth: 0,
					elevation: 0,
					shadowOpacity: 0,
				},
				headerRight: () => {
					const { colors } = useTheme()
					const navigation = useNavigation()
					const dispatch = useDispatch()
					return (
						<View style={{ marginRight: 20, flexDirection: 'row' }}>
							<CircleButton
								backgroundColor={colors.border}
								style={{ marginRight: 10 }}
								onPress={() => dispatch(setGroup(null))}
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
					tabBarIcon: ({ color }) => {
						return <HomeSimple height={20} width={20} color={color} />
					},
				}}
			/>

			<TabStack.Screen
				name={TabScreens.Expense}
				component={Expenses}
				options={{
					tabBarIcon: ({ color }) => (
						<DataTransferBoth
							height={20}
							width={20}
							color={color}
							rotation={90}
						/>
					),
				}}
			/>

			<TabStack.Screen
				name={TabScreens.AddExpense}
				component={Expenses}
				listeners={({ navigation }) => ({
					tabPress: (e) => {
						e.preventDefault()
						navigation.navigate(MainScreens.AddExpense)
					},
				})}
				options={{
					tabBarIcon: ({ color }) => (
						<View
							style={{
								height: 40,
								width: 40,
								backgroundColor: Blue,
								borderRadius,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Plus height={25} width={25} color={White} />
						</View>
					),
				}}
			/>

			<TabStack.Screen
				name={TabScreens.Refunds}
				component={Expenses}
				options={{
					tabBarIcon: ({ color }) => (
						<DataTransferBoth
							height={20}
							width={20}
							color={color}
							rotation={90}
						/>
					),
				}}
			/>

			<TabStack.Screen
				name={TabScreens.Profile}
				component={ProfileScreen}
				options={{
					tabBarAccessibilityLabel: 'Profile',
					tabBarIcon: ({ color }) => (
						<ProfileCircled height={20} width={20} color={color} />
					),
				}}
			/>
		</TabStack.Navigator>
	)
}

export default TabNavigation
