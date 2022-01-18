/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {
	AuthScreens,
	AuthStackParamList,
	GroupScreens,
	GroupStackParamList,
	MainScreens,
	MainStackParamList,
} from '@navigation/Routes'
import { StackNavigationProp } from '@react-navigation/stack'

export type AuthNavigationProp<
	RouteName extends keyof AuthStackParamList = AuthScreens
> = StackNavigationProp<AuthStackParamList, RouteName>

export type GroupNavigationProp<
	RouteName extends keyof GroupStackParamList = GroupScreens
> = StackNavigationProp<GroupStackParamList, RouteName>

export type MainNavigationProp<
	RouteName extends keyof MainStackParamList = MainScreens
> = StackNavigationProp<MainStackParamList, RouteName>
