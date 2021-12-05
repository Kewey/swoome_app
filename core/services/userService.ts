import axios from 'axios'
import { API_URL } from '@env'

class UserService {
	constructor() {}

	getUser(id = 'me') {
		axios.get(`${API_URL}/user/${id}`)
	}
}
