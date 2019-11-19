import request from '@/common/js/request'
export function saveTableInformation(data) {
    return request({
      url: '/tableColumnsWidthSettings/save',
      method: 'post',
      data
    })
  }
  
  export function findTableInformationMethod(tableid){
    return request({
      url: '/tableColumnsWidthSettings/query',
      method: 'post',
      params:{
        tableid
      }
    })
  }

  export function updateTableStatus(data) {
    return request({
      url: '/updateModule',
      method: 'post',
      data
    })
  }