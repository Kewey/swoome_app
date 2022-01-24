import { NavigationContainer } from '@react-navigation/native'
import GroupIndexScreen from '@screens/group'
import GroupCreateScreen from '@screens/group/CreateGroupScreen'
import GroupJoinScreen from '@screens/group/JoinGroupScreen'
import { theme } from '@styles/theme'
import React, { ReactElement } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GroupScreens, GroupStack } from './Routes'

const GroupNavigation = (): ReactElement => {
	return (
		<SafeAreaView
			style={{
				flex: 1,
				padding: 30,
			}}
		>
			<NavigationContainer theme={theme}>
				<GroupStack.Navigator
					initialRouteName={GroupScreens.Index}
					screenOptions={{ headerShown: false }}
				>
					<GroupStack.Screen
						name={GroupScreens.Index}
						component={GroupIndexScreen}
					/>
					<GroupStack.Screen
						name={GroupScreens.Create}
						component={GroupCreateScreen}
					/>
					<GroupStack.Screen
						name={GroupScreens.Join}
						component={GroupJoinScreen}
					/>
				</GroupStack.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	)
}

export default GroupNavigation
