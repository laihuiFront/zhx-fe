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
        <el-button type="primary" @click="onClickAdd">新增角色</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="roleList"
      style="width: 100%"
      class="table-wrap">
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="300">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="createUser.userName"
        label="修改人"
        width="200">
      </el-table-column>
      <el-table-column
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button type="text" @click="onClickQuery(scope.row)">查看</el-button>
          <el-button type="text" @click="onClickEdit(scope.row)">修改</el-button>
          <el-button type="text" @click="onClickDelete(scope.row, scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="dialogData.title"
      class="dialog-wrap"
      :visible.sync="dialogData.editVisible"
      :close-on-click-modal="false"
      width="50%">
      <el-form :model="roleInfo" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleInfo.roleName" :disabled="dialogData.type === 'query'" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input type="textarea" :rows="3" :disabled="dialogData.type === 'query'" v-model="roleInfo.roleDesc" placeholder="请输入角色描述"></el-input>
        </el-form-item>
      </el-form>
      <ul class="auth-wrap">
        <component v-for="(item) in authConfig" :data="item" :editType="dialogData.type" :is="item.leafNode === 1 ?'auth-leaf-node':'auth-parent-node'" :key="item.id"></component>
      </ul>
      <span slot="footer" class="footer">
        <el-button @click="onClickCancel">取 消</el-button>
        <el-button type="primary" @click="onClickSave" v-if="dialogData.type !== 'query'">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import authLeafNode from './auth-leaf-node'
import authParentNode from './auth-parent-node'
import {getRoleList,deleteRole,listAuth, saveRole, saveAuth} from '@/common/js/api-setting'
export default {
  name: 'settingRole',
  components:{
    authLeafNode,
    authParentNode
  },
  data() {
    return {
      queryForm: {
      },
      roleList:[],
      dialogData: {
        editVisible:false,
        title: '新增角色',
        type: 'add'
      },
      rules:{
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { max: 50, message: '角色名称不能大于50个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { max: 200, message: '角色描述不能大于200个字符', trigger: 'blur' }
        ]
      },
      roleInfo: {},
      authConfig:[]
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
      this.$set(this.dialogData, 'title', '新增角色')
      this.$set(this.dialogData, 'type', 'add')
      listAuth().then(response => {
        this.authConfig = response
        this.$set(this.dialogData, 'editVisible', true)
      })
    },
    onClickQuery(row){
      this.roleInfo = {
        roleName: row.roleName,
        roleDesc: row.roleDesc
      }
      this.$set(this.dialogData, 'title', '查看角色')
      this.$set(this.dialogData, 'type', 'query')
      listAuth(row.id).then(response => {
        this.authConfig = response
        this.$set(this.dialogData, 'editVisible', true)
      })
    },
    onClickEdit(row){
      this.$set(this.dialogData, 'title', '修改角色')
      this.$set(this.dialogData, 'type', 'edit')
      this.currentRow = row
      this.roleInfo = {
        roleName: row.roleName,
        roleDesc: row.roleDesc
      }
      listAuth(row.id).then(response => {
        this.authConfig = response
        this.$set(this.dialogData, 'editVisible', true)
      })
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
    onClickCancel(){
      this.roleInfo = {}
      this.$refs['ruleForm'].resetFields()
      this.$set(this.dialogData, 'editVisible', false)
    },
    onClickSave(){
      let roleSubmit = {
        roleName: this.roleInfo.roleName,
        roleDesc: this.roleInfo.roleDesc
      }
      if(this.dialogData.type === 'edit') {
        roleSubmit.id = this.currentRow.id
      }
      saveRole(roleSubmit).then(response => {
        const id = this.dialogData.type === 'edit' ? this.currentRow.id : response.id
        saveAuth({id, menus: this.authConfig}).then(response => {
          this.$message('角色保存成功')
          this.onClickCancel()
          this.initRoleList()
        })
      })
    },
    initRoleList(){
      this.roleList = []
      getRoleList(this.queryForm.roleName).then(data => this.roleList = data)
    }
  }
}
</script>

<style lang="scss">
#setting-role{
  .dialog-wrap{
    .auth-wrap{
      border-radius: 5px;
    }
  }
}
</style>

