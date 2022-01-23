import { createStackNavigator } from '@react-navigation/stack'

export enum AuthScreens {
	Auth = 'AuthScreen',
	SignUp = 'SignUpScreen',
	SignIn = 'SignInScreen',
	ForgetPassword = 'ForgetPasswordScreen',
}

export enum GroupScreens {
	GroupIndex = 'GroupIndexScreen',
	GroupCreate = 'GroupCreateScreen',
	GroupJoin = 'GroupJoinScreen',
}

export enum MainScreens {
	Home = 'HomeScreen',
	Profile = 'ProfileScreen',
}

export type AuthStackParamList = {
	[AuthScreens.Auth]: undefined
	[AuthScreens.SignUp]: undefined
	[AuthScreens.SignIn]: undefined
	[AuthScreens.ForgetPassword]: undefined
}

export type GroupStackParamList = {
	[GroupScreens.GroupIndex]: undefined
	[GroupScreens.GroupCreate]: undefined
	[GroupScreens.GroupJoin]: undefined
}

export type MainStackParamList = {
	[MainScreens.Home]: { groupID: string } | undefined
	[MainScreens.Profile]: undefined
}

export const AuthStack = createStackNavigator<AuthStackParamList>()
export const GroupStack = createStackNavigator<GroupStackParamList>()
export const MainStack = createStackNavigator<MainStackParamList>()
