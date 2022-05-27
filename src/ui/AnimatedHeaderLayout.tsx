import { Animated } from 'react-native'
import React, { useRef, useState } from 'react'
import { withAnchorPoint } from 'react-native-anchor-point'
import { useTheme } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { sideMargin } from '@constants/Layout'
import { FONTS } from '@types/Fonts'
import { useSelector } from 'react-redux'
import { getCurrentGroup } from '@redux/group.reducer'

interface AnimatedHeaderLayoutProps {
	title: string
	scrollPositionValue: Animated.Value
}

const AnimatedHeaderLayout = ({
	title,
	scrollPositionValue,
}: AnimatedHeaderLayoutProps) => {
	const currentGroup = useSelector(getCurrentGroup)
	const { colors } = useTheme()
	const { top } = useSafeAreaInsets()

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

	const [textDimension, setTextDimension] = useState({ width: 0, height: 0 })

	const transformTitle = (textDimension: { width: number; height: number }) => {
		let transform = {
			transform: [
				{ scale: animatedTitleSize },
				{ translateY: animatedTitleXPos },
			],
		}

		return withAnchorPoint(
			// @ts-ignore
			transform,
			{ x: 0.06, y: 0.5 },
			textDimension
		)
	}

	return (
		<>
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
				onLayout={(event) => {
					const { width, height } = event.nativeEvent.layout
					setTextDimension({ width, height })
				}}
				style={[
					{
						position: 'absolute',
						paddingHorizontal: sideMargin,
						top: top + 70,
						fontSize: 32,
						fontFamily: FONTS.FREDOKAONE,
						color: colors.text,
						includeFontPadding: false,
					},
					transformTitle(textDimension),
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
		</>
	)
}

export default AnimatedHeaderLayout
