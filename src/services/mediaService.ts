import { Media } from '@types/Media'
import { API } from './apiService'

export async function addMedia(name: string, image: Blob): Promise<Media> {
	const formData = new FormData()
	formData.append(name, image)

	console.log('formData', formData)
	const { data: expense } = await API.post(
		`/media_object`,
		{
			formData,
		},
		{
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		}
	)
	return expense
}
