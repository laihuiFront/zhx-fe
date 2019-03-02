import request from '@/common/js/request'
import download from '@/common/js/download'

export function getEnum(name) {
  return request({
    method:'post',
    url:'/sys/dictionary/select/list/name',
    data:{name}
  })
}

export function getRepayTypeList(){
  return request({
    method: 'post',
    url:'/bankReconciliation/listRepayType'
  })
}

export  function getBatchList(){
  return request({
    url: '/dataBatch/selectBatchNo',
    method: 'post',
    data:{}
  })
}

export function getCollectionUserList() {
  return request({
    url: '/user/select/roleList',
    method: 'post',
    data:{role:"催收员 "}
  })
}

export function getSeqNoList(data) {
  return request({
    url: '/dataCase/pageSeqNos',
    method: 'post',
    data
  })
}

export function getStatusList(){
  return [{
    id: '',
    name: '全部'
  },{
    id: 0,
    name: '未退案'
  },{
    id: 1,
    name: '正常'
  },{
    id: 2,
    name: '暂停'
  },{
    id: 3,
    name: '关档'
  },{
    id: 4,
    name: '退档'
  }]
}

export function getRepayRecordList(data){
  return request({
    url: '/repayRecord/list',
    method: 'post',
    data
  })
}

export function saveRepayRecord(data){
  return request({
    url: '/repayRecord/save',
    method: 'post',
    data
  })
}

export function revokeRepayRecord(ids){
  return request({
    url: '/repayRecord/revoke',
    method: 'post',
    data:{ids}
  })
}

export function expSelectedRepayRecord(ids){
  return download({
    url: '/repayRecord/selectDataExport',
    data: {
      ids
    }
  })
}

export function expAllRepayRecord(data){
  return download({
    url: '/repayRecord/queryDataExport',
    data
  })
}

export function expCurrentRepayRecord(data){
  return download({
    url: '/repayRecord/pageDataExport',
    data
  })
}

export function getBankReconList(data){
  return request({
    url: '/bankReconciliation/list',
    method: 'post',
    data
  })
}

export function cancelBankRecon(ids){
  return request({
    url: '/bankReconciliation/cancel',
    method: 'post',
    data:{ids}
  })
}

export function expSelectedBankReconRecord(ids){
  return download({
    url: '/bankReconciliation/selectDataExport',
    data: {
      ids
    }
  })
}

export function expAllBankReconRecord(data){
  return download({
    url: '/bankReconciliation/queryDataExport',
    data
  })
}

export function expCurrentBankReconRecord(data){
  return download({
    url: '/bankReconciliation/pageDataExport',
    data
  })
}

export function getSynergisticRecordList(data){
  return request({
    url: '/synergistic/list',
    method: 'post',
    data
  })
}

export function expAllSynergisticRecord(data){
  return download({
    url: '/synergistic/queryDataExport',
    data
  })
}

export function expCurrentSynergisticRecord(data){
  return download({
    url: '/synergistic/approve',
    data
  })
}

export function approveSynergisticRecord(data){
  return request({
    url: '/synergistic/list',
    method: 'post',
    data
  })
}

export function finishSynergisticRecord(data){
  return request({
    url: '/synergistic/finish',
    method: 'post',
    data
  })
}

