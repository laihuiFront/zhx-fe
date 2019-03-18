<template>
  <div id="synergistic-repayment-record" class="page-wraper-sub"
  		v-loading="loading2"
  	   	   	  	  v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="正在导入中"
    element-loading-spinner="el-icon-loading"
   element-loading-background="rgba(0, 0, 0, 0.7)">
    <el-tabs v-model="queryForm.recordStatus" @tab-click="onClickQuery">
      <el-tab-pane label="还款记录" name="0"></el-tab-pane>
      <el-tab-pane label="已撤销" name="1"></el-tab-pane>
    </el-tabs>
    <repay-record-query 
      @reset="onClickReset"
      @query="onClickQuery"
      :queryForm="queryForm">
      <el-button type="primary" v-if="queryForm.recordStatus==='0'" @click="onClickAdd" v-has="'新建还款记录'">新建还款记录</el-button>
      <el-button type="primary" v-if="queryForm.recordStatus==='0'" @click="onClickBatchRevoke" v-has="'撤销还款'">撤销还款</el-button>
      <el-upload
        class="upload-demo upload-btn"
        :action="action+'/repayRecord/import'"
        :headers="header"
        :show-file-list="false"
        :on-success="uploadSuccess"
        style="display:inline-block;margin-left:5x;" 
        >
        <el-button type="primary" v-if="queryForm.recordStatus==='0'" v-has="'导入还款记录'">导入还款记录</el-button>
      </el-upload>
      <el-button type="primary" @click="onClickExportSelectedRecord" v-has="'导出选中数据'">导出选中数据</el-button>
      <el-button type="primary" @click="dialogExportVisible = true" v-has="'导出查询结果'">导出查询结果</el-button>
    </repay-record-query>
    <div class="statistics-wrap" v-if="queryForm.recordStatus==='0'">
      <span class="title">查询结果统计：</span>
      <span class="item">总还款额：{{sumForm.repayMoney?sumForm.repayMoney:0}}，</span>
      <span class="item">总提成值：{{sumForm.dataCase.mVal?parseFloat(sumForm.dataCase.mVal).toFixed(2):0}}，</span>
      <span class="item">总佣金额：{{sumForm.dataCase.commissionMoney?sumForm.dataCase.commissionMoney:0}}</span>
    </div>
     <el-table
      v-loading="tableLoad"
      @selection-change="onSelectRow"
      @sort-change="handleSort"
      border
      stripe
      :data="recordList"
      height="1"
      style="width: 100%"
      class="table-wrap">
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column width="120"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="dataCase.batchNo" label="批次号" show-overflow-tooltip></el-table-column>
      <el-table-column width="300" sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="dataCase.cardNo" label="卡号" show-overflow-tooltip></el-table-column>
      <el-table-column width="300"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="dataCase.identNo" label="证件号" show-overflow-tooltip></el-table-column>
      <el-table-column width="120"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="dataCase.name" label="姓名" show-overflow-tooltip></el-table-column>
      <el-table-column width="130"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="dataCase.seqNo" label="个案序列号" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editCase(scope.row.dataCase.id, scope.row.dataCase.name,scope.row.dataCase.seqNo)">{{scope.row.dataCase.seqNo}}</el-button>
        </template>
      </el-table-column>
      <el-table-column width="120"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="dataCase.client" label="委托方" show-overflow-tooltip></el-table-column>
      <el-table-column width="120"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="dataCase.overdueBillTime" label="账龄" show-overflow-tooltip></el-table-column>
      <el-table-column width="120"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="dataCase.moneyMsg" label="委案金额" show-overflow-tooltip></el-table-column>
      <el-table-column width="140"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="bankReconciliation.cpMoneyMsg" label="待银行查账金额" show-overflow-tooltip></el-table-column>
      <el-table-column width="160"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="bankReconciliation.cpDate" label="待银行查账日期" show-overflow-tooltip></el-table-column>
      <el-table-column width="120"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="collectUser.userName" label="回收催收员" show-overflow-tooltip></el-table-column>
      <el-table-column width="130"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="dataCase.enRepayAmt" label="还款金额" show-overflow-tooltip></el-table-column>
      <el-table-column width="120"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="dataCase.balance" label="余额" show-overflow-tooltip></el-table-column>
      <el-table-column width="160"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="repayDate" label="还款日期" show-overflow-tooltip></el-table-column>
      <el-table-column width="120"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="repayUser" label="还款人" show-overflow-tooltip></el-table-column>
      <el-table-column width="130"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="repayType.name" label="还款方式" show-overflow-tooltip></el-table-column>
      <el-table-column width="120"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="confirmUser.userName" label="确认人" show-overflow-tooltip></el-table-column>
      <el-table-column width="180"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="confirmTime" label="确认时间" show-overflow-tooltip></el-table-column>
      <el-table-column width="150"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="remark" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column width="120"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="dataCase.mVal" label="M值" show-overflow-tooltip></el-table-column>
      <el-table-column width="130"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="dataCase.commissionMoney" label="公司佣金" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="100"  v-if="queryForm.recordStatus==='0'"  align="center">
        <template slot-scope="scope">
          <el-button
            v-has="'撤销还款'"
            type="text"
            @click="onClickRevoke(scope.row)"
          >撤销还款</el-button>
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
        <el-form-item label="对应个案" prop="dyga">
          <el-select
            v-model="recordInfo.dataCase.id"
            filterable
            remote
            placeholder="请选择对应个案"
            :remote-method="seqNoQuery"
            :loading="loadingSeqNo">
            <el-option
              v-for="item in seqNoList"
              :key="item.id"
              :label="item.seqNo"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="回收催收员" prop="dyga">
          <el-select v-model="recordInfo.collectUser.id" filterable clearable placeholder="请选择回收催收员">
            <el-option
              v-for="item in collectionUserList"
              :key="item.id"
              :label="item.userName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="还款日期" prop="dyga">
          <el-date-picker
            clearable
            v-model="recordInfo.repayDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择还款日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="确认还款金额" prop="dyga">
          <el-input v-model="recordInfo.repayMoney" clearable placeholder="确认还款金额"></el-input>
        </el-form-item>
        <el-form-item label="还款人" prop="dyga">
           <el-input v-model="recordInfo.repayUser" clearable placeholder="请输入还款人"></el-input>
        </el-form-item>
        <el-form-item label="还款方式" prop="dyga">
          <el-select v-model="recordInfo.repayType.id" clearable placeholder="请选择还款方式">
            <el-option
              v-for="item in repayTypeList"
              :key="item.code"
              :label="item.typeName"
              :value="item.code"
            ></el-option>
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
  import {baseURL} from '@/common/js/request.js';
