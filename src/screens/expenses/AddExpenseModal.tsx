import React, { useState } from 'react'
import { getCurrentGroup } from '@redux/group.reducer'
import { getCurrentUser } from '@redux/user.reducer'
import FredokaText from '@ui/FredokaText'
import { Pressable, View } from 'react-native'
import { layout } from '@styles/layout'
import { useDispatch, useSelector } from 'react-redux'
import Text from '@ui/Text'
import { useNavigation, useTheme } from '@react-navigation/native'
import Button from '@ui/Button'
import TextInput from '@ui/TextInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Controller, useForm } from 'react-hook-form'
import { ExpenseForm } from '@types/Expense'
import { addExpense } from '@services/expenseService'
import { User } from '@types/user'

const AddExpenseModal = () => {
	const dispatch = useDispatch()
	const currentUser = useSelector(getCurrentUser)
	const currentGroup = useSelector(getCurrentGroup)
	const members: User[] = currentGroup?.members || []
	const navigation = useNavigation()
	const [loading, setLoading] = useState(false)

	const {
		control,
		setValue,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm<ExpenseForm>({
		defaultValues: { madeBy: currentUser?.id, participants: [] },
	})

	const onSubmit = async ({
		name,
		description,
		price,
		madeBy,
		participants,
	}: ExpenseForm) => {
		setLoading(true)
		try {
			console.log('currentGroup', currentGroup)
			if (!currentGroup?.id) return
			const newExpense = await addExpense(
				currentGroup['@id'],
				name,
				price,
				participants,
				description,
				madeBy
			)

			setLoading(false)
			navigation.goBack()
		} catch (error) {
			setLoading(false)
		}
	}

	const { colors } = useTheme()

	return (
		<>
			<KeyboardAwareScrollView
				style={[layout.container, { paddingVertical: 25 }]}
			>
				<View style={{ paddingHorizontal: 20 }}>
					<View>
						<View style={{ marginBottom: 15 }}>
							<FredokaText style={{ marginBottom: 5 }}>
								T'as acheté quoi ?
							</FredokaText>
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										style={{
											marginBottom: 5,
										}}
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										autoCapitalize='none'
									/>
								)}
								name='name'
							/>
							{errors.name && <Text>This is required.</Text>}
						</View>
						<View style={{ marginBottom: 15 }}>
							<FredokaText style={{ marginBottom: 5 }}>
								Besoin d'un explication ?
							</FredokaText>
							<Controller
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										style={{
											marginBottom: 5,
										}}
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										autoCapitalize='none'
									/>
								)}
								name='description'
							/>
							{errors.description && <Text>This is required.</Text>}
						</View>
						<View style={{ marginBottom: 15 }}>
							<FredokaText style={{ marginBottom: 5 }}>Prix</FredokaText>
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										style={{
											marginBottom: 5,
										}}
										onBlur={onBlur}
										onChangeText={onChange}
										value={value?.toString()}
										autoCapitalize='none'
									/>
								)}
								name='price'
							/>
							{errors.price && <Text>This is required.</Text>}
						</View>
						<View style={{ marginBottom: 15 }}>
							<FredokaText style={{ marginBottom: 5 }}>
								Qui a payé ?
							</FredokaText>
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({ field: { value: madeBy } }) => (
									<View>
										{members.map((member) => (
											<Pressable
												onPress={() => setValue('madeBy', member['@id'])}
											>
												<View>
													<Text>
														{madeBy === member['@id'] ? '✅ ' : ' '}
														{member?.username}
													</Text>
												</View>
											</Pressable>
										))}
									</View>
								)}
								name='madeBy'
							/>
							{errors.madeBy && <Text>This is required.</Text>}
						</View>
						<View style={{ marginBottom: 15 }}>
							<FredokaText style={{ marginBottom: 5 }}>
								Qui a payé ?
							</FredokaText>
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({ field: { value: selectedParticipants } }) => (
									<View>
										{members.map((member) => (
											<Pressable
												onPress={() => {
													if (!member['@id']) return

													if (
														selectedParticipants?.find(
															(selectedParticipant) =>
																selectedParticipant === member['@id']
														)
													) {
														const removeMember = selectedParticipants.filter(
															(selectedParticipant) =>
																selectedParticipant !== member['@id']
														)

														setValue('participants', removeMember)
														return
													}

													setValue('participants', [
														...selectedParticipants,
														member['@id'],
													])
												}}
											>
												<View>
													<Text>
														{selectedParticipants?.find(
															(selectedParticipant) =>
																selectedParticipant === member['@id']
														)
															? '✅ '
															: ' '}
														{member?.username}
													</Text>
												</View>
											</Pressable>
										))}
									</View>
								)}
								name='participants'
							/>
							{errors.participants && <Text>This is required.</Text>}
						</View>
					</View>
				</View>
			</KeyboardAwareScrollView>
			<View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
				<Button onPress={handleSubmit(onSubmit)}>Ajouter une dépense</Button>
			</View>
		</>
	)
}

export default AddExpenseModal
