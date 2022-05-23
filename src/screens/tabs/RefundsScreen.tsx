import { View } from 'react-native'
import React from 'react'
import Layout from '@ui/Layout'
import { DarkGrey, Blue } from '@constants/Colors'
import { layout } from '@styles/layout'
import FredokaText from '@ui/FredokaText'
import HomeGraph from './components/HomeGraph'
import Text from '@ui/Text'
import AnimatedHeaderLayout from '@ui/AnimatedHeaderLayout'

const RefundsScreen = () => {
	return (
		<AnimatedHeaderLayout title='Balance'>
			<View style={{ marginHorizontal: 20 }}>
				<View style={[layout.rowSBCenter]}>
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
		</AnimatedHeaderLayout>
	)
}

export default RefundsScreen