import {RepayRecordQuery} from './components'
import {getRepayRecordList, 
        getRepayRecordQuerySum,
        getCollectionUserList, 
        saveRepayRecord, 
        revokeRepayRecord,
        expSelectedRepayRecord,
        expAllRepayRecord,
        expCurrentRepayRecord,
        getSeqNoList,
        getRepayTypeList} from '@/common/js/api-sync'
export default {
  name: 'synergisticRepaymentRecord',
  components:{
    RepayRecordQuery
  },
  data(){
    return {
    	loading2:false,
    	fullscreenLoading:false,
      dialogExportVisible:false,
      tableLoad:false,
      action:baseURL,
      header:{Authorization:localStorage.token},
      sumForm:{dataCase:{}},
      recordList: [],
      collectionUserList: [],
      total:0,
      dialogData:{
        title:'新建还款记录',
        editVisible: false
      },
      rules: {

      },
      recordInfo:{
        dataCase:{id:null},
        collectUser:{id:null},
        repayType:{id:null}
      },
      queryForm:{
        recordStatus: '0',
        pageNum: 1,
        pageSize: 100,
        dataCase: {
          collectionArea:{},
          collectionUser:{},
          caseArea:{},
        },
        confirmUser:{}
      },
      loadingSeqNo: false,
      seqNoList: [],
      selectList:[],
      repayTypeList:[]
    }
  },
  created() {
    this.tableLoad = true
    getRepayRecordList(this.queryForm).then(data => {
      this.recordList = data.list
      this.total = data.total
      this.tableLoad = false
    })
    getRepayRecordQuerySum(this.queryForm).then(data=>{
      this.sumForm = data
    })
    getCollectionUserList().then(data => {
      this.collectionUserList = data
    })
    getRepayTypeList().then(data=>{
      this.repayTypeList = data
    })

    this.seqNoQuery()
  },
  methods: {
    uploadSuccess(res,file,fileList){
    	 this.loading2=true
					this.fullscreenLoading=true
      if (res.code ==100){
  		    this.$message({
            type: 'success',
            message: res.msg
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
        recordStatus: this.queryForm.recordStatus,
        pageNum: this.queryForm.pageNum,
        pageSize: this.queryForm.pageSize,
        dataCase: {
          collectionArea:{id: null},
          collectionUser:{id: null},
          caseArea:{id: null},
        },
        confirmUser:{name: null}
      }
    },
    handleSort({column,prop,order}){
      // console.log(prop,'@',order)
      this.queryForm.orderBy = prop
      this.queryForm.sort = order === 'ascending' ? 'asc':'desc'
      this.onClickQuery()
    },
    onClickQuery(){
      this.tableLoad  = true
      this.recordList = []
      getRepayRecordList(this.queryForm).then(data => {
        this.recordList = data.list
        this.total = data.total
        this.tableLoad = false
      })
      getRepayRecordQuerySum(this.queryForm).then(data=>{
        this.sumForm = data
      })
    },
    onClickAdd(){
      this.recordInfo = {
        dataCase:{id:null},
        collectUser:{id:null},
        repayType:{id:null}
      }
      this.$set(this.dialogData, 'editVisible', true)
    },
    onClickBatchRevoke(){
      if(!this.selectList.length){
        this.$message('请选择需要撤销的还款记录')
        return
      }
      this.$confirm('此操作将撤销还款记录，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = this.selectList.map(item => item.id)
        revokeRepayRecord(ids).then(() => {
          this.$message('还款记录撤销成功')
          this.onClickQuery()
        })
      }).catch(() => { })
    },
    onClickRevoke(record){
      this.$confirm('此操作将撤销该还款记录，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        revokeRepayRecord([record.id]).then(() => {
          this.$message('还款记录撤销成功')
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
      expSelectedRepayRecord(ids).then(() => {
        this.$message('导出成功')
         this.loading2=false
					this.fullscreenLoading=false
       
      }).catch(() => { })
    },
    handleCommand(command){
      if(command === 'current'){
      	  this.loading2=true
					this.fullscreenLoading=true
        expCurrentRepayRecord(this.queryForm).then(res => {
          this.$message('导出成功')
          this.loading2=false
					this.fullscreenLoading=false
        })
      }else {
      		  this.loading2=true
					this.fullscreenLoading=true
        expAllRepayRecord(this.queryForm).then(res => {
          this.$message('导出成功')
           this.loading2=false
					this.fullscreenLoading=false
        })
      }
      this.dialogExportVisible = false
    },
    onSelectRow(val){
      this.selectList = val
    },
    onClickCancel(){
      this.$set(this.dialogData, 'editVisible', false)
    },
    onClickSave(){
      saveRepayRecord(this.recordInfo).then(data => {
        this.$message('新增还款记录成功')
        this.onClickQuery()
        this.$set(this.dialogData, 'editVisible', false)
      })
    },
    seqNoQuery(query){
      this.loadingSeqNo = true
      getSeqNoList({
        seqNo: query,
        pageNum: 1
      }).then(data => {
        this.seqNoList = data.list
        this.loadingSeqNo = false
      })
    }
  }
}
</script>

<style lang="scss">
#synergistic-repayment-record{
  .statistics-wrap{
    margin: 12px 0 24px;
  }
  .item{
    margin-right: 12px;
    display: inline-block;
    color: #66b1ff;
  }
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
        .el-date-editor{
          width: 100%;
        }
      }
    }
  }
    .el-loading-spinner .el-loading-text {
    font-size: 18px;
    }
}
</style>


