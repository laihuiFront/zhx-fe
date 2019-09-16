import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../../store'
import router from '../../router'
import { localCache, removeCache } from '@/common/js/auth'
//export const baseURL = 'http://127.0.0.1:9119';
//export const baseURL='http://116.62.124.251:9119';
//export const baseURL='http://192.168.25.208:9119';
//export const baseURL='http://113.57.119.214:9997';
export const baseURL='http://172.16.0.25:9119';
//// 创建axios实例
const service = axios.create({
  // baseURL: 'http://zhx.zaijushou.xyz',
  baseURL
  //timeout: 10000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if(!config.url.includes('login')){
    config.headers['Authorization'] = localCache('token')
  }
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== '100') {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })

      if(res.code === '400'){
        store.dispatch('fedLogOut').then(()=>{
          router.replace('/login')
        })
      }
      return Promise.reject('error')
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service;
