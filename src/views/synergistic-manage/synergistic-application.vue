<template>
  <div id="synergistic-application" class="page-wraper-sub">
    <el-tabs v-model="tabName">
      <el-tab-pane label="协催申请" name="1"></el-tab-pane>
      <el-tab-pane label="待办协催" name="2"></el-tab-pane>
    </el-tabs>
    <syn-record-query 
      :queryForm="queryForm">
      <el-button type="primary" v-if="tabName==='1'">同意协催</el-button>
      <el-button type="primary" v-if="tabName==='2'">完成协催</el-button>
      <el-button type="primary">撤销协催</el-button>
      <el-dropdown trigger="click" @command="handleCommand" v-if="tabName==='2'">
        <el-button type="primary">导出查询结果<i class="el-icon-arrow-down el-icon--right"></i></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="all">导出全部</el-dropdown-item>
          <el-dropdown-item command="current">导出当前分页</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </syn-record-query>
    <el-table
      @selection-change="onSelectRow"
      :data="recordList"
      style="width: 100%"
      class="table-wrap">
      <el-table-column type="selection" width="50"></el-table-column>
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
      <el-table-column label="操作" show-overflow-tooltip width=“100” fixed="right">
        <el-button type="text" v-if="tabName==='1'">同意协催</el-button>
        <el-button type="text" v-if="tabName==='2'">完成协催</el-button>
        <el-button type="text">撤销协催</el-button>
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
import {SynRecordQuery} from './components'
export default {
  name: 'synergisticApplication',
  components:{
    SynRecordQuery
  },
  data(){
    return {
      tabName:'1',
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
    onClickQuery(){},
    handleCommand(){}
  }
}
</script>

<style lang="scss">
#synergistic-application{}
</style>

