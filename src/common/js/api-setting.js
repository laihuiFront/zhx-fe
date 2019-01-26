import request from '@/common/js/request'
//------------------枚举-------------------------------
export function getConfigList(id = 0) {
  return request({
    url: '/sys/dictionary/select/list',
    method: 'post',
    data: {
      parent:{id}
    }
  })
}

export function insertConfigData(data) {
  return request({
    url: '/sys/dictionary/insert',
    method: 'post',
    data
  })
}

export function deleteConfigData(id){
  return request({
    url: '/sys/dictionary/delete/id',
    method: 'post',
    data: {
      id
    }
  })
}

export function getLogType(){
  return request({
    url: '/operationLog/logType',
    method: 'post'
  })
}

