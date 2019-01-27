<template>
  <div id="data-case-manage">
  <el-row :gutter="24">
  <el-col :span="24">
  	<div class="grid-content bg-purple">
  		<el-form :inline="true" ref="form" :model="form" label-width="80px">
   <el-form-item >
  <el-select v-model="value" placeholder="请选择催收区域" clearable>
    <el-option
      v-for="item in form.options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item >
   <el-input v-model="form.user" placeholder="请输入批次" clearable></el-input>
  </el-form-item>
   <el-form-item >
  <el-select v-model="value" placeholder="请选择委托方" clearable>
    <el-option
      v-for="item in form.options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
   <el-form-item >
  <el-select v-model="value" placeholder="请选择案件类型" clearable>
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
      start-placeholder="委案开始日期"
      end-placeholder="委案结束日期"
      >
    </el-date-picker>
  </el-form-item>
  <el-form-item>
  <el-button type="text" icon="el-icon-caret-bottom" @click="dialogVisible = true"></el-button> 
  </el-form-item>
  <el-form-item>
  <el-button type="text" icon="el-icon-search">查询</el-button> 
  </el-form-item>
  <el-form-item>
  <el-button type="text" icon="el-icon-refresh" @click="resetForm('form')">重置</el-button> 
  </el-form-item>
  </el-form>
  	</div>
  </el-col>
  <el-col :span="10">
  	<div class="grid-content bg-purple">
  <el-form :inline="true">
      <el-form-item>
      <el-button type="primary" >添加评语</el-button>  </el-form-item>
      <el-form-item>
      <el-button type="primary"  @click="open7">申请协催</el-button>  </el-form-item>
       <el-form-item >
<el-select v-model="value" placeholder="导入" >
    <el-option
      v-for="item in form.options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
      </el-form-item>
</el-form>
  	</div>
  </el-col>
   </el-row>
   <el-table
    ref="multipleTable"
    :data="tableData3"
    style="width: 100%"
     @selection-change="handleSelectionChange"
  >
  <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="ID"
      >
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="催收区域"
      >
    </el-table-column>
    <el-table-column
      prop="address"
      label="催收状态"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="批次号"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="个案序列号"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="委案日期"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="预计退案日期"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="姓名"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="证件号"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="地区"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="卡号"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="委案金额"
      show-overflow-tooltip>
    </el-table-column>
     <el-table-column
      prop="address"
      label="委案余额"
      show-overflow-tooltip>
    </el-table-column>
     <el-table-column
      prop="address"
      label="上次通电时间"
      show-overflow-tooltip>
    </el-table-column>
     <el-table-column
      prop="address"
      label="最新催记"
      show-overflow-tooltip>
    </el-table-column>
     <el-table-column
      prop="address"
      label="催收员"
      show-overflow-tooltip>
    </el-table-column>
     <el-table-column
      prop="address"
      label="跟进次数"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="分配时间"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="承诺还款金额"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="待银行查账金额"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="已还金额"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="逾期账龄"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="分配历史"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="催收小结"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
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
  <el-dialog
  title="查询条件"
  :visible.sync="dialogVisible"
  width="50%"
  :before-close="handleClose">
<el-form :inline="true" :model="formInline" class="demo-form-inline">
	<el-row :gutter="24">
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  	<el-form-item label="批  次  号">
    <el-input v-model="formInline.user" placeholder="请输入批次号" clearable></el-input>
  </el-form-item>
  </div>
  </el-col>
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  		<el-form-item label="回款率">
        <el-input v-model="formInline.user" placeholder="请输入批次号" clearable></el-input>
  </el-form-item>
  		
  	</div>
  </el-col>
</el-row>
<el-row :gutter="24">
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  	<el-form-item label="催收区域">
<el-select v-model="value" placeholder="请选择催收区域" clearable>
    <el-option
      v-for="item in form.options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select> 
  	</el-form-item>
  </div>
  </el-col>
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  	<el-form-item label="委  托  方">
    <el-select v-model="value" placeholder="请选择委托方" clearable>
    <el-option
      v-for="item in form.options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
  	</div>
  </el-col>
</el-row><el-row :gutter="24">
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  	<el-form-item label="案件类型">
<el-select v-model="value" placeholder="请选择案件类型" clearable>
    <el-option
      v-for="item in form.options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>   
  	</el-form-item>
  </div>
  </el-col>
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  			<el-form-item label="委案日期">
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </el-form-item>
  		
  	</div>
  </el-col>
</el-row>
<el-row :gutter="24">
  <el-col :span="15">
  	<div class="grid-content bg-purple">
  	<el-form-item label="预计退案日期">
<el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  	</el-form-item>
  </div>
  </el-col> 
</el-row>
<el-row :gutter="24">
  <el-col :span="24">
  <el-form-item label="批次备注" >
    <el-input type="textarea" v-model="formInline.user" style="width: 200%;">></el-input>
  </el-form-item>
   </el-col>
</el-row>
</el-form>

<span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default {
  name: 'dataCaseManage',
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
        formInline:{},
        dialogVisible:false,
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
        value7: '',
        value1:''
    }
  },
methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      open7() {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
}
</script>

<style lang="scss">
#data-case-manage{

}
</style>
