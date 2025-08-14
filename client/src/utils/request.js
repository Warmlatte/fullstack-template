import axios from 'axios'

// 建立 axios 實例
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
})

<<<<<<< HEAD
// request 攔截器
=======
// request 攻截器
>>>>>>> 038d29b7c025044669326c8d9d5b262c9d06317e
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

<<<<<<< HEAD
// response 攔截器
=======
// response 攻截器
>>>>>>> 038d29b7c025044669326c8d9d5b262c9d06317e
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error)
  },
)

<<<<<<< HEAD
export { apiClient }
=======
export { apiClient }
>>>>>>> 038d29b7c025044669326c8d9d5b262c9d06317e
