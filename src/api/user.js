import request from '@/utils/request'

export const userApi = {
  login(data) {
    return request({
      url: '/user/login',
      method: 'post',
      data
    })
  },

  register(data) {
    return request({
      url: '/user/register',
      method: 'post',
      data
    })
  },

  getUserInfo() {
    return request({
      url: '/user/info',
      method: 'get'
    })
  },

  updateUserInfo(data) {
    return request({
      url: '/user/info',
      method: 'put',
      data
    })
  },

  logout() {
    return request({
      url: '/user/logout',
      method: 'post'
    })
  }
} 