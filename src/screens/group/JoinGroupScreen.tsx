import React from 'react'
import Button from '@ui/Button'
import { View } from 'react-native'
import { GroupScreens } from '@navigation/Routes'
import { GroupNavigationProp } from '@types/routes'
import FredokaText from '@ui/FredokaText'
import Text from '@ui/Text'
import CircleButton from '@ui/CircleButton'
import { NavArrowLeft } from 'iconoir-react-native'
import { useTheme } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser, setToken, setUser } from '@redux/reducers/user.reducer'

type GroupJoinProps = {
	navigation: GroupNavigationProp<GroupScreens.Join>
}

export default function GroupJoinScreen({ navigation }: GroupJoinProps) {
	const { colors } = useTheme()
	const dispatch = useDispatch()
	const user = useSelector(getCurrentUser)
	return (
		<View
			style={{
				flex: 1,
			}}
		>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					marginBottom: 70,
				}}
			>
				<CircleButton onPress={() => navigation.goBack()}>
					<NavArrowLeft height={25} width={25} color={colors.text} />
				</CircleButton>

				<TouchableOpacity
					onPress={() => navigation.navigate(GroupScreens.Join)}
				>
					<Text weight='bold'>Déjà une maison ?</Text>
				</TouchableOpacity>
			</View>

			<View style={{ flex: 1 }}>
				<FredokaText
					style={{ fontSize: 30, textAlign: 'center', marginBottom: 20 }}
				>
					Ma maison
				</FredokaText>
				<Text
					style={{
						textAlign: 'center',
						opacity: 0.55,
						fontSize: 13,
						marginBottom: 30,
					}}
				>
					Pour commencer à utiliser l’application, tu dois créer ou rejoindre
					une maison.
				</Text>
			</View>

			<Button
				size='large'
				// disabled={isDisabled()}
				onPress={() =>
					dispatch(
						setUser({
							...user,
							groups: [
								{
									name: 'test',
									id: 'dazda654d',
									type: 'coloc',
									shareCode: '1643',
									membres: [user],
								},
							],
						})
					)
				}
			>
				Rejoindre la maison
			</Button>
		</View>
	)
}
