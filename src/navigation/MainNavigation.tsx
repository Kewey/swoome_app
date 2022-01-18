import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from '@screens/tabs/HomeScreen'
import React, { ReactElement } from 'react'
import { MainStack, MainScreens } from './Routes'

const MainNavigation = (): ReactElement => {
	return (
		<NavigationContainer>
			<MainStack.Navigator>
				<MainStack.Screen name={MainScreens.Home} component={HomeScreen} />
				<MainStack.Screen name={MainScreens.Profile} component={HomeScreen} />
			</MainStack.Navigator>
		</NavigationContainer>
	)
}

export default MainNavigation
