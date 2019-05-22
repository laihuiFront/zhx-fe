import request from '@/common/js/request';
export function queryDirectorCommission(data={}) {
  // 总监提成
  return request({
    method:'post',
    url:'/directorCommission/query',
    data
  })

}
