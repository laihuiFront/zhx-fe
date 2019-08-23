<template>
  <div id="synergistic-record" class="page-wraper-sub"
       v-loading="loading2"
       v-loading.fullscreen.lock="fullscreenLoading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.7)">
    <syn-record-query
      @reset="onClickReset"
      @query="onClickQuery"
      :queryForm="queryForm">
      <el-button type="primary" @click="changeRadio" v-has="'导出查询结果'">导出查询结果</el-button>
    </syn-record-query>
    <el-table highlight-current-row v-loading="tableLoad"
              @sort-change="handleSort"
              :data="recordList"
              border
              stripe
              style="width: 100%"
              height="1"
              class="table-wrap">
      <el-table-column sortable="custom" :sort-orders="['ascending','descending']" min-width="120" align="center"
                       prop="synergisticType.name" label="协催类型" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" :sort-orders="['ascending','descending']" min-width="120" align="center"
                       prop="dataCase.collectStatusMsg" label="催收状态" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" :sort-orders="['ascending','descending']" min-width="160" align="center"
                       prop="dataCase.seqNo" label="个案序列号" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" size="small"
                     @click="editCase(scope.row.dataCase.id, scope.row.dataCase.name,scope.row.dataCase.seqNo)">
            {{scope.row.dataCase.seqNo}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" :sort-orders="['ascending','descending']" min-width="160" align="center"
                       prop="dataCase.identNo" label="证件号" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" :sort-orders="['ascending','descending']" min-width="130" align="center"
                       prop="dataCase.name" label="姓名" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" :sort-orders="['ascending','descending']" min-width="120" align="center"
                       prop="dataCase.moneyMsg" label="委案金额" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" :sort-orders="['ascending','descending']" min-width="120" align="center"
                       prop="dataCase.repayMoneyMsg" label="还款金额" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" :sort-orders="['ascending','descending']" min-width="150" align="center"
                       prop="applyContent" label="申请内容" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" :sort-orders="['ascending','descending']" min-width="140" align="center"
                       prop="applyTime" label="申请时间" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" :sort-orders="['ascending','descending']" min-width="120" align="center"
                       prop="applyUser.userName" label="催收员" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" :sort-orders="['ascending','descending']" min-width="140" align="center"
                       prop="synergisticTime" label="协催时间" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" :sort-orders="['ascending','descending']" min-width="120" align="center"
                       prop="synergisticUser.userName" label="协催人" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" :sort-orders="['ascending','descending']" min-width="140" align="center"
                       prop="synergisticResult" label="协催结果" show-overflow-tooltip></el-table-column>
    </el-table>
    <el-pagination
      @size-change="onClickQuery"
      @current-change="onClickQuery"
      :current-page.sync="queryForm.pageNum"
      :page-size.sync="queryForm.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[100, 500, 2000, 10000, 1000000]"
      :total="total"
      class="pagination-wrap"
    ></el-pagination>
    <el-dialog
      title="导出查询结果"
      :visible.sync="dialogExportVisible"
      width="30%"
      center
      :close-on-click-modal="false"
    >
      <el-form :inline="true">
        <el-form-item>
          <el-radio label="1" v-model="radio">按查询条件全部导出</el-radio>
        </el-form-item>
        <el-form-item>
          <el-radio label="2" v-model="radio">按查询条件导出当前分页</el-radio>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
   <el-button @click="dialogExportVisible = false">取 消</el-button>
    <el-button type="primary" @click="changeRadio">确 定</el-button>  
        </span>
    </el-dialog>


    <el-dialog
      title="导出选择"
      :visible.sync="showExportConfVisible"
      width="60%"
      center
      :close-on-click-modal="false"
    >
      <div style="margin-bottom: 10px;"><span @click="selectAllExport" style="cursor: pointer;">全选</span><span @click="selectUnAllExport" style="cursor: pointer;margin-left:10px;">反选</span></div>
      <el-row class="pad" ref="boxWrapper">
        <el-checkbox v-model="exportConf.id" label="2">ID</el-checkbox>
        <el-checkbox v-model="exportConf.batchNo" label="3">批次号</el-checkbox>
        <el-checkbox v-model="exportConf.client" label="3">委托方</el-checkbox>
        <el-checkbox v-model="exportConf.seqNo" label="3">个案序列号</el-checkbox>
        <el-checkbox v-model="exportConf.name" label="1">姓名</el-checkbox>
        <el-checkbox v-model="exportConf.synergisticType" label="4">协催类型</el-checkbox>
        <el-checkbox v-model="exportConf.applyContent" label="5">申请内容</el-checkbox>
        <el-checkbox v-model="exportConf.applyTime" label="2">申请时间</el-checkbox>
        <el-checkbox v-model="exportConf.synergisticTime" label="4">协催时间</el-checkbox>
        <el-checkbox v-model="exportConf.synergisticUser" label="5">协催人</el-checkbox>
        <el-checkbox v-model="exportConf.synergisticResult" label="5">协催结果</el-checkbox>
        <el-checkbox v-model="exportConf.identNo" label="5">证件号</el-checkbox>
        <el-checkbox v-model="exportConf.cardNo" label="5">卡号</el-checkbox>
        <el-checkbox v-model="exportConf.cardType" label="5">卡类</el-checkbox>
        <el-checkbox v-model="exportConf.account" label="5">账号</el-checkbox>
        <el-checkbox v-model="exportConf.currencyType" label="5">币种</el-checkbox>
        <el-checkbox v-model="exportConf.archiveNo" label="5">档案号</el-checkbox>
        <el-checkbox v-model="exportConf.applyOrderNo" label="5">申请单号</el-checkbox>
        <el-checkbox v-model="exportConf.money" label="5">委案金额</el-checkbox>
        <el-checkbox v-model="exportConf.enRepayAmt" label="5">还款金额</el-checkbox>
        <el-checkbox v-model="exportConf.principle" label="5">本金</el-checkbox>
        <el-checkbox v-model="exportConf.lastRepayDate" label="5">最后还款日</el-checkbox>
        <el-checkbox v-model="exportConf.caseDate" label="5">委案日期</el-checkbox>
        <el-checkbox v-model="exportConf.collectionUser" label="5">催收员</el-checkbox>
        <el-checkbox v-model="exportConf.creditLine" label="5">信用额度</el-checkbox>
        <el-checkbox v-model="exportConf.homeAddress" label="5">家庭地址</el-checkbox>
        <el-checkbox v-model="exportConf.homeTelNumber" label="5">家庭号码</el-checkbox>
        <el-checkbox v-model="exportConf.unitName" label="5">单位名称</el-checkbox>
        <el-checkbox v-model="exportConf.unitAddress" label="5">单位地址</el-checkbox>
        <el-checkbox v-model="exportConf.tel" label="5">手机</el-checkbox>
        <el-checkbox v-model="exportConf.unitTelNumber" label="5">单位号码</el-checkbox>
        <el-checkbox v-model="exportConf.latestOverdueMoney" label="5">最新欠款</el-checkbox>
      </el-row>
      <span slot="footer" class="footer">
        <el-button @click="showExportConfVisible = false">取 消</el-button>
        <el-button type="primary" @click="exportExcel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {SynRecordQuery} from './components'
  import {getSynergisticRecordList,saveSelectFilter,selectByModule, expAllSynergisticRecord, expCurrentSynergisticRecord} from '@/common/js/api-sync'

  export default {
    name: 'synergisticRecord',
    components: {
      SynRecordQuery
    },
    data() {
      return {
        radio: '1',
        loading2: false,
        fullscreenLoading: false,
        dialogExportVisible: false,
        tableLoad: false,
        recordList: [],
        showExportConfVisible: false,
        exportConf: {},
        exportType: 0,
        total: 0,
        queryForm: {
          pageNum: 1,
          pageSize: 100,
          applyStatus: 1,
          finishStatus: 1,
          synergisticType: {},
          dataCase: {
            collectionArea: {},
          },
          applyUser: {}
        }
      }
    },
    created() {
      this.onClickQuery()
    },
    methods: {
      saveExportApplyConf() {
        let queryObj = {module: "data-application-record-exportApply", menu: this.exportConf}
        saveSelectFilter(queryObj).then(data => {
        });
      },
      queryExportApplyConfList() {
        this.$set(this, 'loading2', true)
        this.$set(this, 'fullscreenLoading', true)
        let queryObj = {module: "data-application-record-exportApply", menu: this.exportConf}
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
          this.handleCommand('all')
        }else if (this.exportType==3){
          this.handleCommand('current')
        }
        this.saveExportApplyConf();
        this.showExportConfVisible = false;
      },
      changeRadio() {
        /*if (this.radio == 1) {
          this.exportType=2;
        } else {
          this.exportType=3;
        }*/
        this.exportType=2;
        this.queryExportApplyConfList();
        //this.dialogExportVisible = false;

      },
      editCase(id, name, seqNo) {
        this.$router.push({
          path: 'case-detail',
          query: {
            id,
            name,
            seqNo
          }
        })
      },
      onClickReset() {
        this.queryForm = {
          pageNum: this.queryForm.pageNum,
          pageSize: this.queryForm.pageSize,
          applyStatus: 1,
          finishStatus: 1,
          synergisticType: {name: null,names:[]},
          dataCase: {
            collectionArea: {id: null,ids:[]},
            batchNos:[],
            clients:[],
            collectStatuss:[],
            statuss:[]
          },
          applyUser: {name: null}
        }
      },
      onClickQuery() {
        this.tableLoad = true
        this.recordList = []
        getSynergisticRecordList(this.queryForm).then(data => {
          this.recordList = data.list
          this.total = data.total
          this.tableLoad = false
        })
      },
      handleSort({column, prop, order}) {
        // console.log(prop,'@',order)
        this.queryForm.orderBy = prop
        this.queryForm.sort = order === 'ascending' ? 'asc' : 'desc'
        this.onClickQuery()
      },
      handleCommand(command) {
        this.loading2 = true
        this.fullscreenLoading = true
        if (command === 'current') {
          this.queryForm.exportConf = this.exportConf;
          expCurrentSynergisticRecord(this.queryForm).then(res => {
            this.$message('导出成功')
            this.loading2 = false
            this.fullscreenLoading = false
          })
        } else {
          this.queryForm.exportConf = this.exportConf;
          expAllSynergisticRecord(this.queryForm).then(res => {
            this.$message('导出成功')
            this.loading2 = false
            this.fullscreenLoading = false
          })
        }
        this.dialogExportVisible = false
      },
    }
  }
</script>

<style lang="scss">
  #synergistic-record {
    .pad {
      .el-checkbox {
        width: 24%;
        margin-right: 0px;
      }
    }
    .el-table__body tr.current-row > td{
      border-top: 1px solid #0080ff  !important;
      border-bottom: 1px solid #0080ff  !important;
    }
  }
</style>


