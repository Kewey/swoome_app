import React from 'react'
import MultiStepForm from '@components/MultiStepForm'
import StepFormChild from '@components/StepFormChild'
import { useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { API } from '@services/apiService'
import { Screens } from '@navigation/screens'

export default function InscriptionScreen({ navigation }: any) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const onFinish = async (data: any) => {
		try {
			const res = await API.post('/user', { ...data })
			navigation.navigate(Screens.Group)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<KeyboardAvoidingView
				style={{
					flex: 1,
					padding: 20,
				}}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<MultiStepForm onFinish={handleSubmit(onFinish)}>
					<StepFormChild
						title={'Comment tes amis t’appellent-ils ?'}
						content={
							'Connaitre ton prénom va nous permettre de personnaliser ton expérience.'
						}
						control={control}
						name={'firstname'}
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
					/>
				</MultiStepForm>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}
