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
//地址
export function getAddressDetail(id) {
  return request({
    url: '/dataCase/detail/addressList',
    method: 'post',
    data: {
      id
    }
  })
}
//案人信息
export function getArchiveDetail(id) {
  return request({
    url: '/dataArchive/findAll',
    method: 'post',
    data: {
      id
    }
  })
}
