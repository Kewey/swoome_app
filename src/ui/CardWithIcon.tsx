import { StyleSheet, View } from 'react-native'
import React from 'react'
import CircleButton from './CircleButton'
import { Light, White } from '@constants/Colors'
import Text from './Text'
import { layout } from '@styles/layout'

interface CardWithIconProps {
	icon: string
	label: string
	sublabel?: string
}

const CardWithIcon = ({ icon, label, sublabel }: CardWithIconProps) => {
	return (
		<View
			style={[
				layout.rowSBCenter,
				{
					padding: 15,
					backgroundColor: Light,
					borderRadius: 12,
				},
			]}
		>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<CircleButton
					size={40}
					backgroundColor={White}
					style={{ marginRight: 10 }}
				>
					<Text>{icon}</Text>
				</CircleButton>
				<View>
					{sublabel && <Text style={{ fontSize: 12 }}>{sublabel}</Text>}
					<Text weight='bold'>{label}</Text>
				</View>
			</View>
		</View>
	)
}

export default CardWithIcon

const styles = StyleSheet.create({})
