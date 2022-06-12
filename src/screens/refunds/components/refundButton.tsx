import { View, Image } from 'react-native'
import React, { useState } from 'react'
import { ArrowRight } from 'iconoir-react-native'
import Button from '@ui/Button'
import { Refund } from '@types/Refund'
import { useTheme } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentGroup, setGroup, setRefunds } from '@redux/group.reducer'
import { addExpense, displayPrice } from '@services/expenseService'
import dayjs from 'dayjs'
import { getGroup } from '@services/groupService'

const RefundButton = ({ refund }: { refund: Refund }) => {
	const [isLoading, setIsLoading] = useState(false)
	const { colors } = useTheme()
	const currentGroup = useSelector(getCurrentGroup)
	const dispatch = useDispatch()

	const refundToExpense = async ({
		receiver,
		price,
		refunder,
		...other
	}: Refund) => {
		if (!currentGroup) return
		setIsLoading(true)

		await addExpense(
			currentGroup!['@id'],
			`Remboursement de ${receiver.username}`,
			price.toString(),
			currentGroup!.expenseTypes.find(
				(expenseType) => expenseType.name === 'Remboursement'
			)?.['@id'] || '',
			[receiver?.['@id']],
			'',
			dayjs().toISOString(),
			refunder['@id']
		)

		const updatedGroup = await getGroup(currentGroup.id)

		setIsLoading(false)
		dispatch(setGroup(updatedGroup))
	}

	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<Image
					source={{ uri: 'https://i.pravatar.cc/50' }}
					height={40}
					width={40}
					style={{ height: 40, width: 40, borderRadius: 20 }}
				/>
				<ArrowRight color={colors.text} height={25} width={50} />
				<Image
					source={{ uri: 'https://i.pravatar.cc/50' }}
					height={40}
					width={40}
					style={{ height: 40, width: 40, borderRadius: 20 }}
				/>
			</View>

			<Button onPress={() => refundToExpense(refund)} disabled={isLoading}>
				{isLoading ? 'Ajout' : `${displayPrice(refund.price)} €`}
			</Button>
		</View>
	)
}

export default RefundButton