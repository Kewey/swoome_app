import { View } from 'react-native'
import React from 'react'
import { DarkGrey, Blue } from '@constants/Colors'
import { layout } from '@styles/layout'
import FredokaText from '@ui/FredokaText'
import HomeGraph from './components/HomeGraph'
import Text from '@ui/Text'
import AnimatedHeaderLayout from '@ui/AnimatedHeaderLayout'

const ReportScreen = () => {
	return (
		<AnimatedHeaderLayout title='Récap du mois'>
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
		</AnimatedHeaderLayout>
	)
}

export default ReportScreen
