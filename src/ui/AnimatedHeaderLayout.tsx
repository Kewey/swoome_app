import { Animated, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { withAnchorPoint } from 'react-native-anchor-point'
import { useTheme } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { sideMargin } from '@constants/Layout'
import { FONTS } from '@types/Fonts'
import { useSelector } from 'react-redux'
import { getCurrentGroup } from '@redux/group.reducer'

const HEADER_EXTENDED = 120
const HEADER_COLLAPSED = 60

interface AnimatedHeaderLayoutProps {
	title: string
	scrollPositionValue: Animated.Value
	offset?: number
}

const AnimatedHeaderLayout = ({
	title,
	scrollPositionValue,
	offset = 0,
}: AnimatedHeaderLayoutProps) => {
	const currentGroup = useSelector(getCurrentGroup)
	const { colors } = useTheme()
	const { top } = useSafeAreaInsets()

	const animatedTitleSize = scrollPositionValue.interpolate({
		inputRange: [offset, offset + HEADER_COLLAPSED - 10],
		outputRange: [1, 0.6],
		extrapolate: 'clamp',
	})

	const animatedTitleYPos = scrollPositionValue.interpolate({
		inputRange: [0, offset + HEADER_COLLAPSED - 10],
		outputRange: [0, -offset - HEADER_COLLAPSED + 10],
		extrapolate: 'clamp',
	})

	const animatedHeaderHeight = scrollPositionValue.interpolate({
		inputRange: [offset + 0, offset + 90],
		outputRange: [1, (top + HEADER_COLLAPSED) / (top + HEADER_EXTENDED)],
		extrapolate: 'clamp',
	})

	const animatedGroupOpacity = scrollPositionValue.interpolate({
		inputRange: [offset + 0, offset + 50],
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
			{ x: 0.5, y: 0 },
			{ height: HEADER_EXTENDED + top, width: 325 }
		)
	}

	const [textDimension, setTextDimension] = useState({ width: 0, height: 0 })

	const transformTitle = (textDimension: { width: number; height: number }) => {
		let transform = {
			transform: [{ scale: animatedTitleSize }],
		}

		return withAnchorPoint(
			// @ts-ignore
			transform,
			{ x: 0, y: 0.5 },
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
						height: offset ? HEADER_COLLAPSED + top : HEADER_EXTENDED + top,
						flexDirection: 'row',
						alignItems: 'flex-end',
						paddingHorizontal: sideMargin,
						backgroundColor: colors.card,
					},
					offset ? null : transformHeight(),
				]}
			></Animated.View>

			<Animated.View
				style={[
					{
						position: 'absolute',
						top: top + offset + HEADER_COLLAPSED,
						paddingHorizontal: sideMargin,
						transform: [{ translateY: animatedTitleYPos }],
					},
				]}
			>
				<Animated.Text
					onLayout={(event) => {
						const { width, height } = event.nativeEvent.layout
						setTextDimension({ width, height })
					}}
					style={[
						{
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
			</Animated.View>

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
