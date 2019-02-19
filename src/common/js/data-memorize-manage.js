import request from '@/common/js/request'
export const dataList = function(area,dept,batchNo,client,odv,caseStatus,measure,result,identNo,cardNo,collectInfo,color,seqno,bailStartDate,bailEndDate,expectStartTime,expectEndTime,collectStartTime,collectEndTime,orderBy,sort,pageSize,pageNum) {
return request({
    url: '/dataCollect/pageDataCollect',
    method: 'post',
    data: {
       area:  area,
       dept:  dept,
       batchNo:  batchNo ,
       client:  client ,
       odv:  odv ,
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
      orderBy:orderBy?orderBy:"id",
      sort:sort?sort:"desc",
       pageNum:pageNum ? pageNum : 1,
       pageSize:pageSize ? pageSize : 10
    }
  })
}

export const search = function(area,dept,odv,measure,orderBy,sort,pageSize,pageNum) {
return request({
    url: '/dataCollect/pageDataCollect',
    method: 'post',
    data: {
       area:  area,
       dept:  dept,
       odv:  odv ,
      orderBy:orderBy?orderBy:"id",
      sort:sort?sort:"desc",
       measure:  measure ,
       pageNum:pageNum ? pageNum : 1,
       pageSize:pageSize ? pageSize : 10
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
return request({
    url: '/dataCollect/selectDataCollectExport',
    method: 'post',
    data:id
  })
}

export const remoweData = function(id) {
return request({
    url: '/dataCollect/delete',
    method: 'post',
    data:id
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
    url: '/user/select/role ',
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

export const totalDataExport = function(area,dept,batchNo,client,odv,caseStatus,measure,result,identNo,cardNo,collectInfo,color,seqno,bailStartDate,bailEndDate,expectStartTime,expectEndTime,collectStartTime,collectEndTime,pageSize,pageNum) {
return request({
    url: 'dataCollect/totalDataCollectExport',
    method: 'post',
    data: {
       area:  area,
       dept:  dept,
       batchNo:  batchNo ,
       client:  client ,
       odv:  odv ,
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
       pageNum:pageNum ? pageNum : 1,
       pageSize:pageSize ? pageSize : 10
    }
  })
}

export const pageDataExport = function(area,dept,batchNo,client,odv,caseStatus,measure,result,identNo,cardNo,collectInfo,color,seqno,bailStartDate,bailEndDate,expectStartTime,expectEndTime,collectStartTime,collectEndTime,pageSize,pageNum) {
return request({
    url: '/dataCollect/pageDataCollectExport',
    method: 'post',
    data: {
       area:  area,
       dept:  dept,
       batchNo:  batchNo ,
       client:  client ,
       odv:  odv ,
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
       pageNum:pageNum ? pageNum : 1,
       pageSize:pageSize ? pageSize : 10
    }
  })
}


