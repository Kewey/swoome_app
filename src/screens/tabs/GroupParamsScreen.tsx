import {
	Animated,
	Image,
	Pressable,
	TouchableOpacity,
	View,
} from 'react-native'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentGroup, setGroup } from '@redux/group.reducer'
import { borderRadius, layout } from '@styles/layout'
import FredokaText from '@ui/FredokaText'
import Text from '@ui/Text'
import CircleButton from '@ui/CircleButton'
import { MoreHoriz, Trash } from 'iconoir-react-native'
import { useTheme } from '@react-navigation/native'
import Button from '@ui/Button'
import * as Clipboard from 'expo-clipboard'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import AnimatedHeaderLayout from '@ui/AnimatedHeaderLayout'
import Layout from '@ui/Layout'
import Input from '@ui/Input'
import { Controller, useForm } from 'react-hook-form'
import CardWithIcon from '@ui/CardWithIcon'
import BottomSheetModal from '@ui/BottomSheetModal'
import { editGroup } from '@services/groupService'

const GroupParamsScreen = () => {
	const currentGroup = useSelector(getCurrentGroup)
	const { colors } = useTheme()
	const [isOpen, setIsOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const dispatch = useDispatch()

	const scrollPositionValue = useRef(new Animated.Value(0)).current

	const { control, handleSubmit } = useForm<{ name: string }>()

	const onSubmit = async ({ name }: any) => {
		setIsLoading(true)
		console.log(name)
		const editedGroup = await editGroup(currentGroup?.id || '', name)
		dispatch(setGroup(editedGroup))
		setIsLoading(false)
		setIsOpen(false)
	}

	return (
		<>
			<Layout
				onScroll={Animated.event(
					[
						{
							nativeEvent: {
								contentOffset: { y: scrollPositionValue },
							},
						},
					],
					{ useNativeDriver: true }
				)}
			>
				<View style={{ paddingHorizontal: 20, marginBottom: 25 }}>
					<View
						style={{
							backgroundColor: colors.card,
							borderRadius: borderRadius * 2,
							paddingTop: 25,
							paddingBottom: 25,
							paddingHorizontal: 20,
							marginBottom: 25,
						}}
					>
						<Pressable
							onPress={() => {
								try {
									Clipboard.setString(currentGroup?.code || '')
									Toast.show({
										type: 'success',
										text1: 'Code copié',
									})
								} catch (error) {
									Toast.show({
										type: 'error',
										text1: 'Aie',
										text2: 'Impossible de copier le code',
									})
								}
							}}
						>
							<FredokaText
								style={{ fontSize: 40, letterSpacing: 20, textAlign: 'center' }}
							>
								{currentGroup?.code}
							</FredokaText>
						</Pressable>
						{/* <View
							style={{
								height: 1,
								width: '100%',
								backgroundColor: colors.border,
								marginTop: 20,
								marginBottom: 5,
							}}
						/>
						<View>
							<Button variant='transparent'>Partager le code</Button>
						</View> */}
					</View>

					<View style={{ marginBottom: 10 }}>
						<FredokaText style={{ fontSize: 20 }}>Informations</FredokaText>
					</View>
					<TouchableOpacity
						style={{ marginBottom: 10 }}
						onPress={() => setIsOpen(true)}
					>
						<CardWithIcon
							icon='📢'
							sublabel='Nom du groupe'
							label={currentGroup?.name || ''}
						/>
					</TouchableOpacity>
					<BottomSheetModal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
						<Controller
							control={control}
							rules={{
								required: true,
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input
									style={{ marginBottom: 20 }}
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									label='Nom du groupe'
									placeholder={currentGroup?.name}
									autoFocus
									enablesReturnKeyAutomatically
								/>
							)}
							name='name'
						/>
						<Button onPress={handleSubmit(onSubmit)}>
							{isLoading ? 'Chargement' : 'Enregistrer'}
						</Button>
					</BottomSheetModal>

					<TouchableOpacity>
						<CardWithIcon
							icon={currentGroup?.type.emoji || ''}
							sublabel='Type du groupe'
							label={currentGroup?.type.name || ''}
						/>
					</TouchableOpacity>
				</View>

				<View style={{ paddingHorizontal: 20 }}>
					<View style={{ marginBottom: 10 }}>
						<FredokaText style={{ fontSize: 20 }}>Membres</FredokaText>
					</View>

					{currentGroup?.members?.map((membre) => (
						<View
							key={membre.id}
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								marginBottom: 15,
							}}
						>
							<Image
								source={{ uri: 'https://i.pravatar.cc/50' }}
								height={50}
								width={50}
								style={{
									height: 50,
									width: 50,
									borderRadius: 25,
								}}
							/>

							<View style={{ marginLeft: 15, flex: 1 }}>
								<FredokaText style={{ fontSize: 16 }}>
									{membre?.username}
								</FredokaText>
								<Text style={{ fontSize: 14 }}>Administrateur</Text>
							</View>
							<CircleButton backgroundColor={colors.card}>
								<MoreHoriz
									height={20}
									width={20}
									color={colors.text}
									fill={colors.text}
								/>
							</CircleButton>
						</View>
					))}
				</View>

				<View style={{ paddingTop: 15, paddingHorizontal: 20 }}>
					<FredokaText style={{ fontSize: 20 }}>Zone de danger</FredokaText>
					<TouchableOpacity style={[layout.rowSBCenter, { marginTop: 10 }]}>
						<Text weight='bold' style={{ color: 'red' }}>
							Supprimer le groupe
						</Text>
						<CircleButton backgroundColor={colors.card}>
							<Trash height={15} width={15} color={'red'} />
						</CircleButton>
					</TouchableOpacity>
				</View>
			</Layout>
			<AnimatedHeaderLayout
				title='Mon groupe'
				scrollPositionValue={scrollPositionValue}
			/>
		</>
	)
}

export default GroupParamsScreen
