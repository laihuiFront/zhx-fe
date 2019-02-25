<template>
  <el-form id="repay-record-query" :model="queryForm" :inline="true" class="query-wrap">
    <el-form-item>
      <el-input style="width: 130px;" v-model="queryForm.dataCase.name" clearable placeholder="请输入姓名"></el-input>
    </el-form-item>
    <el-form-item>
      <e-l-TreeSelect
          style="width: 130px;"
          ref="treeSelect"
          v-model="queryForm.dataCase.collectionArea.id"
          :selectParams="{'multiple': false,'clearable': true,'placeholder': '请选择区域'}"
          :treeParams="elTreeParamsArea">
      </e-l-TreeSelect>
    </el-form-item>
    <el-form-item>
      <el-select style="width: 150px;" clearable v-model="queryForm.dataCase.batchNo" placeholder="请选择批次号">
        <el-option
          v-for="item in logTypeList"
          :key="item.key"
          :label="item.value"
          :value="item.key">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-select style="width: 150px;" clearable v-model="queryForm.dataCase.client" placeholder="请选择委托方">
        <el-option
          v-for="item in logTypeList"
          :key="item.key"
          :label="item.value"
          :value="item.key">
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
            <el-select clearable v-model="queryForm.dataCase.collectionUser.id" placeholder="请选择回收催收员">
              <el-option
                v-for="item in logTypeList"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </li>
          <li class="condition-item">
            <e-l-TreeSelect
                ref="treeSelectDept"
                v-model="queryForm.dataCase.caseArea.id"
                :selectParams="{'multiple': false,'clearable': true,'placeholder': '请选择地区'}"
                :treeParams="elTreeParamsDept">
            </e-l-TreeSelect>
          </li>
          <li class="condition-item">
            <el-select clearable v-model="queryForm.dataCase.status" placeholder="请选择案件状态">
              <el-option
                v-for="item in logTypeList"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </li>
          <li class="condition-item">
            <el-input v-model="queryForm.dataCase.overdueBillTime" clearable placeholder="请输入逾期账龄"></el-input>
          </li>
          <li class="condition-item">
            <el-select v-model="queryForm.dataCase.collectStatus" clearable placeholder="请选择催收状态">
              <el-option
                v-for="item in logTypeList"
                :key="item.key"
                :label="item.value"
                :value="item.key">
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
                v-for="item in logTypeList"
                :key="item.key"
                :label="item.value"
                :value="item.key">
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
          <li class="condition-item">
            <el-input v-model="queryForm.confirmUser.name" clearable placeholder="请输入确认人"></el-input>
          </li>
          <li class="condition-item half">
            <el-date-picker
              @change="confirmTimeChange"
              clearable
              v-model="confirmTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="至"
              start-placeholder="确认开始日期"
              end-placeholder="确认结束日期">
            </el-date-picker>
          </li>
          <li class="condition-item half">
            <el-date-picker
              @change="repayDateChange"
              clearable
              v-model="repayDate"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="还款开始日期"
              end-placeholder="还款结束日期">
            </el-date-picker>
          </li>
        </ul>
        <img src="./zhankai.png" width="12" height="12" alt="更多" slot="reference">
      </el-popover>
      <el-button icon="el-icon-search" type="text">查询</el-button>
      <el-button icon="el-icon-refresh" type="text" @click="$emit('reset')">重置</el-button>
    </el-form-item>
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
import ELTreeSelect from '@/components/el-tree-select/elTreeSelect'
import { getDepartmentTree } from '@/common/js/api-setting'
import {getLogType} from '@/common/js/api-setting'
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
      logTypeList:[],
      caseDate:[],
      expectDate:[],
      confirmTime:[],
      repayDate:[],
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
      },
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
      }
    }
  },
  created(){
    getDepartmentTree().then(data => {
      this.$set(this.elTreeParamsArea, 'data', data)
       this.$refs.treeSelect.treeDataUpdateFun(data)
    })
    getDepartmentTree().then(data => {
      this.$set(this.elTreeParamsDept, 'data', data)
       this.$refs.treeSelectDept.treeDataUpdateFun(data)
    })
    getLogType().then((response) => this.logTypeList = response)
  },
  methods:{
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
    confirmTimeChange(val){
      if(val){
        this.queryForm.confirmTimeStart = val[0]
        this.queryForm.confirmTimeEnd = val[1]
      }else{
        this.queryForm.confirmTimeStart = null
        this.queryForm.confirmTimeEnd = null
      }
    },
    repayDateChange(val){
      if(val){
        this.queryForm.repayDateStart = val[0]
        this.queryForm.repayDateEnd = val[1]
      }else{
        this.queryForm.repayDateStart = null
        this.queryForm.repayDateEnd = null
      }
    },
  }
}
</script>

<style lang="scss" scoped>
#repay-record-query{
}
</style>

