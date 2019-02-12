<template>
  <div id="data-case-manage">
  <el-row :gutter="24">
  <el-col :span="24">
  	<div class="grid-content bg-purple">
  		<el-form :inline="true" ref="form" :model="form" label-width="80px">
   <el-form-item >
  <el-select v-model="form.area" placeholder="请选择催收区域" clearable>
    <el-option
      v-for="item in areaList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item >
   <el-input v-model="form.batchNo" placeholder="请输入批次" clearable></el-input>
  </el-form-item>
   <el-form-item >
  <el-select v-model="form.client" placeholder="请选择委托方" clearable>
    <el-option
      v-for="item in clientList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
   <el-form-item >
  <el-select v-model="value" placeholder="请选择案件类型" clearable>
    <el-option
      v-for="item in caseTypeList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
   <el-form-item >
 <el-date-picker
      v-model="form.time"
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
  <el-button type="text" icon="el-icon-search" @click="search">查询</el-button> 
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
      prop="id"
      >
     
    </el-table-column>
    <el-table-column
      prop="area"
      label="催收区域"
      >
    </el-table-column>
    <el-table-column
      prop="collectStatus"
      label="催收状态"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="batchNo"
      label="批次号"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="seqNo"
      label="个案序列号"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="caseDate"
      label="委案日期"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="expectTime"
      label="预计退案日期"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="cardNo"
      label="证件号"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="地区"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="cardNo"
      label="卡号"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="委案金额"
      show-overflow-tooltip>
    </el-table-column>
     <el-table-column
      prop="balance"
      label="委案余额"
      show-overflow-tooltip>
    </el-table-column>
     <el-table-column
      prop="collectDate"
      label="上次通电时间"
      show-overflow-tooltip>
    </el-table-column>
     <el-table-column
      prop="newCase"
      label="最新催记"
      show-overflow-tooltip>
    </el-table-column>
     <el-table-column
      prop="odv"
      label="催收员"
      show-overflow-tooltip>
    </el-table-column>
     <el-table-column
      prop="collectTimes"
      label="跟进次数"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="distributeTime"
      label="分配时间"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="proRepayAmt"
      label="承诺还款金额"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="bankAmt"
      label="待银行查账金额"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="enRepayAmt"
      label="已还金额"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="accountAge"
      label="逾期账龄"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="distributeHistory"
      label="分配历史"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="summary"
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
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
  <el-dialog
  title="查询条件"
  :visible.sync="dialogVisible"
  width="60%"
  :before-close="handleClose">
	<el-form :inline="true" :model="formInline" class="demo-form-inline">
	 <el-row :gutter="20">
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  		<el-form-item label="批次号">
    <el-input v-model="formInline.batchNo" placeholder="请输入批次号"></el-input>
  </el-form-item>
  	</div></el-col>
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  		  <el-form-item label="证件号">
    <el-input v-model="formInline.identNo" placeholder="请输入证件号"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>
 <el-row :gutter="20">
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  		<el-form-item label=" 卡  号  ">
    <el-input v-model="formInline.cardNo" placeholder="请输入卡号"></el-input>
  </el-form-item>
  	</div></el-col>
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  		  <el-form-item label="催收记录">
    <el-input v-model="formInline.collectInfo" placeholder="请输入证件号"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  		<el-form-item label="个案序列号">
    <el-input v-model="formInline.seqno" placeholder="请输入个案序列号"></el-input>
  </el-form-item>
  	</div></el-col>
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  		  <el-form-item label="部门">
   <el-select v-model="formInline.dept" placeholder="请选择催收区域" clearable>
    <el-option
      v-for="item in departmentList"
      :key="item.id"
      :label="item.orgName"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  	</div></el-col>
