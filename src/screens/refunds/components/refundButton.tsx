import { View } from 'react-native'
import React, { useState } from 'react'
import { ArrowRight } from 'iconoir-react-native'
import Button from '@ui/Button'
import { Refund } from '@types/Refund'
import { useTheme } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentGroup, setGroup } from '@redux/group.reducer'
import { addExpense, displayPrice } from '@services/expenseService'
import dayjs from 'dayjs'
import { getGroup } from '@services/groupService'
import Avatar from '@ui/Avatar'

const RefundButton = ({ refund }: { refund: Refund }) => {
	const [isLoading, setIsLoading] = useState(false)
	const { colors } = useTheme()
	const currentGroup = useSelector(getCurrentGroup)
	const dispatch = useDispatch()

	const refundToExpense = async ({
		receiver,
		price,
		refunder
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
				<Avatar
					username={refund.refunder.username}
					source={refund.refunder.avatar?.url}
					size={40}
				/>
				<ArrowRight color={colors.text} height={25} width={50} />
				<Avatar
					username={refund.receiver.username}
					source={refund.refunder.avatar?.url}
					size={40}
				/>
			</View>

			<Button onPress={() => refundToExpense(refund)} disabled={isLoading}>
				{isLoading ? 'Ajout' : `${displayPrice(refund.price)} €`}
			</Button>
		</View>
	)
}

export default RefundButton
