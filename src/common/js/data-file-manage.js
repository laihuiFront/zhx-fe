import request from '@/common/js/request'
export const dataList = function(name,identNo,mobile,address,startTime,endTime) {
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
       pageNum:1,
       pageSize:2
    }
  })
}

export const addData = function() {
return request({
    url: 'dataArchive/save',
    method: 'post'
  })
}