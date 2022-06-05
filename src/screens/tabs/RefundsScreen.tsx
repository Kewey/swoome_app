import { Animated, Image, View } from 'react-native'
import React, { useCallback, useRef } from 'react'
import Layout from '@ui/Layout'
import { Blue, Cyan, White } from '@constants/Colors'
import {
	Circle,
	ClipPath,
	Defs,
	G,
	Image as SVGImage,
	Rect,
	Text as SVGText,
} from 'react-native-svg'
import AnimatedHeaderLayout from '@ui/AnimatedHeaderLayout'
import { BarChart } from 'react-native-svg-charts'
import { useFocusEffect, useTheme } from '@react-navigation/native'
import { getCurrentBalances, getRefunds } from '@services/groupService'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentGroup, setGroup } from '@redux/group.reducer'
import { addExpense, displayPrice, formatPrice } from '@services/expenseService'
import { sideMargin } from '@constants/Layout'
import layout from '@constants/Layout'
import FredokaText from '@ui/FredokaText'
import { ArrowRight } from 'iconoir-react-native'
import Button from '@ui/Button'
import { Refund } from '@types/Refund'
import dayjs from 'dayjs'
import { FONTS } from '@types/Fonts'

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
		const { balances } = await getCurrentBalances(currentGroup?.id || '')
		dispatch(setGroup({ ...currentGroup, refunds, balances }))
	}

	const refundToExpense = async ({
		receiver,
		price,
		refunder,
		...other
	}: Refund) => {
		if (!currentGroup) return
		console.log(receiver)
		console.log(refunder)

		await addExpense(
			currentGroup!['@id'],
			`Remboursement de ${receiver.username}`,
			price.toString(),
			currentGroup!.expenseTypes.find(
				(expenseType) => expenseType.name === 'Remboursement'
			)?.['@id'] || '',
			[receiver?.['@id']],
			'',
			dayjs().toISOString(),
			refunder['@id']
		)

		const filteredRefunds = currentGroup!.refunds.filter(
			(refund) => refund['@id'] === other['@id']
		)

		dispatch(setGroup({ ...currentGroup, refunds: filteredRefunds }))
	}

	const balanceData = currentGroup!.balances.map((balance) => balance.value)
	const maxValue =
		Math.max(...balanceData) > -Math.min(...balanceData)
			? Math.max(...balanceData)
			: -Math.min(...balanceData)

	const Labels = ({ x, y, bandwidth, data, height, contentInset }: any) =>
		data.map((value: any, index: number) => (
			<>
				{!!value && (
					<SVGText
						key={index + 'value'}
						x={value < 0 ? sideMargin + 15 : width - sideMargin - 20}
						y={y(index) + bandwidth / 2}
						fontSize={14}
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
					<FredokaText>Remboursement</FredokaText>
					{currentGroup!.refunds.map((refund) => (
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}
							key={refund.id + 'refund'}
						>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Image
									source={{ uri: 'https://i.pravatar.cc/50' }}
									height={40}
									width={40}
									style={{ height: 40, width: 40, borderRadius: 20 }}
								/>
								<ArrowRight color={colors.text} height={25} width={50} />
								<Image
									source={{ uri: 'https://i.pravatar.cc/50' }}
									height={40}
									width={40}
									style={{ height: 40, width: 40, borderRadius: 20 }}
								/>
							</View>

							<Button onPress={() => refundToExpense(refund)}>
								Rembourser
							</Button>
						</View>
					))}
					<View></View>
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
