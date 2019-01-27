import request from '@/common/js/request'
export const dataList = function(name,identNo,mobile,address,startTime,endTime,pageSize,pageNum) {
return request({
    url: 'dataArchive/pageDataArchive',
    method: 'post',
    data: {
       name:name ? name : "",
       identNo:identNo ? identNo : "",
       mobile:mobile ? mobile : "",
       address:address ? address : "",
       startTime:startTime ? startTime : "",
       endTime:endTime ? endTime : "",
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