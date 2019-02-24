<template>
  <div id="synergistic-record" class="page-wraper-sub">
    <syn-record-query 
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
      <el-table-column prop="createTime" label="协催类型" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="催收状态" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="个案序列号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="证件号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="姓名" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="委案金额" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="还款金额" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="申请内容" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="申请时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="催收员" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="协催时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="协催人" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="协催结果" show-overflow-tooltip></el-table-column>
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
import {SynRecordQuery} from './components'
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
        pageSize: 10,
      }
    }
  },
  methods: {
    onClickQuery(){},
    handleCommand(){}
  }
}
</script>

<style lang="scss">
#synergistic-record{}
</style>


