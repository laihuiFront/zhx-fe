<template>
  <div id="case-detail">
    <el-collapse v-model="activeNames">
      <el-collapse-item :title="'个案序列号: '+caseDetail.seqNo" name="1">
        <div class="items-wrap">
          <el-form
            :model="caseDetail"
            ref="ruleForm"
            label-width="100px"
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
              <el-input v-model="caseDetail.collectStatus" :disabled="true" ></el-input>
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
            <el-form-item label="PTP金额">
              <el-input v-model="caseDetail.proRepayAmt" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="CP金额">
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
                  </div>
                  <div style="text-align: right; margin-top: 12px">
                    <el-button size="mini" type="text" @click="addCommentVisible = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="onClickAddComment">确定</el-button>
                  </div>
                 <el-button size="small" type="text" icon="el-icon-plus" title="添加" slot="reference"></el-button>
                </el-popover>
                 <ul class="comments-wrap">
                   <li v-for="(item) in commentList" :key="item.id" class="item">
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
          :data="caseDetail.dependCase"
          style="width: 100%"
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
            prop="money"
            label="委案金额">
          </el-table-column>
          <el-table-column
            prop="currencyType"
            label="币种">
          </el-table-column>
          <el-table-column
            prop="proRepayAmt"
            label="PTP">
          </el-table-column>
          <el-table-column
            prop="bankAmt"
            label="CP">
          </el-table-column>
          <el-table-column
            prop="enRepayAmt"
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
              label-width="100px"
              class="rule-form"
            >
            <el-form-item label="分配时间">
              <el-input v-model="caseDetail.distributeTime" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="分配历史">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="家庭邮编">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="单位邮编">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="对账邮编">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="户籍邮编">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="账号">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="开户行">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="主副卡">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="副卡卡人">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="未出账金额">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="账单日">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="账单周期">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="固定额度">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="最后消费日">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="最后消费日">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="逾期日期">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="曾逾期次数">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="保证金">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="超限费">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="公司佣金">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="还款期限">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="逾期管理费">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="信用额度">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="信贷分类">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="拖欠级别">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="账户名称">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="已还期数">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="催收分类">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="贷款截止日">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="生日">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="QQ">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="职位">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="部门">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="商品">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="商户">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="申请单号">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="档案号">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="社保电脑号">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="社保卡号">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人1姓名">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人1证件">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人1家庭电话">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人1单位电话">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人1手机">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人1单位">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人1地址">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="">

            </el-form-item>
            <el-form-item label="联系人2姓名">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人2证件">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人2家庭电话">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人2单位电话">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人2手机">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人2单位">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人2地址">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="">
            </el-form-item>
            <el-form-item label="联系人3姓名">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人3证件">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人3家庭电话">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人3单位电话">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人3手机">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人3单位">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人3地址">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="">
            </el-form-item>
            <el-form-item label="联系人4姓名">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人4证件">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人4家庭电话">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人4单位电话">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人4手机">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人4单位">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人4地址">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="">
            </el-form-item>
            <el-form-item label="联系人5姓名">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人5证件">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人5家庭电话">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人5单位电话">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人5手机">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人5单位">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人5地址">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="">

            </el-form-item>
            <el-form-item label="联系人6姓名">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人6证件">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人6家庭电话">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人6单位电话">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人6手机">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人6单位">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="联系人6地址">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="原催收记录">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="备注1">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="备注2">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="备注3">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="备注4">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="备注5">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="备注6">
              <el-input v-model="caseDetail.distributeHistory" :disabled="true" ></el-input>
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
                    <el-button @click="changePhoneStatus('有效')">标记为有效</el-button>
                    <el-button @click="changePhoneStatus('未知')">标记为未知</el-button>
                    <el-button @click="changePhoneStatus('无效')">标记为无效</el-button>
                    <el-button>显示全部电话</el-button>
                  </div>
                  <div class="right-oper">
                    <el-button type="primary" @click="addPhone">新增电话</el-button>
                    <el-popover
                      placement="bottom-end"
                      title="批量新增电话"
                      width="500"
                      trigger="click"
                      v-model="batchAddTelVisible">
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
                    <el-button type="primary">同步共债</el-button>
                  </div>
                </div>
                <el-table
                  @selection-change="onSelectPhoneRow"
                  :data="caseDetail.dataCaseTelEntityList"
                  style="width: 100%"
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
                      <el-button type="text">历史记录</el-button>
                      <el-button type="text" @click="editPhone(scope.row)">编辑</el-button>
                      <el-button type="text" @click="deleteTel(scope.row.id)">删除</el-button>
                      <el-button type="text">停止跟进</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="地址" name="2" class="tabs-wrap" >
                <div class="operation">
                  <div class="left-oper">
                    <el-button>标记为有效</el-button>
                    <el-button>标记为未知</el-button>
                    <el-button>标记为无效</el-button>
                    <el-button>显示全部地址</el-button>
                    <el-button>查看信函记录</el-button>
                  </div>
                  <div class="right-oper">
                    <el-button type="primary">新增地址</el-button>
                  </div>
                </div>
                <el-table
                  :data="addrList"
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
                    width="100">
                    <template slot-scope="scope">
                      <el-button type="text">编辑</el-button>
                      <el-button type="text">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="案人数据" name="3" class="tabs-wrap">
                <el-table
                  :data="dataList"
                  style="width: 100%"
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
                    <el-radio-group v-model="memorizeType">
                      <el-radio :label="1">本案催记</el-radio>
                      <el-radio :label="2">同批次共债催记</el-radio>
                      <el-radio :label="3">共债催记</el-radio>
                      <el-radio :label="4">同卡催记</el-radio>
                    </el-radio-group>
                  </div>
                  <div class="right-oper">
                    <el-button type="primary">导出本案催记</el-button>
                  </div>
                </div>
                <el-table
                  :data="memorizeList"
                  style="width: 100%"
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
                    prop="telPhone"
                    show-overflow-tooltip
                    label="电话/地址">
                  </el-table-column>
                  <el-table-column
                    prop="collectionType"
                    show-overflow-tooltip
                    label="类型">
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
                    prop="method"
                    show-overflow-tooltip
                    label="谈判方式">
                  </el-table-column>
                  <el-table-column
                    prop="repayTime"
                    show-overflow-tooltip
                    label="承诺日期">
                  </el-table-column>
                  <el-table-column
                    prop="repayAmt"
                    show-overflow-tooltip
                    label="承诺金额">
                  </el-table-column>
                  <el-table-column
                    prop="reduceAmt"
                    show-overflow-tooltip
                    label="减免金额">
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    show-overflow-tooltip
                    label="减免状态">
                  </el-table-column>
                  <el-table-column
                    prop="odv"
                    show-overflow-tooltip
                    label="催收人">
                  </el-table-column>
                  <el-table-column
                    prop="collectStatus"
                    show-overflow-tooltip
                    label="催收状态">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    fixed="right"
                    width="100">
                    <template slot-scope="scope">
                      <el-button type="text">编辑</el-button>
                      <el-button type="text">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="评语" name="5" class="tabs-wrap">
                <el-table
                  :data="commentList"
                  style="width: 100%"
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
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="利息更新" name="7" class="tabs-wrap">
                <el-table
                  :data="rateUpdateList"
                  style="width: 100%"
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
                    <el-button>全部</el-button>
                    <el-button>待审核</el-button>
                    <el-button>待办</el-button>
                    <el-button>已完成</el-button>
                    <el-button>已撤销</el-button>
                  </div>
                </div>
                <el-table
                  :data="syncList"
                  style="width: 100%"
                  class="table-wrap">
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="状态">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="协催类型">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="申请内容">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="申请时间">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="申请人">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="协催时间">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="协催人">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="协催结果">
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="共债案件" name="10" class="tabs-wrap">
                <el-table
                  :data="caseDetail.dependCaseList"
                  style="width: 100%"
                  class="table-wrap">
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="批次号">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="个案序列号">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="委托日期">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="姓名">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="卡号">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="委托方">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="委案金额">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="催收状态">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="已还款">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="催收员">
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="操作记录" name="11" class="tabs-wrap">
                <el-table
                  :data="caseDetail.logList"
                  style="width: 100%"
                  class="table-wrap">
                  <el-table-column
                    prop="time"
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
                    prop="content"
                    show-overflow-tooltip
                    label="操作内容">
                  </el-table-column>
                  <el-table-column
                    prop="user"
                    width="100"
                    show-overflow-tooltip
                    label="操作人">
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="诉讼案件" name="12" class="tabs-wrap">
                <el-table
                  :data="caseDetail.litigationCaseList"
                  style="width: 100%"
                  class="table-wrap">
                  <el-table-column
                    prop="time"
                    show-overflow-tooltip
                    label="案件状态">
                  </el-table-column>
                  <el-table-column
                    prop="type"
                    show-overflow-tooltip
                    label="办案进度">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="案件类型">
                  </el-table-column>
                  <el-table-column
                    prop="user"
                    show-overflow-tooltip
                    label="客户姓名">
                  </el-table-column>
                  <el-table-column
                    prop="user"
                    show-overflow-tooltip
                    label="委案日期">
                  </el-table-column>
                  <el-table-column
                    prop="user"
                    show-overflow-tooltip
                    label="委托人">
                  </el-table-column>
                  <el-table-column
                    prop="user"
                    show-overflow-tooltip
                    label="被告人">
                  </el-table-column>
                  <el-table-column
                    prop="user"
                    show-overflow-tooltip
                    label="标的">
                  </el-table-column>
                  <el-table-column
                    prop="user"
                    show-overflow-tooltip
                    label="费用">
                  </el-table-column>
                  <el-table-column
                    prop="user"
                    show-overflow-tooltip
                    label="所属人">
                  </el-table-column>
                  <el-table-column
                    prop="user"
                    show-overflow-tooltip
                    label="受案法院">
                  </el-table-column>
                  <el-table-column
                    prop="user"
                    show-overflow-tooltip
                    label="案号">
                  </el-table-column>
                  <el-table-column
                    prop="user"
                    show-overflow-tooltip
                    label="备注">
                  </el-table-column>
                  <el-table-column
                    prop="user"
                    fixed="right"
                    show-overflow-tooltip
                    label="操作">
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="减免管理" name="13" class="tabs-wrap">
                <div class="operation">
                  <div class="right-oper">
                    <el-button type="primary">添加减免申请</el-button>
                  </div>
                </div>
                <el-table
                  :data="caseDetail.reliefList"
                  style="width: 100%"
                  class="table-wrap">
                  <el-table-column
                    prop="time"
                    show-overflow-tooltip
                    label="类型">
                  </el-table-column>
                  <el-table-column
                    prop="type"
                    show-overflow-tooltip
                    label="处理状态">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="减免/报备状态">
                  </el-table-column>
                  <el-table-column
                    prop="user"
                    show-overflow-tooltip
                    label="申请日期">
                  </el-table-column>
                  <el-table-column
                    prop="user"
                    show-overflow-tooltip
                    label="申请人">
                  </el-table-column>
                  <el-table-column
                    prop="user"
                    show-overflow-tooltip
                    label="审核日期">
                  </el-table-column>
                  <el-table-column
                    prop="user"
                    show-overflow-tooltip
                    label="提交日期">
                  </el-table-column>
                  <el-table-column
                    prop="user"
                    show-overflow-tooltip
                    label="完成日期">
                  </el-table-column>
                  <el-table-column
                    prop="user"
                    show-overflow-tooltip
                    label="完成人">
                  </el-table-column>
                  <el-table-column
                    prop="user"
                    show-overflow-tooltip
                    label="减免/报备结果">
                  </el-table-column>
                  <el-table-column
                    prop="user"
                    show-overflow-tooltip
                    label="是否报备">
                  </el-table-column>
                  <el-table-column
                    prop="user"
                    fixed="right"
                    show-overflow-tooltip
                    label="操作">
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
              <el-form-item label="催收时间" prop="phone">
                <el-input v-model="batchForm.phone" placeholder="请输入电话号码"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input v-model="batchForm.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="关系" prop="rel">
                <el-input v-model="batchForm.rel" placeholder="请输入关系"></el-input>
              </el-form-item>
              <el-form-item label="谈判方式" prop="tpfs">
                <el-select v-model="batchForm.tpfs" placeholder="请选择谈判方式">
                  <el-option
                    v-for="item in tpfsList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="催收模板" prop="csmb">
                <el-select v-model="batchForm.csmb" placeholder="请选择催收模板">
                  <el-option
                    v-for="item in csmbList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="催收结果" prop="csjg">
                <el-select v-model="batchForm.csjg" placeholder="请选择催收结果">
                  <el-option
                    v-for="item in csjgList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="通话记录" prop="thjl" class="whole">
                <el-input
                  type="textarea"
                  :rows="4"
                  placeholder="请输入通话记录"
                  v-model="batchForm.thjl">
                </el-input>
              </el-form-item>
              <el-form-item label="催收状态" prop="cszt">
                <el-select v-model="batchForm.cszt" placeholder="请选择催收结果">
                  <el-option
                    v-for="item in csztList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label=" " prop="cszt">
                <el-checkbox v-model="batchForm.status">更新批次共债案件催收状态</el-checkbox>
              </el-form-item>
              <el-form-item label="减免金额" prop="jmje">
                <el-input v-model="batchForm.jmje" placeholder="请输入减免金额"></el-input>
              </el-form-item>
              <el-form-item label="减免状态" prop="jmzt">
                <el-select v-model="batchForm.jmzt" placeholder="请选择减免状态">
                  <el-option
                    v-for="item in jmztList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="下次跟进日期" prop="time">
                <el-date-picker
                  v-model="batchForm.time"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择下次跟进日期"
                ></el-date-picker>
              </el-form-item>
            </el-form>
            <div class="operation">
              <el-button type="primary">保存</el-button>
              <el-button >清空</el-button>
            </div>
          </div>
          <div class="right-panel">
            <p class="title">同批次共债催记</p>
            <el-table
              :data="syncMemorizeList"
              style="width: 100%"
              class="table-wrap">
              <el-table-column prop="dataCase.batchNo" width="80" label="时间" show-overflow-tooltip></el-table-column>
              <el-table-column prop="dataCase.cardNo" width="70" label="对象姓名" show-overflow-tooltip></el-table-column>
              <el-table-column prop="dataCase.identNo" width="50" label="关系" show-overflow-tooltip></el-table-column>
              <el-table-column prop="dataCase.name" width="120" label="电话/地址" show-overflow-tooltip></el-table-column>
              <el-table-column prop="dataCase.seqNo" label="催收记录" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-dialog
  title="新增电话"
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
  </div>
