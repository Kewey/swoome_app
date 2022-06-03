import { StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '@ui/Text'
import CircleButton from '@ui/CircleButton'
import FredokaText from '@ui/FredokaText'
import { borderRadius } from '@styles/layout'
import { useTheme } from '@react-navigation/native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

interface GroupItemProps {
	label: string
	icon: string
	groupName: string
	onPress: () => void
}

const GroupItem = ({ label, icon, groupName, onPress }: GroupItemProps) => {
	const { colors } = useTheme()
	return (
		<TouchableWithoutFeedback
			onPress={onPress}
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				backgroundColor: colors.card,
				borderRadius,
				paddingVertical: 12,
				paddingHorizontal: 16,
			}}
		>
			<CircleButton
				backgroundColor={colors.background}
				size={40}
				style={{ marginRight: 20 }}
			>
				<Text>{icon}</Text>
			</CircleButton>
			<View
				style={{
					flex: 1,
				}}
			>
				<View>
					<FredokaText>{label}</FredokaText>
					<Text style={{ fontSize: 10 }}>{groupName}</Text>
				</View>
			</View>
		</TouchableWithoutFeedback>
	)
}

export default GroupItem

const styles = StyleSheet.create({})
