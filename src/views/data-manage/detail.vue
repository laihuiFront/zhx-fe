<template>
  <div id="case-detail" v-loading="listLoad"
       v-loading.fullscreen.lock="fullscreenLoading"
       element-loading-text="正在加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.7)"
  >
    <div class="basic-info">
      <div class="title-info">
        <div class="txt" :class="[
                      { blue:caseDetail.color  === 'BLUE' },
                      { red: caseDetail.color === 'RED' }
                    ]">
          {{caseDetail.name + '-[' + caseDetail.seqNo + ']-案件详情'}}
        </div>
        <div style="text-align: right; margin-right:20px;" >
          <el-button type="primary" class="btn" align="right" size="mini" @click="lastCase" v-if="showNext">上条</el-button>
          <el-button type="primary" class="btn" align="right" size="mini" @click="nextCase"  v-if="showNext">下条</el-button>
          <el-button type="primary" class="btn" align="right" size="mini" v-if="buttonAuth" @click="showEdit">编辑</el-button>
          <el-button type="primary" class="btn" align="right" size="mini" v-if="buttonAuth" @click="showCommentVisible=true">评语</el-button>
          <el-button type="primary" class="btn" align="right" size="mini" v-if="buttonAuth" @click="showWarningVisible=true">警告</el-button>
          <el-button type="primary" class="btn" align="right" size="mini" v-if="buttonAuth" @click="showCollectInfo">催收小结</el-button>
        </div>
      </div>
      <div class="items-wrap">
        <el-form
          :model="caseDetail"
          ref="ruleForm"
          class="rule-form"
        >
          <!-- label-width="130px" -->
   <div class="form1">
     <div class="itemStyle">
          <el-form-item label="姓名" class="lableStyle_name">
            <!-- <el-input v-model="caseDetail.name" :disabled="true" ></el-input>-->
          </el-form-item>
            <div
              class="inputDiv fixwidth"
              style="font-size: 11px;"
            >
                <span :class="[
                      { blue: caseDetail.color === 'BLUE' },
                      { red: caseDetail.color === 'RED' }
                    ]">{{ caseDetail.name}}{{caseDetail.gender ? `（${caseDetail.gender}）` : ''}}</span>
            </div>
     </div>
            <!-- <div class="sub-title">委托方</div> -->
        <div class="itemStyle">
          <el-form-item label="委托方" class="lableStyle">
          </el-form-item>
            <el-input v-model="caseDetail.client" :disabled="true" class="fixwidth"></el-input>
        </div>
        <div class="itemStyle">
          <el-form-item label="批次号" class="lableStyle">
          </el-form-item>
            <el-input
              v-model="caseDetail.batchNo"
              :disabled="true"
              class="fixwidth"
            ></el-input>
        </div>
       <div class="itemStyle">
          <el-form-item label="委案日期" class="lableStyle_date">
          </el-form-item>
            <div
              class="inputDiv fixwidth"
              style="font-size: 11px;"
            >
              <span>{{ caseDetail.caseDate }}</span>
            </div>
       </div>
       <div class="itemStyle">
          <el-form-item label="证件号" class="lableStyle">
          </el-form-item>
            <div
              class="inputDiv fixwidth"
              style="font-size: 11px;"
              :class="[caseDetail.copyAuth ? '' : 'inputUnSelect']"
            >
                <span :class="[
                      { blue: caseDetail.color === 'BLUE' },
                      { red: caseDetail.color === 'RED' }
                    ]">{{ caseDetail.identNo }}</span>
            </div>
       </div>
         <div class="itemStyle">
           <el-form-item label="卡号" class="lableStyle">
          </el-form-item>
            <el-input v-model="caseDetail.cardNo" :disabled="true" class="fixwidth"></el-input>
         </div>

         <div class="itemStyle">
          <el-form-item label="催收状态" class="lableStyle_blue">
          </el-form-item>
            <el-input
              v-model="caseDetail.collectStatusMsg"
              :disabled="true"
              class="fixwidth"
            ></el-input>
         </div>
         <div class="itemStyle">
          <el-form-item label="预计退案日" class="lableStyle">
          </el-form-item>
            <div
              class="inputDiv fixwidth"
              style="font-size: 11px;"
            >
              <span v-if="caseDetail.realReturnTime==null || caseDetail.realReturnTime==''">{{ caseDetail.expectTime }}</span>
              <span v-else>{{ caseDetail.expectTime }}（已于{{caseDetail.realReturnTime}}退案）</span>
            </div>
         </div>
         <div class="itemStyle">
          <el-form-item label="委案金额" class="lableStyle_blue">
          </el-form-item>
            <el-input v-model="caseDetail.moneyMsg" :disabled="true"  class="fixwidth"></el-input>
         </div>
         <div class="itemStyle">
          <el-form-item label="逾期日期" class="lableStyle">
          </el-form-item>
            <el-input
              v-model="caseDetail.overdueDate"
              :disabled="true"
               class="fixwidth"
            ></el-input>
         </div>
         <div class="itemStyle">
          <el-form-item label="地区" class="lableStyle">
           </el-form-item>
            <div
              class="inputDiv fixwidth"
              style="font-size: 11px;"
            >
            <span>{{ caseDetail.provinceName }} {{ caseDetail.cityName }}</span>
            </div>
         </div>
         <div class="itemStyle">
          <el-form-item label="催收员" class="lableStyle">
          </el-form-item>
            <el-input v-model="caseDetail.odv" :disabled="true" class="fixwidth"></el-input>
         </div>

         <div class="itemStyle">
          <el-form-item label="已还款" class="lableStyle">
          </el-form-item>
            <div class="inputDiv fixwidth" style="font-size: 12px;">
                <span
                >{{ caseDetail.enRepayAmtMsg }}（委案余额:{{caseDetail.balanceMsg}}）</span
                >
              <span
                style="color: red;"
                v-if="caseDetail.settleFlag == '已结清'"
              >[{{ caseDetail.settleFlag }}]</span
              >
            </div>
         </div>
         <div class="itemStyle">
          <el-form-item label="逾期账龄" class="lableStyle_blue">
          </el-form-item>
            <el-input
              v-model="caseDetail.accountAge"
              :disabled="true"
              class="fixwidth"
            ></el-input>
         </div>
         <div class="itemStyle">
          <el-form-item label="逾期期数" class="lableStyle">
          </el-form-item>
            <el-input
              v-model="caseDetail.overduePeriods"
              :disabled="true"
              class="fixwidth"
            ></el-input>
         </div>
         <div class="itemStyle">
             <el-form-item label="最低还款额" class="lableStyle">
              </el-form-item>
              <el-input
                v-model="caseDetail.minimumPayment"
                :disabled="true"
                class="fixwidth"
              ></el-input>
         </div>
         <div class="itemStyle">
          <el-form-item label="最新欠款" class="lableStyle_blue">
          </el-form-item>
            <el-input
              v-model="caseDetail.interestDate"
              :disabled="true"
              class="fixwidth"
            ></el-input>
         </div>
         <div class="itemStyle">
          <el-form-item label="逾期天数" class="lableStyle">
          </el-form-item>
            <div class="inputDiv fixwidth" style="font-size: 12px;">
              <span>{{ caseDetail.overdueDays }}（最新逾期天数:{{caseDetail.overdueNewDays}}）</span>
            </div>
         </div>
         <div class="itemStyle">
          <el-form-item label="已还期数" class="lableStyle">
          </el-form-item>
            <el-input
              v-model="caseDetail.repaidPeriods"
              :disabled="true"
              class="fixwidth"
            ></el-input>
         </div>
         <div class="itemStyle">
          <el-form-item label="贷款日期" class="lableStyle">
          </el-form-item>
            <el-input
              v-model="caseDetail.loanDate"
              :disabled="true"
              class="fixwidth"
            ></el-input>
         </div>
         <div class="itemStyle">
          <el-form-item label="剩余本金" class="lableStyle">
          </el-form-item>
            <el-input
              v-model="caseDetail.residualPrinciple"
              :disabled="true"
              class="fixwidth"
            ></el-input>
         </div>
         <div class="itemStyle">
          <el-form-item label="本金" class="lableStyle">
          </el-form-item>
            <el-input
              v-model="caseDetail.principle"
              :disabled="true"
              class="fixwidth"
            ></el-input>
         </div>
          <div class="itemStyle">
            <el-form-item label="逾期利息" class="lableStyle">
            </el-form-item>
              <el-input
                v-model="caseDetail.overdueInterest"
                :disabled="true"
                class="fixwidth"
              ></el-input>
          </div>
         <div class="itemStyle">
          <el-form-item label="每月还款" class="lableStyle">
          </el-form-item>
            <el-input
              v-model="caseDetail.monthlyRepayments"
              :disabled="true"
              class="fixwidth"
            ></el-input>
         </div>
         <div class="itemStyle">
            <el-form-item label="单位名称" class="lableStyle">
          </el-form-item>
            <div class="inputDiv fixwidth" style="font-size: 12px;">
              <span>{{ caseDetail.unitName}}</span>
            </div>
         </div>
         <div class="itemStyle">
          <el-form-item label="单位地址" class="lableStyle">
          </el-form-item>
            <div class="inputDiv fixwidth" style="font-size: 12px;">
              <span>{{ caseDetail.unitAddress}}</span>
            </div>
         </div>
         <div class="itemStyle">
          <el-form-item label="户籍地址" class="lableStyle">
          </el-form-item>
            <div class="inputDiv fixwidth" style="font-size: 12px;">
              <span>{{ caseDetail.censusRegisterAddress}}</span>
            </div>
         </div>
         <div class="itemStyle">
          <el-form-item label="家庭地址" class="lableStyle">
          </el-form-item>
            <div class="inputDiv fixwidth" style="font-size: 12px;">
              <span>{{ caseDetail.homeAddress}}</span>
            </div>
         </div>
      <div class="pinyu1">
         <div class="commentStyle">
           <div class="pinyu">
            <el-form-item label="最新评语" class="whole">
            </el-form-item>
              <el-popover
                placement="bottom-start"
                title="添加评语"
                width="400"
                :visible-arrow="false"
                trigger="click"
                v-model="addCommentVisible"
              >
                <div>
                  <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入评语"
                    v-model="commentAddContent"
                  >
                  </el-input>
                  <el-radio-group
                    v-model="commentAddColor"
                    style="margin-top:10px;"
                  >
                    <el-radio label="黑">正常</el-radio>
                    <el-radio label="蓝">标蓝</el-radio>
                    <el-radio label="红">标红</el-radio>
                  </el-radio-group>
                </div>
                <div style="text-align: right; margin-top: 12px">
                  <el-button
                    size="mini"
                    type="text"
                    @click="addCommentVisible = false"
                  >取消
                  </el-button
                  >
                  <el-button
                    type="primary"
                    size="mini"
                    @click="onClickAddComment"
                  >确定
                  </el-button
                  >
                </div>
                <el-button
                  size="small"
                  type="text"
                  icon="el-icon-plus"
                  title="添加"
                  slot="reference"
                ></el-button>
              </el-popover>
          </div>
              <ul class="comments-wrap">
                <li
                  v-for="item in commentList"
                  :key="item.id"
                  class="item"
                  :class="[
                      { blue: item.commentColor === 'BLUE' },
                      { red: item.commentColor === 'RED' }
                    ]"
                >
                  {{ item.createTime }} {{ item.creatUserName }} :
                  {{ item.comment }}
                </li>
              </ul>
            </div>
         </div>
    </div>
            <!--<el-input v-model="caseDetail.area" :disabled="true"></el-input>-->
        </el-form>
      </div>
    </div>
    <el-collapse v-model="activeNames">
      <el-collapse-item class="titleStyle">
      <template slot="title">
        同批次共债案件<div class="calStyle">
            <span>{{titleMsg}}</span>
          </div>
      </template>
        <el-table
          highlight-current-row
          :data="dependCase"
          border
          @row-dblclick="showCase"
        >
          <el-table-column prop="seqNo" label="个案序列号">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="showCase(scope.row)">
                {{scope.row.seqNo}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="cardNo" label="卡号"></el-table-column>
          <el-table-column prop="account" label="账号"></el-table-column>
          <el-table-column prop="moneyMsg" label="委案金额"></el-table-column>
          <el-table-column prop="currencyType" label="币种"></el-table-column>
          <el-table-column prop="proRepayAmtMsg" label="承诺还款金额">
          </el-table-column>
          <el-table-column prop="bankAmtMsg" label="待银行查账金额">
          </el-table-column>
          <el-table-column prop="enRepayAmtMsg" label="已还款">
          </el-table-column>
          <el-table-column prop="accountAge" label="逾期账龄">
          </el-table-column>
          <el-table-column prop="collectDate" label="上次通电">
          </el-table-column>
          <el-table-column prop="collectTimes" label="通电次数">
          </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item title="其他信息" name="2" class="titleStyle">
        <div class="items-wrap">
          <el-form
            :model="caseDetail"
            ref="otherForm"
            label-width="130px"
            class="rule-form"
          >
          <div class="style1" >
            <div class="itemStyle">
            <el-form-item label="证件类型" class="lableStyle">
            </el-form-item>
              <el-input v-model="caseDetail.identType" :disabled="true" class="fixwidth"></el-input>
            </div>
            <div class="itemStyle">
            <el-form-item label="合同编号" class="lableStyle">
            </el-form-item>
              <el-input v-model="caseDetail.contractNo" :disabled="true" class="fixwidth"></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="人民币" class="lableStyle">
              </el-form-item>
              <el-input v-model="caseDetail.rmb" :disabled="true" class="fixwidth"></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="港币" class="lableStyle">
              </el-form-item>
              <el-input v-model="caseDetail.hkd" :disabled="true" class="fixwidth"></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="外币" class="lableStyle">
              </el-form-item>
              <el-input
                v-model="caseDetail.foreignCurrency"
                :disabled="true"
                class="fixwidth"
              ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="币种" class="lableStyle">
              </el-form-item>
              <div class="inputDiv fixwidth" style="font-size: 12px;">
                <span>{{ caseDetail.currencyType}}</span>
              </div>
            </div>
            <div class="itemStyle">
              <el-form-item label="M值系数" class="lableStyle">
              </el-form-item>
              <div class="inputDiv fixwidth" style="font-size: 12px;">
                <span>{{ caseDetail.mVal}}</span>
              </div>
            </div>
            <div class="itemStyle">
              <el-form-item label="公司佣金比率" class="lableStyle">
            </el-form-item>
              <div class="inputDiv fixwidth" style="font-size: 12px;">
                <span>{{ caseDetail.commissionRate}}</span>
              </div>
            </div>
            <div class="itemStyle">
              <el-form-item label="公司佣金金额" class="lableStyle">
             </el-form-item>
              <div class="inputDiv fixwidth" style="font-size: 12px;">
                <span>{{ caseDetail.commissionMoney}}</span>
              </div>
            </div>
            <div class="itemStyle">
              <el-form-item label="催收手别" class="lableStyle">
              </el-form-item>
              <el-input
                v-model="caseDetail.collectHand"
                :disabled="true"
                class="fixwidth"
              ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="卡类" class="lableStyle">
              </el-form-item>
              <el-input
                v-model="caseDetail.cardType"
                :disabled="true"
                class="fixwidth"
              ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="贷款利率" class="lableStyle">
              </el-form-item>
              <el-input
                v-model="caseDetail.loanRate"
                :disabled="true"
                class="fixwidth"
              ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="车价" class="lableStyle">
              </el-form-item>
              <el-input
                v-model="caseDetail.cardModel"
                :disabled="true"
                class="fixwidth"
              ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="车型" class="lableStyle">
              </el-form-item>
              <el-input
                v-model="caseDetail.cardModel"
                :disabled="true"
                class="fixwidth"
              ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="逾期金额" class="lableStyle">
              </el-form-item>
              <el-input
                v-model="caseDetail.overdueMoney"
                :disabled="true"
                class="fixwidth"
              ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="逾期本金" class="lableStyle">
              </el-form-item>
              <el-input
                v-model="caseDetail.overduePrinciple"
                :disabled="true"
                class="fixwidth"
              ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="逾期罚息" class="lableStyle">
              </el-form-item>
              <el-input
                v-model="caseDetail.overdueDefaultInterest"
                :disabled="true"
                class="fixwidth"
              ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="违约金" class="lableStyle">
              </el-form-item>
              <el-input
                v-model="caseDetail.penalty"
                :disabled="true"
                class="fixwidth"
              ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="滞纳金" class="lableStyle">
              </el-form-item>
              <el-input
                v-model="caseDetail.lateFee"
                :disabled="true"
                class="fixwidth"
              ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="案人职位" class="lableStyle">
              </el-form-item>
              <el-input
                v-model="caseDetail.caseUserPosition"
                :disabled="true"
                class="fixwidth"
              ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="案人部门" class="lableStyle">
              </el-form-item>
              <el-input
                v-model="caseDetail.caseUserDepart"
                :disabled="true"
                class="fixwidth"
              ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="银行" class="lableStyle">
              </el-form-item>
              <el-input
                v-model="caseDetail.bank"
                :disabled="true"
                class="fixwidth"
              ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="银行" class="lableStyle">
              </el-form-item>
              <el-input
                v-model="caseDetail.bank"
                :disabled="true"
                class="fixwidth"
              ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="账号" class="lableStyle">
              </el-form-item>
              <el-input
                v-model="caseDetail.account"
                :disabled="true"
                class="fixwidth"
              ></el-input>

            </div>
            <div class="itemStyle">
              <el-form-item label="牌照号" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.license"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="品牌" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.brand"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="车架号" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.vin"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="发动机号" class="lableStyle">
              </el-form-item>
              <el-input
                v-model="caseDetail.engineNo"
                :disabled="true"
                class="fixwidth"
              ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="经销商" class="lableStyle">
              </el-form-item>
              <el-input
                v-model="caseDetail.dealer"
                :disabled="true"
                class="fixwidth"
              ></el-input>
            </div>
            <div class="itemStyle">
            <el-form-item label="手机" class="lableStyle">
            </el-form-item>
              <el-input v-model="caseDetail.tel" :disabled="true" class="fixwidth"></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="家庭号码" class="lableStyle">
              </el-form-item>
              <el-input
                v-model="caseDetail.homeTelNumber"
                :disabled="true"
                class="fixwidth"
              ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="单位号码" class="lableStyle">
              </el-form-item>
              <el-input
                v-model="caseDetail.unitTelNumber"
                :disabled="true"
                class="fixwidth"
              ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="对账单地址" class="whole lableStyle">
              </el-form-item>
              <div class="inputDiv fixwidth" style="font-size: 12px;">
                <span>{{ caseDetail.statementAddress}}</span>
              </div>
            </div>
            <div class="itemStyle">
              <el-form-item label="承诺还款金额" class="lableStyle">
              </el-form-item>
              <el-input
                v-model="caseDetail.proRepayAmt"
                :disabled="true"
                class="fixwidth"
              ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="待银行查账金额" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.bankAmt"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="委案期数" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.entrustPeriods"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="下次跟进日期" class="half lableStyle_riqi" >
              </el-form-item>
                <el-input
                  v-model="caseDetail.nextFollowDate"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="委托日期" class="lableStyle">
              </el-form-item>
                <el-date-picker
                  v-model="caseDetail.caseDate"
                  type="date"
                  :disabled="true"
                  class="fixwidth"
                ></el-date-picker>
            </div>
            <div class="itemStyle">
              <el-form-item label="跟进次数" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.collectTimes"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="催收区域" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.collectArea"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="最近催记时间" class="lableStyle">
              </el-form-item>
                <el-date-picker
                  v-model="caseDetail.latestCollectMomorize"
                  :disabled="true"
                  type="datetime"
                  class="fixwidth"
                ></el-date-picker>
            </div>
            <div class="itemStyle">
              <el-form-item label="最后外访" class="lableStyle">
              </el-form-item>
                <div class="inputDiv fixwidth" style="font-size: 12px;">
                  <span>{{ caseDetail.zhwf}}</span>
                </div>
            </div>
            <div class="itemStyle">
              <el-form-item label="自动收回时间" class="lableStyle">
              </el-form-item>
                <el-date-picker
                  v-model="caseDetail.zdshsj"
                  type="datetime"
                  :disabled="true"
                  class="fixwidth"
                ></el-date-picker>
            </div>
            <div class="itemStyle">
              <el-form-item label="催收小结" class="width-75 lableStyle">
              </el-form-item>
                <div class="inputDiv fixwidth" style="font-size: 12px;">
                  <span>{{ caseDetail.collectInfo }}</span>
                </div>
            </div>
            <div class="itemStyle">
              <el-form-item label="分配时间" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.distributeTime"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="分配历史" class="lableStyle">
              </el-form-item>
                <div class="inputDiv fixwidth" style="font-size: 12px;">
                  <span>{{ caseDetail.distributeHistory}}</span>
                </div>
            </div>
            <div class="itemStyle">
              <el-form-item label="家庭邮编" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.homeZipCode"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="单位邮编" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.unitZipCode"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>

            </div>
            <div class="itemStyle">
              <el-form-item label="对账邮编" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.statementZipCode"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="户籍邮编" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.censusRegisterZipCode"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="对账单邮编" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.statementZipCode"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="户籍地邮编" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.censusRegisterZipCode"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="开户行" class="lableStyle">
              </el-form-item>
              <el-input v-model="caseDetail.bank" :disabled="true" class="fixwidth"></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="主副卡" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.mainDeputyCard"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="副卡卡人" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.deputyCardUserName"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="未出账金额" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.outstandingAmount"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="账单日" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.billDate"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="账单周期" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.billCycle"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="固定额度" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.fixedQuota"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="最后消费日" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.lastConsumeDate"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="最后提现日" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.lastWithdrawDate"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="停卡日" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.stopCardDate"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="开卡日" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.activeCardDate"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="曾逾期次数" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.overdueTimes"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="保证金" class="lableStyle">
              </el-form-item>
                <el-input v-model="caseDetail.bail" :disabled="true" class="fixwidth"></el-input>

            </div>
            <div class="itemStyle">
              <el-form-item label="超限费" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.overrunFee"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="公司佣金" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.commissionMoney"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="还款期限" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.repayDeadline"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="逾期管理费" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.overdueManagementCost"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="信用额度" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.creditLine"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="信贷分类" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.loanType"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="拖欠级别" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.defaultLevel"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="最后还款金额" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.lastRepayMoney"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="最后还款日" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.lastRepayDate"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="账户名称" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.accountName"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="催收分类" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.collectionType"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="贷款截止日" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.loanDeadline"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="生日" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.birthday"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="年龄" class="lableStyle">
              </el-form-item>
                <el-input v-model="caseDetail.age" :disabled="true" class="fixwidth"></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="QQ" class="lableStyle">
              </el-form-item>
                <el-input v-model="caseDetail.qq" :disabled="true" class="fixwidth"></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="邮箱" class="lableStyle">
              </el-form-item>
                <el-input v-model="caseDetail.email" :disabled="true" class="fixwidth"></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="职位" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.caseUserPosition"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>

            </div>
            <div class="itemStyle">
              <el-form-item label="部门" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.caseUserDepart"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="商品" class="lableStyle">
              </el-form-item>
                <el-input v-model="caseDetail.goods" :disabled="true" class="fixwidth"></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="商户" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.commercialTenant"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="申请单号" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.applyOrderNo"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="档案号" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.archiveNo"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
            <el-form-item label="省份" class="lableStyle">
            </el-form-item>
              <el-input
                v-model="caseDetail.provinceName"
                :disabled="true"
                class="fixwidth"
              ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="城市" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.cityName"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="区县" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.countyName"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="警告" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.warning"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>

            <div class="itemStyle">
              <el-form-item label="社保电脑号" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.socialSecurityComputerNo"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="社保卡号" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.socialSecurityCardNo"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="保单到期日" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.policyExpiryDate"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人1姓名" class="lableStyle">
                <el-input
                  v-model="caseDetail.contactName1"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
              </el-form-item>

            </div>
            <div class="itemStyle">
              <el-form-item label="联系人1证件" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.contactIdentNo1"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人1家庭电话" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.contactHomeTel1"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人1单位电话" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.contactUnitTel1"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人1手机" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.contactMobile1"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人1单位" class="lableStyle">
                <div class="inputDiv fixwidth" style="font-size: 12px;">
                  <span>{{ caseDetail.contactUnit1}}</span>
                </div>
              </el-form-item>

            </div>
            <div class="itemStyle">
              <el-form-item label="联系人1地址" class="lableStyle">
              </el-form-item>
                <div class="inputDiv fixwidth" style="font-size: 12px;">
                  <span>{{ caseDetail.contactAddress1}}</span>
                </div>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人2姓名" class="lableStyle">
                <el-input
                  v-model="caseDetail.contactName2"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
              </el-form-item>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人2证件" class="lableStyle">
                <el-input
                  v-model="caseDetail.contactIdentNo2"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
              </el-form-item>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人2家庭电话" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.contactHomeTel2"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人2单位电话" class="lableStyle">
                <el-input
                  v-model="caseDetail.contactUnitTel2"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
              </el-form-item>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人2手机" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.contactMobile2"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人2单位" class="lableStyle">
              </el-form-item>
                <div class="inputDiv fixwidth" style="font-size: 12px;">
                  <span>{{ caseDetail.contactUnit2}}</span>
                </div>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人2地址" class="lableStyle">
                <div class="inputDiv fixwidth" style="font-size: 12px;">
                  <span>{{ caseDetail.contactAddress2}}</span>
                </div>
              </el-form-item>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人3姓名" class="lableStyle">
                <el-input
                  v-model="caseDetail.contactName3"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
              </el-form-item>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人3证件" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.contactIdentNo3"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人3家庭电话" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.contactHomeTel3"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
            <el-form-item label="联系人3单位电话" class="lableStyle">
            </el-form-item>
              <el-input
                v-model="caseDetail.contactUnitTel3"
                :disabled="true"
                class="fixwidth"
              ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人3手机" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.contactMobile3"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人3单位" class="lableStyle">
              </el-form-item>
                <div class="inputDiv fixwidth" style="font-size: 12px;">
                  <span>{{ caseDetail.contactUnit3}}</span>
                </div>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人3地址" class="lableStyle">
              </el-form-item>
                <div class="inputDiv fixwidth" style="font-size: 12px;">
                  <span>{{ caseDetail.contactAddress3}}</span>
                </div>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人4姓名" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.contactName4"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人4证件" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.contactIdentNo4"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人4家庭电话" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.contactHomeTel4"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人4单位电话" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.contactUnitTel4"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人4手机" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.contactMobile4"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
            <el-form-item label="联系人4单位" class="lableStyle">
            </el-form-item>
              <div class="inputDiv fixwidth" style="font-size: 12px;">
                <span>{{ caseDetail.contactUnit4}}</span>
              </div>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人4地址" class="lableStyle">
              </el-form-item>
                <div class="inputDiv fixwidth" style="font-size: 12px;">
                  <span>{{ caseDetail.contactAddress4}}</span>
                </div>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人5姓名" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.contactName5"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人5证件" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.contactIdentNo5"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人5家庭电话" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.contactHomeTel5"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人5单位电话" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.contactUnitTel5"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人5手机" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.contactMobile5"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人5单位" class="lableStyle">
              </el-form-item>
                <div class="inputDiv fixwidth" style="font-size: 12px;">
                  <span>{{ caseDetail.contactUnit5}}</span>
                </div>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人5地址" class="lableStyle">
              </el-form-item>
                <div class="inputDiv fixwidth" style="font-size: 12px;">
                  <span>{{ caseDetail.contactAddress5}}</span>
                </div>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人6姓名" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.contactName6"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人6证件" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.contactIdentNo6"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人6家庭电话" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.contactHomeTel6"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人6单位电话" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.contactUnitTel6"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>

            </div>
            <div class="itemStyle">
              <el-form-item label="联系人6手机" class="lableStyle">
              </el-form-item>
                <el-input
                  v-model="caseDetail.contactMobile6"
                  :disabled="true"
                  class="fixwidth"
                ></el-input>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人6单位" class="lableStyle">
              </el-form-item>
                <div class="inputDiv fixwidth" style="font-size: 12px;">
                  <span>{{ caseDetail.contactUnit6}}</span>
                </div>
            </div>
            <div class="itemStyle">
              <el-form-item label="联系人6地址" class="lableStyle">
              </el-form-item>
                <div class="inputDiv fixwidth" style="font-size: 12px;">
                  <span>{{ caseDetail.contactAddress6}}</span>
                </div>
            </div>
            <div class="itemStyle">
              <el-form-item label="原催收记录" class="lableStyle">
              </el-form-item>
                <div class="inputDiv fixwidth" style="font-size: 12px;">
                  <span>{{ caseDetail.lastCollectionRecord}}</span>
                </div>
            </div>
            <div class="itemStyle">
            <el-form-item label="备注1" class="lableStyle">
            </el-form-item>
              <div class="inputDiv fixwidth beizhu" style="font-size: 12px;">
                <span>{{ caseDetail.remark1}}</span>
              </div>
            </div>
            <div class="itemStyle">
              <el-form-item label="备注2" class="lableStyle">
              </el-form-item>
                <div class="inputDiv fixwidth" style="font-size: 12px;">
                  <span>{{ caseDetail.remark2 }}</span>
                </div>
            </div>
            <div class="itemStyle">
              <el-form-item label="备注3" class="lableStyle">
              </el-form-item>
                <div class="inputDiv fixwidth " style="font-size: 12px;">
                  <span>{{ caseDetail.remark3}}</span>
                </div>
            </div>
            <div class="itemStyle">
              <el-form-item label="备注4" class="lableStyle">
              </el-form-item>
                <div class="inputDiv fixwidth" style="font-size: 12px;">
                  <span>{{ caseDetail.remark4}}</span>
                </div>
            </div>
            <div class="itemStyle">
              <el-form-item label="备注5" class="lableStyle">
              </el-form-item>
                <div class="inputDiv fixwidth" style="font-size: 12px;">
                  <span>{{ caseDetail.remark5}}</span>
                </div>

            </div>
            <div class="itemStyle">
              <el-form-item label="备注6" class="lableStyle">
              </el-form-item>
                <div class="inputDiv fixwidth " style="font-size: 12px;">
                  <span>{{ caseDetail.remark6}}</span>
                </div>
            </div>
            </div>
            <div class="fujian">
                  <el-form-item label="附件" class="upload-wrap">
                    <el-popover
                      placement="right"
                      title="附件列表"
                      width="500"
                      trigger="click"
                      v-model="uploadVisible"
                    >
                      <el-upload
                        class="upload-demo upload-btn"
                        :action="action + '/dataFile/save/import'"
                        :headers="header"
                        :show-file-list="false"
                        :on-success="uploadSuccess"
                        :data="{ caseId: id }"
                      >
                        <el-button
                          style="position:absolute;top:10px;right:10px;"
                          size="mini"
                          type="primary"
                        >上传附件
                        </el-button
                        >
                      </el-upload>
                      <el-table
                        :data="uploadFileList"
                        border
                        stripe
                        width="100%"
                        :show-header="false"
                      >
                        <el-table-column
                          prop="fileName"
                          label="文件名"
                        ></el-table-column>
                      </el-table>
                      <el-button type="text" class="upload-btn" slot="reference"
                      >附件列表
                      </el-button
                      >
                    </el-popover>
                  </el-form-item>
            </div>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div class="basic-info">
      <!-- <el-collapse-item title="" name="3">-->
      <div class="other-wrap">
        <div class="left-wrap">
          <el-tabs
            v-model="otherActiveName"
            type="card"
            @tab-click="showPanel"
          >
            <el-tab-pane label="电话" name="1" class="tabs-wrap telPanel">
              <div class="operation">
                <div class="left-oper">
                  <el-button
                    @click="changePhoneStatus('有效')"
                  >标记为有效
                    <!-- v-if=" caseDetail.currentuser || mycaseFlag" -->
                  </el-button
                  >
                  <el-button
                    @click="changePhoneStatus('未知')"
                  >标记为未知
                    <!-- v-if=" caseDetail.currentuser || mycaseFlag" -->
                  </el-button
                  >
                  <el-button
                    @click="changePhoneStatus('无效')"
                  >标记为无效
                    <!-- v-if=" caseDetail.currentuser || mycaseFlag" -->
                  </el-button
                  >
                  <el-button @click="showAllTel">显示全部电话</el-button>
                </div>
                <div class="right-oper">
                  <el-button
                    type="primary"
                    @click="sendTelBatch"
                    class="btn"
                  >手机批量呼出
                    <!-- v-if=" caseDetail.currentuser || mycaseFlag" -->
                  </el-button>
                  <el-button
                    class="sendTel4Style btn"
                    type="primary"
                    @click="sendTelBatch2"
                  >座机批量呼出
                    <!-- v-if=" caseDetail.currentuser || mycaseFlag" -->
                  </el-button>
                  <el-button
                    class="addPhoneStyle btn"
                    type="primary"
                    @click="addPhone"
                  >新增电话
                    <!-- v-if=" caseDetail.currentuser || mycaseFlag" -->
                  </el-button
                  >
                  <el-popover
                    placement="bottom-end"
                    title="批量新增电话"
                    width="500"
                    trigger="click"
                    v-model="batchAddTelVisible"
                  >
                    <!-- v-if=" caseDetail.currentuser || mycaseFlag" -->
                    <div>
                      <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="请按照'关系-姓名-电话'的格式输入,多个条目以/隔开"
                        v-model="batchAddTelContent"
                      >
                      </el-input>
                    </div>
                    <div style="text-align: right; margin-top: 12px">
                      <el-button
                        size="mini"
                        type="text"
                        @click="batchAddTelVisible = false"
                      >取消
                      </el-button
                      >
                      <el-button
                        type="primary"
                        size="mini"
                        @click="onClickBatchAddTel"
                      >确定
                      </el-button
                      >
                    </div>
                    <el-button type="primary" slot="reference"
                    class="btn"
                    >批量新增电话
                    </el-button
                    >
                  </el-popover>
                  <!-- <el-button type="primary">批量电催</el-button> -->
                  <el-button
                    type="primary"
                    @click="_synchroSameTel"
                    v-if=" caseDetail.currentuser || mycaseFlag"
                    class="btn"
                  >同步共债
                  </el-button
                  >
                </div>
              </div>
              <el-table
                highlight-current-row
                @selection-change="onSelectPhoneRow"
                :data="caseDetail.dataCaseTelEntityList"
                :row-class-name="telTableRowClassName"
              >
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="telStatusMsg" label="状态">
                </el-table-column>
                <el-table-column prop="tel" label="电话">
                  <template slot-scope="scope">
                    <el-button
                      :class="scope.row.colorStatus==1?'fontColor':'fontColorTel'"
                      type="text"
                      size="small"
                      @click="
                          copyToCollect(
                            scope.row.tel,
                            scope.row.name,
                            scope.row.relation,
                            scope.row.telStatusMsg
                          )
                        "
                    >{{ scope.row.tel }}
                    </el-button
                    >
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="relation" label="关系">
                </el-table-column>
                <el-table-column prop="typeMsg" label="类型">
                </el-table-column>
                <el-table-column prop="remark" label="备注">
                </el-table-column>
                <el-table-column label="操作" width="250">
                  <template slot-scope="scope">
                    <el-button
                      slot="reference"
                      type="text"
                      @click="showHistoryTel(scope.row)"
                      class="fontColor"
                    >历史记录
                    </el-button>
                    <el-button
                      class="fontColor"
                      type="text"
                      @click="editPhone(scope.row)"
                      v-if="
                            scope.row.telStatusMsg !== '停止跟进'
                        "
                    >编辑
                           <!-- (caseDetail.currentuser || mycaseFlag) && -->
                    </el-button
                    >
                    <el-button
                      class="fontColor"
                      type="text"
                      @click="deleteTel(scope.row.id)"
                      v-if="
                            scope.row.telStatusMsg !== '停止跟进'
                        "
                    >删除
                           <!-- (caseDetail.currentuser || mycaseFlag) && -->
                    </el-button
                    >
                    <!-- userInfo.loginName=='admin' -->
                    <el-button
                      class="fontColor"
                      type="text"
                      v-if="
                            scope.row.telStatusMsg !== '停止跟进'
                        "
                   v-show="res1"

                      @click="stopTel(scope.row.id)"
                    >停止跟进
                           <!-- (caseDetail.currentuser || mycaseFlag) && -->
                    </el-button
                    >
                    <el-button
                      class="fontColor"
                      type="text"
                      v-if="
                            scope.row.telStatusMsg == '停止跟进'
                        "
                       v-show="res2"
                      @click="resetTel(scope.row.id)"
                    >恢复跟进
                           <!-- (caseDetail.currentuser || mycaseFlag) && -->
                    </el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="地址" name="2" class="tabs-wrap telPanel">
              <div class="operation" v-if="letterVisible2">
                <div class="left-oper">
                  <el-button
                    @click="changeAddrStatus('有效')"
                    v-if=" caseDetail.currentuser || mycaseFlag"
                  >标记为有效
                  </el-button
                  >
                  <el-button
                    @click="changeAddrStatus('未知')"
                    v-if=" caseDetail.currentuser || mycaseFlag"
                  >标记为未知
                  </el-button
                  >
                  <el-button
                    @click="changeAddrStatus('无效')"
                    v-if=" caseDetail.currentuser || mycaseFlag"
                  >标记为无效
                  </el-button
                  >
                  <!-- <el-button @click="saveAddr">显示全部地址</el-button> -->
                  <el-button @click="showLetterList">查看信函记录</el-button>
                </div>
                <div class="right-oper">
                  <el-button
                    class="btn"
                    type="primary"
                    @click="addAddr"
                    v-if=" caseDetail.currentuser || mycaseFlag"
                  >新增地址
                  </el-button
                  >
                </div>
              </div>
              <el-table
                highlight-current-row
                v-if="letterVisible2"
                @selection-change="onSelectAddrRow"
                :data="addrList"
              >
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column
                  prop="status"
                  show-overflow-tooltip
                  label="状态"
                >
                </el-table-column>
                <el-table-column
                  prop="name"
                  show-overflow-tooltip
                  label="姓名"
                >
                </el-table-column>
                <el-table-column
                  prop="relation"
                  show-overflow-tooltip
                  label="关系"
                >
                </el-table-column>
                <el-table-column
                  prop="address"
                  show-overflow-tooltip
                  label="地址"
                >
                </el-table-column>
                <el-table-column
                  prop="type"
                  show-overflow-tooltip
                  label="类型"
                >
                </el-table-column>
                <el-table-column
                  prop="remark"
                  show-overflow-tooltip
                  label="备注"
                >
                </el-table-column>
                <el-table-column
                  prop="letterCount"
                  show-overflow-tooltip
                  label="信函次数"
                >
                </el-table-column>
                <el-table-column
                  label="操作"
                  v-if="letterVisible2"
                  width="250"
                >
                  <template slot-scope="scope">
                    <el-popover
                      v-model="scope.row.showHistory"
                      placement="top"
                      width="600"
                      trigger="manual"
                    >
                      <el-table :data="scope.row.history" height="300">
                        <el-table-column
                          show-overflow-tooltip
                          property="opTime"
                          label="操作时间"
                        ></el-table-column>
                        <el-table-column
                          show-overflow-tooltip
                          property="type"
                          label="分类"
                        ></el-table-column>
                        <el-table-column
                          show-overflow-tooltip
                          property="context"
                          label="操作内容"
                        ></el-table-column>
                        <el-table-column
                          show-overflow-tooltip
                          property="operName"
                          label="操作人"
                        ></el-table-column>
                      </el-table>
                      <div style="text-align:center">
                        <el-button
                          type="primary"
                          @click="$set(scope.row, 'showHistory', false)"
                        >关闭
                        </el-button
                        >
                      </div>
                      <el-button
                        slot="reference"
                        type="text"
                        @click="showHistoryAddr(scope.row)"
                        v-if="letterVisible2"
                      >历史记录
                      </el-button
                      >
                    </el-popover>
                    <el-button
                      type="text"
                      @click="applyLetter(scope.row)"
                      v-if=" (caseDetail.currentuser || mycaseFlag) && letterVisible2"
                    >申请信函
                    </el-button
                    >
                    <el-button
                      type="text"
                      @click="editAddr(scope.row)"
                      v-if="(caseDetail.currentuser || mycaseFlag) && letterVisible2"
                    >编辑
                    </el-button
                    >
                    <el-button
                      type="text"
                      @click="deleteAddr(scope.row.id)"
                      v-if="(caseDetail.currentuser || mycaseFlag) && letterVisible2"
                    >删除
                    </el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <el-table
                highlight-current-row
                :data="letterList"
                v-if="letterVisible"
              >
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column
                  prop="status"
                  show-overflow-tooltip
                  label="状态"
                >
                </el-table-column>
                <el-table-column
                  prop="address"
                  show-overflow-tooltip
                  label="地址"
                >
                </el-table-column>
                <el-table-column
                  prop="applyContext"
                  show-overflow-tooltip
                  label="申请内容"
                >
                </el-table-column>
                <el-table-column
                  prop="addressType"
                  show-overflow-tooltip
                  label="地址类型"
                >
                </el-table-column>
                <el-table-column
                  prop="letterType"
                  show-overflow-tooltip
                  label="信函类别"
                >
                </el-table-column>
                <el-table-column
                  prop="applyDate"
                  show-overflow-tooltip
                  label="申请时间"
                >
                </el-table-column>
                <el-table-column
                  prop="applyer"
                  show-overflow-tooltip
                  label="申请人"
                >
                </el-table-column>
                <el-table-column
                  prop="synergyer"
                  show-overflow-tooltip
                  label="协催人"
                >
                </el-table-column>
                <el-table-column
                  prop="synergyDate"
                  show-overflow-tooltip
                  label="协催时间"
                >
                </el-table-column>
                <el-table-column
                  prop="synergyResult"
                  show-overflow-tooltip
                  label="协催结果"
                >
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="案人数据" name="3" class="tabs-wrap telPanel">
              <div class="operation" v-if="letterVisible2">
                <div class="left-oper"></div>
                <div class="right-oper">
                  <el-button
                    type="primary"
                    @click="onClickAddArchive"
                    v-if=" caseDetail.currentuser || mycaseFlag"
                    class="btn"
                  >新增案人数据
                  </el-button
                  >
                </div>
              </div>
              <el-table
                highlight-current-row
                :data="dataList"
              >
                <el-table-column
                  prop="name"
                  show-overflow-tooltip
                  label="姓名"
                >
                </el-table-column>
                <el-table-column
                  prop="msgType"
                  show-overflow-tooltip
                  label="信息类型"
                >
                </el-table-column>
                <el-table-column
                  prop="msgContext"
                  show-overflow-tooltip
                  label="信息内容"
                >
                </el-table-column>
                <el-table-column
                  prop="remark"
                  show-overflow-tooltip
                  label="备注"
                >
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  show-overflow-tooltip
                  label="导入时间"
                >
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="催记" name="4" class="tabs-wrap">
              <div class="operation">
                <div class="left-oper">
                  <el-radio-group
                    v-model="memorizeType"
                    @change="memorizeTypeChange"
                  >
                    <el-radio :label="1">本案催记</el-radio>
                    <el-radio :label="2">同批次共债催记</el-radio>
                    <el-radio :label="3">共债催记</el-radio>
                    <el-radio :label="4">同卡催记</el-radio>
                  </el-radio-group>
                </div>
                <div class="right-oper">
                  <el-button
                    class="btn"
                    type="primary"
                    @click="addDataCollect"
                    v-if=" caseDetail.currentuser || mycaseFlag"
                  >添加催记</el-button>
                  <el-button
                    class="btn"
                    type="primary"
                    @click="_expDataCollect"
                    v-if=" caseDetail.currentuser || mycaseFlag"
                  >导出催记</el-button>
                </div>
              </div>
              <el-table
                highlight-current-row
                :data="memorizeList"
                border
              >

                <el-table-column
                  prop="collectTime"
                  show-overflow-tooltip
                  sortable
                  :sort-orders="['ascending','descending']"
                  label="时间"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="targetName"
                  show-overflow-tooltip
                  label="对象姓名"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="relation"
                  show-overflow-tooltip
                  label="关系"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="mobile"
                  show-overflow-tooltip
                  label="电话/地址"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="telType"
                  show-overflow-tooltip
                  label="类型"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="collectInfo"
                  show-overflow-tooltip
                  label="催收信息"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="result"
                  show-overflow-tooltip
                  label="催收结果"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="targetName"
                  show-overflow-tooltip
                  label="催收对象"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="methodMsg"
                  show-overflow-tooltip
                  label="谈判方式"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="repayTime"
                  show-overflow-tooltip
                  label="承诺日期"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="repayAmtMsg"
                  show-overflow-tooltip
                  label="承诺金额"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="reduceAmtMsg"
                  show-overflow-tooltip
                  label="减免金额"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="reduceStatusMsg"
                  show-overflow-tooltip
                  label="减免状态"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="odv"
                  show-overflow-tooltip
                  label="催收人"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="collectStatusMsg"
                  show-overflow-tooltip
                  label="催收状态"
                  align="center"
                >
                </el-table-column>
                <el-table-column label="操作" width="100" align="center">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      @click="editDataCollect(scope.row)"
                      v-if=" caseDetail.currentuser || mycaseFlag"
                    >编辑</el-button >
                    <el-button type="text" v-if=" caseDetail.currentuser || mycaseFlag"
                               @click="delDataCollect(scope.row)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="评语" name="5" class="tabs-wrap telPanel">
              <el-table
                highlight-current-row
                :data="commentList"
              >
                <el-table-column
                  prop="comment"
                  show-overflow-tooltip
                  label="评语内容"
                >
                </el-table-column>
                <el-table-column
                  prop="creatUserName"
                  show-overflow-tooltip
                  width="150"
                  label="提交人"
                >
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  show-overflow-tooltip
                  width="150"
                  label="提交时间"
                >
                </el-table-column>
                <el-table-column
                  label="操作"
                  v-if="letterVisible2"
                  width="150"
                >
                  <template slot-scope="scope">
                    <el-popover
                      placement="bottom-end"
                      trigger="manual"
                      title="编辑操作记录"
                      width="500"
                      v-model="scope.row.editCommentVisible"
                    >
                      <div>
                        <el-input
                          type="textarea"
                          :rows="4"
                          placeholder="请输入评语"
                          v-model="scope.row.editContext"
                        >
                        </el-input>
                      </div>
                      <div style="text-align: right; margin-top: 12px">
                        <el-button
                          size="mini"
                          type="text"
                          @click="
                              $set(scope.row, 'editCommentVisible', false)
                            "
                        >取消
                        </el-button
                        >
                        <el-button
                          type="primary"
                          size="mini"
                          @click="onClickSaveComment"
                        >确定
                        </el-button
                        >
                      </div>
                      <el-button
                        type="text"
                        @click="editComment(scope.row)"
                        slot="reference"
                        v-if=" caseDetail.currentuser || mycaseFlag"
                      >修改
                      </el-button
                      >
                    </el-popover>
                    <el-button
                      type="text"
                      v-if=" caseDetail.currentuser || mycaseFlag"
                      @click="_deleteComment(scope.row.id)"
                    >删除
                    </el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="利息更新" name="7" class="tabs-wrap telPanel">
              <el-table
                highlight-current-row
                :data="rateUpdateList"
              >
                <el-table-column
                  prop="currency"
                  show-overflow-tooltip
                  label="币种"
                >
                </el-table-column>
                <el-table-column
                  prop="lastestDebt"
                  show-overflow-tooltip
                  label="总欠款金额"
                >
                </el-table-column>
                <el-table-column
                  prop="endDate"
                  show-overflow-tooltip
                  label="截止日期"
                >
                </el-table-column>
                <el-table-column
                  prop="principal"
                  show-overflow-tooltip
                  label="本金"
                >
                </el-table-column>
                <el-table-column
                  prop="interest"
                  show-overflow-tooltip
                  label="利息"
                >
                </el-table-column>
                <el-table-column
                  prop="penalty"
                  show-overflow-tooltip
                  label="违约金"
                >
                </el-table-column>
                <el-table-column
                  prop="lateFee"
                  show-overflow-tooltip
                  label="滞纳金"
                >
                </el-table-column>
                <el-table-column
                  prop="overrunFee"
                  show-overflow-tooltip
                  label="超限费"
                >
                </el-table-column>
                <el-table-column
                  prop="serivceFee"
                  show-overflow-tooltip
                  label="服务费"
                >
                </el-table-column>
                <el-table-column
                  prop="yearFee"
                  show-overflow-tooltip
                  label="年费"
                >
                </el-table-column>
                <el-table-column
                  prop="elseFee"
                  show-overflow-tooltip
                  label="其他费用"
                >
                </el-table-column>
                <el-table-column
                  prop="sheetFee"
                  show-overflow-tooltip
                  label="表外息"
                >
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  show-overflow-tooltip
                  label="导入时间"
                >
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane
              label="案件登帐"
              name="8"
              class="tabs-wrap billing-wrap"
            >
              <div class="first">
                <p style="line-height: 30px">承诺还款记录</p>
                <el-table highlight-current-row show-overflow-tooltip :data="memorizeList2">
                  <el-table-column
                    prop="repayAmtMsg"
                    show-overflow-tooltip
                    align="center"
                    label="承诺还款金额"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="repayTime"
                    show-overflow-tooltip
                    align="center"
                    label="承诺还款时间"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="createUser.userName"
                    show-overflow-tooltip
                    align="center"
                    label="录入人"
                  >
                  </el-table-column>
                </el-table>
              </div>
              <div class="second">
                <p style="line-height: 30px">
                  待银行查账记录
                  <el-button type="text" @click="addCpInfo" class="fontColor">新增</el-button>
                </p>
                <el-table highlight-current-row width="100%;" border stripe show-overflow-tooltip :data="cpList">
                  <el-table-column
                    prop="cpMoneyMsg"
                    align="center"
                    width="140"
                    show-overflow-tooltip
                    label="待银行查账金额"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="cpDate"
                    align="center"
                    width="140"
                    show-overflow-tooltip
                    label="待银行查账时间"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="repayUser"
                    align="center"
                    show-overflow-tooltip
                    label="还款人"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="repayTypeMsg"
                    align="center"
                    show-overflow-tooltip
                    label="还款方式"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="confirmMoneyMsg"
                    align="center"
                    show-overflow-tooltip
                    label="确认还款"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="repayDate"
                    show-overflow-tooltip
                    align="center"
                    label="还款日期"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="confirmDate"
                    show-overflow-tooltip
                    align="center"
                    label="确认时间"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    show-overflow-tooltip
                    align="center"
                    label="备注"
                  >
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="协催" name="9" class="tabs-wrap telPanel">
              <div class="operation">
                <div class="left-oper">
                  <el-radio-group v-model="syncType" @change="syncTypeChange">
                    <el-radio :label="1">全部</el-radio>
                    <el-radio :label="2">待审核</el-radio>
                    <el-radio :label="3">待办</el-radio>
                    <el-radio :label="4">已完成</el-radio>
                    <el-radio :label="5">已撤销</el-radio>
                  </el-radio-group>
                </div>
                <div class="right-oper">
                  <el-button
                    class="btn"
                    type="primary"
                    @click="showSynergyApply"
                    v-if=" caseDetail.currentuser || mycaseFlag"
                  >添加协催申请
                  </el-button
                  >
                  <el-button
                    class="btn"
                    type="primary"
                    @click="showSynergyResult"
                    v-if=" caseDetail.currentuser || mycaseFlag"
                  >添加协催记录
                  </el-button
                  >
                </div>
              </div>
              <el-table
                highlight-current-row
                :data="syncList"
              >
                <el-table-column
                  prop="statusMsg"
                  show-overflow-tooltip
                  label="状态"
                >
                </el-table-column>
                <el-table-column
                  prop="synergisticType.name"
                  show-overflow-tooltip
                  label="协催类型"
                >
                </el-table-column>
                <el-table-column
                  prop="applyContent"
                  show-overflow-tooltip
                  label="申请内容"
                >
                </el-table-column>
                <el-table-column
                  prop="applyTime"
                  show-overflow-tooltip
                  label="申请时间"
                >
                </el-table-column>
                <el-table-column
                  prop="applyUser.userName"
                  show-overflow-tooltip
                  label="申请人"
                >
                </el-table-column>
                <el-table-column
                  prop="synergisticTime"
                  show-overflow-tooltip
                  label="协催时间"
                >
                </el-table-column>
                <el-table-column
                  prop="synergisticUser.userName"
                  show-overflow-tooltip
                  label="协催人"
                >
                </el-table-column>
                <el-table-column
                  prop="synergisticResult"
                  show-overflow-tooltip
                  label="协催结果"
                >
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="共债案件" name="10" class="tabs-wrap telPanel" v-if="userInfo.sameBatch">
              <el-table
                highlight-current-row
                :data="caseSameList"
                @row-dblclick="showCase"
              >
                <el-table-column
                  prop="batchNo"
                  show-overflow-tooltip
                  label="批次号"
                >
                </el-table-column>
                <el-table-column
                  prop="seqNo"
                  show-overflow-tooltip
                  label="个案序列号"
                >
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="showCase(scope.row)">
                      {{scope.row.seqNo}}
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="caseDate"
                  show-overflow-tooltip
                  label="委托日期"
                >
                </el-table-column>
                <el-table-column
                  prop="name"
                  show-overflow-tooltip
                  label="姓名"
                >
                </el-table-column>
                <el-table-column
                  prop="cardNo"
                  show-overflow-tooltip
                  label="卡号"
                >
                </el-table-column>
                <el-table-column
                  prop="client"
                  show-overflow-tooltip
                  label="委托方"
                >
                </el-table-column>
                <el-table-column
                  prop="moneyMsg"
                  show-overflow-tooltip
                  label="委案金额"
                >
                </el-table-column>
                <el-table-column
                  prop="collectStatusMsg"
                  show-overflow-tooltip
                  label="催收状态"
                >
                </el-table-column>
                <el-table-column
                  prop="enRepayAmtMsg"
                  show-overflow-tooltip
                  label="已还款"
                >
                </el-table-column>
                <el-table-column
                  prop="odv"
                  show-overflow-tooltip
                  label="催收员"
                >
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="操作记录" name="11" class="tabs-wrap telPanel">
              <div class="operation">
                <div class="left-oper">
                  <el-radio-group v-model="logType" @change="logTypeChange">
                    <el-radio label="">全部</el-radio>
                    <el-radio label="电话催收">电话催收</el-radio>
                    <el-radio label="电话管理">电话管理</el-radio>
                    <el-radio label="案件管理">案件管理</el-radio>
                    <el-radio label="待银行查账管理">待银行查账</el-radio>
                  </el-radio-group>
                </div>
                <div class="right-oper">
                </div>
              </div>
              <el-table
                highlight-current-row
                :data="logList"
              >
                <el-table-column
                  prop="opTime"
                  width="150"
                  show-overflow-tooltip
                  label="时间"
                >
                </el-table-column>
                <el-table-column
                  prop="type"
                  width="150"
                  show-overflow-tooltip
                  label="类别"
                >
                </el-table-column>
                <el-table-column
                  prop="context"
                  show-overflow-tooltip
                  label="操作内容"
                >
                </el-table-column>
                <el-table-column
                  prop="operName"
                  width="100"
                  show-overflow-tooltip
                  label="操作人"
                >
                </el-table-column>
                <el-table-column label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button type="text" v-if="caseDetail.deleteAuth"
                               @click="delOpLog(scope.row)"
                               class="fontColor"
                    >删除
                    </el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="诉讼案件" name="12" class="tabs-wrap telPanel susong">
              <div class="operation">
                <div class="left-oper"></div>
                <div class="right-oper">
                  <el-button
                    class="btn"
                    type="primary"
                    @click="litigationApply"
                    v-if=" caseDetail.currentuser || mycaseFlag"
                  >申请诉讼
                  </el-button
                  >
                </div>
              </div>
              <el-table
                highlight-current-row
                :data="legalList"
              >
                <el-table-column
                  prop="legalStatusMsg"
                  show-overflow-tooltip
                  label="案件状态"
                >
                </el-table-column>
                <el-table-column
                  prop="progressMsg"
                  show-overflow-tooltip
                  label="办案进度"
                >
                </el-table-column>
                <el-table-column
                  prop="legalType"
                  show-overflow-tooltip
                  label="案件类型"
                >
                </el-table-column>
                <el-table-column
                  prop="cstName"
                  show-overflow-tooltip
                  label="客户姓名"
                >
                </el-table-column>
                <el-table-column
                  prop="legalDate"
                  show-overflow-tooltip
                  label="委案日期"
                >
                </el-table-column>
                <el-table-column
                  prop="clientele"
                  show-overflow-tooltip
                  label="委托人"
                >
                </el-table-column>
                <el-table-column
                  prop="accused"
                  show-overflow-tooltip
                  label="被告人"
                >
                </el-table-column>
                <el-table-column
                  prop="tital"
                  show-overflow-tooltip
                  label="标的"
                >
                </el-table-column>
                <el-table-column
                  prop="cost"
                  show-overflow-tooltip
                  label="费用"
                >
                </el-table-column>
                <el-table-column
                  prop="owner"
                  show-overflow-tooltip
                  label="所属人"
                >
                </el-table-column>
                <el-table-column
                  prop="court"
                  show-overflow-tooltip
                  label="受案法院"
                >
                </el-table-column>
                <el-table-column
                  prop="legalNo"
                  show-overflow-tooltip
                  label="案号"
                >
                </el-table-column>
                <el-table-column
                  prop="remark"
                  show-overflow-tooltip
                  label="备注"
                >
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="减免管理" name="13" class="tabs-wrap susong">
              <div class="operation">
                <div class="left-oper"></div>
                <div class="right-oper">
                  <el-button
                    class="btn"
                    type="primary"
                    v-if=" caseDetail.currentuser || mycaseFlag"
                    @click="showadddialogVisible"
                  >添加减免申请</el-button>
                </div>
              </div>
              <el-table
                highlight-current-row
                :data="reduceApplyList"
              >
                <el-table-column
                  prop="reduceType"
                  show-overflow-tooltip
                  label="类型"
                >
                </el-table-column>
                <el-table-column
                  prop="applyStatusMsg"
                  show-overflow-tooltip
                  label="处理状态"
                >
                  <template slot-scope="scope">
                    {{
                    scope.row.applyStatus == 0
                    ? "待审核"
                    : scope.row.applyStatus == 1
                    ? "已审核"
                    : "已完成"
                    }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="applyStatusMsg"
                  show-overflow-tooltip
                  label="减免/报备状态"
                >
                </el-table-column>
                <el-table-column
                  prop="applyTime"
                  show-overflow-tooltip
                  label="申请日期"
                >
                </el-table-column>
                <el-table-column
                  prop="applyUser"
                  show-overflow-tooltip
                  label="减免申请人"
                >
                </el-table-column>
                <el-table-column
                  prop="auditTime"
                  show-overflow-tooltip
                  label="审核日期"
                >
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  show-overflow-tooltip
                  label="提交日期"
                >
                </el-table-column>
                <el-table-column
                  prop="completeTime"
                  show-overflow-tooltip
                  label="完成日期"
                >
                </el-table-column>
                <el-table-column
                  prop="completeUser"
                  show-overflow-tooltip
                  label="完成人"
                >
                </el-table-column>
                <el-table-column
                  prop="reduceResult"
                  show-overflow-tooltip
                  label="减免/报备结果"
                >
                </el-table-column>
                <el-table-column
                  prop="user"
                  show-overflow-tooltip
                  label="是否报备"
                >
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  width="120"
                  label="操作"
                >
                  <template slot-scope="scope">
                    <!--<el-upload
                      class="upload-demo"
                      :action="action + '/reduce/save/import'"
                      :headers="header"
                      :show-file-list="false"
                      :data="fileNames"
                      :on-change="handleChange"
                      :on-success="uploadSuccess2"
                    >
                      <el-button
                        size="small"
                        @click="moreId(scope.row.id)"
                        type="text"
                      >上传
                      </el-button
                      >
                    </el-upload>-->
                    <el-button
                      type="text"
                      size="small"
                      @click="moreId(scope.row)"
                    >上传
                    </el-button
                    >
                    <el-button
                      type="text"
                      size="small"
                      @click="editData(scope.row)"
                    >修改
                    </el-button
                    >
                    <el-button
                      type="text"
                      size="small"
                      @click="deteleData(scope.row.id)"
                    >删除
                    </el-button
                    >
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
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="saveSelfInfo"
                class="btn"
              >保存
              </el-button
              >
            </div>
            <el-input
              type="textarea"
              :rows="8"
              show-word-limit
              maxlength="30"
              v-model="caseDetail.selfInfo"
            ></el-input>
          </el-card>
        </div>
      </div>
      <!--  </el-collapse-item>-->
    </div>
    <div class="basic-info">
      <!-- <el-collapse-item title="催记信息" name="4">-->
      <div class="title-box">
        <p class="title1">催记信息</p>
        <p class="title2">同批次共债催记</p>
      </div>

      <div class="memorize-wrap">
        <div class="left-panel">
          <el-form
            :model="batchForm"
            ref="batchForm"
            label-width="120px"
            class="demo-ruleForm"
          >
          <div class="rowStyle">
            <div class="itemStyle2">
                <el-form-item label="电话" prop="mobile" class="lableStyle2_phone">
                    <img src="./bohao1.png" style="padding-left:7px;margin-top: 0px;cursor: pointer;" @click="sendTel2"/>
                    <img src="./bohao2.png" style="padding-left:4px;margin-top: 0px;cursor: pointer;" @click="sendTel"/>
                </el-form-item>
              <!-- <el-col :span="16"> -->
                <el-input
                  v-model="batchForm.mobile"
                  clearable
                  placeholder="请输入电话号码"
                  class="fixwidth2"
                ></el-input>
              <!-- </el-col>
              <el-col :span="4"> -->
              <!-- </el-col>
              <el-col :span="4"> -->
              <!-- </el-col>            -->

            </div>
            <div class="itemStyle2">
              <el-form-item label="姓名" prop="targetName" class="lableStyle2">
              </el-form-item>
                <el-input
                  v-model="batchForm.targetName" clearable
                  placeholder="请输入姓名"
                  class="fixwidth2"
                ></el-input>
            </div>
            <div class="itemStyle2">
              <el-form-item label="关系" prop="relation" class="lableStyle2">
              </el-form-item>
                <el-input
                  v-model="batchForm.relation" clearable
                  placeholder="请输入关系"
                  class="fixwidth2"
                ></el-input>
            </div>
            <div class="itemStyle2">
            <el-form-item label="还款方式" prop="method" class="lableStyle2">
            </el-form-item>
              <el-select
                v-model="batchForm.method" clearable
                placeholder="请选择还款方式"
                class="fixwidth2"
              >
                <el-option
                  v-for="item in tpfsList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
            <div class="itemStyle2">
              <el-form-item label="催收结果" class="lableStyle2" prop="result" :rules="{required: true, message: '催收结果不能为空', trigger: 'blur'}">
              </el-form-item>
                <el-select
                  v-model="batchForm.result"
                  placeholder="请选择催收结果" clearable
                  class="fixwidth2"
                >
                  <el-option
                    v-for="item in csjgList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
            </div>
             <div class="itemStyle2">
              <el-form-item label="承诺还款金额" prop="repayAmt" class="lableStyle2">
              </el-form-item>
                <el-input
                  v-model="batchForm.repayAmt" clearable
                  placeholder="请输入承诺还款金额"
                  class="fixwidth2"
                ></el-input>
             </div>
             <div class="itemStyle2">
              <el-form-item label="承诺还款日期" prop="repayTime" class="lableStyle2">
              </el-form-item>
                <el-date-picker
                  v-model="batchForm.repayTime" clearable
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="请输入承诺还款日期"
                  class="fixwidth2"
                ></el-date-picker>
             </div>
             <div class="itemStyle2">
                <el-form-item label="通话记录" prop="collectInfo" class="lableStyle2" :rules="{required: true, message: '通话记录不能为空', trigger: 'blur'}">
                </el-form-item>
                  <el-input
                    type="textarea" clearable
                    :rows="4"
                    placeholder="请输入通话记录"
                    v-model="batchForm.collectInfo"
                    class="fixwidth2_info"
                    maxlength="70"
                    show-word-limit
                  >
                  </el-input>
             </div>
             <div class="itemStyle2">
              <el-form-item label="催收状态" prop="collectStatus" class="lableStyle2">
              </el-form-item>
                <el-select
                  v-model="batchForm.collectStatus" clearable
                  placeholder="请选择催收状态"
                  class="fixwidth2"
                >
                  <el-option
                    v-for="item in csztList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
             </div>
             <div class="itemStyle2">
              <el-form-item label=" " prop="cszt">
              </el-form-item>
                <el-checkbox
                  v-model="batchForm.sType"
                  :true-label="1"
                  :false-label="0"
                >更新批次共债案件催收状态</el-checkbox>
             </div>
             <div class="itemStyle2">
              <el-form-item label="下次跟进日期" prop="nextFollDate" class="lableStyle2">
              </el-form-item>
                <el-date-picker
                  v-model="batchForm.nextFollDate"
                  type="date"
                  clearable
                  value-format="yyyy-MM-dd"
                  placeholder="请选择下次跟进日期"
                  class="fixwidth2"
                ></el-date-picker>
             </div>
          </div>
          </el-form>
          <div class="operation">
            <el-button type="primary" @click="onClickSaveCollection('batchForm')"
            class="btn"
            >保存</el-button>
            <el-button @click="batchForm = { sType: 0,targetName:'',mobile:'',relation:'',collectInfo:'' };$nextTick(()=>{
                if($refs['batchForm']) {
                  $refs['batchForm'].resetFields()
                }
              });">清空</el-button>
          </div>
        </div>
        <div class="right-panel">
          <el-table
            highlight-current-row
            :data="syncMemorizeList"
            border
          >
            <el-table-column
              prop="createTime"
              sortable
              :sort-orders="['ascending','descending']"
              width="130"
              label="催收时间"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column
              prop="targetName"
              width="120"
              label="对象姓名"
              show-overflow-tooltip
              align="center"
            ></el-table-column>

            <el-table-column
              prop="relation"
              width="120"
              label="关系"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column
              prop="mobile"
              width="120"
              label="电话"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column
              prop="collectInfo"
              label="催收记录"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column
              prop="odv"
              width="120"
              label="催收员"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
          </el-table>
        </div>
      </div>
      <!-- </el-collapse-item>-->
    </div>
    <el-dialog
      title="新增/编辑电话"
      :visible.sync="dialogVisible"
      width="45%"
      append-to-body
      :close-on-click-modal="false"
      v-dialogDrag
      class="dialog-wrap"
    >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input
            v-model="formInline.name"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="关系">
          <el-input
            v-model="formInline.relation"
            placeholder="请输入关系"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input
            v-model="formInline.tel"
            placeholder="请输入电话"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-select
            v-model="formInline.type"
            placeholder="请选择分类"
            clearable
          >
            <el-option
              v-for="item in PhonetypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id + ''"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="formInline.telStatusMsg"
            placeholder="请选择状态"
            clearable
          >
            <el-option
              v-for="item in statusList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" style="width: 90%;">
          <el-input
            type="textarea"
            v-model="formInline.remark"
            style="width: 180%;"
          ></el-input>
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
      class="addr-dialog-wrap dialog-wrap"
      :close-on-click-modal="false"
      v-dialogDrag
    >
      <el-form
        :inline="true"
        :model="addressInfo"
        class="address-form"
        label-width="50px"
      >
        <el-form-item label="姓名">
          <el-input
            v-model="addressInfo.name"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="关系">
          <el-input
            v-model="addressInfo.relation"
            placeholder="请输入关系"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址" class="whole">
          <el-input
            v-model="addressInfo.address"
            placeholder="请输入地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select
            v-model="addressInfo.type"
            placeholder="请选择分类"
            clearable
          >
            <el-option key="1" label="单位地址" value="单位地址"></el-option>
            <el-option key="2" label="家庭地址" value="家庭地址"></el-option>
            <el-option
              key="3"
              label="对账单地址"
              value="对账单地址"
            ></el-option>
            <el-option key="4" label="户籍地址" value="户籍地址"></el-option>
            <el-option key="5" label="其他地址" value="其他地址"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="addressInfo.status"
            placeholder="请选择状态"
            clearable
          >
            <el-option
              v-for="item in statusList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
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
      title="新建待银行查账"
      :visible.sync="dialogCpVisible"
      width="45%"
      append-to-body
      class="addr-dialog-wrap dialog-wrap"
      :close-on-click-modal="false"
      v-dialogDrag
    >
      <el-form
        :inline="true"
        :model="cpInfo"
        class="address-form"
        label-width="120px"
      >
        <el-form-item label="待银行查账金额">
          <el-input
            v-model="cpInfo.cpMoney"
            type="number"
            placeholder="请输入待银行查账金额"
          ></el-input>
        </el-form-item>
        <el-form-item label="待银行查账时间">
          <el-date-picker
            v-model="cpInfo.cpDate"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="还款人">
          <el-input
            v-model="cpInfo.repayUser"
            placeholder="请输入还款人"
          ></el-input>
        </el-form-item>
        <el-form-item label="还款方式">
          <el-select
            v-model="cpInfo.repayType"
            placeholder="请选择还款方式"
            clearable
          >
            <el-option
              v-for="item in repayTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="还款备注" class="whole">
          <el-select
            v-model="cpInfo.remark"
            placeholder="请选择还款备注"
            clearable
          >
            <el-option
              v-for="item in repayRemarkList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCpVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCpInfo">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="collectTitle"
      :visible.sync="dialogDataCollectVisible"
      width="45%"
      append-to-body
      class="addr-dialog-wrap dialog-wrap"
      :close-on-click-modal="false"
      v-dialogDrag
    >
      <el-form
        :inline="true"
        :model="dataCollectInfo"
        class="address-form"
        label-width="100px"
      >
        <el-form-item label="催收措施">
          <el-select
            v-model="dataCollectInfo.measure"
            placeholder="请选择催收措施"
            clearable
          >
            <el-option :key="1" label="电话催收" value="电话催收"></el-option>
            <el-option :key="2" label="信函" value="信函"></el-option>
            <el-option :key="3" label="辅助渠道" value="辅助渠道"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话">
          <el-input
            v-model="dataCollectInfo.mobile"
            placeholder="请输入电话"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input
            v-model="dataCollectInfo.targetName"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select
            v-model="dataCollectInfo.telType"
            placeholder="请选择类型"
            clearable
          >
            <el-option
              v-for="item in PhonetypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id + ''"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关系">
          <el-input
            v-model="dataCollectInfo.relation"
            placeholder="请输入关系"
          ></el-input>
        </el-form-item>
        <el-form-item label="催收时间" v-if="dataCollectEditType==='edit'">
          <el-date-picker
            v-model="dataCollectInfo.collectTime"
            type="datetime"
            placeholder="选择催收时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="催收内容" class="whole">
          <el-input
            type="textarea"
            :row="4"
            v-model="dataCollectInfo.collectInfo"
          ></el-input>
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
      class="addr-dialog-wrap dialog-wrap"
      :close-on-click-modal="false"
      v-dialogDrag
    >
      <el-form
        :inline="true"
        :model="archiveInfo"
        class="address-form"
        label-width="100px"
      >
        <el-form-item label="证件号" class="whole">
          <el-input
            v-model="archiveInfo.identNo"
            placeholder="请输入证件号"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input
            v-model="archiveInfo.name"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="信息类型">
          <el-input
            v-model="archiveInfo.msgType"
            placeholder="请输入信息类型"
          ></el-input>
        </el-form-item>
        <el-form-item label="信息内容" class="whole">
          <el-input
            type="textarea"
            :row="4"
            v-model="archiveInfo.msgContext"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" class="whole">
          <el-input
            type="textarea"
            :row="4"
            v-model="archiveInfo.remark"
          ></el-input>
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
      class="addr-dialog-wrap dialog-wrap"
      :close-on-click-modal="false"
      v-dialogDrag
    >
      <el-form
        :inline="true"
        :model="letterInfo"
        class="address-form"
        label-width="80px"
      >
        <el-form-item label="地址" class="whole">
          <el-input
            :disabled="true"
            v-model="letterInfo.address"
            placeholder="请输入关系"
          ></el-input>
        </el-form-item>
        <el-form-item label="模板">
          <el-select
            v-model="letterInfo.module"
            placeholder="请选择状态"
            clearable
          >
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
          <el-input
            v-model="letterInfo.relationer"
            placeholder="请输入联系人"
          ></el-input>
        </el-form-item>
        <el-form-item label="申请内容" class="whole">
          <el-input
            type="textarea"
            v-model="letterInfo.applyContext"
          ></el-input>
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
      :close-on-click-modal="false"
      v-dialogDrag
      class="dialog-wrap"
    >
      <el-form
        :inline="true"
        :model="messageForm"
        ref="messageForm"
        label-width="130px"
        class="demo-dynamic"
      >
        <el-row :gutter="24">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="还款人姓名">
                <el-input
                  v-model="messageForm.payer"
                  placeholder="请输入姓名"
                  clearable
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="关系">
                <el-input
                  v-model="messageForm.relation"
                  placeholder="请输入关系"
                  clearable
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="联系方式">
                <el-input
                  v-model="messageForm.contactWay"
                  style="width: 180%;"
                  placeholder="请输入联系方式"
                  clearable
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label=" ">
                <el-select
                  v-model="messageForm.contactWay2"
                  placeholder="请选择" @change="changeWay"
                  clearable
                >
                  <el-option
                    v-for="item in caseDetail.dataCaseTelEntityList"
                    :key="item.tel"
                    :label="item.tel"
                    :value="item.tel"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="是否共债">
                <el-radio-group v-model="messageForm.joinFlag">
                  <el-radio label="0">是</el-radio>
                  <el-radio label="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="是否可联">
                <el-input
                  v-model="messageForm.connectFlag"
                  placeholder="请输入是否可联"
                  clearable
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24">

          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="已还款">
                <el-input
                  v-model="messageForm.enRepayAmt"
                  placeholder="请输入已还款金额" type="number"
                  clearable
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="承诺还款金额">
                <el-input
                  v-model="messageForm.repayAmt"
                  placeholder="请输入还款金额"  type="number"
                  clearable
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="承诺还款日期">
                <div class="block">
                  <el-date-picker
                    v-model="messageForm.repayTime"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </div>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="减免原因">
                <el-input
                  v-model="messageForm.reduceReason"
                  placeholder="请输入减免原因"
                  clearable
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="减免材料">
                <el-input
                  v-model="messageForm.reduceData"
                  placeholder="请输入减免材料"
                  clearable
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input
                type="textarea"
                v-model="messageForm.remark"
                style="width: 200%;"
              >>
              </el-input
              >
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
      append-to-body
      :close-on-click-modal="false"
      v-dialogDrag
    >
      <el-form
        :inline="true"
        :model="legalForm"
        class="address-form"
        label-width="150px"
      >
        <el-form-item label="姓名">
          <el-input
            v-model="legalForm.cstName"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="案件状态">
          <el-select
            v-model="legalForm.legalStatus"
            filterable
            placeholder="请选择案件状态"
            clearable
          >
            <el-option
              v-for="item in legalStatusMsgList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号">
          <el-input
            v-model="legalForm.identNo"
            placeholder="请输入证件号"
          ></el-input>
        </el-form-item>
        <el-form-item label="办案进度">
          <el-select
            v-model="legalForm.progress"
            filterable
            placeholder="请选择案件进度"
            clearable
          >
            <el-option
              v-for="item in progressList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="案件类型">
          <el-select
            v-model="legalForm.legalType"
            filterable
            placeholder="请选择案件类型"
            clearable
          >
            <el-option
              v-for="item in caseStatusList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标的">
          <el-input
            v-model="legalForm.tital"
            placeholder="请输入标的"
          ></el-input>
        </el-form-item>
        <el-form-item label="委托人">
          <el-input
            v-model="legalForm.clientele"
            placeholder="请输入委托人"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属人">
          <el-select
            v-model="legalForm.owner"
            filterable
            placeholder="请选择所属人"
            clearable
          >
            <el-option
              v-for="item in PersonDataList"
              :key="item.id"
              :label="item.userName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="被告人">
          <el-input
            v-model="legalForm.accused"
            placeholder="请输入被告人"
          ></el-input>
        </el-form-item>
        <el-form-item label="代理律师">
          <el-input
            v-model="legalForm.agent"
            placeholder="请输入代理律师"
          ></el-input>
        </el-form-item>
        <el-form-item label="律师联系方式">
          <el-input
            v-model="legalForm.agentTel"
            placeholder="请输入联系方式"
          ></el-input>
        </el-form-item>
        <el-form-item label="费用">
          <el-input
            v-model="legalForm.cost"
            placeholder="请输入费用"
          ></el-input>
        </el-form-item>
        <el-form-item label="委案日期">
          <el-date-picker
            v-model="legalForm.legalDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="受案日期">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="legalForm.filingDat"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="受案法院">
          <el-input
            v-model="legalForm.court"
            placeholder="请输入法院"
          ></el-input>
        </el-form-item>
        <el-form-item label="办案法官">
          <el-input
            v-model="legalForm.judge"
            placeholder="请输入办案法官"
          ></el-input>
        </el-form-item>
        <el-form-item label="法官联系方式">
          <el-input
            v-model="legalForm.judgeTel"
            placeholder="请输入联系方式"
          ></el-input>
        </el-form-item>
        <el-form-item label="案号">
          <el-input
            v-model="legalForm.legalNo"
            placeholder="请输入案号"
          ></el-input>
        </el-form-item>
        <el-form-item label="首次开庭日期">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="legalForm.firstDate"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="判决日期">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="legalForm.judgeDate"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="申请执行案号">
          <el-input
            v-model="legalForm.exeNo"
            placeholder="请输入案号"
          ></el-input>
        </el-form-item>
        <el-form-item label="申请执行日期">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="legalForm.exeDate"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="执行终结日期">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="legalForm.exeEndDate"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="诉讼缴费日期">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="legalForm.costDate"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="保全缴费日期">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="legalForm.preservationDate"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="保全资产清单" class="whole">
          <el-input
            type="textarea"
            v-model="legalForm.preservationList"
          ></el-input>
        </el-form-item>
        <el-form-item label="送达情况" class="whole">
          <el-input
            v-model="legalForm.arriveInfo"
            placeholder="请输入送达情况"
          ></el-input>
        </el-form-item>
        <el-form-item label="判决书" class="whole">
          <el-input type="textarea" v-model="legalForm.judgment"></el-input>
        </el-form-item>
        <el-form-item label="备  注" class="whole">
          <el-input type="textarea" v-model="legalForm.remark"></el-input>
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
      class="addr-dialog-wrap dialog-wrap"
      :close-on-click-modal="false"
      v-dialogDrag
    >
      <el-form
        :inline="true"
        :model="synergyInfo"
        class="address-form"
        label-width="80px"
      >
        <el-form-item label="协催类型" class="whole">
          <el-select
            v-model="synergyInfo.synergisticType"
            placeholder="请选择协催类型"
            clearable
            style="width:70%"
          >
            <el-option
              v-for="item in synergyTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请内容" class="whole">
          <el-select
            v-model="synergyInfo.applyContent"
            placeholder="请选择协催内容"
            clearable
            style="width:70%"
          >
            <el-option
              v-for="item in synergyContextList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
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
      class="addr-dialog-wrap dialog-wrap"
      :close-on-click-modal="false"
      v-dialogDrag
    >
      <el-form
        :inline="true"
        :model="synergyInfo"
        ref="synergyInfo"
        class="address-form"
        label-width="80px"
      >
        <el-form-item
          label="协催类型"
          prop="synergisticType"
          :rules="{
            required: true,
            message: '请选择',
            trigger: 'change'
          }"
        >
          <el-select
            v-model="synergyInfo.synergisticType"
            placeholder="请选择协催类型"
            clearable
            style="width:70%"
          >
            <el-option
              v-for="item in synergyTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="协催人"
          prop="synergisticUser"
          :rules="{
            required: true,
            message: '请选择',
            trigger: 'change'
          }"
        >
          <el-select
            v-model="synergyInfo.synergisticUser"
            filterable
            placeholder="请选择协催类型"
            clearable
            style="width:70%"
          >
            <el-option
              v-for="item in PersonDataList"
              :key="item.id"
              :label="item.userName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="协催结果" class="whole">
          <el-input
            type="textarea"
            :rows="7"
            v-model="synergyInfo.synergisticResult"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogSyergyResultVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveSynergyResult('synergyInfo')"
        >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      title="催收小结(带*为必填字段)"
      :visible.sync="showCollectInfoVisible"
      width="30%"
      append-to-body
      class="addr-dialog-wrap dialog-wrap"
      :close-on-click-modal="false"
      v-dialogDrag
    >
      <el-form
        :inline="true"
        :model="caseDetail"
        class="address-form"
        label-width="80px"
      >
        <el-form-item label="内容" class="whole">
          <el-input
            type="textarea"
            :rows="7"
            v-model="caseDetail.collectInfo"
            style="width:90%"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showCollectInfoVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCollectInfo">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="添加评语"
      :visible.sync="showCommentVisible"
      width="30%"
      append-to-body
      class="addr-dialog-wrap dialog-wrap"
      :close-on-click-modal="false"
      v-dialogDrag
    >
      <div style="padding-top: 10px;">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入评语"
          v-model="commentAddContent"
        >
        </el-input>
        <el-radio-group
          v-model="commentAddColor"
          style="margin-top:10px;"
        >
          <el-radio label="黑">正常</el-radio>
          <el-radio label="蓝">标蓝</el-radio>
          <el-radio label="红">标红</el-radio>
          <!--   <el-radio label="">不更改</el-radio>-->
        </el-radio-group>
      </div>
      <div style="text-align: right; margin-top: 12px">
        <el-button
          size="mini"
          type="text"
          @click="showCommentVisible = false"
        >取消
        </el-button
        >
        <el-button
          type="primary"
          size="mini"
          @click="onClickAddComment"
        >确定
        </el-button
        >
      </div>
      <el-button
        size="small"
        type="text"
        icon="el-icon-plus"
        title="添加"
        slot="reference"
      ></el-button>
    </el-dialog>
    <el-dialog
      title="添加警告"
      :visible.sync="showWarningVisible"
      width="30%"
      append-to-body
      class="addr-dialog-wrap warninghead dialog-wrap"
      :close-on-click-modal="false"
      v-dialogDrag
    >
      <div style="padding-top: 10px ;">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入警告"
          v-model="caseDetail.warning"
        >
        </el-input>
      </div>
      <div style="text-align: right; margin-top: 12px">
        <el-button
          size="mini"
          type="text"
          @click="showWarningVisible = false"
        >取消
        </el-button
        >
        <el-button
          type="primary"
          size="mini"
          @click="onClickAddWarning"
        >确定
        </el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      title="历史记录"
      class="dialog-wrap"
      :visible.sync="showHistory"
      :close-on-click-modal="false"
      width="75%"
      v-dialogDrag
    >
      <div style="margin-bottom:5px;">
        <el-radio-group
          v-model="historyType"
          @change="getHistoryTel"
        >
          <el-radio :label="1">本案催记</el-radio>
          <el-radio :label="2">同号码所有催记</el-radio>
        </el-radio-group>
      </div>
      <el-table :data="telhistory" v-loading="telhistoryLoading">
        <el-table-column
          property="collectTime"
          label="通话时间"
        ></el-table-column>
        <el-table-column
          property="targetName"
          label="通话对象"
        ></el-table-column>
        <el-table-column
          property="mobile"
          label="电话号码"
        ></el-table-column>
        <!-- <el-table-column
          property="sType"
          label="电话类型"
        ></el-table-column> -->
        <el-table-column
          property="collectInfo"
          label="通话内容"
        ></el-table-column>
        <el-table-column
          property="result"
          label="通话结果"
        ></el-table-column>
        <el-table-column
          property="repayTime"
          label="承诺还款日期"
        ></el-table-column>
        <el-table-column
          property="repayAmt"
          label="承诺还款金额"
        ></el-table-column>
        <el-table-column
          property="odv"
          label="催收员"
        ></el-table-column>
      </el-table>
      <div style="text-align:center">
        <el-button
          type="primary"
          @click="showHistory=false"
        >关闭
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="附件列表"
      class="dialog-wrap"
      :visible.sync="reduceFileVisible"
      :close-on-click-modal="false"
      width="500px"
      v-dialogDrag
    >
      <el-upload
        class="upload-demo"
        :action="action + '/reduce/save/import'"
        :headers="header"
        :show-file-list="false"
        :data="fileNames"
        :on-change="handleChange"
        :on-success="uploadSuccess2"
      >
        <el-button
          size="small"
          type="primary"
          style="text-align: right;"
        >上传
        </el-button
        >
      </el-upload>
      <el-table highlight-current-row
                :data="reduceFileList"
                border
                stripe
      >
        <el-table-column
          prop="fileName"
          align="center"

          label="附件名称"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="140"
          align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="deleteReduceFile(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog
      title="修改案件(带*号为必填字段)"
      :visible.sync="dialogEditCaseVisible"
      width="50%"
      append-to-body
      class="case-dialog-wrap"
      :close-on-click-modal="false"
      v-dialogDrag
    >
      <el-form
        :inline="true"
        :model="caseInfo"
        :rules="rules"
        ref="ruleForm"
        class="address-form"
        label-width="110px"
      >
        <el-form-item label="个案序列号" prop="seqNo">
          <el-input
            v-model="caseInfo.seqNo"
            clearable
            placeholder="请输入个案序列号"
          ></el-input>
        </el-form-item>
        <el-form-item label="催收手别" prop="collectHand">
          <el-input
            v-model="caseInfo.collectHand"
            clearable
            placeholder="请输入催收手别"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="caseInfo.name"
            clearable
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="催收区域" prop="collectArea">
          <el-select v-model="caseInfo.collectArea" filterable  placeholder="请选择催收区域" clearable>
            <el-option
              v-for="item in areaList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="caseInfo.gender" clearable>
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="委托方" prop="client">
          <el-select v-model="caseInfo.client" filterable  placeholder="请选择委托方" clearable>
            <el-option
              v-for="item in clientList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号" prop="identNo">
          <el-input
            v-model="caseInfo.identNo"
            placeholder="请输入证件号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="证件类型" prop="identType">
          <el-input
            v-model="caseInfo.identType"
            clearable
            placeholder="请输入证件类型"
          ></el-input>
        </el-form-item>
        <el-form-item label="卡号" prop="cardNo">
          <el-input
            v-model="caseInfo.cardNo"
            clearable
            placeholder="请输入卡号"
          ></el-input>
        </el-form-item>
        <el-form-item label="委案日期" prop="caseDate">
          <el-date-picker
            v-model="caseInfo.caseDate"
            align="right"
            type="date"
            clearable
            placeholder="请选择委案日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="委案金额" prop="money">
          <el-input
            v-model="caseInfo.money"
            clearable
            type="number"
            placeholder="请输入委案金额"
          ></el-input>
        </el-form-item>
        <el-form-item label="M值系数" prop="mVal">
          <el-input
            v-model="caseInfo.mVal"
            clearable
            type="number"
            placeholder="请输入M值系数"
          ></el-input>
        </el-form-item>
        <el-form-item label="预计退案日期" prop="expectTime">
          <el-date-picker
            v-model="caseInfo.expectTime"
            align="right"
            type="date"
            clearable
            placeholder="请选择退案日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否结清" prop="settleFlag">
          <el-radio-group v-model="caseInfo.settleFlag" clearable  >
            <el-radio label="已结清">是</el-radio>
            <el-radio label="未结清">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="逾期账龄" prop="accountAge">
          <el-select v-model="caseInfo.accountAge" filterable  placeholder="请选择逾期账龄" clearable>
            <el-option
              v-for="item in accountAgeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="逾期天数" prop="overdueDays">
          <el-input
            v-model="caseInfo.overdueDays"
            type="number"
            clearable
            placeholder="请输入逾期天数"
          ></el-input>
        </el-form-item>
        <el-form-item label="所在区域" class="whole address">
          <div>
          <el-select v-model="caseInfo.provinceName"  placeholder="请选择省份" @change="showCity()" clearable>
              <el-option
                v-for="item in addressList"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
          </el-select>
          <el-select v-model="caseInfo.cityName"  placeholder="请选择市" @change="showcounty()" clearable>
            <el-option
              v-for="item in cityList"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
          <el-select v-model="caseInfo.countyName"  placeholder="请选择县" clearable>
            <el-option
              v-for="item in countyList"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
          </div>
        </el-form-item>
        <el-form-item label="公司佣金比率">
          <el-input
            v-model="caseInfo.commissionRate"
            type="number"
            clearable
            placeholder="请输入公司佣金比率"
          ></el-input>
        </el-form-item>
        <el-form-item label="公司佣金金额">
          <el-input
            v-model="caseInfo.commissionMoney"
            type="number"
            clearable
            placeholder="请输入公司佣金金额"
          ></el-input>
        </el-form-item>
        <el-form-item label="请输入委案期数">
          <el-input
            v-model="caseInfo.entrustPeriods"
            type="number"
            clearable
            placeholder="请输入委案期数"
          ></el-input>
        </el-form-item>
        <el-form-item label="币种">
          <el-input
            v-model="caseInfo.currencyType"
            clearable
            placeholder="请输入币种"
          ></el-input>
        </el-form-item>
        <el-form-item label="货款订单号">
          <el-input
            v-model="caseInfo.orderNo"
            clearable
            placeholder="请输入货款订单号"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品名称">
          <el-input
            v-model="caseInfo.goods"
            clearable
            placeholder="请输入产品名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="人民币">
          <el-input
            v-model="caseInfo.rmb"
            clearable
            placeholder="请输入人民币"
          ></el-input>
        </el-form-item>
        <el-form-item label="港币">
          <el-input
            v-model="caseInfo.hkd"
            clearable
            placeholder="请输入港币"
          ></el-input>
        </el-form-item>
        <el-form-item label="外币">
          <el-input
            v-model="caseInfo.foreignCurrency"
            clearable
            placeholder="请输入外币"
          ></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input
            v-model="caseInfo.account"
            clearable
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="账户名称"  class="whole">
          <el-input
            v-model="caseInfo.accountName"
            clearable
            placeholder="请输入账户名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="逾期日期">
          <el-date-picker
            v-model="caseInfo.overdueDate"
            align="right"
            type="date"
            clearable
            placeholder="请选择逾期日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="逾期金额">
          <el-input
            v-model="caseInfo.overdueMoney"
            type="number"
            clearable
            placeholder="请输入逾期金额"
          ></el-input>
        </el-form-item>
        <el-form-item label="逾期本金">
          <el-input
            v-model="caseInfo.overduePrinciple"
            type="number"
            clearable
            placeholder="请输入逾期本金"
          ></el-input>
        </el-form-item>
        <el-form-item label="逾期利息">
          <el-input
            v-model="caseInfo.overdueInterest"
            type="number"
            clearable
            placeholder="请输入逾期利息"
          ></el-input>
        </el-form-item>
        <el-form-item label="逾期罚息">
          <el-input
            v-model="caseInfo.overdueDefaultInterest"
            type="number"
            clearable
            placeholder="请输入逾期罚息"
          ></el-input>
        </el-form-item>
        <el-form-item label="逾期管理费">
          <el-input
            v-model="caseInfo.overdueManagementCost"
            type="number"
            clearable
            placeholder="请输入逾期管理费"
          ></el-input>
        </el-form-item>
        <el-form-item label="违约金">
          <el-input
            v-model="caseInfo.penalty"
            type="number"
            clearable
            placeholder="请输入违约金"
          ></el-input>
        </el-form-item>
        <el-form-item label="还款期限">
          <el-input
            v-model="caseInfo.repayDeadline"
            clearable
            placeholder="请输入还款期限"
          ></el-input>
        </el-form-item>
        <el-form-item label="逾期期数">
          <el-input
            v-model="caseInfo.entrustPeriods"
            type="number"
            clearable
            placeholder="请输入逾期期数"
          ></el-input>
        </el-form-item>
        <el-form-item label="曾逾期次数">
          <el-input
            v-model="caseInfo.overdueTimes"
            type="number"
            clearable
            placeholder="请输入曾逾期次数"
          ></el-input>
        </el-form-item>
        <el-form-item label="已还期数">
          <el-input
            v-model="caseInfo.repaidPeriods"
            type="number"
            clearable
            placeholder="请输入已还期数"
          ></el-input>
        </el-form-item>
        <el-form-item label="委托期限">
          <el-input
            v-model="caseInfo.caseDeadline"
            clearable
            placeholder="请输入委托期限"
          ></el-input>
        </el-form-item>
        <el-form-item label="档案号">
          <el-input
            v-model="caseInfo.archiveNo"
            clearable
            placeholder="请输入档案号数"
          ></el-input>
        </el-form-item>
        <el-form-item label="开户行">
          <el-input
            v-model="caseInfo.bank"
            clearable
            placeholder="请输入开户行"
          ></el-input>
        </el-form-item>
        <el-form-item label="催收分类">
          <el-input
            v-model="caseInfo.collectionType"
            clearable
            placeholder="请输入催收分类"
          ></el-input>
        </el-form-item>
        <el-form-item label="拖欠级别">
          <el-input
            v-model="caseInfo.defaultLevel"
            clearable
            placeholder="请输入拖欠级别"
          ></el-input>
        </el-form-item>
        <el-form-item label="卡类">
          <el-input
            v-model="caseInfo.cardType"
            clearable
            placeholder="请输入卡类"
          ></el-input>
        </el-form-item>
        <el-form-item label="信用额度">
          <el-input
            v-model="caseInfo.creditLine"
            clearable
            placeholder="请输入信用额度"
          ></el-input>
        </el-form-item>
        <el-form-item label="固定额度">
          <el-input
            v-model="caseInfo.fixedQuota"
            clearable
            placeholder="请输入固定额度"
          ></el-input>
        </el-form-item>
        <el-form-item label="最低还款额">
          <el-input
            v-model="caseInfo.minimumPayment"
            type="number"
            clearable
            placeholder="请输入最低还款额"
          ></el-input>
        </el-form-item>
        <el-form-item label="滞纳金">
          <el-input
            v-model="caseInfo.lateFee"
            type="number"
            clearable
            placeholder="请输入滞纳金"
          ></el-input>
        </el-form-item>
        <el-form-item label="超限费">
          <el-input
            v-model="caseInfo.overrunFee"
            clearable
            type="number"
            placeholder="请输入超限费"
          ></el-input>
        </el-form-item>
        <el-form-item label="账单周期">
          <el-input
            v-model="caseInfo.billCycle"
            clearable
            placeholder="请输入账单周期"
          ></el-input>
        </el-form-item>
        <el-form-item label="未出账金额">
          <el-input
            v-model="caseInfo.outstandingAmount"
            clearable
            type="number"
            placeholder="请输入未出账金额"
          ></el-input>
        </el-form-item>
        <el-form-item label="账单日">
          <el-date-picker
            v-model="caseInfo.billDate"
            align="right"
            type="date"
            clearable
            placeholder="请选择账单日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开卡日">
          <el-date-picker
            v-model="caseInfo.activeCardDate"
            align="right"
            type="date"
            clearable
            placeholder="请选择开卡日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最后消费日">
            <el-date-picker
              v-model="caseInfo.lastConsumeDate"
              align="right"
              type="date"
              clearable
              placeholder="请选择最后消费日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
        </el-form-item>
        <el-form-item label="停卡日">
            <el-date-picker
              v-model="caseInfo.stopCardDate"
              align="right"
              type="date"
              clearable
              placeholder="请选择停卡日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
        </el-form-item>
        <el-form-item label="主副卡">
          <el-input
            v-model="caseInfo.mainDeputyCard"
            clearable
            placeholder="请输入主副卡"
          ></el-input>
        </el-form-item>
        <el-form-item label="副卡卡人">
          <el-input
            v-model="caseInfo.deputyCardUserName"
            clearable
            placeholder="请输入副卡卡人"
          ></el-input>
        </el-form-item>
        <el-form-item label="申请单号">
          <el-input
            v-model="caseInfo.applyOrderNo"
            clearable
            placeholder="请输入申请单号"
          ></el-input>
        </el-form-item>
        <el-form-item label="最后提现日">
          <el-date-picker
            v-model="caseInfo.lastWithdrawDate"
            align="right"
            clearable
            type="date"
            placeholder="请选择最后提现日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最后还款金额">
          <el-input
            v-model="caseInfo.lastRepayMoney"
            type="number"
            clearable
            placeholder="请输入最后还款金额"
          ></el-input>
        </el-form-item>
        <el-form-item label="最后还款日">
          <el-date-picker
            v-model="caseInfo.lastRepayDate"
            align="right"
            type="date"
            clearable
            placeholder="请选择最后还款日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="保证金">
          <el-input
            v-model="caseInfo.bail"
            type="number"
            placeholder="请输入保证金"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="本金">
          <el-input
            v-model="caseInfo.principle"
            type="number"
            placeholder="请输入本金"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="信贷分类">
          <el-input
            v-model="caseInfo.loanType"
            placeholder="请输入信贷分类"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="剩余本金">
          <el-input
            v-model="caseInfo.residualPrinciple"
            type="number"
            clearable
            placeholder="请输入剩余本金"
          ></el-input>
        </el-form-item>
        <el-form-item label="贷款日期">
          <el-date-picker
            v-model="caseInfo.loanDate"
            align="right"
            type="date"
            clearable
            placeholder="请选择贷款日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="贷款截止日">
          <el-date-picker
            v-model="caseInfo.loanDeadline"
            align="right"
            type="date"
            clearable
            placeholder="请选择贷款截止日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditCaseVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCase">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="导出选择"
      :visible.sync="showExportCollectConfVisible"
      width="60%"
      center
      :close-on-click-modal="false"
      v-dialogDrag
      class="dialog-wrap"
    >
      <div style="margin-bottom: 10px;"><span @click="selectAllCollectExport" style="cursor: pointer;">全选</span><span @click="selectUnAllCollectExport" style="cursor: pointer;margin-left:10px;">反选</span></div>
      <el-row class="pad" ref="boxWrapper">

        <el-checkbox v-model="exportCollectConf.name" label="2">姓名</el-checkbox>
        <el-checkbox v-model="exportCollectConf.account" label="3">账号</el-checkbox>
        <el-checkbox v-model="exportCollectConf.cardNo" label="3">卡号</el-checkbox>
        <el-checkbox v-model="exportCollectConf.identNo" label="3">证件号</el-checkbox>
        <el-checkbox v-model="exportCollectConf.archiveNo" label="1">档案号</el-checkbox>
        <el-checkbox v-model="exportCollectConf.seqNo" label="1">个案序列号</el-checkbox>
        <el-checkbox v-model="exportCollectConf.accountAge" label="4">逾期账龄</el-checkbox>
        <el-checkbox v-model="exportCollectConf.money" label="5">委案金额</el-checkbox>
        <el-checkbox v-model="exportCollectConf.residualPrinciple" label="2">欠款余额</el-checkbox>
        <el-checkbox v-model="exportCollectConf.targetName" label="4">对象姓名</el-checkbox>
        <el-checkbox v-model="exportCollectConf.relation" label="5">关系</el-checkbox>
        <el-checkbox v-model="exportCollectConf.collectPhoneAddr" label="5">电话/地址</el-checkbox>
        <el-checkbox v-model="exportCollectConf.contractType" label="5">联络类型</el-checkbox>
        <el-checkbox v-model="exportCollectConf.result" label="5">催收内容</el-checkbox>
        <el-checkbox v-model="exportCollectConf.odv" label="5">催收人员</el-checkbox>
        <el-checkbox v-model="exportCollectConf.method" label="5">谈判方式</el-checkbox>
        <el-checkbox v-model="exportCollectConf.collectStatus" label="5">催收状态</el-checkbox>
        <el-checkbox v-model="exportCollectConf.proRepayDate" label="5">承诺日期</el-checkbox>
        <el-checkbox v-model="exportCollectConf.proRepayAmt" label="5">承诺金额</el-checkbox>
        <el-checkbox v-model="exportCollectConf.reduceAmt" label="5">减免金额</el-checkbox>
        <el-checkbox v-model="exportCollectConf.reduceStatus" label="5">减免状态</el-checkbox>
        <el-checkbox v-model="exportCollectConf.collectInfo" label="5">催收小结</el-checkbox>
        <el-checkbox v-model="exportCollectConf.overDays" label="5">逾期天数</el-checkbox>
        <el-checkbox v-model="exportCollectConf.batchNo" label="5">批次号</el-checkbox>
        <el-checkbox v-model="exportCollectConf.caseDate" label="5">委案日期</el-checkbox>
        <el-checkbox v-model="exportCollectConf.expectTime" label="5">预计退案日期</el-checkbox>
        <el-checkbox v-model="exportCollectConf.newMoney" label="5">最新欠款</el-checkbox>
        <el-checkbox v-model="exportCollectConf.province" label="5">省份</el-checkbox>
        <el-checkbox v-model="exportCollectConf.city" label="5">城市</el-checkbox>
        <el-checkbox v-model="exportCollectConf.county" label="5">区县</el-checkbox>
        <el-checkbox v-model="exportCollectConf.currencyType" label="5">币种</el-checkbox>
        <el-checkbox v-model="exportCollectConf.applyOrderNo" label="5">申请单号</el-checkbox>
        <el-checkbox v-model="exportCollectConf.overdueMoney" label="5">逾期金额</el-checkbox>
        <el-checkbox v-model="exportCollectConf.remark" label="5">自定义信息</el-checkbox>
        <el-checkbox v-model="exportCollectConf.odv2" label="5">催收员</el-checkbox>
        <el-checkbox v-model="exportCollectConf.collectStatus2" label="5">催收状态</el-checkbox>
        <el-checkbox v-model="exportCollectConf.nextFollDate" label="5">下次跟进日期</el-checkbox>
        <el-checkbox v-model="exportCollectConf.minimumPayment" label="5">最低还款额</el-checkbox>
        <el-checkbox v-model="exportCollectConf.creditLine" label="5">信用额度</el-checkbox>
        <el-checkbox v-model="exportCollectConf.module" label="5">催收模板</el-checkbox>
        <el-checkbox v-model="exportCollectConf.collectTime" label="5">催收时间</el-checkbox>
      </el-row>
      <span slot="footer" class="footer">
        <el-button @click="showExportCollectConfVisible = false">取 消</el-button>
        <el-button type="primary" @click="exportCollect">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script >
  import {mapGetters} from "vuex";
  import {
    getCaseDetail,
    selectById,
    onClickAddWarning,
    addWarning,
    lastCase,
    nextCase,
    getSameBatchCollect,
    getAddressDetail,
    getLetterList,
    delDataCollect,
    getArchiveDetail,
    getCollectDetail,
    getCollectDetail2,
    PhonetypeList,
    getCommentDetail,
    getInterestDetail,
    updateCase,
    getSynergyDetail,
    deleteReduceFile,
    listReduceFile,
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
    pageDataLog,
    delOplog,
    updateDataLog,
    delDataLog,
    sameCaseList,
    dataCollectionSave,
    addLetter,
    getReduceApplyList,
    pageDataFile,
    getSynergyTypeList,
    getSynergyContextList,
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
    saveCollectInfo,
    getCPList,
    getRepayList,
    getRepayRemark,
    sendTel,
    sendTelBatch,
    areaStepList,
    getRepayType,
    saveBank,
    selectByModule
  } from "@/common/js/api-detail";
  import {getEnum} from "@/common/js/api-sync";
  import {baseURL} from "@/common/js/request.js";
  import axios from 'axios'
  import {find} from '@/common/js/setting-tel-btn';
  const md5 = require('js-md5')
  const resetObj = {currentuser: false, seqNo: "", name: "", city: {name: ""}, province: {name: ""}, county: {name: ""}}
  export default {
    name: "caseDetail",
    // props:{
    //   id:{
    //     type: Number,
    //     default: -1
    //   }
    // },
    computed: {
      ...mapGetters(["userInfo"]),
      collectTitle(){
        let title = ""
        if(this.dataCollectEditType === "add"){
          title = "添加催记"
        }else if(this.dataCollectEditType === "edit"){
          title = "编辑催记"
        }
        return title
      },
      titleMsg(){
        const title=`同批次共债案件 共${this.sameBatchCaseSum}件（包含本案件），
                委案金额：${this.moneyTotal}，
                CP：${this.cpstr}，
                已还款：${this.enRepayAmtstr}
                （未退案：${this.noReturnCaseTotal}件，
                委案金额：${this.moneyTotal2}，
                CP：${this.cpstr2}，
                已还款：${this.enRepayAmtstr2}）`
        return title
      },
      buttonAuth(){
        return this.$store.getters.userInfo.busiData
      }
    },
    data() {
      return {
        id: null,
        seq:'',
        action: baseURL,
        historyType:"1",
        telhistory:[],
        showHistory:false,
        messageForm: {},
        reduceFileVisible:false,
        currentReduceId:null,
        reduceFileList:[],
        mycaseFlag:false,
        showCommentVisible:false,
        showWarningVisible:false,
        showCollectInfoVisible: false,
        dialogEditCaseVisible:false,
        adddialogVisible: false,
        addCommentVisible: false,
        commentAddContent: null,
        commentAddColor: "黑",
        dialogVisible: false,
        letterVisible: false,
        letterVisible2: true,
        dialogSyergyAplVisible: false,
        dialogSyergyResultVisible: false,
        formInline: {},
        legalForm: {},
        synergyTypeList: [],
        synergyContextList: [],
        PhonetypeList: [],
        syncMemorizeList: [],
        memorizeList: [], //催記
        memorizeList2:[],
        commentList: [], //评语
        addrList: [], //地址
        progressList: [{name: "判决", id: 1}, {name: "收案", id: 2}],
        PersonDataList: [],
        legalStatusMsgList: [
          {name: "已审核", id: 1},
          {name: "审核中", id: 2},
          {name: "未申请", id: 0}
        ],
        caseStatusList: [
          {name: "未退案", id: 0},
          {name: "正常", id: 1},
          {name: "暂停", id: 2},
          {name: "关档", id: 3},
          {name: "退档", id: 4},
          {name: "全部", id: 5}
        ],
        letterList: [], //信函记录
        dataList: [], //案人信息
        rateUpdateList: [], //利息
        syncList: [], //协催
        dependCase: [], //同批次公债案件
        activeNames: ["3", "4", "5"],
        otherActiveName: "1",
        showNext:false,
        mineCase:false,
        deptCase:false,
        caseDetail: resetObj,
        ligigationVisible: false,
        memorizeType: 1,
        statusList: [
          {name: "有效", id: 1},
          {name: "无效", id: 2},
          {name: "未知", id: 3}
        ],
        phoneSelectList: [],
        batchForm: {sType: 0, mobile: '',seq:'',},
        tpfsList: [],
        csmbList: [],
        csjgList: [],
        csztList: [],
        jmztList: [],
        batchAddTelVisible: false,
        batchAddTelContent: null,
        dialogAddrVisible: false,
        addressInfo: {},
        addressList:[],
        areaList:[],
        accountAgeList:[],
        clientList:[],
        cityList:[],
        countyList:[],
        caseInfo:{},
        rules: {
          seqNo: [
            { required: true, message: '请输入个案序列号', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          client: [
            { required: true, message: '请选择委托方', trigger: 'blur' }
          ],
          identNo: [
            { required: true, message: '请选择证件号码', trigger: 'blur' }
          ],
          cardNo: [
            { required: true, message: '请选择卡号', trigger: 'blur' }
          ],
          caseDate: [
            { required: true, message: '请选择委案日期', trigger: 'blur' }
          ],
          money: [
            { required: true, message: '请选择委案金额', trigger: 'blur' }
          ],
        },
        synergyInfo: {},
        addrSelectList: [],
        logType: "",
        logList: [],
        caseSameList: [],
        dialogLetterVisible: false,
        letterInfo: {},
        syncType: 1,
        reduceApplyList: [],
        uploadVisible: false,
        uploadFileList: [],
        header: {Authorization: localStorage.token},
        legalList: [],
        currentRow: {},
        archiveInfo: {},
        dialogArchiveVisible: false,
        dataCollectInfo: {},
        dialogDataCollectVisible: false,
        fileNames: {file: "", caseId: "", id: ""},
        cpList: [],
        cpInfo: {},
        dialogCpVisible: false,
        repayTypeList: [],
        repayRemarkList: [],
        ptpList: [],
        $routeKey: '',
        caseType: null,
        telhistoryLoading: false,
        dataCollectEditType: null,
        res1:true,
        res2:true,
        sameBatchCaseSum:'',
        moneyTotal:0,
        cpstr:0,
        enRepayAmtstr:0,
        noReturnCaseTotal:0,
        moneyTotal2:0,
        cpstr2:0,
        enRepayAmtstr2:0,
        listLoad:false,
        fullscreenLoading:false,
        showExportCollectConfVisible:false,
        exportCollectConf:{},
        forbiddenWords:[
          "起诉",
          "qs",
          "起酥",
          "q苏",
          "启s",
          "上苏",
          "立案",
          "la",
          "李安",
          "开庭",
          "开t",
          "kt",
          "开会",
          "凯田",
          "开林",
          "開t",
          "凯停",
          "开慧",
          "判决",
          "pj",
          "盼绝",
          "盼觉书",
          "潘觉书",
          "法院",
          "fy",
          "f源",
          "发源",
          "撤诉",
          "cs",
          "撤案",
          "撤",
          "ca",
          "测a",
          "答辩状",
          "搭边",
          "dbz",
          "搭边壮",
          "函件",
          "hj",
          "诉讼",
          "ss",
          "ssaj",
          "书宋",
          "宿松",
          "速s",
          "酥松",
          "苏s",
          "素宋",
          "传票",
          "cp",
          "船票",
          "票",
          "赖",
          "la",
          "油",
          "傻",
          "沙比",
          "煞笔",
          "比比",
          "领取",
          "领取判决书",
          "判决书",
          "领p",
          "pjs",
          "坐牢",
          "联系方式",
          "手机号",
          "原告方",
          "原告",
          "原",
          "元高方",
          "被告",
          "北高",
          "怼",
          "法庭",
          "ft",
          "司法",
          "sf",
          "sfcx",
          "暂缓",
          "律师",
          "绿诗",
          "应诉",
          "ys",
          "因素准备",
          "记录",
          "记",
          "移交",
          "传唤",
          "报案",
          "投诉",
          "t素",
          "头数",
          "报警",
          "bj",
          "举报",
          "拿j",
          "发j",
          "一申",
          "一身",
          "2沈",
          "二审",
          "2身",
          "二s",
          "二婶形式",
          "结果书",
          "涉嫌诈",
          "一批",
          "告法",
          "经真",
          "形式书",
          "删除",
          "196",
          "5年",
          "2万左右fj",
          "微信",
          "排期",
          "缺席",
          "刑拘",
          "中级立",
          "民转刑",
          "全年走民",
          "民事",
          "现在走行",
          "包庇",
          "短信",
          "追究形是",
          "罚",
          "追究书",
          "偷安自收",
          "涉嫌",
          "出庭",
          "ct",
          "限高",
          "刑事",
          "型事",
          "上诉",
          "冻",
          "强制",
          "胖觉书",
          "聚义",
          "拘役",
          "速前",
          "逃避",
          "确认名单",
          "庭前",
          "司法程序",
          "宝安",
          "强制",
          "追究",
          "刑事",
          "强执",
          "涉嫌合伙诈骗",
          "zp",
          "辩护",
          "嫌疑",
          "执行",
          "一匹",
          "候s",
          "累",
          "翻倍",
          "集体",
          "来汉",
          "印s",
          "总部",
          "拒执",
          "xs",
          "责任书",
          "冻结",
          "拍卖",
          "制裁",
          "走法",
          "应s",
          "居留",
          "抓",
          "恶意",
          "听前准备",
          "实心名单",
          "北京去电",
          "fj",
          "罚金",
          "稽查",
          "恶意",
          "特么",
          "我去",
          "催记",
          "不撤是退赃不退罪",
          "笔录",
          "拒执z",
          "保全",
          "告知196要1年6个月",
          "合同203",
          "法律条文",
          "取保候审",
          "上门",
          "公诉",
          "船换",
          "定",
          "形式责任追究书",
          "排气候审",
          "供认不讳",
          "楷婷"
        ]
      };
    },

    methods: {
      showCity(){
        areaStepList(this.caseInfo.provinceName).then((response) => {
          this.cityList = response
        })
      },
      showcounty(){
        areaStepList(this.caseInfo.cityName).then((response) => {
          this.countyList = response
        })
      },
      sendTelBatch(){
        this._sendTelBatch(9)
      },
      sendTelBatch2(){
        this._sendTelBatch(7)
      },
      _sendTelBatch(phoneNoPrefix){
        if (this.phoneSelectList ==null || this.phoneSelectList.length==0){
          this.$message({
            type: "info",
            message: "请先选择号码"
          });
          return;
        }
        if (this.phoneSelectList.length>10){
          this.$message({
            type: "info",
            message: "拨打的号码数量不能超过10个"
          });
          return;
        }
        let telStatus = false
        for (var i=0;i<this.phoneSelectList.length;i++){
          if (this.phoneSelectList[i]!=null &&this.phoneSelectList[i].telStatusMsg=="停止跟进"){
            this.$message({
              type: "info",
              message: "有电话处于停止跟进状态，禁止拨打"
            });
            telStatus = true;
            break;
          }
        }
        if (telStatus){
          return;
        }

        const callCenter = this.caseDetail.callCenter
        if(!callCenter){
          this.$message({
            type: "error",
            message: "请先在坐席设置中配置呼叫中心"
          })
          return
        }

        const customer = callCenter.customer
        const psw = callCenter.psw
        // 呼出的分机号(坐席号)
        const agent = this.caseDetail.officePhone==null?"":this.caseDetail.officePhone;
        // 被叫号码
        const callees = this.phoneSelectList.map(item => `${phoneNoPrefix}${item.tel}`)
        const url = `http://${callCenter.address}/openapi/V2.0.x/CallMultiNumbers`
        const time = new Date().getTime()
        const seq = this.caseDetail.id
        this.batchForm.seq = time
        const auth = `${customer}@${time}@${seq}@${psw}`
        const digest = md5(auth)
        const data = {
          authentication : {
            customer,
            timestamp: time,
            agent:agent,
            seq:seq,
            digest
          },
          param: {
            debug: "true",
            lang: "zh_CN"
          },
          request : {
            seq,
            userData:time,
            agent,
            callees
          }
        }
        sendTelBatch(data,callCenter.address).then(data => {
          this.$message({
            type: "success",
            message: "拨号成功"
          })
        })
      },
      sendTel(){
        this._sendTel(9)
      },
      sendTel2(){
        this._sendTel(7)
      },
      _sendTel(phoneNoPrefix){
        const callCenter = this.caseDetail.callCenter
        if(!callCenter){
          this.$message({
            type: "error",
            message: "请先在坐席设置中配置呼叫中心"
          })
          return
        }
        const customer = callCenter.customer
        const psw = callCenter.psw
        // 呼出的分机号(坐席号)
        const agent = this.caseDetail.officePhone==null?"":this.caseDetail.officePhone;
        // 被叫号码
        const callee = `${phoneNoPrefix}${this.batchForm.mobile}`
        const url = `http://${callCenter.address}/openapi/V2.0.6/CallNumber`
        const time = new Date().getTime()
        const seq = this.caseDetail.id
        this.batchForm.seq = time
        const auth = `${customer}@${time}@${seq}@${psw}`
        const digest = md5(auth)
        const data = {
          authentication : {
            customer,
            timestamp: time,
            seq:seq,
            digest
          },
          param: {
            debug: "true",
            lang: "zh_CN"
          },
          request : {
            seq,
            userData:time,
            agent,
            callee
          }
        }
        sendTel(data,callCenter.address).then(data => {
          this.$message({
            type: "success",
            message: "拨号成功"
          })
        })
      },
      lastCase(){
        this.getCase(-1)
      },
      nextCase(){
        this.getCase(1)
      },
      getCase(val){
        let cases=[]
        let data = null

        //我的案件
        if (this.caseType == 1){
          data = localStorage.getItem("mine")
        }
        //部门案件
        else if (this.caseType == 2){
          data = localStorage.getItem("dept")
        }

        if (data==null || data==""){
          this.$message({
            type: "info",
            message: "当前查询结果无数据！"
          })
          return
        }
        cases = JSON.parse(data)
        if (cases==null || cases.length==0){
          this.$message({
            type: "info",
            message: "当前查询结果无数据！"
          })
          return
        }
        cases.map((c,index) => c.index = index)
        const currentCase = cases.filter(c => c.id == this.id)
        if(currentCase.length > 0){
          const currentCaseIndex = currentCase[0].index
          if(currentCaseIndex == 0 && val == -1){
            this.$message({
              type: "info",
              message: "当前已经是第一条数据！"
            })
          }else if(currentCaseIndex == cases.length-1 && val == 1){
            this.$message({
              type: "info",
              message: "当前已经是最后一条数据！"
            })
          }else{
            this.batchForm = {sType: 0}
            this.queryDetail(cases[currentCaseIndex+val].id)
          }
        }else{
          this.$message({
            type: "info",
            message: "案件不在当前查询结果中！"
          })
        }
      },
      saveCollectInfo() {
        saveCollectInfo(this.id, this.caseDetail.collectInfo).then(data => {
          this.$message({
            type: "success",
            message: "保存成功"
          });
          this.showCollectInfoVisible = false;
        });
      },
      saveCase(){
        this.$refs.ruleForm.validate((valid)=>{
            if(valid){
              this.caseInfo.id = this.$route.query.id;
              updateCase(this.caseInfo).then(data => {
                this.$message({
                  type: "success",
                  message: "保存成功"
                });
                this.queryDetail();
                this.dialogEditCaseVisible = false;
              });
            }else{
              this.$message('校验失败，请根据提示修改后提交')
              return
            }
        })

      },
      showEdit(){
        this.$nextTick(()=>{
          if(this.$refs['ruleForm']){
            this.$refs['ruleForm'].resetFields()
          }
        });
        selectById({"id":this.$route.query.id}).then(data => {
          this.caseInfo = data
          if (data.client){
            this.caseInfo.client = parseInt(data.client);
          }
          if (data.collectArea) {
            this.caseInfo.collectArea = parseInt(data.collectArea);
          }
          if (data.accountAge) {
            this.caseInfo.accountAge = parseInt(data.accountAge);
          }
          this.dialogEditCaseVisible = true;
        });

      },
      showCollectInfo() {
        this.showCollectInfoVisible = true;
      },
      copyToCollect(tel, name, relation,telStatusMsg) {
        if (telStatusMsg=="停止跟进"){

        }else{
          this.$set(this.batchForm, 'mobile', tel);
          this.$set(this.batchForm, 'targetName', name);
          this.$set(this.batchForm, 'relation', relation);
        }
      },
      handleChange(file) {
        this.fileNames.file = file.name;
        this.fileNames.caseId = this.id;
      },
      moreId(row) {
        this.reduceFileVisible = true;
        this.currentReduceId=row.id
        this.fileNames.id = row.id;
        listReduceFile({"reduceId":this.currentReduceId}).then(data => {
          this.reduceFileList = data
        });
      },
      showSynergyApply() {
        /* getSynergyTypeList().then(data => {
           this.synergyTypeList = data;
         });
         getSynergyContextList().then(data => {
           this.synergyContextList = data;
         });*/
        this.synergyTypeList = this.$store.getters.caseType.协催类型;
        this.synergyContextList = this.$store.getters.caseType.申请协催内容;
        this.dialogSyergyAplVisible = true;
      },
      showSynergyResult() {
        getSynergyTypeList().then(data => {
          this.synergyTypeList = data;
        });
        this.dialogSyergyResultVisible = true;
      },
      saveSynergyApply() {
        this.synergyInfo.caseId = this.id;
        saveApply(this.synergyInfo).then(data => {
          this.dialogSyergyAplVisible = false;
          getSynergyDetail(this.id).then(data => {
            this.syncList = data.list;
          });
        });
      },
      saveSynergyResult(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.synergyInfo.caseId = this.id;
            saveResult(this.synergyInfo).then(data => {
              this.dialogSyergyResultVisible = false;
              getSynergyDetail(this.id).then(data => {
                this.syncList = data.list;
              });
            });
          } else {
            console.log("error submit!!");
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

      // 全选
      selectAllCollectExport(){
        this._selectAllInit('exportCollectConf');
        for(var p in this.exportCollectConf){//遍历json对象的每个key/value对,p为key
          this.exportCollectConf[p] = true;
        }
      },
      // 反选
      selectUnAllCollectExport(){
        this._selectAllInit('exportCollectConf');
        for(var p in this.exportCollectConf){//遍历json对象的每个key/value对,p为key
          this.exportCollectConf[p] = false;
        }
      },
      queryExportCollectConfList() {
        let queryObj = {module: "detail-exportCollect", menu: this.exportCollectConf}
        selectByModule(queryObj).then(data => {
          if (data) {
            this.exportCollectConf = JSON.parse(data.menu);
          }
        });
      },
      _expDataCollect() {
        this.queryExportCollectConfList();
        this.showExportCollectConfVisible=true
        // expDataCollect(this.id).then(() => {
        //   this.$message({
        //     type: "success",
        //     message: "导出成功"
        //   });
        // });
      },

      exportCollect() {
        let successNum = 0;
        for (var p in this.exportCollectConf) {//遍历json对象的每个key/value对,p为key
          if (this.exportCollectConf[p]) {
            successNum = successNum + 1;
          }
        }
        if (successNum == 0) {
          this.$message({
            type: 'error',
            message: '请先选择导出项!'
          });
          this.fullscreenLoading = false
          this.loading2 = false
          return;
        }
          let _self = this;
          this.loading2 = true
          this.fullscreenLoading = true
          expDataCollect(this.id,this.exportCollectConf).then((response) => {
            this.loading2 = false
            this.fullscreenLoading = false
            this.$message.success("导出成功")
          })
        this.showExportCollectConfVisible = false
      },
      selectCollectModule() {
        let dicId = this.batchForm.module;
        for (var i = 0; i < this.csmbList.length; i++) {
          if (this.csmbList[i].id == dicId) {
            this.batchForm.collectInfo = this.csmbList[i].description;
            break;
          }
        }
      },
      showadddialogVisible() {
        this.adddialogVisible = true;
        this.messageForm = {};
      },
      editData(row) {
        this.adddialogVisible = true;
        this.messageForm = row;
        getReduceApplyList(this.id).then(data => {
          this.reduceApplyList = data.list;
        });
      },
      saveLegal() {
        this.legalForm.caseId = this.id;
        saveLegal(this.legalForm).then(data => {
          this.$message({
            type: "success",
            message: "申请成功"
          });
          this.ligigationVisible = false;
          getLegalList(this.id).then(data => {
            this.legalList = data;
          });
        });
      },
      deteleData(id) {
        DeteleData(id).then(response => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          getReduceApplyList(this.id).then(data => {
            this.reduceApplyList = data.list;
          });
        });
      },
      saveData() {
        AddtableList(this.id, this.messageForm).then(response => {
          this.$message({
            type: "success",
            message: "操作成功"
          });
          this.adddialogVisible = false;
          this.messageForm = {};
          getReduceApplyList(this.id).then(data => {
            this.reduceApplyList = data.list;
          });
        });
      },
      showHistoryAddr(row) {
        this.$set(row, "showHistory", true);
        getHistoryAddrList(row.id).then(data => {
          this.$set(row, "history", data);
        });
      },
      showHistoryTel(row) {
        this.$set(this, "historyType", 1);
        this.$set(this, "showHistory", true);
        this.currentRow = row;
        this.getHistoryTel(1);
      },

      getHistoryTel(val) {
        this.telhistoryLoading = true
        this.telhistory = []
        detailTelCurrentCollect({
          caseId: this.id,
          detailType: val,
          mobile: this.currentRow.tel
        }).then(data => {
          this.telhistory = data
        }).catch(() => {}).finally(() => {
          this.telhistoryLoading = false
        })
      },
      uploadSuccess(res, file, fileList) {
        if (res.code == 100) {
          this.$message({
            type: "success",
            message: res.msg
          });
          pageDataFile(this.id).then(response => {
            this.uploadFileList = response;
          });
        } else {
          this.$message({
            type: "error",
            message: res.msg
          });
        }
      },
      deleteReduceFile(id){
        this.$confirm("此操作将删除该操作记录且无法恢复,是否继续？", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            deleteReduceFile({"id":id}).then(data => {
              listReduceFile({"reduceId":this.currentReduceId}).then(data => {
                this.reduceFileList = data
              });
              this.$message({
                type: "success",
                message: "删除成功"
              });
            });

          })
          .catch(() => {
          });

      },
      uploadSuccess2(res, file, fileList) {
        if (res.code == 100) {
          this.$message({
            type: "success",
            message: res.msg
          });
          listReduceFile({"reduceId":this.currentReduceId}).then(data => {
            this.reduceFileList = data
          });
        } else {
          this.$message({
            type: "error",
            message: res.msg
          });
        }
      },
      logTypeChange(val) {
        pageDataLog({
          caseId: this.id,
          type: val
        }).then(data => {
          this.logList = data;
        });
      },
      syncTypeChange(val) {
        let applyStatus;
        let finishStatus;
        if (val == 1) {
        } else if (val == 2) {
          applyStatus = 0;
          finishStatus = 0;
        } else if (val == 3) {
          applyStatus = 1;
          finishStatus = 0;
        } else if (val == 4) {
          applyStatus = 1;
          finishStatus = 1;
        } else if (val == 5) {
          applyStatus = -1;
        }
        getSynergyDetail(this.id, applyStatus, finishStatus).then(data => {
          this.syncList = data.list;
        });
      },
      memorizeTypeChange(val) {
        let batchNo = this.caseDetail.batchNo;
        let identNo = this.caseDetail.identNo;
        let cardNo = this.caseDetail.cardNo;
        getCollectDetail(this.id, batchNo, identNo, cardNo, val).then(data => {
          this.memorizeList = data;
        });
      },

      onClickSaveCollection(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.batchForm.caseId = this.id;
            /*if ((this.batchForm.collectStatus==28 || this.batchForm.collectStatus) && (this.batchForm.repayAmt==null || this.batchForm.repayAmt=="")){
              this.$message({
                type: "info",
                message: "承诺还款金额不能为空"
              });
              return;
            }*/
            this.listLoad = true
            this.fullscreenLoading=true
            dataCollectionSave(this.batchForm).then(data => {
              this.$message({
                type: "success",
                message: "新增催收记录成功"
              });

              this.batchForm = {sType: 0,seq:null,targetName:'',mobile:'',relation:'',collectInfo:''}
              let batchNo = this.caseDetail.batchNo;
              let identNo = this.caseDetail.identNo;
              let cardNo = this.caseDetail.cardNo;
              getCollectDetail(this.id, batchNo, identNo, cardNo, 1).then(data => {
                this.memorizeList = data;
              });
              getSameBatchCollect(this.id).then(data => {
                this.syncMemorizeList = data;
              });
              /*this.$nextTick(()=>{
                if(this.$refs['batchForm']) {
                  this.$refs['batchForm'].resetFields()
                }
              });*/
            }).catch(() => {}).finally(() => {
              this.listLoad=false
              this.fullscreenLoading=false
            })
          } else {
            return false;
          }
        });

      },
      _deleteLog(id) {
        this.$confirm("此操作将删除该操作记录且无法恢复,是否继续？", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            delDataLog(id).then(res => {
              pageDataLog({caseId: this.id, type: this.logType}).then(data => {
                this.logList = data;
              });
              this.$message({
                type: "success",
                message: "操作记录删除成功"
              });
            });
          })
          .catch(() => {
          });
      },
      _deleteComment(id) {
        this.$confirm("此操作将删除该评语且无法恢复,是否继续？", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            delDataComment(id).then(res => {
              getCommentDetail(this.id).then(data => {
                this.commentList = data;
              });
              this.$message({
                type: "success",
                message: "评语删除成功"
              });
            });
          })
          .catch(() => {
          });
      },
      editLog(row) {
        this.editLogRow = row;
        this.$set(row, "editContext", row.context);
        this.$set(row, "editLogVisible", true);
      },
      editComment(row) {
        this.editCommentRow = row;
        this.$set(row, "editContext", row.comment);
        this.$set(row, "editCommentVisible", true);
      },
      onClickSaveLog() {
        updateDataLog({
          id: this.editLogRow.id,
          context: this.editLogRow.editContext
        }).then(res => {
          pageDataLog({caseId: this.id, type: this.logType}).then(data => {
            this.logList = data;
          });
          this.$message({
            type: "success",
            message: "操作记录修改成功"
          });
        });
      },
      onClickSaveComment() {
        updateDataComment({
          id: this.editCommentRow.id,
          comment: this.editCommentRow.editContext
        }).then(res => {
          getCommentDetail(this.id).then(data => {
            this.$message({
              type: "success",
              message: "评语修改成功"
            });
            this.commentList = data;
            // this.$set(this.editCommentRow,'editCommentVisible',false)
          });
        });
      },
      saveSelfInfo() {
        // 屏蔽敏感字
        const remark = this.caseDetail.selfInfo

        let err = null
        for (const i in this.forbiddenWords) {
          if(remark.includes(this.forbiddenWords[i])){
            err = this.forbiddenWords[i]
            break
          }
        }
        if(err){
          this.$message({
            type: "error",
            message: `自定义信息无法记录[${err}]内容，保存失败，请修改`
          })
        }else{
          this.fullscreenLoading = true
          updateRemark({
            id: this.id,
            remark
          }).then(res => {
            this.$message({
              type: "success",
              message: "修改自定义信息成功"
            })
          }).catch(() => {}).finally(() => {
            this.fullscreenLoading = false
          })
        }
      },
      applyLetter(row) {
        // letterCount
        this.letterInfo = {
          caseId: this.id,
          addressId: row.id,
          periods: row.letterCount + 1,
          address: row.address
        };
        this.dialogLetterVisible = true;
      },
      saveApplyLetter() {
        addLetter(this.letterInfo).then(data => {
          getAddressDetail(this.id).then(data => {
            this.addrList = data;
          });
          this.$message({
            type: "success",
            message: "信函申请提交成功"
          });
          this.dialogLetterVisible = false;
        });
      },

      showLetterList() {
        getLetterList(this.id).then(data => {
          this.letterList = data;
          this.letterVisible2 = false;
          this.letterVisible = true;
        });
      },
      saveDataCollect() {
        let result = this.dataCollectInfo;
        result.caseId = this.id;
        if (this.dataCollectEditType === "add") {
          result.id = 0;
        }
        saveDataCollectDetail(result).then(res => {
          if (this.dataCollectEditType === "add") {
            getCollectDetail(this.id, this.memorizeType).then(data => {
              this.memorizeList = data;
            });
            this.$message({
              type: "success",
              message: "催记保存成功"
            });
          } else {
            getCollectDetail(this.id, this.memorizeType).then(data => {
              this.memorizeList = data;
            });
            this.$message({
              type: "success",
              message: "催记保存成功"
            });
          }
          this.dialogDataCollectVisible = false;
        }).catch(() => {
          this.$message({
            type: "error",
            message: "催记保存失败"
          });
        });
      },
      editDataCollect(row, index) {
        this.dataCollectInfo = {...row};
        this.dataCollectEditType = "edit";
        this.dialogDataCollectVisible = true;
      },
      delOpLog(row){
        this.$confirm("此操作将删除该信息且无法恢复,是否继续？", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
              delOplog(row.id).then(data => {
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
                pageDataLog({caseId: this.id, type: this.logType}).then(data => {
                  this.logList = data;
                });

              });
          });
      },
      delDataCollect(row){
        this.$confirm("此操作将删除该信息且无法恢复,是否继续？", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            delDataCollect(row.id).then(data => {
              getCollectDetail(this.id, 1).then(data => {
                this.memorizeList = data;
              });
              this.$message({
                type: "success",
                message: "删除成功"
              });
            });

          });
      },
      addDataCollect() {
        this.dataCollectInfo = {};
        this.dataCollectEditType = "add";
        this.dialogDataCollectVisible = true;
      },
      addCpInfo() {
        this.cpInfo = {};
        this.dialogCpVisible = true;
      },
      changeWay(){
        this.$set(this.messageForm, 'contactWay', this.messageForm.contactWay2);
      },
      saveCpInfo() {
        this.cpInfo.dataCase = {id: this.id};
        saveBank(this.cpInfo).then(data => {
          getCPList(this.id).then(cpList => {
            this.cpList = cpList;
          });
          this.$message({
            type: "success",
            message: "新建CP记录成功"
          });
          this.dialogCpVisible = false;
        });
      },
      saveAddr() {
        let result = this.addressInfo;
        result.caseId = this.id;
        if (this.addrEditType === "add") {
          result.id = 0;
        }
        saveCaseAddress(result).then(res => {
          if (this.addrEditType === "add") {
            // this.caseDetail.dataCaseTelEntityList.push(res)
            getAddressDetail(this.id).then(data => {
              this.addrList = data;
            });
            this.$message({
              type: "success",
              message: "新增地址成功"
            });
          } else {
            getAddressDetail(this.id).then(data => {
              this.addrList = data;
            });
            this.$message({
              type: "success",
              message: "修改地址成功"
            });
          }
          this.dialogAddrVisible = false;
        });
      },
      addAddr() {
        this.addressInfo = {};
        this.addrEditType = "add";
        this.dialogAddrVisible = true;
      },
      editAddr(addr, index) {
        this.addressInfo = {...addr};
        this.addrEditType = "edit";
        this.dialogAddrVisible = true;
      },
      showAllAddr() {
        getAddressDetail(this.id).then(data => {
          this.addrList = data;
        });
      },
      saveAddr() {
        let result = this.addressInfo;
        result.caseId = this.id;
        if (this.addrEditType === "add") {
          result.id = 0;
        }
        saveCaseAddress(result).then(res => {
          if (this.addrEditType === "add") {
            // this.caseDetail.dataCaseTelEntityList.push(res)
            getAddressDetail(this.id).then(data => {
              this.addrList = data;
            });
            this.$message({
              type: "success",
              message: "新增地址成功"
            });
          } else {
            getAddressDetail(this.id).then(data => {
              this.addrList = data;
            });
            this.$message({
              type: "success",
              message: "修改地址成功"
            });
          }
          this.dialogAddrVisible = false;
        });
      },
      deleteAddr(id) {
        this.$confirm("此操作将删除该地址且无法恢复,是否继续？", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            delAddr(id).then(res => {
              getAddressDetail(this.id).then(data => {
                this.addrList = data;
              });
              this.$message({
                type: "success",
                message: "删除地址成功"
              });
            });
          })
          .catch(() => {
          });
      },
      changeAddrStatus(status) {
        if (!this.addrSelectList.length) {
          this.$message("请勾选需要修改的地址");
          return;
        }

        this.$confirm("确认修改地址状态？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            const data = this.addrSelectList.map(item => {
              return {
                id: item.id,
                status: status
              };
            });
            updateAddrStatus(data).then(() => {
              getAddressDetail(this.id).then(data => {
                this.addrList = data;
              });
              this.$message({
                type: "success",
                message: "地址状态修改成功"
              });
            });
          })
          .catch(() => {
          });
      },
      onClickAddArchive() {
        this.archiveInfo = {};
        this.dialogArchiveVisible = true;
      },
      _saveArchive() {
        let result = this.archiveInfo;
        result.caseId = this.id;
        saveArchive(result).then(res => {
          this.$message({
            type: "success",
            message: "新增案人数据成功"
          });
          getArchiveDetail(this.id).then(data => {
            this.dataList = data;
          });
          this.dialogArchiveVisible = false;
        });
      },
      showAllTel() {
        getTelList(this.id).then(data => {
          this.$set(this.caseDetail, "dataCaseTelEntityList", data);
        });
      },
      saveTel() {
        let result = this.formInline;
        result.caseId = this.id;
        if (this.phoneEditType === "add") {
          result.id = 0;
        }
        saveCaseTel(result).then(res => {
          if (this.phoneEditType === "add") {
            // this.caseDetail.dataCaseTelEntityList.push(res)
            getTelList(this.id).then(data => {
              this.$set(this.caseDetail, "dataCaseTelEntityList", data);
            });
            this.$message({
              type: "success",
              message: "新增电话成功"
            });
          } else {
            getTelList(this.id).then(data => {
              this.$set(this.caseDetail, "dataCaseTelEntityList", data);
            });
            this.$message({
              type: "success",
              message: "修改电话成功"
            });
          }
          this.dialogVisible = false;
        });
      },
      addPhone() {
        this.formInline = {};
        this.phoneEditType = "add";
        this.dialogVisible = true;
      },
      editPhone(phone, index) {
        this.formInline = {...phone};
        this.phoneEditType = "edit";
        this.dialogVisible = true;
      },
      deleteTel(id) {
        this.$confirm("此操作将删除该电话且无法恢复,是否继续？", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            delTel(id).then(res => {
              getTelList(this.id).then(data => {
                this.$set(this.caseDetail, "dataCaseTelEntityList", data);
              });
              this.$message({
                type: "success",
                message: "删除电话成功"
              });
            });
          })
          .catch(() => {
          });
      },
      _synchroSameTel() {
        this.$confirm("确认同步共债？", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            synchroSameTel(this.id).then(res => {
              this.$message({
                type: "success",
                message: "同步共债成功"
              });
            });
          })
          .catch(() => {
          });
      },
      changePhoneStatus(status) {
        if (!this.phoneSelectList.length) {
          this.$message("请勾选需要修改的电话号码");
          return;
        }

        this.$confirm("确认修改电话状态？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            const data = this.phoneSelectList.map(item => {
              return {
                id: item.id,
                telStatusMsg: status
              };
            });
            updateTelStatus(data).then(() => {
              getTelList(this.id).then(data => {
                this.$set(this.caseDetail, "dataCaseTelEntityList", data);
              });
              this.$message({
                type: "success",
                message: "电话状态修改成功"
              });
            });
          })
          .catch(() => {
          });
      },
      stopTel(id) {
        this.$confirm("确认停止跟进该电话？", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            updateTelStatus([
              {
                id,
                telStatusMsg: "停止跟进"
              }
            ]).then(res => {
              getTelList(this.id).then(data => {
                this.$set(this.caseDetail, "dataCaseTelEntityList", data);
              });
              this.$message("该电话已停止跟进");
            });
          })
          .catch(() => {
          });
      },
      onClickAddWarning(){
        if (!this.caseDetail.warning) {
          this.$message("请输入警告内容");
          return;
        }
        addWarning(
          {
            id: this.id,
            warning: this.caseDetail.warning
          }
        ).then(res => {
          this.$message({
            type: "success",
            message: "警告添加成功"
          });
          this.showWarningVisible=false;
        });
      },
      onClickAddComment() {
        if (!this.commentAddContent) {
          this.$message("请输入评语内容");
          return;
        }

        addComment([
          {
            id: this.id,
            comment: this.commentAddContent,
            color: this.commentAddColor
          }
        ]).then(res => {
          this.$message({
            type: "success",
            message: "评语添加成功"
          });
          if (this.commentAddColor =="红"){
            this.$set(this.caseDetail, 'color', 'RED')
          }else if (this.commentAddColor =="蓝"){
            this.$set(this.caseDetail, 'color', 'BLUE')
          }else{
            this.$set(this.caseDetail, 'color', 'BLACK')
          }
          getCommentDetail(this.id).then(data => {
            this.commentList = data;
            this.addCommentVisible = false;
            this.showCommentVisible = false;
            this.commentAddContent = "";
            this.commentAddColor = "黑";
          });
        });
      },
      litigationApply() {
        this.ligigationVisible = true;
        PersonList().then(response => {
          this.PersonDataList = response;
        });
      },
      onClickBatchAddTel() {
        if (!this.batchAddTelContent) {
          this.$message("请输入评语内容");
          return;
        }
        addBatchCaseTel({
          caseId: this.id,
          remark: this.batchAddTelContent
        }).then(res => {
          this.$message({
            type: "success",
            message: "电话添加成功"
          });
          getTelList(this.id).then(data => {
            this.$set(this.caseDetail, "dataCaseTelEntityList", data);
            this.batchAddTelContent = null;
            this.batchAddTelVisible = false;
          });
        });
      },
      queryDetail(id = this.$route.query.id) {
        this.otherActiveName = "1";

        this.id = id
        const caseType = this.$route.query.type
        this.caseType = caseType
        //我的案件/部门案件
        if(caseType == 1 || caseType == 2){
          this.showNext = true
          this.mycaseFlag = true
        }

        // if (this.$route.query.mycase){
        //   this.$set(this, 'mycaseFlag', true)
        // }else{
        //   this.$set(this, 'mycaseFlag', false)
        // }
        // if (this.$route.query.mineCase){
        //   this.$set(this, 'mineCase', true)
        // }else{
        //   this.$set(this, 'mineCase', false)
        // }
        // if (this.$route.query.deptCase){
        //   this.$set(this, 'deptCase', true)
        // }else{
        //   this.$set(this, 'deptCase', false)
        // }
        // if (this.$route.query.showNext){
        //   this.$set(this, 'showNext', true)
        // }else{
        //   this.$set(this, 'showNext', false)
        // }
        getCaseDetail(this.id).then(data => {
          this.caseDetail = data;
          document.title = `${data.name}-[${data.seqNo}]-案件详情`
        });
        getSameBatchCollect(this.id).then(data => {
          this.syncMemorizeList = data;
        });
        getSameBatchCase(this.id).then(data => {
          this.dependCase = data.list;
          // 案件数加上本案件
          this.sameBatchCaseSum=data.sameBatchCaseSum
          this.moneyTotal=data.moneyTotal
          this.cpstr=data.cp
          this.enRepayAmtstr=data.enRepayAmt
          this.noReturnCaseTotal=data.noReturnCaseTotal
          this.moneyTotal2=data.moneyTotal2
          this.cpstr2=data.cp2
          this.enRepayAmtstr2=data.enRepayAmt2
        });
        getCommentDetail(this.id).then(data => {
          this.commentList = data;
        });
        /*  getEnum("谈判方式").then(data => {
            this.tpfsList = data;
          });*/
        this.tpfsList = this.$store.getters.caseType.谈判方式;
        /*getEnum("催收模板").then(data => {
          this.csmbList = data;
        });*/
        this.csmbList = this.$store.getters.caseType.催收模板;
        /* getEnum("催收结果").then(data => {
           this.csjgList = data;
         });*/
        this.csjgList = this.$store.getters.caseType.催收结果;
        /*  getEnum("催收状态").then(data => {
            this.csztList = data;
          });*/
        this.csztList = this.$store.getters.caseType.催收状态;
        /* getEnum("减免状态").then(data => {
           this.jmztList = data;
         });*/
        this.jmztList = this.$store.getters.caseType.减免状态;
        /*  getEnum("电话类型").then(data => {
            this.PhonetypeList = data;
          });*/
        this.PhonetypeList = this.$store.getters.caseType.电话类型;
        pageDataFile(this.id).then(response => {
          this.uploadFileList = response;
        });
        /*  getRepayType().then(data => {
            this.repayTypeList = data;
          });*/
        this.repayTypeList = this.$store.getters.caseType.还款方式;
        /*getRepayRemark().then(data => {
          this.repayRemarkList = data;
        });*/
        this.repayRemarkList = this.$store.getters.caseType.还款备注;
      },
      showPanel(tab, e) {
        var ind = tab.label;
        if (ind == "地址") {
          getAddressDetail(this.id).then(data => {
            this.addrList = data;
            this.letterVisible = false;
            this.letterVisible2 = true;
          });
        } else if (ind == "案人数据") {
          getArchiveDetail(this.id).then(data => {
            this.dataList = data;
          });
        } else if (ind == "催记") {
          //催記
          this.memorizeType = 1;
          getCollectDetail(this.id, 1).then(data => {
            this.memorizeList = data;
          });
        } else if (ind == "评语") {
          //评语
          getCommentDetail(this.id).then(data => {
            this.commentList = data;
          });
        } else if (ind == "利息更新") {
          //利息
          getInterestDetail(this.id).then(data => {
            this.rateUpdateList = data;
          });
        } else if (ind == "案件登帐") {
          //案件登帐
          this.memorizeType = 1;
          getCollectDetail2(this.id, 1).then(data => {
            this.memorizeList2 = data;
          });
          getCPList(this.id).then(data => {
            this.cpList = data;
          });
        } else if (ind == "协催") {
          //协催
          this.syncType = 1;
          getSynergyDetail(this.id).then(data => {
            this.syncList = data.list;
          });
        } else if (ind == "共债案件") {
          //共债案件
          sameCaseList(this.id).then(data => {
            this.caseSameList = data;
          });
        } else if (ind == "操作记录") {
          //操作记录
          this.logType = "";
          pageDataLog({
            caseId: this.id,
            type: ""
          }).then(data => {
            this.logList = data;
          });
        } else if (ind == "诉讼案件") {
          //诉讼案件
          getLegalList(this.id).then(data => {
            this.legalList = data;
          });
        } else if (ind == "减免管理") {
          //减免管理
          getReduceApplyList(this.id).then(data => {
            this.reduceApplyList = data.list;
          });
        }
      },
      onSelectPhoneRow(val) {
        this.phoneSelectList = val;
      },
      onSelectAddrRow(val) {
        this.addrSelectList = val;
      },
      telTableRowClassName({row, rowIndex}) {
        if (row.telStatusMsg === "停止跟进") {
          return "stop-row";
        }
      },
      initPageData(ida) {
        let id = ida || this.$route.query.id || "";
        let data = localStorage.getItem(id) || "";
        if (data) {
          if (this.$route.query.mycase){
            this.$set(this, 'mycaseFlag', true)
          }
          if (this.$route.query.mineCase){
            this.$set(this, 'mineCase', true)
          }else{
            this.$set(this, 'mineCase', false)
          }
          if (this.$route.query.deptCase){
            this.$set(this, 'deptCase', true)
          }else{
            this.$set(this, 'deptCase', false)
          }
          if (this.$route.query.showNext){
            this.$set(this, 'showNext', true)
          }
          let obj = JSON.parse(data);
          for (let [k, v] of Object.entries(obj)) {
            this.$set(this, k, v);
          }
        } else {
          this.queryDetail();
          this.batchForm = {sType: 0};
          PersonList().then(response => {
            this.PersonDataList = response;
          });
        }
      },
      sameRouteChange() {
        localStorage.setItem(
          this.$route.query.id,
          JSON.stringify(this._data, function (key, value) {
            if (key == "$routeKey") {
              return void 0;
            }
            return value;
          })
        );
      },
      resetContent() {
        this.caseDetail = resetObj;
        this.mycaseFlag = false;
        this.showNext = false;
        this.mineCase = false;
        this.deptCase = false;
      },
      showMyCaseFlag(){
        if (this.$route.query.mycase){
          this.mycaseFlag = true;
        }
        if (this.$route.query.mineCase){
          this.$set(this, 'mineCase', true)
        }
        if (this.$route.query.deptCase){
          this.$set(this, 'deptCase', true)
        }
        if (this.$route.query.showNext){
          this.showNext = true;
        }
      },
      resetTel(id) {
            updateTelStatus([
              {
                id,
                telStatusMsg: "未知"
              }
            ]).then(res => {
              getTelList(this.id).then(data => {
                this.$set(this.caseDetail, "dataCaseTelEntityList", data);
              });
              this.$message("该电话已恢复跟进");
            }).catch(() => {
          });
      },
      showCase(row) {
        window.open(`#/zhx/case-detail?id=${row.id}`)
      },
    },
    // watch: {
    //   $route: {
    //     handler(n, o) {
    //       if (n.name == "case-detail") {
    //         // console.log('routeWatch',n.query.id)
    //         // this.sameRouteChange();
    //         // this.$routeKey = n.query.id;
    //         this.resetContent();
    //         this.initPageData();
    //       }
    //     },
    //     immediate: true
    //   }
    // },
    // beforeRouteUpdate(to, from, next) {
    //   // 导航离开该组件的对应路由时调用
    //   // 可以访问组件实例 `this`
    //   // console.log(this);
    //   // this.sameRouteChange();

    //   // console.log("routerLify",this.$route.query.id)
    //   this.sameRouteChange();
    //   next();
    //   this.resetContent();
    //   this.initPageData(this.$route.query.id);
    //   // console.log("routerLify1",this.$route.query.id)
    // },
    // beforeRouteLeave(to, from, next) {
    //   // 导航离开该组件的对应路由时调用
    //   // 可以访问组件实例 `this`
    //   this.sameRouteChange();
    //   next();
    // },
    created() {
      // window.addEventListener("beforeunload", () => {
      //   localStorage.clear();
      // });
        find().then((data)=>{
        if(data.status==2){
            this.res1=this.$store.getters.userInfo.loginName=='admin'
            this.res2=this.$store.getters.userInfo.loginName=='admin'
        }
      });
      this.queryDetail();
      this.batchForm = {sType: 0};
      areaStepList("地区").then((response) => {
        this.addressList = response
      })
      this.areaList = this.$store.getters.caseType.催收区域;
      this.clientList = this.$store.getters.caseType.委托方;
      this.accountAgeList = this.$store.getters.caseType.逾期账龄;
      /*PersonList().then(response => {
        this.PersonDataList = response;
      });*/
    }
  };
