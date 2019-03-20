<template>
  <div id="case-detail">
    <el-collapse v-model="activeNames">
      <el-collapse-item :title="caseDetail.name+'-[ '+caseDetail.seqNo+']-案件详情'" name="1">
        <div class="items-wrap">
          <el-form
            :model="caseDetail"
            ref="ruleForm"
            label-width="130px"
            class="rule-form"
          >
            <el-form-item label="姓名">
              <el-input v-model="caseDetail.name" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="委托方">
              <el-input v-model="caseDetail.client" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="批次号">
              <el-input v-model="caseDetail.batchNo" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="委案日期">
              <el-date-picker v-model="caseDetail.caseDate" type="date" :disabled="true"  placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="证件号">
              <el-input v-model="caseDetail.identNo" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="卡号">
              <el-input v-model="caseDetail.cardNo" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="催收状态">
              <el-input v-model="caseDetail.collectStatusMsg" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="预计退案日">
              <el-date-picker v-model="caseDetail.expectTime" type="date" :disabled="true"  placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="委案金额">
              <el-input v-model="caseDetail.money" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="人民币">
              <el-input v-model="caseDetail.rmb" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="港币">
              <el-input v-model="caseDetail.hkd" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="外币">
              <el-input v-model="caseDetail.foreignCurrency" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="已还款">
              <el-input v-model="caseDetail.enRepayAmt" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="逾期账龄">
              <el-input v-model="caseDetail.accountAge" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="逾期天数">
              <el-input v-model="caseDetail.overdueDays" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="币种">
              <el-input v-model="caseDetail.currencyType" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="最新欠款" class="half">
              <el-input v-model="caseDetail.latestOverdueMoney" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="地区">
              <el-input v-model="caseDetail.area" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="催收手别">
              <el-input v-model="caseDetail.collectHand" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="本金">
              <el-input v-model="caseDetail.principle" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="剩余本金">
              <el-input v-model="caseDetail.residualPrinciple" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="贷款日期">
              <el-date-picker v-model="caseDetail.loanDate" type="date" placeholder="选择日期" :disabled="true" ></el-date-picker>
            </el-form-item>
            <el-form-item label="逾期期数">
              <el-input v-model="caseDetail.overduePeriods" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="贷款利率">
              <el-input v-model="caseDetail.loanRate" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="每月还款">
              <el-input v-model="caseDetail.monthlyRepayments" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="逾期金额">
              <el-input v-model="caseDetail.overdueMoney" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="预期本金">
              <el-input v-model="caseDetail.overduePrinciple" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="逾期利息">
              <el-input v-model="caseDetail.overdueInterest" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="逾期罚息">
              <el-input v-model="caseDetail.overdueDefaultInterest" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="违约金">
              <el-input v-model="caseDetail.penalty" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="滞纳金">
              <el-input v-model="caseDetail.lateFee" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="手机">
              <el-input v-model="caseDetail.tel" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="家庭号码">
              <el-input v-model="caseDetail.homeTelNumber" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="单位号码">
              <el-input v-model="caseDetail.unitTelNumber" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="家庭地址" class="whole">
              <el-input v-model="caseDetail.homeAddress" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="单位名称" class="whole">
              <el-input v-model="caseDetail.unitName" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="单位地址" class="whole">
              <el-input v-model="caseDetail.unitAddress" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="户籍地址" class="whole">
              <el-input v-model="caseDetail.censusRegisterAddress" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="对账单地址" class="whole">
              <el-input v-model="caseDetail.statementAddress" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="承诺还款金额">
              <el-input v-model="caseDetail.proRepayAmt" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="待银行查账金额">
              <el-input v-model="caseDetail.bankAmt" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="委案期数">
              <el-input v-model="caseDetail.entrustPeriods" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="最低还款额">
              <el-input v-model="caseDetail.minimumPayment" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="下次跟进日期" class="half">
              <el-input v-model="caseDetail.nextFollowDate" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="委托日期">
              <el-date-picker v-model="caseDetail.caseDate" type="date" :disabled="true"  placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="跟进次数">
              <el-input v-model="caseDetail.collectTimes" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="催收区域">
              <el-input v-model="caseDetail.collectArea" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="催收员">
              <el-input v-model="caseDetail.odv" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="最近催记时间">
              <el-date-picker v-model="caseDetail.latestCollectMomorize" :disabled="true"  type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="最后外访">
              <el-input v-model="caseDetail.zhwf" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="自动收回时间">
              <el-date-picker v-model="caseDetail.zdshsj" type="datetime" :disabled="true"  placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="催收小结" class="width-75">
              <el-input v-model="caseDetail.collectInfo" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="最新评语" class="whole">
              <div class="content-wrap">
                <el-popover
                  placement="bottom-start"
                  title="添加评语"
                  width="400"
                  trigger="click"
                  v-model="addCommentVisible">
                  <div>
                    <el-input
                      type="textarea"
                      :rows="4"
                      placeholder="请输入评语"
                      v-model="commentAddContent">
                    </el-input>
                    <el-radio-group v-model="commentAddColor" style="margin-top:10px;">
                      <el-radio label="黑">正常</el-radio>
                      <el-radio label="蓝">标蓝</el-radio>
                      <el-radio label="红">标红</el-radio>
                      <el-radio label="">不更改</el-radio>
                    </el-radio-group>
                  </div>
                  <div style="text-align: right; margin-top: 12px">
                    <el-button size="mini" type="text" @click="addCommentVisible = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="onClickAddComment">确定</el-button>
                  </div>
                 <el-button size="small" type="text" icon="el-icon-plus" title="添加" slot="reference"></el-button>
                </el-popover>
                 <ul class="comments-wrap">
                   <li v-for="(item) in commentList" :key="item.id" class="item" :class="[{blue: item.commentColor==='BLUE'},{red: item.commentColor==='RED'}]">
                     {{item.createTime}} {{item.creatUserName}} : {{item.comment}}
                   </li>
                 </ul>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
      <el-collapse-item title="同批次共债案件" name="2">
        <el-table
          :data="dependCase"
          border stripe
          style="width: 100%"
          height="1"
          class="table-wrap">
          <el-table-column
            prop="seqNo"
            label="个案序列号">
          </el-table-column>
          <el-table-column
            prop="cardNo"
            label="卡号">
          </el-table-column>
          <el-table-column
            prop="account"
            label="账号">
          </el-table-column>
          <el-table-column
            prop="moneyMsg"
            label="委案金额">
          </el-table-column>
          <el-table-column
            prop="currencyType"
            label="币种">
          </el-table-column>
          <el-table-column
            prop="proRepayAmtMsg"
            label="承诺还款金额">
          </el-table-column>
          <el-table-column
            prop="bankAmtMsg"
            label="待银行查账金额">
          </el-table-column>
          <el-table-column
            prop="enRepayAmtMsg"
            label="已还款">
          </el-table-column>
          <el-table-column
            prop="accountAge"
            label="逾期账龄">
          </el-table-column>
          <el-table-column
            prop="collectDate"
            label="上次通电">
          </el-table-column>
          <el-table-column
            prop="collectTimes"
            label="通电次数">
          </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item title="其他信息" name="3">
        <div class="items-wrap">
          <el-form
              :model="caseDetail"
              ref="otherForm"
              label-width="130px"
              class="rule-form"
            >
            <el-form-item label="分配时间">
              <el-input v-model="caseDetail.distributeTime" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="分配历史">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="家庭邮编">
              <el-input v-model="caseDetail.homeZipCode" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="单位邮编">
              <el-input v-model="caseDetail.unitZipCode" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="对账邮编">
              <el-input v-model="caseDetail.statementZipCode" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="户籍邮编">
              <el-input v-model="caseDetail.censusRegisterZipCode" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="账号">
              <el-input v-model="caseDetail.account" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="开户行">
              <el-input v-model="caseDetail.bank" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="主副卡">
              <el-input v-model="caseDetail.mainDeputyCard" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="副卡卡人">
              <el-input v-model="caseDetail.deputyCardUserName" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="未出账金额">
              <el-input v-model="caseDetail.outstandingAmount" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="账单日">
              <el-input v-model="caseDetail.billDate" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="账单周期">
              <el-input v-model="caseDetail.billCycle" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="固定额度">
              <el-input v-model="caseDetail.fixedQuota" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="最后消费日">
              <el-input v-model="caseDetail.lastConsumeDate" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="最后提现日">
              <el-input v-model="caseDetail.lastWithdrawDate" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="逾期日期">
              <el-input v-model="caseDetail.overdueDate" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="曾逾期次数">
              <el-input v-model="caseDetail.overdueTimes" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="保证金">
              <el-input v-model="caseDetail.bail" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="超限费">
              <el-input v-model="caseDetail.overrunFee" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="公司佣金">
              <el-input v-model="caseDetail.commissionMoney" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="还款期限">
              <el-input v-model="caseDetail.repayDeadline" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="逾期管理费">
              <el-input v-model="caseDetail.overdueManagementCost" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="信用额度">
              <el-input v-model="caseDetail.creditLine" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="信贷分类">
              <el-input v-model="caseDetail.loanType" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="拖欠级别">
              <el-input v-model="caseDetail.defaultLevel" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="账户名称">
              <el-input v-model="caseDetail.accountName" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="已还期数">
              <el-input v-model="caseDetail.repaidPeriods" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="催收分类">
              <el-input v-model="caseDetail.collectionType" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="贷款截止日">
              <el-input v-model="caseDetail.loanDeadline" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="生日">
              <el-input v-model="caseDetail.birthday" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input v-model="caseDetail.age" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="QQ">
              <el-input v-model="caseDetail.qq" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="caseDetail.email" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="职位">
              <el-input v-model="caseDetail.caseUserPosition" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="部门">
              <el-input v-model="caseDetail.caseUserDepart" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="商品">
              <el-input v-model="caseDetail.goods" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="商户">
              <el-input v-model="caseDetail.commercialTenant" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="申请单号">
              <el-input v-model="caseDetail.applyOrderNo" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="档案号">
              <el-input v-model="caseDetail.archiveNo" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="社保电脑号">
              <el-input v-model="caseDetail.socialSecurityComputerNo" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="社保卡号">
              <el-input v-model="caseDetail.socialSecurityCardNo" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人1姓名">
              <el-input v-model="caseDetail.contactName1" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人1证件">
              <el-input v-model="caseDetail.contactIdentNo1" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人1家庭电话">
              <el-input v-model="caseDetail.contactHomeTel1" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人1单位电话">
              <el-input v-model="caseDetail.contactUnitTel1" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人1手机">
              <el-input v-model="caseDetail.contactMobile1" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人1单位">
              <el-input v-model="caseDetail.contactUnit1" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人1地址">
              <el-input v-model="caseDetail.contactAddress1" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="">

            </el-form-item>
            <el-form-item label="联系人2姓名">
              <el-input v-model="caseDetail.contactName2" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人2证件">
              <el-input v-model="caseDetail.contactIdentNo2" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人2家庭电话">
              <el-input v-model="caseDetail.contactHomeTel2" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人2单位电话">
              <el-input v-model="caseDetail.contactUnitTel2" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人2手机">
              <el-input v-model="caseDetail.contactMobile2" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人2单位">
              <el-input v-model="caseDetail.contactUnit2" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人2地址">
              <el-input v-model="caseDetail.contactAddress2" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="">
            </el-form-item>
            <el-form-item label="联系人3姓名">
              <el-input v-model="caseDetail.contactName3" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人3证件">
              <el-input v-model="caseDetail.contactIdentNo3" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人3家庭电话">
              <el-input v-model="caseDetail.contactHomeTel3" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人3单位电话">
              <el-input v-model="caseDetail.contactUnitTel3" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人3手机">
              <el-input v-model="caseDetail.contactMobile3" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人3单位">
              <el-input v-model="caseDetail.contactUnit3" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人3地址">
              <el-input v-model="caseDetail.contactAddress3" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="">
            </el-form-item>
            <el-form-item label="联系人4姓名">
              <el-input v-model="caseDetail.contactName4" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人4证件">
              <el-input v-model="caseDetail.contactIdentNo4" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人4家庭电话">
              <el-input v-model="caseDetail.contactHomeTel4" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人4单位电话">
              <el-input v-model="caseDetail.contactUnitTel4" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人4手机">
              <el-input v-model="caseDetail.contactMobile4" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人4单位">
              <el-input v-model="caseDetail.contactUnit4" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人4地址">
              <el-input v-model="caseDetail.contactAddress4" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="">
            </el-form-item>
            <el-form-item label="联系人5姓名">
              <el-input v-model="caseDetail.contactName5" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人5证件">
              <el-input v-model="caseDetail.contactIdentNo5" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人5家庭电话">
              <el-input v-model="caseDetail.contactHomeTel5" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人5单位电话">
              <el-input v-model="caseDetail.contactUnitTel5" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人5手机">
              <el-input v-model="caseDetail.contactMobile5" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人5单位">
              <el-input v-model="caseDetail.contactUnit5" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人5地址">
              <el-input v-model="caseDetail.contactAddress5" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="">

            </el-form-item>
            <el-form-item label="联系人6姓名">
              <el-input v-model="caseDetail.contactName6" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人6证件">
              <el-input v-model="caseDetail.contactIdentNo6" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人6家庭电话">
              <el-input v-model="caseDetail.contactHomeTel6" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人6单位电话">
              <el-input v-model="caseDetail.contactUnitTel6" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人6手机">
              <el-input v-model="caseDetail.contactMobile6" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人6单位">
              <el-input v-model="caseDetail.contactUnit6" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人6地址">
              <el-input v-model="caseDetail.contactAddress6" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="原催收记录">
              <el-input v-model="caseDetail.lastCollectionRecord" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="备注1">
              <el-input v-model="caseDetail.remark1" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="备注2">
              <el-input v-model="caseDetail.remark2" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="备注3">
              <el-input v-model="caseDetail.remark3" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="备注4">
              <el-input v-model="caseDetail.remark4" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="备注5">
              <el-input v-model="caseDetail.remark5" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="备注6">
              <el-input v-model="caseDetail.remark6" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="附件" class="upload-wrap">
                <el-popover
                  placement="right"
                  title="附件列表"
                  width="500"
                  trigger="click"
                  v-model="uploadVisible">
                  <el-upload
                    class="upload-demo upload-btn"
                    :action="action+'/dataFile/save/import'"
                    :headers="header"
                    :show-file-list=false
                    :on-success="uploadSuccess"
                    :data="{caseId:id}"
                    >
                    <el-button style="position:absolute;top:10px;right:10px;"  size="mini" type="primary">上传附件</el-button>
                  </el-upload>
                  <el-table :data="uploadFileList"  border stripe  width="100%" :show-header="false">
                    <el-table-column prop="fileName" label="文件名"></el-table-column>
                  </el-table>
                  <el-button type="text"  class="upload-btn" slot="reference">附件列表</el-button>
                </el-popover>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
      <el-collapse-item title="" name="4">
        <div class="other-wrap">
          <div class="left-wrap">
            <el-tabs v-model="otherActiveName" type="card" @tab-click="showPanel">
              <el-tab-pane label="电话" name="1" class="tabs-wrap">
                <div class="operation">
                  <div class="left-oper">
                    <el-button @click="changePhoneStatus('有效')" v-if="caseDetail.currentuser">标记为有效</el-button>
                    <el-button @click="changePhoneStatus('未知')" v-if="caseDetail.currentuser">标记为未知</el-button>
                    <el-button @click="changePhoneStatus('无效')" v-if="caseDetail.currentuser">标记为无效</el-button>
                    <el-button @click="showAllTel">显示全部电话</el-button>
                  </div>
                  <div class="right-oper">
                <el-button type="primary" @click="addPhone" v-if="caseDetail.currentuser">新增电话</el-button>
                <el-popover
                  placement="bottom-end"
                  title="批量新增电话"
                  width="500"
                  trigger="click"
                  v-model="batchAddTelVisible" v-if="caseDetail.currentuser">
                  <div>
                    <el-input
                      type="textarea"
                      :rows="4"
                      placeholder="请按照'关系-姓名-电话'的格式输入,多个条目以/隔开"
                      v-model="batchAddTelContent">
                    </el-input>
                  </div>
                  <div style="text-align: right; margin-top: 12px">
                    <el-button size="mini" type="text" @click="batchAddTelVisible = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="onClickBatchAddTel">确定</el-button>
                  </div>
                  <el-button type="primary" slot="reference">批量新增电话</el-button>
                </el-popover>
                <!-- <el-button type="primary">批量电催</el-button> -->
                <el-button type="primary" @click="_synchroSameTel" v-if="caseDetail.currentuser">同步共债</el-button>
              </div>
          </div>
                <el-table
                  @selection-change="onSelectPhoneRow"
                  border stripe
                  :data="caseDetail.dataCaseTelEntityList"
                  :row-class-name="telTableRowClassName"
                  style="width: 100%"
                  height="1"
                  class="table-wrap">
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    prop="telStatusMsg"
                    label="状态">
                  </el-table-column>
                  <el-table-column
                    prop="tel"
                    label="电话">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="姓名">
                  </el-table-column>
                  <el-table-column
                    prop="relation"
                    label="关系">
                  </el-table-column>
                  <el-table-column
                    prop="typeMsg"
                    label="类型">
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    label="备注">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="250">
                    <template slot-scope="scope">
                      <el-popover
                        v-model="scope.row.showHistory"
                        placement="top"
                        width="1000"
                        trigger="manual">
                        <div>
                          <el-radio-group v-model="scope.row.historyType" @change='getHistoryTel'>
                            <el-radio :label="1">本案催记</el-radio>
                            <el-radio :label="2">同号码所有催记</el-radio>
                          </el-radio-group>
                        </div>
                        <el-table :data="scope.row.history" height="500">
                          <el-table-column  property="collectTime" label="通话时间"></el-table-column>
                          <el-table-column  property="targetName" label="通话对象"></el-table-column>
                          <el-table-column  property="mobile" label="电话号码"></el-table-column>
                          <el-table-column  property="sType" label="电话类型"></el-table-column>
                          <el-table-column  property="collectInfo" label="通话内容"></el-table-column>
                          <el-table-column  property="result" label="通话结果"></el-table-column>
                          <el-table-column  property="repayTime" label="承诺日期"></el-table-column>
                          <el-table-column  property="repayAmt" label="承诺金额"></el-table-column>
                          <el-table-column  property="odv" label="催收员"></el-table-column>
                        </el-table>
                        <div style="text-align:center">
                          <el-button type="primary" @click="$set(scope.row, 'showHistory',false)">关闭</el-button>
                        </div>
                        <el-button slot="reference" type="text" @click="showHistoryTel(scope.row)">历史记录</el-button>
                      </el-popover>
                      <el-button type="text" @click="editPhone(scope.row)" v-if="caseDetail.currentuser && scope.row.telStatusMsg !== '停止跟进'">编辑</el-button>
                      <el-button type="text" @click="deleteTel(scope.row.id)" v-if="caseDetail.currentuser && scope.row.telStatusMsg !== '停止跟进'">删除</el-button>
                      <el-button type="text" v-if="caseDetail.currentuser && scope.row.telStatusMsg !== '停止跟进'" @click="stopTel(scope.row.id)">停止跟进</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="地址" name="2" class="tabs-wrap" >
                <div class="operation"  v-if="letterVisible2">
                  <div class="left-oper">
                    <el-button @click="changeAddrStatus('有效')" v-if="caseDetail.currentuser">标记为有效</el-button>
                    <el-button @click="changeAddrStatus('未知')" v-if="caseDetail.currentuser">标记为未知</el-button>
                    <el-button @click="changeAddrStatus('无效')" v-if="caseDetail.currentuser">标记为无效</el-button>
                    <!-- <el-button @click="saveAddr">显示全部地址</el-button> -->
                    <el-button @click="showLetterList">查看信函记录</el-button>
                  </div>
                  <div class="right-oper">
                    <el-button type="primary" @click="addAddr" v-if="caseDetail.currentuser">新增地址</el-button>
                  </div>
                </div>
                <el-table
                  v-if="letterVisible2"
                  border stripe
                  @selection-change="onSelectAddrRow"
                  :data="addrList"
                  height="1"
                  style="width: 100%"
                  class="table-wrap">
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    prop="status"
                    show-overflow-tooltip
                    label="状态">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    show-overflow-tooltip
                    label="姓名">
                  </el-table-column>
                  <el-table-column
                    prop="relation"
                    show-overflow-tooltip
                    label="关系">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    show-overflow-tooltip
                    label="地址">
                  </el-table-column>
                  <el-table-column
                    prop="type"
                    show-overflow-tooltip
                    label="类型">
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    show-overflow-tooltip
                    label="备注">
                  </el-table-column>
                  <el-table-column
                    prop="letterCount"
                    show-overflow-tooltip
                    label="信函次数">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    v-if="letterVisible2"
                    width="250">
                    <template slot-scope="scope">
                      <el-popover
                        v-model="scope.row.showHistory"
                        placement="top"
                        width="600"
                        trigger="manual">
                        <el-table :data="scope.row.history" height="300">
                          <el-table-column show-overflow-tooltip  property="opTime" label="操作时间"></el-table-column>
                          <el-table-column  show-overflow-tooltip property="type" label="分类"></el-table-column>
                          <el-table-column show-overflow-tooltip  property="context" label="操作内容"></el-table-column>
                          <el-table-column show-overflow-tooltip  property="operName" label="操作人"></el-table-column>
                        </el-table>
                        <div style="text-align:center">
                          <el-button type="primary" @click="$set(scope.row, 'showHistory',false)">关闭</el-button>
                        </div>
                        <el-button slot="reference" type="text" @click="showHistoryAddr(scope.row)" v-if="letterVisible2">历史记录</el-button>
                      </el-popover>
                      <el-button type="text"  @click="applyLetter(scope.row)" v-if="caseDetail.currentuser && letterVisible2">申请信函</el-button>
                      <el-button type="text" @click="editAddr(scope.row)" v-if="caseDetail.currentuser && letterVisible2">编辑</el-button>
                      <el-button type="text" @click="deleteAddr(scope.row.id)" v-if="caseDetail.currentuser&& letterVisible2">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-table
                  :data="letterList"
                  border stripe
                  v-if="letterVisible"
                  style="width: 100%"
                  height="1"
                  class="table-wrap">
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    prop="status"
                    show-overflow-tooltip
                    label="状态">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    show-overflow-tooltip
                    label="地址">
                  </el-table-column>
                  <el-table-column
                    prop="applyContext"
                    show-overflow-tooltip
                    label="申请内容">
                  </el-table-column>
                  <el-table-column
                    prop="addressType"
                    show-overflow-tooltip
                    label="地址类型">
                  </el-table-column>
                  <el-table-column
                    prop="letterType"
                    show-overflow-tooltip
                    label="信函类别">
                  </el-table-column>
                  <el-table-column
                    prop="applyDate"
                    show-overflow-tooltip
                    label="申请时间">
                  </el-table-column>
                  <el-table-column
                    prop="applyer"
                    show-overflow-tooltip
                    label="申请人">
                  </el-table-column>
                  <el-table-column
                    prop="synergyer"
                    show-overflow-tooltip
                    label="协催人">
                  </el-table-column>
                  <el-table-column
                    prop="synergyDate"
                    show-overflow-tooltip
                    label="协催时间">
                  </el-table-column>
                  <el-table-column
                    prop="synergyResult"
                    show-overflow-tooltip
                    label="协催结果">
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="案人数据" name="3" class="tabs-wrap">
                <div class="operation"  v-if="letterVisible2">
                  <div class="left-oper">
                  </div>
                  <div class="right-oper">
                    <el-button type="primary" @click="onClickAddArchive" v-if="caseDetail.currentuser">新增案人数据</el-button>
                  </div>
                </div>
                <el-table
                  :data="dataList"
                  border stripe
                  style="width: 100%"
                  height="120px"
                  class="table-wrap">
                  <el-table-column
                    prop="name"
                    show-overflow-tooltip
                    label="姓名">
                  </el-table-column>
                  <el-table-column
                    prop="msgType"
                    show-overflow-tooltip
                    label="信息类型">
                  </el-table-column>
                  <el-table-column
                    prop="msgContext"
                    show-overflow-tooltip
                    label="信息内容">
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    show-overflow-tooltip
                    label="备注">
                  </el-table-column>
                  <el-table-column
                    prop="createTime"
                    show-overflow-tooltip
                    label="导入时间">
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="催记" name="4" class="tabs-wrap">
                <div class="operation">
                  <div class="left-oper">
                    <el-radio-group v-model="memorizeType" @change='memorizeTypeChange'>
                      <el-radio :label="1">本案催记</el-radio>
                      <el-radio :label="2">同批次共债催记</el-radio>
                      <el-radio :label="3">共债催记</el-radio>
                      <el-radio :label="4">同卡催记</el-radio>
                    </el-radio-group>
                  </div>
                  <div class="right-oper">
                    <el-button type="primary" @click="addDataCollect" v-if="caseDetail.currentuser">添加辅助催记</el-button>
                    <el-button type="primary" @click="_expDataCollect" v-if="caseDetail.currentuser">导出本案催记</el-button>
                  </div>
                </div>
                <el-table
                  :data="memorizeList"
                  style="width: 100%"
                  border stripe
                  height="120px"
                  class="table-wrap">
                  <el-table-column
                    prop="measure"
                    show-overflow-tooltip
                    label="催收措施">
                  </el-table-column>
                  <el-table-column
                    prop="collectTime"
                    show-overflow-tooltip
                    label="时间">
                  </el-table-column>
                  <el-table-column
                    prop="targetName"
                    show-overflow-tooltip
                    label="对象姓名">
                  </el-table-column>
                  <el-table-column
                    prop="relation"
                    show-overflow-tooltip
                    label="关系">
                  </el-table-column>
                  <el-table-column
                    prop="mobile"
                    show-overflow-tooltip
                    label="电话/地址">
                  </el-table-column>
                  <el-table-column
                    prop="telType"
                    show-overflow-tooltip
                    label="类型">
                  </el-table-column>
                  <el-table-column
                    prop="collectInfo"
                    show-overflow-tooltip
                    label="催收信息">
                  </el-table-column>
                  <el-table-column
                    prop="result"
                    show-overflow-tooltip
                    label="催收结果">
                  </el-table-column>
                  <el-table-column
                    prop="targetName"
                    show-overflow-tooltip
                    label="催收对象">
                  </el-table-column>
                  <el-table-column
                    prop="methodMsg"
                    show-overflow-tooltip
                    label="谈判方式">
                  </el-table-column>
                  <el-table-column
                    prop="repayTime"
                    show-overflow-tooltip
                    label="承诺日期">
                  </el-table-column>
                  <el-table-column
                    prop="repayAmtMsg"
                    show-overflow-tooltip
                    label="承诺金额">
                  </el-table-column>
                  <el-table-column
                    prop="reduceAmtMsg"
                    show-overflow-tooltip
                    label="减免金额">
                  </el-table-column>
                  <el-table-column
                    prop="reduceStatusMsg"
                    show-overflow-tooltip
                    label="减免状态">
                  </el-table-column>
                  <el-table-column
                    prop="odv"
                    show-overflow-tooltip
                    label="催收人">
                  </el-table-column>
                  <el-table-column
                    prop="collectStatusMsg"
                    show-overflow-tooltip
                    label="催收状态">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                      <el-button type="text" @click="editDataCollect(scope.row)" v-if="caseDetail.currentuser">编辑</el-button>
                      <el-button type="text" v-if="caseDetail.currentuser">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="评语" name="5" class="tabs-wrap">
                <el-table
                  :data="commentList"
                  border stripe
                  style="width: 100%"
                  height="120px"
                  class="table-wrap">
                  <el-table-column
                    prop="comment"
                    show-overflow-tooltip
                    label="评语内容">
                  </el-table-column>
                  <el-table-column
                    prop="creatUserName"
                    show-overflow-tooltip
                    width="150"
                    label="提交人">
                  </el-table-column>
                  <el-table-column
                    prop="createTime"
                    show-overflow-tooltip
                    width="150"
                    label="提交时间">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    v-if="letterVisible2"
                    width="150">
                    <template slot-scope="scope">
                      <el-popover
                        placement="bottom-end"
                        trigger="manual"
                        title="编辑操作记录"
                        width="500"
                        v-model="scope.row.editCommentVisible">
                        <div>
                          <el-input
                            type="textarea"
                            :rows="4"
                            placeholder="请输入评语"
                            v-model="scope.row.editContext">
                          </el-input>
                        </div>
                        <div style="text-align: right; margin-top: 12px">
                          <el-button size="mini" type="text" @click="$set(scope.row, 'editCommentVisible', false)">取消</el-button>
                          <el-button type="primary" size="mini" @click="onClickSaveComment">确定</el-button>
                        </div>
                        <el-button type="text"  @click="editComment(scope.row)" slot="reference" v-if="caseDetail.currentuser">修改</el-button>
                      </el-popover>
                      <el-button type="text"  v-if="caseDetail.currentuser" @click="_deleteComment(scope.row.id)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="利息更新" name="7" class="tabs-wrap">
                <el-table
                  :data="rateUpdateList"
                  border stripe
                  style="width: 100%"
                  height="120px"
                  class="table-wrap">
                  <el-table-column
                    prop="currency"
                    show-overflow-tooltip
                    label="币种">
                  </el-table-column>
                  <el-table-column
                    prop="lastestDebt"
                    show-overflow-tooltip
                    label="总欠款金额">
                  </el-table-column>
                  <el-table-column
                    prop="endDate"
                    show-overflow-tooltip
                    label="截止日期">
                  </el-table-column>
                  <el-table-column
                    prop="principal"
                    show-overflow-tooltip
                    label="本金">
                  </el-table-column>
                  <el-table-column
                    prop="interest"
                    show-overflow-tooltip
                    label="利息">
                  </el-table-column>
                  <el-table-column
                    prop="penalty"
                    show-overflow-tooltip
                    label="违约金">
                  </el-table-column>
                  <el-table-column
                    prop="lateFee"
                    show-overflow-tooltip
                    label="滞纳金">
                  </el-table-column>
                  <el-table-column
                    prop="overrunFee"
                    show-overflow-tooltip
                    label="超限费">
                  </el-table-column>
                  <el-table-column
                    prop="serivceFee"
                    show-overflow-tooltip
                    label="服务费">
                  </el-table-column>
                  <el-table-column
                    prop="yearFee"
                    show-overflow-tooltip
                    label="年费">
                  </el-table-column>
                  <el-table-column
                    prop="elseFee"
                    show-overflow-tooltip
                    label="其他费用">
                  </el-table-column>
                  <el-table-column
                    prop="sheetFee"
                    show-overflow-tooltip
                    label="表外息">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="导入时间">
                  </el-table-column>
                </el-table>
              </el-tab-pane>

              <el-tab-pane label="协催" name="9" class="tabs-wrap">
                <div class="operation">
                  <div class="left-oper">
                    <el-radio-group v-model="syncType" @change='syncTypeChange'>
                      <el-radio :label="1">全部</el-radio>
                      <el-radio :label="2">待审核</el-radio>
                      <el-radio :label="3">待办</el-radio>
                      <el-radio :label="4">已完成</el-radio>
                      <el-radio :label="5">已撤销</el-radio>
                    </el-radio-group>
                  </div>
                  <div class="right-oper">
                    <el-button type="primary" @click="showSynergyApply" v-if="caseDetail.currentuser">添加协催申请</el-button>
                    <el-button type="primary" @click="showSynergyResult" v-if="caseDetail.currentuser">添加协催记录</el-button>
                  </div>
                </div>
                <el-table
                  :data="syncList"
                  style="width: 100%"
                  border stripe
                  height="120px"
                  class="table-wrap">
                  <el-table-column
                    prop="statusMsg"
                    show-overflow-tooltip
                    label="状态">
                  </el-table-column>
                  <el-table-column
                    prop="synergisticType.name"
                    show-overflow-tooltip
                    label="协催类型">
                  </el-table-column>
                  <el-table-column
                    prop="applyContent"
                    show-overflow-tooltip
                    label="申请内容">
                  </el-table-column>
                  <el-table-column
                    prop="applyTime"
                    show-overflow-tooltip
                    label="申请时间">
                  </el-table-column>
                  <el-table-column
                    prop="applyUser.userName"
                    show-overflow-tooltip
                    label="申请人">
                  </el-table-column>
                  <el-table-column
                    prop="synergisticTime"
                    show-overflow-tooltip
                    label="协催时间">
                  </el-table-column>
                  <el-table-column
                    prop="synergisticUser.userName"
                    show-overflow-tooltip
                    label="协催人">
                  </el-table-column>
                  <el-table-column
                    prop="synergisticResult"
                    show-overflow-tooltip
                    label="协催结果">
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="共债案件" name="10" class="tabs-wrap" v-if="userInfo.sameBatch">
                <el-table
                  :data="caseSameList"
                  style="width: 100%"
                  border stripe
                  height="120px"
                  class="table-wrap">
                  <el-table-column
                    prop="batchNo"
                    show-overflow-tooltip
                    label="批次号">
                  </el-table-column>
                  <el-table-column
                    prop="seqNo"
                    show-overflow-tooltip
                    label="个案序列号">
                  </el-table-column>
                  <el-table-column
                    prop="caseDate"
                    show-overflow-tooltip
                    label="委托日期">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    show-overflow-tooltip
                    label="姓名">
                  </el-table-column>
                  <el-table-column
                    prop="cardNo"
                    show-overflow-tooltip
                    label="卡号">
                  </el-table-column>
                  <el-table-column
                    prop="client"
                    show-overflow-tooltip
                    label="委托方">
                  </el-table-column>
                  <el-table-column
                    prop="moneyMsg"
                    show-overflow-tooltip
                    label="委案金额">
                  </el-table-column>
                  <el-table-column
                    prop="collectStatusMsg"
                    show-overflow-tooltip
                    label="催收状态">
                  </el-table-column>
                  <el-table-column
                    prop="enRepayAmtMsg"
                    show-overflow-tooltip
                    label="已还款">
                  </el-table-column>
                  <el-table-column
                    prop="odv"
                    show-overflow-tooltip
                    label="催收员">
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="操作记录" name="11" class="tabs-wrap">
                <div class="operation">
                  <div class="left-oper">
                    <el-radio-group v-model="logType" @change='logTypeChange'>
                      <el-radio label="">全部</el-radio>
                      <el-radio label="电话催收">电话催收</el-radio>
                      <el-radio label="电话管理">电话管理</el-radio>
                      <el-radio label="案件管理">案件管理</el-radio>
                      <el-radio label="电话催收">电话催收</el-radio>
                      <el-radio label="待银行查账管理">待银行查账管理</el-radio>
                    </el-radio-group>
                  </div>
                </div>
                <el-table
                  :data="logList"
                  border stripe
                  style="width: 100%"
                  height="120px"
                  class="table-wrap">
                  <el-table-column
                    prop="opTime"
                    width="150"
                    show-overflow-tooltip
                    label="时间">
                  </el-table-column>
                  <el-table-column
                    prop="type"
                    width="150"
                    show-overflow-tooltip
                    label="类别">
                  </el-table-column>
                  <el-table-column
                    prop="context"
                    show-overflow-tooltip
                    label="操作内容">
                  </el-table-column>
                  <el-table-column
                    prop="operName"
                    width="100"
                    show-overflow-tooltip
                    label="操作人">
                  </el-table-column>

                </el-table>
              </el-tab-pane>
              <el-tab-pane label="诉讼案件" name="12" class="tabs-wrap">
                <div class="operation">
                  <div class="left-oper">
                  </div>
                  <div class="right-oper">
                    <el-button type="primary"  @click="litigationApply" v-if="caseDetail.currentuser">申请诉讼</el-button>
                  </div>
                </div>
                <el-table
                  border stripe
                  :data="legalList"
                  style="width: 100%;margin-top:5px;"
                  height="120px"
                  class="table-wrap">
                  <el-table-column
                    prop="legalStatusMsg"
                    show-overflow-tooltip
                    label="案件状态">
                  </el-table-column>
                  <el-table-column
                    prop="progressMsg"
                    show-overflow-tooltip
                    label="办案进度">
                  </el-table-column>
                  <el-table-column
                    prop="legalType"
                    show-overflow-tooltip
                    label="案件类型">
                  </el-table-column>
                  <el-table-column
                    prop="cstName"
                    show-overflow-tooltip
                    label="客户姓名">
                  </el-table-column>
                  <el-table-column
                    prop="legalDate"
                    show-overflow-tooltip
                    label="委案日期">
                  </el-table-column>
                  <el-table-column
                    prop="clientele"
                    show-overflow-tooltip
                    label="委托人">
                  </el-table-column>
                  <el-table-column
                    prop="accused"
                    show-overflow-tooltip
                    label="被告人">
                  </el-table-column>
                  <el-table-column
                    prop="tital"
                    show-overflow-tooltip
                    label="标的">
                  </el-table-column>
                  <el-table-column
                    prop="cost"
                    show-overflow-tooltip
                    label="费用">
                  </el-table-column>
                  <el-table-column
                    prop="owner"
                    show-overflow-tooltip
                    label="所属人">
                  </el-table-column>
                  <el-table-column
                    prop="court"
                    show-overflow-tooltip
                    label="受案法院">
                  </el-table-column>
                  <el-table-column
                    prop="legalNo"
                    show-overflow-tooltip
                    label="案号">
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    show-overflow-tooltip
                    label="备注">
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="减免管理" name="13" class="tabs-wrap">
                <div class="operation">
                  <div class="right-oper">
                    <el-button type="primary" v-if="caseDetail.currentuser" @click="showadddialogVisible">添加减免申请</el-button>
                  </div>
                </div>
                <el-table
                  :data="reduceApplyList"
                  style="width: 100%"
                  border stripe
                  height="120px"
                  class="table-wrap">
                  <el-table-column
                    prop="reduceType"
                    show-overflow-tooltip
                    label="类型">
                  </el-table-column>
                  <el-table-column
                    prop="applyStatusMsg"
                    show-overflow-tooltip
                    label="处理状态">
                     <template slot-scope="scope">
         {{scope.row.applyStatus==0?"待审核":scope.row.applyStatus==1?"已审核":"已完成"}}
      </template>
                  </el-table-column>
                  <el-table-column
                    prop="applyStatusMsg"
                    show-overflow-tooltip
                    label="减免/报备状态">
                  </el-table-column>
                  <el-table-column
                    prop="applyTime"
                    show-overflow-tooltip
                    label="申请日期">
                  </el-table-column>
                  <el-table-column
                    prop="applyUser"
                    show-overflow-tooltip
                    label="申请人">
                  </el-table-column>
                  <el-table-column
                    prop="auditTime"
                    show-overflow-tooltip
                    label="审核日期">
                  </el-table-column>
                  <el-table-column
                    prop="createTime"
                    show-overflow-tooltip
                    label="提交日期">
                  </el-table-column>
                  <el-table-column
                    prop="completeTime"
                    show-overflow-tooltip
                    label="完成日期">
                  </el-table-column>
                  <el-table-column
                    prop="completeUser"
                    show-overflow-tooltip
                    label="完成人">
                  </el-table-column>
                  <el-table-column
                    prop="reduceResult"
                    show-overflow-tooltip
                    label="减免/报备结果">
                  </el-table-column>
                  <el-table-column
                    prop="user"
                    show-overflow-tooltip
                    label="是否报备">
                  </el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    width="120"
                    label="操作">
                     <template slot-scope="scope">
      <el-upload
        class="upload-demo"
        :action="action+'/reduce/save/import'"
        :headers="header"
        :show-file-list=false
        :data=fileNames
        :on-change="handleChange"
         :on-success="uploadSuccess2"
        >
        <el-button size="small" @click="moreId(scope.row.id)" type="text" >上传</el-button>
      </el-upload>
        <el-button type="text" size="small" @click="editData(scope.row)">修改</el-button>
        <el-button type="text" size="small" @click="deteleData(scope.row.id)">删除</el-button>
      </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="right-wrap">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>自定义信息</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="saveSelfInfo">保存</el-button>
              </div>
              <el-input type="textarea" :rows="8"  v-model="caseDetail.selfInfo"></el-input>
            </el-card>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="催记信息" name="5">
        <div class="memorize-wrap">
          <div class="left-panel">
            <el-form
              :model="batchForm"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="电话" prop="mobile" >
                <el-input v-model="batchForm.mobile"  placeholder="请输入电话号码"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="targetName">
                <el-input v-model="batchForm.targetName" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="关系" prop="relation">
                <el-input v-model="batchForm.relation" placeholder="请输入关系"></el-input>
              </el-form-item>
              <el-form-item label="谈判方式" prop="method">
                <el-select v-model="batchForm.method" placeholder="请选择谈判方式">
                  <el-option
                    v-for="item in tpfsList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="催收模板" prop="module">
                <el-select v-model="batchForm.module" placeholder="请选择催收模板">
                  <el-option
                    v-for="item in csmbList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="催收结果" prop="result">
                <el-select v-model="batchForm.result" placeholder="请选择催收结果">
                  <el-option
                    v-for="item in csjgList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="通话记录" prop="collectInfo" class="whole">
                <el-input
                  type="textarea"
                  :rows="4"
                  placeholder="请输入通话记录"
                  v-model="batchForm.collectInfo">
                </el-input>
              </el-form-item>
              <el-form-item label="催收状态" prop="collectStatus">
                <el-select v-model="batchForm.collectStatus" placeholder="请选择催收状态">
                  <el-option
                    v-for="item in csztList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label=" " prop="cszt">
                <el-checkbox v-model="batchForm.sType" :true-label='1' :false-label="0">更新批次共债案件催收状态</el-checkbox>
              </el-form-item>
              <el-form-item label="减免金额" prop="reduceAmt">
                <el-input v-model="batchForm.reduceAmt" placeholder="请输入减免金额"></el-input>
              </el-form-item>
              <el-form-item label="减免状态" prop="reduceStatus">
                <el-select v-model="batchForm.reduceStatus" placeholder="请选择减免状态">
                  <el-option
                    v-for="item in jmztList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="下次跟进日期" prop="nextFollDate">
                <el-date-picker
                  v-model="batchForm.nextFollDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择下次跟进日期"
                ></el-date-picker>
              </el-form-item>
            </el-form>
            <div class="operation">
              <el-button type="primary" @click="onClickSaveCollection">保存</el-button>
              <el-button @click="batchForm={sType:0}">清空</el-button>
            </div>
          </div>
          <div class="right-panel">
            <p class="title">同批次共债催记</p>
            <el-table
              :data="syncMemorizeList"
              style="width: 100%"
              border stripe
              class="table-wrap">
              <el-table-column prop="collectTime" width="120" label="时间" show-overflow-tooltip></el-table-column>
              <el-table-column prop="targetName" width="120" label="对象姓名" show-overflow-tooltip></el-table-column>
              <el-table-column prop="relation" width="120" label="关系" show-overflow-tooltip></el-table-column>
              <el-table-column prop="telPhone" width="120" label="电话/地址" show-overflow-tooltip></el-table-column>
              <el-table-column prop="collectInfo" label="催收记录" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-dialog
      title="新增/编辑电话"
      :visible.sync="dialogVisible"
      width="45%"
      append-to-body
      >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="formInline.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="关系">
          <el-input v-model="formInline.relation" placeholder="请输入关系"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formInline.tel" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="formInline.type" placeholder="请选择分类" clearable>
            <el-option
              v-for="item in PhonetypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id+''">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.telStatusMsg" placeholder="请选择状态" clearable>
            <el-option
              v-for="item in statusList"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" style="width: 90%;">
          <el-input type="textarea" v-model="formInline.remark" style="width: 180%;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveTel">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="新增/编辑地址"
      :visible.sync="dialogAddrVisible"
      width="45%"
      append-to-body
      class="addr-dialog-wrap"
      >
      <el-form :inline="true" :model="addressInfo" class="address-form" label-width="50px">
        <el-form-item label="姓名">
          <el-input v-model="addressInfo.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="关系">
          <el-input v-model="addressInfo.relation" placeholder="请输入关系"></el-input>
        </el-form-item>
        <el-form-item label="地址" class="whole">
          <el-input v-model="addressInfo.address" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="addressInfo.type" placeholder="请选择分类" clearable>
            <el-option key="1" label="单位地址" value="单位地址"></el-option>
            <el-option key="2" label="家庭地址" value="家庭地址"></el-option>
            <el-option key="3" label="对账单地址" value="对账单地址"></el-option>
            <el-option key="4" label="户籍地址" value="户籍地址"></el-option>
            <el-option key="5" label="其他地址" value="其他地址"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="addressInfo.status" placeholder="请选择状态" clearable>
            <el-option
              v-for="item in statusList"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" class="whole">
          <el-input type="textarea" v-model="addressInfo.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddrVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAddr">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加辅助催记"
      :visible.sync="dialogDataCollectVisible"
      width="45%"
      append-to-body
      class="addr-dialog-wrap"
      >
      <el-form :inline="true" :model="dataCollectInfo" class="address-form" label-width="100px">
        <el-form-item label="催收措施">
          <el-select v-model="dataCollectInfo.measure" placeholder="请选择催收措施" clearable>
            <el-option :key="1" label="电话催收" value="电话催收"></el-option>
            <el-option :key="2" label="信函" value="信函"></el-option>
            <el-option :key="3" label="辅助渠道" value="辅助渠道"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="dataCollectInfo.mobile" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="dataCollectInfo.targetName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="dataCollectInfo.telType" placeholder="请选择类型" clearable>
            <el-option
              v-for="item in PhonetypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id+''">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关系">
          <el-input v-model="dataCollectInfo.relation" placeholder="请输入关系"></el-input>
        </el-form-item>
        <el-form-item label="催收内容" class="whole">
          <el-input type="textarea" :row="4" v-model="dataCollectInfo.collectInfo"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDataCollectVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveDataCollect">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="新建案人数据"
      :visible.sync="dialogArchiveVisible"
      width="45%"
      append-to-body
      class="addr-dialog-wrap"
      >
      <el-form :inline="true" :model="archiveInfo" class="address-form" label-width="100px">
        <el-form-item label="证件号" class="whole">
          <el-input v-model="archiveInfo.identNo" placeholder="请输入证件号"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="archiveInfo.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="信息类型" >
          <el-input v-model="archiveInfo.msgType" placeholder="请输入信息类型"></el-input>
        </el-form-item>
        <el-form-item label="信息内容" class="whole">
          <el-input type="textarea" :row='4' v-model="archiveInfo.msgContext"></el-input>
        </el-form-item>
        <el-form-item label="备注" class="whole">
          <el-input type="textarea" :row='4' v-model="archiveInfo.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogArchiveVisible = false">取 消</el-button>
        <el-button type="primary" @click="_saveArchive">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="申请信函"
      :visible.sync="dialogLetterVisible"
      width="45%"
      append-to-body
      class="addr-dialog-wrap"
      >
      <el-form :inline="true" :model="letterInfo" class="address-form" label-width="80px">
        <el-form-item label="地址" class="whole">
          <el-input :disabled="true" v-model="letterInfo.address" placeholder="请输入关系"></el-input>
        </el-form-item>
        <el-form-item label="模板">
          <el-select v-model="letterInfo.module" placeholder="请选择状态" clearable>
            <el-option
              v-for="item in csmbList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="期次">
          <el-input :disabled="true" v-model="letterInfo.periods"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="letterInfo.relationer" placeholder="请输入联系人"></el-input>
        </el-form-item>
        <el-form-item label="申请内容" class="whole">
          <el-input type="textarea" v-model="letterInfo.applyContext"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogLetterVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveApplyLetter">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
  title="添加减免申请"
  :visible.sync="adddialogVisible"
  width="60%"
  append-to-body
 >
 <el-form :inline="true" :model="messageForm" ref="messageForm" label-width="130px" class="demo-dynamic">
	<el-row :gutter="24">
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  	<el-form-item label="还款人姓名"	>
  		
    <el-input v-model="messageForm.payer" placeholder="请输入姓名" clearable></el-input>
  </el-form-item>
  </div>
  </el-col>
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  		<el-form-item label="关系"
  			
  			>
        <el-input v-model="messageForm.relation" placeholder="请输入关系" clearable></el-input>
  </el-form-item>
  		
  	</div>
  </el-col>
