<template>
  <el-form id="syn-record-query" :model="queryForm" :inline="true" class="query-wrap">
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
          :key="item.id"
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
            <el-select v-model="queryForm.dataCase.collectStatus" filterable clearable placeholder="请选择催收状态">
              <el-option
                v-for="item in collectStatusList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </li>
          <li class="condition-item">
            <el-select v-model="queryForm.synergisticType.name" filterable clearable placeholder="请选择协催类型">
              <el-option
                v-for="item in synergisticTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </li>
          <li class="condition-item half">
            <el-input v-model="queryForm.dataCase.moneyStart" clearable placeholder="委案金额下限"></el-input> 至
            <el-input v-model="queryForm.dataCase.moneyEnd" clearable placeholder="请委案金额上限"></el-input>
          </li>
          <li class="condition-item">
            <el-input v-model="names" @change="namesChange" type="textarea" :rows="3" clearable placeholder="请输入姓名"></el-input>
          </li>
          <li class="condition-item">
            <el-input v-model="seqNos" @change="seqNosChange" type="textarea" :rows="3" clearable placeholder="请输入个案序列号"></el-input>
          </li>
          <li class="condition-item">
            <el-input v-model="identNos" @change="identNosChange" type="textarea" :rows="3" clearable placeholder="请输入证件号"></el-input>
          </li>
          <li class="condition-item">
            <el-input v-model="queryForm.applyUser.name" clearable placeholder="请输入申请人"></el-input>
          </li>
          <li class="condition-item half">
            <el-date-picker
              @change="applyTimeChange"
              clearable
              v-model="applyTime"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="委案开始日期"
              end-placeholder="委案结束日期">
            </el-date-picker>
          </li>
        </ul>
        <img src="./zhankai.png" width="12" height="12" alt="更多" slot="reference">
      </el-popover>
      <el-button icon="el-icon-search" type="primary" @click="$emit('query')">查询</el-button>
      <el-button icon="el-icon-refresh" type="primary" @click="$emit('reset')">重置</el-button>
    </el-form-item>
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
import {getEnum,getBatchList,getStatusList} from '@/common/js/api-sync'
export default {
  name:'repayRecordQuery',
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
      applyTime:[],
      collectionAreaList: [],
      batchList:[],
      clientList:[],
      statusList: [],
      collectStatusList:[],
      synergisticTypeList:[],
      names:null,
      seqNos:null,
      identNos:null
    }
  },
  created(){
    this.initPage()
  },
  methods:{
    initPage(){
      getEnum('催收区域').then(data => this.collectionAreaList = data)
      getBatchList().then(data=> this.batchList = data)
      getEnum('委托方').then(data => this.clientList = data)
      this.statusList = getStatusList()
      getEnum('催收状态').then(data => this.collectStatusList = data)
      getEnum('协催类型').then(data => this.synergisticTypeList = data)
    },
    namesChange(val){
      console.log(val)
      if(val){
        this.queryForm.dataCase.names = val.split('\n')
      }else{
        this.queryForm.dataCase.names = null
      }
    },
    seqNosChange(val){
      if(val){
        this.queryForm.dataCase.seqNos = val.split('\n')
      }else{
        this.queryForm.dataCase.seqNos = null
      }
    },
    identNosChange(val){
      if(val){
        this.queryForm.dataCase.identNos = val.split('\n')
      }else{
        this.queryForm.dataCase.identNos = null
      }
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
    applyTimeChange(val){
      console.log(val)
      if(val){
        this.queryForm.applyTimeStart = val[0]
        this.queryForm.applyTimeEnd = val[1]
      }else{
        this.queryForm.applyTimeStart = null
        this.queryForm.applyTimeEnd = null
      }
    },
  }
}
</script>

<style lang="scss" scoped>
#syn-record-query{
}
</style>

