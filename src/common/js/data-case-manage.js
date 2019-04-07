import request from '@/common/js/request'
import download from '@/common/js/download'
export const dataList = function(form,orderBy,sort,pageSize,pageNum) {
  return request({
    url: '/dataCase/pageCaseList',
    method: 'post',
    data: {
      idStr :form.id==null?"":form.id.replace(/[\n\r\v\s↵]/g,","),
      cardNo : form.cardNo==null?"":form.cardNo.replace(/[\n\r\v\s↵]/g,","),//卡号
      clients :form.clients,//委托方
      batchNos:form.batchNos,  //批次编号
      odvs :form.odv, //催收员
      dept:form.dept,
      accountAge :form.accountAge, //逾期賬齡
      seqNo:form.seqNo==null?"":form.seqNo.replace(/[\n\r\v\s↵]/g,","),//個案序列號
      collectArea: form.collectArea, //催收地區
      overDays:  form.overDays,//逾期天數
      area: form.area,//地区
      license: form.license, //牌照号
      collectHand: form.collectHand, //催收手别
      distributeStatus: form.distributeStatus, //分配状态 已分配1/未分配0
      identNo : form.identNo==null?"":form.identNo.replace(/[\n\r\v\s↵]/g,","),//证件号
      vin: form.vin,//车架号
      name:form.name==null?"":form.name.replace(/[\n\r\v\s↵]/g,","),//名称
      status: form.status ,//案件状态 在枚举设置的“案件类型”中配置
      bank:  form.bank,//开户行
      collectInfo : form.collectInfo,//催收记录
      collectStatus: form.collectStatus ,//催收状态    枚举设置的“催收状态”中配置
      caseType:  form.caseType,//案件状态   未退案0/正常1/暂停2/关档3/退档4/全部5
      color: form.color, //标色状态
      account: form.account==null?"":form.account.replace(/[\n\r\v\s↵]/g,",") ,// 账号
      archiveNo: form.archiveNo==null?"":form.archiveNo.replace(/[\n\r\v\s↵]/g,","), //档案号
      caseDateStart:form.time2==null?"":form.time2[0]  , //委案日期 开始时间
      caseDateEnd:form.time2==null?"":form.time2[1]   ,//委案日期 结束时间
      repayDateStart:form.time1==null?"":form.time1[0] ,//还款日期  开始时间
      repayDateEnd :form.time1==null?"":form.time1[1] ,//还款日期 结束时间
      moneyStart :  form.moneyStart,//委案金额 开始金额
      moneyEnd : form.moneyEnd,//委案金额 结束金额
      realReturnStartTime:form.time4==null?"":form.time4[0] ,//实际时间
      realReturnEndTime:form.time4==null?"":form.time4[1]  ,
      collectStartDate:form.time5==null?"":form.time5[0],//最后跟进
      collectEndDate:form.time5==null?"":form.time5[1] ,
      expectStartTime:form.time3==null?"":form.time3[0] ,//预退案时间
      expectEndTime:form.time3==null?"":form.time3[1],
      orderBy:orderBy,
      sort:sort,
      batchBonds:form.batchBonds,
      pageNum :pageNum,
      pageSize :pageSize,
    }
  })
}
export const searchList =  function(form,orderBy,sort,pageSize,pageNum) {
  return request({
    url: '/dataCase/pageCaseList',
    method: 'post',
    data: {
      idStr :form.id==null?"":form.id.replace(/[\n\r\v\s↵]/g,","),
      cardNo : form.cardNo==null?"":form.cardNo.replace(/[\n\r\v\s↵]/g,","),//卡号
      clients :form.clients,//委托方
      batchNos:form.batchNos,  //批次编号
      odvs :form.odvs, //催收员
      dept:form.dept,
      accountAge :form.accountAge, //逾期賬齡
      seqNo:form.seqNo==null?"":form.seqNo.replace(/[\n\r\v\s↵]/g,","),//個案序列號
      collectArea: form.collectArea, //催收地區
      overDays:  form.overDays,//逾期天數
      area: form.area,//地区
      license: form.license, //牌照号
      collectHand: form.collectHand, //催收手别
      distributeStatus: form.distributeStatus, //分配状态 已分配1/未分配0
      identNo : form.identNo==null?"":form.identNo.replace(/[\n\r\v\s↵]/g,","),//证件号
      vin: form.vin,//车架号
      name:form.name==null?"":form.name.replace(/[\n\r\v\s↵]/g,","),//名称
      status: form.status ,//案件状态 在枚举设置的“案件类型”中配置
      bank:  form.bank,//开户行
      collectInfo : form.collectInfo,//催收记录
      collectStatus: form.collectStatus ,//催收状态    枚举设置的“催收状态”中配置
      caseType:  form.caseType,//案件状态   未退案0/正常1/暂停2/关档3/退档4/全部5
      color: form.color, //标色状态
      account: form.account==null?"":form.account.replace(/[\n\r\v\s↵]/g,",") ,// 账号
      archiveNo: form.archiveNo==null?"":form.archiveNo.replace(/[\n\r\v\s↵]/g,","), //档案号
      caseDateStart:form.time2==null?"":form.time2[0]  , //委案日期 开始时间
      caseDateEnd:form.time2==null?"":form.time2[1]   ,//委案日期 结束时间
      repayDateStart:form.time1==null?"":form.time1[0] ,//还款日期  开始时间
      repayDateEnd :form.time1==null?"":form.time1[1] ,//还款日期 结束时间
      moneyStart :  form.moneyStart,//委案金额 开始金额
      moneyEnd : form.moneyEnd,//委案金额 结束金额
      realReturnStartTime:form.time4==null?"":form.time4[0] ,//实际时间
      realReturnEndTime:form.time4==null?"":form.time4[1]  ,
      collectStartDate:form.time5==null?"":form.time5[0],//最后跟进
      collectEndDate:form.time5==null?"":form.time5[1] ,
      expectStartTime:form.time3==null?"":form.time3[0] ,//预退案时间
      expectEndTime:form.time3==null?"":form.time3[1],
      orderBy:orderBy,
      sort:sort,
        batchBonds:form.batchBonds,
      pageNum :pageNum,
      pageSize :pageSize,
    }
  })
}
export const areaList = function() {
  return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"催收区域"}
  })
}
export const addressList = function() {
  return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"地区"}
  })
}
export const sectionList = function() {
  return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"催收措施"}
  })
}


