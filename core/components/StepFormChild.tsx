import React, { ReactNode } from 'react'
import { ScrollView, TextInput } from 'react-native'
import { View } from './Themed'
import { FredokaText, Text } from './StyledText'
import { colorDarkBlue } from '@constants/Colors'
import { Controller } from 'react-hook-form'
import { useTheme } from '@react-navigation/native'

type Action = {
	action: () => void
	text: string
}

type Step = {
	title: string
	content: string
	name?: string
	control?: any
	children?: ReactNode
	skippable?: boolean
}

const StepFormChild = ({
	title,
	content,
	name,
	control,
	children,
	skippable,
}: Step) => {
	const { colors } = useTheme()

	if (children) {
		return <>{children}</>
	}

	return (
		<>
			<ScrollView style={{ flex: 1 }}>
				<FredokaText
					style={{
						fontSize: 28,
						textAlign: 'center',
						marginBottom: 16,
						color: colors.text,
					}}
				>
					{title}
				</FredokaText>
				<Text
					style={{
						fontSize: 13,
						lineHeight: 20,
						opacity: 0.5,
						textAlign: 'center',
						color: colors.text,
					}}
				>
					{content}
				</Text>
			</ScrollView>

			<View
				style={{
					borderRadius: 10,
					borderColor: colors.border,
					borderWidth: 1,
					marginBottom: 20,
				}}
			>
				{control && name && (
					<Controller
						name={name}
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								autoFocus={true}
								style={{
									paddingHorizontal: 22,
									paddingVertical: 20,
									color: colors.text,
									backgroundColor: colors.card,
									borderRadius: 8,
								}}
								placeholder={'Ex. Bob'}
							/>
						)}
					/>
				)}
			</View>
		</>
	)
}

export default StepFormChild
