import request from '@/common/js/request'
export const dataList = function(area,dept,batchNo,client,odv,caseStatus,measure,result,identNo,cardNo,collectInfo,color,seqno,bailStartDate,bailEndDate,expectStartTime,expectEndTime,collectStartTime,collectEndTime,pageSize,pageNum) {
return request({
    url: '/dataCase/pageCaseList',
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
export const search = function(area,batchNo,client,caseDateStart,caseDateEnd,pageSize,pageNum) {
return request({
    url: '/dataCase/pageCaseList',
    method: 'post',
    data: {
       area:  area,
       caseDateStart:caseDateStart,
       caseDateEnd:caseDateEnd,
       batchNo:  batchNo ,
       client:  client ,
       pageNum:pageNum ? pageNum : 1,
       pageSize:pageSize ? pageSize : 10
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
