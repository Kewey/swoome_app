import { API } from '@services/apiService'
import { Expense } from '@types/Expense'
import { Group, GroupType } from '@types/Group'

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

export async function getGroupType(): Promise<{
	groupsType: GroupType[]
	totalItems: number
}> {
	const {
		data: { 'hydra:member': groupsType, 'hydra:totalItems': totalItems },
	} = await API.get(`/group_types`)
	return { groupsType, totalItems }
}

export async function getRefunds(groupId: string): Promise<{
	groupsType: any[]
	totalItems: number
}> {
	const {
		data: { 'hydra:member': groupsType, 'hydra:totalItems': totalItems },
	} = await API.get(`/groups/${groupId}/refunds`)
	return { groupsType, totalItems }
}
