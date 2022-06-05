import { View, Image } from 'react-native'
import React from 'react'
import Text from './Text'
import { useTheme } from '@react-navigation/native'

interface AvatarProps {
	source: string | undefined
	username: string
	size?: number
}

const Avatar = ({ source, username, size = 20 }: AvatarProps) => {
	const { colors } = useTheme()
	return source ? (
		<Image
			width={size}
			height={size}
			source={{ uri: source }}
			style={{
				height: size,
				width: size,
				borderRadius: size / 2,
				backgroundColor: colors.card,
				alignItems: 'center',
				justifyContent: 'center',
				borderColor: colors.background,
				borderWidth: size / 20,
			}}
		/>
	) : (
		<View
			style={{
				height: size,
				width: size,
				borderRadius: size / 2,
				backgroundColor: colors.card,
				alignItems: 'center',
				justifyContent: 'center',
				borderColor: colors.background,
				borderWidth: size / 20,
			}}
		>
			<Text weight='bold' style={{ fontSize: size / 2 }}>
				{username.charAt(0)}
			</Text>
		</View>
	)
}

export default Avatar
