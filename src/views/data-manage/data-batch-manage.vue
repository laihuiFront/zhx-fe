<template>
  <div id="data-batch-manage">
   <el-row :gutter="24">
  <el-col :span="24">
  	<div class="grid-content bg-purple">
  		<el-form :inline="true" ref="form" :model="form" label-width="80px">
   <el-form-item >
  <el-select v-model="form.area" placeholder="请选择催收区域" clearable>
    <el-option
      v-for="item in form.areaList"
      :key="item.value"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
   <el-form-item >
  <el-select v-model="form.batchStatus" placeholder="批次状态" clearable>
    <el-option
      v-for="item in form.CasestatusList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item >
    <el-select v-model="form.batchNos" placeholder="请选择批次编号" filterable multiple clearable>
      <el-option
        v-for="item in form.batchList"
        :key="item.batchNo"
        :label="item.batchNo"
        :value="item.batchNo">
      </el-option>
    </el-select>
  </el-form-item>
   <el-form-item >
  <el-select v-model="form.clients" placeholder="请选择委托方" filterable
             multiple clearable>
    <el-option
      v-for="item in form.clientList"
      :key="item.value"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
   <el-form-item >
  <el-select v-model="form.caseType" placeholder="请选择案件类型" clearable>
    <el-option
      v-for="item in form.caseTypeList"
      :key="item.value"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
   <el-form-item >
 <el-date-picker
      v-model="form.time"
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
  <el-button type="text" icon="el-icon-search" @click="search">查询</el-button> 
  </el-form-item>
  <el-form-item>
  <el-button type="text" icon="el-icon-refresh" @click="resetForm('form')">重置</el-button> 
  </el-form-item>
  <el-form-item>
      <el-button type="primary" @click="returnCaseList" v-has="'批次退案'">批次退案</el-button>  </el-form-item>
      <el-form-item>
      <el-button type="primary"  @click="open7" v-has="'批次删除'">批次删除</el-button>  </el-form-item>
      <el-form-item>
      <el-button type="primary"  @click="dialogVisible1 = true" v-has="'导出查询结果'">导出查询结果</el-button>  </el-form-item>
      <el-form-item>
      <el-button type="primary" @click='selectDataExport' v-has="'导出所选批次'">导出所选批次</el-button>  </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="selectDataByBatch" v-has="'批量导出批次催记'">批量导出批次催记</el-button>  </el-form-item>
  	
  </el-form>
  	</div>
  </el-col>
  <el-col :span="18">
  	<div class="grid-content bg-purple">
  		<span>查询结果统计：</span>
	<span class="textColor">列表户数：{{userCount}}</span>
  		<span class="textColor">列表金额：￥{{totalAmt}}</span>
  	</div>
  </el-col>
   </el-row>
   <el-table
   	v-loading="loading"
    ref="multipleTable"
    :data="DataList"
    style="width: 100%;margin-top: 10px;"
     @selection-change="handleSelectionChange"
    sortable="custom"
    @sort-change="handleSort"
  >
  <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
    	prop="area"
      :sortable='true'
      min-width="140"
      :sort-orders="['ascending','descending']"
      label="催收区域"
      >
    </el-table-column>
    <el-table-column
    	prop="batchNo"
      :sortable='true'
      min-width="140"
      :sort-orders="['ascending','descending']"
      label="批次号"
      >
    </el-table-column>
    <el-table-column
      prop="client"
      :sortable='true'
      :sort-orders="['ascending','descending']"
      label="委托方"
    >
    </el-table-column>
    <el-table-column
      prop="statusMsg"
      :sortable='true'
      min-width="120"
      :sort-orders="['ascending','descending']"
      label="批次状态"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="caseTime"
      label="委案日期"
      width="140"
      :sortable='true'
      :sort-orders="['ascending','descending']"
      align="center"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="userCount"
      :sortable='true'
      :sort-orders="['ascending','descending']"
      label="户数"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="总金额"
      :sortable='true'
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip>
      <template slot-scope="scope">
           ￥{{scope.row.totalAmt}}
      </template>
    </el-table-column>
   <el-table-column
      prop="caseType"
      label="案件类型"
      :sortable='true'
      min-width="120"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="returnTime"
      label="预计退案时间"
      :sortable='true'
      :sort-orders="['ascending','descending']"
      width="140"
      align="center"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="realReturnTime"
      :sortable='true'
      :sort-orders="['ascending','descending']"
      width="140"
      align="center"
      label="实际退案时间"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="createTime"
      width="180"
      :sortable='true'
      :sort-orders="['ascending','descending']"
      align="center"
      label="录入时间"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="batchRemark"
      min-width="250"
      :sortable='true'
      :sort-orders="['ascending','descending']"
      align="center"
      label="批次备注"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="creatUser"
      :sortable='true'
      :sort-orders="['ascending','descending']"
      label="录入人员"
      align="center"
      width="140"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="remark"
      min-width="180"
      align="center"
      label="备注"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      align="center"
      label="操作"
      width="250">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small" v-has="'追加'">追加</el-button>
        <el-button type="text" size="small" @click="returnMessage(scope.row.id)" v-has="'退案'">退案</el-button>
        <el-button type="text" size="small" @click="editMessage(scope.row)" v-has="'编辑'">编辑</el-button>
        <el-button type="text" size="small" @click="deleteMessage(scope.row.id)" v-has="'删除'">删除</el-button>
        <el-button type="text" size="small" v-has="'导出催记'">导出催记</el-button>
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
      :page-sizes="[100, 500, 2000, 10000, 1000000]"
      :page-size="pages"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  	</div></el-col>
  <el-col :span="8">
  	
  </el-col>