export const caseTypeList = function() {
  return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"案件类型"}
  })
}

export const deleteStatusList = function() {
  return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"减免状态"}
  })
}
export const TellList = function() {
  return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"报备状态"}
  })
}
export const LeaveList = function() {
  return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"案件重要等级"}
  })
}
export const clientList = function() {
  return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"委托方"}
  })
}
export  const batchList = function(){
  return request({
    url: '/dataBatch/selectBatchNo',
    method: 'post',
    data:{}
  })
}
export const EndList = function() {
  return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"催收结果"}
  })
}
export const accountAgeList = function() {
  return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"逾期账龄"}
  })
}
export const collectStatusList = function() {
  return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"催收状态"}
  })
}
export const PersonList = function() {
  return request({
    url: '/user/select/roleList',
    method: 'post',
    data:{role:"催收员 "}
  })
}

export const departmentList = function() {
  return request({
    url: '/organization/listOrganization',
    method: 'post',
    data:{}
  })
}

export const exportTotalCase = function() {
  return download({
    url: '/organization/listOrganization',
    method: 'post',
    data:{}
  })
}
export const exportSelectCase = function() {
  return download({
    url: '/organization/listOrganization',
    method: 'post',
    data:{}
  })
}
export const selectDataCollect = function(datasList) {
  return download({
    url: '/dataCase/selectDataCollectExportByBatch',
    method: 'post',
    data:datasList
  })
}
export const selectDataTel = function(datasList,exportConf) {
  return download({
    url: '/dataCase/selectDataCaseTel',
    method: 'post',
    data:{
      ids:datasList,
      exportConf:exportConf
    },
  })
}
export const selectDataCaseExport = function(datasList) {
  return download({
    url: '/dataCase/selectDataCaseExport',
    method: 'post',
    data:datasList
  })
}

