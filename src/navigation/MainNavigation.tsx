import { White } from '@constants/Colors'
import {
	NavigationContainer,
	useNavigation,
	useTheme,
} from '@react-navigation/native'
import { getCurrentGroup } from '@redux/group.reducer'
import AddExpenseModal from '@screens/expenses/AddExpenseModal'
import GroupParamsScreen from '@screens/group/GroupParamsScreen'
import { theme } from '@styles/theme'
import CircleButton from '@ui/CircleButton'
import Text from '@ui/Text'
import { NavArrowLeft, Settings, ViewGrid } from 'iconoir-react-native'
import React, { ReactElement } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { MainStack, MainScreens } from './Routes'
import TabNavigation from './TabNavigation'

const MainNavigation = (): ReactElement => {
	return (
		<NavigationContainer theme={theme}>
			<MainStack.Navigator
				initialRouteName={MainScreens.Home}
				screenOptions={{
					headerStyle: { backgroundColor: White },
					headerLeft: () => {
						const { colors } = useTheme()
						const navigation = useNavigation()
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
				}}
			>
				<MainStack.Group>
					<MainStack.Screen
						name={MainScreens.Home}
						component={TabNavigation}
						options={{ headerShown: false }}
					/>
					<MainStack.Screen
						name={MainScreens.GroupParams}
						component={GroupParamsScreen}
					/>
				</MainStack.Group>
				<MainStack.Group screenOptions={{ presentation: 'modal' }}>
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
