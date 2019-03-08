import request from '@/common/js/request'
import download from '@/common/js/download'
export const dataList = function(form,sort,orderBy,pageSize,pageNum) {
return request({
    url: '/dataCollect/pageDataCollect',
    method: 'post',
    data: {
         area: form. area,
       dept:  form.dept,
       batchNo: form.batchNo ,
       clients:  form.clients ,
       odvs:  form.odvs ,
       caseStatus:  form.caseStatus ,
       measure:  form.measure ,
       result:  form.result,
       identNo:  form.identNo ,
       cardNo:  form.cardNo ,
       collectInfo:  form.collectInfo ,
       color:  form.color ,
       seqno:  form.seqno ,
       bailStartDate:  form.bailStartDate ,
       bailEndDate:  form.bailEndDate ,
       expectStartTime:  form.expectStartTime ,
       expectEndTime:  form.expectEndTime,
       collectStartTime:  form.collectStartTime ,
       collectEndTime:  form.collectEndTime ,
      orderBy:orderBy?orderBy:"id",
      sort:sort?sort:"desc",
       pageNum:pageNum ? pageNum : 1,
       pageSize:pageSize ? pageSize : 100
    }
  })
}

export const search = function(form,orderBy,sort,pageSize,pageNum) {
return request({
    url: '/dataCollect/pageDataCollect',
    method: 'post',
    data: {
         area: form. area,
       dept:  form.dept,
       batchNo: form.batchNo ,
       clients:  form.clients ,
       odvs:  form.odvs ,
       caseStatus:  form.caseStatus ,
       measure:  form.measure ,
       result:  form.result,
       identNo:  form.identNo ,
       cardNo:  form.cardNo ,
       collectInfo:  form.collectInfo ,
       color:  form.color ,
       seqno:  form.seqno ,
       bailStartDate:  form.bailStartDate ,
       bailEndDate:  form.bailEndDate ,
       expectStartTime:  form.expectStartTime ,
       expectEndTime:  form.expectEndTime,
       collectStartTime:  form.collectStartTime ,
       collectEndTime:  form.collectEndTime ,
      orderBy:orderBy?orderBy:"id",
      sort:sort?sort:"desc",
       pageNum:pageNum ? pageNum : 1,
       pageSize:pageSize ? pageSize : 100
    }
  })
}

export const addData = function(form) {
return request({
    url: 'dataArchive/save',
    method: 'post',
    data:{
    	name:form.name,
    	identNo:form.identNo,
    	telList:form.telList,
    	addressList:form.addressList
    }
  })
}
export const selectDataExport = function(id) {
return download({
    url: '/dataCollect/selectDataCollectExport',
    method: 'post',
    data:id
  })
}

export const remoweData = function(ids) {
return request({
    url: '/dataCollect/delete',
    method: 'post',
    data:ids
  })
}

export const areaList = function() {
return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"催收区域"}
  })
}

export const sectionList = function() {
return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"催收措施"}
  })
}


export const caseTypeList = function() {
return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"案件类型"}
  })
}

export const clientList = function() {
return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"委托方"}
  })
}

export const EndList = function() {
return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"催收结果"}
  })
}

export const PersonList = function() {
return request({
    url: '/user/select/roleList',
    method: 'post',
    data:{role:"催收员"}
  })
}

export const departmentList = function() {
return request({
    url: '/organization/listOrganization',
    method: 'post',
    data:{}
  })
}

export const totalDataExport = function(area,dept,batchNo,clients,odvs,caseStatus,measure,result,identNo,cardNo,collectInfo,color,seqno,bailStartDate,bailEndDate,expectStartTime,expectEndTime,collectStartTime,collectEndTime,orderBy,sort,pageSize,pageNum) {
return download({
    url: 'dataCollect/totalDataCollectExport',
    method: 'post',
    data: {
       area:  area,
       dept:  dept,
       batchNo:  batchNo ,
       client:  clients ,
       odv:  odvs ,
       caseStatus:  caseStatus ,
       measure:  measure ,
       result:  result,
       identNo:  identNo ,
       cardNo:  cardNo ,
       collectInfo:  collectInfo ,
       color:  color ,
       seqno:  seqno ,
       bailStartDate:  bailStartDate ,
       bailEndDate:  bailEndDate ,
       expectStartTime:  expectStartTime ,
       expectEndTime:  expectEndTime,
       collectStartTime:  collectStartTime ,
       collectEndTime:  collectEndTime ,
      orderBy:orderBy,
      sort:sort,
       pageNum:pageNum ? pageNum : 1,
       pageSize:pageSize ? pageSize : 100
    }
  })
}

export const pageDataExport = function(area,dept,batchNo,clients,odvs,caseStatus,measure,result,identNo,cardNo,collectInfo,color,seqno,bailStartDate,bailEndDate,expectStartTime,expectEndTime,collectStartTime,collectEndTime,orderBy,sort,pageSize,pageNum) {
return download({
    url: '/dataCollect/pageDataCollectExport',
    data: {
       area:  area,
       dept:  dept,
       batchNo:  batchNo ,
       clients:  clients ,
       odvs:  odvs,
       caseStatus:  caseStatus ,
       measure:  measure ,
       result:  result,
       identNo:  identNo ,
       cardNo:  cardNo ,
       collectInfo:  collectInfo ,
       color:  color ,
       seqno:  seqno ,
       bailStartDate:  bailStartDate ,
       bailEndDate:  bailEndDate ,
       expectStartTime:  expectStartTime ,
       expectEndTime:  expectEndTime,
       collectStartTime:  collectStartTime ,
       collectEndTime:  collectEndTime ,
      orderBy,
      sort,
       pageNum:pageNum ? pageNum : 1,
       pageSize:pageSize ? pageSize : 100
    }
  })
}
export function deleteDataCollectRecord(data){
  return request({
    url: '/dataCollect/delete',
    data,
    method: 'post'
  })
}

export function updateDataCollectRecord(data){
  return request({
    url: '/dataCollection/update',
    data,
    method: 'post'
  })
}

