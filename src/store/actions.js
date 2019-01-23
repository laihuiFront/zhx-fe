import * as types from './mutation-types'
import {localCache,removeCache} from '@/common/js/auth'
import {login, getUserInfo, logout, getTreeAllMenusByToken} from '@/common/js/api-base'

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
  let toMenu = null
  for (let i = 0; i < allMenu.length; i++) {
    const one = allMenu[i]
    if (one.leafNode) {
      if ('/zhx' + one.menuUrl === toPath) {
        toMenu = one
        break
      } else {
        continue
      }
    } else {
      const oneChildren = one.children
      let findTwo = false
      for (let j = 0; j < oneChildren.length; j++) {
        const two = oneChildren[j]
        if (two.leafNode) {
          if ('/zhx' + two.menuUrl === toPath) {
            toMenu = two
            findTwo = true
            break
          } else {
            continue
          }
        } else {
          const twoChildren = two.children
          let findThree = false
          for (let k = 0; k < twoChildren.length; k++) {
            const three = twoChildren[k]
            if ('/zhx' + three.menuUrl === toPath) {
              toMenu = three
              findThree = true
              break
            }
          }
          if(findThree){
            findTwo = true
            break
          }
        }
      }
      if (findTwo) {
        break
      }
    }
  }

  if (toMenu) {
    commit(types.SET_CURRENT_MENU, toMenu)
    commit(types.PUSH_TAB_MENUS, toMenu)
  }
}