</el-row>
	<el-row :gutter="24">
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  	<el-form-item label="联系方式"	
  			>
    <el-input v-model="messageForm.contactWay" placeholder="请输入联系方式" clearable></el-input>
  </el-form-item>
  </div>
  </el-col>
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  		<el-form-item>
  			<el-select v-model="messageForm.batchStatus" placeholder="请选择" clearable>
        <el-option
          v-for="item in caseDetail.dataCaseTelEntityList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      </el-form-item>
  	</div>
  </el-col>
</el-row>
<el-row :gutter="24">
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  	<el-form-item label="性 别" >
  		  <el-radio-group v-model="messageForm.sex">
      <el-radio label="男"></el-radio>
      <el-radio label="女"></el-radio>
    </el-radio-group>
  </el-form-item>	
  	</div>
  </el-col>
    <el-col :span="12">
  	<div class="grid-content bg-purple">
  	<el-form-item label="年 龄"	
  			>
    <el-input v-model="messageForm.age" placeholder="请输入年龄" clearable></el-input>
  </el-form-item>
  </div>
  </el-col>
</el-row>
<el-row :gutter="24">
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  	<el-form-item label="是否外访" >
  		  <el-radio-group v-model="messageForm.visitFlag">
      <el-radio label="0">是</el-radio>
      <el-radio label="1">否</el-radio>
    </el-radio-group>
  </el-form-item>	
  	</div>
  </el-col>
    <el-col :span="12">
  	<div class="grid-content bg-purple">
  	<el-form-item label="是否共债" >
  		  <el-radio-group v-model="messageForm.joinFlag">
          <el-radio label="0">是</el-radio>
      <el-radio label="1">否</el-radio>
    </el-radio-group>
  </el-form-item>	
  	</div>
  </el-col>
