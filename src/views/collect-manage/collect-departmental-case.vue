<template>
  <div id="collect-departmental-case" v-loading="pageLoading" element-loading-text="拼命加载中">
    <el-tabs v-model="activeName"  :class="{tab2:tabnum}" class="tabs-wrap">
      <el-tab-pane label="部门案件" name="tab1" style="height: 100%">
        <el-dialog
          :title="detailTitle"
          class="dialog-wrap"
          :visible.sync="detailVisible"
          :close-on-click-modal="false"
          width="90%"
          v-dialogDrag
        >
          <case-detail :id="detailId" ref='detail'></case-detail>
        </el-dialog>
        <el-dialog
          title="申请协催"
          class="dialog-wrap"
          :visible.sync="dialogVisible"
          :close-on-click-modal="false"
          width="50%"
          v-dialogDrag
          >
          <el-form  class="demo-form-inline" label-width="120px">
            <div class="grid-content bg-purple">
              <el-form-item label="协催类型">
                <el-select v-model="synergytype" placeholder="请选择协催类型" clearable>
                  <el-option
                    v-for="item in addSynergyFormList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="申请内容">
                <el-input type="textarea" v-model="textarea3" style="width: 100%;" placeholder="请输入"
                          rows="4"></el-input>
              </el-form-item>
            </div>
          </el-form>
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false;xcHandle()">确 定</el-button>
        </span>
        </el-dialog>
        <el-row :gutter="24">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form
                :inline="true"
                ref="form"
                :model="form"
                class="query-wrap queryStyle"
              >
                <!-- label-width="20px" -->
                <el-form-item prop="val31" v-if="queryConf.bm || queryConfFlag" label="部门：">
                  <!-- <el-input v-model="deptName" width="200" @focus="onClickSelectUser" clearable placeholder="请选择部门"></el-input> -->
                   <el-autocomplete v-model="deptName" width="200" clearable placeholder="请输入部门" :fetch-suggestions="showDeptName" @select="selectDept">
                     <el-button slot="append" icon="el-icon-search" @click="onClickSelectDept"></el-button>
                   </el-autocomplete>
                </el-form-item>
                <el-form-item prop="val32" v-if="queryConf.csy || queryConfFlag" label="催收员：">

                <!-- <el-input v-model="form.odvNameFiter" width="200" @focus="onClickSelectUser3" clearable placeholder="请选择催收员"></el-input>  -->
                 <el-autocomplete v-model="form.odvNameFiter" width="160" clearable placeholder="请输入催收员" :fetch-suggestions="showOdvName" @select="selectOdv">
                    <el-button slot="append" icon="el-icon-search" @click="onClickSelectUser3"></el-button>
                  </el-autocomplete>
                </el-form-item>

                <el-form-item prop="val0" v-if="queryConf.wtf || queryConfFlag" label="委托方：">
                  <el-select
                    v-model="form.val0"
                    placeholder="请选择委托方"
                    @change="clientCurrent"
                    multiple
                    collapse-tags
                    clearable
                  >
                    <el-option
                      v-for="item in val0_data"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="val1" v-if="queryConf.pch || queryConfFlag" label="批次号：">
                  <el-select
                    v-model="form.val1"
                    multiple
                    collapse-tags
                    clearable
                    filterable
                    remote
                    placeholder="请输入批次号"
                    :remote-method="querySearch">
                    <el-option
                      v-for="item in val1_data"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="val3" v-if="queryConf.gaxlh || queryConfFlag" label="个案序列号：">
                  <el-input
                    type="textarea"
                    rows="3"
                    style="width: 100%;"
                    v-model="form.val3"
                    placeholder="请输入个案序列号"
                    clearable
                  >
                  </el-input>
                </el-form-item>
                <el-form-item prop="val2" v-if="queryConf.xcgjrq || queryConfFlag" label="下次跟进日期：">
                  <el-date-picker
                    v-model="form.val2"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="下次跟进日期开始"
                    end-placeholder="下次跟进日期结束"
                  >
                  </el-date-picker>
                </el-form-item>
                <!-- <el-popover
                   placement="bottom-end"
                   width="800"
                   popper-class="myCase-pop"
                   :visible-arrow="false"
                   trigger="click">
                   <img style="cursor: pointer;vertical-align: middle;margin-top: 8px;margin-right: 8px;"
                       src="./zhankai.png"
                       width="12"
                       height="12"
                       alt="更多"
                       slot="reference">-->
                <el-form-item prop="val4" v-if="queryConf.dq || queryConfFlag" label="地区：">
                  <!-- <el-cascader
                     :options="val4_data"
                     clearable
                     placeholder="请选择地区"
                     v-model="form.val4"
                   >
                   </el-cascader>-->
                  <el-select
                    v-model="form.val4"
                    placeholder="请选择地区"
                    multiple
                    collapse-tags
                    clearable
                  >
                    <el-option
                      v-for="item in val4_data"
                      :key="item.label"
                      :label="item.label"
                      :value="item.label"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="val5" v-if="queryConf.xm || queryConfFlag" label="姓名：">
                  <el-input
                    type="textarea"
                    rows="3"
                    style="width: 100%;"
                    v-model="form.val5"
                    placeholder="请输入姓名"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item prop="val6" v-if="queryConf.zjh || queryConfFlag" label="证件号：">
                  <el-input
                    type="textarea"
                    rows="3"
                    style="width: 100%;"
                    v-model="form.val6"
                    placeholder="请输入证件号"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item prop="val8" v-if="queryConf.yqzl || queryConfFlag" label="逾期账龄：">
                  <el-select
                    v-model="form.val8"
                    multiple
                    collapse-tags
                    placeholder="请选择逾期账龄"
                    clearable
                  >
                    <el-option
                      v-for="item in val8_data"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="val9" v-if="queryConf.ajzt || queryConfFlag" label="案件状态：">
                  <el-select
                    v-model="form.val9"
                    multiple
                    collapse-tags
                    placeholder="请选择案件状态"
                    clearable
                  >
                    <el-option
                      v-for="item in val9_data"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="val10" v-if="queryConf.cszt || queryConfFlag" label="催收状态：">
                  <el-select
                    v-model="form.val10"
                    multiple
                    collapse-tags
                    placeholder="请选择催收状态"
                    clearable
                  >
                    <el-option
                      v-for="item in val10_data"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="val11" v-if="queryConf.ajlx || queryConfFlag" label="案件类型：">
                  <el-select
                    v-model="form.val11"
                    multiple
                    collapse-tags
                    placeholder="请选择案件类型"
                    clearable
                  >
                    <el-option
                      v-for="item in val11_data"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="val29" v-if="queryConf.waje || queryConfFlag" label="委案金额下限：">
                  <el-input
                    v-model="form.val29"
                    type="number"
                    placeholder="请输入委案金额下限"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item prop="val13" v-if="queryConf.waje || queryConfFlag" label="委案金额上限：">
                  <el-input
                    v-model="form.val13"
                    type="number"
                    placeholder="请输入委案金额上限"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item v-if="queryConf.yqts || queryConfFlag" label="逾期天数下限：">
                  <el-input v-model="form.overdueDaysStart" type="number" placeholder="请输入逾期天数下限" clearable></el-input>
                </el-form-item>
                <el-form-item v-if="queryConf.yqts || queryConfFlag" label="逾期天数上限：">
                  <el-input v-model="form.overdueDaysEnd" type="number" placeholder="请输入逾期天数上限" clearable></el-input>
                </el-form-item>
                <el-form-item prop="val14" v-if="queryConf.bszt || queryConfFlag" label="标色状态：">
                  <el-select
                    v-model="form.val14"
                    collapse-tags multiple
                    placeholder="请选择标色状态"
                    clearable
                  >
                    <el-option
                      v-for="item in val14_data"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="val15" v-if="queryConf.kh || queryConfFlag" label="卡号：">
                  <el-input
                    type="textarea"
                    rows="3"
                    style="width: 100%;"
                    v-model="form.val15"
                    placeholder="请输入卡号"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item prop="val16" v-if="queryConf.dah || queryConfFlag" label="档案号：">
                  <el-input
                    type="textarea"
                    rows="3"
                    style="width: 100%;"
                    v-model="form.val16"
                    placeholder="请输入档案号"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item prop="val30" v-if="queryConf.gjcs || queryConfFlag" label="跟进次数下限：">
                  <el-input
                    v-model="form.val30"
                    type="number"
                    placeholder="请输入跟进次数下限"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item prop="val18" v-if="queryConf.gjcs || queryConfFlag" label="跟进次数上限：">
                  <el-input
                    v-model="form.val18"
                    type="number"
                    placeholder="请输入跟进次数上限"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item prop="val19" v-if="queryConf.sfxfp || queryConfFlag" label="是否新分配：">
                  <el-select
                    v-model="form.val19"
                    placeholder="请选择是否新分配"
                    clearable
                  >
                    <el-option
                      v-for="item in val19_data"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="val20" v-if="queryConf.hkqk || queryConfFlag" label="还款情况：">
                  <el-select
                    v-model="form.val20"
                    placeholder="请选择还款情况"
                    clearable
                  >
                    <el-option
                      v-for="item in val20_data"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item prop="val22" v-if="queryConf.zdyxx || queryConfFlag" label="自定义信息：">
                  <el-input
                    v-model="form.val22"
                    placeholder="请输入自定义信息"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item prop="val23" v-if="queryConf.csfl || queryConfFlag" label="催收分类：">
                  <el-input
                    v-model="form.val23"
                    placeholder="请输入催收分类"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item prop="val24" v-if="queryConf.jmzt || queryConfFlag" label="减免状态：">
                  <el-select
                    v-model="form.val24"
                    multiple
                    collapse-tags
                    placeholder="请选择减免状态"
                    clearable
                  >
                    <el-option
                      v-for="item in val24_data"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="val25" v-if="queryConf.bbzt || queryConfFlag" label="报备状态：">
                  <el-select
                    v-model="form.val25"
                    multiple
                    collapse-tags
                    placeholder="请选择报备状态"
                    clearable
                  >
                    <el-option
                      v-for="item in val25_data"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="val27" v-if="queryConf.dhhm || queryConfFlag" label="电话号码：">
                  <el-input
                    v-model="form.val27"
                    placeholder="请输入电话号码"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item prop="val28" v-if="queryConf.csjl || queryConfFlag" label="催收记录：">
                  <el-input
                    v-model="form.val28"
                    placeholder="请输入催收记录"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item prop="val33" v-if="queryConf.ajfprq || queryConfFlag" label="案件分配日期：">
                  <el-date-picker
                    v-model="form.val33"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="案件分配起始日期"
                    end-placeholder="案件分配结束日期"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item prop="val21" v-if="queryConf.yjtarq || queryConfFlag" label="预计退案日期：">
                  <el-date-picker
                    v-model="form.val21"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="预计退案起始日期"
                    end-placeholder="预计退案结束日期"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item prop="val17" v-if="queryConf.zhgjrq || queryConfFlag" label="最后跟进日期：">
                  <el-date-picker
                    v-model="form.val17"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="最后跟进起始日期"
                    end-placeholder="最后跟进结束日期"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item prop="val12" v-if="queryConf.hkrq || queryConfFlag" label="还款日期：">
                  <el-date-picker
                    v-model="form.val12"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="还款起始日期"
                    end-placeholder="还款结束日期"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item prop="val7"  v-if="queryConf.warq || queryConfFlag" label="委案日期：">
                  <el-date-picker
                    v-model="form.val7"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="委案起始日期"
                    end-placeholder="委案结束日期"
                  >
                  </el-date-picker>
                </el-form-item>
                <!--</el-popover>-->
                <el-row>
                  <el-form-item>
                    <el-button
                      type="primary"
                      icon="el-icon-search"
                      @click="searchHandle"
                    >查询</el-button
                    >
                  </el-form-item>

                  <el-form-item>
                    <el-button
                      type="primary"
                      icon="el-icon-refresh"
                      @click="resetForm('form')"
                    >重置</el-button
                    >
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      type="primary"
                      @click="showQueryConf"
                    >查询条件配置</el-button
                    >
                  </el-form-item>
                  <el-form-item>
                    <el-dropdown trigger="click"
                                v-dropdown-patch @command="colorHandle" v-has="'案件标色'">
                      <el-button type="primary">案件标色<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="黑">黑色</el-dropdown-item>
                        <el-dropdown-item command="红">红色</el-dropdown-item>
                        <el-dropdown-item command="蓝">蓝色</el-dropdown-item>
                        <!--<el-dropdown-item command="橙">橙色</el-dropdown-item>
                        <el-dropdown-item command="紫">紫色</el-dropdown-item>
                        <el-dropdown-item command="棕">棕色</el-dropdown-item>-->
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-form-item>
                  <el-form-item>
                    <el-dropdown v-dropdown-patch trigger="click" @command="modStatusHandle" v-has="'修改催收状态'">
                      <el-button type="primary">修改催收状态<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :command="item.id"
                                          v-for="(item,i) in collectStatusList2" :key="i">{{item.name}}
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" v-has="'申请协催'" @click="applyUrge">申请协催</el-button>
                  </el-form-item>
                </el-row>
              </el-form>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple queryResultSummary">
              <i class="el-icon-info"></i>
              <span>查询结果统计：</span>
              <span v-if="tableLoad" class="queryStyle">查询中，请稍候...</span>
              <span v-else>
                <span class="queryStyle">列表案量：</span><span class="textColor">{{fetchData.countCase}}</span><span class="queryStyle">件，</span>
                <span class="queryStyle">列表金额：</span><span class="textColor">{{fetchData.sumMoneyMsg }}</span><span class="queryStyle">，</span>
                <span class="queryStyle">列表还款案量：</span><span class="textColor">{{fetchData.countCasePay}}</span><span class="queryStyle">件，</span>
                <span class="queryStyle">列表还款金额：</span><span class="textColor">{{fetchData.sumPayMoneyMsg}}</span><span class="queryStyle">，</span>
                <span class="queryStyle">列表待银行查账金额：</span><span class="textColor">{{fetchData.bankAmtMsg}}</span><span class="queryStyle">，</span>
                <span class="queryStyle">列表承诺还款金额：</span><span class="textColor">{{fetchData.repayAmtMsg }}</span>
              </span>
            </div>
          </el-col>
        </el-row>
        <el-table highlight-current-row v-loading="tableLoad"
                  ref="multipleTable"
                  :data="tableData"
                  :row-class-name="rowColor"
                  @selection-change="handleSelectionChange"
                  @row-dblclick="showCase"
                  @sort-change="sortHandle"
                  border
        >
          <el-table-column
            type="selection"
            width="55"
            align="center">
          </el-table-column>
          <el-table-column
            label="跟进次数"
            prop="countFollow"
            sortable="custom"
            min-width="120"
            :sort-orders="['ascending', 'descending']"
            header-align="center"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="个案序列号"
            prop="seqno"
            sortable="custom"
            min-width="180"
            :sort-orders="['ascending', 'descending']"
            header-align="center"
            show-overflow-tooltip
            align="center"
          >
            <template slot-scope="scope">
              <el-button v-if="scope.row.caseStatus==3" type="text" style ="color:#999999;" size="small" @click="showCase(scope.row)">
                {{scope.row.seqno}}
              </el-button>
              <el-button v-if="scope.row.caseStatus==4" type="text" style ="color:#999999;text-decoration:line-through;" size="small" @click="showCase(scope.row)">
                {{scope.row.seqno}}
              </el-button>
              <el-button v-if="scope.row.caseStatus!=3 && scope.row.caseStatus!=4" type="text" size="small" @click="showCase(scope.row)">
                {{scope.row.seqno}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            v-for="(item, index) in tableCol_data"
            :key="index"
            v-bind="item"
            header-align="center"
            sortable="custom"
            show-overflow-tooltip
            :sort-orders="['ascending','descending']"
            align="center"
          ></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="paginationData.currentPage"
          :page-sizes="pageSizes"
          :page-size="paginationData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="paginationData.total">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="部门还款统计" name="tab2"> <tab2></tab2> </el-tab-pane>
    </el-tabs>

    <el-dialog
      title="查询条件配置"
      :visible.sync="showQueryConfVisible"
      width="60%"
      center
      v-dialogDrag
      class="dialog-wrap"
    >
      <div class="selectAllBtn">
        <el-button type="primary" @click="selectMethod(true)">全部选中</el-button>
        <el-button type="primary" @click="selectMethod(false)" >全部取消</el-button>
      </div>
      <el-row class="pad" ref="boxWrapper">
        <el-checkbox v-model="queryConf.bm" label="1" >部门</el-checkbox>
        <el-checkbox v-model="queryConf.csy" label="1" >催收员</el-checkbox>
        <el-checkbox v-model="queryConf.wtf" label="1" >委托方</el-checkbox>
        <el-checkbox v-model="queryConf.pch" label="2" >批次号</el-checkbox>
        <el-checkbox v-model="queryConf.gaxlh" label="3" >个案序列号</el-checkbox>
        <el-checkbox v-model="queryConf.xcgjrq" label="4" >下次跟进日期</el-checkbox>
        <el-checkbox v-model="queryConf.dq" label="5" >地区</el-checkbox>
        <el-checkbox v-model="queryConf.xm" label="1" >姓名</el-checkbox>
        <el-checkbox v-model="queryConf.zjh" label="2" >证件号</el-checkbox>
        <el-checkbox v-model="queryConf.yqzl" label="3" >逾期账龄</el-checkbox>
        <el-checkbox v-model="queryConf.ajzt" label="4" >案件状态</el-checkbox>
        <el-checkbox v-model="queryConf.cszt" label="5" >催收状态</el-checkbox>
        <el-checkbox v-model="queryConf.ajlx" label="1" >案件类型</el-checkbox>
        <el-checkbox v-model="queryConf.waje" label="2" >委案金额</el-checkbox>
        <el-checkbox v-model="queryConf.bszt" label="4" >标色状态</el-checkbox>
        <el-checkbox v-model="queryConf.kh" label="5" >卡号</el-checkbox>
        <el-checkbox v-model="queryConf.dah" label="1" >档案号</el-checkbox>
        <el-checkbox v-model="queryConf.gjcs" label="2" >跟进次数</el-checkbox>
        <el-checkbox v-model="queryConf.sfxfp" label="3" >是否新分配</el-checkbox>
        <el-checkbox v-model="queryConf.hkqk" label="4" >还款情况</el-checkbox>
        <el-checkbox v-model="queryConf.zdyxx" label="5" >自定义信息</el-checkbox>
        <el-checkbox v-model="queryConf.csfl" label="1" >催收分类</el-checkbox>
        <el-checkbox v-model="queryConf.jmzt" label="2" >减免状态</el-checkbox>
        <el-checkbox v-model="queryConf.bbzt" label="3" >报备状态</el-checkbox>
        <el-checkbox v-model="queryConf.dhhm" label="4" >电话号码</el-checkbox>
        <el-checkbox v-model="queryConf.csjl" label="5" >催收记录</el-checkbox>
        <el-checkbox v-model="queryConf.ajfprq" label="5" >案件分配日期</el-checkbox>
        <el-checkbox v-model="queryConf.yjtarq" label="5" >预计退案日期</el-checkbox>
        <el-checkbox v-model="queryConf.zhgjrq" label="5" >最后跟进日期</el-checkbox>
        <el-checkbox v-model="queryConf.hkrq" label="5" >还款日期</el-checkbox>
        <el-checkbox v-model="queryConf.warq" label="5" >委案日期</el-checkbox>
      </el-row>
      <span slot="footer" class="footer">
        <el-button @click="showQueryConfVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveConf">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      width="400px"
      title="选择部门"
      class="dialog-wrap department-wrap"
      :visible.sync="departmentVisible"
      :close-on-click-modal="false"
      append-to-body
      v-dialogDrag
    >
      <el-tree
        :show-checkbox="true"
        v-if="departmentTree.length>0"
        ref="tree"
        :data="departmentTree"
        node-key="id"
        :expand-on-click-node="false"
        default-expand-all
        class="tree-wrap"
        width="200px"
        :props="defaultProps"
        @check="onSelectDepartment"
        @node-click="dbConfirm"
      >
        <!-- @node-click="onSelectDepartment" -->
        <!-- :default-expanded-keys="[departmentTree[0].id]" -->
          <span
            :class="{active:form.val31 === data.id}"
            class="custom-tree-node"
            slot-scope="{ node, data }"
          >{{data.orgName}}</span>
      </el-tree>
      <span slot="footer" class="footer">
          <el-button @click="departmentVisible=false">取 消</el-button>
          <el-button type="primary" @click="onClickSaveDept">确 定</el-button>
        </span>
    </el-dialog>

    <el-dialog
      title="选择催收员"
      class="dialog-wrap"
      :visible.sync="selectUserVisible3"
      :close-on-click-modal="false"
      width="600px"
      v-dialogDrag
    >
      <el-tree
        :data="selectUserTree"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps">
      </el-tree>
      <span slot="footer" class="footer">
        <el-button @click="selectUserVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="onClickSaveUser3">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import tab2 from "./collect-departmental-statistics";
  import { pageMyCase,getEnum,markColor ,saveSelectFilter,selectByModule,addSynergy,batchNo,addCollectStatus,listOrganization,clientCurrent} from
      "@/common/js/collect-my-case";
  import {role,getUserTree,queryDept,queryOdv} from '@/common/js/collect-departmental-case'
  import {pageSizes} from "@/common/js/const"

  export default {
    components: {
      tab2
    },
    name: "collectMyCase",
    data() {
      return {
        pageSizes,
        deptName:"",
        selectUserVisible3:false,
        selectUserTree:[],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        departmentVisible:false,
        departmentTree: [],
        tableLoad:false,
        paginationData:{
          pageSize:pageSizes[0],
          total:0,
          currentPage:1
        },
        dialogVisible:false,
        textarea3: '',
        synergytype:'',
        addSynergyFormList:[],
        showQueryConfVisible:false,
        tabnum:null,
        queryConf:{},
        queryConfFlag:true,
        activeName: "tab1",
        detailId:-1,
        detailTitle:'',
        detailVisible: false,
        //表格数据
        tableData: [],
        fetchData: {},
        form: {
          odvNameFiter:null,
          val0: [], //委托方
          val1: [], //批次号
          val2: [], //下次跟进日期
          val3: "", //个案序列号
          val4: [], //地区
          val5: "", //姓名
          val6: "", //证件号
          val7: [], //委案日期
          val8: [], //逾期账龄
          val9: [1], //案件状态
          val10: [], //催收状态
          val11: [], //案件类型
          val12: [], //还款日期
          val13: "", //委案金额上限
          val14: [], //标色状态
          val15: "", //卡号
          val16: "", //档案号
          val17: [], //最后跟进日期
          val18: "", //跟进次数上限
          val19: "", //是否新分配
          val20: "", //还款情况
          val21: [], //预计退案日期
          val22: "", //自定义信息
          val23: "", //催收分类
          val24: [], //减免状态
          val25: [], //报备状态
          val27: "", //电话号码
          val28: "", //催收记录
          val29: "", //委案金额下限
          overdueDaysStart:"",
          overdueDaysEnd:"",
          val30: "", //跟进次数下限
          val31: [], //部门
          val32: [], //催收员
          val33: "", //案件分配
        },
        val0_data: [],  //委托方
        val1_data: [],  //批次号
        batchList2:[],
        val4_data: [],  //地区
        val8_data: [],  //逾期账龄
        // 未退案0/正常1/暂停2/关档3/退档4/全部5
        val9_data: [
          { label: "全部", value: 5 },
          { label: "未退案", value: 0 },
          { label: "正常", value: 1 },
          { label: "暂停", value: 2 },
          { label: "关档", value: 3 },
          { label: "退档", value: 4 }
        ],
        val10_data: [],  //催收状态
        collectStatusList2:[],
        val11_data: [],  //案件类型
        val14_data: [
          {
            label:'正常',
            value:'BLACK'
          },
          {
            label:'红色',
            value:'RED'
          },
          {
            label:'蓝色',
            value:'BLUE'
          }/*,
          {
            label:'橙色',
            value:'橙'
          },
          {
            label:'紫色',
            value:'紫'
          },
          {
            label:'棕色',
            value:'棕'
          },*/
        ],   //标色状态
        val19_data: [{ label: "是", value: 1 }, { label: "否", value: 0 }],
        val20_data: [
          {
            label:'已结清',
            value:1
          },
          {
            label:'未结清',
            value:0
          }
        ], //还款状况
        val24_data: [],  //减免状态
        val25_data: [],  //报备状态
        val31_data: [],  //部门
        val32_data: [],  //催收员
        tableCol_data: [
          {
            'min-width':140,
            prop: "odv",
            label: "催收员"
          },
          {
            'min-width':100,
            prop: "collectStatusMsg",
            label: "催收状态"
          },
          {
            'min-width':120,
            prop: "caseDate",
            label: "委案日期"
          },
          {
            'min-width':120,
            prop: "name",
            label: "姓名"
          },
          {
            'min-width':180,
            prop: "cardNo",
            label: "卡号"
          },
          {
            'min-width':180,
            prop: "identNo",
            label: "身份证"
          },
          {
            'min-width': 120,
            prop: "moneyMsg",
            label: "委案金额"
          },
          {
            'min-width': 120,
            prop: "principle",
            label: "本金"
          },
          {
            'min-width': 120,
            prop: "moneyStartMsg",
            label: "最新欠款"
          },
          {
            'min-width': 120,
            prop: "enRepayAmtMsg",
            label: "已还款金额"
          },
          {
            'min-width': 140,
            prop: "repayAmtMsg",
            label: "承诺还款金额"
          },
          {
            'min-width': 120,
            prop: "overdueDays",
            label: "逾期天数"
          },
          {
            'min-width': 180,
            prop: "lastFollowTime",
            label: "上次跟进时间"
          },
          {
            'min-width': 120,
            prop: "leaveDays",
            label: "闲置天数"
          },
          {
            'min-width': 180,
            prop: "expectTime",
            label: "预计退案日期"
          },
          {
            'min-width': 120,
            prop: "collectInfo",
            label: "催收小结"
          }
        ],
        multipleSelection: [],
        sort:{
          orderBy: 'id',
          sort:'desc'
        },
        pageLoading:false,
        selectDataArr:[],
        t1:[]
      };
    },
    computed: {
      realFetchFormData() {
        let {
          val0: clients,
          val1: batchNos,
          val2,
          val3,
          val4: areas,
          val5,
          val6,
          val7,
          val8: accountAges,
          val9: statuss,
          val10: collectStatuss,
          val11: caseTypes,
          val12,
          val13: moneyStart,
          val29: moneyEnd,
          overdueDaysStart:overdueDaysStart,
          overdueDaysEnd:overdueDaysEnd,
          val14: colors,
          val15,
          val16,
          val17,
          val18:countFollowStart,
          val30:countFollowEnd,
          val19: newCase,
          val20: repayStatus,
          val21,
          val22: remark,
          val23: collectionType,
          val24: reliefStatuss,
          val25: reportStatuss,
          val27: telPhone,
          val28: collectMeasure,
          val31:depts,
          val32:odvs,
          val33
        } = this.form;
        return {
          clients,
          batchNos,
          seqno:val3==null?"":val3.replace(/[\n\r\v\s↵]/g,","),
          nextFollDateStart: (!!val2 && val2[0])||'' ,
          nextFollDateEnd: (!!val2 && val2[1])||'',
          caseDateStart: (!!val7 && val7[0])||'' ,
          caseDateEnd: (!!val7 && val7[1])||'',
          areas,
          name:val5==null?"":val5.replace(/[\n\r\v\s↵]/g,","),
          identNo:val6==null?"":val6.replace(/[\n\r\v\s↵]/g,","),
          accountAges,
          statuss,
          collectStatuss,
          caseTypes,
          repayStatus,
          repayTimeStart: (!!val12 && val12[0])||'',
          repayTimeEnd: (!!val12 && val12[1])||'',
          moneyStart,
          moneyEnd,
          overdueDaysStart,
          overdueDaysEnd,
          colors,
          cardNo:val15==null?"":val15.replace(/[\n\r\v\s↵]/g,","),
          archiveNo:val16==null?"":val16.replace(/[\n\r\v\s↵]/g,","),
          lastFollDateStart: (!!val17&&val17[0])||'',
          lastFollDateEnd: (!!val17&&val17[1])||'',
          countFollowStart,
          countFollowEnd,
          newCase,
          expectTimeStart: (!!val21&&val21[0])||'',
          expectTimeEnd: (!!val21&&val21[1])||'',
          caseAllotTimeStart: (!!val33 && val33[0]) || "",
          caseAllotTimeEnd: (!!val33 && val33[1]) || "",
          remark,
          collectionType,
          reliefStatuss,
          reportStatuss,
          telPhone,
          collectMeasure,
          pageNum: this.paginationData.currentPage,
          pageSize: this.paginationData.pageSize,
          depts,
          odvs,
          sType:1,
          orderBy: this.sort.orderBy,
          sort: this.sort.sort,
        };
      }
    },
    watch: {
      activeName(v){
        if (v=="tab2"){
          this.tabnum=true;
        }else{
          this.tabnum = null;
        }
      }
    },
    created(){
      this.queryConfList();
      this.init();
      listOrganization().then((data)=>{
        this.departmentTree = data;
      });
      batchNo().then((data)=>{
        this.val1_data = data.reduce((acc,item)=>{
          acc.push({
            id:item.id,
            label:item.batchNo,
            value:item.batchNo
          })
          return acc;
        },[]);
        this.batchList2 =  data.reduce((acc,item)=>{
          acc.push({
            id:item.id,
            label:item.batchNo,
            value:item.batchNo
          })
          return acc;
        },[]);
      });
    },
    methods: {
      clientCurrent(){
        if (this.form.val0==null || this.form.val0.length==0){
          this.$set(this.form, 'val1', [])
          this.val1_data = this.batchList2
        }else{
          clientCurrent(this.form.val0).then((response) => {
            if (response==null){
              this.val1_data = [];
            }else{
              this.$set(this.form, 'val1', [])
              this.val1_data = response.reduce((acc,item)=>{
                acc.push({
                  value:item.batchNo
                })
                return acc;
              },[]);
            }
          })
        }
      },
      onClickSelectUser3(){
        if (this.selectUserVisible3){
          return;
        }
        this.selectUserTree = []
        getUserTree({"odv":this.form.odvNameFiter}).then((data)=>{
          this.selectUserTree = [data];
          this.selectUserVisible3 = true
        });
      },
      onClickSaveUser3() {
        let selectDataArr = this.$refs.tree.getCheckedNodes()
        let selectUserNames = []
        let selectUserIds = []
        if (selectDataArr.length > 0) {
          selectUserNames = selectDataArr.filter((item) => {
            return item.type === 'user'
          }).map((item) => {
            return item.name
          })
          selectUserIds = selectDataArr.filter((item) => {
            return item.type === 'user'
          }).map((item) => {
            return item.id
          })
        }
        this.$set(this.form, 'odvNameFiter', selectUserNames.join(','))
        this.$set(this.form, 'val32', selectUserIds)
        this.selectUserVisible3 = false
      },
      onClickSelectUser() {
        this.departmentVisible = true
      },
      onSelectDepartment (data, node) {
       this.selectDataArr = this.$refs.tree.getCheckedNodes()
      },
      onClickSaveDept () {
        if (this.selectDataArr.length == 0){
          return
        }
        const checkedNodesIds = this.selectDataArr.map((item) => item.id)
        const nodes = this.selectDataArr.filter(x => !checkedNodesIds.includes(x.parent.id))
        const nodesIds = nodes.map(item => item.id)
        const nodesNames = nodes.map(item => item.orgName)
        this.$set(this, 'deptName', nodesNames.join(','))
        this.$set(this.form, 'val31', nodesIds)
        this.departmentVisible = false
      },
      saveConf(){
        this.showQueryConfVisible = false;
        let queryObj = {module:"data-memorize-manage",menu:this.queryConf}
        saveSelectFilter(queryObj).then(data => {
          this.$message({
            message: "配置成功",
            type: "success"
          });
          this.queryConfList();
        });
      },
      queryConfList(){
        let queryObj = {module:"data-memorize-manage",menu:this.queryConf}
        selectByModule(queryObj).then(data => {
          if (data){
            this.queryConf = JSON.parse(data.menu);
            this.queryConfFlag = false;
          }else{
            this.queryConfFlag = true;
          }
        });
      },
      showQueryConf(){
        this.showQueryConfVisible = true;
      },
      showCase(row) {
        window.open(`#/zhx/case-detail?id=${row.id}&type=2`)
        // let id = row.id
        // let name = row.name
        // let seqNo = row.seqno
        // this.$router.push({
        //   path:'case-detail',
        //   query:{
        //     id,
        //     name,
        //     mycase:true,
        //     showNext:true,
        //     deptCase:true,
        //     seqNo
        //   }
        // })
      },
      formatMoney(value,places, symbol, thousand, decimal) {
        var placesTemp = 0 ;
        value = parseFloat(value).toString();
        if (value.indexOf(".")>=0){
          placesTemp = value.length - value.indexOf(".") -1;
        }
        places = placesTemp
        places = !isNaN(places = Math.abs(places)) ? places : 2;
        symbol = symbol !== undefined ? symbol : "¥";
        thousand = thousand || ",";
        decimal = decimal || ".";
        var number = value,
          negative = number < 0 ? "-" : "",
          i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
          j = (j = i.length) > 3 ? j % 3 : 0;
        return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
      },
      sortHandle({prop,order}){
        this.sort.sort = order.replace('ending', '');
        this.sort.orderBy = prop;
        this.getMainData();
      },
      //查询批次号
      querySearch(queryString){
        batchNo({batchNo:queryString}).then((data)=>{
          this.val1_data = data.reduce((acc,item)=>{
            acc.push({
              id:item.id,
              label:item.batchNo,
              value:item.batchNo
            })
            return acc;
          },[]);
        });
      },
      handleCurrentChange(currentPage){
        this.paginationData.currentPage = currentPage;
        this.getMainData();
      },
      handleSizeChange(pageSize){
        this.paginationData.pageSize = pageSize;
        this.getMainData();
      },
      //查询按钮
      searchHandle() {
        if (this.form.odvNameFiter==null || this.form.odvNameFiter==""){
          this.$set(this.form, 'val32', [])
        }
        this.paginationData.currentPage=1
        this.getMainData();
      },
      rowColor({row}){
        if (row.caseStatus==3){
          return `color_3`;
        }else if(row.caseStatus==4){
          return `color_4`;
        }else{
          return `color_${row.color}`;
        }
      },
      modStatusHandle(id){
        if(this.multipleSelection.length===0){
          this.$message.error('请选择数据!')
        }else{
          this.pageLoading=true
          let data = this.multipleSelection.reduce((acc,item)=>{
            acc.push({
              id:item.id,
              collectStatus:id
            })
            return acc;
          },[]);
          addCollectStatus(data).then(()=>{
            this.$message.success('操作成功!')
            this.getMainData();
            this.pageLoading=false
          });
        }
      },
      colorHandle(color){
        if(this.multipleSelection.length===0){
          this.$message.error('请选择数据!')
        }else{
          this.pageLoading=true
          let data = this.multipleSelection.reduce((acc,item)=>{
            acc.push({
              id:item.id,
              color
            })
            return acc;
          },[]);
          markColor(data).then((data)=>{
            this.$message.success('操作成功!')
            this.getMainData();
            this.pageLoading=false
          });
        }
      },
      applyUrge(){
        if (this.multipleSelection.length >= 1) {
          this.dialogVisible = true
        } else {
          this.$message.error('请选择数据!');
        }
      },
      //申请协催
      xcHandle(){
        if(this.multipleSelection.length==0){
          return;
        }
        let data = this.multipleSelection.reduce((acc,item)=>{
          acc.push({
            id:item.id,
            synergyType:this.synergytype,
            synergyContext:this.textarea3
          })
          return acc;
        },[]);

        addSynergy(data).then(()=>{
          this.$message({
            message: '提交成功',
            type: 'success'
          });
        });
      },
      getMainData(){
        this.fetchData={}
        this.tableLoad = true
        if (this.deptName==null || this.deptName==""){
          this.form.val31 = '';
        }
        pageMyCase(this.realFetchFormData).then((data)=>{
          if(!data){
            data = {total:0,list:[]}
          }
          localStorage.setItem(
            "dept",
            JSON.stringify(data.list)
          )
          this.fetchData = data;
          this.paginationData.total = data.countCase;
          this.tableData = data.list.map((item)=>{
            return Object.assign(item, {'class-name': `color_${item.color}`});
          })
          this.tableLoad = false
        });
      },
      resetForm(formName) {
        //this.$refs[formName].resetFields();
        this.form = {
          odvNameFiter:null,
          deptFiter:'',
          val0: [], //委托方
          val1: [], //批次号
          val2: [], //下次跟进日期
          val3: "", //个案序列号
          val4: [], //地区
          val5: "", //姓名
          val6: "", //证件号
          val7: [], //委案日期
          val8: [], //逾期账龄
          val9: [1], //案件状态
          val10: [], //催收状态
          val11: [], //案件类型
          val12: [], //还款日期
          val13: "", //委案金额上限
          val14: [], //标色状态
          val15: "", //卡号
          val16: "", //档案号
          val17: [], //最后跟进日期
          val18: "", //跟进次数上限
          val19: "", //是否新分配
          val20: "", //还款情况
          val21: [], //预计退案日期
          val22: "", //自定义信息
          val23: "", //催收分类
          val24: [], //减免状态
          val25: [], //报备状态
          val27: "", //电话号码
          val28: "", //催收记录
          val29: "", //委案金额下限
          val30: "", //跟进次数下限
          val31: "", //部门
          val32: [], //催收员
          val33: "", //案件分配
        }
        this.deptName = ""
        this.$set(this.form, 'val32', [])
        this.getMainData();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      transform(data,obj=[['name','label'],['id','value']]){
        return data.reduce((acc, item) => {
          for (let [key, tarKey] of obj) {
            item[tarKey] = item[key];
          }
          acc.push(item);
          return acc;
        }, []);
      },
      getEnumHandle(name,target,transData){
        getEnum({name}).then((data)=>{
          this[target] = this.transform(data,transData);
        });
      },
      init(){
        this.getMainData();
        /* this.getEnumHandle('委托方', 'val0_data');
         this.getEnumHandle('地区', 'val4_data');
         this.getEnumHandle('逾期账龄', 'val8_data');
         this.getEnumHandle('催收状态', 'val10_data');
         this.getEnumHandle('案件类型', 'val11_data');
         this.getEnumHandle('减免状态', 'val24_data');
         this.getEnumHandle('报备状态', 'val25_data');*/

        listOrganization().then((data)=>{
          this.val31_data = this.transform(data,[['orgName','label'],['id','value']]);
        });
        role({role:'催收员'}).then((data)=>{
          this.val32_data = this.transform(data,[['userName','label'],['id','value']]);
        })
        getUserTree().then(data => {
          this.selectUserTree = [data]
        })
      },
      showDeptName(deptName,callback){
        queryDept({deptName}).then(data => callback(data)).catch(() => {})
      },
      showOdvName(odvName,callback){
        queryOdv({odvName}).then(data => callback(data)).catch(() => {})
      },
      selectDept(dept){
        this.deptName = dept.value
        this.$set(this.form, 'val31', [dept.id])
      },
      onClickSelectDept() {
        if (this.departmentVisible){
          return;
        }
        this.departmentTree = []
        listOrganization({"orgName":this.form.deptFiter}).then((data)=>{
          this.departmentTree = data;
          this.departmentVisible = true
        });
      },
      selectOdv(odv){
        this.$set(this.form, 'odvNameFiter', odv.value)
        this.$set(this.form, 'val32', [odv.id])
      },
      selectMethod(param){
        this._selectAllInit('queryConf');
        Object.keys(this.queryConf).map(x=>this.queryConf[x]=param)
      }, 
      dbConfirm(data,node){
        this.selectDataArr = this.$refs.tree.getCurrentNode()
        this.t1.push( new Date().getTime())
        if(this.t1.length==2){
          let val=this.t1[1]-this.t1[0]
          this.t1=[]
          if(val<500){
            this.onClickSaveDept2()
          }
        }             
      },
      onClickSaveDept2(){
        if (this.selectDataArr.length == 0){
          return
        }
        const nodesId=[]
        nodesId.push(this.selectDataArr.id)
        const nodesName  =this.selectDataArr.orgName
        this.$set(this, 'deptName', nodesName)
        this.$set(this.form, 'val31', nodesId)
        this.departmentVisible = false       
      }
    },
    mounted(){
      this["val0_data"] = this.transform(this.$store.getters.caseType.委托方);
      this["val4_data"] = this.transform(this.$store.getters.caseType.地区);
      this["val8_data"] = this.transform(this.$store.getters.caseType.逾期账龄);
      this["val10_data"] = this.transform(this.$store.getters.caseType.催收状态);
      this.collectStatusList2 = this.$store.getters.caseType.催收状态.slice(0);
      this.collectStatusList2.shift();
      this["val11_data"] = this.transform(this.$store.getters.caseType.案件类型);
      this["val24_data"] = this.transform(this.$store.getters.caseType.减免状态);
      this["val25_data"] = this.transform(this.$store.getters.caseType.报备状态);
      this.addSynergyFormList = this.$store.getters.caseType.协催类型;
    }
  };
</script>

<style lang="scss" >
  .color_gray {
    color: #b2adb2;
  }
  .color_BLACK {
    color: #000000;
  }
  .color_RED {
    color: #FF0000;
  }
  .color_BLUE {
    color: #0000FF;
  }
  .color_ORANGE {
    color: #FA8072;
  }
  .color_ZI {
    color: #A020F0;
  }
  .color_ZONG{
    color: #D2B48C;
  }
  .myCase-pop{
    .el-form-item--mini{
      display: inline-block;
    }
  }
  .color_3 {
    color: #999999;
  }
  .color_4 {
    text-decoration:line-through;
    color: #999999;
  }
  .el-table--border {
    flex:none;
  }

  #collect-departmental-case {
    min-width: 2630px !important;

    .tab2{
      .el-table .el-table__body-wrapper{
        overflow-x: auto;
      }
    }
    .el-table th>.cell{
      white-space: nowrap;
    }
    .pad{
      .el-checkbox{
        width:24%;
        margin-right: 0px;
      }
    }
    .selectAllBtn{
      margin-bottom: 10px;
    }
    .textColor{
      color: #5175fa;
    }
  }
</style>
