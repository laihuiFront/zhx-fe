<template>
  <div id="synergistic-bank-reconciliation" class="page-wraper-sub">
    <el-tabs v-model="queryForm.status" @tab-click="onClickQuery">
      <el-tab-pane label="待银行对帐" name="0"></el-tab-pane>
      <el-tab-pane label="已作废" name="1"></el-tab-pane>
    </el-tabs>
    <bank-record-query 
      @reset="onClickReset"
      @query="onClickQuery"
      :queryForm="queryForm">
      <el-button type="primary" v-if="queryForm.status==='0'" @click="onClickBatchCancelBankRecon">作废CP</el-button>
      <el-upload
        class="upload-demo upload-btn"
        action="http://116.62.124.251/zxh/bankReconciliation/cpImport"
        :headers="header"
        :show-file-list="false"
        :on-success="uploadSuccess"
        style="display:inline-block;margin-left:5x;" 
        >
        <el-button type="primary" v-if="queryForm.status==='0'">导入CP</el-button>
      </el-upload>
      <el-button type="primary" @click="onClickExportSelectedRecord">导出选中数据</el-button>
      <el-dropdown trigger="click" @command="handleCommand">
        <el-button type="primary">导出查询结果<i class="el-icon-arrow-down el-icon--right"></i></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="all">导出全部</el-dropdown-item>
          <el-dropdown-item command="current">导出当前分页</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </bank-record-query>
    <el-table
      @selection-change="onSelectRow"
      :data="recordList"
      style="width: 100%"
      class="table-wrap">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="dataCase.batchNo" label="批次号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="dataCase.cardNo" label="卡号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="dataCase.identNo" label="证件号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="dataCase.name" label="姓名" show-overflow-tooltip></el-table-column>
      <el-table-column prop="dataCase.seqNo" label="个案序列号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="dataCase.client" label="委托方" show-overflow-tooltip></el-table-column>
      <el-table-column prop="dataCase.money" label="委案金额" show-overflow-tooltip></el-table-column>
      <el-table-column prop="dataCase.repayMoney" label="案件已还款" show-overflow-tooltip></el-table-column>
      <el-table-column prop="cpMoney" label="CP金额" show-overflow-tooltip></el-table-column>
      <el-table-column prop="cpDate" label="CP日期" show-overflow-tooltip></el-table-column>
      <el-table-column prop="repayUser" label="还款人" show-overflow-tooltip></el-table-column>
      <el-table-column prop="repayType" label="还款方式" show-overflow-tooltip></el-table-column>
      <el-table-column prop="submitUser.name" label="提交人" show-overflow-tooltip></el-table-column>
      <el-table-column prop="submitTime" label="提交时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="100" v-if="queryForm.status==='0'">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="onClicCancelBankRecon(scope.row.id)"
          >作废CP</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="onClickQuery"
      @current-change="onClickQuery"
      :current-page.sync="queryForm.pageNum"
      :page-size.sync="queryForm.pageSize"
      layout="prev, pager, next, jumper,total, sizes"
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
  </div>
</template>

<script>
import {BankRecordQuery} from './components'
import {getBankReconList,cancelBankRecon,expSelectedBankReconRecord,expAllBankReconRecord,expCurrentBankReconRecord} from '@/common/js/api-sync'
export default {
  name: 'synergisticBankReconciliation',
  components:{
    BankRecordQuery
  },
  data(){
    return {
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
        pageSize: 10,
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
    getBankReconList(this.queryForm).then(data => {
      this.recordList = data.list
      this.total = data.total
    })
  },
  methods: {
     uploadSuccess(res,file,fileList){
      if (res.code ==100){
  		    this.$message({
            type: 'success',
            message: res.msg
          });
           this.onClickQuery()
      }else{
        this.$message({
          type: 'error',
          message: res.msg
        });
      }
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
      getBankReconList(this.queryForm).then(data => {
        this.recordList = data.list
        this.total = data.total
      })
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
          this.$message('作废CP成功')
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
          this.$message('作废CP成功')
          this.onClickQuery()
        })
      }).catch(() => { })
    },
    onClickExportSelectedRecord(){
      if(!this.selectList.length){
        this.$message('请选择需要导出的记录')
        return
      }
      const ids = this.selectList.map(item => item.id)
      expSelectedBankReconRecord(ids).then(() => {
        this.$message('导出成功')
      }).catch(() => { })
    },
    onSelectRow(val){
      this.selectList = val
    },
    onClickCancel(){},
    onClickSave(){},
    handleCommand(){
      if(command === 'current'){
        expCurrentBankReconRecord(this.queryForm).them(res => {
          this.$message('导出成功')
        })
      }else {
        expAllBankReconRecord(this.queryForm).them(res => {
          this.$message('导出成功')
        })
      }
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


