import axios from 'axios'

// 建立 axios 實例
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
})

// request 攔截器
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      // console.log(token)
    }
    return config
  },
  (error) => Promise.reject(error),
)

// response 攔截器
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error)
  },
)

export { apiClient }
