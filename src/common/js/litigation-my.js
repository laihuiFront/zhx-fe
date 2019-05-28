import request from '@/common/js/request'
export const dataList = function(form,orderBy,sort,pageSize,pageNum) {
return request({
    url: '/legal/pageMyDataCase',
    method: 'post',
    data: {
       legalStatusMsg:form.legalStatusMsg,
       legalNo:form.legalNo,// 案号
	   cstName:form.cstName,// 姓名
       orderBy:orderBy?orderBy:"id",
       sort:sort?sort:"desc",
       pageNum:pageNum ? pageNum : 1,
       pageSize:pageSize ? pageSize : 100
    }
  })
}

export const dataList2 = function(form,orderBy,sort,pageSize,pageNum) {
return request({
    url: '/legal/pageDataCase',
    method: 'post',
    data: {
       legalStatusMsg:form.legalStatusMsg,
       legalNo:form.legalNo,// 案号
	   cstName:form.cstName,// 姓名
       orderBy:orderBy?orderBy:"id",
       sort:sort?sort:"desc",
       pageNum:pageNum ? pageNum : 1,
       pageSize:pageSize ? pageSize : 100
    }
  })
}
export const remoweData = function(id) {
return request({
    url: '/legal/delete',
    method: 'post',
    data:{
    	id:id
    }
  })
}
export const checkData = function(form,id) {
return request({
    url: '/legal/check',
    method: 'post',
    data:{
    	id:id,
    	status:form.resource,
	    owner:form.owner 
    }
  })
}

export const addData = function(form,id) {
return request({
    url: '/legal/save',
    method: 'post',
    data:{
    	id:form.id,
    legalStatusMsg:form.legalStatusMsg,// 案件状态   1 已经审核 2审核中 0未申请
	identNo:form.identNo, //证件号码
	legalType:form.legalType,// 案件類型
	progress:form.progress,// 办案进度
	cstName:form.cstName, //客户姓名
	legalDate:form.legalDate, //委案日期
	clientele:form.clientele,// 委托人
	accused:form.accused, //被告人
	tital:form.tital, //标的
	cost:form.cost,// 费用
	owner:form.owner,// 所属人
	agent:form.agent,// 代理律师
	agentTel:form.agentTel,// 律师联系方式
	filingDate:form.filingDate,// 立案日期
	court:form.court,// 受案法院
	judge:form.judge,// 办案法官
	judgeTel:form.judgeTel,// 法官联系方式
	legalNo:form.legalNo,// 案号
	firstDate:form.firstDate,// 首次开庭日期
	judgeDate:form.judgeDate,// 判决日期
	exeNo:form.exeNo,// 申请执行案号
	exeDate:form.exeDate,// 申请执行日期
	exeEndDate:form.exeEndDate,// 执行终结日期
	costDate:form.costDate,// 诉讼费缴纳日期
	preservationDate:form.preservationDate,// 保全费缴纳日期
	preservationList:form.preservationList,// 保全资产清单
	arriveInfo:form.arriveInfo,// 送达情况
	judgment:form.judgment,// 判决书
	remark:form.remark,// 备注
    }
  })
}

export const PersonList = function() {
return request({
    url: '/user/select/roleList',
    method: 'post',
    data:{}
  })
}


export const getCaseTypeList = function() {
  return request({
    url: '/sys/dictionary/select/list/name',
    method: 'post',
    data:{name:"诉讼案件类型"}
  })
}
