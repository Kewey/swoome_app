import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

export enum AuthScreens {
	Auth = 'AuthScreen',
	SignUp = 'SignUpScreen',
	SignIn = 'SignInScreen',
	ForgetPassword = 'ForgetPasswordScreen',
}

export enum GroupScreens {
	Index = 'GroupIndexScreen',
	Create = 'GroupCreateScreen',
}

export enum MainScreens {
	Home = 'HomeScreen',
	Expense = 'ExpenseScreen',
	Profile = 'ProfileScreen',
}

export type AuthStackParamList = {
	[AuthScreens.Auth]: undefined
	[AuthScreens.SignUp]: undefined
	[AuthScreens.SignIn]: undefined
	[AuthScreens.ForgetPassword]: undefined
}

export type GroupStackParamList = {
	[GroupScreens.Index]: undefined
	[GroupScreens.Create]: undefined
}

export type MainStackParamList = {
	[MainScreens.Home]: { groupId: string } | undefined
	[MainScreens.Expense]: undefined
	[MainScreens.Profile]: { userId: string } | undefined
}

export const AuthStack = createStackNavigator<AuthStackParamList>()
export const GroupStack = createStackNavigator<GroupStackParamList>()
export const MainStack = createBottomTabNavigator<MainStackParamList>()
