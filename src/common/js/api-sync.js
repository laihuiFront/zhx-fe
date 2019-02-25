import request from '@/common/js/request'

export function getRepayRecordList(data){
  return request({
    url: '/repayRecord/list',
    method: 'post'
  })
}