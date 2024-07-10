import axios from 'axios'

const baseURL: string = import.meta.env.VITE_APP_SUPABASE_URL
const axiosInstance = axios.create({ baseURL })
axiosInstance.defaults.headers.common['Authorization'] = `${localStorage.getItem('access_token')}`
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'something went wrong'),
)

export default axiosInstance
