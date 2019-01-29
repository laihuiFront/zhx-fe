import request from '@/common/js/request'
export const dataList = function(form,pageSize,pageNum) {
return request({
    url: '/dataCollect/pageDataCollect',
    method: 'post',
    data: {
       area:from.area,
       dept:from.dept,
       batchNo:from.batchNo ,
       client:from.client ,
       odv:from.odv ,
       caseStatus:from.caseStatus ,
       measure:from.measure ,
       result:from.result,
       identNo:from.identNo ,
       cardNo:from.cardNo ,
       collectInfo:from.collectInfo ,
       color:from.color ,
       seqno:from.seqno ,
       bailStartDate:from.bailStartDate ,
       bailEndDate:from.bailEndDate ,
       expectStartTime:from.expectStartTime ,
       expectEndTime:from.expectEndTime,
       collectStartTime:from.collectStartTime ,
       collectEndTime:from.collectEndTime ,
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
export const remoweData = function(id) {
return request({
    url: 'dataArchive/delete',
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
    data:{name:"部门"}
  })
}

//export const sectionList = function() {
//return request({
//  url: '/sys/dictionary/select/list/name',
//  method: 'post',
//  data:{name:"部门"}
//})
//}