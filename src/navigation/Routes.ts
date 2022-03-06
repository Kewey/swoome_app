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

export enum TabScreens {
	Home = 'HomeTabScreen',
	Expense = 'ExpenseScreen',
	Profile = 'ProfileScreen',
}

export enum MainScreens {
	Home = 'HomeScreen',
	GroupParams = 'GroupParamsScreen',
	AddExpense = 'AddExpenseScreen',
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

export type TabStackParamList = {
	[TabScreens.Home]: { groupId: string }
	[TabScreens.Expense]: undefined
	[TabScreens.Profile]: { userId: string }
}

export type MainStackParamList = {
	[MainScreens.Home]: undefined
	[MainScreens.GroupParams]: undefined
	[MainScreens.AddExpense]: undefined
}

export const AuthStack = createStackNavigator<AuthStackParamList>()
export const GroupStack = createStackNavigator<GroupStackParamList>()
export const TabStack = createBottomTabNavigator<TabStackParamList>()
export const MainStack = createStackNavigator<MainStackParamList>()