</el-row>
<el-dialog
  title="导出查询结果"
  :visible.sync="dialogVisible1"
  width="30%"
  >
  <el-row :gutter="20">
  <el-col :span="10"><div class="grid-content bg-purple"> 
  	<el-button @click=totalDataExport>按查询条件全部导出</el-button>
</div></el-col>
  <el-col :span="10">
  	<div class="grid-content bg-purple">  
  		<el-button @click=pageDataExport>按查询条件导出当前分页</el-button>
</div></el-col>
</el-row>
</el-dialog>
<el-dialog
  title="修改批次"
  :visible.sync="dialogVisible2"
  width="55%"
  >
<el-form :inline="true" :model="messageForm" ref="messageForm" label-width="100px" class="demo-dynamic">
	<el-row :gutter="24">
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  	<el-form-item label="批  次  号"	
  			prop="batchNo"
        :rules="{ required: true, message: '批次号不能为空', trigger: 'blur'}">
    <el-input v-model="messageForm.batchNo" placeholder="请输入批次号" clearable></el-input>
  </el-form-item>
  </div>
  </el-col>
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  		<el-form-item label="回款率">
        <el-input v-model="messageForm.targetRate" placeholder="请输入回款率" clearable></el-input>
  </el-form-item>
  		
  	</div>
  </el-col>
</el-row>
<el-row :gutter="24">
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  	<el-form-item label="催收区域">
<el-select v-model="messageForm.area" placeholder="请选择催收区域" clearable>
    <el-option
      v-for="item in areaList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select> 
  	</el-form-item>
  </div>
  </el-col>
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  	<el-form-item label="委  托  方" 
  		prop="client"
    :rules="{required: true, message: '委托方不能为空', trigger: 'blur'}">
    <el-select v-model="messageForm.client" placeholder="请选择委托方" clearable>
    <el-option
      v-for="item in clientList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  	</div>
  </el-col>
