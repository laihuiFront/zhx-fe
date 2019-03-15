<template>
  <div id="synergistic-bank-reconciliation" class="page-wraper-sub"
  	v-loading="loading2"
  	   	   	  	  v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="正在导入中"
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
      <el-button type="primary" v-if="queryForm.status==='0'" @click="onClickBatchCancelBankRecon" v-has="'作废'">作废待银行查账金额</el-button>
      <el-upload
        class="upload-demo upload-btn"
        :action="action+'/bankReconciliation/import'"
        :headers="header"
        :show-file-list="false"
        :on-success="uploadSuccess"
        style="display:inline-block;margin-left:5x;" 
        >
        <el-button type="primary" v-if="queryForm.status==='0'" v-has="'导入待银行对账'">导入待银行查账</el-button>
      </el-upload>
      <el-button type="primary" @click="onClickExportSelectedRecord" v-has="'导出选中数据'">导出选中数据</el-button>
      <el-button type="primary" @click="dialogExportVisible = true" v-has="'导出查询结果'">导出查询结果</el-button>
    </bank-record-query>
    <el-table
      v-loading="tableLoad"
      @sort-change="handleSort"
      @selection-change="onSelectRow"
      border
      stripe
      :data="recordList"
      height="1"
      style="width: 100%"
      class="table-wrap">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column sortable="custom" width="100" :sort-orders="['ascending','descending']" prop="dataCase.batchNo" label="批次号" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" width="80" :sort-orders="['ascending','descending']" prop="dataCase.cardNo" label="卡号" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" width="100" :sort-orders="['ascending','descending']" prop="dataCase.identNo" label="证件号" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" width="80" :sort-orders="['ascending','descending']" prop="dataCase.name" label="姓名" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" width="120" :sort-orders="['ascending','descending']" prop="dataCase.seqNo" label="个案序列号" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editCase(scope.row.dataCase.id, scope.row.dataCase.name,scope.row.dataCase.seqNo)">{{scope.row.dataCase.seqNo}}</el-button>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" width="100" :sort-orders="['ascending','descending']" prop="dataCase.client" label="委托方" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" width="120" :sort-orders="['ascending','descending']" prop="dataCase.moneyMsg" label="委案金额" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" width="140" :sort-orders="['ascending','descending']" prop="dataCase.repayMoneyMsg" label="案件已还款" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" width="160" :sort-orders="['ascending','descending']" prop="cpMoneyMsg" label="待银行查账金额" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" width="160" :sort-orders="['ascending','descending']" prop="cpDate" label="待银行查账日期" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" width="100" :sort-orders="['ascending','descending']" prop="repayUser" label="还款人" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" width="120" :sort-orders="['ascending','descending']" prop="repayType" label="还款方式" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" width="100" :sort-orders="['ascending','descending']" prop="submitUser.name" label="提交人" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" width="100" :sort-orders="['ascending','descending']" prop="submitTime" label="提交时间" show-overflow-tooltip></el-table-column>
      <el-table-column sortable="custom" width="100" :sort-orders="['ascending','descending']" prop="remark" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="100" v-if="queryForm.status==='0'">
        <template slot-scope="scope">
          <el-button
            v-has="'作废'"
            type="text"
            @click="onClicCancelBankRecon(scope.row.id)"
          >作废待银行查账</el-button>
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
          <el-input v-model="recordInfo.mobile" clearable placeholder="确认还款金额"></el-input>
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
    >
      <el-form :inline="true">
        <el-form-item>
          <el-button @click="handleCommand('all')">按查询条件全部导出</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleCommand('current')">按查询条件导出当前分页</el-button>
        </el-form-item>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogExportVisible = false">取 消</el-button>
        </span>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {BankRecordQuery} from './components'
import {baseURL} from '@/common/js/request.js';
import {getBankReconList,cancelBankRecon,expSelectedBankReconRecord,expAllBankReconRecord,expCurrentBankReconRecord} from '@/common/js/api-sync'
export default {
  name: 'synergisticBankReconciliation',
  components:{
    BankRecordQuery
  },
  data(){
    return {
    	loading2:false,
    	fullscreenLoading:false,
      dialogExportVisible:false,
      tableLoad:false,
      action:baseURL,
      header:{Authorization:localStorage.token},
      recordList: [],
      total:0,
      dialogData:{
        title:'',
        editVisible: false
      },
      rules: {

      },
      recordInfo:{},
      queryForm:{
        status: '0',
        pageNum: 1,
        pageSize: 100,
        dataCase: {
          collectionArea:{},
          collectionUser:{},
          caseArea:{},
        },
      },
      selectList:[]
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
     uploadSuccess(res,file,fileList){
     	this.loading2=true
					this.fullscreenLoading=true
      if (res.code ==100){
  		    this.$message({
            type: 'success',
            message: "导入成功"
          });
           this.onClickQuery()
           this.loading2=false
					this.fullscreenLoading=false
      }else{
        this.$message({
          type: 'error',
          message: res.msg
        });
      }
    },
    editCase(id, name, seqNo){
      this.$router.push({
        path:'case-detail',
        query:{
          id,
          name,
          seqNo
        }
      })
    },
    onClickReset(){
      this.queryForm = {
        status: this.queryForm.status,
        pageNum: this.queryForm.pageNum,
        pageSize: this.queryForm.pageSize,
        dataCase: {
          collectionArea:{id: null},
          collectionUser:{id: null},
          caseArea:{id: null},
        }
      }
    },
    onClickQuery(){
      this.tableLoad = true
      this.recordList = []
      getBankReconList(this.queryForm).then(data => {
        this.recordList = data.list
        this.total = data.total
        this.tableLoad = false
      })
    },
    handleSort({column,prop,order}){
      // console.log(prop,'@',order)
      this.queryForm.orderBy = prop
      this.queryForm.sort = order === 'ascending' ? 'asc':'desc'
      this.onClickQuery()
    },
    onClickBatchCancelBankRecon(){
      if(!this.selectList.length){
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
          this.$message('作废待银行查账成功')
          this.onClickQuery()
        })
      }).catch(() => { })
    },
    onClicCancelBankRecon(id){
      this.$confirm('此操作将作废记录，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cancelBankRecon([id]).then(() => {
          this.$message('作废待银行查账成功')
          this.onClickQuery()
        })
      }).catch(() => { })
    },
    onClickExportSelectedRecord(){
      if(!this.selectList.length){
        this.$message('请选择需要导出的记录')
        return
      }
      this.loading2=true
					this.fullscreenLoading=true
      const ids = this.selectList.map(item => item.id)
      expSelectedBankReconRecord(ids).then(() => {
        this.$message('导出成功')
        this.loading2=false
					this.fullscreenLoading=false
      }).catch(() => { })
    },
    onSelectRow(val){
      this.selectList = val
    },
    onClickCancel(){},
    onClickSave(){},
    handleCommand(command){
      if(command === 'current'){
      	this.loading2=true
					this.fullscreenLoading=true
        expCurrentBankReconRecord(this.queryForm).then(res => {
          this.$message('导出成功')
          this.loading2=false
					this.fullscreenLoading=false
        })
      }else {
        expAllBankReconRecord(this.queryForm).then(res => {
          this.$message('导出成功')
          this.loading2=false
					this.fullscreenLoading=false
        })
      }
      this.dialogExportVisible = false
    }
  }
}
</script>

<style lang="scss">
#synergistic-bank-reconciliation{
  .add-form {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      display: flex;
      width: 50%;
      &.whole{
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
}
</style>


