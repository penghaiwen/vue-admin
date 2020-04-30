import axios from 'axios'
import {
  Message,
  MessageBox
} from 'element-ui'
import store from '../store'
import {
  getToken
} from '@/utils/auth'
import qs from 'qs'

var baseURL = process.env.BASE_API
var timeout = 5000
if (process.env.NODE_ENV === 'development') {
  timeout = 5000
}

if (process.env.NODE_ENV === 'production') {
  baseURL = '/api'
}

// 创建axios实例
const service = axios.create({
  withCredentials: false, // 请求不带cookie
  baseURL: baseURL, // api 的 base_url
  timeout: timeout // 请求超时时间
})

service.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
// request拦截器
service.interceptors.request.use(
  config => {
    config.withCredentials = false
    if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      if (config.data) config.data = qs.stringify(config.data)
    }
    
    if (store.getters.token && !config.headers['Authorization']) {
      // config.headers['auth_token'] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers['Authorization'] = 'bearer ' + getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
/**
 *  规则： ret < 10000 为系统统一异常， 由前端统一处理， *
   ret > 10000 为业务异常， 前端需要在业务代码中处理
 */
service.interceptors.response.use(
  response => {
    // 替换token的状态
    if (response.status === 202) {
      let newToken = response.headers.replace_token
      setToken(newToken)
      // console.log(newToken);
    }
    if (response.status === 203) {
      // MessageBox.confirm(
      //   '你已被登出，可以取消继续留在该页面，或者重新登录',
      //   '确定登出', {
      //     confirmButtonText: '重新登录',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }
      // ).then(() => {
      //   store.dispatch('LogOut').then(() => {
      //     location.reload() // 为了重新实例化vue-router对象 避免bug
      //   })
      // })
      MessageBox.confirm(
        '你已被登出，可以取消继续留在该页面，或者重新登录',
        '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
          callback: action => {
            store.dispatch('LogOut').then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          }
        }
      )
    }
    const res = response.data
    if (res.code !== 0 & res.code < 10000) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })
      if (res.code === 5008 || res.code === 5012 || res.code === 5014) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
	let originalRequest = error.config;
	if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1 && !originalRequest._retry) {
	  Message({
	    message: '请求超时!',
	    type: 'error',
	    duration: 5 * 1000
	  });
	}
    // 替换token的状态
    if (error.response.status == 504 || error.response.status == 504) {
      Message({
        message: '网络错误-504',
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }

    return Promise.reject(error)
  }
)

export default service
