<template>
  <div
    id="xhjl"
    v-loading="loading2"
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.7)"
  >
    <el-dialog
      :title="detailTitle"
      class="dialog-wrap"
      :visible.sync="detailVisible"
      :close-on-click-modal="false"
      width="90%"
      v-dialogDrag
    >
      <case-detail :id="detailId" ref="detail"></case-detail>
    </el-dialog>
    <el-dialog title="同意协催" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false" v-dialogDrag class="dialog-wrap">
      <el-input
        type="textarea"
        :autosize="{ minRows: 6, maxRows: 14 }"
        placeholder="请输入内容"
        v-model="textarea3"
      >
      </el-input>
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
          <!-- label-width="80px"  -->
          <el-form :inline="true" ref="form" :model="form" class="queryStyle">
            <el-form-item prop="val0" label="委托方：">
              <el-select
                v-model="form.val0"
                placeholder="请选择委托方"
                filterable
                collapse-tags
                multiple
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
            <el-form-item prop="val1" label="委托方：">
              <el-select
                v-model="form.val1"
                multiple
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
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="val2" label="申请日期：">
              <el-date-picker
                v-model="form.val2"
                value-format="yyyy-MM-dd"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="申请日期开始"
                end-placeholder="申请日期结束"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="val3" label="个案序列号：">
              <el-input
                v-model="form.val3"
                placeholder="请输入个案序列号"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="val4" label="催收区域：">
             <!-- <el-cascader
                :options="val4_data"
                clearable
                placeholder="请选择催收区域"
                v-model="form.val4"
              >
              </el-cascader>-->
              <el-select
                v-model="form.val4"
                placeholder="请选择催收区域"
                filterable
                collapse-tags
                clearable
              >
                <el-option
                  v-for="item in val4_data"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="val5" label="姓名：">
              <el-input
                v-model="form.val5"
                placeholder="请输入姓名"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="val7" label="委案金额下限：">
              <el-input
                v-model="form.val7"
                type="number"
                placeholder="请输入委案金额下限"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="val6" label="委案金额上限：">
              <el-input
                v-model="form.val6"
                type="number"
                placeholder="请输入委案金额上限"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="val8" label="申请人：">
              <el-input
                v-model="form.val8"
                placeholder="请输入申请人"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="val9" label="信函模板：">
              <el-select v-model="form.val9" placeholder="请选择信函模板" clearable>
                <el-option
                  v-for="item in val9_data"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="val10" label="案件状态：">
              <el-select v-model="form.val10" placeholder="请选择案件状态" clearable>
                <el-option
                  v-for="item in val10_data"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-row>
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="searchHandle"
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
              <!--<el-form-item>
                <el-dropdown
                  @command="exportXh"
                  v-has="'导出信函'"
                  v-dropdown-patch
                >
                  <el-button type="primary">导出信函<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i></el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-for="(item, index) in moduleList"
                      :key="index"
                      :command="item.id"
                      >{{ item.title }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-form-item>-->
              <el-form-item>
                <el-button type="primary" @click="changeRadio">导出查询结果</el-button>
              </el-form-item>
              <el-form-item v-has="'导入信函记录'">
                <el-upload
                  class="upload-demo"
                  :action="action"
                  :headers="headers"
                  :show-file-list="false"
                  accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  :multiple="false"
                  :on-error="
                    () => {
                      this.fullscreenLoading = false;
                      this.loading2 = false;
                    }
                  "
                  :on-progress="
                    () => {
                      this.fullscreenLoading = true;
                      this.loading2 = true;
                    }
                  "
                  :on-success="fileStatu"
                >
                  <el-button class="daoru" type="primary">导入信函记录</el-button>
                </el-upload>
              </el-form-item>
            </el-row>
          </el-form>
        </div>
      </el-col>
      <el-dialog
        title="导出查询结果"
        :visible.sync="dialogVisibleCase"
        width="30%"
        center
        :close-on-click-modal="false"
        v-dialogDrag
        class="dialog-wrap"
      >
        <el-row :gutter="20">
          <el-col :span="10"><div class="grid-content bg-purple">
            <el-radio label="1" v-model="radio"  >按查询条件全部导出</el-radio>
          </div></el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple">
              <el-radio label="2" v-model="radio" >按查询条件导出当前分页</el-radio>
            </div></el-col>
        </el-row>
         <span slot="footer" class="footer">
    <el-button @click="dialogVisibleCase = false">取 消</el-button>
    <el-button type="primary" @click="changeRadio">确 定</el-button>
  </span>
      </el-dialog>
      <el-col :span="22">
        <el-button type="primary" v-has="'撤销协催'" @click="cxHandle"
        >撤销信函</el-button
        >
      </el-col>
    </el-row>
     <el-table highlight-current-row v-loading="tableLoad"
      ref="multipleTable"
      :data="tableData"
      @selection-change="handleSelectionChange"
      @sort-change="sortHandle"
      @row-dblclick="showCase"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        label="个案序列号"
        prop="seqno"
        sortable="custom"
        :sort-orders="['ascending', 'descending']"
        min-width="180"
        header-align="center"
        align="center"
        show-overflow-tooltip
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
        sortable="custom"
        :sort-orders="['ascending', 'descending']"
        header-align="center"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
       <el-table-column label="操作" width="180" align="center">
         <template slot-scope="scope">
           <el-button type="text" size="small" @click="showXh(scope.row)">选择模板</el-button>
           <el-button type="text" size="small" @click="exportCurrent(scope.row)">导出</el-button>
         </template>
       </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="paginationData.currentPage"
      :page-sizes="pageSizes"
      :page-size="paginationData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="paginationData.total"
    >
    </el-pagination>
    <el-dialog
      title="导出信函"
      class="dialog-wrap"
      :visible.sync="moduleVisible"
      :close-on-click-modal="false"
      width="30%"
      v-dialogDrag
    >
      <el-form :inline="true" ref="moduleForm" :model="moduleForm" class="demo-form-inline" label-width="120px">
        <div class="grid-content bg-purple">
          <el-form-item label="信函模板"
                        prop="importLeave" :rules="{required: true, message: '请选择信函模板', trigger: 'blur'}">
            <el-select v-model="moduleForm.moduleId" filterable placeholder="请选择信函模板" clearable>
              <el-option
                v-for="item in moduleList"
                :key="item.id"
                :label="item.title"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="footer">
    <el-button @click="moduleVisible = false">取 消</el-button>
    <el-button type="primary" @click="exportXh()">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="导出选择"
      :visible.sync="showExportConfVisible"
      width="60%"
      center
      :close-on-click-modal="false"
      v-dialogDrag
      class="dialog-wrap"
    >
      <div style="margin-bottom: 10px;"><span @click="selectAllExport" style="cursor: pointer;">全选</span><span @click="selectUnAllExport" style="cursor: pointer;margin-left: 10px;">反选</span></div>
      <el-row class="pad" ref="boxWrapper">
        <el-checkbox v-model="exportConf.id" label="2">ID</el-checkbox>
        <el-checkbox v-model="exportConf.batchNo" label="3">批次号</el-checkbox>
        <el-checkbox v-model="exportConf.client" label="3">委托方</el-checkbox>
        <el-checkbox v-model="exportConf.seqNo" label="3">个案序列号</el-checkbox>
        <el-checkbox v-model="exportConf.name" label="1">姓名</el-checkbox>
        <el-checkbox v-model="exportConf.address" label="1">信函地址</el-checkbox>
        <el-checkbox v-model="exportConf.addressType" label="4">地址类型</el-checkbox>
        <el-checkbox v-model="exportConf.applyContext" label="5">申请内容</el-checkbox>
        <el-checkbox v-model="exportConf.applyDate" label="2">申请时间</el-checkbox>
        <el-checkbox v-model="exportConf.synergyDate" label="4">协催时间</el-checkbox>
        <el-checkbox v-model="exportConf.synergyer" label="5">协催人</el-checkbox>
        <el-checkbox v-model="exportConf.synergyResult" label="5">协催结果</el-checkbox>
        <el-checkbox v-model="exportConf.identNo" label="5">证件号</el-checkbox>
        <el-checkbox v-model="exportConf.cardNo" label="5">卡号</el-checkbox>
        <el-checkbox v-model="exportConf.cardType" label="5">卡类</el-checkbox>
        <el-checkbox v-model="exportConf.account" label="5">账号</el-checkbox>
        <el-checkbox v-model="exportConf.currencyType" label="5">币种</el-checkbox>
        <el-checkbox v-model="exportConf.archiveNo" label="5">档案号</el-checkbox>
        <el-checkbox v-model="exportConf.applyNo" label="5">申请单号</el-checkbox>
        <el-checkbox v-model="exportConf.money" label="5">委案金额</el-checkbox>
        <el-checkbox v-model="exportConf.enRepayAmt" label="5">还款金额</el-checkbox>
        <el-checkbox v-model="exportConf.principle" label="5">本金</el-checkbox>
        <el-checkbox v-model="exportConf.lastRepayDate" label="5">最后还款日</el-checkbox>
        <el-checkbox v-model="exportConf.caseDate" label="5">委案日期</el-checkbox>
        <el-checkbox v-model="exportConf.odv" label="5">催收员</el-checkbox>
        <el-checkbox v-model="exportConf.creditLine" label="5">信用额度</el-checkbox>
        <el-checkbox v-model="exportConf.homeAddress" label="5">家庭地址</el-checkbox>
        <el-checkbox v-model="exportConf.homeTelNumber" label="5">家庭号码</el-checkbox>
        <el-checkbox v-model="exportConf.unitName" label="5">单位名称</el-checkbox>
        <el-checkbox v-model="exportConf.unitAddress" label="5">单位地址</el-checkbox>
        <el-checkbox v-model="exportConf.tel" label="5">手机</el-checkbox>
        <el-checkbox v-model="exportConf.unitTelNumber" label="5">单位号码</el-checkbox>
        <el-checkbox v-model="exportConf.latestOverdueMoney" label="5">最新欠款</el-checkbox>
        <el-checkbox v-model="exportConf.latestOverdueDate" label="5">最新欠款导入时间</el-checkbox>
      </el-row>
      <span slot="footer" class="footer">
        <el-button @click="showExportConfVisible = false">取 消</el-button>
        <el-button type="primary" @click="exportExcel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  pageMyCase,
  getEnum,
  markColor,
  addSynergy,
  batchNo,
  addCollectStatus
} from "@/common/js/collect-my-case";
import {
  list as moduleList,
  confirmSynergy,
  cancelLetter,
  pageDataLetterInfo,
  confirmLetter,
  selectByModule,
  saveSelectFilter,
  updateModule,
  dcxh,
  dccxjg,
  dccxjgThis,
  dccxjgInfo,
  dccxjgInfoThis
} from "@/common/js/synergistic-letter-application.js";
import { baseURL } from "@/common/js/request.js";
import {pageSizes} from "@/common/js/const"

