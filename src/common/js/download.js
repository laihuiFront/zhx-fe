import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../../store'
import router from '../../router'
import { localCache, removeCache } from '@/common/js/auth'

// 创建axios实例
const service = axios.create({
  // baseURL: 'http://zhx.zaijushou.xyz',
  baseURL: 'http://127.0.0.1:9119',
  //baseURL: 'http://116.62.124.251:9119',
  //baseURL: 'http://192.168.25.208:9119',
  //timeout: 10000, // 请求超时时间,
  responseType :'blob',
  method:'POST'
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
    const responseInfo = JSON.parse(decodeURIComponent(response.headers['response-msg-info']))

    if (responseInfo.code !== '100') {
      Message({
        message: responseInfo.msg,
        type: 'error',
        duration: 5 * 1000
      })

      if(responseInfo.code === '400'){
        store.dispatch('fedLogOut').then(()=>{
          router.replace('/login')
        })
      }
      return Promise.reject('error')
    } else {
        let url = window.URL.createObjectURL(new Blob([res]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url

        link.setAttribute('download', responseInfo.data)

        document.body.appendChild(link)
        link.click()
        return true
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

export default service
