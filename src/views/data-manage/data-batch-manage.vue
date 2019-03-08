<template>
  <div id="data-batch-manage"
  	v-loading="loading"
   	 element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(248, 248, 248, 0.8)"
    class="page-wraper-sub">
    <el-form ref="form" :model="form" :inline="true" class="query-wrap">
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
    <el-select v-model="form.batchNos" placeholder="请选择批次编号" filterable multiple collapse-tags clearable>
      <el-option
        v-for="item in batchList"
        :key="item.id"
        :label="item.batchNo"
        :value="item.batchNo">
      </el-option>
    </el-select>
  </el-form-item>
   <el-form-item >
  <el-select v-model="form.clients" placeholder="请选择委托方" filterable
             multiple clearable collapse-tags>
    <el-option
      v-for="item in clientList"
      :key="item.value"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
   <el-form-item >
  <el-select v-model="form.caseType" placeholder="请选择案件类型" clearable>
    <el-option
      v-for="item in caseTypeList"
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
  <el-button type="text" icon="el-icon-refresh" @click=resetForm>重置</el-button> 
  </el-form-item>
  <el-form-item>
      <el-button type="primary" @click="returnCaseList" v-has="'批次退案'">批次退案</el-button>  
      <el-button type="primary"  @click="open7" v-has="'批次删除'">批次删除</el-button>  
      <el-button type="primary"  @click="dialogVisible1 = true" v-has="'导出查询结果'">导出查询结果</el-button>  
      <el-button type="primary" @click='selectDataExport' v-has="'导出所选批次'">导出所选批次</el-button>  
      <el-button type="primary" @click="selectDataByBatch" v-has="'批量导出批次催记'">批量导出批次催记</el-button>  
      </el-form-item>
    </el-form>
   <el-table
   	class="table-wrap"
    ref="multipleTable"
    :data="DataList"
    border
    stripe
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
    	prop="areaMsg"
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
      prop="clientMsg"
      :sortable='true'
      min-width="120"
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
      min-width="120"
      :sortable='true'
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip>
      <template slot-scope="scope">
           {{scope.row.totalAmtMsg}}
      </template>
    </el-table-column>
   <el-table-column
      prop="caseTypeMsg"
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
        <!--<el-upload
          class="upload-demo"
          action="http://116.62.124.251/zxh/dataCase/newCase/import"
          :headers="header"
          :show-file-list=false
          :on-success="uploadSuccess"
          :data="{batchNo:scope.row.batchNo}"
        >
          <el-button type="text" size="small" v-has="'追加'">追加</el-button>
        </el-upload>-->
        <el-button type="text" size="small" @click="returnMessage(scope.row.id)" v-has="'退案'">退案</el-button>
        <el-button type="text" size="small" @click="editMessage(scope.row)" v-has="'编辑'">编辑</el-button>
        <el-button type="text" size="small" @click="deleteMessage(scope.row.id)" v-has="'删除'">删除</el-button>
        <el-button type="text" size="small" v-has="'批量导出批次催记'" @click="exportCollect(scope.row)">导出催记</el-button>
      </template>
    </el-table-column>
  </el-table>
  		<el-pagination
      class="pagination-wrap"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 500, 2000, 10000, 1000000]"
      :page-size="pages"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
<el-dialog
  class="dialog-wrap"
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

<span slot="footer" class="footer">
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
    	batchList:[],
      header:{Authorization:localStorage.token},
    	loading:false,
    	userCount:'',
    	totalAmt:'',
    	messageForm:{},
    	deleteList:[],
    	selectDataBatchExportList:[],
    	selectDataCollectExportByBatchList:[],
    	DataList:[],
    	pageSize:100,
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
    		batchNos:[],
        clients:[],
    		CasestatusList:[{id:0,name:"未导入"},{id:1,name:"未退案"},{id:2,name:"已退案"}]
    	},
    }
  },
