import request from '@/common/js/request'

export function query() {
  return request({
    url: '/forbiddenwords/query',
    method: 'post'
  })
}

export function save(data) {
  return request({
    url: '/forbiddenwords/save ',
    method: 'post',
    data
  })
}
