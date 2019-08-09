<template>
  <div id="collect-my-case" class="page-wraper-sub" v-loading="pageLoading" element-loading-text="拼命加载中">
    <el-tabs v-model="activeName" :class="{tab2:tabnum}" class="tabs-wrap">
      <el-tab-pane label="我的案件" style="height: 100%" name="tab1">
        <el-dialog
          :title="detailTitle"
          class="dialog-wrap"
          :visible.sync="detailVisible"
          :close-on-click-modal="false"
          width="90%"
        >
          <case-detail :id="detailId" ref="detail"></case-detail>
        </el-dialog>
        <el-dialog title="申请协催" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
          <el-input
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 14 }"
            placeholder="请输入内容"
            v-model="textarea3"
          ></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="
                dialogVisible = false;
                xcHandle();
              "
              >确 定</el-button
            >
          </span>
        </el-dialog>
        <el-row :gutter="24">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form
                :inline="true"
                ref="form"
                :model="form"
                label-width="80px"
                class="queryStyle"
              >
                <el-form-item prop="val0" v-if="queryConf.wtf || queryConfFlag">
                  <el-select
                    v-model="form.val0"
                    placeholder="请选择委托方"
                    collapse-tags
                    multiple
                    clearable
                  >
                    <el-option
                      v-for="item in val0_data"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="val1" v-if="queryConf.pch || queryConfFlag">
                  <el-select
                    v-model="form.val1"
                    multiple
                    collapse-tags
                    filterable
                    remote
                    placeholder="请输入批次号"
                    :remote-method="querySearch"
                  >
                    <el-option
                      v-for="item in val1_data"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="val3" v-if="queryConf.gaxlh || queryConfFlag">
                  <el-input
                    type="textarea"
                    rows="3"
                    style="width: 100%;"
                    v-model="form.val3"
                    placeholder="请输入个案序列号"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item prop="val2" v-if="queryConf.xcgjrq || queryConfFlag">
                  <el-date-picker
                    v-model="form.val2"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="下次跟进日期开始"
                    end-placeholder="下次跟进日期结束"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item prop="val4" v-if="queryConf.dq || queryConfFlag">
                 <!-- <el-cascader
                    :options="val4_data"
                    clearable
                    placeholder="请选择地区"
                    v-model="form.val4"
                  ></el-cascader>-->
                  <el-select
                    v-model="form.val4"
                    placeholder="请选择地区"
                    clearable
                  >
                    <el-option
                      v-for="item in val4_data"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="val5" v-if="queryConf.xm || queryConfFlag">
                  <el-input
                    type="textarea"
                    rows="3"
                    style="width: 100%;"
                    v-model="form.val5"
                    placeholder="请输入姓名"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item prop="val6" v-if="queryConf.zjh || queryConfFlag">
                  <el-input
                    type="textarea"
                    rows="3"
                    style="width: 100%;"
                    v-model="form.val6"
                    placeholder="请输入证件号"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item prop="val8" v-if="queryConf.yqzl || queryConfFlag">
                  <el-select
                    v-model="form.val8"
                    placeholder="请选择逾期账龄"
                    collapse-tags
                    multiple
                    clearable
                  >
                    <el-option
                      v-for="item in val8_data"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="val9" v-if="queryConf.ajzt || queryConfFlag">
                  <el-select
                    v-model="form.val9"
                    placeholder="请选择案件状态"
                    collapse-tags
                    multiple
                    clearable
                  >
                    <el-option
                      v-for="item in val9_data"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="val10" v-if="queryConf.cszt || queryConfFlag">
                  <el-select
                    v-model="form.val10"
                    placeholder="请选择催收状态"
                    collapse-tags
                    multiple
                    clearable
                  >
                    <el-option
                      v-for="item in val10_data"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="val11" v-if="queryConf.ajlx || queryConfFlag">
                  <el-select
                    v-model="form.val11"
                    placeholder="请选择案件类型"
                    collapse-tags
                    multiple
                    clearable
                  >
                    <el-option
                      v-for="item in val11_data"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item prop="val29" v-if="queryConf.waje || queryConfFlag">
                  <el-input
                    v-model="form.val29"
                    type="number"
                    placeholder="请输入委案金额下限"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item prop="val13" v-if="queryConf.waje || queryConfFlag">
                  <el-input
                    v-model="form.val13"
                    type="number"
                    placeholder="请输入委案金额上限"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item prop="val14" v-if="queryConf.bszt || queryConfFlag">
                  <el-select
                    v-model="form.val14"
                    placeholder="请选择标色状态"
                    collapse-tags
                    multiple
                    clearable
                  >
                    <el-option
                      v-for="item in val14_data"
                      :key="item.label"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="val15" v-if="queryConf.kh || queryConfFlag">
                  <el-input
                    type="textarea"
                    rows="3"
                    style="width: 100%;"
                    v-model="form.val15"
                    placeholder="请输入卡号"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item prop="val16" v-if="queryConf.dah || queryConfFlag">
                  <el-input
                    type="textarea"
                    rows="3"
                    style="width: 100%;"
                    v-model="form.val16"
                    placeholder="请输入档案号"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item prop="val30" v-if="queryConf.gjcs || queryConfFlag">
                  <el-input
                    v-model="form.val30"
                    type="number"
                    placeholder="请输入跟进次数下限"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item prop="val18" v-if="queryConf.gjcs || queryConfFlag">
                  <el-input
                    v-model="form.val18"
                    type="number"
                    placeholder="请输入跟进次数上限"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item prop="val19" v-if="queryConf.sfxfp || queryConfFlag">
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
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="val20" v-if="queryConf.hkqk || queryConfFlag">
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
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item prop="val22" v-if="queryConf.zdyxx || queryConfFlag">
                  <el-input
                    v-model="form.val22"
                    placeholder="请输入自定义信息"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item prop="val23" v-if="queryConf.csfl || queryConfFlag">
                  <el-input
                    v-model="form.val23"
                    placeholder="请输入催收分类"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item prop="val24" v-if="queryConf.jmzt || queryConfFlag">
                  <el-select
                    v-model="form.val24"
                    placeholder="请选择减免状态"
                    collapse-tags
                    multiple
                    clearable
                  >
                    <el-option
                      v-for="item in val24_data"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="val25" v-if="queryConf.bbzt || queryConfFlag">
                  <el-select
                    v-model="form.val25"
                    placeholder="请选择报备状态"
                    collapse-tags
                    multiple
                    clearable
                  >
                    <el-option
                      v-for="item in val25_data"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="val27" v-if="queryConf.dhhm || queryConfFlag">
                  <el-input
                    v-model="form.val27"
                    placeholder="请输入电话号码"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item prop="val28" v-if="queryConf.csjl || queryConfFlag">
                  <el-input
                    v-model="form.val28"
                    placeholder="请输入催收记录"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item prop="val31" v-if="queryConf.ajfprq || queryConfFlag">
                  <el-date-picker
                    v-model="form.val31"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="案件分配日期开始"
                    end-placeholder="案件分配日期结束"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item prop="val21" v-if="queryConf.yjtarq || queryConfFlag">
                  <el-date-picker
                    v-model="form.val21"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="预计退案日期开始"
                    end-placeholder="预计退案日期结束"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item prop="val17" v-if="queryConf.yjtarq || queryConfFlag">
                  <el-date-picker
                    v-model="form.val17"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="最后跟进日期开始"
                    end-placeholder="最后跟进日期结束"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item prop="val12" v-if="queryConf.hkrq || queryConfFlag">
                  <el-date-picker
                    v-model="form.val12"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="还款日期开始"
                    end-placeholder="还款日期结束"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item prop="val7" v-if="queryConf.warq || queryConfFlag">
                  <el-date-picker
                    v-model="form.val7"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="委案日期开始"
                    end-placeholder="委案日期结束"
                  ></el-date-picker>
                </el-form-item>
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
                  <el-dropdown
                    @command="colorHandle"
                    v-has="'案件标色'"
                    v-dropdown-patch
                  >
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
                  <el-dropdown
                    @command="modStatusHandle"
                    v-has="'修改催收状态'"
                    v-dropdown-patch
                  >
                    <el-button type="primary">修改催收状态<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        :command="item.id"
                        v-for="(item, i) in collectStatusList2"
                        :key="i"
                        >{{ item.name }}</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-form-item>
                <el-form-item>
                  <el-button
                    @click="applyUrge"
                    type="primary"
                    v-has="'申请协催'"
                    >申请协催</el-button
                  >
                </el-form-item>
                </el-row>
              </el-form>
            </div>
          </el-col>
          <el-col :span="22">
            <div class="grid-content bg-purple">
              <el-form :inline="true">
                <el-form-item style="margin-right:0px;">
                  <span
                    class="color_gray"
                    style="display: inline-block; color: black;font-size: 16px;"
                    >查询结果统计：</span
                  >
                </el-form-item>
                <el-form-item style="margin-right:0px;">
                  <span
                    class="color_gray"
                    style="display: inline-block; color: #66b1ff;font-size: 16px;"
                    >列表案量：</span
                  >
                  <span
                    style="display: inline-block; color: #66b1ff;font-size: 16px;"
                    >{{ fetchData.countCase }}件，</span
                  >
                </el-form-item>
                <el-form-item style="margin-right:0px;">
                  <span
                    class="color_gray"
                    style="display: inline-block; color: #66b1ff;font-size: 16px;"
                    >列表金额：</span
                  >
                  <span
                    style="display: inline-block; color: #66b1ff;font-size: 16px;"
                    >{{ fetchData.sumMoneyMsg }}，</span
                  >
                </el-form-item>
                <el-form-item style="margin-right:0px;">
                  <span
                    class="color_gray"
                    style="display: inline-block; color: #66b1ff;font-size: 16px;"
                    >列表还款案量：</span
                  >
                  <span
                    style="display: inline-block; color: #66b1ff;font-size: 16px;"
                    >{{ fetchData.countCasePay }}件，</span
                  >
                </el-form-item>
                <el-form-item style="margin-right:0px;">
                  <span
                    class="color_gray"
                    style="display: inline-block; color: #66b1ff;font-size: 16px;"
                    >列表还款金额：</span
                  >
                  <span
                    style="display: inline-block; color: #66b1ff;font-size: 16px;"
                    >{{ fetchData.sumPayMoneyMsg }}，</span
                  >
                </el-form-item>
                <el-form-item style="margin-right:0px;">
                  <span
                    class="color_gray"
                    style="display: inline-block; color: #66b1ff;font-size: 16px;"
                    >列表提成金额：</span
                  >
                  <span
                    style="display: inline-block; color: #66b1ff;font-size: 16px;"
                    >{{ fetchData.sumRepayMsg }}，</span
                  >
                </el-form-item>
                <el-form-item style="margin-right:0px;">
                  <span
                    class="color_gray"
                    style="display: inline-block; color: #66b1ff;font-size: 16px;"
                    >列表待银行查账金额：</span
                  >
                  <span
                    style="display: inline-block; color: #66b1ff;font-size: 16px;"
                    >{{ fetchData.sumBankMsg }}</span
                  >
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
         <el-table highlight-current-row v-loading="tableLoad"
          ref="multipleTable"
          :data="tableData"
          border
          stripe
          style="width: 100%;"
          class="table-wrap"
          height="1"
          :row-class-name="rowColor"
          :cell-style="{ whiteSpace: 'nowrap' }"
          @row-dblclick="showDetail"
          @selection-change="handleSelectionChange"
          @sort-change="sortHandle"
        >
          <el-table-column type="selection" min-width="5"></el-table-column>
          <el-table-column
            label="个案序列号"
            prop="seqno"
            show-overflow-tooltip
            sortable="custom"
            width="180"
            :sort-orders="['ascending', 'descending']"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">

              <el-button v-if="scope.row.caseStatus==3" type="text" style ="color:#999999;" size="small"  @click="showCase(scope.row.id, scope.row.name, scope.row.seqno)">
                {{scope.row.seqno}}
              </el-button>
              <el-button v-if="scope.row.caseStatus==4" type="text" style ="color:#999999;text-decoration:line-through;" size="small"  @click="showCase(scope.row.id, scope.row.name, scope.row.seqno)">
                {{scope.row.seqno}}
              </el-button>
              <el-button v-if="scope.row.caseStatus!=3 && scope.row.caseStatus!=4" type="text" size="small" @click="showCase(scope.row.id, scope.row.name, scope.row.seqno)">
                {{scope.row.seqno}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            v-for="(item, index) in tableCol_data"
            :key="index"
            v-bind="item"
            min-width="5"
            show-overflow-tooltip
            sortable="custom"
            :sort-orders="['ascending', 'descending']"
            header-align="center"
            align="center"
          ></el-table-column>

        </el-table>
        <el-pagination
          class="pagination-wrap"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="paginationData.currentPage"
          :page-sizes="[100, 500, 2000, 10000, 1000000]"
          :page-size="paginationData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="paginationData.total"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="催收状况统计" name="tab2">
        <tab2></tab2>
      </el-tab-pane>
      <el-tab-pane label="我的还款统计" name="tab3">
        <tab3></tab3>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      title="查询条件配置"
      :visible.sync="showQueryConfVisible"
      width="60%"
      center
      :close-on-click-modal="false"
    >
      <el-row class="pad">

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
  </div>
</template>

<script>
import tab2 from "./collect-status-statistics";
import tab3 from "./collect-repayment-statistics";
import {
  pageMyCase,
  saveSelectFilter,
  selectByModule,
  getEnum,
  markColor,
  addSynergy,
  batchNo,
  addCollectStatus
} from "@/common/js/collect-my-case";
//import CaseDetail from "@/views/data-manage/detail";
const CaseDetail = () => import("@/views/data-manage/detail");
export default {
  components: {
    tab2,
    tab3,
    CaseDetail
  },
  name: "collectMyCase",
  data() {
    return {
      tabnum:null,
      tableLoad: false,
      paginationData: {
        pageSize: 100,
        total: 0,
        currentPage: 1
      },
      dialogVisible: false,
      textarea3: "",
      activeName: "tab1",
      //表格数据
      tableData: [],
      showQueryConfVisible:false,
      queryConf:{},
      queryConfFlag:true,
      fetchData: {},
      form: {
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
        val31: "" //案件分配
      },
      val0_data: [], //委托方
      val1_data: [], //批次号
      val4_data: [], //地区
      val8_data: [], //逾期账龄
      // 未退案0/正常1/暂停2/关档3/退档4/全部5
      val9_data: [
        { label: "全部", value: 5 },
        { label: "未退案", value: 0 },
        { label: "正常", value: 1 },
        { label: "暂停", value: 2 },
        { label: "关档", value: 3 },
        { label: "退档", value: 4 }
      ],
      val10_data: [], //催收状态
      collectStatusList2:[],
      val11_data: [], //案件类型
      val14_data: [
        {
          label: "黑色",
          value: "BLACK"
        },
        {
          label: "红色",
          value: "RED"
        },
        {
          label: "蓝色",
          value: "BLUE"
        }/*,
        {
          label: "橙色",
          value: "橙"
        },
        {
          label: "紫色",
          value: "紫"
        },
        {
          label: "棕色",
          value: "棕"
        }*/
      ], //标色状态
      val19_data: [{ label: "是", value: 1 }, { label: "否", value: 0 }],
      val20_data: [
        {
          label: "已结清",
          value: 1
        },
        {
          label: "未结清",
          value: 0
        }
      ], //还款状况
      val24_data: [], //减免状态
      val25_data: [], //报备状态
      tableCol_data: [
        {
          width:120,
          prop: "collectStatusMsg",
          label: "催收状态"
        },
        {
          width:140,
          prop: "caseDate",
          label: "委案日期"
        },
        {
          width:120,
          prop: "name",
          label: "姓名"
        },
        {
          width:180,
          prop: "cardNo",
          label: "卡号"
        },
        {
          width:180,
          prop: "identNo",
          label: "身份证"
        },
        {
          prop: "moneyMsg",
          width: 140,
          label: "委案金额"
        },
        {
          width: 140,
          prop: "principle",
          label: "本金"
        },
        {
          width: 140,
          prop: "moneyStartMsg",
          label: "最新欠款"
        },
        {
          width: 140,
          prop: "enRepayAmtMsg",
          label: "已还款金额"
        },
        {
          width: 140,
          prop: "repayAmtMsg",
          label: "承诺还款金额"
        },
        {
          width: 120,
          prop: "overdueDays",
          label: "逾期天数"
        },
        {
          width: 120,
          prop: "leaveDays",
          label: "闲置天数"
        },
        {
          width: 140,
          prop: "expectTime",
          label: "预计退案日期"
        },
        {
          width: 180,
          prop: "collectInfo",
          label: "催收小结"
        }

      ],
      multipleSelection: [],
      detailVisible: false,
      detailId: -1,
      detailTitle: "案件详情",
      sort: {
        orderBy: "id",
        sort: "desc"
      },
      ops: { scrollParent: "window" },
      deleteList:[],
      pageLoading:false
    };
  },
  computed: {
    realFetchFormData() {
      let {
        val0: clients,
        val1: batchNos,
        val2,
        val3,
        val4: area,
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
        val14: colors,
        val15,
        val16,
        val17,
        val18: countFollowStart,
        val30: countFollowEnd,
        val19: newCase,
        val20: repayStatus,
        val21,
        val22: remark,
        val23: collectionType,
        val24: reliefStatuss,
        val25: reportStatuss,
        val27: telPhone,
        val28: collectMeasure,
        val31
      } = this.form;
      return {
        clients,
        batchNos,
        seqno:val3==null?"":val3.replace(/[\n\r\v\s↵]/g,","),
        caseDateStart: (!!val7 && val7[0]) || "",
        caseDateEnd: (!!val7 && val7[1]) || "",
        nextFollDateStart: (!!val2 && val2[0]) || "",
        nextFollDateEnd: (!!val2 && val2[1]) || "",
        area: area + "" ? area : null,
        name:val5==null?"":val5.replace(/[\n\r\v\s↵]/g,","),
        identNo:val6==null?"":val6.replace(/[\n\r\v\s↵]/g,","),
        accountAges,
        statuss,
        collectStatuss,
        caseTypes,
        repayStatus,
        repayTimeStart: (!!val12 && val12[0]) || "",
        repayTimeEnd: (!!val12 && val12[1]) || "",
        moneyStart,
        moneyEnd,
        colors,
        cardNo:val15==null?"":val15.replace(/[\n\r\v\s↵]/g,","),
        archiveNo:val16==null?"":val16.replace(/[\n\r\v\s↵]/g,","),
        lastFollDateStart: (!!val17 && val17[0]) || "",
        lastFollDateEnd: (!!val17 && val17[1]) || "",
        countFollowStart,
        countFollowEnd,
        newCase,
        expectTimeStart: (!!val21 && val21[0]) || "",
        expectTimeEnd: (!!val21 && val21[1]) || "",
        caseAllotTimeStart: (!!val31 && val31[0]) || "",
        caseAllotTimeEnd: (!!val31 && val31[1]) || "",
        remark,
        collectionType,
        reliefStatuss,
        reportStatuss,
        telPhone,
        collectMeasure,
        pageNum: this.paginationData.currentPage,
        pageSize: this.paginationData.pageSize,
        sType: 0,
        orderBy: this.sort.orderBy,
        sort: this.sort.sort
      };
    }
  },
  watch: {
    form: {
      handler(newObj) {
        console.log(Object.values(newObj));
      },
      deep: true
    },
    activeName(v){
      if (v=="tab2"){
        this.tabnum=true;
      }else if (v=="tab3"){
        this.tabnum=true;
      }else{
        this.tabnum = null;
      }
    }
  },
  created() {
    this.init();
    this.queryConfList();
  },
  methods: {
    saveConf(){
      this.showQueryConfVisible = false;
      let queryObj = {module:"collect-my-case",menu:this.queryConf}
      saveSelectFilter(queryObj).then(data => {
        this.$message({
          message: "配置成功",
          type: "success"
        });
        this.queryConfList();
      });
    },
    queryConfList(){

      let queryObj = {module:"collect-my-case",menu:this.queryConf}
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
    vis(){
      console.log(...arguments)
    },
    sortHandle({ prop, order }) {
      this.sort.sort = order.replace("ending", "");
      this.sort.orderBy = prop;
      this.getMainData();
    },
    //查询批次号
    querySearch(queryString) {
      batchNo({ batchNo: queryString }).then(data => {
        this.val1_data = data.reduce((acc, item) => {
          acc.push({
            value: item.batchNo
          });
          return acc;
        }, []);
      });
    },
    handleCurrentChange(currentPage) {
      this.paginationData.currentPage = currentPage;
      this.getMainData();
    },
    handleSizeChange(pageSize) {
      this.paginationData.pageSize = pageSize;
      this.getMainData();
    },
    //查询按钮
    searchHandle() {
      this.getMainDataForQuery();
    },
    getMainDataForQuery() {
      this.tableLoad = true;
      pageMyCase(this.realFetchFormData).then(data => {
        sessionStorage.setItem(
          "mine",
          JSON.stringify(data.list)
        );
        if (!data) {
          data = { total: 0, list: [] };
        }
        this.fetchData = data;
        this.paginationData.total = data.countCase;
        this.tableData = data.list.map(item => {
          return Object.assign(item, { "class-name": `color_${item.color}` });
        });
        this.tableLoad = false;
      });
    },
    rowColor({ row }) {
      if (row.caseStatus==3){
        return `color_3`;
      }else if(row.caseStatus==4){
        return `color_4`;
      }else{
        return `color_${row.color}`;
      }
    },
    modStatusHandle(id) {
       if (this.multipleSelection.length ===0 ) {
          this.$message.error('请选择数据!');
        } else {
          this.pageLoading=true
      let data = this.multipleSelection.reduce((acc, item) => {
        acc.push({
          id: item.id,
          collectStatus: id
        });
        return acc;
      }, []);
      addCollectStatus(data).then(() => {
        this.$message.success('操作成功!')
        this.getMainData();
        this.pageLoading=false
      });
     }
    },
    colorHandle(color) {
        if (this.multipleSelection.length ===0 ) {
          this.$message.error('请选择数据!');
        } else {
          this.pageLoading=true
      let data = this.multipleSelection.reduce((acc, item) => {
        acc.push({
          id: item.id,
          color
        });
        return acc;
      }, []);
      markColor(data).then(data => {
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
    xcHandle() {
      if (this.multipleSelection.length == 0) {
        return;
      }
      let data = this.multipleSelection.reduce((acc, item) => {
        acc.push({
          id: item.id,
          synergyContext: this.textarea3
        });
        return acc;
      }, []);
      addSynergy(data).then(() => {
        this.$message({
          message: "提交成功",
          type: "success"
        });
      });
    },
    getMainData() {
      this.tableLoad = true;
      pageMyCase(this.realFetchFormData).then(data => {
        if (!data) {
          data = { total: 0, list: [] };
        }
        this.fetchData = data;
        this.paginationData.total = data.countCase;
        this.tableData = data.list.map(item => {
          return Object.assign(item, { "class-name": `color_${item.color}` });
        });
        this.tableLoad = false;
      });
    },
    formatMoney(value, places, symbol, thousand, decimal) {
      places = !isNaN((places = Math.abs(places))) ? places : 2;
      symbol = symbol !== undefined ? symbol : "¥";
      thousand = thousand || ",";
      decimal = decimal || ".";
      var number = value,
        negative = number < 0 ? "-" : "",
        i =
          parseInt((number = Math.abs(+number || 0).toFixed(places)), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
      return (
        symbol +
        negative +
        (j ? i.substr(0, j) + thousand : "") +
        i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) +
        (places
          ? decimal +
            Math.abs(number - i)
              .toFixed(places)
              .slice(2)
          : "")
      );
    },
    showCase(id, name, seqNo) {
      this.$router.push({
        path: "case-detail",
        query: {
          id,
          name,
          mycase:true,
          showNext:true,
          seqNo
        }
      });
    },
    showDetail(row) {
      let id = row.id;
      let name = row.name;
      let seqNo = row.seqno;
      this.$router.push({
        path: "case-detail",
        query: {
          id,
          name,
          mycase:true,
          seqNo
        }
      });
    },
    resetForm(formName) {
      //this.$refs[formName].resetFields();
      this.form = {
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
          val31: "" //案件分配
      }
      this.getMainData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    transform(data, obj = [["name", "label"], ["id", "value"]]) {
      return data.reduce((acc, item) => {
        for (let [key, tarKey] of obj) {
          item[tarKey] = item[key];
        }
        acc.push(item);
        return acc;
      }, []);
    },
    getEnumHandle(name, target, transData) {

      getEnum({ name }).then(data => {
        this[target] = this.transform(data, transData);
      });
    },
    init() {
      this.getMainDataForQuery();
    },
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
    this["val14_data"] =[
      {
        label: "黑色",
        value: "黑"
      },
      {
        label: "红色",
        value: "红"
      },
      {
        label: "蓝色",
        value: "蓝"
      }]
  }

};
</script>

<style lang="scss">
.color_gray {
  color: #b2adb2;
}
.color_BLACK {
  color: #000000;
}
.color_RED {
  color: #ff0000;
}
.color_BLUE {
  color: #0000ff;
}
.color_ORANGE {
  color: #fa8072;
}
.color_ZI {
  color: #a020f0;
}
.color_ZONG {
  color: #d2b48c;
}
.color_3 {
  color: #999999;
}
.color_4 {
  text-decoration:line-through;
  color: #999999;
}
body #collect-my-case .tab2{
  .el-tabs__content{
    margin-bottom: 0px;
    overflow-y: hidden;
  }
}
body #collect-my-case .tab2{
  .el-table .el-table__body-wrapper{
    overflow-x: auto;
  }
}
.myCase-pop {
  .el-form-item--mini {
    display: inline-block;
  }
}

  .el-table--border {
    flex:none
  }

#collect-my-case {
  .el-table th.gutter{
    display: table-cell!important;
  }
  .el-table th>.cell{
    white-space: nowrap;
  }
/*  .el-table .el-table__body-wrapper {
    overflow-x: hidden;
  }*/
  .el-tabs__content{
    margin-bottom: 40px;
    overflow-y: auto;
  }
  .pagination-wrap{
    position: fixed;
    bottom: 0;
    z-index: 100;
    min-height: 40px;
    background-color: white;
    width: 100%;
  }
  .pad{
     .el-checkbox{
        width:24%;
       margin-right: 0px;
     }
  }
  tr.current-row > td{
    position: relative;
    &::before{
      height: 1px;
      background: #0080ff;
      left: 0;
      top: 1px;
      content: '';
      position: absolute;
      width: 100%;
      z-index: 100;
      overflow: hidden;
    }
    &:after{
      height: 1px;
      background: #0080ff;
      left: 0;
      bottom: 1px;
      content: '';
      position: absolute;
      width: 100%;
      z-index: 100;
      overflow: hidden;
    }
  }
}
</style>
