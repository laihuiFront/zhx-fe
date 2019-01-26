<template>
  <div id="setting-enum">
    <el-card class="box-card-left">
      <template slot="header">配置项目</template>
      <ul class="config-wrap">
        <li class="config-item" @click="activeIndex=index" :class="{active:index===activeIndex}" v-for="(config, index) in configList" :key="config.id">
          {{config.name}}
        </li>
      </ul>
    </el-card>
    <el-card class="box-card-right">
      <div slot="header" class="header">
        <span class="title">{{currentEnum.name}}</span>
        <el-button type="primary" @click="onClickAdd">新增</el-button>
        <el-button type="primary" @click="onclickSave">保存</el-button>
      </div>
      <div v-if="currentEnum.name && currentEnum.name === '地区'">地区</div>
      <el-table
        v-if="currentEnum.name && currentEnum.name !== '地区'"
        :data="configData"
        style="width: 100%">
        <el-table-column
          prop="date"
          :label="currentEnum.name">
          <template slot-scope="scope">
            <el-input v-if="scope.row.editType==='edit' || scope.row.editType==='add'" clearable v-model="scope.row.tempName" :placeholder="'请输入'+currentEnum.name"></el-input>
            <span v-else>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="currentEnum.name==='催收模板'"
          prop="date"
          label="对应通话记录">
          <template slot-scope="scope">
            <el-input v-if="scope.row.editType==='edit' || scope.row.editType==='add'" clearable v-model="scope.row.tempDescription" :placeholder="'请输入'"></el-input>
            <span v-else>{{scope.row.description}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="启用">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0"></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.editType !== 'edit' && scope.row.editType !== 'add'" type="text" @click="onClickEdit(scope.row)">修改</el-button>
            <el-button v-if="scope.row.editType !== 'edit' && scope.row.editType !== 'add'" type="text" @click="onclickDelete(scope.row, scope.$index)">删除</el-button>
            <el-button v-if="scope.row.editType==='edit' || scope.row.editType==='add'" type="text" @click="onClickCancel(scope.row, scope.$index)">取消</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {getConfigList,insertConfigData,deleteConfigData} from '@/common/js/api-setting'
export default {
  name: 'settingEnum',
  data() {
    return {
      configList: [],
      activeIndex: 0,
      configData:[]
    }
  },
  computed: {
    currentEnum(){
      if(this.configList.length){
        return this.configList[this.activeIndex]
      }else{
        return {}
      }
    }
  },
  watch: {
    currentEnum(newVal,OldVal) {
      if(newVal.id) {
        getConfigList(newVal.id).then(response => this.configData = response)
      }
    }
  },
  created() {
    getConfigList().then(response => this.configList = response)
  },
  methods: {
    onClickAdd() {
      if(this.currentEnum.name == '地区') {

      } else {
        this.configData.unshift({
          status:1,
          editType: 'add'
        })
      }
    },
    onclickSave(){
      const toSaveList = this.configData.filter(item => item.editType === 'add' || item.editType === 'edit')
      const hasEmpty = toSaveList.some(item => {
        if(this.currentEnum.name === '催收模板'){
          return !(item.tempName && item.tempDescription)
        } else {
          return !item.tempName
        }
      })
      if(hasEmpty){
        this.$message('修改或删除的配置项含有空值,请修改后重新提交')
        return
      }
      const data = toSaveList.map((item)=>{
        if(item.editType === 'add'){
          return {
            type: 0,
            name: item.tempName,
            status: item.status,
            description: item.tempDescription,
            parent:{
              id: this.currentEnum.id
            }
          }
        } else {
          return {
            type: 0,
            id: item.id,
            name: item.tempName,
            status: item.status,
            description: item.tempDescription,
            parent:{
              id: this.currentEnum.id
            }
          }
        }
      })
      insertConfigData(data).then(()=>{
        this.$message('保存成功')
        getConfigList(this.currentEnum.id).then(response=>this.configData = response)
      })
    },
    onClickEdit(row) {
      this.$set(row,'tempName',row.name)
      this.$set(row,'tempDescription',row.description)
      this.$set(row, 'editType', 'edit')
    },
    onClickCancel(row, index) {
      if(row.editType === 'edit') {
        this.$set(row, 'editType', '')
      } else {
        this.configData.splice(index, 1)
      }
    },
    onclickDelete(row,index){
      this.$confirm('此操作将永久删除该配置，是否继续？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        deleteConfigData(row.id).then(()=>{
          this.configData.splice(index,1)
          this.$message('配置项删除成功')
        })
      }).catch(()=>{})
    }
  }
}
</script>

<style lang="scss">
#setting-enum{
  height: 100%;
  display: flex;
  .box-card-left{
    flex: 0 0 200px;
    margin-right: 20px;
    padding: 20px;
    width: 300px;
    height: 100%;
    .el-card__header{
      color: #1e1f24;
      font-size: 14px;
      padding: 0;
      border-bottom: 0;
    }
    .el-card__body{
      padding-left: 0;
      .config-wrap{
        .config-item{
          position: relative;
          margin-bottom: 8px;
          font-size: 14px;
          padding-left: 10px;
          cursor: pointer;
          color: #1e1f24;
          &.active{
            color: #0080ff;
          }
          &::before{
            position: absolute;
            left: 0;
            top: -15px;
            display: block;
            content: '';
            height: 22px;
            width: 6px;
            border-left: 1px dashed #0080ff;
            border-bottom: 1px dashed #0080ff;
          }
        }
      }

    }
  }
  .box-card-right{
    flex: 1;
    height: 100%;
    padding: 20px;
    overflow-y: auto;
    .el-card__header{
      margin-bottom: 30px;
      padding: 0;
      border-bottom: 0;
      .header{
        display: flex;
        align-items: center;
        font-size: 18px;
        color: #1e1f24;
        .title{
          flex: 1;
        }
      }
    }
    .el-card__body{
      padding: 0;
    }
  }
}
</style>