methods: {
  exportCollect(row){
        var arr = [{"id":row.id}];
    selectDataBatchExport(arr).then((response)=>{
      this.loading=false;
      this.$message({
        type: 'success',
        message: '导出成功!'
      });
    })
  },
	selectDataByBatch(){
		this.loading=true
    let _self = this;
    if (this.selectDataCollectExportByBatchList.length>0) {
      selectDataCollectExportByBatch(this.selectDataCollectExportByBatchList).then((response) => {
        this.loading = false;
        this.$message({
          type: 'success',
          message: '导出成功!'
        });
      })
    }else{
      this.loading=false;
      _self.$message({
        type: 'info',
        message: '请选择需要导出的数据!'
      });
    }
	},
	selectDataExport(){
		this.loading=true
    let _self = this;
    if (this.selectDataBatchExportList.length>0){
  		selectDataBatchExport(this.selectDataBatchExportList).then((response)=>{
          	this.loading=false;
          	this.$message({
            type: 'success',
            message: '导出成功!'
          });
          })
    }else{
      this.loading=false;
      _self.$message({
        type: 'info',
        message: '请选择需要导出的数据!'
      });

    }
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
    this.messageForm.client = parseInt(row.client)
    if(this.messageForm.caseType){
    	
    	this.messageForm.caseType = parseInt(row.caseType)
    }else{
    	this.messageForm.caseType=''
    }
     if(this.messageForm.area){
    	
    	this.messageForm.area = parseInt(row.area)
    }else{
    	  this.messageForm.area=''
    }
    
  
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
            this.total = response.pageInfo.total
            this.totalAmt=this.formatMoney(response.totalAmt,0, "￥");
            //this.pages = response.pageInfo.pages
            this.total = response.pageInfo.total
})
      },
      returnCaseList(){
      	this.open8()
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
  formatMoney(value,places, symbol, thousand, decimal) {
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : "¥";
    thousand = thousand || ",";
    decimal = decimal || ".";
    var number = value,
      negative = number < 0 ? "-" : "",
      i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
      j = (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
  },
  uploadSuccess(res,file,fileList){
    console.info(res)
    if (res.code ==100){
      this.$message({
        type: 'success',
        message: res.msg
      });
      dataList().then((response)=>{
        this.DataList=response.pageInfo.list
        this.total = response.pageInfo.total
        this.totalAmt=this.formatMoney(response.totalAmt,0, "￥");
        this.total = response.total
      })
    }else{
      this.$message({
        type: 'error',
        message: res.msg
      });
    }
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
	   _self.selectDataCollectExportByBatchList.push(Project)
	})
	console.log(_self.deleteList)
},
      resetForm() {
        this.form={
    		time:[],
    		batchNos:[],
        clients:[],
    		CasestatusList:[{id:0,name:"未导入"},{id:1,name:"未退案"},{id:2,name:"已退案"}]
    	}
      },
       open7() {
      	let _self=this 
      	if(_self.deleteList.length>0){
      		_self.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
           	remoweData(this.deleteList).then((response)=>{
            _self.$message({
            type: 'success',
            message: '删除成功!'
          });
          _self.search()
}) 
        }).catch(() => {

        });
      	} else{
           	_self.$message({
            type: 'info',
            message: '请选择需要删除的数据!'
          });
          }
      },
       open8() {
      	let _self=this
         if(_self.deleteList.length>0){
           returnCase(this.deleteList).then((response)=>{
             _self.$confirm('是否退案?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning',
               center: true
             }).then(() => {
                 _self.$message({
                 type: 'success',
                 message: '退案成功!'
               });
               _self.search()
             }).catch(() => {

             });

           }) }else{
           _self.$message({
             type: 'info',
             message: '请选择需要退案的数据!'
           });
         }


      

      	 
      },
   },
   created() {
            dataList().then((response)=>{
              this.DataList=response.pageInfo.list
              //this.pages = response.pageInfo.pages
              this.total = response.pageInfo.total
              this.totalAmt=this.formatMoney(response.totalAmt,0, "￥");
              this.userCount=response.userCount;
            })
              clientList().then((response)=>{
            this.form.clientList=response;
            this.clientList=response;
})
     batchList().then((response)=>{
       this.batchList=response;
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

