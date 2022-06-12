import { Animated, View } from 'react-native'
import React, { useCallback, useRef } from 'react'
import Layout from '@ui/Layout'
import { Cyan } from '@constants/Colors'
import {
	Circle,
	ClipPath,
	Defs,
	Image as SVGImage,
	Text as SVGText,
} from 'react-native-svg'
import AnimatedHeaderLayout from '@ui/AnimatedHeaderLayout'
import { BarChart } from 'react-native-svg-charts'
import { useFocusEffect, useTheme } from '@react-navigation/native'
import { getGroup, getRefunds } from '@services/groupService'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentGroup, setBalances, setRefunds } from '@redux/group.reducer'
import { displayPrice } from '@services/expenseService'
import { sideMargin } from '@constants/Layout'
import layout from '@constants/Layout'
import FredokaText from '@ui/FredokaText'
import RefundButton from '@screens/refunds/components/refundButton'
import Text from '@ui/Text'

const RefundsScreen = () => {
	const { colors } = useTheme()
	const currentGroup = useSelector(getCurrentGroup)
	const dispatch = useDispatch()
	const {
		window: { width },
	} = layout

	const scrollPositionValue = useRef(new Animated.Value(0)).current

	useFocusEffect(
		useCallback(() => {
			updateRefunds()
		}, [])
	)

	const updateRefunds = async () => {
		const { refunds } = await getRefunds(currentGroup?.id || '')
		const { balances } = await getGroup(currentGroup?.id || '')
		dispatch(setRefunds(refunds))
		dispatch(setBalances(balances))
	}

	const balanceData = currentGroup!.balances.map((balance) => balance.value)

	const maxValue =
		Math.max(...balanceData) > -Math.min(...balanceData)
			? Math.max(...balanceData)
			: -Math.min(...balanceData)

	const Labels = ({ x, y, bandwidth, data, height, contentInset }: any) =>
		data.map((value: any, index: number) => (
			<View key={index + 'bar'}>
				{!!value && (
					<SVGText
						key={index + 'value'}
						x={value < 0 ? sideMargin + 15 : width - sideMargin - 20}
						y={y(index) + bandwidth / 2}
						fontSize={14}
						fontWeight={'bold'}
						fill={colors.text}
						alignmentBaseline={'middle'}
						textAnchor={value > 0 ? 'end' : 'start'}
					>
						{displayPrice(value)}
					</SVGText>
				)}
				<Defs>
					<ClipPath id={`clip${index}`}>
						<Circle cx={x(0)} cy={y(index) + bandwidth / 2} r={20} />
					</ClipPath>
				</Defs>
				<Circle
					cx={x(0)}
					cy={y(index) + bandwidth / 2}
					r={25}
					fill={colors.background}
				/>
				<SVGImage
					x={x(0) - 20}
					y={y(index) + bandwidth / 2 - 20}
					width={40}
					height={40}
					preserveAspectRatio='xMidYMid slice'
					href={{ uri: 'https://i.pravatar.cc/50' }}
					clipPath={`url(#clip${index})`}
				/>
			</View>
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
					style={{
						height: 60 * balanceData.length,
						width: width,
					}}
					spacingInner={0.2}
					svg={{ fill: Cyan }}
					contentInset={{ left: sideMargin, right: sideMargin }}
					yMax={maxValue || 10}
					yMin={-maxValue || -10}
				>
					{/* @ts-ignore */}
					<Labels />
				</BarChart>

				<View style={{ paddingHorizontal: sideMargin, marginTop: 30 }}>
					<FredokaText style={{ fontSize: 20, marginBottom: 10 }}>
						Remboursements
					</FredokaText>
					{currentGroup!.refunds.map((refund) => (
						<View key={refund['@id']} style={{ marginBottom: 15 }}>
							<RefundButton refund={refund} />
						</View>
					))}
					{currentGroup!.refunds.length === 0 && (
						<View
							style={{
								flex: 1,
								paddingHorizontal: sideMargin,
								justifyContent: 'center',
							}}
						>
							<View
								style={{
									alignItems: 'center',
									marginBottom: 20,
								}}
							></View>
							<FredokaText
								style={{ textAlign: 'center', marginBottom: 10, fontSize: 18 }}
							>
								Incroyable !
							</FredokaText>
							<Text
								style={{ textAlign: 'center', marginBottom: 10, opacity: 0.6 }}
							>
								Vous avez équilibré toutes vos dépenses !
							</Text>
						</View>
					)}
				</View>
			</Layout>
			<AnimatedHeaderLayout
				title='Balance'
				scrollPositionValue={scrollPositionValue}
			/>
		</>
	)
}

export default RefundsScreen
