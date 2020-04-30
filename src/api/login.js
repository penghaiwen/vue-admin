import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/oauth/token',
    method: 'POST',
    data: {
      username,
      password,
      grant_type: 'password',
      client_id:'pro',
      scope:'all',
      client_secret:'123'
    },

  })
}

export function getCit() {
  return request({
    url: '/aaa/get',
    method: 'get'
  })
}

export function getInfo() {
  return request({
    url: 'get/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
