import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  login(credentials) {
    return apiClient.post('/login', credentials)
  },
  logout() {
    return apiClient.post('/logout', null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
  },
  register(userData) {
    return apiClient.post('/register', userData)
  },
  getUser() {
    return apiClient.get('/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
  }
}