import request from '@/common/js/request'
import download from '@/common/js/download'

export function getCaseDetail(id) {
  return request({
    url: '/dataCase/detail',
    method: 'post',
    data: {
      id
    }
  })
}
export function getSameBatchCollect(id) {
  return request({
    url: '/case/batch/idno',
    method: 'post',
    data: {
      "caseId":id
    }
  })
}

export function DeteleData(id) {
  return request({
    url: '/reduce/apply/update/status',
    method: 'post',
    data: {
      "id":id
    }
  })
}
export function getSameBatchCase(id) {
  return request({
    url: '/dataCase/sameBatchCaseList',
    method: 'post',
    data: {
      id
    }
  })
}

export function getLetterList(id) {
  return request({
    url: '/letter/getLetterListByCaseId',
    method: 'post',
    data: {
      "caseId":id
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

//催记
export function getCollectDetail(id,batchNo,identNo,cardNo,detaiType) {
  return request({
    url: '/dataCollect/detailCollect',
    method: 'post',
    data: {
      id,
      batchNo,
      identNo,
      cardNo,
      detaiType
    }
  })
}
//案人信息
export function getArchiveDetail(id) {
  return request({
    url: '/detai/archive/list',
    method: 'post',
    data: {
      "caseId":id
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

export function updateDataComment(data){
  return request({
    url: '/dataCase/updateComment',
    method: 'post',
    data
  })
}

export function delDataComment(id){
  return request({
    url: '/dataCase/delComment',
    method: 'post',
    data:{id}
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

//协催
export function getSynergyDetail(id) {
  return request({
    url: '/synergistic/list',
    method: 'post',
    data: {
      pageSize: 10000,
      pageNum: 1,
      dataCase: {
        id
      }
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

export function dataCollectionSave(data){
  return request({
    url: '/dataCollection/save',
    method: 'post',
    data
  })
}



export function addLetter(data){
  return request({
    url: '/letter/addLetter',
    method: 'post',
    data
  })
}

export function getReduceApplyList(id){
  return request({
    url: '/reduce/apply/page',
    method: 'post',
    data:{id}
  })
}

export function pageDataFile(caseId){
  return request({
    url: 'dataLFile/pageDataFile',
    method: 'post',
    data:{caseId}
  })
}


export function getLegalList(caseId){
  return request({
    url: '/legal/listLegal',
    method: 'post',
    data:{caseId}
  })
}

export function detailTelCurrentCollect(data){
  return request({
    url: 'dataCollect/tel/detailTelCurentCollect',
    method: 'post',
    data
  })
}

export function AddtableList(id,form){
  return request({
    url: '/reduce/apply/add',
    method: 'post',
    data:{
    	id:form.id,
    	caseId:id,
      payer:form.payer,
      relation:form.relation,
      contactWay:form.contactWay,
      sex:form.sex,
      age:form.age,
      visitFlag:form.visitFlag,
      joinFlag:form.joinFlag,
      connectFlag:form.connectFlag,
      enRepayAmt:form.enRepayAmt,
      repayAmt:form.repayAmt,
      repayTime:form.repayTime,
      reduceReason:form.reduceReason,
      reduceData:form.reduceData,
      remark:form.remark,
    }
  })
}

export function saveArchive(data){
  return request({
    url: 'detai/archive/save',
    method: 'post',
    data
  })
}

export function getHistoryAddrList(caseId){
  return request({
    url: 'dataLog/listDataAddressLog',
    method: 'post',
    data:{caseId}
  })
}

export function expDataCollect(data){
  return download({
    url: '/dataCollect/selectDataCollectExport',
    data
  })
}

export function saveDataCollectDetail(data){
  return request({
    url: 'dataCollection/detailSave',
    method: 'post',
    data
  })
}

