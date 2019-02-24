import request from '@/common/js/request';



//信函列表
export function pageDataLetter(data={}) {
  return request({
    url: '/letter/pageDataLetter',
    method: 'post',
    data,
  })
}

//信函模板
export function list(data={}) {
  return request({
    url: '/sys/module/list',
    method: 'post',
    data,
  })
}


//同意协催
export function confirmSynergy(data=[]) {
  return request({
    url: '/letter/confirmSynergy',
    method: 'post',
    data,
  })
}

//撤銷信函
export function cancelLetter(data=[]) {
  return request({
    url: '/letter/cancelLetter',
    method: 'post',
    data,
  })
}
//批量确认信函
export function confirmLetter(data=[]) {
  return request({
    url: '/letter/confirmLetter',
    method: 'post',
    data,
  })
}