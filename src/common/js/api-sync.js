import request from '@/common/js/request'

export function getEnum(name) {
  return request({
    method:'post',
    url:'/sys/dictionary/select/list/name',
    data:{name}
  })
}

export  function getBatchList(){
  return request({
    url: '/dataBatch/selectBatchNo',
    method: 'post',
    data:{}
  })
}

export function getCollectionUserList() {
  return request({
    url: '/user/select/role ',
    method: 'post',
    data:{role:"催收员 "}
  })
}

export function getStatusList(){
  return [{
    id: '',
    name: '全部'
  },{
    id: 0,
    name: '未退案'
  },{
    id: 1,
    name: '正常'
  },{
    id: 2,
    name: '暂停'
  },{
    id: 3,
    name: '关档'
  },{
    id: 4,
    name: '退档'
  }]
}

export function getRepayRecordList(data){
  return request({
    url: '/repayRecord/list',
    method: 'post',
    data
  })
}
