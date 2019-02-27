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


export const PhonetypeList = function() {
  return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"电话类型"}
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

//催記
export function getCollectDetail(id) {
  return request({
    url: '/dataCollect/detailCollect',
    method: 'post',
    data: {
      id
    }
  })
}
//评语
export function getCommentDetail(id) {
  return request({
    url: '/dataCase/listComment',
    method: 'post',
    data: {
      id
    }
  })
}

//利息
export function getInterestDetail(id) {
  return request({
    url: '/dataCase/listInterest',
    method: 'post',
    data: {
      id
    }
  })
}

//评语
export function getSynergyDetail(id) {
  return request({
    url: '/dataCase/listSynergy',
    method: 'post',
    data: {
      id
    }
  })
}

export function updateRemark(data){
  return request({
    url: '/dataCase/updateRemak',
    method: 'post',
    data
  })
}

export function saveCaseTel(data){
  return request({
    url: '/dataCase/saveCaseTel',
    method: 'post',
    data
  })
}
