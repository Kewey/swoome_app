import {
	Animated,
	NativeScrollEvent,
	NativeSyntheticEvent,
	ScrollView,
} from 'react-native'
import React, { ReactElement, ReactNode } from 'react'
import { layout } from '@styles/layout'
import { useTheme } from '@react-navigation/native'

const Layout = ({
	children,
	onScroll = undefined,
}: {
	children: ReactNode
	onScroll?:
		| ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
		| undefined
}): ReactElement => {
	const { colors } = useTheme()
	return (
		<Animated.ScrollView
			onScroll={onScroll ? onScroll : undefined}
			showsVerticalScrollIndicator={false}
			scrollEventThrottle={16}
			style={[
				layout.container,
				{
					paddingVertical: 25,
					backgroundColor: colors.background,
				},
			]}
			contentContainerStyle={{
				paddingBottom: 120,
				paddingTop: !!onScroll ? 150 : 0,
			}}
		>
			{children}
		</Animated.ScrollView>
	)
}

export default Layout
