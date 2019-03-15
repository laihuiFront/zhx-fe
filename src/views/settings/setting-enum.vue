<template>
  <div id="setting-enum">
    <el-card class="box-card-left">
      <template slot="header">配置项目</template>
      <ul class="config-wrap">
        <li
          class="config-item"
          @click="activeIndex=index"
          :class="{active:index===activeIndex}"
          v-for="(config, index) in configList"
          :key="config.id"
        >{{config.name}}</li>
      </ul>
    </el-card>
    <el-card class="box-card-right">
      <div slot="header" class="header">
        <span class="title">{{currentEnum.name}}</span>
        <el-button
          type="primary"
          v-if="currentEnum.name && currentEnum.name !== '地区'"
          @click="onClickAdd"
          v-has="'新增'"
        >新增</el-button>
        <el-button type="primary" :disabled="disableSave" @click="onclickSave" v-has="'保存'">保存</el-button>
      </div>
      <el-tree
        v-if="currentEnum.name && currentEnum.name === '地区'"
        :data="configData"
        node-key="id"
        :expand-on-click-node="false"
        class="tree-wrap"
        width="400px"
        v-loading="tableLoad"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>
            <el-input
              @blur="onBlurTreeInput(data)"
              :ref="'treeInput'+data.id"
              v-show="data.isEdit"
              clearable
              v-model="data.name"
              :placeholder="'请输入'"
            ></el-input>
            <span v-show="!data.isEdit">{{data.name}}</span>
            <el-switch
              @change="onEnableChange($event, node, data)"
              v-model="data.status"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </span>
          <span>
            <el-button
              v-if="node.level<=2"
              icon="el-icon-circle-plus"
              type="text"
              @click="append(node, data)"
              title="添加"
            ></el-button>
            <el-button icon="el-icon-edit" type="text" @click="edit(node, data)" title="修改"></el-button>
            <el-button icon="el-icon-delete" type="text" @click="remove(node, data)" title="删除"></el-button>
          </span>
        </span>
      </el-tree>
      <el-table
        v-if="currentEnum.name && currentEnum.name !== '地区'"
        border stripe
        :data="configData"
        style="width: 100%"
        v-loading="tableLoad"
      >
        <el-table-column v-if="currentEnum.name==='催收区域'" prop="id" label="催收区域id">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" :label="currentEnum.name">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.editType==='edit' || scope.row.editType==='add'"
              clearable
              v-model="scope.row.tempName"
              :placeholder="'请输入'+currentEnum.name"
            ></el-input>
            <span v-else>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="currentEnum.name==='催收模板'" prop="date" label="对应通话记录">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.editType==='edit' || scope.row.editType==='add'"
              clearable
              v-model="scope.row.tempDescription"
              :placeholder="'请输入'"
            ></el-input>
            <span v-else>{{scope.row.description}}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="currentEnum.name==='催收结果'" prop="sysFlag" label="是否有效">
          <template slot-scope="scope">
            <el-switch
              v-if="scope.row.editType==='edit' || scope.row.editType==='add'"
              v-model="scope.row.tempSysFlag"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
            <el-switch
              v-else
              :disabled="true"
              v-model="scope.row.sysFlag"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="启用">
          <template slot-scope="scope">
            <el-switch
              v-if="scope.row.editType==='edit' || scope.row.editType==='add'"
              v-model="scope.row.tempStatus"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
            <el-switch
              v-else
              :disabled="true"
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.editType !== 'edit' && scope.row.editType !== 'add'"
              type="text"
              @click="onClickEdit(scope.row)"
              v-has="'修改'"
            >修改</el-button>
            <el-button
              v-if="scope.row.editType !== 'edit' && scope.row.editType !== 'add'"
              type="text"
              @click="onclickDelete(scope.row, scope.$index)"
              v-has="'删除'"
            >删除</el-button>
            <el-button
              v-if="scope.row.editType==='edit' || scope.row.editType==='add'"
              type="text"
              @click="onClickCancel(scope.row, scope.$index)"
            >取消</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getConfigList, insertConfigData, deleteConfigData } from '@/common/js/api-setting'
