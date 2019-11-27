<template>
  <div
    id="setting-role"
    v-loading="loading2"
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="正在保存中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.7)"
  >
    <el-form ref="form" :model="queryForm" :inline="true" class="query-wrap queryStyle">
      <el-form-item label="角色名称：">
        <el-input v-model="queryForm.roleName" clearable placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="onClickQuery">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-refresh" type="primary" @click="onClickReset">重置</el-button>
      </el-form-item>
      <el-form-item v-has="'新增角色'">
        <el-button type="primary" @click="onClickAdd">新增角色</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="tableLoad" :data="roleList" highlight-current-row>
      <el-table-column prop="roleName" align="center" label="角色名称" min-width="200" show-overflow-tooltip />
      <el-table-column prop="roleDesc" align="center" label="角色描述" min-width="400" show-overflow-tooltip />
      <el-table-column prop="updateUser.userName" align="center" label="修改人" min-width="200" show-overflow-tooltip />
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button v-has="'查看'" type="text" @click="onClickQueryOne(scope.row)">查看</el-button>
          <el-button v-if="scope.row.id !== 14" v-has="'修改'" type="text" @click="onClickEdit(scope.row)">修改</el-button>
          <el-button v-if="scope.row.id !== 15 && scope.row.id !== 14 && scope.row.id !== 16 && scope.row.id !== 17" v-has="'删除'" type="text" @click="onClickDelete(scope.row, scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-dialogDrag
      :title="dialogData.title"
      class="dialog-wrap"
      :visible.sync="dialogData.editVisible"
      :close-on-click-modal="false"
      width="60%"
    >
      <el-form
        ref="ruleForm"
        :model="roleInfo"
        label-width="240px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="roleName" required>
          <el-input
            v-model="roleInfo.roleName"
            :disabled="componentsDisabled"
            :placeholder="componentsDisabled?'':'请输入角色名称'"
            maxlength="50"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="数据权限" prop="dataAuth" required>
          <el-switch v-model="roleInfo.dataAuth" active-value="1" inactive-value="0" :disabled="componentsDisabled" />
        </el-form-item>
        <el-form-item label="业务权限" prop="busiAuth" required>
          <el-switch v-model="roleInfo.busiAuth" active-value="1" inactive-value="0" :disabled="componentsDisabled" />
        </el-form-item>
        <el-form-item label="删除日志权限" prop="deleteAuth" required>
          <el-switch v-model="roleInfo.deleteAuth" active-value="1" inactive-value="0" :disabled="componentsDisabled" />
        </el-form-item>
        <el-form-item label="同批次共债催记编辑删除权限" prop="collectionAuth" required>
          <el-switch v-model="roleInfo.collectionAuth" active-value="1" inactive-value="0" :disabled="componentsDisabled" />
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input
            v-model="roleInfo.roleDesc"
            type="textarea"
            :rows="3"
            :disabled="componentsDisabled"
            :placeholder="componentsDisabled?'':'请输入角色描述'"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <ul class="auth-wrap">
        <component
          :is="item.leafNode === 1 ?'auth-leaf-node':'auth-parent-node'"
          v-for="(item) in authConfig"
          :key="item.id"
          :data="item"
          :edit-type="dialogData.type"
        />
      </ul>
      <span v-if="dialogData.type !== 'query'" slot="footer" class="footer">
        <el-button @click="onClickCancel">取 消</el-button>
        <el-button type="primary" @click="onClickSave">保 存</el-button>
      </span>
      <span v-else slot="footer" class="footer">
        <el-button @click="onClickCancel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import authLeafNode from './auth-leaf-node'
