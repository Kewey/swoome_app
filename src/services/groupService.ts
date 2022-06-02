import { API } from '@services/apiService'
import { Balance } from '@types/Balance'
import { Group, GroupType } from '@types/Group'
import { Refund } from '@types/Refund'

export async function createGroup(
	name: string,
	typeIri: string
): Promise<Group> {
	const { data: group } = await API.post(`/groups`, {
		name,
		type: typeIri,
	})
	return group
}

export async function getGroup(groupId: string): Promise<Group> {
	const { data } = await API.get(`/groups/${groupId}`)
	return data
}

export async function editGroup(
	groupId: string,
	name?: string
): Promise<Group> {
	const { data } = await API.put(`/groups/${groupId}`, {
		name,
	})
	return data
}

export async function getGroupType(): Promise<{
	groupsType: GroupType[]
	totalItems: number
}> {
	const {
		data: { 'hydra:member': groupsType, 'hydra:totalItems': totalItems },
	} = await API.get(`/group_types`)
	return { groupsType, totalItems }
}

export async function getCurrentBalances(groupId: string): Promise<{
	balances: Balance[]
	totalItems: number
}> {
	const {
		data: { 'hydra:member': balances, 'hydra:totalItems': totalItems },
	} = await API.get(`/groups/${groupId}/balances`)
	return { balances, totalItems }
}

export async function getRefunds(groupId: string): Promise<{
	refunds: Refund[]
	totalItems: number
}> {
	const {
		data: { 'hydra:member': refunds, 'hydra:totalItems': totalItems },
	} = await API.get(`/groups/${groupId}/refunds`)
	return { refunds, totalItems }
}
