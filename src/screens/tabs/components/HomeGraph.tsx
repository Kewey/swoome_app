import { useTheme } from '@react-navigation/native'
import React from 'react'
import { LineChart, Grid } from 'react-native-svg-charts'

const HomeGraph = () => {
	const { colors } = useTheme()
	const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
	return (
		<LineChart
			style={{ height: 250 }}
			data={data}
			svg={{ stroke: colors.primary, strokeWidth: 2 }}
			contentInset={{ top: 20, bottom: 20 }}
		></LineChart>
	)
}

export default HomeGraph
