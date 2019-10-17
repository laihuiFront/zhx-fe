import request from '@/common/js/request'
//列表
export function list() {
  return request({
    url: '/followUp/list',
    method: 'post'  
  })
}



//保存
export function update(data) {
  return request({
    url: '/followUp/update',
    method: 'post',
    data
  })
}