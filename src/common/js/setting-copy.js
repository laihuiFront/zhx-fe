import request from '@/common/js/request'
//列表
export function list(data={}) {
  return request({
    url: '/copy/list',
    method: 'post',
    data
  })
}



//保存
export function update(data) {
  return request({
    url: '/copy/update',
    method: 'post',
    data
  })
}



