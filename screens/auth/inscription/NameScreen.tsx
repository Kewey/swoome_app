import React from 'react'
import MultiStepForm from '@components/MultiStepForm'
import StepFormChild from '@components/StepFormChild'
import { useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function NameScreen({ navigation }: { navigation: any }) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const onFinish = (data: any) => {
		console.table(data)
		navigation.navigate('GroupHome')
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
						name={'name'}
					/>
					<StepFormChild
						title={'Quelle est ton adresse mail ?'}
						content={
							'Connaitre ton prénom va nous permettre de personnaliser ton expérience.'
						}
						control={control}
						name={'name'}
					/>
					<StepFormChild
						title={'Choisis un mot de passe.'}
						content={
							'Connaitre ton prénom va nous permettre de personnaliser ton expérience.'
						}
						name={'name'}
						control={control}
					/>
					<StepFormChild
						title={'Utiliser Face ID pour se connecter.'}
						content={
							'Connaitre ton prénom va nous permettre de personnaliser ton expérience.'
						}
						control={control}
						name={'name'}
					/>
				</MultiStepForm>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}
