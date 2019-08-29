<template>
  <div id="data-memorize-manage"
       v-loading="loading"
       element-loading-text="拼命加载中"
       v-loading.fullscreen.lock="fullscreenLoading"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-form id="repay-record-query" :model="formInline" :inline="true" class="query-wrap queryStyle">
      <el-form-item v-if="queryConf.csqy || queryConfFlag">
        <el-select v-model="formInline.areas" filterable collapse-tags multiple placeholder="请选择催收区域" clearable>
          <el-option
            v-for="item in areaList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="queryConf.bm || queryConfFlag">
        <el-select v-model="formInline.depts" filterable collapse-tags multiple placeholder="请选择部门" clearable>
          <el-option
            v-for="item in departmentList"
            :key="item.id"
            :label="item.orgName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="queryConf.csy || queryConfFlag">
        <!--<el-select v-model="formInline.odvs" filterable collapse-tags multiple placeholder="请选择催收员" clearable>
          <el-option
            v-for="item in PersonList"
            :key="item.id"
            :label="item.userName"
            :value="item.id">
          </el-option>
        </el-select>-->
        <el-input v-model="formInline.odvNameFiter" width="200" @focus="onClickSelectUser3" clearable placeholder="请选择催收员"></el-input>
      </el-form-item>
      <el-form-item v-if="queryConf.cscs || queryConfFlag">
        <el-select v-model="formInline.measures" filterable collapse-tags multiple placeholder="请选择催收措施" clearable>
          <el-option
            v-for="item in sectionList"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="queryConf.pch || queryConfFlag">
        <el-input v-model="formInline.batchNo" placeholder="请输入批次号" clearable></el-input>
      </el-form-item>
      <el-form-item v-if="queryConf.zjh || queryConfFlag">
        <el-input v-model="formInline.identNo" placeholder="请输入证件号" clearable></el-input>
      </el-form-item>
      <el-form-item v-if="queryConf.kh || queryConfFlag">
        <el-input v-model="formInline.cardNo" placeholder="请输入卡号" clearable></el-input>
      </el-form-item>
      <el-form-item v-if="queryConf.csjl || queryConfFlag">
        <el-input v-model="formInline.collectInfo" placeholder="请输入催收记录" clearable></el-input>
      </el-form-item>
      <el-form-item v-if="queryConf.gaxlh || queryConfFlag">
        <el-input v-model="formInline.seqno" placeholder="请输入个案序列号" clearable></el-input>
      </el-form-item>
      <el-form-item v-if="queryConf.csjg || queryConfFlag">
        <el-select v-model="formInline.results" placeholder="请选择催收结果" filterable collapse-tags multiple clearable>
          <el-option
            v-for="item in EndList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="queryConf.wtf || queryConfFlag">
        <el-select v-model="formInline.clients" collapse-tags filterable multiple placeholder="请选择委托方" clearable>
          <el-option
            v-for="item in clientList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="queryConf.ajzt || queryConfFlag">
        <el-select v-model="formInline.caseStatuss" filterable collapse-tags multiple placeholder="请选择案件状态" clearable>
          <el-option
            v-for="item in caseStatusList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="queryConf.bszt || queryConfFlag">
        <el-select v-model="formInline.colors" filterable collapse-tags multiple placeholder="请选择标色状态" clearable>
          <el-option
            v-for="item in val14_data"
            :key="item.label"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="queryConf.csrq || queryConfFlag">
        <el-date-picker
          v-model="formInline.collectTime"
          type="daterange"
          align="right"
          value-format="yyyy-MM-dd"
          unlink-panels
          clearable
          range-separator="至"
          start-placeholder="催收日期开始"
          end-placeholder="催收日期结束"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item v-if="queryConf.warq || queryConfFlag">
        <el-date-picker
          v-model="formInline.bailTime"
          type="daterange"
          align="right"
          value-format="yyyy-MM-dd"
          unlink-panels
          clearable
          range-separator="至"
          start-placeholder="委案日期开始"
          end-placeholder="委案日期结束"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item v-if="queryConf.yjtarq || queryConfFlag">
        <el-date-picker
          v-model="formInline.expectTime"
          type="daterange"
          align="right"
          value-format="yyyy-MM-dd"
          unlink-panels
          clearable
          range-separator="至"
          start-placeholder="预计退案日期开始"
          end-placeholder="预计退案日期结束"
        >
        </el-date-picker>
      </el-form-item>
      <el-row>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click="resetForm">重置</el-button>
          <el-button type="primary" @click="showQueryConf">查询条件配置</el-button>
          <el-button type="primary" @click="open7" v-has="'删除催记'">删除催记</el-button>
          <el-button type="primary" @click="selectDataCollectExport" v-has="'导出所选借改'">导出所选催记</el-button>
          <el-button type="primary" @click="changeRadio" v-has="'导出查询结果'">导出查询结果</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <el-table highlight-current-row
              v-loading="tableLoad"
              :data="tableData3"
              border
              stripe
              tooltip-effect="dark"
              @row-dblclick="showCase"
              @sort-change="handleSort"
              @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        align="center"
        width="55">
      </el-table-column>

      <el-table-column
        prop="seqno"
        sortable="custom"
        align="center"
        min-width="160"
        :sort-orders="['ascending','descending']"
        label="个案序列号"
      >
        <template slot-scope="scope">
          <el-button
            style="text-decoration: underline"
            type="text"
            size="small"
            @click="showCase(scope.row)"
          >{{ scope.row.seqno }}
          </el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        sortable="custom"
        align="center"
        :sort-orders="['ascending','descending']"
        label="姓名"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="measure"
        sortable="custom"
        min-width="120"
        align="center"
        :sort-orders="['ascending','descending']"
        label="催收措施"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="collectTime"
        label="催收时间"
        width="130"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="targetName"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        min-width="120"
        align="center"
        label="对象姓名"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="relation"
        label="与案人关系"
        min-width="120"
        align="center"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="telType"
        label="电话类型"
        align="center"
        min-width="120"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="mobile"
        width="120"
        align="center"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        label="电话号码"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="collectInfo"
        label="催收记录"
        min-width="120"
        align="center"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="result"
        label="催收结果"
        min-width="160"
        align="center"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="methodMsg"
        label="还款方式"
        min-width="120"
        align="center"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="repayTime"
        label="承诺还款日期"
        width="120"
        align="center"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="承诺还款金额"
        width="130"
        align="center"
        prop="repayAmtMsg"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.repayAmtMsg}}
        </template>
      </el-table-column>
      <el-table-column
        label="减免金额"
        width="120"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        align="center"
        prop="reduceAmtMsg"
        show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.reduceAmtMsg}}
        </template>
      </el-table-column>
      <el-table-column
        prop="reduceStatusMsg"
        label="减免状态"
        sortable="custom"
        align="center"
        min-width="130"
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="odv"
        label="催收员"
        sortable="custom"
        align="center"
        min-width="130"
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="collectStatusMsg"
        label="催收状态"
        min-width="130"
        align="center"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="操作"
        width="120"
        align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editMessage(scope.row)" v-has="'编辑'">编辑</el-button>
          <el-button type="text" size="small" @click="deleteMessage(scope.row.id)" v-has="'删除催记'">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination-wrap"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="pageSizes"
      :page-size="pages"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <div class="block">
    </div>
    <el-dialog
      title="编辑催记"
      class="dialog-wrap"
      :visible.sync="dialogVisible1"
      :close-on-click-modal="false"
      width="50%"
      v-dialogDrag
    >
      <el-form
        :model="recordInfo"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="通话时间" prop="createTime">
          <el-date-picker
            v-model="recordInfo.collectTime"
            value-format="yyyy-MM-dd HH:mm"
            type="datetime"
            placeholder="请选择通话时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="通话结果" prop="result">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入通话结果"
            v-model="recordInfo.collectInfo">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="footer">
        <el-button @click="onClickCancel">取 消</el-button>
        <el-button type="primary" @click="onClickSave">保 存</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="导出查询结果"
      :visible.sync="dialogVisible2"
      width="30%"
      center
      :close-on-click-modal="false"
      v-dialogDrag
    >
      <el-form :inline="true">
        <el-form-item>
          <el-radio v-model="radio" label="1">按查询条件全部导出</el-radio>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="radio" label="2">按查询条件导出当前分页</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="changeRadio">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog
      title="查询条件配置"
      :visible.sync="showQueryConfVisible"
      width="60%"
      center
      :close-on-click-modal="false"
      v-dialogDrag
    >
      <el-row class="pad">
        <el-checkbox v-model="queryConf.csqy" label="1">催收区域</el-checkbox>
        <el-checkbox v-model="queryConf.bm" label="2">部门</el-checkbox>
        <el-checkbox v-model="queryConf.csy" label="3">催收员</el-checkbox>
        <el-checkbox v-model="queryConf.cscs" label="4">催收措施</el-checkbox>
        <el-checkbox v-model="queryConf.pch" label="5">批次号</el-checkbox>
        <el-checkbox v-model="queryConf.zjh" label="2">证件号</el-checkbox>
        <el-checkbox v-model="queryConf.kh" label="3">卡号</el-checkbox>
        <el-checkbox v-model="queryConf.csjl" label="4">催收记录</el-checkbox>
        <el-checkbox v-model="queryConf.gaxlh" label="5">个案序列号</el-checkbox>
        <el-checkbox v-model="queryConf.csjg" label="1">催收结果</el-checkbox>
        <el-checkbox v-model="queryConf.wtf" label="2">委托方</el-checkbox>
        <el-checkbox v-model="queryConf.ajzt" label="4">案件状态</el-checkbox>
        <el-checkbox v-model="queryConf.bszt" label="5">标色状态</el-checkbox>
        <el-checkbox v-model="queryConf.csrq" label="1">催收日期</el-checkbox>
        <el-checkbox v-model="queryConf.wtrq" label="2">委托日期</el-checkbox>
        <el-checkbox v-model="queryConf.yjtarq" label="3">预计退案日期</el-checkbox>
      </el-row>
      <span slot="footer" class="footer">
        <el-button @click="showQueryConfVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveConf">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="导出选择"
      :visible.sync="showExportConfVisible"
      width="60%"
      center
      :close-on-click-modal="false"
      v-dialogDrag
    >
      <div style="margin-bottom: 10px;"><span @click="selectAllExport" style="cursor: pointer;">全选</span><span @click="selectUnAllExport" style="cursor: pointer;margin-left: 10px;">反选</span></div>
      <el-row class="pad" ref="boxWrapper">
        <el-checkbox v-model="exportConf.name" label="2">姓名</el-checkbox>
        <el-checkbox v-model="exportConf.account" label="3">账号</el-checkbox>
        <el-checkbox v-model="exportConf.cardNo" label="3">卡号</el-checkbox>
        <el-checkbox v-model="exportConf.identNo" label="3">证件号</el-checkbox>
        <el-checkbox v-model="exportConf.archiveNo" label="1">档案号</el-checkbox>
        <el-checkbox v-model="exportConf.seqNo" label="1">个案序列号</el-checkbox>
        <el-checkbox v-model="exportConf.accountAge" label="4">逾期账龄</el-checkbox>
        <el-checkbox v-model="exportConf.money" label="5">委案金额</el-checkbox>
        <el-checkbox v-model="exportConf.residualPrinciple" label="2">欠款余额</el-checkbox>
        <el-checkbox v-model="exportConf.targetName" label="4">对象姓名</el-checkbox>
        <el-checkbox v-model="exportConf.relation" label="5">关系</el-checkbox>
        <el-checkbox v-model="exportConf.collectPhoneAddr" label="5">电话/地址</el-checkbox>
        <el-checkbox v-model="exportConf.contractType" label="5">联络类型</el-checkbox>
        <el-checkbox v-model="exportConf.collectTime" label="5">催收时间</el-checkbox>
        <el-checkbox v-model="exportConf.result" label="5">催收内容</el-checkbox>
        <el-checkbox v-model="exportConf.odv" label="5">催收人员</el-checkbox>
        <el-checkbox v-model="exportConf.method" label="5">谈判方式</el-checkbox>
        <el-checkbox v-model="exportConf.collectStatus" label="5">催收状态</el-checkbox>
        <el-checkbox v-model="exportConf.proRepayDate" label="5">承诺日期</el-checkbox>
        <el-checkbox v-model="exportConf.proRepayAmt" label="5">承诺金额</el-checkbox>
        <el-checkbox v-model="exportConf.reduceAmt" label="5">减免金额</el-checkbox>
        <el-checkbox v-model="exportConf.reduceStatus" label="5">减免状态</el-checkbox>
        <el-checkbox v-model="exportConf.collectInfo" label="5">催收小结</el-checkbox>
        <el-checkbox v-model="exportConf.overDays" label="5">逾期天数</el-checkbox>
        <el-checkbox v-model="exportConf.batchNo" label="5">批次号</el-checkbox>
        <el-checkbox v-model="exportConf.caseDate" label="5">委案日期</el-checkbox>
        <el-checkbox v-model="exportConf.expectTime" label="5">预计退案日期</el-checkbox>
        <el-checkbox v-model="exportConf.newMoney" label="5">最新欠款</el-checkbox>
        <el-checkbox v-model="exportConf.province" label="5">省份</el-checkbox>
        <el-checkbox v-model="exportConf.city" label="5">城市</el-checkbox>
        <el-checkbox v-model="exportConf.county" label="5">区县</el-checkbox>
        <el-checkbox v-model="exportConf.currencyType" label="5">币种</el-checkbox>
        <el-checkbox v-model="exportConf.applyOrderNo" label="5">申请单号</el-checkbox>
        <el-checkbox v-model="exportConf.overdueMoney" label="5">逾期金额</el-checkbox>
        <el-checkbox v-model="exportConf.remark" label="5">自定义信息</el-checkbox>
        <el-checkbox v-model="exportConf.odv2" label="5">催收员</el-checkbox>
        <el-checkbox v-model="exportConf.collectStatus2" label="5">催收状态</el-checkbox>
        <el-checkbox v-model="exportConf.nextFollDate" label="5">下次跟进日期</el-checkbox>
        <el-checkbox v-model="exportConf.minimumPayment" label="5">最低还款额</el-checkbox>
        <el-checkbox v-model="exportConf.creditLine" label="5">信用额度</el-checkbox>
        <el-checkbox v-model="exportConf.module" label="5">催收模板</el-checkbox>
      </el-row>
      <span slot="footer" class="footer">
        <el-button @click="showExportConfVisible = false">取 消</el-button>
        <el-button type="primary" @click="exportExcel">确 定</el-button>
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
  import {
    search,
    dataList,
    areaList,
    getUserTree,
    saveSelectFilter,
    selectByModule,
    pageDataExport,
    selectDataExport,
    totalDataExport,
    remoweData,
    caseTypeList,
    clientList,
    EndList,
    PersonList,
    departmentList,
    deleteDataCollectRecord,
    updateDataCollectRecord
  } from '@/common/js/data-memorize-manage.js'
  import {pageSizes} from "@/common/js/const"

  export default {
    name: 'dataMemorizeManage',
    data() {
      return {
        pageSizes,
        radio: "1",
        tableHeight: 50,
        tableLoad: false,
        selectUserVisible3:false,
        selectUserTree:[],
        showExportConfVisible: false,
        exportConf: {},
        exportType: 0,
        images: {background: "url(" + require("./down.png") + ") repeat-x", padding: "8px 5px 3px 6px",},
        loading: false,
        caseStatusList: [{name: "未退案", id: 0}, {name: "正常", id: 1}, {name: "暂停", id: 2}, {
          name: "关档",
          id: 3
        }, {name: "退档", id: 4}, {name: "全部", id: 5}],
        val14_data: [
          {
            label: '正常',
            value: 'BLACK'
          },
          {
            label: '红色',
            value: 'RED'
          },
          {
            label: '蓝色',
            value: 'BLUE'
          }/*,
          {
            label: '橙色',
            value: '橙'
          },
          {
            label: '紫色',
            value: '紫'
          },
          {
            label: '棕色',
            value: '棕'
          },*/
        ],
        fullscreenLoading: false,
        EndList: [],
        showQueryConfVisible: false,
        queryConf: {},
        queryConfFlag: true,
        selectDataCollectExportList: [],
        departmentList: [],
        PersonList: [],
        clientList: [],
        caseTypeList: [],
        sectionList: [{id: 1, name: "电话催收"}, {id: 2, name: "信函"}, {id: 3, name: "辅助渠道"}],
        pageSize: 100,
        pageNum: 1,
        orderBy: "id",
        sort: "desc",
        deleteList: [],
        areaList: [],
        dynamicValidateForm: {},
        dialogVisible: false,
        dialogVisible1: false,
        dialogVisible2: false,
        recordInfo: {},
        tableData3: [],
        currentPage4: 1,
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        pages: 1,
        total: 0,
        form: {PersonList: []},
        formInline: {
          odvNameFiter:null,
          odvs: [],
          clients: [],
          collectTime: [],
          expectTime: [],
          bailTime: []
        },
      }
    },
    methods: {
      onClickSelectUser3(){
        this.selectUserVisible3 = true
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
        this.$set(this.formInline, 'odvNameFiter', selectUserNames.join(','))
        this.$set(this.formInline, 'odvs', selectUserIds)
        this.selectUserVisible3 = false
      },
      saveExportCollectConf() {
        let queryObj = {module: "data-memorize-manage-exportCollect", menu: this.exportConf}
        saveSelectFilter(queryObj).then(data => {
        });
      },
      queryExportCollectConfList() {
        let queryObj = {module: "data-memorize-manage-exportCollect", menu: this.exportCollectConf}
        selectByModule(queryObj).then(data => {
          if (data) {
            this.exportCollectConf = JSON.parse(data.menu);
          }
        });
      },
      saveConf() {
        this.showQueryConfVisible = false;
        let queryObj = {module: "data-memorize-manage", menu: this.queryConf}
        saveSelectFilter(queryObj).then(data => {
          this.$message({
            message: "配置成功",
            type: "success"
          });
          this.queryConfList();
        });
      },
      queryConfList() {
        let queryObj = {module: "data-memorize-manage", menu: this.queryConf}
        selectByModule(queryObj).then(data => {
          if (data) {
            this.queryConf = JSON.parse(data.menu);
            this.queryConfFlag = false;
          } else {
            this.queryConfFlag = true;
          }
        });
      },
      showQueryConf() {
        this.showQueryConfVisible = true;
      },
      changeRadio() {
        /*if (this.radio == 1) {
          this.totalDataCollectExport()
        } else {
          this.pageDataCollectExport()
        }*/
        this.totalDataCollectExport()
      },
      showCase(row) {
        window.open(`#/zhx/case-detail?id=${row.caseId}`)
        // let id = row.caseId
        // let name = row.name
        // let seqNo = row.seqno
        // this.$router.push({
        //   path: 'case-detail',
        //   query: {
        //     id,
        //     name,
        //     seqNo
        //   }
        // })
      },
      editMessage(record) {
        this.recordInfo = {
          id: record.id,
          collectInfo: record.collectInfo,
          collectTime: record.collectTime
        }
        this.dialogVisible1 = true
      },
      onClickCancel() {
        this.dialogVisible1 = false
      },
      onClickSave() {
        updateDataCollectRecord(this.recordInfo).then(res => {
          this.$message({
            type: 'success',
            message: '修改记录成功成功!'
          });
          this.search()
          this.dialogVisible1 = false
        })
      },
      deleteMessage(id) {
        this.$confirm('此操作将永久删除改记录,是否继续', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteDataCollectRecord([{id}]).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.search()
          })
        }).catch(() => {});
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
        let successNum = 0;
        for (var p in this.exportConf) {//遍历json对象的每个key/value对,p为key
          if (this.exportConf[p]) {
            successNum = successNum + 1;
          }
        }
        if (successNum == 0) {
          this.$message({
            type: 'error',
            message: '请先选择导出项!'
          });
          this.fullscreenLoading = false
          this.loading = false
          return;
        }
          if (this.exportType==1){
            this.loading = true
            this.fullscreenLoading = true
            if (this.selectDataCollectExportList.length >= 1) {
              selectDataExport(this.selectDataCollectExportList,this.exportConf).then((response) => {
                this.loading = false;
                this.fullscreenLoading = false
                this.$message({
                  type: 'success',
                  message: '导出成功!'
                });
              })
            } else {
              this.loading = false;
              this.fullscreenLoading = false
              this.$message({
                type: 'info',
                message: '请选择数据!'
              });
            }
          }else if (this.exportType ==2){
            this.loading = true;
            this.fullscreenLoading = true

            let bailStartDate = this.formInline.bailTime==null?"":this.formInline.bailTime[0]
            let bailEndDate = this.formInline.bailTime==null?"":this.formInline.bailTime[1]
            let expectStartTime = this.formInline.expectTime==null?"":this.formInline.expectTime[0]
            let expectEndTime = this.formInline.expectTime==null?"":this.formInline.expectTime[1]
            let collectStartTime = this.formInline.collectTime==null?"":this.formInline.collectTime[0]
            let collectEndTime = this.formInline.collectTime==null?"":this.formInline.collectTime[1]
            totalDataExport(this.exportConf,this.formInline.areas, this.formInline.depts, this.formInline.batchNo, this.formInline.clients, this.formInline.odvs, this.formInline.caseStatuss, this.formInline.measures, this.formInline.results, this.formInline.identNo, this.formInline.cardNo, this.formInline.collectInfo, this.formInline.colors, this.formInline.seqno, bailStartDate, bailEndDate, expectStartTime, expectEndTime, collectStartTime, collectEndTime, this.orderBy, this.sort, this.pageSize, this.pageNum).then((response) => {
              this.loading = false;
              this.fullscreenLoading = false

              this.$message({
                type: 'success',
                message: '导出成功!'
              });
            })
          }else if (this.exportType ==3){
            this.loading = true;
            this.fullscreenLoading = true
            let bailStartDate = this.formInline.bailTime[0]
            let bailEndDate = this.formInline.bailTime[1]
            let expectStartTime = this.formInline.expectTime[0]
            let expectEndTime = this.formInline.expectTime[1]
            let collectStartTime = this.formInline.collectTime[0]
            let collectEndTime = this.formInline.collectTime[1]
            pageDataExport(this.exportConf,this.formInline.areas, this.formInline.depts, this.formInline.batchNo, this.formInline.clients, this.formInline.odvs, this.formInline.caseStatuss, this.formInline.measures, this.formInline.results, this.formInline.identNo, this.formInline.cardNo, this.formInline.collectInfo, this.formInline.colors, this.formInline.seqno, this.formInline.bailStartDate, this.formInline.bailEndDate, this.formInline.expectStartTime, this.formInline.expectEndTime, this.formInline.collectStartTime, this.formInline.collectEndTime, this.orderBy, this.sort, this.pageSize, this.pageNum).then((response) => {
              this.loading = false;
              this.fullscreenLoading = false

              this.$message({
                type: 'success',
                message: '导出成功!'
              });
            })
          }
          this.saveExportCollectConf();
        this.showExportConfVisible = false;
      },
      selectDataCollectExport() {
        if (this.selectDataCollectExportList.length >= 1) {
          this.exportType = 1;
          this.queryExportCollectConfList();
          this.showExportConfVisible = true;
        }else{
          this.$message({
            type: 'error',
            message: '请先选择导出记录!'
          });
        }
      },
      totalDataCollectExport() {
        this.exportType = 2;
        let queryObj = {module: "data-memorize-manage-exportCollect", menu: this.exportConf}
        selectByModule(queryObj).then(data => {
          if (data && data.menu) {
            this.exportConf = JSON.parse(data.menu);
          }
        });
        this.showExportConfVisible = true;
        this.dialogVisible2 = false;
      },
      pageDataCollectExport() {
        this.exportType = 3;
        this.showExportConfVisible = true;
        this.dialogVisible2 = false;
      },
      handleSort({column, prop, order}) {
        this.sort = order == null ? "desc" : order.replace("ending", "")
        this.orderBy = prop == null ? "id" : prop
        this.tableLoad = true
        search(this.formInline, this.orderBy, this.sort, this.pageSize, this.pageNum).then((response) => {
          this.tableData3 = response.list
          //this.pages = response.pages
          this.total = response.total
          this.tableLoad = false
        })
      },
      search() {
        this.tableLoad = true
        search(this.formInline, this.orderBy, this.sort, this.pageSize, this.pageNum).then((response) => {
          this.tableData3 = response.list
          //this.pages = response.pages
          this.total = response.total
          this.tableLoad = false
        })
      },
      Listsearch() {
        let bailStartDate = this.formInline.bailTime[0]
        let bailEndDate = this.formInline.bailTime[1]
        let expectStartTime = this.formInline.expectTime[0]
        let expectEndTime = this.formInline.expectTime[1]
        let collectStartTime = this.formInline.collectTime[0]
        let collectEndTime = this.formInline.collectTime[1]
        this.tableLoad = true
        dataList(this.formInline, this.orderBy, this.sort, this.pageSize, this.pageNum).then((response) => {
          this.tableData3 = response.list
          this.total = response.total
          this.dialogVisible = false
          this.tableLoad = false
        })
      },
      handleSelectionChange(row) {
        let _self = this
        _self.deleteList = []
        _self.selectDataCollectExportList = []
        row.forEach(function (currentValue, index, arr) {
          let Object = {"id": ""}
          Object.id = currentValue.id
          _self.deleteList.push(Object)
          _self.selectDataCollectExportList.push(currentValue.id)
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.search()
      },
      handleCurrentChange(val) {
        this.pageNum = val;
        this.search()
      },
      resetForm() {
        this.formInline = {
          odvs: [],
          odvNameFiter:"",
          areas:[],
          depts:[],
          measures:[],
          results:[],
          caseStatuss:[],
          colors:[],
          clients: [],
          collectTime: [],
          expectTime: [],
          bailTime: []
        }
      },
      open7() {
        let _self = this
        if (_self.deleteList.length > 0) {
          _self.$confirm('是否删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            remoweData(_self.deleteList).then((response) => {
              _self.$message({
                type: 'success',
                message: '删除成功!'
              });
              _self.search()
            })


          }).catch(() => {
          });
        } else {
          _self.$message({
            type: 'info',
            message: '请选择需要删除的数据!'
          });
        }
      },
    },
    created() {
      this.queryConfList();
      this.tableLoad = true
      dataList(this.formInline, this.sort, this.orderBy, this.pageSize, this.pageNum).then((response) => {
        this.tableData3 = response.list
        //this.pages = response.pages
        this.total = response.total
        this.tableLoad = false
      })
   /*   areaList().then((response) => {
        this.areaList = response
      })*/
      this.areaList = this.$store.getters.caseType.催收区域;
      /*caseTypeList().then((response) => {
        this.caseTypeList = response
      })*/
      this.caseTypeList = this.$store.getters.caseType.案件类型;
    /*  clientList().then((response) => {
        this.clientList = response
      })*/
      this.clientList = this.$store.getters.caseType.委托方;
      /*EndList().then((response) => {
        this.EndList = response
      })*/
      this.EndList = this.$store.getters.caseType.催收结果;
      PersonList().then((response) => {
        this.PersonList = response
        this.form.PersonList = response
      })
      departmentList().then((response) => {
        this.departmentList = response
      })
      getUserTree().then(data => {
        this.selectUserTree = [data]
      })
    },
  }
