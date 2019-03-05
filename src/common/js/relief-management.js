import request from '@/common/js/request'
export const areaList = function() {
return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"催收区域"}
  })
}

export const clientList = function() {
return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"委托方"}
  })
}
export const deleteStatusList = function() {
  return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"减免状态"}
  })
}

export const PersonList = function() {
  return request({
    url: '/user/select/roleList',
    method: 'post',
    data:{role:"催收员 "}
  })
}

export const accountAgeList = function() {
  return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"逾期账龄"}
  })
}

export const collectStatusList = function() {
  return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"催收状态"}
  })
}
export const dataList = function(form,pageSize,pageNum,applyStatus) {
  return request({
    url: '/reduce/page/all',
    method: 'post',
    data: {
    	applyStatus:applyStatus,
      area:form.area,
      client:form.client,
      batchNo:form.batchNo,
      targetName:form.targetName,
      accountAge:form.accountAge,
      completeTimeStart:form.time3[0],
      completeTimeEnd:form.time3[1],
      seqno:form.seqno,
      odv:form.odv,
      reduceReferTimeStart:form.time1[0],
      reduceReferTimeEnd:form.time1[1],
      reduceStatus:form.reduceStatus,
      reduceValidTimeStart:form.time2[0],
      reduceValidTimeEnd:form.time2[1],
      pageNum:pageNum ? pageNum : 1,
      pageSize:pageSize ? pageSize : 100
    }
  })
}

export const remoweData = function(id) {
return request({
    url: '/reduce/update/status',
    method: 'post',
    data:{
    	ids:id,
    	reduceFlag:1
    }
  })
}
export const remoweDataList = function(id) {
return request({
    url: '/reduce/update/status',
    method: 'post',
    data:{
    	ids:id,
    	reduceFlag:2
    }
  })
}

export const addDataform = function(form) {
return request({
    url: '/reduce/add',
    method: 'post',
    data:{
    	id:form.id,
   seqno:form.seqno,//催收区域
   approveRepayAmt:form.approveRepayAmt,//批次编号
   reduceValidTime:form.reduceValidTime,//委托方
   reduceResult:form.reduceResult,//案件类型
    }
  })
}
