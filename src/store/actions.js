import * as types from './mutation-types'
import {localCache,removeCache} from '@/common/js/auth'
import {login, getUserInfo, logout} from '@/common/js/api-base'

export const loginAction = function ({commit}, userInfo) {
  return new Promise((resolve, reject) => {
    login(userInfo.userName, userInfo.password).then(response => {
      commit(types.SET_USER_INFO, response)
      localCache('token', response.token)
      resolve()
    }).catch(error => {
      reject(error)
    })
  })
}

export const getUserInfoAction = function({commit}) {
  return new Promise((resolve, reject) => {
    getUserInfo().then(response => {
      commit(types.SET_USER_INFO, response)
      resolve()
    }).catch(error => {
      reject(error)
    })
  })
}

export const logoutAction = function({commit}) {
  return new Promise((resolve, reject)=>{
    logout().then(response => {
      commit(types.SET_USER_INFO, null)
      removeCache('token')
      resolve()
    }).catch(error => {
      reject(error)
    })
  })
}

export const fedLogOut = function({commit}){
  return new Promise(resolve => {
    commit(types.SET_USER_INFO, null)
    removeCache('token')
    resolve()
  })
}