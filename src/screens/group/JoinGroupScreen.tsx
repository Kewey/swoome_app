import { KeyboardAvoidingView, ScrollView, View } from 'react-native'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Text from '@ui/Text'
import { joinGroup } from '@services/groupService'
import { useDispatch } from 'react-redux'
import { setGroup } from '@redux/group.reducer'
import FredokaText from '@ui/FredokaText'
import { sideMargin } from '@constants/Layout'
import Button from '@ui/Button'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Input from '@ui/Input'
import { Toast } from 'react-native-toast-message/lib/src/Toast'

const JoinGroupScreen = () => {
	const [isLoading, setLoading] = useState(false)
	const dispatch = useDispatch()

	const { bottom } = useSafeAreaInsets()

	const { control, handleSubmit } = useForm<{ code: string }>()

	const onSubmit = async ({ code }: { code: string }) => {
		setLoading(true)
		try {
			const newGroup = await joinGroup(code)

			// @ts-ignore
			if (newGroup?.status === 400) {
				Toast.show({
					type: 'error',
					text1: 'Inconnu au bataillon',
					text2: 'Aucun groupe ne possède ce code.',
				})
			}

			dispatch(setGroup(newGroup))
		} finally {
			setLoading(false)
		}
	}

	return (
		<KeyboardAvoidingView
			style={{
				flex: 1,
			}}
		>
			<ScrollView
				keyboardShouldPersistTaps='handled'
				contentContainerStyle={{ flexGrow: 1 }}
			>
				<View
					style={{
						flex: 1,
						paddingHorizontal: sideMargin,
						marginTop: 40,
					}}
				>
					<FredokaText
						style={{ fontSize: 30, textAlign: 'center', marginBottom: 20 }}
					>
						Rejoins ta team !
					</FredokaText>
					<Text
						style={{
							textAlign: 'center',
							opacity: 0.55,
							fontSize: 13,
							marginBottom: 30,
						}}
					>
						Saisi le code du groupe que tu veux rejoindre. Le code se trouve
						dans les paramètres du groupe !
					</Text>
					<Controller
						control={control}
						rules={{
							required: 'Il nous faut un code !',
							minLength: {
								value: 6,
								message: 'Ton code est trop court',
							},
							maxLength: {
								value: 6,
								message: 'Ton code est trop long',
							},
						}}
						render={({
							field: { onChange, onBlur, value },
							fieldState: { error },
						}) => (
							<Input
								label=''
								style={{
									marginBottom: 10,
								}}
								error={error}
								placeholder='XXXXXX'
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								autoFocus
							/>
						)}
						name='code'
					/>
				</View>
				<View
					style={{
						padding: sideMargin,
						marginBottom: bottom,
					}}
				>
					<Button
						size='large'
						disabled={isLoading}
						onPress={handleSubmit(onSubmit)}
					>
						{isLoading ? 'Chargement' : 'Rejoindre un groupe'}
					</Button>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

export default JoinGroupScreen
