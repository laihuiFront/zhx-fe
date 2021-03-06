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

export function sendTel(context,address) {
  return request({
    url: '/telIp/send',
    method: 'post',
    data: {
      context:context,
      address:address
    }
  })
}
export function sendTelBatch(context,address) {
  return request({
    url: '/telIp/sendBatch',
    method: 'post',
    data: {
      context:context,
      address:address
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

export function saveCollectInfo(id,collectInfo) {
  return request({
    url: '/dataCase/updateCollectInfo',
    method: 'post',
    data: {
      "id":id,
      "collectInfo":collectInfo
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
export function getCollectDetail(caseId,batchNo,identNo,cardNo,detaiType) {
  return request({
    url: '/dataCollect/detailCollect',
    method: 'post',
    data: {
      caseId,
      batchNo,
      identNo,
      cardNo,
      detaiType
    }
  })
}

export function getCollectDetail2(caseId,batchNo,identNo,cardNo,detaiType) {
  return request({
    url: '/dataCollect/detailCollect2',
    method: 'post',
    data: {
      caseId,
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

export function delDataCollect(id){
  return request({
    url: '/dataCollection/detailDel',
    method: 'post',
    data:{id}
  })
}

export function delOplog(id){
  return request({
    url: '/dataLog/delete',
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
export function getSynergyDetail(id,applyStatus,finishStatus) {
  return request({
    url: '/synergistic/list',
    method: 'post',
    data: {
      pageSize: 10000,
      pageNum: 1,
      applyStatus:applyStatus,
      finishStatus:finishStatus,
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

export function addWarning(data){
  return request({
    url: '/dataCase/addWarning',
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

export function getReduceApplyList(caseId){
  return request({
    url: '/reduce/apply/page',
    method: 'post',
    data:{caseId}
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

export const getSynergyTypeList = function() {
  return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"协催类型"}
  })
}

export const getSynergyContextList = function() {
  return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"申请协催内容"}
  })
}

export const getRepayRemark = function() {
  return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"还款备注"}
  })
}

export const getRepayType = function() {
  return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"还款方式"}
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

export function saveLegal(data){
  return request({
    url: '/legal/save',
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

export function expDataCollect(id,exportCollectConf){
  return download({
    url: '/dataCollect/detailCollectExport',
    data:{
      caseId:id,
      exportConf:exportCollectConf
    }
  })
}

//保存查询配置
export function selectByModule(data={}) {
  return request({
    method:'post',
    url:'/selectByModule',
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

export const PersonList = function() {
  return request({
    url: '/user/select/roleList',
    method: 'post',
    data:{role:"催收员"}
  })
}


export function saveApply(data){
  return request({
    url: '/synergistic/saveApply',
    method: 'post',
    data
  })
}


export function saveResult(data){
  return request({
    url: '/synergistic/saveResult',
    method: 'post',
    data
  })
}

export function getCPList(caseId){
  return request({
    url: 'bankReconciliation/listByCaseId',
    method: 'post',
    data:{
      dataCase: {
        id: caseId
      }
    }
  })
}

export function getRepayList() {
  return request({
    url: '/bankReconciliation/listRepayType',
    method: 'post'
  })
}

export function saveBank(data) {
  return request({
    url: 'bankReconciliation/saveBank',
    method: 'post',
    data
  })
}

export function nextCase(data) {
  return request({
    url: 'dataCase/nextCase',
    method: 'post',
    data
  })
}

export function lastCase(data) {
  return request({
    url: 'dataCase/lastCase',
    method: 'post',
    data
  })
}

export function deleteReduceFile(data) {
  return request({
    url: 'reduce/file/delete',
    method: 'post',
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
export const areaStepList = function(name) {
  return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{
      name:name
    }
  })
}
export function updateCase(data) {
  return request({
    url: 'dataCase/updateCase',
    method: 'post',
    data
  })
}
export function selectById(data) {
  return request({
    url: 'dataCase/findById',
    method: 'post',
    data
  })
}
