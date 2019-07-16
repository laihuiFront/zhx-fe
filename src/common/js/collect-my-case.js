import request from '@/common/js/request';

// client			委托方
// batchNo			批次号
// nextFollDateStart   下次跟进日期开始
// nextFollDateEnd   下次跟进日期结束
// seqno			个案序列号
// area			地区
// targetName			姓名
// idenNo			证件号
// caseDateStart			委案日期开始
// caseDateEnd			委案日期结束
// accountAge			逾期账龄
// status			案件状态
// collectStatus			催收状态
// caseType			案件类型
// repayTimeStart			还款日期开始
// repayTimeEnd			还款日期结束
// moneyStart			委案金额开始
// moneyEnd			委案金额结束
// color			标记颜色
// cardNo			卡号
// archiveNo			档案号
// newCase			是否新分配（0-否，1-是）
// repayStatus			还款状态
// expectTimeStart			预计退案日开始
// expectTimeEnd			预计退案日结束
// collectionType			催收分类
// reliefStatus   减免状态
// reportStatus   报备状态
export function pageMyCase(data={}) {
  // 列表查询我的案件
  return request({
    method:'post',
    url:'/dataCollection/pageMyCase',
    data
  })
}
export const getUserTree = function(){
  return request({
    url: 'user/select/userTree',
    method: 'post'
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
//案件标色
export function markColor(data=[]) {
  return request({
    method:'post',
    url:'/dataCase/addColor',
    data
  })
}
//修改催收状态
export function addCollectStatus(data=[]) {
  return request({
    method:'post',
    url:'/dataCase/addCollectStatus',
    data
  })
}


//申请协催
export function addSynergy(data=[]) {
  return request({
    method:'post',
    url:'/dataCase/addSynergy',
    data
  })
}

//查询批次号
export function batchNo(data={}) {
  return request({
    method:'post',
    url:'/dataBatch/selectBatchNo',
    data
  })
}


//当日电催跟进量
export function day(data={}) {
  return request({
    method:'post',
    url:'/dataCollection/statistics/day',
    data
  })
}

//催收状况统计
export function state(data={}) {
  return request({
    method:'post',
    url:'/dataCollection/statistics/state',
    data
  })
}

//批次分类统计
export function batch(data={}) {
  return request({
    method:'post',
    url:'/dataCollection/statistics/batch',
    data
  })
}

//我的还款统计
export function pay(data={}) {
  return request({
    method:'post',
    url:'/dataCollection/statistics/pay',
    data
  })
}

//获取部门
export function listOrganization(data={}) {
  return request({
    method:'post',
    url:'/organization/listChildOrganization',
    data
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
