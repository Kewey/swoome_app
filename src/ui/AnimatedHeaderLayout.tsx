import { View, Text, Animated } from 'react-native'
import React, { ReactElement, ReactNode, useRef } from 'react'
import { withAnchorPoint } from 'react-native-anchor-point'
import Layout from '@ui/Layout'
import { useTheme } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { sideMargin } from '@constants/Layout'
import { FONTS } from '@types/Fonts'
import FredokaText from './FredokaText'
import { useSelector } from 'react-redux'
import { getCurrentGroup } from '@redux/group.reducer'

interface AnimatedHeaderLayoutProps {
	children: ReactNode
	title: string
}

const AnimatedHeaderLayout = ({
	children,
	title,
}: AnimatedHeaderLayoutProps) => {
	const currentGroup = useSelector(getCurrentGroup)
	const { colors } = useTheme()
	const { top } = useSafeAreaInsets()

	const scrollPositionValue = useRef(new Animated.Value(0)).current

	const animatedTitleSize = scrollPositionValue.interpolate({
		inputRange: [0, 150],
		outputRange: [1, 0.6],
		extrapolate: 'clamp',
	})

	const animatedTitleXPos = scrollPositionValue.interpolate({
		inputRange: [0, 150],
		outputRange: [0, -102],
		extrapolate: 'clamp',
	})

	const animatedHeaderHeight = scrollPositionValue.interpolate({
		inputRange: [0, 150],
		outputRange: [1, 0.56],
		extrapolate: 'clamp',
	})

	const animatedGroupOpacity = scrollPositionValue.interpolate({
		inputRange: [0, 80],
		outputRange: [1, 0],
		extrapolate: 'clamp',
	})

	const transformHeight = () => {
		let transform = {
			transform: [{ scaleY: animatedHeaderHeight }],
		}
		return withAnchorPoint(
			// @ts-ignore
			transform,
			{ x: -0.05, y: 0 },
			{ height: 150, width: 325 }
		)
	}

	const transformTitle = () => {
		let transform = {
			transform: [
				{ scale: animatedTitleSize },
				{ translateY: animatedTitleXPos },
			],
		}
		return withAnchorPoint(
			// @ts-ignore
			transform,
			{ x: 0.05, y: 0.5 },
			{ height: 32, width: 320 }
		)
	}

	return (
		<View style={{ flex: 1 }}>
			<Layout
				onScroll={Animated.event(
					[
						{
							nativeEvent: {
								contentOffset: { y: scrollPositionValue },
							},
						},
					],
					{ useNativeDriver: true }
				)}
			>
				{children}
			</Layout>

			<Animated.View
				style={[
					{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						height: 150,
						flexDirection: 'row',
						alignItems: 'flex-end',
						paddingHorizontal: sideMargin,
						backgroundColor: colors.background,
					},
					transformHeight(),
				]}
			></Animated.View>

			<Animated.Text
				// onLayout={(event) => {
				// 	const { width, height } = event.nativeEvent.layout
				// }}
				style={[
					{
						position: 'absolute',
						paddingHorizontal: sideMargin,
						top: top + 70,
						fontSize: 32,
						fontFamily: FONTS.FREDOKAONE,
						color: colors.text,
					},
					transformTitle(),
				]}
			>
				{title}
			</Animated.Text>

			<Animated.Text
				style={[
					{
						position: 'absolute',
						paddingHorizontal: sideMargin,
						top: top + 18,
						fontSize: 18,
						fontFamily: FONTS.MONTSERRAT_BOLD,
						color: colors.text,
						opacity: animatedGroupOpacity,
					},
				]}
			>
				{currentGroup?.name}
			</Animated.Text>
		</View>
	)
}

export default AnimatedHeaderLayout
