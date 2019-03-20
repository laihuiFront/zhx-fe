import request from '@/common/js/request'
import download from '@/common/js/download'

export const areaList = function() {
return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"催收区域"}
  })
}
export const selectDataCaseExport = function(form,pageSize,pageNum) {
  return download({
    url: '/statistics/collection/day/action/export',
    method: 'post',
      data: {
       odvAttr:form.odv,
       area:form.area,
       client:form.client,
       dateSearchStart:form.time[0],
       dateSearchEnd:form.time[1],
       pageNum:pageNum ? pageNum : 1,
       pageSize:pageSize ? pageSize : 100
    }
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
    url: '/statistics/collection/day/action',
    method: 'post',
    data: {
       odvAttr:form.odv,
       area:form.area,
       client:form.client,
       dateSearchStart:form.time[0],
       dateSearchEnd:form.time[1],
       pageNum:pageNum ? pageNum : 1,
       pageSize:pageSize ? pageSize : 100
    }
  })
}

export const messageList = function(row,form,pageSize,pageNum) {
return request({
    url: '/statistics/collection/tel/info',
    method: 'post',
    data: {
      odv:row.row.odv,
      collectionResult:row.column.label,
      dateStart:form.time[0],
      dateEnd:form.time[1],
      pageNum:pageNum ? pageNum : 1,
      pageSize:pageSize ? pageSize : 10
    }
  })
}
