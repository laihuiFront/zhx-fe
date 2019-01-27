<template>
  <div id="setting-department" class="page-wraper-sub">
    <div class="header">
      <el-button type="primary" @click="onClickSave" class="btn">保存</el-button>
    </div>
    <el-tree
      ref="tree"
      :data="departmentTree"
      node-key="id"
      :expand-on-click-node="false"
      class="tree-wrap"
      width="400px">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>
          <el-input @blur="onBlurTreeInput(data)" :ref="'treeInput'+data.id" v-show="data.isEdit" clearable v-model="data.orgName" :placeholder="'请输入'"></el-input>
          <span v-show="!data.isEdit">{{data.orgName}}</span>
        </span>
        <span>
          <el-button type="text" icon="el-icon-circle-plus" @click="append(node, data)" title="添加"></el-button>
          <el-button type="text" icon="el-icon-edit" @click="edit(node, data)" title="修改"></el-button>
          <el-button type="text" icon="el-icon-delete" v-if="node.level !== 1" @click="remove(node, data)" title="删除"></el-button>
          <el-button type="text" v-if="node.previousSibling" icon="el-icon-arrow-up" title="上移" @click="upMove(node, data)"></el-button>
          <el-button type="text" v-if="node.nextSibling" icon="el-icon-arrow-down" title="下移" @click="downMove(node, data)"></el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
import {getDepartmentTree, saveDepartment} from '@/common/js/api-setting'
export default {
  name: 'settingDepartment',
  data() {
    return {
      departmentTree:[]
    }
  },
  created(){
    this.initTree()
  },
  methods: {
    initTree(){
      getDepartmentTree().then((data)=>{
        this.departmentTree = data
      })
    },
    onBlurTreeInput(data){
      this.$set(data,'isEdit',false)
    },
    onClickSave(){
      saveDepartment(this.departmentTree).then(()=>{
        this.$message('部门更新成功')
        this.initTree()
      })
    },
    append(node, data) {
      const newChild = { id: -(new Date()).getTime()%1000000, orgName: '新节点', isEdit:true }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      this.$set(node, 'expanded', true)
      data.children.unshift(newChild)
      setTimeout(()=>{
        this.$refs['treeInput'+newChild.id].focus()
      },200)
    },
    edit(node,data) {
      console.log(node)
      this.$set(data,'isEdit',true)
      this.$nextTick(()=>{
        this.$refs['treeInput'+data.id].focus()
      })
    },
    remove(node, data) {
      this.$confirm('确认删除？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
      }).catch(()=>{})
    },
    upMove(node, data){
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      const last = children[index-1]
      const current = children[index]
      this.$refs['tree'].remove(current)
      this.$refs['tree'].insertBefore(current, last)
    },
    downMove(node, data){
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      const next = children[index+1]
      const current = children[index]
      this.$refs['tree'].remove(current)
      this.$refs['tree'].insertAfter(current, next)
    },
  }
}
</script>

<style lang="scss">
#setting-department{
  width: 500px;
  margin-left: 50%;
  transform: translateX(-50%);
  .header{
    margin-bottom: 30px;
    text-align: right;
    .btn{
      display: inline-block;
    }
  }
  .tree-wrap{
    flex: 1;
    .el-tree-node__content{
      height: 40px;
    }
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
      color: #0080ff;
      .el-input{
        width: 150px;
      }
    }
  }
}
</style>


