import axios from 'axios'
import { API_URL } from '@env'

export const API = axios.create({ baseURL: API_URL })
