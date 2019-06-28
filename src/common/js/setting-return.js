import request from '@/common/js/request'
//列表
export function list(data={}) {
  return request({
    url: '/case/time/all',
    method: 'post',
    data
  })
}



//保存
export function update(data) {
  return request({
    url: '/case/time/update',
    method: 'post',
    data
  })
}

