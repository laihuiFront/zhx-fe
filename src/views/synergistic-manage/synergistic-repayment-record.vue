<template>
  <div id="synergistic-repayment-record" class="page-wraper-sub">
    <el-tabs v-model="tabName">
      <el-tab-pane label="还款记录" name="1"></el-tab-pane>
      <el-tab-pane label="已撤销" name="2"></el-tab-pane>
    </el-tabs>
    <repay-record-query 
      :queryForm="queryForm">
    </repay-record-query>
     <el-table
      @selection-change="onSelectRow"
      :data="recordList"
      style="width: 100%"
      class="table-wrap">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="createTime" label="批次号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="卡号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="证件号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="姓名" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="个案序列号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="委托方" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="账龄" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="违案金额" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="CP金额" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="CP日期" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="回收催收员" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="分配时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="还款金额" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="余额" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="还款日期" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="还款人" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="还款方式" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="确认人" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="确认时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="M值" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="公司佣金" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" v-if="tabName==='1'" show-overflow-tooltip width=“100” fixed="right">
        <el-button type="text">修改</el-button>
        <el-button type="text">撤销还款</el-button>
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
  </div>
</template>

<script>
import {RepayRecordQuery} from './components'
export default {
  name: 'synergisticRepaymentRecord',
  components:{
    RepayRecordQuery
  },
  data(){
    return {
      tabName: '1',
      recordList: [],
      total:0,
      queryForm:{
        pageNum: 1,
        pageSize: 10,
      }
    }
  },
  methods: {
    onSelectRow(){},
    onClickQuery(){}
  }
}
</script>

<style lang="scss">
#synergistic-repayment-record{}
</style>


