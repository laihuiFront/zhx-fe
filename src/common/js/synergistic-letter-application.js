import request from '@/common/js/request';
import download from '@/common/js/download'

//导出信函
export function dcxh(data={}) {
  return download({
    url:'/letter/download',
    method:'post',
    data
  })
}
//导出查询结果  全量导出
export function dccxjg(data={}) {
  return download({
    url:'/letter/totalExport',
    method:'post',
    data
  })
}
//导出查询结果 导出当前页
export function dccxjgThis(data={}) {
  return download({
    url:'/letter/pageExport',
    method:'post',
    data
  })
}

//导出查询结果  全量导出
export function dccxjgInfo(data={}) {
  return download({
    url:'/letter/totalInfoExport',
    method:'post',
    data
  })
}
//导出查询结果 导出当前页
export function dccxjgInfoThis(data={}) {
  return download({
    url:'/letter/pageInfoExport',
    method:'post',
    data
  })
}
//信函列表
export function pageDataLetter(data={}) {
  return request({
    url: '/letter/pageDataLetter',
    method: 'post',
    data,
  })
}

export function pageDataLetterInfo(data={}) {
  return request({
    url: '/letter/pageDataLetterInfo',
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

//修改模板
export function updateModule(data={}) {
  return request({
    url: '/letter/updateModule',
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

//保存查询配置
export function saveSelectFilter(data={}) {
  return request({
    method:'post',
    url:'/saveSelectFilter',
    data
  })
}

//保存查询配置
export function selectByModule(data={}) {
  return request({
    method:'post',
    url:'/selectByModule',
    data
  })
}
