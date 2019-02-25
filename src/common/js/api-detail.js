import request from '@/common/js/request'

export function getCaseDetail(id) {
  return request({
    url: '/dataCase/detail',
    method: 'post',
    data: {
      id
    }
  })
}