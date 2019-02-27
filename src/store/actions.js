import * as types from './mutation-types'
import {localCache,removeCache} from '@/common/js/auth'
import {login, getUserInfo, logout, getTreeAllMenusByToken} from '@/common/js/api-base'
import request from '@/common/js/request';

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
      commit(types.SET_USER_INFO, {})
      commit(types.SET_MENU, [])
      commit(types.SET_TAB_MENUS,[])
      removeCache('token')
      resolve()
    }).catch(error => {
      reject(error)
    })
  })
}

export const fedLogOut = function({commit}){
  return new Promise(resolve => {
    commit(types.SET_USER_INFO, {})
    commit(types.SET_MENU, [])
    commit(types.SET_TAB_MENUS,[])
    removeCache('token')
    resolve()
  })
}

export const getUserMenu = function({commit}){
  return new Promise((resolve, reject) => {
    getTreeAllMenusByToken().then(response => {
      
      commit(types.SET_MENU, response)
      resolve()
    }).catch(error => {
      reject(error)
    })
  })
}

export const initPageMenu = function({state, commit}, toPath) {
  const allMenu = state.menu
  const toMenu = findMenuInAll(allMenu, toPath)
  if (toMenu) {
    commit(types.SET_CURRENT_MENU, toMenu)
    commit(types.PUSH_TAB_MENUS, allMenu[0])
    commit(types.PUSH_TAB_MENUS, toMenu)
  }
}

export function resetPassword(form) {
  return request({
    method:'post',
    url:'/user/passwordReset',
    data:{
    	oldPassword:form.oldPassword,
    	password:form.pass
    }
  })
}

// 根据路由查找对应的菜单对象
function findMenuInAll(arr, str) {
  for(let i = 0; i < arr.length; i++) {
    if (arr[i].leafNode) {
      if ('/zhx' + arr[i].menuUrl === str) {
        return arr[i]
      } else {
        continue
      }
    } else {
      const menu = findMenuInAll(arr[i].children, str)
      if (menu) {
        return menu
      }
    }
  }
}