</el-row>
	<el-row :gutter="24">
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  	<el-form-item label="是否可联"	
  		>
    <el-input v-model="messageForm.connectFlag" placeholder="请输入联系方式" clearable></el-input>
  </el-form-item>
  </div>
  </el-col>
   <el-col :span="12">
  	<div class="grid-content bg-purple">
  	<el-form-item label="已还款"	
  		>
    <el-input v-model="messageForm.enRepayAmt" placeholder="请输入联系方式" clearable></el-input>
  </el-form-item>
  </div>
  </el-col>
</el-row>

<el-row :gutter="24">
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  	<el-form-item label="承诺还款"	
  		>
    <el-input v-model="messageForm.repayAmt" placeholder="请输入还款金额" clearable></el-input>
  </el-form-item>
  </div>
  </el-col>
   <el-col :span="12">
  	<div class="grid-content bg-purple">
  	<el-form-item label="承诺还款日期"	
  		>
  		 <div class="block">
    <el-date-picker
      v-model="messageForm.repayTime"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </div>
  </el-form-item>
  </div>
  </el-col>
</el-row>

<el-row :gutter="24">
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  	<el-form-item label="减免原因"	
  		>
    <el-input v-model="messageForm.reduceReason" placeholder="请输入减免原因" clearable></el-input>
  </el-form-item>
  </div>
  </el-col>
   <el-col :span="12">
  	<div class="grid-content bg-purple">
  	<el-form-item label="减免材料"	
  		>
  		    <el-input v-model="messageForm.reduceData" placeholder="请输入减免材料" clearable></el-input>
  </el-form-item>
  </div>
  </el-col>
