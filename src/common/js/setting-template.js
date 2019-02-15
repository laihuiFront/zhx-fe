import request from '@/common/js/request'
//列表
export function list(data={}) {
  return request({
    url: '/sys/module/list',
    method: 'post',
    data
  })
}
//删除一条
export function deleteOne(data={}) {
  return request({
    url: '/sys/module/delete',
    method: 'post',
    data
  })
}

//模板占位符
export function modulePlaceHolder(data={}) {
  return request({
    url: 'sys/moduleConf/list',
    method: 'post',
    data
  })
}

//保存
export function save(data={}) {
  return request({
    url: '/sys/module/save ',
    method: 'post',
    data
  })
}
