import request from '@/common/js/request';

export function role(data={}) {
  return request({
    url:'/user/select/roleList',
    method: 'post',
    data
  })
}
export const getUserTree = function(){
  return request({
    url: 'user/select/userTree',
    method: 'post'
  })
}
