import request from '@/common/js/request'
import download from '@/common/js/download'
export const dataList = function(form,sort,orderBy,pageSize,pageNum) {
return request({
    url: '/dataCollect/pageDataCollect',
    method: 'post',
    data: {
         areas: form. areas,
       depts:  form.depts,
       batchNo: form.batchNo ,
       clients:  form.clients ,
       odvs:  form.odvs ,
       caseStatuss:  form.caseStatuss ,
       measures:  form.measures ,
       results:  form.results,
       identNo:  form.identNo ,
       cardNo:  form.cardNo ,
       collectInfo:  form.collectInfo ,
       colors:  form.colors ,
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
         areas: form. areas,
       depts:  form.depts,
       batchNo: form.batchNo ,
       clients:  form.clients ,
       odvs:  form.odvs ,
       caseStatuss:  form.caseStatuss ,
       measures:  form.measures ,
       results:  form.results,
       identNo:  form.identNo ,
       cardNo:  form.cardNo ,
       collectInfo:  form.collectInfo ,
       colors:  form.colors ,
       seqno:  form.seqno ,
       bailStartDate:  form.bailTime==null?"":form.bailTime[0] ,
       bailEndDate:  form.bailTime==null?"":form.bailTime[1] ,
       expectStartTime:  form.expectTime==null?"":form.expectTime[0] ,
       expectEndTime:   form.expectTime==null?"":form.expectTime[1],
       collectStartTime:  form.collectTime==null?"":form.collectTime[0] ,
       collectEndTime:  form.collectTime==null?"":form.collectTime[1] ,
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
export const selectDataExport = function(ids,exportConf) {
return download({
    url: '/dataCollect/selectDataCollectExport',
    method: 'post',
    data:{
      ids:ids,
      exportConf:exportConf
    }
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

export const totalDataExport = function(exportConf,areas,depts,batchNo,clients,odvs,caseStatuss,measures,results,identNo,cardNo,collectInfo,colors,seqno,bailStartDate,bailEndDate,expectStartTime,expectEndTime,collectStartTime,collectEndTime,orderBy,sort,pageSize,pageNum) {
return download({
    url: 'dataCollect/totalDataCollectExport',
    method: 'post',
    data: {
      exportConf:exportConf,
       areas:  areas,
       depts:  depts,
       batchNo:  batchNo ,
       clients:  clients ,
      odvs:  odvs ,
       caseStatuss:  caseStatuss ,
       measures:  measures ,
       results:  results,
       identNo:  identNo ,
       cardNo:  cardNo ,
       collectInfo:  collectInfo ,
       colors:  colors ,
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

export const pageDataExport = function(exportConf,area,dept,batchNo,clients,odvs,caseStatus,measure,result,identNo,cardNo,collectInfo,color,seqno,bailStartDate,bailEndDate,expectStartTime,expectEndTime,collectStartTime,collectEndTime,orderBy,sort,pageSize,pageNum) {
return download({
    url: '/dataCollect/pageDataCollectExport',
    data: {
      exportConf:exportConf,
       areas:  area,
       depts:  dept,
       batchNo:  batchNo ,
       clients:  clients ,
       odvs:  odvs,
       caseStatuss:  caseStatus ,
       measures:  measure ,
       results:  result,
       identNo:  identNo ,
       cardNo:  cardNo ,
       collectInfo:  collectInfo ,
       colors:  color ,
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

//保存查询配置
export function saveSelectFilter(data={}) {
  return request({
    method:'post',
    url:'/saveSelectFilter',
    data
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
export const getUserTree = function(){
  return request({
    url: 'user/select/userTree',
    method: 'post'
  })
}
