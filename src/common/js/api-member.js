import request from '@/common/js/request'

export function listMember(data){
  return request({
    url: '/user/select/list',
    method: 'post',
    data
  })
}