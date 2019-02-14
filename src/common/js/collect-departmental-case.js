import request from '@/common/js/request';

export function role(data={}) {
  return request({
    url:'/user/select/role',
    method: 'post',
    data
  })
}