</script>

<style lang="scss">
  #data-memorize-manage {
    .el-dialog__header {
      background-color: #f8f8f8;

    }

    /*  .el-tabs__content{
        margin-bottom: 50px;
        overflow-y: auto;
      }*/
    // .pagination-wrap {
    //   position: fixed;
    //   bottom: 0;
    //   z-index: 100;
    //   min-height: 40px;
    //   background-color: white;
    //   width: 100%;
    // }

    .pad {
      .el-checkbox {
        width: 24%;
        margin-right: 0px;
      }
    }

    .el-form-item--mini .el-form-item__content, .el-form-item--mini .el-form-item__labe
    .el-form--inline .el-form-item {
      line-height: 21px;
    }

    .dialog-wrap {
      .el-dialog__body {
        .el-form {
          display: flex;
          flex-wrap: wrap;

          .el-form-item {
            display: flex;
            width: 100%;

            .el-form-item__content {
              flex: 1;
              margin-left: 0 !important;

              .el-select {
                width: 100%;
              }
            }
          }
        }
      }
    }

    .el-loading-spinner .el-loading-text {
      font-size: 18px;
    }
    .el-table__body tr.current-row > td{
      border-top: 1px solid #0080ff  !important;
      border-bottom: 1px solid #0080ff  !important;
    }
  }
</style>
