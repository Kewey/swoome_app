import React, { Children, ReactElement, ReactNode, useState } from 'react'
import {
	colorBlue,
	colorDarkBlue,
	colorDarkerBlue,
	colorDarkGrey,
	colorGrey,
	colorWhite,
} from '@constants/Colors'
import {
	View,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	TextInput,
	ScrollView,
	TextInputProps,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from './Button'
import { FredokaText, Text } from './StyledText'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { useTheme } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@types/RootTab'
import { Controller, useForm } from 'react-hook-form'

type Steps = {
	steps?: Step[]
	navigation?: NativeStackScreenProps<RootStackParamList, 'Root'>
	children: ReactNode
}

type Action = {
	action: () => void
	text: string
}

type Step = {
	title: string
	content: string
	inputName: string
	data?: TextInputProps
	actions?: Action[]
}

const MultiStepForm = ({ steps, navigation, children }: Steps) => {
	const childrenArray = Children.toArray(children)

	console.log(`childrenArray`, childrenArray[0].props.step.title)

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const [currentStep, setCurrentStep] = useState(0)

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<SafeAreaView style={{ flex: 1 }}>
				<View style={{ marginBottom: 40 }}>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginBottom: 30,
							marginTop: 10,
						}}
					>
						<Button
							circle
							size='small'
							variant={'white'}
							onPress={() => {
								if (currentStep === 0) {
									navigation.goBack()
									return
								}
								setCurrentStep(currentStep - 1)
							}}
							before={
								<ChevronLeftIcon
									height={14}
									width={14}
									stroke={colorDarkGrey}
								/>
							}
						></Button>
						<Button text textStyle={{ color: colorDarkerBlue }}>
							Déjà un compte ?
						</Button>
					</View>

					<View
						style={{
							height: 5,
							width: 150,
							backgroundColor: colorGrey,
							borderRadius: 3,
							marginBottom: 40,
							alignSelf: 'center',
						}}
					>
						<View
							style={{
								height: '100%',
								width: ((currentStep + 1) * 100) / childrenArray.length + '%',
								backgroundColor: colorBlue,
								borderRadius: 3,
							}}
						/>
					</View>
				</View>

				{children(control)}
			</SafeAreaView>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 25,
		backgroundColor: colorWhite,
	},
})

const StepFormChild = ({
	step: { title, content, inputName, data, actions },
	children,
}: {
	step: Step
	children: ReactElement
}) => {
	return (
		<>
			<ScrollView style={{ flex: 1 }}>
				<FredokaText
					style={{
						fontSize: 28,
						textAlign: 'center',
						marginBottom: 16,
						color: colorDarkBlue,
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
						color: colorDarkBlue,
					}}
				>
					{content}
				</Text>
			</ScrollView>

			<View style={{ marginBottom: 30 }}>
				<View
					style={{
						borderRadius: 10,
						borderColor: '#eaeaea',
						borderWidth: 1,
						marginBottom: 20,
					}}
				>
					<Controller
						name={inputName}
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								style={{ paddingHorizontal: 22, paddingVertical: 20 }}
								placeholder={'Ex. Bob'}
							/>
						)}
					/>
				</View>
				<Button
					block
					size='large'
					onPress={
						() => {
							setCurrentStep(currentStep + 1)
						}
						/*step.actions[0].action()*/
					}
				>
					{actions && actions[0].text}
				</Button>
				{actions[1] && (
					<Button
						text
						block
						textStyle={{ color: colorDarkBlue }}
						onPress={() => actions[1].action}
					>
						{actions[1].text}
					</Button>
				)}
			</View>
		</>
	)
}

export { MultiStepForm, StepFormChild }
