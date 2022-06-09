import { Dimensions, Platform, View } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { ReactChildren } from 'react-native-toast-message'
import { sideMargin } from '@constants/Layout'
import { borderRadius } from '@styles/layout'
import { useTheme } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const deviceWidth = Dimensions.get('window').width
const deviceHeight =
	Platform.OS === 'ios'
		? Dimensions.get('window').height
		: Dimensions.get('window').height + 60

interface BottomSheetModalProps {
	children: ReactChildren
	closeModal: () => void
	isOpen: boolean
}

const BottomSheetModal = ({
	children,
	closeModal,
	isOpen,
}: BottomSheetModalProps) => {
	const { colors } = useTheme()
	const { bottom } = useSafeAreaInsets()

	return (
		<Modal
			onBackdropPress={closeModal}
			isVisible={isOpen}
			useNativeDriver={true}
			useNativeDriverForBackdrop={true}
			style={{
				justifyContent: 'flex-end',
				margin: sideMargin,
				marginBottom: bottom + sideMargin,
			}}
			backdropOpacity={0.6}
			deviceWidth={deviceWidth}
			deviceHeight={deviceHeight}
		>
			<View
				style={{
					padding: sideMargin,
					backgroundColor: colors.card,
					borderRadius: borderRadius * 2,
				}}
			>
				{children}
			</View>
		</Modal>
	)
}

export default BottomSheetModal
