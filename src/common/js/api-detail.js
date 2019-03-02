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
export function getCollectDetail(id,type) {
  return request({
    url: '/dataCollect/detailCollect',
    method: 'post',
    data: {
      caseId:id,
      detaiType:type
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

export function getTelList(id){
  return request({
    url: '/dataCase/detail/telList',
    method: 'post',
    data:{id}
  })
}

export function delTel(id){
  return request({
    url: '/dataCase/delCaseTel',
    method: 'post',
    data:{id}
  })
}

export function updateTelStatus(data){
  return request({
    url: '/tel/updateStatus',
    method: 'post',
    data
  })
}

export function synchroSameTel(id){
  return request({
    url: 'dataCase/synchroSameTel',
    method: 'post',
    data:{id}
  })
}

export function addComment(data){
  return request({
    url: '/dataCase/addComment',
    method: 'post',
    data
  })
}

export function listComment(id){
  return request({
    url: '/dataCase/listComment',
    method: 'post',
    data:{id}
  })
}

export function addBatchCaseTel(data){
  return request({
    url: 'dataCase/addBatchCaseTel',
    method: 'post',
    data
  })
}

export function saveCaseAddress(data){
  return request({
    url: '/dataCase/saveCaseAddress',
    method: 'post',
    data
  })
}

export function delAddr(id){
  return request({
    url: '/dataCase/delCaseAddress',
    method: 'post',
    data:{id}
  })
}

export function updateAddrStatus(data){
  return request({
    url: 'address/updateStatus',
    method: 'post',
    data
  })
}

export function pageDataLog(data){
  return request({
    url: 'dataLog/pageDataLog',
    method: 'post',
    data
  })
}

export function updateDataLog(data){
  return request({
    url: '/dataLog/update',
    method: 'post',
    data
  })
}

export function delDataLog(id){
  return request({
    url: '/dataLog/delete',
    method: 'post',
    data:{id}
  })
}

export function sameCaseList(id){
  return request({
    url: '/dataCase/sameCaseList',
    method: 'post',
    data:{id}
  })
}