</script>

<style lang="scss">
  #case-detail {
    width: 100%;
    padding: 10px;
    overflow-x: hidden;
    background: #F0F2F5;


    .pad {
      .el-checkbox {
        width: 24%;
        margin-right: 0px;
      }
    }
    .calStyle{
      font-size: 12px;
      margin-left: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
      .titleStyle .el-collapse-item__header{
        background:linear-gradient(to right,#4F6CFA,#5AA6F9);
        margin-top:24px;
        border-radius: 3px;
        font-size: 16px;
        color: #fff;
        padding-left: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    // .el-table__body tr.current-row > td{
    //   border-top: 1px solid #0080ff  !important;
    //   border-bottom: 1px solid #0080ff  !important;
    // }
    .basic-info{
      .title-box{
        display: flex;
        .title1{
          width: 40%;
          padding-left: 24px;
          color: #fff;
          // margin:12px 0;
          margin-top: 24px;
          background:linear-gradient(to right,#4F6CFA,#5AA6F9);
          height: 48px;
          display: flex;
          align-items: center;
          border-radius: 3px;
          &:nth-child(1){
            margin-right: 24px;
          }
        }
        .title2{
          width: calc(100% - 40% - 24px);
          margin-top: 24px;
          padding-left: 24px;
          color: #fff;
          // margin:12px 0;
          border-radius: 3px;
          background:linear-gradient(to right,#4F6CFA,#5AA6F9);
          height: 48px;
          display: flex;
          align-items: center;
          &:nth-child(1){
            margin-right: 24px;
          }
        }
      }
      .title-info{
        padding-left: 24px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
         border-left:3px solid #5175FA;
        height:40px;
        border-radius:0px 3px 3px 0px;
        .btn{
          background: #5175FA;
        }
      }
      .blue {
        // color: #409eff;
        color: #5175FA;
      }

      .red {
        color: red;
      }
    }
    .inputUnSelect {
      user-select: none;
    }
    .fujian{
      width: 100%;
    }

    .items-wrap {
      padding: 0px 24px 24px 0px;
      background: #fff;
      border-radius: 3px;

      .rule-form {
        display: flex;
        flex-wrap: wrap;
        .form1{
          flex-wrap: wrap;
          display: flex;
          .pinyu1{
            width: 100%;
          }
        }
        .commentStyle{
           margin-left: 25px;
           .pinyu{
             display: inline-flex;
             padding-left: 10px;
             height: 28px;
              .inputStyle {
                width: 100%;
             }
           }
        }
           .comments-wrap {
              flex: 1;
              border: 1px solid #dcdfe6;
              border-radius: 5px;
              padding: 8px;
              min-height: 30px;

              .item {
                margin-bottom: 4px;
                line-height: 1;
                color: #000;

                &.blue {
                  color: #5175FA;
                }

                &.red {
                  color: red;
                }

                &:last-child {
                  margin-bottom: 0;
                }
              }
           }

        .itemStyle_fujian{
          .el-form-item__label{
            width: 50px !important;
          }
        }
        .style1{
          display: contents;
        }
        .itemStyle{
          display:inline-block;
          margin-left: 25px;
          margin-top: 15px;
          .lableStyle_name{
            display: contents;
            .el-form-item__label{
              text-align: left;
              width: 100%;
              padding-left: 10px;
              margin-bottom: 5px;
              border-radius: 3px;
            }
          }
          .lableStyle_blue{
            display: contents;
            .el-form-item__label{
              background: #EDF0FF;
              color: #a0b3fb;
              text-align: left;
              width: 100%;
              padding-left: 10px;
              margin-bottom: 5px;
              border-radius: 3px;
            }
          }
          .lableStyle_riqi{
            display: contents;
            .el-form-item__label{
              background: #FFF5ED;
              color: #f8aa70;
              text-align: left;
              width: 100% !important;
              padding-left: 10px;
              margin-bottom: 5px;
              border-radius: 3px;
            }
          }
          .lableStyle_date{
            display: contents;
            .el-form-item__label{
              background: #EDF0FF;
              color: #a0b3fb;
              text-align: left;
              width: 100%;
              padding-left: 10px;
              margin-bottom: 5px;
              border-radius: 3px;
            }
          }
          .lableStyle{
            display: contents;
             .el-form-item__label{
              text-align: left;
              width: 100%;
              padding-left: 10px;
              margin-bottom: 5px;
              border-radius: 3px;
            }
          }
        }

        .el-form-item {
          margin-bottom: 8px;
          display: flex;
          width: 25%;

          &.half {
            width: 50%;
          }

          &.whole {
            width: 100%;
          }

          &.width-75 {
            width: 75%;
          }

          .el-form-item__content {
            flex: 1;
            margin-left: 0 !important;

            .el-date-editor {
              width: 100%;
            }

            .el-select {
              width: 100%;
            }
          }

          .content-wrap {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;

            .comments-wrap {
              margin-left: 12px;
              flex: 1;
              border: 1px solid #dcdfe6;
              border-radius: 5px;
              padding: 8px;
              min-height: 30px;

              .item {
                margin-bottom: 4px;
                line-height: 1;
                color: #000;

                &.blue {
                  color: #5175FA;
                }

                &.red {
                  color: red;
                }

                &:last-child {
                  margin-bottom: 0;
                }
              }
            }
          }
        }
      }
    }

    .other-wrap {
      margin-top: 24px;
      display: flex;
      align-items: flex-start;

      .left-wrap {
        flex: 1;
        overflow: hidden;
        border-radius:3px;
        .btn{
          background: #5175FA;
        }
        .fontColor{
          color: #5175FA;
        }
         .fontColorTel{
          color: #FF9900;
        }



        .el-tabs {
          .el-tabs__item {
            padding: 0 8px;
          }
          .susong{
            .el-table__body-wrapper{
              overflow-y: auto;
              overflow-x:hidden;
            }
            .has-gutter{
              .gutter{
                display: inherit !important;
              }
            }
          }
          .tabs-wrap {
            .operation {
              margin-bottom: 12px;
              display: flex;
              justify-content: space-between;
              .left-oper{
                .el-button--mini{
                   background: #EDF0FF;
                   color: #5175FA;
                   border:1px solid #A9BAFB;
                }
              }
            }

            .sendTel4Style{
              margin-left: 0px;
            }

            .addPhoneStyle{
              margin-left: 0px
            }

            &.billing-wrap {
              width: 100%;
              display: flex;
              flex-direction: row;
              flex-wrap: nowrap;

              .first {
                flex: 0 0 35%;
                width: 35%;
                .el-table__body-wrapper{
                  overflow-y: auto;
                  overflow-x:hidden;
                }
              }

              .second {
                margin-left: 12px;
                flex: 1;
                .el-table__body-wrapper{
                  overflow-y: auto;
                  overflow-x:hidden;
                }
              }
            }
          }
        }
      }
      .left-wrap{
        background: #fff;
        padding-left: 10px;
        padding-right: 10px;
        .el-tabs--card>.el-tabs__header .el-tabs__nav {
           border: none;
        }
        .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
          border-bottom-color: #5175FA;
          color: #5175FA;
        }
        .el-tabs--card>.el-tabs__header .el-tabs__item {
          border-left: none;
        }
      }

      .right-wrap {
        width: 250px;
        margin-left: 20px;
        .btn{
          color: #5175FA;
        }
        .el-card {
          .el-card__header {
            padding: 10px;
          }

          .el-card__body {
            padding: 10px;
          }
        }
      }
    }

    .memorize-wrap {
      display: flex;
      .left-panel {
        padding: 12px;
        flex: 0 0 40%;
        width: 40%;
        margin-right: 24px;
        border: 1px solid #d1d1d1;
        box-sizing: border-box;
        background: #fff;
        .rowStyle{
          display: contents;
          .itemStyle2{
            display:inline-block;
            margin-left: 40px;
            margin-top: 20px;
            .nameStyle{
              display: flex;
            }
            .fixwidth2{
                width: 190px !important;
                display: table;
            }
            .fixwidth2_info{
              width: 420px;
              .el-textarea__inner {
                resize: none;
              }
            }
            .lableStyle2_phone{
                display: contents;
              .el-form-item__label{
                text-align: left;
                width: 30px;
                padding-left: 10px;
                margin-bottom: 5px;
                border-radius: 3px;
              }
              .el-form-item__content{
                text-align: right;
              }
            }
            .lableStyle2{
              display: contents;
              .el-form-item__label{
                text-align: left;
                width: 100%;
                padding-left: 10px;
                margin-bottom:5px;
              }
            }
          }
        }

        .el-form {
          display: flex;
          flex-wrap: wrap;
          width: 100%;

          .el-form-item {
            display: flex;
            width: 50%;

            &.whole {
              width: 100%;
            }

            .el-form-item__content {
              flex: 1;
              margin-left: 0 !important;

              .el-select {
                width: 100%;
              }

              .el-date-editor {
                width: 100%;
              }
            }
          }
        }

        .operation {
          margin-top: 10px;
          text-align: center;
            .btn{
               background: #5175FA;
            }
        }
      }

      .right-panel {
        flex: 0 0 60%;
        width: 60%;
      }
    }

    .phoneNumber input{
      padding: 0 15px;
    }
  }
  .case-dialog-wrap {

    .el-dialog__body {
      overflow: auto;
      .el-form {
        height: 480px;
        display: flex;
        flex-wrap: wrap;

        .el-form-item {
          display: flex;
          width: 50%;
          margin-right: 0;

          &.whole {
            width: 100%;
          }

          .el-form-item__content {
            flex: 1;
            margin-left: 0 !important;

            .el-select {
              width: 100%;
            }

            .el-date-editor {
              width: 100%;
            }
          }
        }
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

          &.whole {
            width: 100%;
          }

          .el-form-item__content {
            flex: 1;
            margin-left: 0 !important;

            .el-select {
              width: 100%;
            }

            .el-date-editor {
              width: 100%;
            }
          }
        }
      }
    }
  }

  .upload-wrap {
    margin-top: 20px;
    max-height: 100px;
    .el-form-item__label{
      margin-left: 25px;
      width: 50px !important;
    }
    .upload-btn {
      display: inline-block;
    }
  }

  .el-table {
    .stop-row td:not(:last-child){
      .cell,span{
        color: red !important;
      }
    }
  }

  .inputDiv {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: black;
    cursor: not-allowed;
    //height: 28px;
    line-height: 28px;
    min-height: 28px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    display: inline-block;
    font-size: inherit;
    padding: 0 15px;
    width: 100%;
  }
  .fixwidth{
    width: 210px !important;
    display: table;
  }
  .beizhu{
    display: block;
    max-height: 150px;
    overflow-y: auto;
  }

  .telPanel .el-table__body-wrapper {
    overflow-x: hidden;
  }
  .address {
 /*   .el-input{
      width:200px;
    }*/
    .el-select{
      width:190px !important;;
    }
  }
  .warninghead .el-dialog__body{
    padding-top: 10px;
  }
</style>
