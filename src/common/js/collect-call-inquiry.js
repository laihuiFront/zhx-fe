import request from '@/common/js/request';

//来电查询列表
export function pageCaseTel(data = {}) {
  return request({
    url: '/synergy/synergy/pageCaseTel',
    method: 'post',
    data,
  });
}

//添加评语
export function addComment(data=[]) {
  return request({
    url: '/dataCase/addComment',
    method: 'post',
    data
  })
}

//查询枚举类型
export function getEnum(data={}) {
  return request({
    method:'post',
    url:'/sys/dictionary/select/list/name',
    data
  })
}
