import { defineStore } from 'pinia'
import { userApi } from '@/api/user'
import { ElMessage } from 'element-plus'

// 添加默认用户数据
const defaultUser = {
  username: 'admin',
  password: '123456',
  avatar: 'https://picsum.photos/200',
  email: 'admin@example.com',
  userType: 'teacher',
  bio: '系统管理员'
}

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
    isLoggedIn: !!localStorage.getItem('token')
  }),

  getters: {
    getUserInfo: state => state.userInfo,
    getToken: state => state.token,
    isTeacher: state => state.userInfo?.userType === 'teacher',
    isStudent: state => state.userInfo?.userType === 'student',
    isParent: state => state.userInfo?.userType === 'parent'
  },

  actions: {
    // 登录
    async login(credentials) {
      try {
        // 检查是否是默认用户
        if (credentials.username === defaultUser.username && 
            credentials.password === defaultUser.password) {
          // 生成模拟token
          const token = 'mock_token_' + Date.now()
          this.setToken(token)
          this.setUserInfo(defaultUser)
          ElMessage.success('登录成功')
          return true
        }
        // 如果不是默认用户，返回失败
        ElMessage.error('用户名或密码错误')
        return false
      } catch (error) {
        this.clearUserState()
        return false
      }
    },

    // 注册
    async register(userData) {
      try {
        await userApi.register(userData)
        ElMessage.success('注册成功，请登录')
        return true
      } catch (error) {
        return false
      }
    },

    // 获取用户信息
    async fetchUserInfo() {
      try {
        const data = await userApi.getUserInfo()
        this.setUserInfo(data)
        return true
      } catch (error) {
        this.clearUserState()
        return false
      }
    },

    // 设置用户信息
    setUserInfo(userInfo) {
      this.userInfo = userInfo
      this.isLoggedIn = true
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    },

    // 设置token
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },

    // 退出登录
    async logout() {
      try {
        await userApi.logout()
        this.clearUserState()
        ElMessage.success('已退出登录')
        return true
      } catch (error) {
        return false
      }
    },

    // 清除用户状态
    clearUserState() {
      this.token = ''
      this.userInfo = null
      this.isLoggedIn = false
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
    },

    // 检查登录状态
    async checkAuth() {
      if (!this.token) return false
      try {
        await this.fetchUserInfo()
        return true
      } catch (error) {
        this.clearUserState()
        return false
      }
    }
  }
}) 