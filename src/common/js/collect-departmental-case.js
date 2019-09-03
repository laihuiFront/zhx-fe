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
    url: 'user/select/userDeptTree',
    method: 'post'
  })
}

export const queryDept = function(data){
  return request({
    url: '/select/queryDeptCase',
    method: 'post',
    data
  })
}

export const queryOdv = function(data){
  return request({
    url: '/select/queryUser',
    method: 'post',
    data
  })
}
