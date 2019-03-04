<template>
  <div id="member-off" class="page-wraper-sub">
    <el-form ref="form" :model="queryForm" :inline="true" class="query-wrap">
      <el-form-item>
        <el-input v-model="queryForm.number" clearable placeholder="请输入员工号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryForm.userName" clearable placeholder="请输入员工姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="text" @click="onClickQuery">查询</el-button>
        <el-button icon="el-icon-refresh" type="text" @click="onClickReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      sortable="custom"
      border
      stripe
      @sort-change="handleSort"
      :data="memberList"
      style="width: 100%"
      class="table-wrap">
      <el-table-column
        :sortable='true' 
        :sort-orders="['ascending','descending']"         
        prop="number"
        label="员工号">
      </el-table-column>
      <el-table-column
        :sortable='true' 
        :sort-orders="['ascending','descending']"
        prop="userName"
        label="员工姓名"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        :sortable='true' 
        :sort-orders="['ascending','descending']"
        prop="department"
        label="原部门">
      </el-table-column>
      <el-table-column
        :sortable='true' 
        :sort-orders="['ascending','descending']"
        prop="leaveTime"
        label="离职时间">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="onClickQuery"
      @current-change="onClickQuery"
      :current-page.sync="queryForm.pageNum"
      :page-size.sync="queryForm.pageSize"
      layout="prev, pager, next, jumper,total, sizes"
      :total="total"
      class="pagination-wrap">
    </el-pagination>
  </div>
</template>

<script>
import {listMember} from '@/common/js/api-member'
export default {
  name: 'memberOff',
  data(){
    return {
      queryForm: {
        pageNum: 1,
        pageSize: 10,
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
      // console.log(prop,'@',order)
      this.queryForm.orderBy = prop
      this.queryForm.sort = order === 'ascending' ? 'asc':'desc'
      this.onClickQuery()
    },
    onClickQuery() {
      this.memberList = []
      const data = {
        status: 0,
        number: this.queryForm.number,
        userName: this.queryForm.userName,
        pageNum: this.queryForm.pageNum,
        pageSize: this.queryForm.pageSize
      }
      listMember(data).then(response => {
        this.memberList = response.list
        this.total = response.total
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
#member-off{}
</style>


