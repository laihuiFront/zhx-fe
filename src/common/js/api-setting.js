import request from '@/common/js/request'
export function getConfigList(id = 0) {
  return request({
    url: '/sys/dictionary/select/list',
    method: 'post',
    data: {
      parent:{id}
    }
  })
}

export function insertConfigData(data) {
  return request({
    url: '/sys/dictionary/insert',
    method: 'post',
    data
  })
}

export function deleteConfigData(id){
  return request({
    url: '/sys/dictionary/delete/id',
    method: 'post',
    data: {
      id
    }
  })
}

export function getLogType(){
  return request({
    url: '/operationLog/logType',
    method: 'post'
  })
}

export function getOperationLog(data){
  return request({
    url: '/operationLog/pageLogs',
    method: 'post',
    data
  })
}

export function deleteLogs(ids){
  return request({
    url: '/operationLog/batchDelete',
    method: 'post',
    data: {ids}
  })
}

export function getDepartmentTree(){
  return request({
    url: '/organization/treeOrganization',
    method: 'post',
    data:{}
  })
}

export function saveDepartment(data){
  return request({
    url: '/organization/save',
    method: 'post',
    data
  })
}

export function getRoleList(roleName){
  return request({
    url: '/role/listRole',
    method: 'post',
    data:{
      roleName
    }
  })
}

export function deleteRole(id){
  return request({
    url: '/role/delete',
    method: 'post',
    data:{
      id
    }
  })
}

export function listAuth(id = null){
  return request({
    url: '/role/listAuth',
    method: 'post',
    data:{
      id
    }
  })
}

export function saveRole(data){
  return request({
    url: '/role/save',
    method: 'post',
    data
  })
}
export function saveAuth(data){
  return request({
    url: '/role/auth',
    method: 'post',
    data
  })
}


