import {
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { getCurrentGroup } from '@redux/group.reducer'
import { layout } from '@styles/layout'
import FredokaText from '@ui/FredokaText'
import Text from '@ui/Text'
import CircleButton from '@ui/CircleButton'
import { MoreHoriz, Plus, Trash } from 'iconoir-react-native'
import { useTheme } from '@react-navigation/native'

const GroupParamsScreen = () => {
	const group = useSelector(getCurrentGroup)
	const { colors } = useTheme()
	return (
		<ScrollView contentContainerStyle={layout.container}>
			<View style={{ marginBottom: 10 }}>
				<FredokaText style={{ fontSize: 20 }}>Informations</FredokaText>
			</View>
			<View style={{ marginBottom: 15 }}>
				<FredokaText style={{ fontSize: 14 }}>Nom du groupe</FredokaText>
				<Text>{group?.name}</Text>
			</View>
			<View>
				<FredokaText style={{ fontSize: 14 }}>Type du groupe</FredokaText>
				<Text>{group?.type}</Text>
			</View>

			<View style={{ marginBottom: 10, marginTop: 30 }}>
				<FredokaText style={{ fontSize: 20 }}>Membres</FredokaText>
			</View>

			<View
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
					<FredokaText style={{ fontSize: 16 }}>Marmec</FredokaText>
					<Text style={{ fontSize: 14 }}>Administrateur</Text>
				</View>
				<CircleButton>
					<MoreHoriz
						height={20}
						width={20}
						strokeWidth={3}
						color={colors.text}
						fill={colors.text}
					/>
				</CircleButton>
			</View>

			<View
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
					<FredokaText style={{ fontSize: 16 }}>Marmec</FredokaText>
					<Text style={{ fontSize: 14 }}>Administrateur</Text>
				</View>
				<CircleButton>
					<MoreHoriz
						height={20}
						width={20}
						color={colors.text}
						fill={colors.text}
					/>
				</CircleButton>
			</View>

			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				<CircleButton size={50}>
					<Plus height={30} width={30} strokeWidth={2.5} color={colors.text} />
				</CircleButton>

				<View style={{ marginLeft: 15, flex: 1 }}>
					<FredokaText style={{ fontSize: 16 }}>Intégrer un membre</FredokaText>
				</View>
			</View>

			<View style={{ marginBottom: 15, marginTop: 30 }}>
				<FredokaText style={{ fontSize: 20 }}>Zone de danger</FredokaText>
			</View>

			<TouchableOpacity style={layout.rowSBCenter}>
				<Text weight='bold' style={{ color: 'red' }}>
					Supprimer le groupe
				</Text>
				<CircleButton>
					<Trash height={15} width={15} color={'red'} />
				</CircleButton>
			</TouchableOpacity>
		</ScrollView>
	)
}

export default GroupParamsScreen

const styles = StyleSheet.create({})
