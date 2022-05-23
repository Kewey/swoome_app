import {
	Image,
	Pressable,
	ScrollView,
	TouchableOpacity,
	View,
} from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { getCurrentGroup } from '@redux/group.reducer'
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

const GroupParamsScreen = () => {
	const group = useSelector(getCurrentGroup)
	const { colors } = useTheme()
	return (
		<AnimatedHeaderLayout title='Mon groupe'>
			<View style={{ paddingTop: 25, paddingHorizontal: 20 }}>
				<View
					style={{
						backgroundColor: colors.card,
						borderRadius,
						paddingTop: 25,
						paddingBottom: 5,
						paddingHorizontal: 20,
						marginBottom: 25,
					}}
				>
					<Pressable
						onPress={() => {
							try {
								Clipboard.setString(group?.code || '')
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
							{group?.code}
						</FredokaText>
					</Pressable>
					<View
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
					</View>
				</View>

				<View style={{ marginBottom: 10 }}>
					<FredokaText style={{ fontSize: 20 }}>Informations</FredokaText>
				</View>
				<View style={{ marginBottom: 15 }}>
					<FredokaText style={{ fontSize: 14 }}>Nom du groupe</FredokaText>
					<Text>{group?.name}</Text>
				</View>
				<View>
					<FredokaText style={{ fontSize: 14 }}>Type du groupe</FredokaText>
					<Text>{group?.type.name}</Text>
				</View>
			</View>

			<View style={{ paddingHorizontal: 20 }}>
				<View style={{ marginBottom: 10, marginTop: 30 }}>
					<FredokaText style={{ fontSize: 20 }}>Membres</FredokaText>
				</View>

				{group?.members?.map((membre) => (
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
		</AnimatedHeaderLayout>
	)
}

export default GroupParamsScreen
