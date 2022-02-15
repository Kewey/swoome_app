import { View, StyleSheet } from 'react-native'
import React from 'react'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { Blue } from '@constants/Colors'
import Text from './Text'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Header = ({
	state,
	navigation,
	descriptors,
	insets,
}: BottomTabBarProps) => {
	// console.log('state', state)
	console.log('descriptors', descriptors)
	return (
		<View
			style={[
				tabBarStyle.wrapper,
				{
					bottom: 25 + insets.bottom,
				},
			]}
		>
			<View style={tabBarStyle.TabBarNavigation}>
				{state.routes.map((route, index) => {
					const { options } = descriptors[route.key]
					const label =
						options.tabBarLabel !== undefined
							? options.tabBarLabel
							: options.title !== undefined
							? options.title
							: route.name

					const isFocused = state.index === index

					const onPress = () => {
						const event = navigation.emit({
							type: 'tabPress',
							target: route.key,
							canPreventDefault: true,
						})

						if (!isFocused && !event.defaultPrevented) {
							// The `merge: true` option makes sure that the params inside the tab screen are preserved
							navigation.navigate(options.tabBar)
						}
					}

					const onLongPress = () => {
						navigation.emit({
							type: 'tabLongPress',
							target: route.key,
						})
					}

					return (
						<TouchableOpacity
							key={options.title}
							accessibilityRole='button'
							accessibilityState={isFocused ? { selected: true } : {}}
							accessibilityLabel={options.tabBarAccessibilityLabel}
							testID={options.tabBarTestID}
							onPress={onPress}
							onLongPress={onLongPress}
							style={{ flex: 1 }}
						>
							<Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
								{label}
							</Text>
						</TouchableOpacity>
					)
				})}
			</View>
		</View>
	)
}

export default Header

const tabBarStyle = StyleSheet.create({
	wrapper: {
		position: 'absolute',
		left: 25,
		right: 25,
		borderRadius: 18,
		backgroundColor: Blue,
		padding: 19,
	},
	TabBarNavigation: {
		flexDirection: 'row',
	},
})
