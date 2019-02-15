<template>
  <div id="setting-department" class="page-wraper-sub">
    <div class="header">
      <el-button type="primary" @click="onClickSave" class="btn">保存</el-button>
    </div>
    <el-tree
      v-if="departmentTree.length>0"
      ref="tree"
      :data="departmentTree"
      node-key="id"
      :expand-on-click-node="false"
      :default-expanded-keys="[departmentTree[0].id]"
      class="tree-wrap"
      width="400px"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>
          <el-input
            @blur="onBlurTreeInput(data)"
            :ref="'treeInput'+data.id"
            v-show="data.isEdit"
            clearable
            v-model="data.orgName"
            :placeholder="'请输入'"
          ></el-input>
          <span v-show="!data.isEdit">{{data.orgName}}</span>
        </span>
        <span>
          <el-button type="text" icon="el-icon-circle-plus" @click="append(node, data)" title="添加"></el-button>
          <el-button type="text" icon="el-icon-edit" @click="edit(node, data)" title="修改"></el-button>
          <el-button
            type="text"
            icon="el-icon-delete"
            v-if="node.level !== 1"
            @click="remove(node, data)"
            title="删除"
          ></el-button>
          <el-button
            type="text"
            icon="el-icon-sort"
            title="移动"
            @click="onClickMove(data.id)"
            v-if="node.level !== 1"
          ></el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog
      title="选择目标部门"
      class="dialog-wrap"
      :visible.sync="showDialog"
      :close-on-click-modal="true"
      :append-to-body="true"  
      width="400px">
        <el-tree
          v-if="moveSelectDepartTree.length>0"
          ref="treeSelect"
          :data="moveSelectDepartTree"
          node-key="id"
          :expand-on-click-node="false"
          :default-expanded-keys="[moveSelectDepartTree[0].id]"
          @node-click="onSelectDepartment"
          class="tree-wrap-select"
          width="200px"
          :filter-node-method="filterNode"
        >
          <span
            class="custom-tree-node"
            slot-scope="{ node, data }"
          >{{data.orgName}}</span>
      </el-tree>
      <span slot="footer" class="footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="onClickConfirmDept">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getDepartmentTree, saveDepartment } from '@/common/js/api-setting'
export default {
  name: 'settingDepartment',
  data () {
    return {
      departmentTree: [],
      moveSelectDepartTree: [],
      showDialog: false,
      moveId: null,
    }
  },
  created () {
    this.initTree()
    getDepartmentTree().then((data) => {
        this.moveSelectDepartTree = data
    })
  },
  methods: {
    initTree () {
      getDepartmentTree().then((data) => {
        this.departmentTree = data
      })
    },
    onBlurTreeInput (data) {
      this.$set(data, 'isEdit', false)
    },
    onClickSave () {
      saveDepartment(this.departmentTree).then(() => {
        this.$message('部门更新成功')
        this.initTree()
      })
    },
    append (node, data) {
      const newChild = { id: -(new Date()).getTime() % 1000000, orgName: '新部门', isEdit: true }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      this.$set(node, 'expanded', true)
      data.children.unshift(newChild)
      setTimeout(() => {
        this.$refs['treeInput' + newChild.id].focus()
      }, 200)
    },
    edit (node, data) {
      console.log(node)
      this.$set(data, 'isEdit', true)
      this.$nextTick(() => {
        this.$refs['treeInput' + data.id].focus()
      })
    },
    remove (node, data) {
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
      }).catch(() => { })
    },
    onClickMove(id) {
      this.moveId = id
      this.selectDeptId = null
      this.showDialog = true
      this.$nextTick(()=>{
        this.$refs['treeSelect'].filter(id)
      })
    },
    onClickConfirmDept() {
      if(!this.selectDeptId){
        this.$message('请选择目标部门')
        return
      }
      this.$confirm('该操作会将部门及其子部门移动到目标部门下，确认继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const sourceNode = this.$refs['tree'].getNode(this.moveId)
        const sourceData = sourceNode.data
        const targetNode = this.$refs['tree'].getNode(this.selectDeptId)
        sourceData.parent.id = this.selectDeptId
        this.$refs['tree'].remove(sourceNode)
        this.$refs['tree'].append(sourceData,targetNode)
        this.showDialog = false
      }).catch(() => { })
    },
    onSelectDepartment (data) {
      this.selectDeptId = data.id
    },
    filterNode(value, data, node){
      console.log(node)
      // if(value !== data.id){
      if(this.showNode(node, value)){
        return true
      }else {
        return false
      }
    },
    showNode(node, value){
      if(node.data.id === value){
        return false
      }else if(node.level === 1){
        return true
      }else{
        return this.showNode(node.parent, value)
      }
    }
  }
}
</script>

<style lang="scss">
#setting-department {
  width: 500px;
  margin-left: 50%;
  transform: translateX(-50%);
  .header {
    margin-bottom: 30px;
    text-align: right;
    .btn {
      display: inline-block;
    }
  }
  .tree-wrap {
    flex: 1;
    .el-tree-node__content {
      height: 40px;
      &:hover {
        background: #ddd;
      }
    }
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
      color: #0080ff;
      .el-input {
        width: 150px;
      }
    }
  }
  .tree-wrap-select{
      width: 300px;
      .el-dialog__body {
        .tree-wrap-select {
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
          }
        }
      }
    }
}
</style>