export default {
  name: "synergisticLetterApplication2",
  data() {
    return {
      pageSizes,
      moduleVisible:false,
      moduleForm:{moduleId:null},
    	radio:'1',
      dialogVisibleCase:false,
      loading2: false,
      showExportConfVisible: false,
      exportConf:{},
      exportType:0,
      fullscreenLoading: false,
      tableLoad: false,
      ImportdialogVisible: false,
      ImportMsg: "",
      paginationData: {
        pageSize: pageSizes[0],
        total: 0,
        currentPage: 1
      },
      dialogVisible: false,
      textarea3: "",
      activeName: "tab1",
      //表格数据
      tableData: [],
      fetchData: {},
      detailId: -1,
      form: {
        val0: null, //委托方
        val1: null, //批次号
        val2: [], //申请时间
        val3: "", //个案序列号
        val4: null, //地区
        val5: "", //姓名
        val6: "", //委案金额上限
        val7: "", //委案金额下限
        val8: null, //申请人
        val9: null, //信函模板
        val10: null //案件状态
      },
      val0_data: [], //委托方
      val1_data: [], //批次号
      val4_data: [], //地区
      val9_data: [], //信函模板
      // 未退案0/正常1/暂停2/关档3/退档4/全部5
      val10_data: [
        { label: "全部", value: "" },
        { label: "未退案", value: 0 },
        { label: "正常", value: 1 },
        { label: "暂停", value: 2 },
        { label: "关档", value: 3 },
        { label: "退档", value: 4 }
      ],
      val19_data: [{ label: "是", value: 1 }, { label: "否", value: 0 }],
      // collectStatusMsg 催收状态
      // seqNo  个案序列号
      // name  姓名
      // caseAmt  委案金额
      // repayAmt 还款金额
      // address 地址
      // times 次数
      // applyContext 申请内容
      // addressType 地址类型
      // module 模板
      // relationer 联系人
      // applyDate  申请时间
      // applyer  申请人
      // synergyDate 协催时间
      // synergyer 协催人
      // synergyResult  协催结果
      tableCol_data: [
        {
          'min-width': 120,
          prop: "name",
          label: "姓名"
        },
        {
          'min-width': 100,
          prop: "collectStatusMsg",
          label: "催收状态"
        },
        {
          'min-width': 120,
          prop: "caseAmtMsg",
          label: "委案金额"
        },
        {
          'min-width': 120,
          prop: "repayAmtMsg",
          label: "还款金额"
        },
        {
          'min-width': 120,
          prop: "address",
          label: "地址"
        },
        {
          'min-width': 100,
          prop: "times",
          label: "信函次数"
        },
        {
          'min-width': 180,
          prop: "applyContext",
          label: "申请内容"
        },
        {
          'min-width': 120,
          prop: "module",
          label: "模板"
        },
        {
          'min-width': 120,
          prop: "relationer",
          label: "联系人"
        },
        {
          'min-width': 140,
          prop: "applyDate",
          label: "申请时间"
        },
        {
          'min-width': 120,
          prop: "applyer",
          label: "申请人"
        },
        {
          'min-width': 140,
          prop: "synergyDate",
          label: "协催时间"
        },
        {
          'min-width': 120,
          prop: "synergyer",
          label: "协催人"
        },
        {
          'min-width': 180,
          prop: "synergyResult",
          label: "协催结果"
        }
      ],
      multipleSelection: [],
      sort: {
        orderBy: "id",
        sort: "desc"
      },
      detailVisible: false,
      detailTitle: "案件详情",
      action: baseURL + "/letter/import",
      headers: { Authorization: localStorage.token },
      moduleList: []
    };
  },
  computed: {
    realFetchFormData() {
      // val0: null, //委托方
      //   val1: null, //批次号
      //   val2: [], //申请时间
      //   val3: "", //个案序列号
      //   val4: null, //地区
      //   val5: "", //姓名
      //   val6: "", //委案金额上限
      //   val7: "", //委案金额下限
      //   val8: null, //申请人
      //   val9: null, //信函模板
      //   val10: null, //案件状态
      let {
        val0: clients,
        val1: batchNos,
        val2,
        val3: seqno,
        val4: collectArea,
        val5: name,
        val6: caseAmtStart,
        val7: caseAmtEnd,
        val8: applyer,
        val9: module,
        val10: caseStatus
      } = this.form;
      return {
        clients,
        batchNos,
        seqno,
        collectArea: collectArea + "" ? collectArea : null,
        name,
        caseAmtStart,
        caseAmtEnd,
        applyer,
        module,
        caseStatus,
        applyDateStart: (!!val2 && val2[0]) || "",
        applyDateEnd: (!!val2 && val2[1]) || "",
        pageNum: this.paginationData.currentPage,
        pageSize: this.paginationData.pageSize,
        orderBy: this.sort.orderBy,
        sort: this.sort.sort,
        status: 1
      };
    }
  },
  created() {
    this.init();
  },
  methods: {
    saveExportLetterConf() {
      let queryObj = {module: "data-letter-record-exportLetter", menu: this.exportConf}
      saveSelectFilter(queryObj).then(data => {
      });
    },
    queryExportLetterConfList() {
      this.$set(this, 'loading2', true)
      this.$set(this, 'fullscreenLoading', true)
      let queryObj = {module: "data-letter-record-exportLetter", menu: this.exportConf}
      selectByModule(queryObj).then(data => {
        if (data) {
          this.$set(this, 'exportConf', JSON.parse(data.menu))
          //this.exportConf = JSON.parse(data.menu);
        }
        this.$set(this, 'loading2', false)
        this.$set(this, 'fullscreenLoading', false)
        this.showExportConfVisible = true;
      });
    },
    selectAllExport(){
      this._selectAllInit('exportConf');
      for(var p in this.exportConf){//遍历json对象的每个key/value对,p为key
        this.exportConf[p] = true;
      }
    },
    selectUnAllExport(){
      this._selectAllInit('exportConf');
      for(var p in this.exportConf){//遍历json对象的每个key/value对,p为key
        this.exportConf[p] = false;
      }
    },
    exportExcel(){
      let successNum =0;
      for(var p in this.exportConf){//遍历json对象的每个key/value对,p为key
        if (this.exportConf[p]){
          successNum = successNum+1;
        }
      }
      if (successNum==0){
        this.$message({
          type: 'error',
          message: '请先选择导出项!'
        });
        this.fullscreenLoading = false
        this.loading2 = false
        return ;
      }
      if (this.exportType==2){
        this.exportCx(1)
      }else if (this.exportType==3){
        this.exportCx(2)
      }
      this.saveExportLetterConf();
      this.showExportConfVisible = false;
    },
  	changeRadio(){
      /*if(this.radio==1){
        this.exportType=2;
      }else{
        this.exportType=3;
      }*/
      this.exportType=2;
      this.queryExportLetterConfList();
      //this.dialogVisibleCase = false;
      this.showExportConfVisible = true;
  	},
    fileStatu(res) {
      if (res.code == 100) {
        this.$message({
          type: "success",
          message: "导入成功"
        });
        this.getMainData();
      } else if (res.code == 800) {
        this.ImportdialogVisible = true;
        this.ImportMsg = res.msg;
      } else {
        this.$message({
          type: "error",
          message: res.msg
        });
      }
      this.loading2 = false;

      this.fullscreenLoading = false;
    },
    exportCurrent(row){
      if (row.moduleId==null || row.moduleId==""){
        this.$message.warning("请先选择模板");
        return;
      }
      dcxh({ module: row.moduleId, id:row.id ,caseId:row.caseId});
    },
    showXh(row){
      this.moduleForm.id = row.id;
      this.moduleForm.caseId = row.caseId;
      this.moduleVisible = true;
    },
    exportXh() {
      if (this.moduleForm.moduleId==null || this.moduleForm.moduleId=="") {
        this.$message.warning("请先选择模板");
        return;
      }
      updateModule({module: this.moduleForm.moduleId, id:this.moduleForm.id}).then(()=>{
        this.moduleVisible = false;
        this.getMainData();
      });
    },
    exportCx(command) {
      this.fullscreenLoading = true;
      if (command == 1) {
        this.realFetchFormData.exportConf = this.exportConf;
        dccxjgInfo(this.realFetchFormData).then(()=>{
          this.fullscreenLoading = false;
        });
      } else {
        this.realFetchFormData.exportConf = this.exportConf;
        dccxjgInfoThis(this.realFetchFormData).then(()=>{
          this.fullscreenLoading = false;
        });
      }
    },
    showCase(row) {
      window.open(`#/zhx/case-detail?id=${row.caseId}`)
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
      this.getMainData();
    },
    colorHandle(color) {
      let data = this.multipleSelection.reduce((acc, item) => {
        acc.push({
          id: item.id,
          color
        });
        return acc;
      }, []);
      markColor(data).then(data => {
        this.getMainData();
      });
    },
    cxHandle() {
      if (this.multipleSelection.length == 0) {
        return;
      }
      let data = this.multipleSelection.reduce((acc, item) => {
        acc.push({
          id: item.id
        });
        return acc;
      }, []);

      cancelLetter(data).then(() => {
        this.$message({
          message: "提交成功",
          type: "success"
        });
      });
    },
    //同意协催
    qrHandle() {
      if (this.multipleSelection.length == 0) {
        return;
      }
      let data = this.multipleSelection.reduce((acc, item) => {
        acc.push({
          id: item.id
        });
        return acc;
      }, []);

      confirmLetter(data).then(() => {
        this.$message({
          message: "提交成功",
          type: "success"
        });
      });
    },
    getMainData() {
      this.tableLoad = true;
      pageDataLetterInfo(this.realFetchFormData).then(data => {
        if (!data) {
          data = { total: 9, list: [] };
        }
        this.fetchData = data;
        this.paginationData.total = data.total;
        this.tableData = data.list.map(item => {
          return Object.assign(item, { "class-name": `color_${item.color}` });
        });
        this.tableLoad = false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
      this.getMainData();
      moduleList().then(data => {
        this.val9_data = this.transform(data, [
          ["id", "value"],
          ["title", "label"]
        ]);
        this.moduleList = data;
      });
      // val0: null, //委托方
      //   val1: null, //批次号
      //   val2: [], //申请时间
      //   val3: "", //个案序列号
      //   val4: null, //地区
      //   val5: "", //姓名
      //   val6: "", //委案金额上限
      //   val7: "", //委案金额下限
      //   val8: null, //申请人
      //   val9: null, //信函模板
      //   val10: null, //案件状态
      this.getEnumHandle("委托方", "val0_data");
      this.getEnumHandle("催收区域", "val4_data");
    }
  }
};
</script>

<style lang="scss">
#xhjl {
  min-width: 2320px !important;

  .pad {
    .el-checkbox {
      width: 24%;
      margin-right: 0px;
    }
  }
  .upload-demo {
    padding-bottom: 20px;
    .el-upload {
      float: right;
    }
    .el-upload:after {
      content: " ";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }
  }
}
#synergistic-letter-application {
  .pad {
    .el-checkbox {
      width: 24%;
      margin-right: 0px;
    }
  }
}
</style>
