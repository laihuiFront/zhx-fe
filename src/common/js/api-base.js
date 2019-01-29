import request from '@/common/js/request'

export function login(loginName, password) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      loginName,
      password
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