import authParentNode from './auth-parent-node'
import { getRoleList, deleteRole, listAuth, saveRole, saveAuth } from '@/common/js/api-setting'
export default {
  name: 'SettingRole',
  components: {
    authLeafNode,
    authParentNode
  },
  data() {
    return {
      tableLoad: false,
      queryForm: {
      },
      loading2: false,
      fullscreenLoading: false,
      roleList: [],
      dataAuthList: [{ id: 1, name: '具有数据权限' }, { id: 2, name: '不具有数据权限' }],
      busiAuthList: [{ id: 1, name: '具有业务权限' }, { id: 2, name: '不具有业务权限' }],
      deleteAuthList: [{ id: 1, name: '具有日志删除权限' }, { id: 2, name: '不具有日志删除权限' }],
      dialogData: {
        editVisible: false,
        roleDesc: '',
        title: '新增角色',
        type: 'add'
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { max: 50, message: '角色名称不能大于50个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { max: 200, message: '角色描述不能大于200个字符', trigger: 'blur' }
        ],
        dataAuth: [
          { required: true, message: '请选择数据权限' }
        ],
        deleteAuth: [
          { required: true, message: '请选择日志删除权限' }
        ],
        busiAuth: [
          { required: true, message: '请选择业务权限' }
        ]
      },
      roleInfo: {},
      authConfig: []
    }
  },
  computed: {
    componentsDisabled() {
      return this.dialogData.type === 'query'
    }
  },
  created() {
    this.initRoleList()
  },
  methods: {
    onClickQuery() {
      this.initRoleList()
    },
    onClickReset() {
      this.queryForm = {}
    },
    onClickAdd() {
      this.$nextTick(() => {
        if (this.$refs['ruleForm']) {
          this.$refs['ruleForm'].resetFields()
        }
      })
      this.roleInfo = {}

      this.$set(this.dialogData, 'title', '新增角色')
      this.$set(this.dialogData, 'type', 'add')
      listAuth().then(response => {
        this.authConfig = response
        this.$set(this.dialogData, 'editVisible', true)
      })
    },
    onClickQueryOne(row) {
      this.currentRow = row
      this.roleInfo = {
        roleName: row.roleName,
        dataAuth: row.dataAuth.toString(),
        busiAuth: row.busiAuth.toString(),
        deleteAuth: row.deleteAuth.toString(),
        collectionAuth: row.collectionAuth.toString(),
        roleDesc: row.roleDesc
      }
      listAuth(row.id).then(response => {
        this.$set(this.dialogData, 'title', '查看角色')
        this.$set(this.dialogData, 'type', 'query')
        this.authConfig = response
        this.$set(this.dialogData, 'editVisible', true)
      })
    },
    onClickEdit(row) {
      this.$nextTick(() => {
        if (this.$refs['ruleForm']) {
          this.$refs['ruleForm'].resetFields()
        }
      })
      this.currentRow = row
      this.roleInfo = {
        roleName: row.roleName,
        dataAuth: row.dataAuth.toString(),
        busiAuth: row.busiAuth.toString(),
        deleteAuth: row.deleteAuth.toString(),
        collectionAuth: row.collectionAuth.toString(),
        roleDesc: row.roleDesc
      }
      listAuth(row.id).then(response => {
        this.$set(this.dialogData, 'title', '修改角色')
        this.$set(this.dialogData, 'type', 'edit')
        this.authConfig = response
        this.$set(this.dialogData, 'editVisible', true)
      })
    },
    onClickDelete(row, index) {
      this.$confirm('此操作将永久删除该角色，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(row.id).then(() => {
          this.roleList.splice(index, 1)
          this.$message('角色删除成功')
        })
      }).catch(() => { })
    },
    onClickCancel() {
      this.roleInfo = {}
      this.$refs['ruleForm'].resetFields()
      this.$set(this.dialogData, 'editVisible', false)
    },
    onClickSave() {
      this.loading2 = true
      this.fullscreenLoading = true
      this.$refs['ruleForm'].validate((valid) => {
        if (!valid) {
          this.loading2 = false
          this.fullscreenLoading = false
          return
        } else {
          const roleSubmit = {
            roleName: this.roleInfo.roleName,
            dataAuth: this.roleInfo.dataAuth,
            busiAuth: this.roleInfo.busiAuth,
            deleteAuth: this.roleInfo.deleteAuth,
            collectionAuth: this.roleInfo.collectionAuth,
            roleDesc: this.roleInfo.roleDesc
          }
          if (this.dialogData.type === 'edit') {
            roleSubmit.id = this.currentRow.id
          }
          this.onClickCancel()
          saveRole(roleSubmit).then(response => {
            const id = this.dialogData.type === 'edit' ? this.currentRow.id : response.id
            saveAuth({ id, menus: this.authConfig }).then(response => {
              this.$message('角色保存成功')
              this.initRoleList()
            }).catch(() => {}).finally(() => {
              this.loading2 = false
              this.fullscreenLoading = false
            })
          })
        }
      })
    },
    initRoleList() {
      this.roleList = []
      this.tableLoad = true
      getRoleList(this.queryForm.roleName).then(data => {
        this.roleList = data
        this.tableLoad = false
      })
    }
  }
}
</script>

<style lang="scss">
#setting-role {
  min-width: 1100px !important;

  .dialog-wrap {
    .auth-wrap {
      border-radius: 5px;
    }
  }
  .el-table--scrollable-y .el-table__body-wrapper{
    overflow-x: hidden;
  }
}
</style>
