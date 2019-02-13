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
        @node-click="onClickDepartment"
        class="tree-wrap"
        width="400px"
      >
        <span
          :class="{active:queryForm.department === data.id}"
          class="custom-tree-node"
          slot-scope="{ node, data }"
        >{{data.orgName}}</span>
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
      <el-table :data="memberList" style="width: 100%" class="table-wrap">
        <el-table-column prop="number" show-overflow-tooltip label="员工号"></el-table-column>
        <el-table-column prop="userName" label="员工姓名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="sex" label="性别" show-overflow-tooltip width="50"></el-table-column>
        <el-table-column prop="officePhone" label="办公电话" show-overflow-tooltip></el-table-column>
        <el-table-column prop="mobile" label="手机" show-overflow-tooltip></el-table-column>
        <el-table-column prop="joinTime" label="入职日期" show-overflow-tooltip></el-table-column>
        <el-table-column prop="roleList" :formatter="formatRole" label="员工角色" show-overflow-tooltip></el-table-column>
        <el-table-column prop="position" label="职位" show-overflow-tooltip></el-table-column>
        <el-table-column prop="department" label="部门" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="onClickEdit(scope.row)">修改</el-button>
            <el-button
              type="text"
              @click="onClickLock(scope.row)"
              v-if="scope.row.enable === 1 && scope.row.id !== $store.getters.userInfo.id"
            >锁定</el-button>
            <el-button
              type="text"
              @click="onClickUnLock(scope.row)"
              v-if="scope.row.enable === 0 && scope.row.id !== $store.getters.userInfo.id"
            >解锁</el-button>
            <el-button
              type="text"
              @click="onClickLeave(scope.row)"
              v-if="scope.row.id !== $store.getters.userInfo.id"
            >离职</el-button>
            <el-button
              type="text"
              @click="onClickDelete(scope.row)"
              v-if="scope.row.id !== $store.getters.userInfo.id"
            >删除</el-button>
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
        class="pagination-wrap"
      ></el-pagination>
    </div>
    <el-dialog
      :title="dialogData.title"
      class="dialog-wrap"
      :visible.sync="dialogData.editVisible"
      :close-on-click-modal="false"
      width="50%"
    >
      <el-form
        :model="memberInfo"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="memberInfo.userName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="员工号" prop="number">
          <el-input v-model="memberInfo.number" placeholder="请输入员工号"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input
            v-model="memberInfo.department"
            @focus="$set(dialogData, 'departmentVisible' ,true)"
            placeholder="请选择部门"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="memberInfo.roleList" multiple placeholder="请选择角色">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位" prop="sex">
          <el-select v-model="memberInfo.position" placeholder="请选择职位">
            <el-option
              v-for="item in positionList"
              :key="item.job"
              :label="item.position"
              :value="item.position"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="memberInfo.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="memberInfo.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="办公电话" prop="officePhone">
          <el-input v-model="memberInfo.officePhone" placeholder="请输入办公电话"></el-input>
        </el-form-item>
        <el-form-item label="入职日期" prop="joinTime">
          <el-date-picker
            v-model="memberInfo.joinTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择入职日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="footer">
        <el-button @click="onClickCancel">取 消</el-button>
        <el-button type="primary" @click="onClickSave">保 存</el-button>
      </span>
      <el-dialog
        width="300px"
        title="选择部门"
        class="dialog-wrap department-wrap"
        :visible.sync="dialogData.departmentVisible"
        :close-on-click-modal="false"
        append-to-body
      >
        <el-tree
          v-if="departmentTree.length>0"
          ref="tree"
          :data="departmentTree"
          node-key="id"
          :expand-on-click-node="false"
          :default-expanded-keys="[departmentTree[0].id]"
          @node-click="onSelectDepartment"
          class="tree-wrap"
          width="200px"
        >
          <span
            :class="{active:queryForm.department === data.id}"
            class="custom-tree-node"
            slot-scope="{ node, data }"
          >{{data.orgName}}</span>
        </el-tree>
        <span slot="footer" class="footer">
          <el-button @click="$set(dialogData, 'departmentVisible' ,false)">取 消</el-button>
          <el-button type="primary" @click="onClickSaveDept">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { getDepartmentTree, getRoleList } from '@/common/js/api-setting'
