import request from '@/common/js/request'
const md5 = require('js-md5')

export function login(loginName, password) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      loginName,
      password: md5(password)
    }
  })
}

export function getUserInfo(id) {
  return request({
    url: '/user/userInfo',
    method: 'post'
  })
}

export function logout(){
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function getTreeAllMenusByToken(){
  return request({
    url: '/menu/treeAllMenusWithButtonByToken',
    method: 'post'
  })
}

export function loadByType() {
  return request({
    url: '/sys/dictionary/loadByType',
    method: 'post'
  })
}
