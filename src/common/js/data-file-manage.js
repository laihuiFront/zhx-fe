import request from '@/common/js/request'
import download from '@/common/js/download'
export const dataList = function(name,identNo,mobile,address,startTime,endTime,orderBy,sort,pageSize,pageNum) {
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
      orderBy:orderBy?orderBy:"id",
      sort:sort?sort:"desc",
       pageNum:pageNum ? pageNum : 1,
       pageSize:pageSize ? pageSize : 100
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
    	addressList:form.addressList,
    	remarkList:form.remarksList
    }
  })
}

export const downModule = function() {
  return download({
    url: 'fileManage/downloadArchive',
    method: 'post',
    data:{

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
