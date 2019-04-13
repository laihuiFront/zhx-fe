<template>
  <div id="synergistic-application" class="page-wraper-sub"
       v-loading="loading2"
       v-loading.fullscreen.lock="fullscreenLoading"
       element-loading-text="正在导入中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.7)">
    <el-tabs v-model="queryForm.applyStatus" @tab-click="onClickQuery">
      <el-tab-pane label="协催申请" name="0"></el-tab-pane>
      <el-tab-pane label="待办协催" name="1"></el-tab-pane>
    </el-tabs>
    <syn-record-query
      @reset="onClickReset"
      @query="onClickQuery"
      :queryForm="queryForm">

      <el-button type="primary" v-if="queryForm.applyStatus==='0'" @click="onClickBatchApprove(1)" v-has="'同意协催'">同意协催
      </el-button>
      <el-popover
        v-has="'完成协催'"
        v-if="queryForm.applyStatus==='1'"
        placement="bottom-start"
        trigger="manual"
        title="编辑操作记录"
        width="500"
        v-model="finishVisible">
        <div>
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入结果"
            v-model="finishContent">
          </el-input>
        </div>
        <div style="text-align: right; margin-top: 12px">
          <el-button size="mini" type="text" @click="finishVisible=false">取消</el-button>
          <el-button type="primary" size="mini" @click="onClickBatchSaveFinish">确定</el-button>
        </div>
        <el-button type="primary" slot="reference" @click="onclickBatchFinish" style="margin-right:10px;">完成协催1</el-button>
      </el-popover>

      <el-button type="primary" @click="onClickBatchApprove(-1)" v-has="'撤销协催'">撤销协催</el-button>
      <el-upload
        class="upload-demo upload-btn"
        :action="action+'/synergistic/finishedSynergisticImport'"
        :headers="header"
        :show-file-list="false"
        :on-success="uploadSuccess"
        style="display:inline-block;margin-left:10px;"
      >
        <el-button type="primary" v-has="'导入完成待办协催'">导入完成待办协催</el-button>
      </el-upload>
      <el-upload
        class="upload-demo upload-btn"
        :action="action+'/synergistic/synergisticRecordImport'"
        :headers="header"
        :show-file-list="false"
        :on-success="uploadSuccess"
        style="display:inline-block;margin-left:10px;"
      >
        <el-button type="primary" v-has="'导入协催记录'">导入协催记录</el-button>
      </el-upload>
      <!--<el-dropdown trigger="click" @command="handleCommand" v-if="queryForm.applyStatus==='1'" style="display:inline-block;margin-left:10px;" v-has="'导出查询结果'">
        <el-button type="primary">导出查询结果<i class="el-icon-arrow-down el-icon--right"></i></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="all">导出全部</el-dropdown-item>
          <el-dropdown-item command="current">导出当前分页</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>-->
      <el-button type="primary" v-has="'导出查询条件'" v-if="queryForm.applyStatus==='1'"
                 style="display:inline-block;margin-left:10px;" @click="changeRadio">导出查询结果
      </el-button>
    </syn-record-query>
    <el-table highlight-current-row v-loading="tableLoad"
              @selection-change="onSelectRow"
              @sort-change="handleSort"
              border
              stripe
              :data="recordList"
              style="width: 100%;min-height: 400px;margin-bottom: 40px;"
              height="1"
              class="table-wrap">
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column sortable="custom" :sort-orders="['ascending','descending']" prop="synergisticType.name"
                       align="center" min-width="120" label="协催类型" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" :sort-orders="['ascending','descending']" prop="dataCase.collectStatusMsg"
                       align="center" min-width="120" label="催收状态" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" :sort-orders="['ascending','descending']" prop="dataCase.seqNo" align="center"
                       min-width="160" label="个案序列号" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" size="small"
                     @click="editCase(scope.row.dataCase.id, scope.row.dataCase.name,scope.row.dataCase.seqNo)">
            {{scope.row.dataCase.seqNo}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" :sort-orders="['ascending','descending']" prop="dataCase.identNo"
                       align="center" min-width="160" label="证件号" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" :sort-orders="['ascending','descending']" prop="dataCase.name" align="center"
                       min-width="120" label="姓名" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" :sort-orders="['ascending','descending']" prop="dataCase.moneyMsg"
                       align="center" min-width="120" label="委案金额" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" :sort-orders="['ascending','descending']" prop="dataCase.repayMoneyMsg"
                       align="center" min-width="120" label="还款金额" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" :sort-orders="['ascending','descending']" prop="applyContent" align="center"
                       min-width="150" label="申请内容" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" :sort-orders="['ascending','descending']" prop="applyTime" align="center"
                       min-width="140" label="申请时间" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" :sort-orders="['ascending','descending']" prop="applyUser.userName"
                       align="center" min-width="140" label="催收员" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" show-overflow-tooltip width="150" align="center">
        <template slot-scope="scope">
          <el-button type="text" v-if="queryForm.applyStatus==='0'" @click="onClickApprove(scope.row, 1)"
                     v-has="'同意协催'">同意协催
          </el-button>
          <el-popover
            v-has="'完成协催'"
            v-if="queryForm.applyStatus==='1'"
            placement="bottom-end"
            trigger="click"
            title="编辑操作记录"

            width="500"
            v-model="scope.row.finishVisible">
            <div>
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入结果"
                v-model="scope.row.finishContent">
              </el-input>
            </div>
            <div style="text-align: right; margin-top: 12px">
              <el-button size="mini" type="text" @click="$set(scope.row, 'finishVisible',false)">取消</el-button>
              <el-button type="primary" size="mini" @click="onClickSaveFinish(scope.row)">确定</el-button>
            </div>
            <el-button type="text" slot="reference">完成协催</el-button>
          </el-popover>
          <el-button type="text" @click="onClickApprove(scope.row, -1)" v-has="'撤销协催'">撤销协催</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="onClickQuery"
      @current-change="onClickQuery"
      :current-page.sync="queryForm.pageNum"
      :page-size.sync="queryForm.pageSize"
      :page-sizes="[100, 500, 2000, 10000, 1000000]"
      layout="prev, pager, next, jumper,total, sizes"
      :total="total"
      class="pagination-wrap"
    ></el-pagination>
    <el-dialog
      title="导出查询结果"
      :visible.sync="dialogVisible1"
      width="30%"
      center
    >
      <el-row :gutter="20">
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-radio v-model="radio" label="1">按查询条件全部导出</el-radio>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-radio v-model="radio" label="2">按查询条件导出当前分页</el-radio>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="footer">
    <el-button @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="changeRadio">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog
      title="导出选择"
      :visible.sync="showExportConfVisible"
      width="60%"
      center
    >
      <div style="margin-bottom: 10px;"><span @click="selectAllExport" style="cursor: pointer;">全选</span></div>
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
  import {baseURL} from '@/common/js/request.js';
  import {
    getSynergisticRecordList,
    expAllSynergisticRecord,
    saveSelectFilter,
    selectByModule,
    expCurrentSynergisticRecord,
    approveSynergisticRecord,
    finishSynergisticRecord
  } from '@/common/js/api-sync'

  export default {
    name: 'synergisticApplication',
    components: {
      SynRecordQuery
    },
    data() {
      return {
        radio: "1",
        dialogVisible1: false,
        loading2: false,
        fullscreenLoading: false,
        tableLoad: false,
        showExportConfVisible: false,
        exportConf: {},
        exportType: 0,
        action: baseURL,
        header: {Authorization: localStorage.token},
        recordList: [],
        total: 0,
        queryForm: {
          pageNum: 1,
          pageSize: 100,
          applyStatus: 0,
          finishStatus: 0,
          synergisticType: {},
          dataCase: {
            collectionArea: {},
          },
          applyUser: {}
        },
        selectList: [],
        finishVisible: false,
        finishContent: null
      }
    },
    created() {
      this.onClickQuery();
    },
    methods: {
      saveExportApplyConf() {
        let queryObj = {module: "data-application-manage-exportApply", menu: this.exportConf}
        saveSelectFilter(queryObj).then(data => {
        });
      },
      queryExportApplyConfList() {
        let queryObj = {module: "data-application-manage-exportApply", menu: this.exportConf}
        selectByModule(queryObj).then(data => {
          if (data) {
            this.exportConf = JSON.parse(data.menu);
          }
        });
      },
      selectAllExport(){
        this._selectAllInit('exportConf');
        for(var p in this.exportConf){//遍历json对象的每个key/value对,p为key
          this.exportConf[p] = true;
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
          this.queryForm.exportConf = this.exportConf;
          expAllSynergisticRecord(this.queryForm).then(res => {
            this.$message('导出成功')
            this.loading2 = false
            this.fullscreenLoading = false
          })
        }else if (this.exportType==3){
          this.queryForm.exportConf = this.exportConf;
          expCurrentSynergisticRecord(this.queryForm).then(res => {
            this.$message('导出成功')
            this.loading2 = false
            this.fullscreenLoading = false
          })
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
        //this.dialogVisible1 = false;
        this.showExportConfVisible = true;
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
      uploadSuccess(res, file, fileList) {
        this.loading2 = true
        this.fullscreenLoading = true
        if (res.code == 100) {
          this.$message({
            type: 'success',
            message: res.msg
          });
          this.onClickQuery()
          this.loading2 = false
          this.fullscreenLoading = false
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          });
          this.loading2 = false
          this.fullscreenLoading = false
        }
      },
      onClickReset() {
        this.queryForm = {
          pageNum: this.queryForm.pageNum,
          pageSize: this.queryForm.pageSize,
          applyStatus: this.queryForm.applyStatus,
          finishStatus: 0,
          synergisticType: {name: null},
          dataCase: {
            collectionArea: {id: null},
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
      onSelectRow(val) {
        this.selectList = val
      },
      onClickBatchApprove(applyStatus) {
        if (!this.selectList.length) {
          this.$message('请勾选需要操作的协催记录')
          return
        }
        const msg = applyStatus === 1 ? '确认同意协催?' : '确认撤销协催?'
        this.$confirm(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const ids = this.selectList.map(item => item.id)
          approveSynergisticRecord({ids, applyStatus}).then(() => {
            this.$message('提交成功')
            this.onClickQuery()
          })
        }).catch(() => {
        })
      },
      onClickApprove(record, applyStatus) {
        const msg = applyStatus === 1 ? '确认同意协催?' : '确认撤销协催?'
        this.$confirm(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          approveSynergisticRecord({ids: [record.id], applyStatus}).then(() => {
            this.$message('提交成功')
            this.onClickQuery()
          })
        }).catch(() => {
        })
      },
      handleCommand(command) {
        this.loading2 = true
        this.fullscreenLoading = true
        if (command === 'current') {
          expCurrentSynergisticRecord(this.queryForm).then(res => {
            this.$message('导出成功')
            this.loading2 = false
            this.fullscreenLoading = false
          })
        } else {
          expAllSynergisticRecord(this.queryForm).then(res => {
            this.$message('导出成功')
            this.loading2 = false
            this.fullscreenLoading = false
          })
        }
      },
      onclickFinish() {

      },
      onclickBatchFinish() {
        if (!this.selectList.length) {
          this.$message('请勾选需要完成的协催记录')
          return
        }
        this.finishVisible = true
      },
      onClickSaveFinish(row) {
        if (!row.finishContent) {
          this.$$message('请输入协催结果')
          return
        }

        this.$confirm('确认完成协催', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          finishSynergisticRecord({
            ids: [row.id],
            finishStatus: 1,
            synergisticResult: row.finishContent
          }).then(data => {
            this.$message('提交成功'),
              this.onClickQuery()
            $set(row, 'finishVisible', false)
          })
        }).catch(() => {
        })
      },
      onClickBatchSaveFinish() {
        if (!this.finishContent) {
          this.$$message('请输入协催结果')
          return
        }

        this.$confirm('确认完成协催', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const ids = this.selectList.map(item => item.id)
          finishSynergisticRecord({
            ids,
            finishStatus: 1,
            synergisticResult: this.finishContent
          }).then(data => {
            this.$message('提交成功'),
              this.onClickQuery()
            this.finishVisible = false
          })
        }).catch(() => {
        })
      },
    }
  }
</script>

<style lang="scss">
  #synergistic-application {
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

  }
</style>