</el-row>

<el-row :gutter="24">
  <el-col :span="24">
  <el-form-item label="备注" >
    <el-input type="textarea" v-model="messageForm.remark" style="width: 200%;">></el-input>
  </el-form-item>
   </el-col>
</el-row>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="adddialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="saveData">确 定</el-button>
  </span>
</el-dialog>
    <el-dialog
      class="addr-dialog-wrap dialog-wrap"
      title="申请诉讼"
      :visible.sync="ligigationVisible"
      width="60%"
      append-to-body>
          <el-form :inline="true" :model="legalForm" class="address-form" label-width="150px">
              <el-form-item label="姓名">
                <el-input v-model="legalForm.cstName" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="案件状态">
                <el-select v-model="legalForm.legalStatus" filterable  placeholder="请选择案件状态" clearable>
                  <el-option
                    v-for="item in legalStatusMsgList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="证件号">
                <el-input v-model="legalForm.identNo" placeholder="请输入证件号"></el-input>
              </el-form-item>
              <el-form-item label="办案进度">
                <el-select v-model="legalForm.progress" filterable  placeholder="请选择案件进度" clearable>
                  <el-option
                    v-for="item in progressList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="案件类型">
                <el-select v-model="legalForm.legalType" filterable  placeholder="请选择案件类型" clearable>
                  <el-option
                    v-for="item in caseStatusList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="标的">
                <el-input v-model="legalForm.tital" placeholder="请输入标的"></el-input>
              </el-form-item>
              <el-form-item label="委托人">
                <el-input v-model="legalForm.clientele" placeholder="请输入委托人"></el-input>
              </el-form-item>
              <el-form-item label="所属人">
                <el-select v-model="legalForm.owner" filterable  placeholder="请选择所属人" clearable>
                  <el-option
                    v-for="item in PersonDataList"
                    :key="item.id"
                    :label="item.userName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="被告人">
                <el-input v-model="legalForm.accused" placeholder="请输入被告人"></el-input>
              </el-form-item>
              <el-form-item label="代理律师">
                <el-input v-model="legalForm.agent" placeholder="请输入代理律师"></el-input>
              </el-form-item>
              <el-form-item label="律师联系方式">
                <el-input v-model="legalForm.agentTel" placeholder="请输入联系方式"></el-input>
              </el-form-item>
              <el-form-item label="费用">
                <el-input v-model="legalForm.cost" placeholder="请输入费用"></el-input>
              </el-form-item>
              <el-form-item label="委案日期">
                  <el-date-picker
                    v-model="legalForm.legalDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="受案日期">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="legalForm.filingDat"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="受案法院">
                <el-input v-model="legalForm.court" placeholder="请输入法院"></el-input>
              </el-form-item>
              <el-form-item label="办案法官">
                <el-input v-model="legalForm.judge" placeholder="请输入办案法官"></el-input>
              </el-form-item>
              <el-form-item label="法官联系方式">
                <el-input v-model="legalForm.judgeTel" placeholder="请输入联系方式"></el-input>
              </el-form-item>
              <el-form-item label="案号">
                <el-input v-model="legalForm.legalNo" placeholder="请输入案号"></el-input>
              </el-form-item>
              <el-form-item label="首次开庭日期">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="legalForm.firstDate"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="判决日期">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="legalForm.judgeDate"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="申请执行案号">
                <el-input v-model="legalForm.exeNo" placeholder="请输入案号"></el-input>
              </el-form-item>
              <el-form-item label="申请执行日期">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="legalForm.exeDate"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="执行终结日期">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="legalForm.exeEndDate"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="诉讼缴费日期">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="legalForm.costDate"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="保全缴费日期">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="legalForm.preservationDate"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="保全资产清单" class="whole">
                <el-input type="textarea"  v-model="legalForm.preservationList"></el-input>
              </el-form-item>
              <el-form-item label="送达情况" class="whole">
                <el-input v-model="legalForm.arriveInfo"  placeholder="请输入送达情况"></el-input>
              </el-form-item>
              <el-form-item label="判决书"  class="whole">
                <el-input type="textarea"  v-model="legalForm.judgment"></el-input>
              </el-form-item>
              <el-form-item label="备  注"  class="whole">
                <el-input type="textarea"  v-model="legalForm.remark"></el-input>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="ligigationVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveLegal">确 定</el-button>
          </span>
    </el-dialog>

    <el-dialog
      title="申请协催(带*为必填字段)"
      :visible.sync="dialogSyergyAplVisible"
      width="30%"
      append-to-body
      class="addr-dialog-wrap"
    >
      <el-form :inline="true" :model="synergyInfo" class="address-form" label-width="80px">
        <el-form-item label="协催类型" class="whole">
          <el-select v-model="synergyInfo.synergisticType" placeholder="请选择协催类型" clearable style="width:70%">
            <el-option
              v-for="item in synergyTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请内容" class="whole">
          <el-input type="textarea" :rows="7" v-model="synergyInfo.applyContent" style="width:100%"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogSyergyAplVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveSynergyApply">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="添加协催记录(带*为必填字段)"
      :visible.sync="dialogSyergyResultVisible"
      width="35%"
      append-to-body
      class="addr-dialog-wrap"
    >
      <el-form :inline="true" :model="synergyInfo" ref="synergyInfo"  class="address-form" label-width="80px">
        <el-form-item label="协催类型"
        	prop="synergisticType"
 		:rules="{
     required: true, message: '请选择', trigger: 'change' 
    }">
          <el-select v-model="synergyInfo.synergisticType" placeholder="请选择协催类型" clearable style="width:70%">
            <el-option
              v-for="item in synergyTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="协催人"
        prop="synergisticUser"
 		:rules="{
     required: true, message: '请选择', trigger: 'change' 
    }">
        	<el-select v-model="synergyInfo.synergisticUser" filterable placeholder="请选择协催类型" clearable style="width:70%">
            <el-option
              v-for="item in PersonDataList"
              :key="item.id"
              :label="item.userName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="协催结果" class="whole">
          <el-input type="textarea" :rows="7" v-model="synergyInfo.synergisticResult" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogSyergyResultVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveSynergyResult('synergyInfo')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getCaseDetail,
	
        getSameBatchCollect,
        getAddressDetail,
        getLetterList,
        getArchiveDetail,
        getCollectDetail,
        PhonetypeList,
        getCommentDetail,getInterestDetail,getSynergyDetail,
        getSameBatchCase,
        updateRemark,
        saveCaseTel,
        getTelList,
        delTel,
        updateTelStatus,
        addComment,
        listComment,
        addBatchCaseTel,
        saveCaseAddress,
        delAddr,
        updateAddrStatus,
        synchroSameTel,
        pageDataLog,updateDataLog,delDataLog,
        sameCaseList,
        dataCollectionSave,
        addLetter,
        getReduceApplyList,
        pageDataFile,
        getSynergyTypeList,
        getLegalList,
        saveLegal,
        saveApply,
        saveResult,
        detailTelCurrentCollect,
        updateDataComment,
        delDataComment,
        PersonList,
        AddtableList,
        DeteleData,
        saveArchive,
        getHistoryAddrList,
        expDataCollect,
        saveDataCollectDetail,
        } from '@/common/js/api-detail'
