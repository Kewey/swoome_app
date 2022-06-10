import { Media } from '@types/Media'
import { ImagePickerResult } from 'expo-image-picker'
import { API } from './apiService'

export async function addMedia(result: any): Promise<Media> {
	let localUri = result.uri
	let filename = localUri.split('/').pop()

	console.log(filename)

	let match = /\.(\w+)$/.exec(filename)
	let type = match ? `image/${match[1]}` : `image`

	let formData = new FormData()
	formData.append('photo', { uri: result.uri, name: filename, type })
	try {
		const res = await API.post('/media_upload', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		// const res = await fetch(API.defaults.baseURL + '/media_upload', {
		// 	// @ts-ignore
		// 	body: formData,
		// 	method: 'POST',
		// })
		console.log('res', res)
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
