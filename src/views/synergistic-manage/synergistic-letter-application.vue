<template>
  <div id="synergistic-letter-application" class="page-wraper-sub">
    <el-tabs v-model="tabName">
      <el-tab-pane label="信函申请" name="1"></el-tab-pane>
      <el-tab-pane label="待发信函" name="2"></el-tab-pane>
    </el-tabs>
    <letter-application-query 
      :queryForm="queryForm">
      <el-button type="primary">导入信函记录</el-button>
      <el-button type="primary" v-if="tabName==='1'">同意协催</el-button>
      <el-button type="primary" v-if="tabName==='2'">批量确认信函</el-button>
      <el-button type="primary">撤销信函</el-button>
      <el-button type="primary" v-if="tabName==='2'">导出选中数据</el-button>
      <el-dropdown trigger="click" @command="handleCommand" v-if="tabName==='2'">
        <el-button type="primary">导出查询结果<i class="el-icon-arrow-down el-icon--right"></i></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="all">导出全部</el-dropdown-item>
          <el-dropdown-item command="current">导出当前分页</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </letter-application-query>
    <el-table
      @selection-change="onSelectRow"
      :data="recordList"
      style="width: 100%"
      class="table-wrap">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="createTime" label="ID" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="催收状态" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="个案序列号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="姓名" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="委案金额" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="还款金额" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="地址" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="信函次数" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="申请内容" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="地址类型" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="信函模板" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="联系人" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="申请时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="申请人" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="协催时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="协催人" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="协催结果" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" show-overflow-tooltip width=“100” fixed="right">
        <el-button type="text" v-if="tagName==='1'">同意协催</el-button>
        <el-button type="text">撤销信函</el-button>
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
import {LetterApplicationQuery} from './components'
export default {
  name: 'synergisticLetterApplication',
  components:{
    LetterApplicationQuery
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
#synergistic-letter-application{}
</style>

