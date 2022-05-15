import { View } from 'react-native'
import React from 'react'
import Layout from '@styles/components/Layout'
import { DarkGrey, Blue } from '@constants/Colors'
import { layout } from '@styles/layout'
import FredokaText from '@ui/FredokaText'
import HomeGraph from './components/HomeGraph'
import Text from '@ui/Text'

const RefundsScreen = () => {
	return (
		<Layout>
			<View style={{ marginHorizontal: 20 }}>
				<FredokaText style={{ fontSize: 32 }}>Balance</FredokaText>
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
		</Layout>
	)
}

export default RefundsScreen
