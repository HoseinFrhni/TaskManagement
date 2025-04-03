import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
})
// تنظیم هدر Authorization به صورت پیش‌فرض
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

export default {
  getTasks() {
    return apiClient.get('/tasks', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
  },
  createTask(taskData) {
    return apiClient.post('/tasks', taskData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
  },
  getTask(id) {
    return apiClient.get(`/tasks/${id}` )
  },
  updateTask(id, taskData) {
    return apiClient.put(`/tasks/${id}`, taskData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
  },
  deleteTask(id) {
    return apiClient.delete(`/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
  }

}