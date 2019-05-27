import request from '@/common/js/request';


export function loadDataOdv(data={}) {
  // 催收员提成
  return request({
    method:'post',
    url:'/dataCollection/loadDataOdv',
    data
  })
}


export function manageList(data={}) {
  // 经理提成
  return request({
    method:'post',
    url:'/dataCollection/loadDataManage',
    data
  })
}

export function showOdv(data={}) {
  // 催收员提成
  return request({
    method:'post',
    url:'/dataCollection/showOdv',
    data
  })
}
