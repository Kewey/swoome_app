import { useTheme } from '@react-navigation/native'
import React from 'react'
import { Grid, LineChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Blue, Light } from '@constants/Colors'

const HomeGraph = () => {
	const { colors } = useTheme()
	// TODO BACK : RECAP USER DEPENSE
	const data = [34, 56, 59, 120, 112, 260, 109, 30, -20, -60, 58]
	return (
		<LineChart
			style={{ height: 250 }}
			data={data}
			svg={{ stroke: colors.primary, strokeWidth: 3 }}
			contentInset={{ top: 20, bottom: 20, right: 20 }}
			curve={shape.curveNatural}
		>
			<Grid svg={{ stroke: colors.border }} />
		</LineChart>
	)
}

export default HomeGraph
