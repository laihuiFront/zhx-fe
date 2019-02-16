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

export const PersonList = function() {
return request({
    url: '/user/select/role ',
    method: 'post',
    data:{role:"催收员"}
  })
}