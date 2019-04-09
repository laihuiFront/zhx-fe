import request from '@/common/js/request'
import download from '@/common/js/download'
export const dataList = function(area,batchNos,clients,caseType,startTime,endTime,orderBy,sort,pageSize,pageNum) {
return request({
    url: '/dataBatch/pageDataCase',
    method: 'post',
    data: {
       area:area ? area : "",
       batchNos:batchNos,
       clients:clients,
       caseType:caseType ? caseType : "",
       startTime:startTime ? startTime : "",
       endTime:endTime ? endTime : "",
       orderBy:orderBy?orderBy:"id",
       sort:sort?sort:"desc",
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

export const remoweData = function(id) {
return request({
    url: '/dataBatch/delete',
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
export const downLoadZip = function() {
  return download({
    url: 'fileManage/download',
    method: 'post',
    data:{

    }
  })
}
export const downCaseModule = function(batchNo,exportConf) {
  return download({
    url: '/dataCase/selectDataCaseExportByBatch',
    method: 'post',
    data:{
      batchNo,
      exportConf
    }
  })
}

export const areaList = function() {
return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"催收区域"}
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
