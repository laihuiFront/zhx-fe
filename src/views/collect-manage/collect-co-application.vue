<template>
  <div id="collect-co-application">
    <el-form :inline="true" ref="form1" :model="form1" label-width="80px">
      <el-form-item prop="val2">
        <el-select
          v-model="form1.val2"
          placeholder="部门"
          clearable
        >
          <el-option
            v-for="item in val2_data"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="val3">
        <el-input
          v-model="form1.val3"
          placeholder="催收员"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="val4">
        <el-input
          v-model="form1.val4"
          placeholder="委托方"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="val5">
        <el-date-picker
          v-model="form1.val5"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="委托起始日期"
          end-placeholder="委托结束日期"
        >
        </el-date-picker>
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
    <div style="padding: 10px 0;">
      <el-button>同意协催</el-button>
      <el-button>撤销协催</el-button>
    </div>
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
        <el-button>同意</el-button>
        <el-button>撤销</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'collectCoApplication',
  data(){
    return{
      form1:{
        val2:'',
        val3:'',
        val4:'',
        val5:'',
        val6:'',
      },
      val2_data: [],
      tableData: [],
      tablecol_data:[
        {
          prop:'a12',
          label:'申请内容'
        },
        {
          prop:'a12',
          label:'个案序列号'
        },
        {
          prop:'a12',
          label:'申请时间'
        },{
          prop:'a12',
          label:'申请人'
        }
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
#collect-co-application{
  
}
</style>

