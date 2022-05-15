import React, { useState } from 'react'
import { getCurrentGroup } from '@redux/group.reducer'
import { getCurrentUser } from '@redux/user.reducer'
import FredokaText from '@ui/FredokaText'
import { Pressable, View } from 'react-native'
import { layout } from '@styles/layout'
import { useSelector } from 'react-redux'
import Text from '@ui/Text'
import { useNavigation, useTheme } from '@react-navigation/native'
import Button from '@ui/Button'
import TextInput from '@ui/TextInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Controller, useForm } from 'react-hook-form'
import { ExpenseForm } from '@types/Expense'
import { addExpense } from '@services/expenseService'
import { User } from '@types/user'
import { sideMargin } from '@constants/Layout'
import { Asana } from 'iconoir-react-native'

const AddExpenseModal = () => {
	const currentUser = useSelector(getCurrentUser)
	const currentGroup = useSelector(getCurrentGroup)
	const members: User[] = currentGroup?.members || []
	const navigation = useNavigation()
	const [isLoading, setIsLoading] = useState(false)

	const {
		control,
		setValue,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm<ExpenseForm>({
		defaultValues: { madeBy: currentUser?.['@id'], participants: [] },
	})

	const onSubmit = async ({
		name,
		description,
		price,
		madeBy,
		participants,
	}: ExpenseForm) => {
		setIsLoading(true)
		try {
			if (!currentGroup?.id) return
			const newExpense = await addExpense(
				currentGroup['@id'],
				name,
				price,
				participants,
				description,
				madeBy
			)

			setIsLoading(false)
			navigation.goBack()
		} catch (error) {
			setIsLoading(false)
		}
	}

	const { colors } = useTheme()

	return (
		<>
			<KeyboardAwareScrollView
				style={[layout.container, { paddingVertical: sideMargin }]}
			>
				<View>
					<View>
						<View style={{ marginBottom: 15, paddingHorizontal: sideMargin }}>
							<FredokaText style={{ marginBottom: 5 }}>
								Montant de la dépense
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
										value={value?.toString()}
										keyboardType={'decimal-pad'}
									/>
								)}
								name='price'
							/>
							{errors.price && <Text>This is required.</Text>}
						</View>
						<View style={{ marginBottom: 15, paddingHorizontal: sideMargin }}>
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
									/>
								)}
								name='name'
							/>
							{errors.name && <Text>This is required.</Text>}
						</View>
						<View style={{ marginBottom: 15, paddingHorizontal: sideMargin }}>
							<FredokaText style={{ marginBottom: 5 }}>
								Une explication ? (optionnel)
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
									/>
								)}
								name='description'
							/>
							{errors.description && <Text>This is required.</Text>}
						</View>
						<View style={{ marginBottom: 15 }}>
							<FredokaText
								style={{ marginBottom: 5, paddingHorizontal: sideMargin }}
							>
								Le sauveur.se
							</FredokaText>
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({ field: { value: madeBy } }) => (
									<View style={{ paddingHorizontal: sideMargin }}>
										{members.map((member) => (
											<Pressable
												key={member.id + 'made'}
												onPress={() => setValue('madeBy', member['@id'])}
											>
												<View
													style={{
														height: 80,
														width: 80,
														backgroundColor: colors.card,
														borderRadius: 40,
														alignItems: 'center',
														justifyContent: 'center',
														borderWidth: 3,
														borderColor:
															madeBy === member['@id']
																? colors.primary
																: colors.card,
													}}
												>
													<Text weight='bold' style={{ fontSize: 30 }}>
														{member.username[0].toUpperCase()}
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
							<FredokaText
								style={{ marginBottom: 5, paddingHorizontal: sideMargin }}
							>
								Les concernés
							</FredokaText>
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({ field: { value: selectedParticipants } }) => (
									<View style={{ paddingHorizontal: sideMargin }}>
										{members.map((member) => (
											<Pressable
												key={member.id}
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
												<View
													style={{
														height: 80,
														width: 80,
														backgroundColor: colors.card,
														borderRadius: 40,
														alignItems: 'center',
														justifyContent: 'center',
														borderWidth: 3,
														borderColor: selectedParticipants?.find(
															(selectedParticipant) =>
																selectedParticipant === member['@id']
														)
															? colors.primary
															: colors.card,
													}}
												>
													<Text weight='bold' style={{ fontSize: 30 }}>
														{member.username[0].toUpperCase()}
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
			<View
				style={{
					paddingVertical: 10,
					paddingHorizontal: 20,
					backgroundColor: colors.card,
				}}
			>
				<Button onPress={handleSubmit(onSubmit)} disabled={isLoading}>
					{isLoading ? <Asana color={colors.text} /> : 'Ajouter une dépense'}
				</Button>
			</View>
		</>
	)
}

export default AddExpenseModal
