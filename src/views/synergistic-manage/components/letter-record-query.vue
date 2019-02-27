<template>
  <el-form id="letter-record-query" :model="queryForm" :inline="true" class="query-wrap">
    <el-form-item>
      <el-input style="width: 130px;" v-model="queryForm.userName" clearable placeholder="请输入姓名"></el-input>
    </el-form-item>
    <el-form-item>
      <e-l-TreeSelect
          style="width: 130px;"
          ref="treeSelect"
          v-model="queryForm.qy"
          :selectParams="{'multiple': false,'clearable': true,'placeholder': '请选择区域'}"
          :treeParams="elTreeParamsArea">
      </e-l-TreeSelect>
    </el-form-item>
    <el-form-item>
      <el-select style="width: 150px;" clearable v-model="queryForm.wtf" placeholder="请选择批次号">
        <el-option
          v-for="item in logTypeList"
          :key="item.key"
          :label="item.value"
          :value="item.key">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-select style="width: 150px;" clearable v-model="queryForm.wtf" placeholder="请选择委托方">
        <el-option
          v-for="item in logTypeList"
          :key="item.key"
          :label="item.value"
          :value="item.key">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-popover
        placement="bottom-end"
        width="800"
        trigger="click">
        <ul class="condition-wrap">
          <li class="condition-item">
            <el-input v-model="queryForm.gaxlh" clearable placeholder="请输入个案序列号"></el-input>
          </li>
          <li class="condition-item">
            <el-select clearable v-model="queryForm.hscsy" placeholder="请选择信函模板">
              <el-option
                v-for="item in logTypeList"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </li>
          <li class="condition-item half">
            <el-input v-model="queryForm.gaxlh" clearable placeholder="委案金额下限"></el-input> 至
            <el-input v-model="queryForm.gaxlh" clearable placeholder="请委案金额上限"></el-input>
          </li>
          <li class="condition-item half">
            <el-date-picker
              clearable
              v-model="tjsh"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="申请开始日期"
              end-placeholder="申请结束日期">
            </el-date-picker>
          </li>
          <li class="condition-item">
            <el-input v-model="queryForm.gaxlh" clearable placeholder="请输入申请人"></el-input>
          </li>
          <li class="condition-item">
            <el-select clearable v-model="queryForm.ajzt" placeholder="请选择案件状态">
              <el-option
                v-for="item in logTypeList"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </li>
        </ul>
        <img src="./zhankai.png" width="12" height="12" alt="更多" slot="reference">
      </el-popover>
      <el-button icon="el-icon-search" type="text">查询</el-button>
      <el-button icon="el-icon-refresh" type="text">重置</el-button>
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
      warq:[],
      yjtar:[],
      tjsj:[],
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
  }
}
</script>

<style lang="scss" scoped>
#letter-record-query{
}
</style>

