import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Expense } from '@types/Expense'

export enum AuthScreens {
	Auth = 'AuthScreen',
	SignUp = 'SignUpScreen',
	SignIn = 'SignInScreen',
	ForgetPassword = 'ForgetPasswordScreen',
}

export enum GroupScreens {
	Index = 'GroupIndexScreen',
	Create = 'GroupCreateScreen',
	JoinGroup = 'GroupJoinScreen',
}

export enum TabScreens {
	Home = 'HomeTabScreen',
	Report = 'ReportScreen',
	Refunds = 'RefundsScreen',
	AddExpense = 'AddExpenseModalScreen',
	GroupParams = 'GroupParamsScreen',
}

export enum MainScreens {
	Home = 'HomeScreen',
	Profile = 'ProfileScreen',
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
	[GroupScreens.JoinGroup]: undefined
}

export type TabStackParamList = {
	[TabScreens.Home]: { groupId: string }
	[TabScreens.Report]: undefined
	[TabScreens.Refunds]: { userId: string }
	[TabScreens.AddExpense]: undefined
	[TabScreens.GroupParams]: undefined
}

export type MainStackParamList = {
	[MainScreens.Home]: undefined
	[MainScreens.AddExpense]: { expense: Expense }
	[MainScreens.Profile]: { userId: string }
}

export const AuthStack = createStackNavigator<AuthStackParamList>()
export const GroupStack = createStackNavigator<GroupStackParamList>()
export const TabStack = createBottomTabNavigator<TabStackParamList>()
export const MainStack = createStackNavigator<MainStackParamList>()
