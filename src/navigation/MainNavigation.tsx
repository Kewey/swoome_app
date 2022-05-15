import { sideMargin } from '@constants/Layout'
import {
	DarkTheme,
	NavigationContainer,
	useNavigation,
	useTheme,
} from '@react-navigation/native'
import { CardStyleInterpolators } from '@react-navigation/stack'
import { getTheme } from '@redux/user.reducer'
import AddExpenseModal from '@screens/expenses/AddExpenseModal'
import ProfileScreen from '@screens/profile/ProfileScreen'
import { theme } from '@styles/theme'
import CircleButton from '@ui/CircleButton'
import { NavArrowLeft } from 'iconoir-react-native'
import React, { ReactElement } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { MainStack, MainScreens } from './Routes'
import TabNavigation from './TabNavigation'

const MainNavigation = (): ReactElement => {
	const isDarkTheme = useSelector(getTheme)

	return (
		<NavigationContainer theme={isDarkTheme ? DarkTheme : theme}>
			<MainStack.Navigator
				initialRouteName={MainScreens.Home}
				screenOptions={{
					headerLeft: () => {
						const { colors } = useTheme()
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
						component={ProfileScreen}
					/>
				</MainStack.Group>
				<MainStack.Group
					screenOptions={{
						presentation: 'modal',
						headerShown: false,
						gestureEnabled: true,
						cardStyleInterpolator:
							CardStyleInterpolators.forModalPresentationIOS,
					}}
				>
					<MainStack.Screen
						name={MainScreens.AddExpense}
						component={AddExpenseModal}
					/>
				</MainStack.Group>
			</MainStack.Navigator>
		</NavigationContainer>
	)
}

export default MainNavigation
