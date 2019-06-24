import request from '@/common/js/request'
import download from '@/common/js/download'
export const dataList = function(area,batchNos,clients,batchStatus,caseType,startTime,endTime,orderBy,sort,pageSize,pageNum) {
return request({
    url: '/dataBatch/pageDataCase',
    method: 'post',
    data: {
    	batchStatuss: batchStatus,
       areas:area ? area : "",
       batchNos:batchNos,
       clients:clients,
       caseTypes:caseType ? caseType : "",
       startTime:startTime ? startTime : "",
       endTime:endTime ? endTime : "",
       orderBy:orderBy?orderBy:"id",
       sort:sort?sort:"desc",
       pageNum:pageNum ? pageNum : 1,
       pageSize:pageSize ? pageSize : 100
       
    }
  })
}
export const CasedataList = function(batchNos,orderBy,sort) {
  return request({
    url: '/dataCase/pageCaseList',
    method: 'post',
    data: {
      batchNos:batchNos,  //批次编号
      orderBy:orderBy,
      sort:sort,
//   
    }
  })
}
export const totalDataBatchExport = function(exportConf,area,batchNos,clients,batchStatus,caseType,startTime,endTime,pageSize,pageNum) {
return download({
    url: '/dataBatch/totalDataBatchExport',
    method: 'post',
    data: {
      exportConf:exportConf,
    	batchStatuss: batchStatus,
       areas:area ? area : "",
       batchNos:batchNos,
       clients:clients,
       caseTypes:caseType ? caseType : "",
       startTime:startTime ? startTime : "",
       endTime:endTime ? endTime : "",
       pageNum:pageNum ? pageNum : 1,
       pageSize:pageSize ? pageSize : 100
       
    }
  })
}
export const pageDataBatchExport = function(exportConf,area,batchNos,clients,batchStatus,caseType,startTime,endTime,orderBy,sort,pageSize,pageNum) {
return download({
    url: '/dataBatch/pageDataBatchExport',
    method: 'post',
    data: {
      exportConf:exportConf,
    	batchStatuss: batchStatus,
       areas:area ? area : "",
       batchNos:batchNos,
       clients:clients,
       caseTypes:caseType ? caseType : "",
       startTime:startTime ? startTime : "",
       endTime:endTime ? endTime : "",
      orderBy:orderBy,
      sort:sort,
       pageNum:pageNum ? pageNum : 1,
       pageSize:pageSize ? pageSize : 100
       
    }
  })
}

export const addData = function(form) {
return request({
    url: '/dataBatch/save',
    method: 'post',
    data:{
     area:form.areaListId,//催收区域
     batchNo:form.batchNo,//批次编号
     client:form.client,//委托方
     caseType:form.caseType,//案件类型
     caseTime:form.caseTime,//委案日期
     returnTime:form.returnTime,//预计退案日期,
     targetRate:form.targetRate,//目标回款率
     remark:form.remark//备注
    }
  })
}

export const remoweData = function(id) {
return request({
    url: '/dataBatch/delete',
    method: 'post',
    data:id
  })
}

export const selectDataBatchExport = function(id,exporttBatchConf) {
return download({
    url: '/dataBatch/selectDataBatchExport',
    method: 'post',
    data:{
      ids:id,
      exportConf:exporttBatchConf
    }
  })
}
export const selectDataCollectExportByBatch = function(id,exportCollectConf) {
return download({
    url: '/dataBatch/selectDataCollectExportByBatch',
    method: 'post',
    data:{
      batchNos:id,
      exportConf:exportCollectConf
    }
  })
}

 export const returnCase = function(id) {
return request({
    url: '/dataBatch/returnCase',
    method: 'post',
    data:id
  })
}
  export const backCase = function(id) {
return request({
    url: '/dataBatch/recoverCase',
    method: 'post',
    data:id
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

export  const batchList = function(){
  return request({
    url: '/dataBatch/selectBatchNo',
    method: 'post',
    data:{}
  })
}


export const areaList = function() {
return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"催收区域"}
  })
}

export const update = function(form) {
return request({
    url: '/dataBatch/update',
    method: 'post',
    data:{
   id:form.id,
   area:form.area,//催收区域
   batchNo:form.batchNo,//批次编号
   client:form.client,//委托方
   caseType:form.caseType,//案件类型
   caseTime:form.caseTime,//委案日期
   returnTime:form.returnTime,//预计退案日期,
   targetRate:form.targetRate,//目标回款率
   remark:form.remark//备注
    }
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
