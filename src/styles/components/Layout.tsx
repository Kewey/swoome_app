import { ScrollView } from 'react-native'
import React, { ReactElement, ReactNode } from 'react'
import { layout } from '@styles/layout'
import { useTheme } from '@react-navigation/native'

const Layout = ({ children }: { children: ReactNode }): ReactElement => {
	const { colors } = useTheme()
	return (
		<ScrollView
			style={[
				layout.container,
				{
					paddingVertical: 25,
					backgroundColor: colors.background,
				},
			]}
			contentContainerStyle={{ paddingBottom: 90 }}
		>
			{children}
		</ScrollView>
	)
}

export default Layout
