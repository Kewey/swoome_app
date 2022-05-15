import { Blue, White } from '@constants/Colors'
import { sideMargin } from '@constants/Layout'
import { useNavigation, useTheme } from '@react-navigation/native'
import { getCurrentGroup, setGroup } from '@redux/group.reducer'
import Expenses from '@screens/expenses'
import GroupParamsScreen from '@screens/tabs/GroupParamsScreen'
import HomeScreen from '@screens/tabs/HomeScreen'
import RefundsScreen from '@screens/tabs/RefundsScreen'
import ReportScreen from '@screens/tabs/ReportScreen'
import { borderRadius } from '@styles/layout'
import CircleButton from '@ui/CircleButton'
import {
	DataTransferBoth,
	HomeSimple,
	Plus,
	Reports,
	Settings,
	User,
	ViewGrid,
} from 'iconoir-react-native'
import React, { ReactElement } from 'react'
import { Image, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { TabStack, TabScreens, MainScreens } from './Routes'

const TabNavigation = (): ReactElement => {
	const { colors } = useTheme()
	const group = useSelector(getCurrentGroup)
	const dispatch = useDispatch()

	return (
		<TabStack.Navigator
			initialRouteName={TabScreens.Home}
			screenOptions={{
				headerShadowVisible: false,
				tabBarShowLabel: false,
				tabBarInactiveTintColor: colors.text,
				tabBarActiveTintColor: colors.primary,
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
				headerTitle: group?.name,
				headerRight: () => {
					const navigation = useNavigation()
					return (
						<View style={{ marginRight: 20, flexDirection: 'row' }}>
							<CircleButton
								backgroundColor={colors.card}
								style={{ marginRight: 10 }}
								onPress={() => dispatch(setGroup(null))}
							>
								<ViewGrid height={20} width={20} color={colors.text} />
							</CircleButton>
							<CircleButton
								backgroundColor={colors.background}
								onPress={() =>
									navigation.getParent()?.navigate(MainScreens.Profile)
								}
							>
								<Image
									source={{ uri: 'https://i.pravatar.cc/50' }}
									height={30}
									width={30}
									style={{
										height: 30,
										width: 30,
										borderRadius: 15,
									}}
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
				name={TabScreens.Report}
				component={ReportScreen}
				options={{
					tabBarIcon: ({ color }) => (
						<Reports height={20} width={20} color={color} />
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
				component={RefundsScreen}
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
				name={TabScreens.GroupParams}
				component={GroupParamsScreen}
				options={{
					tabBarAccessibilityLabel: 'Profile',
					tabBarIcon: ({ color }) => (
						<Settings height={20} width={20} color={color} />
					),
				}}
			/>
		</TabStack.Navigator>
	)
}

export default TabNavigation
