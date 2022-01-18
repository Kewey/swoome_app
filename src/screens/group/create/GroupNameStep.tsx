import Button from '@components/Button'
import { FredokaText } from '@components/StyledText'
import { colorGrey, colorLight } from '@constants/Colors'
import React, { FunctionComponent, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'

type GroupNameProps = {
	goNextStep: () => void
}

type ItemProps = {
	label: string
	icon: string
	value: string
}

const GroupNameStep: FunctionComponent<GroupNameProps> = ({ goNextStep }) => {
	const [selectedItem, setSelectedItem] = useState<ItemProps>()

	return (
		<>
			<View style={{ marginBottom: 20 }}>
				<FredokaText
					style={{ fontSize: 28, textAlign: 'center', marginBottom: 16 }}
				>
					Pour quelle occasion souhaites-tu créer un groupe ?
				</FredokaText>
				<Text style={{ textAlign: 'center' }}>
					Connaitre ton prénom va nous permettre de personnaliser ton
					expérience.
				</Text>
			</View>

			<FlatList
				data={[
					{ label: 'Colocation', icon: '🏠', value: 'colocation' },
					{ label: 'Vie en couple', icon: '❤', value: 'couple_life' },
					{ label: 'Voyage', icon: '✈', value: 'travel' },
					{ label: 'Projet', icon: '💎', value: 'project' },
					{ label: 'Evenement', icon: '🎊', value: 'event' },
				]}
				contentContainerStyle={{ paddingHorizontal: 25, paddingBottom: 100 }}
				keyExtractor={(item: ItemProps) => item.value}
				// extraData={selected}
				renderItem={({ item }) => {
					const isSelected = item.value === selectedItem?.value
					return (
						<Pressable
							onPress={() => {
								setSelectedItem(item)
							}}
						>
							<View
								style={{
									backgroundColor: isSelected ? colorGrey : colorLight,
									flexDirection: 'row',
									paddingVertical: 14,
									paddingHorizontal: 20,
									borderRadius: 10,
									alignItems: 'center',
									marginBottom: 12,
								}}
							>
								<View
									style={{
										height: 62,
										width: 62,
										backgroundColor: '#F0F0F0',
										borderRadius: 31,
										alignItems: 'center',
										justifyContent: 'center',
										marginRight: 20,
									}}
								>
									<Text style={{ fontSize: 20 }}>{item.icon}</Text>
								</View>
								<FredokaText>{item.label}</FredokaText>
							</View>
						</Pressable>
					)
				}}
			/>
			<View
				style={{
					position: 'absolute',
					bottom: 30,
					left: 25,
					right: 25,
				}}
			>
				<Button
					block
					disabled={!!selectedItem}
					onPress={() => {
						goNextStep(selectedItem?.value)
					}}
				>
					Continuer
				</Button>
			</View>
		</>
	)
}

export default GroupNameStep

const styles = StyleSheet.create({})
