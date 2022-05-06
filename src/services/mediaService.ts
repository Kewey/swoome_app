import { Media } from '@types/Media'
import { API } from './apiService'

export async function addMedia(name: string, image: File): Promise<Media> {
	const FormData = global.FormData

	const formData = new FormData()
	formData.append('name', name)
	formData.append('file', image)

	const { data: expense } = await API.post(
		`/media_objects`,
		{ file: formData },
		{
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			responseType: 'json',
			transformRequest: (__, _) => {
				return formData
			},
		}
	)
	return expense
}
