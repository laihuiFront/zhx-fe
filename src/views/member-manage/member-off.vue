<template>
  <div id="member-off">
    <el-form ref="form" :model="queryForm" :inline="true" class="query-wrap queryStyle">
      <el-form-item label="员工ID：">
        <el-input v-model="queryForm.id" clearable placeholder="请输入员工ID"></el-input>
      </el-form-item>
      <el-form-item label="员工姓名：">
        <el-input v-model="queryForm.userName" clearable placeholder="请输入员工姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="onClickQuery">查询</el-button>
        <el-button icon="el-icon-refresh" type="primary" @click="onClickReset">重置</el-button>
      </el-form-item>
    </el-form>
     <el-table highlight-current-row v-loading="tableLoad"
      sortable="custom"
      @sort-change="handleSort"
      :data="memberList">
      <el-table-column
        min-width="80"
        :sortable='true'
        :sort-orders="['ascending','descending']"
        prop="id"
        align="center"
        label="员工ID">
      </el-table-column>
      <el-table-column
        min-width="120"
        :sortable='true'
        :sort-orders="['ascending','descending']"
        align="center"
        prop="userName"
        label="员工姓名"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="160"
        :sortable='true'
        :sort-orders="['ascending','descending']"
        align="center"
        prop="department"
        label="原部门">
      </el-table-column>
      <el-table-column
        min-width="140"
        :sortable='true'
        :sort-orders="['ascending','descending']"
        prop="leaveTime"
        align="center"
        label="离职时间">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="onClickQuery"
      @current-change="onClickQuery"
      :current-page.sync="queryForm.pageNum"
      :page-size.sync="queryForm.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="pageSizes"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import {listMember} from '@/common/js/api-member'
import {pageSizes} from "@/common/js/const"

export default {
  name: 'memberOff',
  data(){
    return {
      pageSizes,
      tableLoad:false,
      queryForm: {
        id:'',
        pageNum: 1,
        pageSize: pageSizes[0],
        orderBy:null,
        sort:null
      },
      total: 0,
      memberList: []
    }
  },
  created() {
    this.onClickQuery()
  },
  methods:{
    handleSort({column,prop,order}){
      this.queryForm.orderBy = prop
      this.queryForm.sort = order === 'ascending' ? 'asc':'desc'
      this.onClickQuery()
    },
    onClickQuery() {
      this.memberList = []
      const data = {
        status: 0,
        idStrs: this.queryForm.id?(this.queryForm.id.trim()==""?null:this.queryForm.id.split('\n')):null,
        userName: this.queryForm.userName,
        pageNum: this.queryForm.pageNum,
        pageSize: this.queryForm.pageSize
      }
      this.tableLoad = true
      listMember(data).then(response => {
        this.memberList = response.list
        this.total = response.total
        this.tableLoad = false
      })
    },
    onClickReset() {
      this.queryForm = {
        pageNum: this.queryForm.pageNum,
        pageSize: this.queryForm.pageSize
      }
    }
  }
}
</script>

<style lang="scss">
#member-off{

}
</style>
