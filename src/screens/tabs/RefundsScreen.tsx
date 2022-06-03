import { Animated, View } from 'react-native'
import React, { useCallback, useRef } from 'react'
import Layout from '@ui/Layout'
import { Blue, Cyan, White } from '@constants/Colors'
import { Text as SVGText } from 'react-native-svg'
import AnimatedHeaderLayout from '@ui/AnimatedHeaderLayout'
import { BarChart } from 'react-native-svg-charts'
import { useFocusEffect, useTheme } from '@react-navigation/native'
import { getCurrentBalances, getRefunds } from '@services/groupService'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentGroup, setGroup } from '@redux/group.reducer'

const RefundsScreen = () => {
	const { colors } = useTheme()
	const currentGroup = useSelector(getCurrentGroup)
	const dispatch = useDispatch()

	const scrollPositionValue = useRef(new Animated.Value(0)).current

	useFocusEffect(
		useCallback(() => {
			updateRefunds()
		}, [])
	)

	const updateRefunds = async () => {
		const { refunds } = await getRefunds(currentGroup?.id || '')
		const { balances } = await getCurrentBalances(currentGroup?.id || '')
		dispatch(setGroup({ ...currentGroup, refunds, balances }))
	}

	const balanceData = currentGroup.balances.map((balance) => balance.value)
	const maxValue =
		Math.max(...balanceData) > -Math.min(...balanceData)
			? Math.max(...balanceData)
			: -Math.min(...balanceData)

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
					fill={Cyan}
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
					data={balanceData}
					horizontal
					style={{ height: 60 * balanceData.length }}
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