</el-row>
 <el-row :gutter="20">
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  		<el-form-item label="催收区域">
   <el-select v-model="formInline.area" placeholder="请选择催收区域" clearable>
    <el-option
      v-for="item in areaList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  	</div></el-col>
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  		  <el-form-item label="催收员">
    <el-select v-model="formInline.odv" filterable  placeholder="请选择催收员" clearable>
    <el-option
      v-for="item in PersonList"
      :key="item.createTime"
      :label="item.userName"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  	</div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  		<el-form-item label="催收结果">
   <el-select v-model="formInline.result" placeholder="请选择催收结果" clearable>
    <el-option
      v-for="item in EndList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  	</div></el-col>
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  		  <el-form-item label="委托方">
    <el-select v-model="formInline.client" filterable  placeholder="请选择委托方" clearable>
    <el-option
      v-for="item in clientList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  	</div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  		<el-form-item label="催收措施">
   <el-select v-model="formInline.measure" placeholder="请选择催收措施" clearable>
    <el-option
      v-for="item in EndList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  	</div></el-col>
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  		  <el-form-item label="案件状态">
    <el-select v-model="formInline.caseStatus" filterable  placeholder="请选择案件状态" clearable>
    <el-option
      v-for="item in caseStatusList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  	</div></el-col>
</el-row>
<el-row :gutter="20">
	<el-col :span="10">
  	<div class="grid-content bg-purple">
  		<el-form-item label="标色状态">
   <el-select v-model="formInline.color" filterable  placeholder="请选择标色状态" clearable>
    <el-option
      v-for="item in caseStatusList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  	</div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="14">
  	<div class="grid-content bg-purple">
  		<el-form-item label="催收日期">
   <el-date-picker
      v-model="formInline.collectTime"
      type="daterange"
      align="right"
       value-format="yyyy-MM-dd"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      >
    </el-date-picker>
  </el-form-item>
  	</div></el-col>
 </el-row>
<el-row :gutter="20">
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  		<el-form-item label="委案日期">
   <el-date-picker
      v-model="formInline.bailTime"
      type="daterange"
      align="right"
       value-format="yyyy-MM-dd"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      >
    </el-date-picker>
  </el-form-item>
  	</div></el-col>
</el-row> 	
</el-row>
<el-row :gutter="20">
  <el-col :span="16">
  	<div class="grid-content bg-purple">
  		  <el-form-item label="预计退案日期" label-width="100px">
   <el-date-picker
      v-model="formInline.expectTime"
      type="daterange"
      align="right"
       value-format="yyyy-MM-dd"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      >
    </el-date-picker>
  </el-form-item>
  	</div></el-col>
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
	import {dataList,areaList,caseTypeList,clientList,EndList,PersonList,departmentList,search} from '@/common/js/data-case-manage.js'
export default {
  name: 'dataCaseManage',
  data(){
    return {
    	pageSize:10,
    	pageNum:1,
    	clientList:[],
    	caseTypeList:[],
    	  areaList:[],
        formInline:{},
        dialogVisible:false,
        tableData3:{},
        currentPage4: 1,
    	form:{
    		time:[]
    	}
    }
  },
methods: {
	search(){
		let caseDateStart=this.form.time[0]
		let caseDateEnd=this.form.time[1]
		search(this.form.area,this.form.batchNo,this.form.client,caseDateStart,caseDateEnd,this.pageSize,this.pageNum).then((response)=>{
          	this.tableData3=response
          })
	},
	handleSizeChange(val){
	this.pageSize=val 
	this.search()
},
handleCurrentChange(val){
this.pageNum=val;
this.search()
},
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
      	  dataList().then((response)=>{
          	this.tableData3=response
          })
           areaList().then((response)=>{
          	this.areaList=response
          })
            caseTypeList().then((response)=>{
          	this.caseTypeList=response
          })
            clientList().then((response)=>{
          	this.clientList=response
          })
            EndList().then((response)=>{
          	this.EndList=response
          })
             PersonList().then((response)=>{
          	this.PersonList=response
          	this.form.PersonList=response
          })
              departmentList().then((response)=>{
          	this.departmentList=response
          })
},
}
</script>

<style lang="scss">
#data-case-manage{
.el-form--inline .el-form-item{
	margin-right:0px;
}
}
</style>