export default {
  name: 'settingEnum',
  data () {
    return {
      tableLoad:false,
      configList: [],
      activeIndex: 0,
      configData: []
    }
  },
  computed: {
    currentEnum () {
      if (this.configList.length) {
        return this.configList[this.activeIndex]
      } else {
        return {}
      }
    },
    disableSave () {
      if (this.currentEnum.name && this.currentEnum.name === '地区') {
        return false
      } else {
        if (this.configData.length) {
          const hasEditItem = this.configData.some(item => item.editType === 'edit' || item.editType === 'add')
          if (hasEditItem) {
            return false
          } else {
            return true
          }
        } else {
          return true
        }
      }
    }
  },
  watch: {
    currentEnum (newVal, OldVal) {
      if (newVal.id) {
        this.configData = []
        this.tableLoad = true
        getConfigList(newVal.id).then(response => {
          this.configData = response
          this.tableLoad = false
        })
      }
    }
  },
  created () {
    this.tableLoad = true
    getConfigList().then(response => {
      this.configList = response
      this.tableLoad = false
    })
  },
  methods: {
    onClickAdd () {
      this.configData.unshift({
        id: -(new Date()).getTime() % 1000000,
        status: 1,
        editType: 'add',
        tempSysFlag:1,
        sysFlag:1
      })
    },
    onclickSave () {
      if (this.currentEnum.name === '地区') {
        insertConfigData(this.configData).then(() => {
          this.$message('保存成功')
          this.tableLoad = true
          getConfigList(this.currentEnum.id).then(response => {
            this.configData = response
            this.tableLoad = false
          })
        })
      } else {
        const toSaveList = this.configData.filter(item => item.editType === 'add' || item.editType === 'edit')
        const hasEmpty = toSaveList.some(item => {
          if (this.currentEnum.name === '催收模板') {
            return !(item.tempName && item.tempDescription)
          } else {
            return !item.tempName
          }
        })
        if (hasEmpty) {
          this.$message('修改或删除的配置项含有空值,请修改后重新提交')
          return
        }
        const data = toSaveList.map((item) => {
          return {
            type: 0,
            id: item.id,
            name: item.tempName,
            status: item.tempStatus,
            sysFlag:item.tempSysFlag,
            description: item.tempDescription,
            parent: {
              id: this.currentEnum.id
            }
          }
        })
        insertConfigData(data).then(() => {
          this.$message('保存成功')
          this.tableLoad = true
          getConfigList(this.currentEnum.id).then(response => {
            this.configData = response
            this.tableLoad = false
          })
        })
      }
    },
    onClickEdit (row) {
      this.$set(row, 'tempName', row.name)
      this.$set(row, 'tempDescription', row.description)
      this.$set(row, 'tempStatus', row.status)
      this.$set(row, 'tempSysFlag', row.sysFlag)
      this.$set(row, 'editType', 'edit')
    },
    onClickCancel (row, index) {
      if (row.editType === 'edit') {
        this.$set(row, 'editType', '')
      } else {
        this.configData.splice(index, 1)
      }
    },
    onclickDelete (row, index) {
      this.$confirm('此操作将永久删除该配置，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteConfigData(row.id).then(() => {
          this.configData.splice(index, 1)
          this.$message('配置项删除成功')
        })
      }).catch(() => { })
    },
    onBlurTreeInput (data) {
      this.$set(data, 'isEdit', false)
    },
    append (node, data) {
      const newChild = { id: -(new Date()).getTime() % 1000000, name: '新节点', status: 1, isEdit: true }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.unshift(newChild)
      this.$set(node, 'expanded', true)
      setTimeout(() => {
        this.$refs['treeInput' + newChild.id].focus()
      }, 200)
    },
    edit (node, data) {
      this.$set(data, 'isEdit', true)
      this.$nextTick(() => {
        this.$refs['treeInput' + data.id].focus()
      })
    },
    remove (node, data) {
      this.$confirm('此操作将永久删除该地区及其子节点，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteConfigData(data.id).then(() => {
          const parent = node.parent
          const children = parent.data.children || parent.data
          const index = children.findIndex(d => d.id === data.id)
          children.splice(index, 1)
          this.$message('配置项删除成功')
        })
      }).catch(() => { })


    },
    onEnableChange ($event, node, data) {
      console.log($event)
      this.updateTreeStatus(data, $event)
    },
    updateTreeStatus (data, $event) {
      this.$set(data, 'status', $event)
      if (data.children) {
        for (let i = 0; i < data.children.length; i++) {
          this.updateTreeStatus(data.children[i], $event)
        }
      } else {
        return
      }
    }
  }
}
</script>

<style lang="scss">
#setting-enum {
  height: 100%;
  display: flex;
  .box-card-left {
    flex: 0 0 200px;
    margin-right: 20px;
    padding: 20px;
    width: 300px;
    height: 100%;
    .el-card__header {
      color: #1e1f24;
      font-size: 14px;
      padding: 0;
      border-bottom: 0;
    }
    .el-card__body {
      padding-left: 0;
      .config-wrap {
        .config-item {
          position: relative;
          margin-bottom: 8px;
          font-size: 14px;
          padding-left: 10px;
          cursor: pointer;
          color: #1e1f24;
          &.active {
            color: #0080ff;
          }
          &::before {
            position: absolute;
            left: 0;
            top: -15px;
            display: block;
            content: "";
            height: 22px;
            width: 6px;
            border-left: 1px dashed #0080ff;
            border-bottom: 1px dashed #0080ff;
          }
        }
      }
    }
  }
  .box-card-right {
    flex: 1;
    height: 100%;
    padding: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .el-card__header {
      margin-bottom: 30px;
      padding: 0;
      border-bottom: 0;
      .header {
        display: flex;
        align-items: center;
        font-size: 18px;
        color: #1e1f24;
        .title {
          flex: 1;
        }
      }
    }
    .el-card__body {
      flex: 1;
      padding: 0;
      text-align: center;
      overflow-y: auto;
      .tree-wrap {
        display: inline-block;
        width: 400px;
        .el-tree-node__content {
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
          .el-input {
            width: 150px;
          }
        }
      }
    }
  }
}
</style>


