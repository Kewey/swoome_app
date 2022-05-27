import { Animated, View } from 'react-native'
import React, { useRef } from 'react'
import Layout from '@ui/Layout'
import { White } from '@constants/Colors'
import { Text as SVGText } from 'react-native-svg'
import AnimatedHeaderLayout from '@ui/AnimatedHeaderLayout'
import { BarChart } from 'react-native-svg-charts'
import { useTheme } from '@react-navigation/native'

const RefundsScreen = () => {
	const scrollPositionValue = useRef(new Animated.Value(0)).current
	const { colors } = useTheme()

	const balance = [50, -40, -90, 9, 100]
	const maxValue =
		Math.max(...balance) > -Math.min(...balance)
			? Math.max(...balance)
			: -Math.min(...balance)

	const Labels = ({ x, y, bandwidth, data }: any) =>
		data.map((value: number, index: number) => (
			<>
				<SVGText
					key={index}
					x={
						value > 0
							? x(value) - value.toString().length * 10 - 15
							: x(value) + 10
					}
					y={y(index) + bandwidth / 2}
					fontSize={14}
					fill={White}
					alignmentBaseline={'middle'}
				>
					{value} €
				</SVGText>
				<View></View>
			</>
		))

	return (
		<>
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
				<BarChart
					data={balance}
					horizontal
					style={{ height: 60 * balance.length }}
					spacingInner={0.2}
					svg={{ fill: colors.primary }}
					contentInset={{ left: 50, right: 50 }}
					yMax={maxValue}
					yMin={-maxValue}
				>
					{/* @ts-ignore */}
					<Labels />
				</BarChart>
			</Layout>
			<AnimatedHeaderLayout
				title='Balance'
				scrollPositionValue={scrollPositionValue}
			/>
		</>
	)
}

export default RefundsScreen
