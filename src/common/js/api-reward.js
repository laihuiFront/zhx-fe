import request from '@/common/js/request'

export function clientList(){
  return request({
    url: '/listPencent',
    method: 'post'
  })
}

export function updatePercent(data){
  return request({
    url: '/updatePercent',
    method: 'post',
    data
  })
}


export function updateRemark(data){
  return request({
    url: '/updateRemark',
    method: 'post',
    data:{"remark":data}
  })
}


export function findRemark(){
  return request({
    url: '/findRemark',
    method: 'post'
  })
}


export function clientList2(){
  return request({
    url: '/listStandard',
    method: 'post'
  })
}


export function updateStandard(data){
  return request({
    url: '/updateStandard',
    method: 'post',
    data
  })
}
