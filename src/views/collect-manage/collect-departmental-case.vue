<template>
  <div id="collect-departmental-case" class="page-wraper-sub">
    <el-tabs v-model="activeName" type="card" class="tabs-wrap">
      <el-tab-pane label="部门案件" name="tab1"
                  style="height: 100%"
      >
        <el-dialog
          :title="detailTitle"
          class="dialog-wrap"
          :visible.sync="detailVisible"
          :close-on-click-modal="false"
          width="90%"
        >
          <case-detail :id="detailId" ref='detail'></case-detail>
        </el-dialog>
        <el-dialog
          title="申请协催"
          :visible.sync="dialogVisible"
          width="30%">
          <el-input
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 14}"
            placeholder="请输入内容"
            v-model="textarea3">
          </el-input>
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
                label-width="20px"
              >

                  <el-form-item prop="val31">
                    <el-select
                      v-model="form.val31"
                      placeholder="请选择部门"
                      clearable
                    >
                      <el-option
                        v-for="item in val31_data"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="val32">
                    <el-select
                      v-model="form.val32"
                      placeholder="请选择催收员"
                      clearable
                    >
                      <el-option
                        v-for="item in val32_data"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>

                <el-form-item prop="val0">
                  <el-select
                    v-model="form.val0"
                    placeholder="请选择委托方"
                    filterable
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
                <el-form-item prop="val1">
                  <el-select
                    v-model="form.val1"
                    multiple
                    collapse-tags
                    filterable
                    remote
                    placeholder="请输入批次号"
                    :remote-method="querySearch">
                    <el-option
                      v-for="item in val1_data"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="val3">
                  <el-input
                    v-model="form.val3"
                    placeholder="个案序列号"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item prop="val2">
                  <el-date-picker
                    v-model="form.val2"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="下次跟进开始日期"
                    end-placeholder="下次跟进结束日期"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-popover
                  placement="bottom-end"
                  width="800"
                  popper-class="myCase-pop"
                  trigger="click">
                  <img style="cursor: pointer;vertical-align: middle;margin-top: 8px;margin-right: 8px;"
                      src="./zhankai.png"
                      width="12"
                      height="12"
                      alt="更多"
                      slot="reference">
                  <el-form-item prop="val4">
                    <el-cascader
                      :options="val4_data"
                      clearable
                      placeholder="选择地区"
                      v-model="form.val4"
                    >
                    </el-cascader>
                  </el-form-item>
                  <el-form-item prop="val5">
                    <el-input
                      v-model="form.val5"
                      placeholder="姓名"
                      clearable
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="val6">
                    <el-input
                      v-model="form.val6"
                      placeholder="证件号"
                      clearable
                    ></el-input>
                  </el-form-item>

                  <el-form-item prop="val8">
                    <el-select
                      v-model="form.val8"
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
                  <el-form-item prop="val9">
                    <el-select
                      v-model="form.val9"
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
                  <el-form-item prop="val10">
                    <el-select
                      v-model="form.val10"
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
                  <el-form-item prop="val11">
                    <el-select
                      v-model="form.val11"
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
                  <el-form-item prop="val29">
                    <el-input
                      v-model="form.val29"
                      placeholder="委案金额下限"
                      clearable
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="val13">
                    <el-input
                      v-model="form.val13"
                      placeholder="委案金额上限"
                      clearable
                    ></el-input>
                  </el-form-item>

                  <el-form-item prop="val14">
                    <el-select
                      v-model="form.val14"
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
                  <el-form-item prop="val15">
                    <el-input
                      v-model="form.val15"
                      placeholder="卡号"
                      clearable
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="val16">
                    <el-input
                      v-model="form.val16"
                      placeholder="档案号"
                      clearable
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="val30">
                    <el-input
                      v-model="form.val30"
                      placeholder="跟进次数下限"
                      clearable
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="val18">
                    <el-input
                      v-model="form.val18"
                      placeholder="跟进次数上限"
                      clearable
                    ></el-input>
                  </el-form-item>

                  <el-form-item prop="val19">
                    <el-select
                      v-model="form.val19"
                      placeholder="是否新分配"
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
                  <el-form-item prop="val20">
                    <el-select
                      v-model="form.val20"
                      placeholder="还款情况"
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

                  <el-form-item prop="val22">
                    <el-input
                      v-model="form.val22"
                      placeholder="自定义信息"
                      clearable
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="val23">
                    <el-input
                      v-model="form.val23"
                      placeholder="催收分类"
                      clearable
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="val24">
                    <el-select
                      v-model="form.val24"
                      placeholder="减免状态"
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
                  <el-form-item prop="val25">
                    <el-select
                      v-model="form.val25"
                      placeholder="报备状态"
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
                  <el-form-item prop="val27">
                    <el-input
                      v-model="form.val27"
                      placeholder="电话号码"
                      clearable
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="val28">
                    <el-input
                      v-model="form.val28"
                      placeholder="催收记录"
                      clearable
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="val33">
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
                  <el-form-item prop="val21">
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
                  <el-form-item prop="val17">
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
                  <el-form-item prop="val12">
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
                  <el-form-item prop="val7">
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
                </el-popover>
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
                  <el-dropdown trigger="click"
                               v-dropdown-patch @command="colorHandle" v-has="'案件标色'">
                    <el-button type="primary">案件标色<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="黑">黑色</el-dropdown-item>
                      <el-dropdown-item command="红">红色</el-dropdown-item>
                      <el-dropdown-item command="蓝">蓝色</el-dropdown-item>
                      <el-dropdown-item command="橙">橙色</el-dropdown-item>
                      <el-dropdown-item command="紫">紫色</el-dropdown-item>
                      <el-dropdown-item command="棕">棕色</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-form-item>
                <el-form-item>
                  <el-dropdown v-dropdown-patch trigger="click" @command="modStatusHandle" v-has="'修改催收状态'">
                    <el-button type="primary" @click="">修改催收状态<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item :command="item.id"
                                        v-for="(item,i) in val10_data" :key="i">{{item.name}}
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="dialogVisible=true;" v-has="'申请协催'">申请协催</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="22">
            <div class="grid-content bg-purple">
              <el-form :inline="true">
                <el-form-item>
                  <span class="color_gray" style="display: inline-block; color: black;font-size: 16px;">查询结果统计：</span>
                </el-form-item>
                <el-form-item>
                  <span class="color_gray" style="display: inline-block; color: #66b1ff;font-size: 16px;">列表案量：</span>
                  <span style="display: inline-block; color: #66b1ff;font-size: 16px;">{{ fetchData.countCase }}，</span> </el-form-item
                ><el-form-item>
                <span class="color_gray" style="display: inline-block; color: #66b1ff;font-size: 16px;">列表金额：</span>
                <span style="display: inline-block; color: #66b1ff;font-size: 16px;">{{ fetchData.sumMoney }}，</span> </el-form-item
              ><el-form-item>
                <span class="color_gray" style="display: inline-block; color: #66b1ff;font-size: 16px;">列表还款案量：</span>
                <span style="display: inline-block; color: #66b1ff;font-size: 16px;">{{ fetchData.countCasePay }}，</span> </el-form-item
              ><el-form-item>
                <span class="color_gray" style="display: inline-block; color: #66b1ff;font-size: 16px;">列表还款数额：</span>
                <span style="display: inline-block; color: #66b1ff;font-size: 16px;">{{ fetchData.sumPayMoney }}，</span> </el-form-item
              ><el-form-item>
                <span class="color_gray" style="display: inline-block; color: #66b1ff;font-size: 16px;">列表待银行对账金额：</span>
                <span style="display: inline-block; color: #66b1ff;font-size: 16px;">{{ fetchData.sumRepay }}，</span> </el-form-item
              ><el-form-item>
                <span class="color_gray" style="display: inline-block; color: #66b1ff;font-size: 16px;">列表承诺还款金额：</span>
                <span style="display: inline-block; color: #66b1ff;font-size: 16px;">{{ fetchData.sumBank }}</span>
              </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
        <el-table
          v-loading="tableLoad"
          class="table-wrap"
          height="1"
          ref="multipleTable"
          :data="tableData"
          border
          stripe
          :row-class-name="rowColor"
          @selection-change="handleSelectionChange"
          @row-dblclick="showCase"
          @sort-change="sortHandle"
        >
          <el-table-column
            type="selection"
            align="center"
            width="55">
          </el-table-column>
          <el-table-column
            label="个案序列号"
            prop="seqno"
            sortable="custom"
            :sort-orders="['ascending', 'descending']"
            min-width="120"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                style="text-decoration: underline"
                type="text"
                size="small"
                @click="showCase(scope.row)"
              >{{ scope.row.seqno }}</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            v-for="(item, index) in tableCol_data"
            :key="index"
            v-bind="item"
            header-align="center"
            min-width="90"
            sortable="custom"
            :sort-orders="['ascending','descending']"
            align="center"
          ></el-table-column>
          <!--<el-table-column label="操作" show-overflow-tooltip>-->
          <!--<template slot-scope="scope">-->
          <!--<el-button type="text" size="small">导入</el-button>-->
          <!--<el-button type="text" size="small">下载</el-button>-->
          <!--<el-button type="text" size="small">编辑</el-button>-->
          <!--</template>-->
          <!--</el-table-column>-->
        </el-table>
          <el-pagination
            class="pagination-wrap"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paginationData.currentPage"
            :page-sizes="[100, 500, 2000, 10000, 1000000]"
            :page-size="paginationData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="paginationData.total">
          </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="部门还款统计" name="tab2"> <tab2></tab2> </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import tab2 from "./collect-departmental-statistics";
  import { pageMyCase,getEnum,markColor ,addSynergy,batchNo,addCollectStatus,listOrganization} from
      "@/common/js/collect-my-case";
  import {role} from '@/common/js/collect-departmental-case'
  const CaseDetail = () => import('@/views/data-manage/detail');
  export default {
    components: {
      tab2,
      CaseDetail
    },
    name: "collectMyCase",
    data() {
      return {
        tableLoad:false,
        paginationData:{
          pageSize:100,
          total:0,
          currentPage:1
        },
        dialogVisible:false,
        textarea3: '',
        activeName: "tab1",
        detailId:-1,
        detailTitle:'',
        detailVisible: false,
        //表格数据
        tableData: [],
        fetchData: {},
        form: {
          val0: null, //委托方
          val1: null, //批次号
          val2: [], //下次跟进日期
          val3: "", //个案序列号
          val4: null, //地区
          val5: "", //姓名
          val6: "", //证件号
          val7: [], //委案日期
          val8: null, //逾期账龄
          val9: null, //案件状态
          val10: null, //催收状态
          val11: null, //案件类型
          val12: [], //还款日期
          val13: "", //委案金额上限
          val14: null, //标色状态
          val15: "", //卡号
          val16: "", //档案号
          val17: [], //最后跟进日期
          val18: "", //跟进次数上限
          val19: null, //是否新分配
          val20: null, //还款情况
          val21: [], //预计退案日期
          val22: "", //自定义信息
          val23: "", //催收分类
          val24: null, //减免状态
          val25: null, //报备状态
          val27: "", //电话号码
          val28: "", //催收记录
          val29: "", //委案金额下限
          val30: "", //跟进次数下限
          val31: "", //部门
          val32: "", //催收员
          val33: "", //案件分配
        },
        val0_data: [],  //委托方
        val1_data: [],  //批次号
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
        val11_data: [],  //案件类型
        val14_data: [
          {
            label:'黑色',
            value:'黑'
          },
          {
            label:'红色',
            value:'红'
          },
          {
            label:'蓝色',
            value:'蓝'
          },
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
          },
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
            prop: "countFollow",
            width:120,
            label: "跟进次数"
          },
          {
            prop: "remind",
            label: "提醒"
          },
          {
            prop: "nextFollDate",
            width:"160",
            label: "下次跟进日期"
          },
          {
            prop: "caseAllotTime",
            width:180,
            label: "案件分配时间"
          },
          {
            prop: "collectStatusMsg",
            width:130,
            label: "催收状态"
          },
          {
            prop: "collectionType",
            width:130,
            label: "催收分类"
          },
          {
            prop: "accountAge",
            width:130,
            label: "逾期账龄"
          },
         /* {
            prop: "seqno",
            width:140,
            label: "个案序列号"
          },*/
          {
            prop: "caseDate",
            width:"160",
            label: "委案日期"
          },
          {
            prop: "expectTime",
            width:"160",
            label: "预计退案日期"
          },
          {
            prop: "name",
            label: "姓名"
          },
          {
            prop: "cardNo",
            width:"200",
            label: "卡号"
          },
          {
            prop: "identNo",
            width:"200",
            label: "证件号"
          },
          {
            prop: "moneyMsg",
            width:130,
            label: "委案金额"
          },
          {
            prop: "balanceMsg",
            width:130,
            label: "委案余额"
          },
          {
            prop: "moneyStartMsg",
            width:130,
            label: "最新欠款"
          },
          {
            prop: "overDays",
            width:130,
            label: "逾期天数"
          },
          {
            prop: "enRepayAmtMsg",
            width:130,
            label: "已还款金额"
          },
          {
            prop: "repayAmtMsg",
            width:"180",
            label: "承诺还款金额"
          },
          {
            prop: "bankAmtMsg",
            width:"180",
            label: "待银行查账金额"
          },
          {
            prop: "lastPhoneTime",
            width:"180",
            label: "上次通电时间"
          },
          {
            prop: "leaveDays",
            width:130,
            label: "闲置天数"
          },
          {
            prop: "collectInfo",
            width:"180",
            label: "催收小结"
          }
        ],
        multipleSelection: [],
        sort:{
          orderBy: 'id',
          sort:'desc'
        }
      };
    },
    computed: {
      realFetchFormData() {
        let {
          val0: clients,
          val1: batchNos,
          val2,
          val3: seqno,
          val4: area,
          val5: name,
          val6: identNo,
          val7,
          val8: accountAge,
          val9: status,
          val10: collectStatus,
          val11: caseType,
          val12,
          val13: moneyStart,
          val29: moneyEnd,
          val14: color,
          val15: cardNo,
          val16: archiveNo,
          val17,
          val18:countFollowStart,
          val30:countFollowEnd,
          val19: newCase,
          val20: repayStatus,
          val21,
          val22: remark,
          val23: collectionType,
          val24: reliefStatus,
          val25: reportStatus,
          val27: telPhone,
          val28: collectMeasure,
          val31:dept,
          val32:odv,
          val33
        } = this.form;
        return {
          clients,
          batchNos,
          seqno,
          nextFollDateStart: (!!val2 && val2[0])||'' ,
          nextFollDateEnd: (!!val2 && val2[1])||'',
          area,
          name,
          identNo,
          accountAge,
          status,
          collectStatus,
          caseType,
          repayStatus,
          repayTimeStart: (!!val12 && val12[0])||'',
          repayTimeEnd: (!!val12 && val12[1])||'',
          moneyStart,
          moneyEnd,
          color,
          cardNo,
          archiveNo,
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
          reliefStatus,
          reportStatus,
          telPhone,
          collectMeasure,
          pageNum: this.paginationData.currentPage,
          pageSize: this.paginationData.pageSize,
          dept,
          odv,
          sType:1,
          orderBy: this.sort.orderBy,
          sort: this.sort.sort,
        };
      }
    },
    watch: {
      form: {
        handler(newObj) {
          console.log(Object.values(newObj));
        },
        deep: true
      }
    },
    created(){
      this.init();
    },
    methods: {
      showCase(row) {
        let id = row.id
        let name = row.name
        let seqNo = row.seqno
        this.$router.push({
          path:'case-detail',
          query:{
            id,
            name,
            seqNo
          }
        })
      },
      formatMoney(value,places, symbol, thousand, decimal) {
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
        this.getMainData();
      },
      rowColor({row}){
        return `color_${row.color}`;
      },
      modStatusHandle(id){
        console.log(id);
        let data = this.multipleSelection.reduce((acc,item)=>{
          acc.push({
            id:item.id,
            collectStatus:id
          })
          return acc;
        },[]);
        addCollectStatus(data).then(()=>{
          this.getMainData();
        });
      },
      colorHandle(color){
        let data = this.multipleSelection.reduce((acc,item)=>{
          acc.push({
            id:item.id,
            color
          })
          return acc;
        },[]);
        markColor(data).then((data)=>{
          this.getMainData();
        });
      },
      //申请协催
      xcHandle(){
        if(this.multipleSelection.length==0){return;}
        let data = this.multipleSelection.reduce((acc,item)=>{
          acc.push({
            id:item.id,
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
        this.tableLoad = true
        pageMyCase(this.realFetchFormData).then((data)=>{
          if(!data){
            data = {total:0,list:[]}
          }
          this.fetchData = data;
          this.paginationData.total = data.countCase;
          this.tableData = data.list.map((item)=>{
            return Object.assign(item, {'class-name': `color_${item.color}`});
          })
          this.tableLoad = false
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
        this.getEnumHandle('委托方', 'val0_data');
        this.getEnumHandle('地区', 'val4_data');
        this.getEnumHandle('逾期账龄', 'val8_data');
        this.getEnumHandle('催收状态', 'val10_data');
        this.getEnumHandle('案件类型', 'val11_data');
        this.getEnumHandle('减免状态', 'val24_data');
        this.getEnumHandle('报备状态', 'val25_data');
        listOrganization().then((data)=>{
          this.val31_data = this.transform(data,[['orgName','label'],['id','value']]);
        });
        role({role:'催收员'}).then((data)=>{
          this.val32_data = this.transform(data,[['userName','label'],['id','value']]);
        })
      },
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

  #collect-departmental-case {
    // height: 100%;
    // .el-table .el-table__body-wrapper{
    //   height: calc(100% - 50px);
    // }
  }
</style>
