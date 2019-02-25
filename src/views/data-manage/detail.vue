<template>
  <div id="case-detail">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="个案序列号:20171218-0157" name="1">
        <div class="items-wrap">
          <el-form
            :model="caseDetail"
            ref="ruleForm"
            label-width="100px"
            class="rule-form"
          >
            <el-form-item label="姓名">
              <el-input v-model="caseDetail.name"></el-input>
            </el-form-item>
            <el-form-item label="委托方">
              <el-input v-model="caseDetail.client"></el-input>
            </el-form-item>
            <el-form-item label="批次号">
              <el-input v-model="caseDetail.pch"></el-input>
            </el-form-item>
            <el-form-item label="委案日期">
              <el-date-picker v-model="caseDetail.warq" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="证件号">
              <el-input v-model="caseDetail.zjh"></el-input>
            </el-form-item>
            <el-form-item label="卡号">
              <el-input v-model="caseDetail.kh"></el-input>
            </el-form-item>
            <el-form-item label="催收状态">
              <el-input v-model="caseDetail.cszt"></el-input>
            </el-form-item>
            <el-form-item label="预计退案日">
              <el-date-picker v-model="caseDetail.yjtar" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="委案金额">
              <el-input v-model="caseDetail.warq"></el-input>
            </el-form-item>
            <el-form-item label="人民币">
              <el-input v-model="caseDetail.rmb"></el-input>
            </el-form-item>
            <el-form-item label="港币">
              <el-input v-model="caseDetail.gb"></el-input>
            </el-form-item>
            <el-form-item label="外币">
              <el-input v-model="caseDetail.wb"></el-input>
            </el-form-item>
            <el-form-item label="已还款">
              <el-input v-model="caseDetail.yhk"></el-input>
            </el-form-item>
            <el-form-item label="逾期账龄">
              <el-input v-model="caseDetail.yqzl"></el-input>
            </el-form-item>
            <el-form-item label="逾期天数">
              <el-input v-model="caseDetail.yqts"></el-input>
            </el-form-item>
            <el-form-item label="币种">
              <el-input v-model="caseDetail.bz"></el-input>
            </el-form-item>
            <el-form-item label="最新欠款" class="half">
              <el-input v-model="caseDetail.zxqk"></el-input>
            </el-form-item>
            <el-form-item label="地区">
              <el-input v-model="caseDetail.dq"></el-input>
            </el-form-item>
            <el-form-item label="催收手别">
              <el-input v-model="caseDetail.cssb"></el-input>
            </el-form-item>
            <el-form-item label="本金">
              <el-input v-model="caseDetail.bj"></el-input>
            </el-form-item>
            <el-form-item label="剩余本金">
              <el-input v-model="caseDetail.sybj"></el-input>
            </el-form-item>
            <el-form-item label="贷款日期">
              <el-date-picker v-model="caseDetail.dkrq" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="逾期期数">
              <el-input v-model="caseDetail.yqqs"></el-input>
            </el-form-item>
            <el-form-item label="贷款利率">
              <el-input v-model="caseDetail.dkll"></el-input>
            </el-form-item>
            <el-form-item label="每月还款">
              <el-input v-model="caseDetail.myhk"></el-input>
            </el-form-item>
            <el-form-item label="逾期金额">
              <el-input v-model="caseDetail.yqje"></el-input>
            </el-form-item>
            <el-form-item label="预期本金">
              <el-input v-model="caseDetail.yqbj"></el-input>
            </el-form-item>
            <el-form-item label="逾期利息">
              <el-input v-model="caseDetail.yqlx"></el-input>
            </el-form-item>
            <el-form-item label="逾期罚息">
              <el-input v-model="caseDetail.yqfx"></el-input>
            </el-form-item>
            <el-form-item label="违约金">
              <el-input v-model="caseDetail.wyj"></el-input>
            </el-form-item>
            <el-form-item label="滞纳金">
              <el-input v-model="caseDetail.znj"></el-input>
            </el-form-item>
            <el-form-item label="手机">
              <el-input v-model="caseDetail.sj"></el-input>
            </el-form-item>
            <el-form-item label="家庭号码">
              <el-input v-model="caseDetail.jthm"></el-input>
            </el-form-item>
            <el-form-item label="单位号码">
              <el-input v-model="caseDetail.dwhm"></el-input>
            </el-form-item>
            <el-form-item label="家庭地址" class="whole">
              <el-input v-model="caseDetail.jtdz"></el-input>
            </el-form-item>
            <el-form-item label="单位名称" class="whole">
              <el-input v-model="caseDetail.dwmc"></el-input>
            </el-form-item>
            <el-form-item label="单位地址" class="whole">
              <el-input v-model="caseDetail.dwdz"></el-input>
            </el-form-item>
            <el-form-item label="户籍地址" class="whole">
              <el-input v-model="caseDetail.hjdz"></el-input>
            </el-form-item>
            <el-form-item label="对账单地址" class="whole">
              <el-input v-model="caseDetail.dzddz"></el-input>
            </el-form-item>
            <el-form-item label="PTP金额">
              <el-input v-model="caseDetail.ptp"></el-input>
            </el-form-item>
            <el-form-item label="CP金额">
              <el-input v-model="caseDetail.cp"></el-input>
            </el-form-item>
            <el-form-item label="委案期数">
              <el-input v-model="caseDetail.waqs"></el-input>
            </el-form-item>
            <el-form-item label="最低还款额">
              <el-input v-model="caseDetail.zdhke"></el-input>
            </el-form-item>
            <el-form-item label="下次跟进日期" class="half">
              <el-input v-model="caseDetail.xcgjrq"></el-input>
            </el-form-item>
            <el-form-item label="委托日期">
              <el-date-picker v-model="caseDetail.wtrq" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="跟进次数">
              <el-input v-model="caseDetail.gjcs"></el-input>
            </el-form-item>
            <el-form-item label="催收区域">
              <el-input v-model="caseDetail.csqy"></el-input>
            </el-form-item>
            <el-form-item label="催收员">
              <el-input v-model="caseDetail.csy"></el-input>
            </el-form-item>
            <el-form-item label="最近催记时间">
              <el-date-picker v-model="caseDetail.zjcjsj" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="最后外访">
              <el-input v-model="caseDetail.zhwf"></el-input>
            </el-form-item>
            <el-form-item label="自动收回时间">
              <el-date-picker v-model="caseDetail.zdshsj" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="催收小结" class="width-75">
              <el-input v-model="caseDetail.csxj"></el-input>
            </el-form-item>
            <el-form-item label="最新评语" class="whole">
              <div class="content-wrap">
                 <el-button size="small" type="text" icon="el-icon-plus" title="添加"></el-button>
                 <ul class="comments-wrap">
                   <li v-for="(item) in caseDetail.zxpy" :key="item.id" class="item">
                     {{item.time}} {{item.user}} : {{item.text}}
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
            prop="createTime"
            label="个案序列号">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="卡号">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="账号">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="委案金额">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="币种">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="PTP">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="CP">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="已还款">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="逾期账龄">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="上次通电">
          </el-table-column>
          <el-table-column
            prop="createTime"
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
              <el-input v-model="caseDetail.distributeTime"></el-input>
            </el-form-item>
            <el-form-item label="分配历史">
              <el-input v-model="caseDetail.distributeHistory"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="other-wrap">
          <div class="left-wrap">
            <el-tabs v-model="otherActiveName" type="card" >
              <el-tab-pane label="电话" name="1" class="tabs-wrap">
                <div class="operation">
                  <div class="left-oper">
                    <el-button>标记为有效</el-button>
                    <el-button>标记为未知</el-button>
                    <el-button>标记为无效</el-button>
                    <el-button>显示全部电话</el-button>
                  </div>
                  <div class="right-oper">
                    <el-button type="primary">新增电话</el-button>
                    <el-button type="primary">批量新增电话</el-button>
                    <el-button type="primary">批量电催</el-button>
                    <el-button type="primary">同步共债</el-button>
                  </div>
                </div>
                <el-table
                  :data="caseDetail.dataCaseTelEntityList"
                  style="width: 100%"
                  class="table-wrap">
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    prop="status"
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
                    prop="type"
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
                      <el-button type="text">编辑</el-button>
                      <el-button type="text">删除</el-button>
                      <el-button type="text">停止跟进</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="地址" name="2" class="tabs-wrap">
                <div class="operation">
                  <div class="left-oper">
                    <el-button>标记为有效</el-button>
                    <el-button>标记为未知</el-button>
                    <el-button>标记为无效</el-button>
                    <el-button>显示全部地址</el-button>
                    <el-button>查看信函记录</el-button>
                  </div>
                </div>
                <el-table
                  :data="caseDetail.addrList"
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
                    prop="rel"
                    show-overflow-tooltip
                    label="关系">
                  </el-table-column>
                  <el-table-column
                    prop="addr"
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
                    prop="letterTime"
                    show-overflow-tooltip
                    label="信函次数">
                  </el-table-column>
                  <el-table-column
                    prop="visitTime"
                    show-overflow-tooltip
                    label="外访次数">
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="案人数据" name="3" class="tabs-wrap">
                <el-table
                  :data="caseDetail.dataList"
                  style="width: 100%"
                  class="table-wrap">
                  <el-table-column
                    prop="name"
                    show-overflow-tooltip
                    label="姓名">
                  </el-table-column>
                  <el-table-column
                    prop="type"
                    show-overflow-tooltip
                    label="信息类型">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="信息内容">
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    show-overflow-tooltip
                    label="备注">
                  </el-table-column>
                  <el-table-column
                    prop="time"
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
                  :data="caseDetail.memorizeList"
                  style="width: 100%"
                  class="table-wrap">
                  <el-table-column
                    prop="type"
                    show-overflow-tooltip
                    label="催收措施">
                  </el-table-column>
                  <el-table-column
                    prop="time"
                    show-overflow-tooltip
                    label="时间">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    show-overflow-tooltip
                    label="对象姓名">
                  </el-table-column>
                  <el-table-column
                    prop="rel"
                    show-overflow-tooltip
                    label="关系">
                  </el-table-column>
                  <el-table-column
                    prop="type"
                    show-overflow-tooltip
                    label="电话/地址">
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    show-overflow-tooltip
                    label="类型">
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    show-overflow-tooltip
                    label="催收结果">
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    show-overflow-tooltip
                    label="催收对象">
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    show-overflow-tooltip
                    label="谈判方式">
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    show-overflow-tooltip
                    label="承诺日期">
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    show-overflow-tooltip
                    label="承诺金额">
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    show-overflow-tooltip
                    label="减免金额">
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    show-overflow-tooltip
                    label="减免状态">
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    show-overflow-tooltip
                    label="催收人">
                  </el-table-column>
                  <el-table-column
                    prop="remark"
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
                  :data="caseDetail.commentList"
                  style="width: 100%"
                  class="table-wrap">
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="评语内容">
                  </el-table-column>
                  <el-table-column
                    prop="creater"
                    show-overflow-tooltip
                    width="150"
                    label="提交人">
                  </el-table-column>
                  <el-table-column
                    prop="time"
                    show-overflow-tooltip
                    width="150"
                    label="提交时间">
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="外访" name="6" class="tabs-wrap">
                <el-table
                  :data="caseDetail.visitList"
                  style="width: 100%"
                  class="table-wrap">
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="附件">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="状态">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="姓名">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="原因">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="地址">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="外访地区">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="外访期次">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="外访时间">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="外访员">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="要求">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="外访报告">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="备注">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="申请人">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="申请时间">
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="利息更新" name="7" class="tabs-wrap">
                <el-table
                  :data="caseDetail.rateUpdateList"
                  style="width: 100%"
                  class="table-wrap">
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="币种">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="总欠款金额">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="截止日期">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="本金">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="利息">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="违约金">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="滞纳金">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="超限费">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="服务费">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="年费">
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    label="其他费用">
                  </el-table-column>
                  <el-table-column
                    prop="content"
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
              <el-tab-pane label="案件登帐" name="8" class="tabs-wrap billing-wrap">
                <div class="first">
                  <p>PTP记录</p>
                  <el-table
                    width="100%"
                    :data="caseDetail.ptpList"
                    class="table-wrap">
                    <el-table-column
                      prop="content"
                      show-overflow-tooltip
                      label="PTP金额">
                    </el-table-column>
                    <el-table-column
                      prop="content"
                      show-overflow-tooltip
                      label="PTP时间">
                    </el-table-column>
                    <el-table-column
                      prop="content"
                      show-overflow-tooltip
                      label="录入人">
                    </el-table-column>
                  </el-table>
                </div>
                <div class="second">
                  <p>CP记录</p>
                  <el-table
                    width="100%"
                    :data="caseDetail.cpList"
                    class="table-wrap">
                    <el-table-column
                      prop="content"
                      show-overflow-tooltip
                      label="CP金额">
                    </el-table-column>
                    <el-table-column
                      prop="content"
                      show-overflow-tooltip
                      label="CP时间">
                    </el-table-column>
                    <el-table-column
                      prop="content"
                      show-overflow-tooltip
                      label="还款人">
                    </el-table-column>
                    <el-table-column
                      prop="content"
                      show-overflow-tooltip
                      label="还款方式">
                    </el-table-column>
                    <el-table-column
                      prop="content"
                      show-overflow-tooltip
                      label="确认还款">
                    </el-table-column>
                    <el-table-column
                      prop="content"
                      show-overflow-tooltip
                      label="还款日期">
                    </el-table-column>
                    <el-table-column
                      prop="content"
                      show-overflow-tooltip
                      label="确认时间">
                    </el-table-column>
                    <el-table-column
                      prop="content"
                      show-overflow-tooltip
                      label="备注">
                    </el-table-column>
                  </el-table>
                </div>
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
                  :data="caseDetail.syncList"
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
                    label="减免/报备XX">
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
                    label="减免/报备XX">
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
                <el-button style="float: right; padding: 3px 0" type="text">保存</el-button>
              </div>
              <el-input type="textarea" :rows="8"  v-model="caseDetail.customInfo"></el-input>
            </el-card>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import {getCaseDetail} from '@/common/js/api-detail'
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
      activeNames: ['1'],
      otherActiveName:'1',
      caseDetail:{},
      memorizeType:1
    }
  },
  methods: {
    queryDetail(){
      getCaseDetail(this.id).then(data => {
        this.caseDetail = data
      })
    }
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
}
</style>