export const fenan1 = function(datasList) {
  return request({
    url: '/dataCase/sendOdv',
    method: 'post',
    data:datasList
  })
}
export const addpingyu = function(datasList) {
  return request({
    url: '/dataCase/addComment',
    method: 'post',
    data:datasList
  })
}
export const caseStatus = function(datasList) {
  return request({
    url: '/dataCase/updateStatus',
    method: 'post',
    data:datasList
  })
}
export const deteleCase = function(datasList) {
  return request({
    url: '/dataCase/delete',
    method: 'post',
    data:datasList
  })
}
export const colorList = function(datasList) {
  return request({
    url: '/dataCase/addColor',
    method: 'post',
    data:datasList
  })
}
export const fenan2 = function(form,fenan) {
  return request({
    url: '/dataCase/sendOdvByProperty',
    method: 'post',
    data: {
    	odv:fenan,
      idStr :form.id==null?"":form.id.replace(/\n/,","),
      cardNo : form.cardNo==null?"":form.cardNo.replace(/\n/,","),//卡号
      clients :form.clients,//委托方
      batchNos:form.batchNos,  //批次编号
      odvs :form.odv, //催收员
      dept:form.dept,
      accountAge :form.accountAge, //逾期賬齡
      seqNo:form.seqNo==null?"":form.seqNo.replace(/\n/,","),//個案序列號
      collectArea: form.collectArea, //催收地區
      overDays:  form.overDays,//逾期天數
      area: form.area,//地区
      license: form.license, //牌照号
      collectHand: form.collectHand, //催收手别
      distributeStatus: form.distributeStatus, //分配状态 已分配1/未分配0
      identNo : form.identNo==null?"":form.identNo.replace(/\n/,","),//证件号
      vin: form.vin,//车架号
      name:form.name==null?"":form.name.replace(/\n/,","),//名称
      status: form.status ,//案件状态 在枚举设置的“案件类型”中配置
      bank:  form.bank,//开户行
      collectInfo : form.collectInfo,//催收记录
      collectStatus: form.collectStatus ,//催收状态    枚举设置的“催收状态”中配置
      caseType:  form.caseType,//案件状态   未退案0/正常1/暂停2/关档3/退档4/全部5
      color: form.color, //标色状态
      account: form.account==null?"":form.account.replace(/\n/,",") ,// 账号
      archiveNo: form.archiveNo==null?"":form.archiveNo.replace(/\n/,","), //档案号
      caseDateStart:form.time2==null?"":form.time2[0]  , //委案日期 开始时间
      caseDateEnd:form.time2==null?"":form.time2[1]   ,//委案日期 结束时间
      repayDateStart:form.time1==null?"":form.time1[0] ,//还款日期  开始时间
      repayDateEnd :form.time1==null?"":form.time1[1] ,//还款日期 结束时间
      moneyStart :  form.moneyStart,//委案金额 开始金额
      moneyEnd : form.moneyEnd,//委案金额 结束金额
      realReturnStartTime:form.time4==null?"":form.time4[0] ,//实际时间
      realReturnEndTime:form.time4==null?"":form.time4[1]  ,
      collectStartDate:form.time5==null?"":form.time5[0],//最后跟进
      collectEndDate:form.time5==null?"":form.time5[1] ,
      expectStartTime:form.time3==null?"":form.time3[0] ,//预退案时间
      expectEndTime:form.time3==null?"":form.time3[1],
      orderBy:form.orderBy,
      sort:form.sort,
    }
  })
}
export const addImportant = function(datasList) {
  return request({
    url: '/dataCase/addImportant',
    method: 'post',
    data:datasList
  })
}
export const addCollectStatus = function(datasList) {
  return request({
    url: '/dataCase/addCollectStatus',
    method: 'post',
    data:datasList
  })
}
export const addCollectArea = function(datasList) {
  return request({
    url: '/dataCase/addCollectArea',
    method: 'post',
    data:datasList
  })
}
export const addMValue = function(datasList) {
  return request({
    url: '/dataCase/addMValue',
    method: 'post',
    data:datasList
  })
}
export const addSynergy = function(datasList) {
  return request({
    url: '/dataCase/addSynergy',
    method: 'post',
    data:datasList
  })
}
export const totalDataBatchExport = function(form) {
  return download({
    url: '/dataCase/totalDataBatchExport',
    method: 'post',
    data: {
      idStr :form.id==null?"":form.id.replace(/\n/,","),
      cardNo : form.cardNo==null?"":form.cardNo.replace(/\n/,","),//卡号
      clients :form.clients,//委托方
      batchNos:form.batchNos,  //批次编号
      odvs :form.odv, //催收员
      dept:form.dept,
      accountAge :form.accountAge, //逾期賬齡
      seqNo:form.seqNo==null?"":form.seqNo.replace(/\n/,","),//個案序列號
      collectArea: form.collectArea, //催收地區
      overDays:  form.overDays,//逾期天數
      area: form.area,//地区
      license: form.license, //牌照号
      collectHand: form.collectHand, //催收手别
      distributeStatus: form.distributeStatus, //分配状态 已分配1/未分配0
      identNo : form.identNo==null?"":form.identNo.replace(/\n/,","),//证件号
      vin: form.vin,//车架号
      name:form.name==null?"":form.name.replace(/\n/,","),//名称
      status: form.status ,//案件状态 在枚举设置的“案件类型”中配置
      bank:  form.bank,//开户行
      collectInfo : form.collectInfo,//催收记录
      collectStatus: form.collectStatus ,//催收状态    枚举设置的“催收状态”中配置
      caseType:  form.caseType,//案件状态   未退案0/正常1/暂停2/关档3/退档4/全部5
      color: form.color, //标色状态
      account: form.account==null?"":form.account.replace(/\n/,",") ,// 账号
      archiveNo: form.archiveNo==null?"":form.archiveNo.replace(/\n/,","), //档案号
      caseDateStart:form.time2==null?"":form.time2[0]  , //委案日期 开始时间
      caseDateEnd:form.time2==null?"":form.time2[1]   ,//委案日期 结束时间
      repayDateStart:form.time1==null?"":form.time1[0] ,//还款日期  开始时间
      repayDateEnd :form.time1==null?"":form.time1[1] ,//还款日期 结束时间
      moneyStart :  form.moneyStart,//委案金额 开始金额
      moneyEnd : form.moneyEnd,//委案金额 结束金额
      realReturnStartTime:form.time4==null?"":form.time4[0] ,//实际时间
      realReturnEndTime:form.time4==null?"":form.time4[1]  ,
      collectStartDate:form.time5==null?"":form.time5[0],//最后跟进
      collectEndDate:form.time5==null?"":form.time5[1] ,
      expectStartTime:form.time3==null?"":form.time3[0] ,//预退案时间
      expectEndTime:form.time3==null?"":form.time3[1],
      orderBy:form.orderBy,
      sort:form.sort,
    }
  })
}



