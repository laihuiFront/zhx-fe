import request from '@/common/js/request'
export const dataList = function(area,batchNo,clients,caseType,startTime,endTime,orderBy,sort,pageSize,pageNum) {
return request({
    url: '/dataBatch/pageDataCase',
    method: 'post',
    data: {
       area:area ? area : "",
       batchNo:batchNo ? batchNo : "",
       clients:clients,
       caseType:caseType ? caseType : "",
       startTime:startTime ? startTime : "",
       endTime:endTime ? endTime : "",
       orderBy:orderBy?orderBy:"id",
       sort:sort?sort:"desc",
       pageNum:pageNum ? pageNum : 1,
       pageSize:pageSize ? pageSize : 10
    }
  })
}

export const addData = function(form) {
return request({
    url: '/dataBatch/save',
    method: 'post',
    data:{
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

export const update = function(form) {
return request({
    url: '/dataBatch/update',
    method: 'post',
    data:{
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

export const areaList = function() {
return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"催收区域"}
  })
}
