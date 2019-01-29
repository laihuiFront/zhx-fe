<template>
  <div id="data-memorize-manage">
  	<el-row :gutter="24">
  <el-col :span="24">
  	<div class="grid-content bg-purple">
  		<el-form :inline="true" ref="form" :model="form" label-width="80px">
   <el-form-item >
    <el-select v-model="form.area" placeholder="请选择催收区域" clearable>
    <el-option
      v-for="item in areaList"
      :key="item.value"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>   
  </el-form-item>
  <el-form-item >
<el-select v-model="form.dept" placeholder="部门" clearable>
    <el-option
      v-for="item in sectionList"
      :key="item.value"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>   </el-form-item>
   <el-form-item >
<el-select v-model="value" placeholder="催收员" clearable>
    <el-option
      v-for="item in form.options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>   </el-form-item>
   <el-form-item >
  <el-select v-model="value" placeholder="催收措施" clearable>
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
      value-format="yyyy-MM-dd"
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
  <el-button type="text" icon="el-icon-refresh" @click="resetForm">重置</el-button> 
  </el-form-item>
  </el-form>
  	</div>
  </el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  <el-form :inline="true">
  	<el-form-item>
      <el-button type="primary" @click="open7">删除催记</el-button> 
      </el-form-item>
  		<el-form-item>
      <el-button type="primary" @click="dialogVisible = true">导出所有催记</el-button> 
      </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="dialogVisible2 = true">导出查询结果</el-button>  </el-form-item> 
</el-form>
  	</div>
  </el-col>
   </el-row>
   <el-table
    ref="multipleTable"
    :data="tableData3"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="证件号"
      >
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      >
    </el-table-column>
    <el-table-column
      prop="address"
      label="电话类型"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="电话号码"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="备注"
      show-overflow-tooltip>
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
  title="导出查询结果"
  :visible.sync="dialogVisible2"
  width="30%"
  :before-close="handleClose">
  <el-form :inline="true">
  	<el-form-item>
    <el-button @click="dialogVisible2 = false">按查询条件全部导出</el-button>
    </el-form-item>
     	<el-form-item>
    <el-button @click="dialogVisible2 = false">按查询条件导出当前分页</el-button>
    </el-form-item>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
  </span>
  </el-form>
</el-dialog>
  </div>
</template>

<script>
import {areaList,sectionList} from '@/common/js/data-memorize-manage.js'
export default {
  name: 'dataMemorizeManage',
  data(){
    return {
    	  areaList:[],
        dynamicValidateForm:{},
        dialogVisible:false,
        dialogVisible2:false,
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
        value:''
    }
  },
  methods: {
  	resetForm(){
  		this.form={}
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
    },
      created() {
          areaList().then((response)=>{
          	this.areaList=response
          })
           sectionList().then((response)=>{
          	this.sectionList=response
          })
},
}
</script>

<style lang="scss">
#data-memorize-manage{
  .el-dialog__header{
  	background-color: #f8f8f8;
  
  }
}
</style>


