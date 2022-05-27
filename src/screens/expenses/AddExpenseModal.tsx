import React, { useCallback, useState } from 'react'
import { getCurrentGroup, setGroup } from '@redux/group.reducer'
import { getCurrentUser } from '@redux/user.reducer'
import FredokaText from '@ui/FredokaText'
import { Pressable, View } from 'react-native'
import { layout } from '@styles/layout'
import { useDispatch, useSelector } from 'react-redux'
import Text from '@ui/Text'
import {
	useFocusEffect,
	useNavigation,
	useTheme,
} from '@react-navigation/native'
import Button from '@ui/Button'
import TextInput from '@ui/TextInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Controller, useForm } from 'react-hook-form'
import { Expense, ExpenseForm } from '@types/Expense'
import { addExpense, putExpense } from '@services/expenseService'
import { User } from '@types/user'
import { sideMargin } from '@constants/Layout'
import { Asana } from 'iconoir-react-native'
import { getSelectedGroup } from '@services/userService'
import { ScrollView } from 'react-native-gesture-handler'

const AddExpenseModal = ({ route }) => {
	const navigation = useNavigation()
	const expense: Expense = route?.params?.expense
	const currentUser = useSelector(getCurrentUser)
	const currentGroup = useSelector(getCurrentGroup)
	const members: User[] = currentGroup?.members || []
	const dispatch = useDispatch()
	const [isLoading, setIsLoading] = useState(false)

	useFocusEffect(
		useCallback(() => {
			updateGroup()
		}, [])
	)

	const updateGroup = async () => {
		const reloadGroup = await getSelectedGroup(currentGroup.id)
		dispatch(setGroup(reloadGroup))
	}

	const {
		control,
		setValue,
		getValues,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm<ExpenseForm>({
		// @ts-ignore
		defaultValues: expense
			? {
					name: expense.name,
					price: expense.price,
					description: expense.description,
					expenseAt: expense.expenseAt,
					madeBy: expense.madeBy['@id'],
					participants: expense.participants?.map(
						(participant) => participant['@id']
					),
			  }
			: {
					madeBy: currentUser?.['@id'],
					participants: members.map((member) => member?.['@id']),
			  },
	})

	const onSubmit = async ({
		name,
		description,
		price,
		madeBy,
		expenseAt,
		participants,
	}: ExpenseForm) => {
		setIsLoading(true)

		try {
			if (!currentGroup?.id) return
			expense
				? await putExpense(
						expense.id,
						name,
						price,
						participants,
						description,
						expenseAt,
						madeBy
				  )
				: await addExpense(
						currentGroup['@id'],
						name,
						price,
						participants,
						description,
						expenseAt,
						madeBy
				  )

			setIsLoading(false)
			navigation.goBack()
		} catch (error) {
			setIsLoading(false)
		}
	}

	const addParticipant = (memberIri: string) => {
		const selectedParticipants = getValues('participants')

		const alreadySelectedUser = selectedParticipants?.find(
			(selectedParticipant) => selectedParticipant === memberIri
		)

		if (alreadySelectedUser) {
			const remainingMember = selectedParticipants.filter(
				(selectedParticipant) => selectedParticipant !== memberIri
			)

			setValue('participants', remainingMember)
			return
		}

		setValue('participants', [...selectedParticipants, memberIri])
	}

	const setMadeBy = (memberIri: string) => {
		setValue('madeBy', memberIri)

		const selectedParticipants = getValues('participants')

		const alreadySelectedUser = selectedParticipants?.find(
			(selectedParticipant) => selectedParticipant === memberIri
		)

		if (alreadySelectedUser) return

		setValue('participants', [...selectedParticipants, memberIri])
	}

	const { colors } = useTheme()

	return (
		<>
			<KeyboardAwareScrollView
				style={[layout.container, { paddingVertical: sideMargin }]}
			>
				<View>
					<ScrollView>
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
									<ScrollView
										horizontal
										style={{
											paddingHorizontal: sideMargin,
										}}
									>
										<View
											style={{
												flexDirection: 'row',
											}}
										>
											{members.map((member) => (
												<Pressable
													style={{ marginRight: 20 }}
													key={member.id + 'made'}
													onPress={() => {
														setMadeBy(member['@id'])
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
									</ScrollView>
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
									<ScrollView
										horizontal
										style={{ paddingHorizontal: sideMargin }}
									>
										<View
											style={{
												flexDirection: 'row',
											}}
										>
											{members.map((member) => (
												<Pressable
													style={{ marginRight: 20 }}
													key={member.id}
													onPress={() => addParticipant(member['@id'])}
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
									</ScrollView>
								)}
								name='participants'
							/>
							{errors.participants && <Text>This is required.</Text>}
						</View>
					</ScrollView>
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
