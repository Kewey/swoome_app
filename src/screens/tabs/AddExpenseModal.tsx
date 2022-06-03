import React, { useCallback, useState } from 'react'
import { getCurrentGroup, setGroup } from '@redux/group.reducer'
import { getCurrentUser } from '@redux/user.reducer'
import FredokaText from '@ui/FredokaText'
import {
	Pressable,
	View,
	TextInput as NativeTextInput,
	FlatList,
} from 'react-native'
import { layout } from '@styles/layout'
import { useDispatch, useSelector } from 'react-redux'
import Text from '@ui/Text'
import { useFocusEffect, useTheme } from '@react-navigation/native'
import Button from '@ui/Button'
import TextInput from '@ui/TextInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Controller, useForm } from 'react-hook-form'
import { Expense, ExpenseForm } from '@types/Expense'
import { addExpense, putExpense } from '@services/expenseService'
import { User } from '@types/user'
import { sideMargin } from '@constants/Layout'
import { getSelectedGroup } from '@services/userService'
import {
	ScrollView,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from 'react-native-gesture-handler'
import { FONTS } from '@types/Fonts'
import CircleButton from '@ui/CircleButton'
import dayjs from 'dayjs'
import DateTimePicker from '@react-native-community/datetimepicker'

const AddExpenseModal = ({ route, navigation }) => {
	const expense: Expense = route?.params?.expense
	const currentUser = useSelector(getCurrentUser)
	const currentGroup = useSelector(getCurrentGroup)
	const members: User[] = currentGroup?.members || []
	const dispatch = useDispatch()
	const [isLoading, setIsLoading] = useState(false)
	const { colors } = useTheme()

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
		formState: { errors },
	} = useForm<ExpenseForm>({
		// @ts-ignore
		defaultValues: expense
			? {
					name: expense.name,
					price: expense.price,
					type: expense.type,
					description: expense.description,
					expenseAt: expense.expenseAt,
					madeBy: expense.madeBy['@id'],
					participants: expense.participants?.map(
						(participant) => participant['@id']
					),
			  }
			: {
					madeBy: currentUser?.['@id'],
					participants: members?.map((member) => member?.['@id']) || [],
			  },
	})

	const onSubmit = async ({
		name,
		description,
		price,
		madeBy,
		expenseAt,
		participants,
		date,
		type,
	}: ExpenseForm) => {
		setIsLoading(true)

		try {
			if (!currentGroup?.id) return
			expense
				? await putExpense(
						expense.id,
						name,
						price,
						type['@id'],
						participants,
						description,
						expenseAt,
						madeBy
				  )
				: await addExpense(
						currentGroup['@id'],
						name,
						price,
						type['@id'],
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
			if (selectedParticipants.length === 1) return

			const remainingMember = selectedParticipants.filter(
				(selectedParticipant) => selectedParticipant !== memberIri
			)

			setValue('participants', remainingMember)
			return
		}

		setValue('participants', [...selectedParticipants, memberIri])
	}

	const setMadeBy = (memberIri: string) => {
		const selectedParticipants = getValues('participants')

		const alreadySelectedUser = selectedParticipants?.find(
			(selectedParticipant) => selectedParticipant === memberIri
		)

		if (alreadySelectedUser) return

		setValue('participants', [...selectedParticipants, memberIri])
	}

	return (
		<>
			<KeyboardAwareScrollView
				style={[layout.container, { paddingVertical: sideMargin }]}
			>
				<View>
					<ScrollView>
						<View
							style={{
								marginBottom: 15,
								paddingHorizontal: sideMargin,
								paddingVertical: 20,
							}}
						>
							<Controller
								control={control}
								rules={{
									required: true,
									pattern: /^\d+(,\d{1,2})?$/,
								}}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<View>
										<NativeTextInput
											style={{
												paddingTop: 20,
												marginBottom: 5,
												fontSize: 45,
												fontFamily: FONTS.FREDOKAONE,
												textAlign: 'center',
											}}
											placeholder='0,00'
											onBlur={onBlur}
											onChangeText={onChange}
											value={value?.toString()}
											keyboardType={'decimal-pad'}
											autoFocus
										/>
										{error && <Text>{error.message}</Text>}
									</View>
								)}
								name='price'
							/>
						</View>
						<View
							style={{
								marginBottom: 15,
								paddingVertical: 20,
							}}
						>
							<FredokaText
								style={{ marginBottom: 5, marginHorizontal: sideMargin }}
							>
								On la range dans quoi ?
							</FredokaText>
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<View>
										<FlatList
											horizontal
											snapToInterval={80}
											decelerationRate={0}
											bounces={false}
											contentContainerStyle={{
												paddingHorizontal: sideMargin,
											}}
											ItemSeparatorComponent={() => (
												<View style={{ width: 20 }} />
											)}
											showsHorizontalScrollIndicator={false}
											data={currentGroup?.expenseTypes}
											keyExtractor={(expenseType) => expenseType.id}
											renderItem={({ item: expenseType }) => (
												<View>
													<TouchableWithoutFeedback
														key={expenseType.id + 'type'}
														onPress={() => onChange(expenseType)}
													>
														<CircleButton
															backgroundColor={
																value?.['@id'] === expenseType['@id']
																	? colors.primary
																	: colors.card
															}
															size={60}
														>
															<Text>{expenseType.emoji}</Text>
														</CircleButton>
													</TouchableWithoutFeedback>
												</View>
											)}
										/>
										{error && <Text>{error.message}</Text>}
										<Text
											style={{ paddingHorizontal: sideMargin, marginTop: 8 }}
										>
											{value?.name}
										</Text>
									</View>
								)}
								name='type'
							/>
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
								C'était quand ?
							</FredokaText>
							<Controller
								control={control}
								render={({ field: { onChange, value } }) => {
									const [isOpen, setIsOpen] = useState(false)
									return (
										<>
											<TouchableWithoutFeedback
												onPressIn={() => {
													setIsOpen(true)
												}}
											>
												<TextInput
													editable={false}
													value={`${dayjs(value)
														.format('dddd D MMMM YYYY')
														.charAt(0)
														.toUpperCase()}${dayjs(value)
														.format('dddd D MMMM YYYY')
														.substring(1)}`}
												/>
											</TouchableWithoutFeedback>
											{isOpen && (
												<DateTimePicker
													locale='fr-FR'
													value={dayjs(value).toDate()}
													onChange={(e: any, selectedDate: any) => {
														onChange(selectedDate)
														setIsOpen(false)
													}}
													maximumDate={new Date()}
													onTouchCancel={() => setIsOpen(false)}
												/>
											)}
										</>
									)
								}}
								name='expenseAt'
							/>
							{errors.description && <Text>This is required.</Text>}
						</View>

						<View style={{ marginBottom: 15, paddingHorizontal: sideMargin }}>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
								}}
							>
								<FredokaText style={{ marginBottom: 5 }}>
									Une explication ?
								</FredokaText>
								<Text style={{ marginBottom: 5 }}>(optionnel)</Text>
							</View>
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
								render={({ field: { value, onChange } }) => (
									<FlatList
										horizontal
										style={{
											paddingHorizontal: sideMargin,
										}}
										keyExtractor={(member) => member.id}
										data={members}
										renderItem={({ item: member }) => (
											<TouchableWithoutFeedback
												style={{ marginRight: 20 }}
												key={member.id + 'made'}
												onPress={() => {
													onChange(member['@id'])
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
															value === member['@id']
																? colors.primary
																: colors.card,
													}}
												>
													<Text weight='bold' style={{ fontSize: 30 }}>
														{member.username[0].toUpperCase()}
													</Text>
												</View>
											</TouchableWithoutFeedback>
										)}
									/>
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
											{members?.map((member) => (
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
							<View
								style={{
									marginTop: 20,
									paddingTop: 10,
									paddingBottom: 20,
									paddingHorizontal: 20,
									backgroundColor: colors.card,
								}}
							>
								<Button onPress={handleSubmit(onSubmit)} disabled={isLoading}>
									{isLoading
										? 'Chargement'
										: `${expense ? 'Modifier' : 'Ajouter'} la dépense`}
								</Button>
							</View>
						</View>
					</ScrollView>
				</View>
			</KeyboardAwareScrollView>
		</>
	)
}

export default AddExpenseModal
