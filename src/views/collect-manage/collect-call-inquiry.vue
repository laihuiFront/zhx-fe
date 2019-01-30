<template>
  <div id="collect-call-inquiry">

    <el-form :inline="true" ref="form1" :model="form1" label-width="80px">
      <el-form-item prop="val1">
        <el-radio-group v-model="form1.val1">
          <el-radio label="精确"></el-radio>
          <el-radio label="模糊"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="val2">
        <el-autocomplete
          class="inline-input"
          v-model="form1.val2"
          :fetch-suggestions="querySearch"
          placeholder="委托方"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item prop="val3">
        <el-input
          v-model="form1.val3"
          placeholder="姓名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="val4">
        <el-input
          v-model="form1.val4"
          placeholder="电话"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="val5">
        <el-input
          v-model="form1.val5"
          placeholder="地址"
          clearable
        ></el-input>
      </el-form-item><el-form-item prop="val6">
        <el-input
          v-model="form1.val6"
          placeholder="证件号"
          clearable
        ></el-input>
      </el-form-item><el-form-item prop="val7">
        <el-input
          v-model="form1.val7"
          placeholder="卡号"
          clearable
        ></el-input>
      </el-form-item><el-form-item prop="val8">
        <el-input
          v-model="form1.val8"
          placeholder="单位名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="text" icon="el-icon-search">查询</el-button>
        <el-button
          type="text"
          icon="el-icon-refresh"
          @click="resetForm('form1')"
        >重置</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column
        v-for="(item, index) in tablecol_data"
        v-bind="item"
        :key="index"
      ></el-table-column>
      <el-table-column label="操作">
        <el-button>
          评语
        </el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'collectCallInquiry',
  data(){
    return {
      form1:{
        val1:'精确',
        val2:'',
        val3:'',
        val4:'',
        val5:'',
        val6:'',
        val7:'',
        val8:'',
      },
      tableData: [],
      tablecol_data:[
        {
          prop:'a12',
          label:'个案序列号'
        },
        {
          prop:'a12',
          label:'姓名'
        },{
          prop:'a12',
          label:'卡号'
        },{
          prop:'a12',
          label:'委案金额'
        },{
          prop:'a12',
          label:'委案日期'
        },{
          prop:'a12',
          label:'催收状态'
        },{
          prop:'a12',
          label:'上次通电'
        },{
          prop:'a12',
          label:'承诺还款金额'
        },{
          prop:'a12',
          label:'已还款金额'
        },{
          prop:'a12',
          label:'账龄'
        },{
          prop:'a12',
          label:'催收员'
        },
      ]
    }
  },
  methods:{
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    querySearch(queryString, cb) {
      cb([]);
    },
  }
}
</script>

<style lang="scss">
#collect-call-inquiry{
  
}
</style>


