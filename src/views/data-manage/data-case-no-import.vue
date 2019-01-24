<template>
  <div id="data-case-no-import">
  	<el-row :gutter="24">
  <el-col :span="24">
  	<div class="grid-content bg-purple">
  		<el-form :inline="true" ref="form" :model="form" label-width="80px">
   <el-form-item >
  <el-select v-model="value" placeholder="请选择催收区域">
    <el-option
      v-for="item in form.options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item >
   <el-input v-model="form.user" placeholder="请输入批次"></el-input>
  </el-form-item>
   <el-form-item >
  <el-select v-model="value" placeholder="请选择催收区域">
    <el-option
      v-for="item in form.options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
   <el-form-item >
  <el-select v-model="value" placeholder="请选择催收区域">
    <el-option
      v-for="item in form.options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
   <el-form-item >
 <el-date-picker
      v-model="value7"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      >
    </el-date-picker>
  </el-form-item>
  <el-form-item>
  <el-button type="text" icon="el-icon-search">查询</el-button> 
  </el-form-item>
  <el-form-item>
  <el-button type="text" icon="el-icon-refresh">重置</el-button> 
  </el-form-item>
  </el-form>
  	</div>
  </el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  <el-form :inline="true">
  		<el-form-item>
      <el-button type="text">导入模板下载</el-button> 
      </el-form-item>
      <el-form-item>
      <el-button type="primary">新增批次</el-button>  </el-form-item>
      <el-form-item>
      <el-button type="primary">删除批次</el-button>  </el-form-item>
</el-form>
  	</div>
  </el-col>
   </el-row>
   <el-table
    ref="multipleTable"
    :data="tableData3"
    style="width: 100%"
   >
    <el-table-column
      label="批次号"
      width="120">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="委托方"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="批次状态"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="委案日期"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="户数"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="总金额"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="上传时间"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="批次备注"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="操作"
      show-overflow-tooltip>
       <template slot-scope="scope">
        <el-button type="text" size="small">导入</el-button>
        <el-button type="text" size="small">下载</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
  </div>
</template>

<script>
export default {
  name: 'dataCaseNoImport',
  data(){
    return {
    	pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        tableData3:{},
        currentPage4: 1,
    	form:{
    		user:'',
    		options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
    	},
        value7: ''
    }
  },
}
</script>

<style lang="scss">
#data-case-no-import{

}
</style>
