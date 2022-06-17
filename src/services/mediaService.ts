import { Media } from '@types/Media'
import { API, store } from './apiService'
import * as ImagePicker from 'expo-image-picker'
import { User } from '@types/user'
import { editUser } from './userService'
import { getCurrentUser, setUser } from '@redux/user.reducer'


export async function addMedia(result:  ImagePicker.ImagePickerResult): Promise<Media> {
	let formData = new FormData()

	const ext = result.uri.split('.').pop()

	formData.append('file',  {
		uri: result.uri,
		type: `${result.type}/${ext}`,
		name: `avatar.${ext}`
})

	const {data : media}  = await API.post('/media', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})

	return media
}

export const editAvatar = async (result: ImagePicker.ImagePickerResult) => {
	const media = await addMedia(result)

	const newUser = await editUser(getCurrentUser(store.getState())?.id ||'', {avatar: media['@id']})

	console.log(newUser);
	
	setUser(newUser)
}