export const pageDataExport = function(form) {
  return download({
    url: '/dataCase/pageDataBatchExport',
    method: 'post',
    data: {
      idStr :form.id==null?"":form.id.replace(/\n/,","),
      cardNo : form.cardNo==null?"":form.cardNo.replace(/\n/,","),//卡号
      clients :form.clients,//委托方
      batchNos:form.batchNos,  //批次编号
      odvs :form.odv, //催收员
      dept:form.dept,
      accountAge :form.accountAge, //逾期賬齡
      seqNo:form.seqNo==null?"":form.seqNo.replace(/\n/,","),//個案序列號
      collectArea: form.collectArea, //催收地區
      overDays:  form.overDays,//逾期天數
      area: form.area,//地区
      license: form.license, //牌照号
      collectHand: form.collectHand, //催收手别
      distributeStatus: form.distributeStatus, //分配状态 已分配1/未分配0
      identNo : form.identNo==null?"":form.identNo.replace(/\n/,","),//证件号
      vin: form.vin,//车架号
      name:form.name==null?"":form.name.replace(/\n/,","),//名称
      status: form.status ,//案件状态 在枚举设置的“案件类型”中配置
      bank:  form.bank,//开户行
      collectInfo : form.collectInfo,//催收记录
      collectStatus: form.collectStatus ,//催收状态    枚举设置的“催收状态”中配置
      caseType:  form.caseType,//案件状态   未退案0/正常1/暂停2/关档3/退档4/全部5
      color: form.color, //标色状态
      account: form.account==null?"":form.account.replace(/\n/,",") ,// 账号
      archiveNo: form.archiveNo==null?"":form.archiveNo.replace(/\n/,","), //档案号
      caseDateStart:form.time2==null?"":form.time2[0]  , //委案日期 开始时间
      caseDateEnd:form.time2==null?"":form.time2[1]   ,//委案日期 结束时间
      repayDateStart:form.time1==null?"":form.time1[0] ,//还款日期  开始时间
      repayDateEnd :form.time1==null?"":form.time1[1] ,//还款日期 结束时间
      moneyStart :  form.moneyStart,//委案金额 开始金额
      moneyEnd : form.moneyEnd,//委案金额 结束金额
      realReturnStartTime:form.time4==null?"":form.time4[0] ,//实际时间
      realReturnEndTime:form.time4==null?"":form.time4[1]  ,
      collectStartDate:form.time5==null?"":form.time5[0],//最后跟进
      collectEndDate:form.time5==null?"":form.time5[1] ,
      expectStartTime:form.time3==null?"":form.time3[0] ,//预退案时间
      expectEndTime:form.time3==null?"":form.time3[1],
      orderBy:form.orderBy,
      sort:form.sort,
    }
  })
}
export const getSynergyTypeList = function() {
  return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"协催类型"}
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
