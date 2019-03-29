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