</el-row><el-row :gutter="24">
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  	<el-form-item label="案件类型">
<el-select v-model="messageForm.caseType" placeholder="请选择案件类型" clearable>
    <el-option
      v-for="item in caseTypeList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>   
  	</el-form-item>
  </div>
  </el-col>
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  	<el-form-item label="委案日期" 
  			prop="caseTime"
    :rules="{required: true, message: '请选择日期', trigger: 'change'}">
     <div class="block">
    <el-date-picker
      v-model="messageForm.caseTime"
      align="right"
      type="date"
      placeholder="选择日期"
      value-format="yyyy-MM-dd"
      >
    </el-date-picker>
  </div>
  </el-form-item>
  		
  	</div>
  </el-col>
</el-row>
<el-row :gutter="24">
  <el-col :span="15">
  	<div class="grid-content bg-purple">
  	<el-form-item label="预计退案日期">
 <div class="block">
    <el-date-picker
      v-model="messageForm.returnTime"
      align="right"
      type="date"
      placeholder="选择日期"
      value-format="yyyy-MM-dd"
     >
    </el-date-picker>
  </div>
  	</el-form-item>
  </div>
  </el-col> 
</el-row>
<el-row :gutter="24">
  <el-col :span="24">
  <el-form-item label="批次备注" >
    <el-input type="textarea" v-model="messageForm.remark" style="width: 200%;">></el-input>
  </el-form-item>
   </el-col>
</el-row>
</el-form>

<span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="submitmsgForm('messageForm')">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
	import {dataList,remoweData,addData,selectDataCollectExportByBatch,selectDataBatchExport,pageDataBatchExport,totalDataBatchExport,clientList,batchList,caseTypeList,areaList,returnCase,update} from '@/common/js/data-batch-manage.js'
