import { White } from '@constants/Colors'
import { NavigationContainer, useTheme } from '@react-navigation/native'
import GroupIndexScreen from '@screens/group'
import GroupCreateScreen from '@screens/group/CreateGroupScreen'
import { theme } from '@styles/theme'
import CircleButton from '@ui/CircleButton'
import { NavArrowLeft } from 'iconoir-react-native'
import React, { ReactElement } from 'react'
import { View } from 'react-native'
import { GroupScreens, GroupStack } from './Routes'

const GroupNavigation = (): ReactElement => {
	return (
		<NavigationContainer theme={theme}>
			<GroupStack.Navigator
				initialRouteName={GroupScreens.Index}
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
				<GroupStack.Screen
					name={GroupScreens.Index}
					component={GroupIndexScreen}
					options={{ headerLeft: () => null }}
				/>
				<GroupStack.Screen
					name={GroupScreens.Create}
					component={GroupCreateScreen}
				/>
			</GroupStack.Navigator>
		</NavigationContainer>
	)
}

export default GroupNavigation
