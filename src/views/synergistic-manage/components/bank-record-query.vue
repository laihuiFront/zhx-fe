<template>
  <el-form id="repay-record-query" :model="queryForm" :inline="true" class="query-wrap">
    <el-form-item>
      <el-input style="width: 130px;" v-model="queryForm.dataCase.name" clearable placeholder="请输入姓名"></el-input>
    </el-form-item>
    <el-form-item>
      <el-select style="width: 150px;" clearable v-model="queryForm.dataCase.collectionArea.id" filterable placeholder="请选择催收区域">
        <el-option
          v-for="item in collectionAreaList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-select style="width: 150px;" v-model="queryForm.dataCase.batchNo" filterable placeholder="请选择批次" clearable>
        <el-option
          v-for="item in batchList"
          :key="item.batchNo"
          :label="item.batchNo"
          :value="item.batchNo">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-select style="width: 150px;" clearable v-model="queryForm.dataCase.client" filterable placeholder="请选择委托方">
        <el-option
          v-for="item in clientList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-date-picker
        @change="caseDateChange"
        clearable
        v-model="caseDate"
        value-format="yyyy-MM-dd"
        type="daterange"
        range-separator="至"
        start-placeholder="委案开始日期"
        end-placeholder="委案结束日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-popover
        placement="bottom-end"
        width="800"
        trigger="click">
        <ul class="condition-wrap">
          <li class="condition-item">
            <e-l-TreeSelect
                ref="treeSelectDept"
                v-model="queryForm.dataCase.dept"
                :selectParams="{'multiple': false,'clearable': true,'placeholder': '请选择回收部门'}"
                :treeParams="elTreeParamsDept">
            </e-l-TreeSelect>
          </li>
          <li class="condition-item">
            <el-select clearable v-model="queryForm.dataCase.collectionUser.id" filterable placeholder="请选择回收催收员">
              <el-option
                v-for="item in collectionUserList"
                :key="item.id"
                :label="item.userName"
                :value="item.id">
              </el-option>
            </el-select>
          </li>
          <li class="condition-item">
            <e-l-TreeSelect
                ref="treeSelectArea"
                v-model="queryForm.dataCase.caseArea.id"
                :selectParams="{'multiple': false,'clearable': true,'placeholder': '请选择地区'}"
                :treeParams="elTreeParamsArea">
            </e-l-TreeSelect>
          </li>
          <li class="condition-item">
            <el-select clearable v-model="queryForm.dataCase.status" filterable placeholder="请选择案件状态">
              <el-option
                v-for="item in statusList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </li>
          <li class="condition-item">
            <el-select clearable v-model="queryForm.dataCase.overdueBillTime" filterable placeholder="请选择逾期账龄">
              <el-option
                v-for="item in overdueBillTimeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </li>
          <li class="condition-item">
            <el-select v-model="queryForm.dataCase.collectStatus" filterable clearable placeholder="请选择催收状态">
              <el-option
                v-for="item in collectStatusList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </li>
          <li class="condition-item half">
            <el-date-picker
              @change="expectDateChange"
              clearable
              v-model="expectDate"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="预计退案开始日期"
              end-placeholder="预计退案结束日期">
            </el-date-picker>
          </li>
          <li class="condition-item">
            <el-select v-model="queryForm.dataCase.caseType" placeholder="请选择案件类型">
              <el-option
                clearable
                v-for="item in caseTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </li>
          <li class="condition-item">
            <el-input v-model="queryForm.dataCase.seqNo" clearable placeholder="请输入个案序列号"></el-input>
          </li>
          <li class="condition-item">
            <el-input v-model="queryForm.dataCase.identNo" clearable placeholder="请输入证件号"></el-input>
          </li>
          <li class="condition-item">
            <el-input v-model="queryForm.dataCase.account" clearable placeholder="请输入账号"></el-input>
          </li>
          <li class="condition-item">
            <el-input v-model="queryForm.dataCase.cardNo" clearable placeholder="请输入卡号"></el-input>
          </li>
          <li class="condition-item half">
            <el-date-picker
              @change="submitTimeChange"
              clearable
              v-model="submitTime"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="提交开始日期"
              end-placeholder="提交结束日期">
            </el-date-picker>
          </li>
        </ul>
        <img src="./zhankai.png" width="12" height="12" alt="更多" slot="reference">
      </el-popover>
      <el-button icon="el-icon-search" type="text" @click="$emit('query')">查询</el-button>
      <el-button icon="el-icon-refresh" type="text" @click="$emit('reset')">重置</el-button>
    </el-form-item>
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
import ELTreeSelect from '@/components/el-tree-select/elTreeSelect'
import {getEnum, getBatchList, getCollectionUserList, getStatusList} from '@/common/js/api-sync'
import { getDepartmentTree } from '@/common/js/api-setting'
export default {
  name:'repayRecordQuery',
  components:{
    ELTreeSelect,
  },
  props:{
    queryForm:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
      caseDate:[],
      expectDate: [],
      submitTime: [],
      collectionAreaList:[],
      batchList:[],
      clientList: [],
      collectionUserList: [],
      statusList: [],
      overdueBillTimeList: [],
      collectStatusList: [],
      caseTypeList: [],
      elTreeParamsDept: {
          'default-expand-all': true,
          filterable: false,
          'check-strictly': true,
          data: [],
          props: {
              children: 'children',
              label: 'orgName',
              value: 'id'
          }
      },
      elTreeParamsArea: {
          'default-expand-all': true,
          filterable: false,
          'check-strictly': true,
          data: [],
          props: {
              children: 'children',
              label: 'orgName',
              value: 'id'
          }
      }
      
    }
  },
  created(){
    this.initPage()
  },
  methods: {
    initPage(){
      getEnum('催收区域').then(data => this.collectionAreaList = data)
      getBatchList().then(data=> this.batchList = data)
      getEnum('委托方').then(data => this.clientList = data)
      getDepartmentTree().then(data => {
        this.$set(this.elTreeParamsDept, 'data', data)
        this.$refs.treeSelectDept.treeDataUpdateFun(data)
      })
      getEnum('地区').then(data => {
        this.$set(this.elTreeParamsArea, 'data', data)
        this.$refs.treeSelectArea.treeDataUpdateFun(data)
      })
      getCollectionUserList().then(data => this.collectionUserList = data)
      this.statusList = getStatusList()
      getEnum('逾期账龄').then(data => this.overdueBillTimeList = data)
      getEnum('催收状态').then(data => this.collectStatusList = data)
      getEnum('案件类型').then(data => this.caseTypeList = data)
    },
    caseDateChange(val){
      console.log(val)
      if(val){
        this.queryForm.dataCase.caseDateStart = val[0]
        this.queryForm.dataCase.caseDateEnd = val[1]
      }else{
        this.queryForm.dataCase.caseDateStart = null
        this.queryForm.dataCase.caseDateEnd = null
      }
    },
    expectDateChange(val){
      if(val){
        this.queryForm.dataCase.expectStartTime = val[0]
        this.queryForm.dataCase.expectEndTime = val[1]
      }else{
        this.queryForm.dataCase.expectStartTime = null
        this.queryForm.dataCase.expectEndTime = null
      }
    },
    submitTimeChange(val){
      if(val){
        this.queryForm.dataCase.submitTimeStart = val[0]
        this.queryForm.dataCase.submitTimeEnd = val[1]
      }else{
        this.queryForm.dataCase.submitTimeStart = null
        this.queryForm.dataCase.submitTimeEnd = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#repay-record-query{
}
</style>

