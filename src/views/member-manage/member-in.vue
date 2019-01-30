<template>
  <div id="member-in">
    <div class="left-wrap">
      <el-tree
        v-if="departmentTree.length>0"
        ref="tree"
        :data="departmentTree"
        node-key="id"
        :expand-on-click-node="false"
        :default-expanded-keys="[departmentTree[0].id]"
        @node-click = "onClickDepartment"
        class="tree-wrap"
        width="400px">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          {{data.orgName}}
        </span>
      </el-tree>
    </div>
    <div class="right-wrap page-wraper-sub">
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
        <el-form-item class="operation-item">
          <el-button type="primary" @click="onClickAdd">新增员工</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="memberList"
        style="width: 100%"
        class="table-wrap">
        <el-table-column
          prop="number"
          show-overflow-tooltip
          label="员工号">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="员工姓名"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          show-overflow-tooltip
          width="50">
        </el-table-column>
        <el-table-column
          prop="officePhone"
          label="办公电话"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="joinTime"
          label="入职日期"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="role"
          label="员工角色">
        </el-table-column>
        <el-table-column
          prop="department"
          label="部门">
        </el-table-column>
        <el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="onClickEdit(scope.row)">修改</el-button>
            <el-button type="text" @click="onClickLock(scope.row)">锁定</el-button>
            <el-button type="text" @click="onClickUnLock(scope.row)">解锁</el-button>
            <el-button type="text" @click="onClickLeave(scope.row)">离职</el-button>
            <el-button type="text" @click="onClickDelete(scope.row)">删除</el-button>
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
        class="pagination-wrap">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {getDepartmentTree} from '@/common/js/api-setting'
import {listMember} from '@/common/js/api-member'
export default {
  name: 'memberIn',
  data() {
    return {
      departmentTree:[],
      queryForm: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      memberList: []
    }
  },
  created() {
    getDepartmentTree().then(data => {
      this.departmentTree = data
    })
    this.onClickQuery()
  },
  methods: {
    onClickQuery() {
      this.memberList = []
      const data = {
        status: 1,
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
    onClickAdd(){

    },
    onClickEdit(row) {
      
    },
    onClickLock(row) {

    },
    onClickUnLock(row) {

    },
    onClickLeave(row) {

    },
    onClickDelete(row) {

    },
    onClickDepartment(data){
      console.log(data)
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
#member-in{
  height: 100%;
  display: flex;
  overflow: hidden;
  .left-wrap{
    margin-right: 48px;
    height: 100%;
    overflow-y: auto;
    flex: 0 0 200px;
    width: 200px;
    border-right: 1px solid #e8e8e8;
    .tree-wrap{
      height: 100%;
      .el-tree-node__content{
        height: 40px;
      }
      .custom-tree-node {
        flex: 1;
        font-size: 14px;
        padding-right: 8px;
        color: #0080ff;
      }
  }
  }
  .right-wrap{
    flex: 1;
    
  }
}
</style>