export default {
  name: 'dataBatchManage',
   data(){
    return {
    	loading:false,
    	userCount:'',
    	totalAmt:'',
    	messageForm:{},
    	deleteList:[],
    	selectDataBatchExportList:[],
    	selectDataCollectExportByBatchList:[],
    	DataList:[],
    	pageSize:10,
      orderBy:"id",
      sort:"desc",
    	pageNum:1,
    	areaList:[],
    	caseTypeList:[],
    	clientList:[],
      formInline:{},
      dialogVisible1:false,
      dialogVisible2:false,
      tableData3:[],
      currentPage4: 1,
      pages:1,
      total:0,
    	form:{
    		time:[],
    		clientList:[],
        batchList:[],
    		areaList:[],
    		caseTypeList:[],
    		CasestatusList:[{id:0,name:"未导入"},{id:1,name:"未退案"},{id:2,name:"已退案"}]
    	},
    }
  },
methods: {
	selectDataByBatch(){
		debugger
		this.loading=true
  		selectDataBatchExport(this.selectDataCollectExportByBatchList).then((response)=>{
          	this.loading=false;
          	this.$message({
            type: 'success',
            message: '导出成功!'
          });
          })
	},
	selectDataExport(){
		this.loading=true
  		selectDataBatchExport(this.selectDataBatchExportList).then((response)=>{
          	this.loading=false;
          	this.$message({
            type: 'success',
            message: '导出成功!'
          });
          })
	},
	totalDataExport(){
			this.loading=true;
			console.info(1111)
			let startTime=this.form.time[0]
      	let endTime=this.form.time[1]
		totalDataBatchExport(this.form.area,this.form.batchNos,this.form.clients,this.form.batchStatus,this.form.caseType,startTime,endTime,this.pageSize,this.pageNum).then((response)=>{
          	this.loading=false;
          	this.$message({
            type: 'success',
            message: '导出成功!'
          });
          })
	},
	pageDataExport(){
			this.loading=true;
			let startTime=this.form.time[0]
      	let endTime=this.form.time[1]
		pageDataBatchExport(this.form.area,this.form.batchNos,this.form.clients,this.form.batchStatus,this.form.caseType,startTime,endTime,this.orderBy,this.sort,this.pageSize,this.pageNum).then((response)=>{
          	this.loading=false;
          	this.$message({
            type: 'success',
            message: '导出成功!'
          });
          })
	},
	  submitmsgForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	console.log(this.messageForm)
            update(this.messageForm).then((response)=>{
            	this.dialogVisible2=false
            	this.search()
            	this.$message({
            type: 'success',
            message: '保存成功!'
          });
})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
	editMessage(row){
		console.log(row)
		this.dialogVisible2=true
		this.messageForm=row
	},
  handleSort( {column,prop,order}){
    let startTime=this.form.time[0]
    let endTime=this.form.time[1]
    this.sort = order==null?"desc":order.replace("ending","")
    this.orderBy = prop==null?"id":prop
    dataList(this.form.area,this.form.batchNos,this.form.clients,this.form.batchStatus,this.form.caseType,startTime,endTime,this.orderBy,this.sort,this.pageSize,this.pageNum).then((response)=>{

      this.DataList=response.pageInfo.list
      //this.pages = response.pageInfo.pages
      this.total = response.pageInfo.total
    })
  },
	search(){
      	let startTime=this.form.time[0]
      	let endTime=this.form.time[1]
dataList(this.form.area,this.form.batchNos,this.form.clients,this.form.batchStatus,this.form.caseType,startTime,endTime,this.orderBy,this.sort,this.pageSize,this.pageNum).then((response)=>{

            this.DataList=response.pageInfo.list
            //this.pages = response.pageInfo.pages
            this.total = response.pageInfo.total
})
      },
      returnCaseList(){
      	returnCase(this.deleteList).then((response)=>{
            this.$message({
            type: 'success',
            message: '退案成功!'
          });
          this.search()
      })
      },
	deleteMessage(id){
		let arry=[{id:id}]
		remoweData(arry).then((response)=>{
				this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.search()
})
	},
	returnMessage(id){
		let arry=[{id:id}]
		returnCase(arry).then((response)=>{
				this.$message({
            type: 'success',
            message: '退案成功!'
          });
          this.search()
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
		handleSelectionChange(row){
  		let _self=this
  		_self.deleteList=[]
  		_self.selectDataCollectExportByBatchList=[];
  		_self.selectDataBatchExportList=[];
	row.forEach(function(currentValue, index, arr){
		let Object={"id":""}
		let Project={batchNo:""}
		Project.batchNo=currentValue.batchNo
	   Object.id=currentValue.id
	   _self.deleteList.push(Object)
	   _self.selectDataBatchExportList.push(Object)
	   //_self.selectDataBatchExportList.push(Project)
	})
	console.log(_self.deleteList)
},
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      open7() {
      	let _self=this 
        _self.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
           if(_self.deleteList.length>0){
           	remoweData(this.deleteList).then((response)=>{
            _self.$message({
            type: 'success',
            message: '删除成功!'
          });
          _self.search()
})
           }else{
           	_self.$message({
            type: 'info',
            message: '请选择需要删除的数据!'
          });
           }
          
        }).catch(() => {
          _self.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
   },
   created() {
            dataList().then((response)=>{
              this.DataList=response.pageInfo.list
              //this.pages = response.pageInfo.pages
              this.total = response.pageInfo.total
              this.totalAmt=response.totalAmt;
              this.userCount=response.userCount;
            })
              clientList().then((response)=>{
            this.form.clientList=response;
            this.clientList=response;
})
     batchList().then((response)=>{
       this.form.batchList=response;
     })
     caseTypeList().then((response)=>{
          	this.form.caseTypeList=response
          	this.caseTypeList=response;
          })
          areaList().then((response)=>{
          	this.form.areaList=response
          	this.areaList=response
          })
},
}
</script>

<style lang="scss">
#data-batch-manage{
	
  .textColor{
  	display: inline-block;
  color: #66b1ff;
  }
  .el-dialog__header{
  	background-color: #f8f8f8;
  
  }
}
</style>

