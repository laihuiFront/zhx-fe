import request from '@/common/js/request';
export function pageMyCase(data={}) {
  // 催收员提成
  return request({
    method:'post',
    url:'/dataCollection/loadDataOdv',
    data
  })
  //经理提成
  return request({
    method:'post',
    url:'/dataCollection/loadDataManage',
    data
  })

}
