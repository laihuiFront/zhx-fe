<template>
  <div id="setting-role" class="page-wraper-sub">
    <el-form ref="form" :model="queryForm" :inline="true" class="query-wrap">
      <el-form-item>
        <el-input v-model="queryForm.roleName" clearable placeholder="请输入角色组名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="text" @click="onClickQuery">查询</el-button>
        <el-button icon="el-icon-refresh" type="text" @click="onClickReset">重置</el-button>
      </el-form-item>
      <el-form-item class="operation-item">
        <el-button type="primary">新增权限组</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="roleList"
      style="width: 100%"
      class="table-wrap">
      <el-table-column
        prop="roleName"
        label="权限组名称"
        width="300">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="权限组描述"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="createUser.userName"
        label="修改人"
        width="200">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="onClickEdit(scope.row)">修改</el-button>
          <el-button type="text" @click="onClickDelete(scope.row, scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getRoleList,deleteRole} from '@/common/js/api-setting'
export default {
  name: 'settingRole',
  data() {
    return {
      queryForm: {
      },
      roleList:[]
    }
  },
  created() {
    this.initRoleList()
  },
  methods: {
    onClickQuery(){
      this.initRoleList()
    },
    onClickReset(){
      this.queryForm = {}
    },
    onClickAdd(){

    },
    onClickEdit(row){

    },
    onClickDelete(row, index){
      this.$confirm('此操作将永久删除该角色，是否继续？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        deleteRole(row.id).then(()=>{
          this.roleList.splice(index,1)
          this.$message('角色删除成功')
        })
      }).catch(()=>{})
    },
    initRoleList(){
      this.roleList = []
      getRoleList(this.queryForm.roleName).then(data => this.roleList = data)
    }
  }
}
</script>

<style lang="scss">
#setting-role{}
</style>

