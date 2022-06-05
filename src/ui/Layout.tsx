import {
	Animated,
	KeyboardAvoidingView,
	NativeScrollEvent,
	NativeSyntheticEvent,
	Platform,
	ScrollView,
} from 'react-native'
import React, { ReactElement, ReactNode } from 'react'
import { layout } from '@styles/layout'
import { useTheme } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

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
	const { top } = useSafeAreaInsets()
	return (
		<Animated.ScrollView
			onScroll={onScroll ? onScroll : undefined}
			showsVerticalScrollIndicator={false}
			scrollEventThrottle={16}
			keyboardShouldPersistTaps='handled'
			style={[
				layout.container,
				{
					paddingVertical: 25,
					backgroundColor: colors.background,
				},
			]}
			contentContainerStyle={{
				paddingBottom: 120,
				paddingTop: !!onScroll ? top + 110 : 0,
			}}
		>
			{children}
		</Animated.ScrollView>
	)
}

export default Layout
