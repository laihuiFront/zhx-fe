import request from '@/common/js/request'
import download from '@/common/js/download'

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

export const PersonList = function() {
return request({
    url: '/user/select/roleList',
    method: 'post',
    data:{role:"催收员"}
  })
}

export const dataList = function(form,pageSize,pageNum) {
return request({
    url: '/statistics/collection/day',
    method: 'post',
    data: {
      odvAttr:form.odv,
       areas:form.areas,
       clients:form.clients,
      dateSearchStart:form.time[0],
      dateSearchEnd:form.time[1],
      pageSize:pageSize, 
       pageNum:pageNum
    }
  })
}

export const selectDataCaseExport = function(form,pageSize,pageNum) {
  return download({
    url: '/statistics/collection/day/export',
    method: 'post',
      data: {
       odvAttr:form.odv,
       areas:form.areas,
       clients:form.clients,
       dateSearchStart:form.time[0],
       dateSearchEnd:form.time[1],
       pageNum:pageNum ? pageNum : 1,
       pageSize:pageSize ? pageSize : 100
    }
  })

}

export const getUserTree = function(){
  return request({
    url: 'user/select/userTree',
    method: 'post'
  })
}

export const getCollectionDayDetails = function(form,odv,time,status,pageSize,pageNum) {
  return request({
      url: '/statistics/collection/day/details',
      method: 'post',
      data: {       
        dateSearchStart:form.time[0],
        dateSearchEnd:form.time[1],
        odv:odv,
        time:time,
        status:status,
        pageSize:pageSize, 
        pageNum:pageNum
      }
    })
  }