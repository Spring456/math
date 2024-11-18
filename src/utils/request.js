import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

// 创建axios实例
const request = axios.create({
  baseURL: '/api', // API基础路径
  timeout: 15000,  // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers['Authorization'] = `Bearer ${userStore.token}`
    }
    return config
  },
  error => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    const { code, message, data } = response.data

    // 请求成功
    if (code === 0) {
      return data
    }

    // 登录失效
    if (code === 401) {
      const userStore = useUserStore()
      userStore.clearUserState()
      ElMessage.error('登录已过期，请重新登录')
      return Promise.reject(new Error('登录已过期'))
    }

    // 其他错误
    ElMessage.error(message || '请求失败')
    return Promise.reject(new Error(message || '请求失败'))
  },
  error => {
    const message = error.response?.data?.message || '网络错误'
    ElMessage.error(message)
    return Promise.reject(error)
  }
)

export default request 