<template>
  <div id="synergistic-application" class="page-wraper-sub">
    <el-tabs v-model="queryForm.applyStatus" @tab-click="onClickQuery">
      <el-tab-pane label="协催申请" name="0"></el-tab-pane>
      <el-tab-pane label="待办协催" name="1"></el-tab-pane>
    </el-tabs>
    <syn-record-query 
      @reset="onClickReset"
      @query="onClickQuery"
      :queryForm="queryForm">
        <el-button type="primary" v-if="queryForm.applyStatus==='0'" @click="onClickBatchApprove(1)">同意协催</el-button>
        <el-popover
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
          <el-button type="primary"  slot="reference" @click="onclickBatchFinish">完成协催</el-button>
        </el-popover>
        
        <el-button type="primary" @click="onClickBatchApprove(-1)">撤销协催</el-button>
        <el-upload
          class="upload-demo upload-btn"
          action="http://116.62.124.251/zxh/synergistic/finishedSynergisticImport"
          :headers="header"
          :show-file-list="false"
          :on-success="uploadSuccess"
          style="display:inline-block;margin-left:5x;" 
          >
          <el-button type="primary">导入完成待办协催</el-button>
        </el-upload>
        <el-upload
          class="upload-demo upload-btn"
          action="http://116.62.124.251/zxh/synergistic/synergisticRecordImport"
          :headers="header"
          :show-file-list="false"
          :on-success="uploadSuccess"
          style="display:inline-block;margin-left:5x;" 
          >
          <el-button type="primary">导入协催记录</el-button>
        </el-upload>
        <el-dropdown trigger="click" @command="handleCommand" v-if="queryForm.applyStatus==='1'">
          <el-button type="primary">导出查询结果<i class="el-icon-arrow-down el-icon--right"></i></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="all">导出全部</el-dropdown-item>
            <el-dropdown-item command="current">导出当前分页</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </syn-record-query>
    <el-table
      @selection-change="onSelectRow"
      border
      stripe
      :data="recordList"
      style="width: 100%"
      class="table-wrap">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="synergisticType" label="协催类型" show-overflow-tooltip></el-table-column>
      <el-table-column prop="dataCase.collectStatus" label="催收状态" show-overflow-tooltip></el-table-column>
      <el-table-column prop="dataCase.seqNo" label="个案序列号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="dataCase.identNo" label="证件号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="dataCase.name" label="姓名" show-overflow-tooltip></el-table-column>
      <el-table-column prop="dataCase.money" label="委案金额" show-overflow-tooltip></el-table-column>
      <el-table-column prop="dataCase.repayMoney" label="还款金额" show-overflow-tooltip></el-table-column>
      <el-table-column prop="applyContent" label="申请内容" show-overflow-tooltip></el-table-column>
      <el-table-column prop="applyTime" label="申请时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="applyUser.userName" label="催收员" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" show-overflow-tooltip width="150">
        <template slot-scope="scope">
          <el-button type="text" v-if="queryForm.applyStatus==='0'" @click="onClickApprove(scope.row, 1)">同意协催</el-button>
          <el-popover
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
            <el-button type="text"  slot="reference">完成协催</el-button>
          </el-popover>
          <el-button type="text" @click="onClickApprove(scope.row, -1)">撤销协催</el-button>
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
  </div>
</template>

<script>
import {SynRecordQuery} from './components'
import {getSynergisticRecordList,expAllSynergisticRecord,expCurrentSynergisticRecord,approveSynergisticRecord,finishSynergisticRecord} from '@/common/js/api-sync'
export default {
  name: 'synergisticApplication',
  components:{
    SynRecordQuery
  },
  data(){
    return {
      header:{Authorization:localStorage.token},
      recordList: [],
      total:0,
      queryForm:{
        pageNum: 1,
        pageSize: 100,
        applyStatus:0,
        finishStatus:0,
        synergisticType:{},
        dataCase:{
          collectionArea:{},
        },
        applyUser:{}
      },
      selectList:[],
      finishVisible:false,
      finishContent:null
    }
  },
  created() {
    this.onClickQuery()
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
        pageNum: this.queryForm.pageNum,
        pageSize: this.queryForm.pageSize,
        applyStatus:this.queryForm.applyStatus,
        finishStatus:0,
        synergisticType:{name:null},
        dataCase: {
          collectionArea:{id: null},
        },
        applyUser:{name:null}
      }
    },
    onClickQuery(){
      this.recordList = []
      getSynergisticRecordList(this.queryForm).then(data => {
        this.recordList = data.list
        this.total = data.total
      })
    },
    onSelectRow(val){
      this.selectList = val
    },
    onClickBatchApprove(applyStatus){
      if(!this.selectList.length){
        this.$message('请勾选需要操作的协催记录')
        return
      }
      const msg = applyStatus === 1 ? '确认同意协催?':'确认撤销协催?'
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = this.selectList.map(item => item.id)
        approveSynergisticRecord({ids,applyStatus}).then(() => {
          this.$message('提交成功')
          this.onClickQuery()
        })
      }).catch(() => { })
    },
    onClickApprove(record,applyStatus){
      const msg = applyStatus === 1 ? '确认同意协催?':'确认撤销协催?'
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        approveSynergisticRecord({ids:[record.id],applyStatus}).then(() => {
          this.$message('提交成功')
          this.onClickQuery()
        })
      }).catch(() => { })
    },
    handleCommand(command){
      if(command === 'current'){
        expCurrentSynergisticRecord(this.queryForm).them(res => {
          this.$message('导出成功')
        })
      }else {
        expAllSynergisticRecord(this.queryForm).them(res => {
          this.$message('导出成功')
        })
      }
    },
    onclickFinish(){

    },
    onclickBatchFinish(){
      if(!this.selectList.length){
        this.$message('请勾选需要完成的协催记录')
        return
      }
      this.finishVisible = true
    },
    onClickSaveFinish(row){
      if(!row.finishContent){
        this.$$message('请输入协催结果')
        return
      }

      this.$confirm('确认完成协催', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        finishSynergisticRecord({
          ids:[row.id],
          finishStatus: 1,
          synergisticResult:row.finishContent
        }).then(data=>{
          this.$message('提交成功'),
          this.onClickQuery()
          $set(row, 'finishVisible',false)
        })
      }).catch(() => { })
    },
    onClickBatchSaveFinish(){
      if(!this.finishContent){
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
          synergisticResult:this.finishContent
        }).then(data=>{
          this.$message('提交成功'),
          this.onClickQuery()
          this.finishVisible = false
        })
      }).catch(() => { })
    },
  }
}
</script>

<style lang="scss">
#synergistic-application{}
</style>

