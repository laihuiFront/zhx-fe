import request from '@/common/js/request'
//列表
export function find() {
  return request({
    url: '/followUp/find',
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