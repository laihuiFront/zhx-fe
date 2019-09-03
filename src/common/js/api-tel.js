import request from '@/common/js/request'

export function queryCallCenters(){
  return request({
    url: '/telIp/queryCallCenters',
    method: 'post'
  })
}

export function addCallCenter(data){
  return request({
    url: '/telIp/addCallCenter',
    method: 'post',
    data
  })
}

export function queryCallCenter(data){
  return request({
    url: '/telIp/queryCallCenter',
    method: 'post',
    data
  })
}

export function updateCallCenter(data){
  return request({
    url: '/telIp/updateCallCenter',
    method: 'post',
    data
  })
}

export function deleteCallCenters(data){
  return request({
    url: '/telIp/deleteCallCenters',
    method: 'post',
    data
  })
}