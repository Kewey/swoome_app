import React from 'react'
import MultiStepForm from '@components/MultiStepForm'
import StepFormChild from '@components/StepFormChild'
import { useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function NameScreen({ navigation }: any) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm()

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<KeyboardAvoidingView
				style={{
					flex: 1,
					padding: 20,
				}}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<MultiStepForm>
					<StepFormChild
						title={'Comment tes amis t’appellent-ils ?'}
						content={
							'Connaitre ton prénom va nous permettre de personnaliser ton expérience.'
						}
						control={control}
						name={'name'}
					/>
					<StepFormChild
						title={'Quelle est ton adresse mail ?'}
						content={
							'Connaitre ton prénom va nous permettre de personnaliser ton expérience.'
						}
						control={control}
						name={'email'}
					/>
					<StepFormChild
						title={'Choisis un mot de passe.'}
						content={
							'Connaitre ton prénom va nous permettre de personnaliser ton expérience.'
						}
						name={'password'}
						control={control}
					/>
					<StepFormChild
						skippable
						title={'Utiliser Face ID pour se connecter.'}
						content={
							'Connaitre ton prénom va nous permettre de personnaliser ton expérience.'
						}
						control={control}
						name={'faceID'}
					/>
				</MultiStepForm>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}
