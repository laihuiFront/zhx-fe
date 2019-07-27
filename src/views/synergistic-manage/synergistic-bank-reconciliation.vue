<template>
  <div id="synergistic-bank-reconciliation" class="page-wraper-sub"
       v-loading="loading2"
       v-loading.fullscreen.lock="fullscreenLoading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.7)">
    <el-tabs v-model="queryForm.status" @tab-click="onClickQuery">
      <el-tab-pane label="待银行对帐" name="0"></el-tab-pane>
      <el-tab-pane label="已作废" name="1"></el-tab-pane>
    </el-tabs>
    <bank-record-query
      @reset="onClickReset"
      @query="onClickQuery"
      :queryForm="queryForm">
      <el-button type="primary" v-if="queryForm.status==='0'" @click="onClickBatchCancelBankRecon" v-has="'作废'" style="margin-right: 10px;">
        作废待银行对账记录
      </el-button>
      <el-upload
        class="upload-demo upload-btn"
        :action="action+'/bankReconciliation/import'"
        :headers="header"
        :show-file-list="false"
        :on-success="uploadSuccess"
        :on-progress="onProgress"
        style="display:inline-block;"
        accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      >
        <el-button type="primary" v-if="queryForm.status==='0'" style="margin-left:0px;margin-right: 10px;"
                   v-has="'导入待银行对账'">导入待银行对账记录
        </el-button>
      </el-upload>
      <el-button type="primary" @click="onClickExportSelectedRecord" style="margin-left:0px;margin-right: 10px;" v-has="'导出选中数据'">导出选中数据
      </el-button>
      <el-button type="primary" @click="changeRadio" style="margin-left:0px;" v-has="'导出查询结果'">导出查询结果
      </el-button>
    </bank-record-query>
    <el-table highlight-current-row v-loading="tableLoad"
              @sort-change="handleSort"
              @selection-change="onSelectRow"
              border
              stripe
              :data="recordList"
              height="1"
              style="width: 100%;min-height: 400px;margin-bottom: 40px;"
              class="table-wrap">
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column sortable="custom" width="120" align="center" :sort-orders="['ascending','descending']"
                       prop="dataCase.batchNo" label="批次号" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" width="160" align="center" :sort-orders="['ascending','descending']"
                       prop="dataCase.cardNo" label="卡号" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" width="160" align="center" :sort-orders="['ascending','descending']"
                       prop="dataCase.identNo" label="证件号" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" width="120" align="center" :sort-orders="['ascending','descending']"
                       prop="dataCase.name" label="姓名" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" min-width="160" align="center" :sort-orders="['ascending','descending']"
                       prop="dataCase.seqNo" label="个案序列号" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" size="small"
                     @click="editCase(scope.row.dataCase.id, scope.row.dataCase.name,scope.row.dataCase.seqNo)">
            {{scope.row.dataCase.seqNo}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" width="120" align="center" :sort-orders="['ascending','descending']"
                       prop="dataCase.client" label="委托方" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" width="120" align="center" :sort-orders="['ascending','descending']"
                       prop="dataCase.moneyMsg" label="委案金额" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" width="120" align="center" :sort-orders="['ascending','descending']"
                       prop="dataCase.enRepayAmtMsg" label="案件已还款" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" width="130" align="center" :sort-orders="['ascending','descending']"
                       prop="cpMoneyMsg" label="待银行对账金额" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" width="130" align="center" :sort-orders="['ascending','descending']"
                       prop="cpDate" label="待银行对账日期" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" width="100" align="center" :sort-orders="['ascending','descending']"
                       prop="repayUser" label="还款人" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" width="120" align="center" :sort-orders="['ascending','descending']"
                       prop="repayType" label="还款方式" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" width="100" align="center" :sort-orders="['ascending','descending']"
                       prop="submitUser.userName" label="提交人" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" width="140" align="center" :sort-orders="['ascending','descending']"
                       prop="submitTime" label="提交时间" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" width="100" align="center" :sort-orders="['ascending','descending']"
                       prop="remark" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="100" v-if="queryForm.status==='0'" align="center">
        <template slot-scope="scope">
          <el-button
            v-has="'作废'"
            type="text"
            @click="onClicCancelBankRecon(scope.row.id)"
          >作废待银行对账
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="onClickQuery"
      @current-change="onClickQuery"
      :current-page.sync="queryForm.pageNum"
      :page-size.sync="queryForm.pageSize"
      layout="prev, pager, next, jumper,total, sizes"
      :page-sizes="[100, 500, 2000, 10000, 1000000]"
      :total="total"
      class="pagination-wrap"
    ></el-pagination>
    <el-dialog
      :title="dialogData.title"
      class="dialog-wrap"
      :visible.sync="dialogData.editVisible"
      :close-on-click-modal="false"
      width="50%"
    >
      <el-form
        :model="recordInfo"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="add-form"
      >
        <el-form-item label="回收催收员" prop="dyga">
          <el-select v-model="recordInfo.dyga" clearable placeholder="请选择回收催收员">
            <!-- <el-option
              v-for="item in positionList"
              :key="item.job"
              :label="item.position"
              :value="item.position"
            ></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="还款日期" prop="dyga">
          <el-date-picker
            clearable
            v-model="recordInfo.joinTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择还款日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="确认还款" prop="dyga">
          <el-input v-model="recordInfo.mobile" clearable placeholder="请输入确认还款金额"></el-input>
        </el-form-item>
        <el-form-item label="还款人" prop="dyga">
          <el-input v-model="recordInfo.mobile" clearable placeholder="请输入还款人"></el-input>
        </el-form-item>
        <el-form-item label="还款方式" prop="dyga">
          <el-select v-model="recordInfo.dyga" clearable placeholder="请选择还款方式">
            <!-- <el-option
              v-for="item in positionList"
              :key="item.job"
              :label="item.position"
              :value="item.position"
            ></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="dyga" class="whole">
          <el-input type="textarea" :rows="4" v-model="recordInfo.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="footer">
        <el-button @click="onClickCancel">取 消</el-button>
        <el-button type="primary" @click="onClickSave">保 存</el-button>
      </span>
    </el-dialog>
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
        <el-checkbox v-model="exportConf.cardNo" label="3">卡号</el-checkbox>
        <el-checkbox v-model="exportConf.identNo" label="3">证件号</el-checkbox>
        <el-checkbox v-model="exportConf.name" label="1">姓名</el-checkbox>
        <el-checkbox v-model="exportConf.seqNo" label="1">个案序列号</el-checkbox>
        <el-checkbox v-model="exportConf.client" label="4">委托方</el-checkbox>
        <el-checkbox v-model="exportConf.money" label="5">委案金额</el-checkbox>
        <el-checkbox v-model="exportConf.balance" label="2">当前委案余额</el-checkbox>
        <el-checkbox v-model="exportConf.account" label="4">账号</el-checkbox>
        <el-checkbox v-model="exportConf.archiveNo" label="5">档案号</el-checkbox>
        <el-checkbox v-model="exportConf.applyOrderNo" label="5">申请单号</el-checkbox>
        <el-checkbox v-model="exportConf.cpMoney" label="5">待银行对账金额</el-checkbox>
        <el-checkbox v-model="exportConf.cpDate" label="5">待银行对账日期</el-checkbox>
        <el-checkbox v-model="exportConf.caseOdv" label="5">案件催收员</el-checkbox>
        <el-checkbox v-model="exportConf.backOdv" label="5">回收催收员</el-checkbox>
        <el-checkbox v-model="exportConf.backDept" label="5">回收部门</el-checkbox>
        <el-checkbox v-model="exportConf.submitUser" label="5">提交人</el-checkbox>
        <el-checkbox v-model="exportConf.submitTime" label="5">提交时间</el-checkbox>
        <el-checkbox v-model="exportConf.enRepayAmt" label="5">还款金额</el-checkbox>
        <el-checkbox v-model="exportConf.repayDate" label="5">还款日期</el-checkbox>
        <el-checkbox v-model="exportConf.repayBalance" label="5">还款余额</el-checkbox>
        <el-checkbox v-model="exportConf.mMoney" label="5">提成金额</el-checkbox>
        <el-checkbox v-model="exportConf.mVal" label="5">提成系数</el-checkbox>
        <el-checkbox v-model="exportConf.repayUser" label="5">还款人</el-checkbox>
        <el-checkbox v-model="exportConf.repayType" label="5">还款方式</el-checkbox>
        <el-checkbox v-model="exportConf.confirmUser" label="5">确认人</el-checkbox>
        <el-checkbox v-model="exportConf.ConfirmTime" label="5">确认时间</el-checkbox>
        <el-checkbox v-model="exportConf.repayRemark" label="5">还款备注</el-checkbox>
        <el-checkbox v-model="exportConf.accountAge" label="5">逾期账龄</el-checkbox>
        <el-checkbox v-model="exportConf.overduePeriods" label="5">逾期期数</el-checkbox>
        <el-checkbox v-model="exportConf.overdueDate" label="5">逾期日期</el-checkbox>
        <el-checkbox v-model="exportConf.overdueDays" label="5">逾期天数</el-checkbox>
        <el-checkbox v-model="exportConf.caseDate" label="5">委案日期</el-checkbox>
        <el-checkbox v-model="exportConf.expectTime" label="5">预计退案日</el-checkbox>
        <el-checkbox v-model="exportConf.province" label="5">省份</el-checkbox>
        <el-checkbox v-model="exportConf.city" label="5">城市</el-checkbox>
        <el-checkbox v-model="exportConf.county" label="5">区县</el-checkbox>
        <el-checkbox v-model="exportConf.tel" label="5">手机</el-checkbox>
        <el-checkbox v-model="exportConf.currencyType" label="5">币种</el-checkbox>
        <el-checkbox v-model="exportConf.distributeHistory" label="5">分配历史</el-checkbox>
        <el-checkbox v-model="exportConf.defaultLevel" label="5">拖欠级别</el-checkbox>
        <el-checkbox v-model="exportConf.latestOverdueMoney" label="5">案件最新欠款</el-checkbox>
        <el-checkbox v-model="exportConf.inteviewStatus" label="5">外访状态</el-checkbox>
        <el-checkbox v-model="exportConf.commissionMoney" label="5">公司佣金</el-checkbox>
        <el-checkbox v-model="exportConf.commissionRate" label="5">公司佣金比率</el-checkbox>
        <el-checkbox v-model="exportConf.caseRemarks0" label="5">案件备注1</el-checkbox>
        <el-checkbox v-model="exportConf.caseRemarks1" label="5">案件备注2</el-checkbox>
        <el-checkbox v-model="exportConf.caseRemarks2" label="5">案件备注3</el-checkbox>
        <el-checkbox v-model="exportConf.caseRemarks3" label="5">案件备注4</el-checkbox>
        <el-checkbox v-model="exportConf.caseRemarks4" label="5">案件备注5</el-checkbox>
        <el-checkbox v-model="exportConf.caseRemarks5" label="5">案件备注6</el-checkbox>
        <el-checkbox v-model="exportConf.collectionArea" label="5">催收区域</el-checkbox>
      </el-row>
      <span slot="footer" class="footer">
        <el-button @click="showExportConfVisible = false">取 消</el-button>
        <el-button type="primary" @click="exportExcel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {BankRecordQuery} from './components'
  import {baseURL} from '@/common/js/request.js';
  import {
    getBankReconList,
    cancelBankRecon,
    selectByModule,
    saveSelectFilter,
    expSelectedBankReconRecord,
    expAllBankReconRecord,
    expCurrentBankReconRecord
  } from '@/common/js/api-sync'

  export default {
    name: 'synergisticBankReconciliation',
    components: {
      BankRecordQuery
    },
    data() {
      return {
        radio: '1',
        loading2: false,
        fullscreenLoading: false,
        dialogExportVisible: false,
        exportType: 0,
        showExportConfVisible: false,
        exportConf: {},
        tableLoad: false,
        action: baseURL,
        header: {Authorization: localStorage.token},
        recordList: [],
        total: 0,
        dialogData: {
          title: '',
          editVisible: false
        },
        rules: {},
        recordInfo: {},
        queryForm: {
          odvNameFiter:'',
          status: '0',
          pageNum: 1,
          pageSize: 100,
          dataCase: {
            collectionArea: {},
            collectionUser: {},
            caseArea: {},
          },
        },
        selectList: []
      }
    },
    created() {
      this.tableLoad = true
      getBankReconList(this.queryForm).then(data => {
        this.recordList = data.list
        this.total = data.total
        this.tableLoad = false
      })
    },
    methods: {
      changeRadio() {
        /*if (this.radio == 1) {
          this.handleCommand('all')
        } else {
          this.handleCommand('current')
        }*/
        this.handleCommand('all')
      },
      onProgress() {
        this.loading2 = true
        this.fullscreenLoading = true
      },
      uploadSuccess(res, file, fileList) {
        this.loading2 = true
        this.fullscreenLoading = true
        if (res.code == 100) {
          this.$message({
            type: 'success',
            message: "导入成功"
          });
          this.onClickQuery()
          this.loading2 = false
          this.fullscreenLoading = false
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          });
        }
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
          odvNameFiter:'',
          status: this.queryForm.status,
          pageNum: this.queryForm.pageNum,
          pageSize: this.queryForm.pageSize,
          dataCase: {
            collectionArea: {id: null,ids:[]},
            collectionUser: {id: null,ids:[]},
            caseArea: {id: null},
            batchNos:[],
            clients:[],
            statuss:[],
            accountAges:[],
            collectStatuss:[],
            caseTypes:[],
            dept:null
          }
        }
      },
      onClickQuery() {
        this.tableLoad = true
        this.recordList = []
        getBankReconList(this.queryForm).then(data => {
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
      onClickBatchCancelBankRecon() {
        if (!this.selectList.length) {
          this.$message('请选择需要作废记录')
          return
        }
        this.$confirm('此操作将作废记录，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const ids = this.selectList.map(item => item.id)
          cancelBankRecon(ids).then(() => {
            this.$message('作废待银行对账记录成功')
            this.onClickQuery()
          })
        }).catch(() => {
        })
      },
      onClicCancelBankRecon(id) {
        this.$confirm('此操作将作废记录，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          cancelBankRecon([id]).then(() => {
            this.$message('作废待银行对账记录成功')
            this.onClickQuery()
          })
        }).catch(() => {
        })
      },
      saveExportBankConf() {
        let queryObj = {module: "data-bank-record-exportBank", menu: this.exportConf}
        saveSelectFilter(queryObj).then(data => {
        });
      },
      queryExportBankConfList() {
        this.$set(this, 'loading2', true)
        this.$set(this, 'fullscreenLoading', true)
        let queryObj = {module: "data-bank-record-exportBank", menu: this.exportConf}
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
      exportExcel() {
        let successNum =0;
        for(var p in this.exportConf){//遍历json对象的每个key/value对,p为key
          if (this.exportConf[p]){
            successNum = successNum+1;
          }
        }
        if (successNum==0){
          this.$message({
            type: 'error',
            message: '请先选择导出项'
          });
          this.fullscreenLoading = false
          this.loading2 = false
          return ;
        }

        if (this.exportType == 1) {
          if (!this.selectList.length) {
            this.$message('请选择需要导出的记录')
            return
          }
          this.loading2 = true
          this.fullscreenLoading = true
          const ids = this.selectList.map(item => item.id)
          expSelectedBankReconRecord(ids, this.exportConf).then(() => {
            this.$message('导出成功')
            this.loading2 = false
            this.fullscreenLoading = false
          }).catch(() => {
          })
        } else if (this.exportType == 2) {
          this.loading2 = true
          this.fullscreenLoading = true
          this.queryForm.exportConf = this.exportConf
          expCurrentBankReconRecord(this.queryForm).then(res => {
            this.$message('导出成功')
            this.loading2 = false
            this.fullscreenLoading = false
          })
        } else if (this.exportType == 3) {
          this.loading2 = true
          this.fullscreenLoading = true
          this.queryForm.exportConf = this.exportConf
          expAllBankReconRecord(this.queryForm).then(res => {
            this.$message('导出成功')
            this.loading2 = false
            this.fullscreenLoading = false
          })
        }
        this.saveExportBankConf();
        this.showExportConfVisible = false;
      },
      onClickExportSelectedRecord() {
        if (!this.selectList.length) {
          this.$message('请选择需要导出的记录')
          return
        }
        this.queryExportBankConfList();
        this.showExportConfVisible = true;
        this.exportType = 1;
      },
      onSelectRow(val) {
        this.selectList = val
      },
      onClickCancel() {
      },
      onClickSave() {
      },
      handleCommand(command) {
        this.queryExportBankConfList();

        if (command === 'current') {
          this.exportType = 2;
        } else {
          this.exportType = 3;
        }
        this.dialogExportVisible = false
      }
    }
  }
</script>

<style lang="scss">
  #synergistic-bank-reconciliation {
    .pad {
      .el-checkbox {
        width: 24%;
        margin-right: 0px;
      }
    }

    .el-tabs__content {

      overflow-y: auto;
    }

    .pagination-wrap {
      position: fixed;
      bottom: 0;
      z-index: 100;
      min-height: 40px;
      background-color: white;
      width: 100%;
    }

    .add-form {
      display: flex;
      flex-wrap: wrap;

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
        }
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
