import axios from 'axios'
import i18n from '../i18n/i18n'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api'

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 15000,
})

apiClient.interceptors.request.use((config) => {
  const lang = i18n.language?.startsWith('en') ? 'en' : 'uk'
  config.headers['Accept-Language'] = lang
  return config
})

