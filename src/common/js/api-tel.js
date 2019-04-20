import request from '@/common/js/request'

export function findOne(){
  return request({
    url: '/telIp/findOne',
    method: 'post'
  })
}

export function update(data){
  return request({
    url: '/telIp/update',
    method: 'post',
    data
  })
}
