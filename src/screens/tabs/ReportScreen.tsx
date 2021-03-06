import { Animated, View } from 'react-native'
import React, { useRef } from 'react'
import { DarkGrey, Blue } from '@constants/Colors'
import { layout } from '@styles/layout'
import HomeGraph from './components/HomeGraph'
import Text from '@ui/Text'
import AnimatedHeaderLayout from '@ui/AnimatedHeaderLayout'
import Layout from '@ui/Layout'

const ReportScreen = () => {
	const scrollPositionValue = useRef(new Animated.Value(0)).current

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
				<View style={{ marginHorizontal: 20 }}>
					<View style={[layout.rowSBCenter, { marginTop: 20 }]}>
						<Text style={{ color: DarkGrey }}>
							Total :{' '}
							<Text weight='bold' style={{ color: Blue }}>
								760,65 €
							</Text>
						</Text>
						<Text style={{ color: DarkGrey }}>
							Dépenses :{' '}
							<Text weight='bold' style={{ color: '#51A53F' }}>
								437,65 €
							</Text>
						</Text>
					</View>
				</View>

				<HomeGraph />
			</Layout>
			<AnimatedHeaderLayout
				title='Récap du mois'
				scrollPositionValue={scrollPositionValue}
			/>
		</>
	)
}

export default ReportScreen
