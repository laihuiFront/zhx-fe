<template>
  <div id="synergistic-record" class="page-wraper-sub">
    <syn-record-query 
      @reset="onClickReset"
      @query="onClickQuery"
      :queryForm="queryForm">
      <el-dropdown trigger="click" @command="handleCommand">
        <el-button type="primary">导出查询结果<i class="el-icon-arrow-down el-icon--right"></i></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="all">导出全部</el-dropdown-item>
          <el-dropdown-item command="current">导出当前分页</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </syn-record-query>
    <el-table
      :data="recordList"
      style="width: 100%"
      class="table-wrap">
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
      <el-table-column prop="synergisticTime" label="协催时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="synergisticUser.name" label="协催人" show-overflow-tooltip></el-table-column>
      <el-table-column prop="synergisticResult" label="协催结果" show-overflow-tooltip></el-table-column>
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
  </div>
</template>

<script>
import {SynRecordQuery} from './components'
import {getSynergisticRecordList,expAllSynergisticRecord,expCurrentSynergisticRecord} from '@/common/js/api-sync'
export default {
  name: 'synergisticRecord',
  components:{
    SynRecordQuery
  },
  data(){
    return {
      recordList: [],
      total:0,
      queryForm:{
        pageNum: 1,
        pageSize: 100,
        applyStatus:1,
        finishStatus:1,
        synergisticType:{},
        dataCase:{
          collectionArea:{},
        },
        applyUser:{}
      }
    }
  },
  created() {
    this.onClickQuery()
  },
  methods: {
    onClickReset(){
      this.queryForm = {
        pageNum: this.queryForm.pageNum,
        pageSize: this.queryForm.pageSize,
        applyStatus:1,
        finishStatus:1,
        synergisticType:{name:null},
        dataCase: {
          collectionArea:{id: null},
        },
        applyUser:{name:null}
      }
    },
    onClickQuery(){
      getSynergisticRecordList(this.queryForm).then(data => {
        this.recordList = data.list
        this.total = data.total
      })
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
  }
}
</script>

<style lang="scss">
#synergistic-record{}
</style>