import { listMember, deleteMember, changeStatus, addMember, updateMember, getUserById, getPositionList } from '@/common/js/api-member'
export default {
  name: 'memberIn',
  data () {
    return {
      departmentTree: [],
      queryForm: {
        pageNum: 1,
        pageSize: 10,
        department: null
      },
      dialogData: {
        editVisible: false,
        title: '新增权限组',
        type: 'add',
        departmentVisible: false,
      },
      total: 0,
      memberList: [],
      memberInfo: {},
      rules: {

      },
      roleList: [],
      positionList: []
    }
  },
  created () {
    getDepartmentTree().then(data => {
      this.departmentTree = data
    })
    this.onClickQuery()
    getRoleList().then(response => {
      this.roleList = response
    })
    getPositionList().then(response => {
      this.positionList = response
    })
  },
  methods: {
    onClickQuery () {
      this.memberList = []
      const data = {
        status: 1,
        department: this.queryForm.department,
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
    onClickAdd () {
      this.$set(this.dialogData, 'title', '新增员工')
      this.$set(this.dialogData, 'type', 'add')
      this.$set(this.dialogData, 'editVisible', true)
    },
    onClickEdit (row) {
      this.$set(this.dialogData, 'title', '修改员工')
      this.$set(this.dialogData, 'type', 'edit')
      getUserById(row.id).then(response => {
        this.memberInfo = response
        const roleList = this.memberInfo.roleList.map(item => item.id)
        this.$set(this.memberInfo, 'roleList', roleList)
        this.$set(this.dialogData, 'editVisible', true)
      })
    },
    onClickLock (row) {
      this.$confirm('确定锁定该员工账号？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          id: row.id,
          status: row.status,
          enable: 0
        }
        changeStatus(data).then(() => {
          this.$message('员工账号锁定成功')
          this.onClickQuery()
        })
      }).catch(() => { })
    },
    onClickUnLock (row) {
      this.$confirm('确定解锁该员工账号？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          id: row.id,
          status: row.status,
          enable: 1
        }
        changeStatus(data).then(() => {
          this.$message('员工账号解锁成功')
          this.onClickQuery()
        })
      }).catch(() => { })
    },
    onClickLeave (row) {
      this.$confirm('确定对该员工执行离职操作？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          id: row.id,
          status: 0,
          enable: 0
        }
        changeStatus(data).then(() => {
          this.$message('员工离职操作成功')
          this.onClickQuery()
        })
      }).catch(() => { })
    },
    onClickDelete (row) {
      this.$confirm('此操作将永久删除该员工，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMember(row.id).then(() => {
          this.$message('员工删除成功')
          this.onClickQuery()
        })
      }).catch(() => { })
    },
    onClickSelectDept () {
      this.$set(dialogData, 'departmentVisible', true)
      this.currentDept = null
    },
    onClickDepartment (data, node) {

      this.$set(this.queryForm, 'department', data.id)
      this.onClickQuery()
    },
    onSelectDepartment (data, node) {
      this.currentDept = data
    },
    onClickSaveDept () {
      this.$set(this.memberInfo, 'departId', this.currentDept.id)
      this.$set(this.memberInfo, 'department', this.currentDept.orgName)
      this.$set(this.dialogData, 'departmentVisible', false)
    },
    onClickReset () {
      this.queryForm = {
        pageNum: this.queryForm.pageNum,
        pageSize: this.queryForm.pageSize
      }
    },
    onClickCancel () {
      this.$refs['ruleForm'].resetFields()
      this.$set(this.dialogData, 'editVisible', false)
    },
    onClickSave () {
      let { ...resultData } = this.memberInfo
      resultData.roleList = resultData.roleList.map(item => { return { id: item } })
      if (this.dialogData.type === 'add') {
        addMember(resultData).then(response => {
          this.onClickQuery()
          this.onClickCancel()
        })
      } else {
        updateMember(resultData).then(response => {
          this.onClickQuery()
          this.onClickCancel()
        })
      }
    },
    formatRole (row, column, cellValue) {
      if (cellValue && cellValue.length > 0) {
        return cellValue.map(item => item.roleName).join('/')
      } else {
        return null
      }
    }
  }
}
</script>

<style lang="scss">
#member-in {
  height: 100%;
  display: flex;
  overflow: hidden;
  .left-wrap {
    margin-right: 48px;
    height: 100%;
    overflow-y: auto;
    flex: 0 0 200px;
    width: 200px;
    border-right: 1px solid #e8e8e8;
    .tree-wrap {
      height: 100%;
      .el-tree-node__content {
        height: 40px;
      }
      .custom-tree-node {
        display: inline-block;
        height: 100%;
        line-height: 40px;
        flex: 1;
        font-size: 14px;
        padding: 0 8px 0 12px;
        color: #0080ff;
        &.active {
          color: #fff;
          background: #0080ff;
        }
      }
    }
  }
  .right-wrap {
    flex: 1;
    overflow: hidden;
  }
  .dialog-wrap {
    .el-dialog__body {
      .el-form {
        display: flex;
        flex-wrap: wrap;
        .el-form-item {
          display: flex;
          width: 50%;
          .el-form-item__content {
            flex: 1;
            margin-left: 0 !important;
            .el-select {
              width: 100%;
            }
          }
        }
      }
    }
    .department-wrap {
      width: 300px;
      .el-dialog__body {
        .tree-wrap {
          height: 100%;
          .el-tree-node__content {
            height: 40px;
          }
          .custom-tree-node {
            display: inline-block;
            height: 100%;
            flex: 1;
            font-size: 14px;
            padding: 0 8px 0 12px;
            color: #0080ff;
            &.active {
              color: #fff;
              background: #0080ff;
            }
          }
        }
      }
    }
  }
}
</style>

