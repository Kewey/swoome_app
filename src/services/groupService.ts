import { API } from '@services/apiService'
import { Group } from '@types/Group'

export async function createGroup(name: string): Promise<Group> {
	const { data: group } = await API.post(`/groups`, {
		name,
		// type,
	})
	return group
}
