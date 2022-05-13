import { Media } from '@types/Media'
import { API } from './apiService'

interface FormDataValue {
	uri: string
	name: string
	type: string
}

interface FormData {
	append(
		name: string,
		value: string | Blob | FormDataValue,
		fileName?: string
	): void
	delete(name: string): void
	get(name: string): FormDataEntryValue | null
	getAll(name: string): FormDataEntryValue[]
	has(name: string): boolean
	set(
		name: string,
		value: string | Blob | FormDataValue,
		fileName?: string
	): void
}

declare let FormData: {
	prototype: FormData
	new (form?: HTMLFormElement): FormData
}

interface FormData {
	entries(): IterableIterator<[string, string | File]>
	keys(): IterableIterator<string>
	values(): IterableIterator<string | File>
	[Symbol.iterator](): IterableIterator<string | File>
}

export async function addMedia(
	name: string,
	file: { uri: string; type: string; name: string }
): Promise<Media> {
	const formData = new FormData()

	formData.append('file', file.uri)

	// const { data: expense } = await API.post(`/media_objects`, formData, {
	// 	transformRequest: (__, _) => formData,
	// 	headers: {
	// 		Accept: 'application/json',
	// 		'Content-Type': 'multipart/form-data',
	// 	},
	// })

	try {
		const res = await fetch(API.defaults.baseURL + '/media_objects', {
			// @ts-ignore
			body: formData,
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
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
