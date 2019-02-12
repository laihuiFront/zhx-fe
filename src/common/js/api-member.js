import request from '@/common/js/request'

export function listMember(data){
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

export function changeStatus(data){
  return request({
    url: '/user/update/status',
    method: 'post',
    data
  })
}

export function addMember(data){
  return request({
    url: '/user/insert',
    method: 'post',
    data
  })
}

export function updateMember(data){
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

export function getUserById(id){
  return request({
    url: '/user/select/id',
    method: 'post',
    data: {
      id
    }
  })
}

export function getPositionList(){
  return request({
    url: '/user/select/position',
    method: 'post'
  })

}