import {getEnum} from '@/common/js/api-sync'
	  import {baseURL} from '@/common/js/request.js';

export default {
  name:'caseDetail',
  // props:{
  //   id:{
  //     type: Number,
  //     default: -1
  //   }
  // },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    id(){
      return this.$route.query.id
    }
},
  data() {
    return {
    	action:baseURL,
    	messageForm:{},
    	adddialogVisible:false,
      addCommentVisible:false,
      commentAddContent:null,
      commentAddColor:"黑",
      dialogVisible:false,
      letterVisible:false,
      letterVisible2:true,
      dialogSyergyAplVisible:false,
      dialogSyergyResultVisible:false,
    	formInline:{},
      legalForm:{},
      synergyTypeList:[],
      PhonetypeList:[],
      syncMemorizeList:[],
      memorizeList:[],//催記
      commentList:[],//评语
      addrList:[],//地址
      progressList:[{name:"判决",id:1},{name:"收案",id:2}],
      PersonDataList:[],
      legalStatusMsgList:[{name:"已审核",id:1},{name:"审核中",id:2},{name:"未申请",id:0}],
      caseStatusList:[{name:"未退案",id:0},{name:"正常",id:1},{name:"暂停",id:2},{name:"关档",id:3},{name:"退档",id:4},{name:"全部",id:5}],
      letterList:[],//信函记录
      dataList:[],//案人信息
      rateUpdateList:[],//利息
      syncList:[],//协催
      dependCase:[],//同批次公债案件
      activeNames: ['1','2','3','4','5'],
      otherActiveName:'1',
      caseDetail:{currentuser:true},
      ligigationVisible:false,
      memorizeType:1,
      statusList:[{name:"有效",id:1,},{name:"无效",id:2,},{name:"未知",id:3,}],
      phoneSelectList: [],
      batchForm:{sType:0},
      tpfsList:[],
      csmbList:[],
      csjgList:[],
      csztList:[],
      jmztList:[],
      batchAddTelVisible:false,
      batchAddTelContent: null,
      dialogAddrVisible: false,
      addressInfo:{},
      synergyInfo:{},
      addrSelectList:[],
      logType:'',
      logList:[],
      caseSameList:[],
      dialogLetterVisible:false,
      letterInfo:{},
      syncType:1,
      reduceApplyList:[],
      uploadVisible:false,
      uploadFileList:[],
      header:{Authorization:localStorage.token},
      legalList:[],
      currentRow:{},
        header:{Authorization:localStorage.token},
        archiveInfo:{},
        dialogArchiveVisible:false,
        dataCollectInfo:{},
        dialogDataCollectVisible:false,
        fileNames:{file:'',caseId:'',id:''}
    }
  },
  methods: {
  	handleChange(file){
		this.fileNames.file=file.name
  	this.fileNames.caseId=this.id
  	},
  	moreId(id){
  				this.fileNames.id=id

  	},
    showSynergyApply(){
      getSynergyTypeList().then(data => {
        this.synergyTypeList = data
      })
      this.dialogSyergyAplVisible = true;
    },
    showSynergyResult(){
      getSynergyTypeList().then(data => {
        this.synergyTypeList = data
      })
      this.dialogSyergyResultVisible = true;
    },
    saveSynergyApply(){
      this.synergyInfo.caseId = this.id
      saveApply(this.synergyInfo).then(data=>{
        this.dialogSyergyAplVisible = false;
        getSynergyDetail(this.id).then(data => {
          this.syncList = data.list
        })
      })

    },
     saveSynergyResult(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.synergyInfo.caseId = this.id
      saveResult(this.synergyInfo).then(data=>{
        this.dialogSyergyResultVisible = false;
        getSynergyDetail(this.id).then(data => {
          this.syncList = data.list
        })
      })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
//  saveSynergyResult(formName){
//  	
//  	this.$refs[formName].validate((valid) => {
//        if (valid) {
//       this.synergyInfo.caseId = this.id
//    saveResult(this.synergyInfo).then(data=>{
//      this.dialogSyergyResultVisible = false;
//      getSynergyDetail(this.id).then(data => {
//        this.syncList = data.list
//      })
//    })
//        } else {
//          console.log('error submit!!');
//          return false;
//        }
//      });
//   
//
//  },
    _expDataCollect(){
      expDataCollect([{id:this.id}]).then(()=>{
        this.$message({
          type: 'success',
          message: '导出成功'
        });
      })
    },
  	showadddialogVisible(){
  		this.adddialogVisible=true;
  		this.messageForm={}
  	},
  	editData(row){
  		console.log(row)
  		this.adddialogVisible=true;
  		this.messageForm=row;
  		getReduceApplyList(this.id).then(data=>{
          this.reduceApplyList = data.list
        })
  	},
    saveLegal(){
      this.legalForm.caseId = this.id;
      saveLegal(this.legalForm).then(data=>{
        this.$message({
          type: 'success',
          message: '申请成功'
        });
        this.ligigationVisible = false;
        getLegalList(this.id).then(data=>{
          this.legalList = data
        })
      })
    },
  	deteleData(id){
  		DeteleData(id).then((response)=>{
        this.$message({
          type: 'success',
          message: '删除成功'
        });
        getReduceApplyList(this.id).then(data=>{
          this.reduceApplyList = data.list
        })
})
  	},
  	saveData(){
AddtableList(this.id,this.messageForm).then((response)=>{
  this.$message({
    type: 'success',
    message: '操作成功'
  });
 this.adddialogVisible=false
 this.messageForm={}
 getReduceApplyList(this.id).then(data=>{
          this.reduceApplyList = data.list
        })
})
    },
    showHistoryAddr(row){
      this.$set(row, 'showHistory', true)
      getHistoryAddrList(row.id).then((data)=>{
        this.$set(row, 'history', data)
      })
    },
    showHistoryTel(row){
      this.$set(row, 'historyType', 1)
      this.$set(row, 'showHistory', true)
      this.currentRow = row
      this.getHistoryTel(1)
    },
    
    getHistoryTel(val){
      detailTelCurrentCollect({
        caseId: this.id,
        detailType: val,
        mobile: this.currentRow.tel
      }).then(data =>{
        this.$set(this.currentRow, 'history', data)
      })
    },
    uploadSuccess(res,file,fileList){
      if (res.code ==100){
  		    this.$message({
            type: 'success',
            message: res.msg
          });
           pageDataFile(this.id).then((response)=>{
            this.uploadFileList=response
          })
      }else{
        this.$message({
          type: 'error',
          message: res.msg
        });
      }
  	},
  	 uploadSuccess2(res,file,fileList){
      if (res.code ==100){
  		    this.$message({
            type: 'success',
            message: res.msg
         });
      }else{
        this.$message({
          type: 'error',
          message: res.msg
        });
      }
  	},
    logTypeChange(val){
      pageDataLog({
          caseId: this.id,
          type:val
        }).then(data=>{
          this.logList = data
        })
    },
    syncTypeChange(val){
      let applyStatus;
      let finishStatus;
      if (val==1){

      }else if (val==2){
        applyStatus = 0
        finishStatus = 0
      }else if (val==3){
        applyStatus = 1
        finishStatus = 0
      }else if(val==4){
        applyStatus = 1
        finishStatus = 1
      }else if(val==5){
        applyStatus = -1
      }
      getSynergyDetail(this.id,applyStatus,finishStatus).then(data => {
        this.syncList = data.list
      })
    },
    memorizeTypeChange(val){
      let batchNo = this.caseDetail.batchNo;
      let identNo = this.caseDetail.identNo;
      let cardNo = this.caseDetail.cardNo;
      getCollectDetail(this.id,batchNo,identNo,cardNo,val).then(data => {
        this.memorizeList = data
      })
    },

    onClickSaveCollection(){
      this.batchForm.caseId = this.id
      dataCollectionSave(this.batchForm).then((data)=>{
        this.$message({
          type: 'success',
          message: '新增催收记录成功'
        });
        let batchNo = this.caseDetail.batchNo;
        let identNo = this.caseDetail.identNo;
        let cardNo = this.caseDetail.cardNo;
        getCollectDetail(this.id,batchNo,identNo,cardNo,1).then(data => {
          this.memorizeList = data
        })
      })
    },
    _deleteLog(id){
      this.$confirm('此操作将删除该操作记录且无法恢复,是否继续？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delDataLog(id).then(res=>{
            pageDataLog({caseId:this.id, type:this.logType}).then(data=>{
              this.logList = data
            })
            this.$message({
              type: 'success',
              message: '操作记录删除成功'
            });
          })
        }).catch(() => {
          
        });
    },
    _deleteComment(id){
      this.$confirm('此操作将删除该评语且无法恢复,是否继续？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delDataComment(id).then(res=>{
            getCommentDetail(this.id).then(data => {
              this.commentList = data
            })
            this.$message({
              type: 'success',
              message: '评语删除成功'
            });

          })
        }).catch(() => {
          
        });
    },
    editLog(row){
      this.editLogRow = row
      this.$set(row, 'editContext', row.context)
      this.$set(row, 'editLogVisible', true)
    },
    editComment(row){
      this.editCommentRow = row
      this.$set(row, 'editContext', row.comment)
      this.$set(row, 'editCommentVisible', true)
    },
    onClickSaveLog(){
      updateDataLog({
        id: this.editLogRow.id,
        context: this.editLogRow.editContext
      }).then(res =>{
        pageDataLog({caseId:this.id, type:this.logType}).then(data=>{
          this.logList = data
        })
        this.$message({
          type: 'success',
          message: '操作记录修改成功'
        });
      })
    },
    onClickSaveComment(){
      updateDataComment({
        id: this.editCommentRow.id,
        comment: this.editCommentRow.editContext
      }).then(res =>{
        getCommentDetail(this.id).then(data => {
          this.$message({
            type: 'success',
            message: '评语修改成功'
          });
          this.commentList = data
          // this.$set(this.editCommentRow,'editCommentVisible',false)
        })
      })
    },
    saveSelfInfo(){
      updateRemark({
        id: this.id,
        remark: this.caseDetail.selfInfo
      }).then(res=>{
        this.$message({
          type: 'success',
          message: '修改自定义信息成功'
        });
      })
    },
    applyLetter(row){
      // letterCount
      this.letterInfo = {
        caseId: this.id,
        addressId: row.id,
        periods: row.letterCount + 1,
        address: row.address
      }
      this.dialogLetterVisible = true
    },
    saveApplyLetter(){
      addLetter(this.letterInfo).then(data=>{
        getAddressDetail(this.id).then(data=>{
          this.addrList = data
        })
        this.$message({
          type: 'success',
          message: '信函申请提交成功'
        });
        this.dialogLetterVisible = false
      })
    },

    showLetterList(){
      getLetterList(this.id).then(data=>{
        this.letterList = data;
        this.letterVisible2 = false;
        this.letterVisible = true;
      })
    },
    saveDataCollect(){
      let result = this.dataCollectInfo
      result.caseId = this.id
      if(this.dataCollectEditType === 'add'){
        result.id = 0
      }
      saveDataCollectDetail(result).then(res=>{
        if(this.dataCollectEditType === 'add'){
          getCollectDetail(this.id,this.memorizeType).then(data => {
            this.memorizeList = data
          })
          this.$message({
            type: 'success',
            message: '新增辅助催记成功'
          });
        }else{
          getCollectDetail(this.id,this.memorizeType).then(data => {
            this.memorizeList = data
          })
          this.$message({
            type: 'success',
            message: '修改辅助催记成功'
          });
        }
        this.dialogDataCollectVisible = false
      })
    },
    editDataCollect(row, index){
      this.dataCollectInfo = {...row}
      this.dataCollectEditType = 'edit'
      this.dialogDataCollectVisible = true
    },
    addDataCollect(){
      this.dataCollectInfo = {}
      this.dataCollectEditType = 'add'
  		this.dialogDataCollectVisible=true
    },
    saveAddr(){
      let result = this.addressInfo
      result.caseId = this.id
      if(this.addrEditType === 'add'){
        result.id = 0
      }
      saveCaseAddress(result).then(res=>{
        if(this.addrEditType === 'add'){
          // this.caseDetail.dataCaseTelEntityList.push(res)
          getAddressDetail(this.id).then(data=>{
            this.addrList = data
          })
          this.$message({
            type: 'success',
            message: '新增地址成功'
          });
        }else{
          getAddressDetail(this.id).then(data=>{
            this.addrList = data
          })
          this.$message({
            type: 'success',
            message: '修改地址成功'
          });
        }
        this.dialogAddrVisible = false
      })
    },
    addAddr(){
      this.addressInfo = {}
      this.addrEditType = 'add'
  		this.dialogAddrVisible=true
    },
    editAddr(addr, index){
      this.addressInfo = {...addr}
      this.addrEditType = 'edit'
      this.dialogAddrVisible = true
    },
    showAllAddr(){
      getAddressDetail(this.id).then(data=>{
        this.addrList = data

      })
    },
    saveAddr(){
      let result = this.addressInfo
      result.caseId = this.id
      if(this.addrEditType === 'add'){
        result.id = 0
      }
      saveCaseAddress(result).then(res=>{
        if(this.addrEditType === 'add'){
          // this.caseDetail.dataCaseTelEntityList.push(res)
          getAddressDetail(this.id).then(data=>{
            this.addrList = data
          })
          this.$message({
            type: 'success',
            message: '新增地址成功'
          });
        }else{
          getAddressDetail(this.id).then(data=>{
            this.addrList = data
          })
          this.$message({
            type: 'success',
            message: '修改地址成功'
          });
        }
        this.dialogAddrVisible = false
      })
    },
    deleteAddr(id){
      this.$confirm('此操作将删除该地址且无法恢复,是否继续？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delAddr(id).then(res=>{
            getAddressDetail(this.id).then(data=>{
               this.addrList = data
            })
            this.$message({
              type: 'success',
              message: '删除地址成功'
            });
          })
        }).catch(() => {
          
        });
    },
    changeAddrStatus(status){
      if(!this.addrSelectList.length){
        this.$message('请勾选需要修改的地址')
        return
      }

      this.$confirm('确认修改地址状态？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        const data = this.addrSelectList.map(item => {
          return {
            id: item.id,
            status: status
          }
        })
        updateAddrStatus(data).then(()=>{
          getAddressDetail(this.id).then(data=>{
            this.addrList = data
          })
          this.$message({
            type: 'success',
            message: '地址状态修改成功'
          });
        })
      }).catch(()=>{})
    },
    onClickAddArchive(){
      this.archiveInfo = {}
  		this.dialogArchiveVisible=true
    },
    _saveArchive(){
      let result = this.archiveInfo
      result.caseId = this.id
      saveArchive(result).then(res=>{
        this.$message({
          type: 'success',
          message: '新增案人数据成功'
        });
        getArchiveDetail(this.id).then(data => {
          this.dataList = data
        })
        this.dialogArchiveVisible = false
      })
    },
    showAllTel(){
      getTelList(this.id).then(data=>{
        this.$set(this.caseDetail,'dataCaseTelEntityList',data)
      })
    },
    saveTel(){
      let result = this.formInline
      result.caseId = this.id
      if(this.phoneEditType === 'add'){
        result.id = 0
      }
      saveCaseTel(result).then(res=>{
        if(this.phoneEditType === 'add'){
          // this.caseDetail.dataCaseTelEntityList.push(res)
          getTelList(this.id).then(data=>{
            this.$set(this.caseDetail,'dataCaseTelEntityList',data)
          })
          this.$message({
            type: 'success',
            message: '新增电话成功'
          });
        }else{
          getTelList(this.id).then(data=>{
            this.$set(this.caseDetail,'dataCaseTelEntityList',data)
          })
          this.$message({
            type: 'success',
            message: '修改电话成功'
          });
        }
        this.dialogVisible = false
      })
    },
  	addPhone(){
      this.formInline = {}
      this.phoneEditType = 'add'
  		this.dialogVisible=true
    },
    editPhone(phone, index){
      this.formInline = {...phone}
      this.phoneEditType = 'edit'
      this.dialogVisible = true
    },
    deleteTel(id){
      this.$confirm('此操作将删除该电话且无法恢复,是否继续？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delTel(id).then(res=>{
            getTelList(this.id).then(data=>{
              this.$set(this.caseDetail,'dataCaseTelEntityList',data)
            })
            this.$message({
              type: 'success',
              message: '删除电话成功'
            });
          })
        }).catch(() => {
          
        });
    },
    _synchroSameTel(){
      this.$confirm('确认同步共债？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          synchroSameTel(this.id).then(res=>{
            this.$message({
              type: 'success',
              message: '同步共债成功'
            });
          })
        }).catch(() => {
          
        });
    },
    changePhoneStatus(status){
      if(!this.phoneSelectList.length){
        this.$message('请勾选需要修改的电话号码')
        return
      }

      this.$confirm('确认修改电话状态？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        const data = this.phoneSelectList.map(item => {
          return {
            id: item.id,
            telStatusMsg: status
          }
        })
        updateTelStatus(data).then(()=>{
          getTelList(this.id).then(data=>{
            this.$set(this.caseDetail,'dataCaseTelEntityList',data)
          })
          this.$message({
            type: 'success',
            message: '电话状态修改成功'
          });
        })
      }).catch(()=>{})
    },
    stopTel(id){
      this.$confirm('确认停止跟进该电话？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateTelStatus([{
            id,
            telStatusMsg:'停止跟进'
          }]).then(res=>{
            getTelList(this.id).then(data=>{
              this.$set(this.caseDetail,'dataCaseTelEntityList',data)
            })
            this.$message('该电话已停止跟进')
          })
        }).catch(() => {
          
        });
    },
    onClickAddComment(){
      if(!this.commentAddContent){
        this.$message('请输入评语内容')
        return
      }
      addComment([{
        id: this.id,
        comment: this.commentAddContent,
        color: this.commentAddColor
      }]).then(res => {
        this.$message({
          type: 'success',
          message: '评语添加成功'
        });
        getCommentDetail(this.id).then(data => {
          this.commentList = data
          this.addCommentVisible = false
          this.commentAddContent = "";
          this.commentAddColor = '黑'
        })
      })
    },
    litigationApply(){
  	    this.ligigationVisible=true;
        PersonList().then((response)=>{
          this.PersonDataList=response
        })
    },
    onClickBatchAddTel(){
      if(!this.batchAddTelContent){
        this.$message('请输入评语内容')
        return
      }
      addBatchCaseTel({
        caseId: this.id,
        remark: this.batchAddTelContent
      }).then(res => {
        this.$message({
          type: 'success',
          message: '电话添加成功'
        });
        getTelList(this.id).then(data=>{
          this.$set(this.caseDetail,'dataCaseTelEntityList',data)
          this.batchAddTelContent = null
          this.batchAddTelVisible = false
        })
      })
    },
    queryDetail(){
      this.otherActiveName = '1'
      getCaseDetail(this.id).then(data => {
        this.caseDetail = data
      })
      getSameBatchCollect(this.id).then(data => {
        this.syncMemorizeList = data
      })
      getSameBatchCase(this.id).then(data => {
        this.dependCase = data
      })
      getCommentDetail(this.id).then(data => {
        this.commentList = data
      })
      getEnum('谈判方式').then(data=>{
        this.tpfsList = data
      })
      getEnum('催收模板').then(data=>{
        this.csmbList = data
      })
      getEnum('催收结果').then(data=>{
        this.csjgList = data
      })
      getEnum('催收状态').then(data=>{
        this.csztList = data
      })
      getEnum('减免状态').then(data=>{
        this.jmztList = data
      })
      getEnum('电话类型').then(data=>{
        this.PhonetypeList = data
      })
      pageDataFile(this.id).then((response)=>{
        this.uploadFileList=response
      })
    },
    showPanel(tab,e){
      console.log(tab)
      console.log(e)
      var ind = tab.label;
      if (ind == '地址'){
        getAddressDetail(this.id).then(data => {
          this.addrList = data
          this.letterVisible = false;
          this.letterVisible2 = true;
        })
      }else if (ind == '案人数据'){
        getArchiveDetail(this.id).then(data => {
          this.dataList = data
        })
      }else if(ind == '催记'){//催記
        this.memorizeType = 1
        getCollectDetail(this.id,1).then(data => {
          console.info(data)
          this.memorizeList = data
        })
      }else if (ind == '评语'){//评语
        getCommentDetail(this.id).then(data => {
          this.commentList = data
        })
      }else if (ind == '利息更新'){//利息
        getInterestDetail(this.id).then(data => {
          this.rateUpdateList = data
        })
      }else if (ind == '协催'){//协催
        this.syncType = 1
        getSynergyDetail(this.id).then(data => {
          this.syncList = data.list
        })
      }else if(ind == '共债案件'){//共债案件
        sameCaseList(this.id).then(data=>{
          this.caseSameList = data
        })
      }else if(ind == '操作记录'){//操作记录
        this.logType = ''
        pageDataLog({
          caseId: this.id,
          type:''
        }).then(data=>{
          this.logList = data
        })
      }else if(ind == '诉讼案件'){//诉讼案件
        getLegalList(this.id).then(data=>{
          this.legalList = data
        })
      }else if(ind == '减免管理'){//减免管理
        getReduceApplyList(this.id).then(data=>{
          this.reduceApplyList = data.list
        })
      }
    },
    onSelectPhoneRow(val){
      this.phoneSelectList = val
    },
    onSelectAddrRow(val){
      this.addrSelectList = val
    },
    telTableRowClassName({row, rowIndex}){
      if(row.telStatusMsg === '停止跟进'){
        return 'stop-row'
      }
    },
  },
  /*watch: {
    '$route' (to, from) {
      // console.log(this.getStatus(this.$route.path))
      this.queryDetail()
    }
  },*/
  created() {
  	this.queryDetail()
    this.batchForm = {sType:0}
     PersonList().then((response)=>{
          this.PersonDataList=response
        })
  }
}
</script>

