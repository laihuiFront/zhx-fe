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

//申请协催
export function addSynergy(data=[]) {
  return request({
    method:'post',
    url:'/dataCase/addSynergy',
    data
  })
}
