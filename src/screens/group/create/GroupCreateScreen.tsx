import React, { useState } from 'react'
import Button from '@components/Button'
import ProgressBar from '@components/MultiStep/ProgressBar'
import { useNavigation, useTheme } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View } from 'react-native'
import GroupTypeStep from './GroupTypeStep'
import { useForm } from 'react-hook-form'

const GroupCreateScreen = () => {
	const [currentStep, setCurrentStep] = useState(1)

	const navigation = useNavigation()

	const { setValue } = useForm({ defaultValues: { type: '', name: '' } })

	const {
		colors: { text },
	} = useTheme()

	const handleNextStep = (step: number, callback: (value: string) => void) => {
		setCurrentStep(step)
		callback()
	}
	// TODO : pass info from child
	const steps = [
		<GroupTypeStep
			goNextStep={handleNextStep(currentStep, (value: string) => {
				setValue('type', value)
			})}
		/>,
	]

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View
				style={{
					paddingVertical: 20,
					paddingHorizontal: 25,
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<Button
					circle
					size='small'
					variant={'white'}
					onPress={() => {
						currentStep >= 1
							? navigation.goBack()
							: setCurrentStep(currentStep - 1)
					}}
				>
					<ChevronLeftIcon height={14} width={14} stroke={text} />
				</Button>
				<Button text textStyle={{ fontSize: 14 }}>
					Déjà une maison ?
				</Button>
			</View>
			<View style={{ marginTop: 10, marginBottom: 30 }}>
				<ProgressBar currentStep={currentStep} nbSteps={2} />
			</View>

			{steps[currentStep - 1]}
		</SafeAreaView>
	)
}

export default GroupCreateScreen
