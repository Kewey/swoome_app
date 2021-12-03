import React, { Children, ReactNode, useState } from 'react'
import { colorBlue, colorGrey } from '@constants/Colors'
import Button from './Button'
import { View } from 'react-native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { useTheme } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/core'

type Steps = {
	goBack?: any
	children: ReactNode
}

const MultiStepForm = ({ children }: Steps) => {
	const navigation = useNavigation()
	const childrenArray = Children.toArray(children)

	const { colors } = useTheme()
	const [currentStep, setCurrentStep] = useState(0)

	return (
		<>
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
							<ChevronLeftIcon height={14} width={14} stroke={colors.text} />
						}
					></Button>
					<Button text textStyle={{ color: colors.background }}>
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

			{childrenArray[currentStep]}

			<View style={{ marginBottom: 30 }}>
				<Button
					block
					size='large'
					onPress={() => {
						// goNextStep()
						setCurrentStep(currentStep + 1)
					}}
				>
					Suivant
					{/* {actions && actions[0].text} */}
				</Button>
				{/* {actions && actions[1] && (
					<Button
						text
						block
						textStyle={{ color: colorDarkBlue }}
						onPress={() => actions[1].action}
					>
						{actions[1].text}
					</Button> */}
				{/* )} */}
			</View>
		</>
	)
}

export default MultiStepForm
