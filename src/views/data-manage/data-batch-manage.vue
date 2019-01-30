<template>
  <div id="data-batch-manage">
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
  <el-select v-model="value" placeholder="批次状态" clearable>
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
      value-format="yyyy-MM-dd"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="委案开始日期"
      end-placeholder="委案结束日期"
      >
    </el-date-picker>
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
  <el-col :span="18">
  	<div class="grid-content bg-purple">
  <el-form :inline="true">
      <el-form-item>
      <el-button type="primary" @click="dialogVisible = true">批次退案</el-button>  </el-form-item>
      <el-form-item>
      <el-button type="primary"  @click="open7">批次删除</el-button>  </el-form-item>
      <el-form-item>
      <el-button type="primary"  @click="dialogVisible1 = true">导出查询结果</el-button>  </el-form-item>
      <el-form-item>
      <el-button type="primary" >导出所选批次</el-button>  </el-form-item>
      <el-form-item>
      <el-button type="primary">批量导出批次催记</el-button>  </el-form-item>
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
      label="催收区域"
      >
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      label="批次号"
      >
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="委托方"
    >
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
      label="总金额"
      show-overflow-tooltip>
      <template slot-scope="scope">
        ￥
      </template>
    </el-table-column>
   <el-table-column
      prop="address"
      label="案件类型"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="预计退案时间"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="实际退案时间"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="录入时间"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="批次备注"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="录入人员"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="备注"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="操作"
      show-overflow-tooltip>
       <template slot-scope="scope">
        <el-button type="text" size="small">追加</el-button>
        <el-button type="text" size="small">退案</el-button>
        <el-button type="text" size="small">编辑</el-button>
        <el-button type="text" size="small">删除</el-button>
        <el-button type="text" size="small">到处催记</el-button>

      </template>
    </el-table-column>
  </el-table>
  <el-row :gutter="20">
  <el-col :span="16">
  	<div class="grid-content bg-purple">
  		<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  		<span class="textColor">列表户数：1111</span>
  		<span class="textColor">列表金额：￥1111</span>
  	</div>
  </el-col>
</el-row>
<el-dialog
  title="导出查询结果"
  :visible.sync="dialogVisible1"
  width="30%"
  :before-close="handleClose">
  <el-row :gutter="20">
  <el-col :span="10"><div class="grid-content bg-purple"> 
  	<el-button type="primary">按查询条件全部导出</el-button>
</div></el-col>
  <el-col :span="10">
  	<div class="grid-content bg-purple">  
  		<el-button type="primary">按查询条件导出当前分页</el-button>
</div></el-col>
</el-row>
</el-dialog>
  </div>
</template>

<script>
export default {
  name: 'dataBatchManage',
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
        dialogVisible1:false,
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
      },
   }
}
</script>

<style lang="scss">
#data-batch-manage{
  .textColor{
  	display: inline-block;
  color: #66b1ff;
  padding-top: 8px;
  }
}
</style>