<style lang="scss">
#case-detail{
  .items-wrap{
    padding: 24px 24px 24px 0;
    background: #fafafa;
    .rule-form{
      display: flex;
      flex-wrap: wrap;
      .el-form-item {
        margin-bottom: 8px;
        display: flex;
        width: 25%;
        &.half{
          width: 50%;
        }
        &.whole{
          width: 100%;
        }
        &.width-75{
          width: 75%;
        }
        .el-form-item__content {
          flex: 1;
          margin-left: 0 !important;
          .el-date-editor{
            width: 100%;
          }
          .el-select {
            width: 100%;
          }
        }
        .content-wrap{
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          .comments-wrap{
            margin-left: 12px;
            flex:1;
            border: 1px solid #dcdfe6;
            background: #fff;
            border-radius: 5px;
            padding: 8px;
            .item{
              margin-bottom: 4px;
              line-height: 1;
              color: #000;
              &.blue{
                color: #409eff;
              }
              &.red{
                color: red;
              }
              &:last-child{
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }
  .other-wrap{
    margin-top: 24px;
    display: flex;
    align-items: flex-start;
    .left-wrap{
      flex:1;
      overflow: hidden;
      .el-tabs{
        .el-tabs__item{
          padding: 0 8px;
        }
        .tabs-wrap{
          .operation{
            margin-bottom: 12px;
            display: flex;
            justify-content: space-between;
          }
          &.billing-wrap{
            display: flex;
            .first{
              width: 35%;
            }
            .second{
              margin-left: 12px;
              flex:1;
            }
          }
        }
      }
    }
    .right-wrap{
      width: 250px;
      margin-left: 20px;
      .el-card{
        .el-card__header{
          padding: 10px;
        }
        .el-card__body{
          padding: 10px;
        }
      }
    }
  }
  .memorize-wrap{
    display: flex;
    .left-panel{
      padding: 12px;
      flex: 0 0 35%;
      width: 35%;
      margin-right: 24px;
      border: 1px solid #d1d1d1;
      box-sizing: border-box;
      .el-form {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        .el-form-item {
          display: flex;
          width: 50%;
          &.whole{
            width: 100%;
          }
          .el-form-item__content {
            flex: 1;
            margin-left: 0 !important;
            .el-select {
              width: 100%;
            }
            .el-date-editor{
              width: 100%;
            }
          }
        }
      }
      .operation{
        margin-top: 20px;
        text-align: center;
      }
    }
    .right-panel{
      flex: 0 0 65%;
      width: 65%;
    }
  }
}
.addr-dialog-wrap {
    .el-dialog__body {
      .el-form {
        display: flex;
        flex-wrap: wrap;
        .el-form-item {
          display: flex;
          width: 50%;
          margin-right: 0;
          &.whole{
            width: 100%;
          }
          .el-form-item__content {
            flex: 1;
            margin-left: 0 !important;
            .el-select {
              width: 100%;
            }
            .el-date-editor{
              width: 100%;
            }
          }
        }
      }
    }
  }
  .upload-wrap{
    .upload-btn{
      display: inline-block;
    }
  }
  .el-table{
    .stop-row{
      background:red
    }
  }
</style>

