import { Media } from '@types/Media'
import { API } from './apiService'

interface FormDataValue {
	uri: string
	name: string
	type: string
}

export async function addMedia(name: string, file: any): Promise<Media> {
	console.log(file)

	try {
		// const res = API.post('/media_upload', formData, {
		// 	transformRequest: (__, _) => formData,
		// 	headers: null,
		// })
		const res = await fetch(API.defaults.baseURL + '/media_upload', {
			// @ts-ignore
			body: file,
			method: 'POST',
		})
		console.log('res', await res.json())
	} catch (error) {
		console.log(error)
	}

	const media = {
		contentUrl: '',
		'@id': '',
		id: '0',
		createdAt: new Date(),
		'@type': '',
	}

	return media
}
