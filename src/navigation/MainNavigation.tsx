import { Blue, White } from '@constants/Colors'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from '@screens/tabs/HomeScreen'
import { theme } from '@styles/theme'
import Header from '@ui/Header'
import { Home, LotOfCash, ProfileCircled } from 'iconoir-react-native'
import React, { ReactElement } from 'react'
import { MainStack, MainScreens } from './Routes'

const MainNavigation = (): ReactElement => {
	return (
		<NavigationContainer theme={theme}>
			<MainStack.Navigator
				screenOptions={{
					tabBarInactiveTintColor: White,
					tabBarStyle: {
						position: 'absolute',
						bottom: 25,
						left: 25,
						right: 25,
						borderRadius: 18,
						padding: 18,
						backgroundColor: Blue,
					},
				}}
			>
				<MainStack.Screen
					name={MainScreens.Home}
					component={HomeScreen}
					options={{
						title: 'Accueil',
						headerShown: false,
						tabBarIcon: ({ color }) => {
							console.log('color', color)
							return <Home color={color} />
						},
					}}
				/>
				<MainStack.Screen
					name={MainScreens.Expense}
					component={HomeScreen}
					options={{
						title: 'Dépenses',
						tabBarIcon: ({ color }) => <LotOfCash color={color} />,
					}}
				/>
				<MainStack.Screen
					name={MainScreens.Profile}
					component={HomeScreen}
					options={{
						title: 'Profil',
						tabBarIcon: ({ color }) => <ProfileCircled color={color} />,
					}}
				/>
			</MainStack.Navigator>
		</NavigationContainer>
	)
}

export default MainNavigation
