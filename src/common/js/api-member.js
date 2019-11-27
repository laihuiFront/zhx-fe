import request from '@/common/js/request'
import download from '@/common/js/download'

export function listMember(data) {
  return request({
    url: '/user/select/list',
    method: 'post',
    data
  })
}

export function deleteMember(id) {
  return request({
    url: '/user/delete/id',
    method: 'post',
    data: {
      id
    }
  })
}

export function updateDept(data) {
  return request({
    url: '/user/updateDept',
    method: 'post',
    data
  })
}

export function batchDelete(data) {
  return request({
    url: '/user/batchDelete',
    method: 'post',
    data
  })
}

export function resetMember(id) {
  return request({
    url: '/user/set/password',
    method: 'post',
    data: {
      id
    }
  })
}

export function exportList(data) {
  return download({
    url: '/user/select/exportList',
    method: 'post',
    data
  })
}

export function exportModule() {
  return download({
    url: '/fileManage/downloadUser',
    method: 'post'
  })
}

export function getLoginName(name) {
  return request({
    url: '/user/getLoginName',
    method: 'post',
    data: {
      userName: name
    }
  })
}

export function changeStatus(data) {
  return request({
    url: '/user/update/status',
    method: 'post',
    data
  })
}

export function changeBatchStatus(data) {
  return request({
    url: '/user/update/batchStatus',
    method: 'post',
    data
  })
}

export function addMember(data) {
  return request({
    url: '/user/insert',
    method: 'post',
    data
  })
}

export function updateMember(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

export function getUserById(id) {
  return request({
    url: '/user/select/id',
    method: 'post',
    data: {
      id
    }
  })
}

export function getPositionList() {
  return request({
    url: '/user/select/position',
    method: 'post'
  })
}

export function getUserHomeInfo() {
  return request({
    url: '/user/userHomeInfo',
    method: 'post'
  })
}