</template>

<script>

import {getCaseDetail,
        getAddressDetail,
        getArchiveDetail,
        getCollectDetail,
        PhonetypeList,
        getCommentDetail,getInterestDetail,getSynergyDetail,
        updateRemark,
        saveCaseTel,
        getTelList,
        delTel,
        updateTelStatus,
        addComment,
        listComment,
        addBatchCaseTel} from '@/common/js/api-detail'
import {getEnum} from '@/common/js/api-sync'

export default {
  name:'caseDetail',
  props:{
    id:{
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      addCommentVisible:false,
      commentAddContent:null,
      dialogVisible:false,
    	formInline:{},
      PhonetypeList:[],
      syncMemorizeList:[],
      memorizeList:[],//催記
      commentList:[],//评语
      addrList:[],//地址
      dataList:[],//案人信息
      rateUpdateList:[],//利息
      syncList:[],//协催
      activeNames: ['1','4'],
      otherActiveName:'1',
      caseDetail:{},
      memorizeType:1,
      statusList:[{name:"有效",id:1,},{name:"无效",id:2,},{name:"未知",id:3,}],
      phoneSelectList: [],
      batchForm:{},
      tpfsList:[],
      csmbList:[],
      csjgList:[],
      csztList:[],
      jmztList:[],
      batchAddTelVisible:false,
      batchAddTelContent: null
    }
  },
  methods: {
    saveSelfInfo(){
      updateRemark({
        id: this.id,
        remark: this.caseDetail.selfInfo
      }).then(res=>{
        this.$message('修改自定义信息成功')
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
          this.$message('新增电话成功')
        }else{
          getTelList(this.id).then(data=>{
            this.$set(this.caseDetail,'dataCaseTelEntityList',data)
          })
          this.$message('修改电话成功')
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
            this.$message('删除电话成功')
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
          this.$message('电话状态修改成功')
        })
      }).catch(()=>{})
    },
    onClickAddComment(){
      if(!this.commentAddContent){
        this.$message('请输入评语内容')
        return
      }
      addComment([{
        id: this.id,
        comment: this.commentAddContent
      }]).then(res => {
        this.$message('评语添加成功')
        getCommentDetail(this.id).then(data => {
          this.commentList = data
          this.addCommentVisible = false
        })
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
        this.$message('电话添加成功')
        getTelList(this.id).then(data=>{
          this.$set(this.caseDetail,'dataCaseTelEntityList',data)
          this.batchAddTelContent = null
          this.batchAddTelVisible = false
        })
      })
    },
    queryDetail(){
      getCaseDetail(this.id).then(data => {
        this.caseDetail = data
      })
      PhonetypeList().then((response)=>{
        this.PhonetypeList=response
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
    },
    showPanel(tab,e){
      var ind = tab.index;
      if (ind == 1){
        getAddressDetail(this.id).then(data => {
          this.addrList = data
        })
      }else if (ind == 2){
        getArchiveDetail(this.id).then(data => {
          this.dataList = data
        })
      }else if(ind == 3){//催記
        getCollectDetail(this.id,1).then(data => {
          console.info(data)
          this.memorizeList = data
        })
      }else if (ind == 4){//评语
        getCommentDetail(this.id).then(data => {
          this.commentList = data
        })
      }else if (ind == 5){//利息
        getInterestDetail(this.id).then(data => {
          this.rateUpdateList = data
        })
      }else if (ind == 6){//协催
        getSynergyDetail(this.id).then(data => {
          this.syncList = data
        })
      }
    },
    onSelectPhoneRow(val){
      this.phoneSelectList = val
    }
  },
  created() {
  	
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
              color: #409eff;
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
      flex:1;
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
      flex: 1;
    }
  }
}
</style>

