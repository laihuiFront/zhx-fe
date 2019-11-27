import request from '@/common/js/request'
import download from '@/common/js/download'
export const areaList = function() {
  return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data: { name: '催收区域' }
  })
}

export const clientList = function() {
  return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data: { name: '委托方' }
  })
}
export const deleteStatusList = function() {
  return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data: { name: '减免状态' }
  })
}

export const PersonList = function() {
  return request({
    url: '/user/select/roleList',
    method: 'post',
    data: { role: '催收员 ' }
  })
}

export const accountAgeList = function() {
  return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data: { name: '逾期账龄' }
  })
}

export const collectStatusList = function() {
  return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data: { name: '催收状态' }
  })
}
export const dataList = function(form, applyStatus, sort, orderBy, pageNum, pageSize) {
  return request({
    url: '/reduce/page/all',
    method: 'post',
    data: {
      orderBy: orderBy || 'id',
      sort: sort || 'desc',
      applyStatus: applyStatus,
      areas: form.areas,
      clients: form.clients,
      batchNo: form.batchNo,
      targetName: form.targetName,
      accountAges: form.accountAges,
      collectStatuss: form.collectStatuss,
      completeTimeStart: form.time3[0],
      completeTimeEnd: form.time3[1],
      seqno: form.seqno,
      odv: form.odv,
      reduceReferTimeStart: form.time1[0],
      reduceReferTimeEnd: form.time1[1],
      reduceStatuss: form.reduceStatuss,
      reduceValidTimeStart: form.time2[0],
      reduceValidTimeEnd: form.time2[1],
      pageNum: pageNum || 1,
      pageSize: pageSize || 100
    }
  })
}
// export const totalDataBatchExport = function(area,batchNos,clients,batchStatus,caseType,startTime,endTime,pageSize,pageNum) {
// return download({
//  url: '/dataBatch/totalDataBatchExport',
//  method: 'post',
//  data: {
//  	batchStatus: batchStatus ? batchStatus :"",
//     area:area ? area : "",
//     batchNos:batchNos,
//     clients:clients,
//     caseType:caseType ? caseType : "",
//     startTime:startTime ? startTime : "",
//     endTime:endTime ? endTime : "",
//     pageNum:pageNum ? pageNum : 1,
//     pageSize:pageSize ? pageSize : 100
//
//  }
// })
// }
export const pageDataBatchExport = function(form, exportConf, applyStatus, sType, sort, orderBy, pageNum, pageSize) {
  return download({
    url: '/reduce/dataExport',
    method: 'post',
    data: {
      sType: sType,
      applyStatus: applyStatus,
      areas: form.areas,
      clients: form.clients,
      batchNo: form.batchNo,
      targetName: form.targetName,
      accountAges: form.accountAges,
      completeTimeStart: form.time3[0],
      completeTimeEnd: form.time3[1],
      seqno: form.seqno,
      odv: form.odv,
      reduceReferTimeStart: form.time1[0],
      reduceReferTimeEnd: form.time1[1],
      reduceStatuss: form.reduceStatuss,
      collectStatuss: form.collectStatuss,
      reduceValidTimeStart: form.time2[0],
      reduceValidTimeEnd: form.time2[1],
      exportConf: exportConf,
      pageNum: pageNum || 1,
      pageSize: pageSize || 100

    }
  })
}
export const remoweData = function(id) {
  return request({
    url: '/reduce/update/status',
    method: 'post',
    data: {
      ids: id,
      reduceFlag: 1
    }
  })
}
export const remoweDataList = function(id) {
  return request({
    url: '/reduce/update/status',
    method: 'post',
    data: {
      ids: id,
      reduceFlag: 2
    }
  })
}

export const zipDown = function() {
  return download({
    url: '/reduce/download',
    method: 'post'
  })
}

export const downDataList = function(id) {
  return download({
    url: '/reduce/download',
    method: 'post',
    data: {
      ids: id
    }
  })
}

export const downSingleDataList = function(data) {
  return download({
    url: '/reduce/sigle/download',
    method: 'post',
    data
  })
}

export const checkData = function(id) {
  return request({
    url: '/reduce/update/status',
    method: 'post',
    data: {
      ids: id,
      reduceFlag: 3
    }
  })
}
export const sureData = function(id) {
  return request({
    url: '/reduce/update/status',
    method: 'post',
    data: {
      ids: id,
      reduceFlag: 4
    }
  })
}

export const addDataform = function(form) {
  return request({
    url: '/reduce/add',
    method: 'post',
    data: {
      id: form.id,
      seqno: form.seqno, // 催收区域
      approveRepayAmt: form.approveRepayAmt, // 批次编号
      reduceValidTime: form.reduceValidTime, // 委托方
      reduceResult: form.reduceResult // 案件类型
    }
  })
}

export function getSeqNoList(data) {
  return request({
    url: '/dataCase/pageSeqNos',
    method: 'post',
    data
  })
}

// 保存查询配置
export function saveSelectFilter(data = {}) {
  return request({
    method: 'post',
    url: '/saveSelectFilter',
    data
  })
}

// 保存查询配置
export function selectByModule(data = {}) {
  return request({
    method: 'post',
    url: '/selectByModule',
    data
  })
}

export function listReduceFile(data) {
  return request({
    url: 'reduce/file/list',
    method: 'post',
    data
  })
}
