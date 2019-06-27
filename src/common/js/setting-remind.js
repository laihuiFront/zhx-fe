import request from '@/common/js/request'
//列表
export function list(data={}) {
  return request({
    url: '/point/pageList',
    method: 'post',
    data
  })
}

export function roleList(data={}) {
  return request({
    url: '/role/listRole',
    method: 'post',
    data
  })
}

//删除一条
export function deleteOne(data={}) {
  return request({
    url: '/point/delete',
    method: 'post',
    data
  })
}



//保存
export function save(data) {
  return request({
    url: '/point/save ',
    method: 'post',
    data
  })
}

export const getUserTree = function(data){
  return request({
    url: 'user/select/userTreeByRoleId',
    method: 'post',
    data:{"role":data}
  })
}
