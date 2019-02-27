<template>
  <div id="data-case-imported">
  <el-row :gutter="24">
  <el-col :span="24">
  	<div class="grid-content bg-purple">
  		<el-form :inline="true" ref="form" :model="form" label-width="80px">
   <el-form-item >
  <el-select class="Newinput" v-model="form.area" placeholder="请选择催收区域" clearable>
    <el-option
      v-for="item in areaList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item >
    <el-select v-model="form.batchNos" filterable  multiple placeholder="请输入批次号" clearable>
      <el-option
        v-for="item in batchList"
        :key="item.batchNo"
        :label="item.batchNo"
        :value="item.batchNo">
      </el-option>
    </el-select>
  </el-form-item>
   <el-form-item >
  <el-select v-model="form.clients" filterable  multiple placeholder="请选择委托方" clearable>
    <el-option
      v-for="item in clientList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
   <el-form-item >
  <el-select v-model="form.caseType" placeholder="请选择案件类型" clearable>
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
       value-format="yyyy-MM-dd"
      unlink-panels
      range-separator="至"
      start-placeholder="委案开始日期"
      end-placeholder="委案结束日期"
      >
    </el-date-picker>
  </el-form-item>
  <el-form-item>
  <el-button type="text" icon="el-icon-search" @click=search>查询</el-button> 
  </el-form-item>
  <el-form-item>
  <el-button type="text" icon="el-icon-refresh" @click="resetForm()">重置</el-button> 
  </el-form-item>
  </el-form>
  	</div>
  </el-col>
  <el-col :span="20">
  	<div class="grid-content bg-purple">
  <el-form :inline="true">
  		<el-form-item>
      <el-button type="text" @click="downLoadZip">导入模板下载</el-button>
      </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="dialogVisible = true">新增批次</el-button>  </el-form-item>
      <el-form-item>
      <el-button type="primary"  @click="open7">删除批次</el-button>  </el-form-item>
       <el-form-item >
<el-upload
  class="upload-demo"
  action="http://116.62.124.251/zxh/dataCase/updateCase/import"
  :headers="header"
  :show-file-list=false
  :on-success="uploadSuccess"

  >
  <el-button size="small" type="primary">导入更新案件</el-button>
</el-upload>
      </el-form-item>
       <el-form-item >
<el-upload
  class="upload-demo"
  action="http://116.62.124.251/zxh/dataCase/comment/import"
  :headers="header"
  :show-file-list=false
  :on-success="uploadSuccess"

  >
  <el-button size="small" type="primary">导入案件评语</el-button>
</el-upload>
      </el-form-item>
       <el-form-item >
<el-upload
  class="upload-demo"
  action="http://116.62.124.251/zxh/dataCase/interest/import"
  :headers="header"
  :show-file-list=false
  :on-success="uploadSuccess"

  >
  <el-button size="small" type="primary">导入案件利息</el-button>
</el-upload>
      </el-form-item>
       <el-form-item >
<el-upload
  class="upload-demo"
  action="http://116.62.124.251/zxh/dataCase/tel/import"
  :headers="header"
  :show-file-list=false
  :on-success="uploadSuccess"

  >
  <el-button size="small" type="primary">导入案件电话</el-button>
</el-upload>
      </el-form-item>
       <el-form-item >
<el-upload
  class="upload-demo"
  action="http://116.62.124.251/zxh/dataCase/address/import"
  :headers="header"
  :show-file-list=false
  :on-success="uploadSuccess"

  >
  <el-button size="small" type="primary">导入案件地址</el-button>
</el-upload>
      </el-form-item>
          <el-form-item >
<el-upload
  class="upload-demo"
  action="http://116.62.124.251/zxh/dataCollect/import"
  :headers="header"
  :show-file-list=false
  :on-success="uploadSuccess"
  >
  <el-button size="small" type="primary">导入催收记录</el-button>
</el-upload>
      </el-form-item>
</el-form>
  	</div>
  </el-col>
   </el-row>
   <el-table
    ref="multipleTable"
    :data="DataList"
    style="width: 100%"
     @selection-change="handleSelectionChange"
    sortable="custom"
    @sort-change="handleSort"
  >
  <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      :sortable='true'
      :sort-orders="['ascending','descending']"
      label="批次号"
      prop="batchNo">
    </el-table-column>
    <el-table-column
      prop="clientMsg"
      :sortable='true'
      label="委托方"
      :sort-orders="['ascending','descending']"
      width="140">
    </el-table-column>
    <el-table-column
      prop="statusMsg"
      :sortable='true'
      label="批次状态"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip>
      <template slot-scope="scope">
       {{scope.row.batchStatus==0?"未导入":scope.row.batchStatus==1?"未退案":"已退案"}}
      </template>
    </el-table-column>
    <el-table-column
      :sortable='true'
      :sort-orders="['ascending','descending']"
      prop="caseTime"
      label="委案日期"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      :sortable='true'
      :sort-orders="['ascending','descending']"
      prop="userCount"
      label="户数"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      :sortable='true'
      :sort-orders="['ascending','descending']"
      label="总金额"
      show-overflow-tooltip>
      <template slot-scope="scope">
        ￥{{scope.row.totalAmt ? scope.row.totalAmt : 0}}
      </template>
    </el-table-column>
    <el-table-column
      :sortable='true'
      :sort-orders="['ascending','descending']"
      prop="uploadTime"
      label="上传时间"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="remark"
      label="批次备注"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="操作"
      align="center"
      >
       <template slot-scope="scope">
       <el-upload
        class="upload-demo"
        action="http://116.62.124.251/zxh/dataCase/newCase/import"
        :headers="header"
        :show-file-list=false
        :on-success="uploadSuccess"
        :data="{batchNo:scope.row.batchNo}"
  >
        <el-button type="text" size="small">导入</el-button>
</el-upload>
        <el-button type="text" size="small" v-if="scope.row.batchStatus==0" @click="downCaseModule">下载</el-button>
        <el-button type="text" size="small" @click="editMessage(scope.row)">编辑</el-button>
        <el-button type="text" size="small" @click="deleteMessage(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 500, 2000, 10000, 1000000]"
      :page-size="pages"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  <el-dialog
  title="新增批次"
  :visible.sync="dialogVisible"
  width="55%"
  >
<el-form :inline="true" :model="formInline" ref="formInline" label-width="100px" class="demo-dynamic">
	<el-row :gutter="24">
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  	<el-form-item label="批  次  号"	
  			prop="batchNo"
        :rules="{ required: true, message: '批次号不能为空', trigger: 'blur'}">
    <el-input v-model="formInline.batchNo" placeholder="请输入批次号" clearable></el-input>
  </el-form-item>
  </div>
  </el-col>
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  		<el-form-item label="回款率">
        <el-input v-model="formInline.targetRate" placeholder="请输入回款率" clearable></el-input>
  </el-form-item>
  		
  	</div>
  </el-col>
</el-row>
<el-row :gutter="24">
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  	<el-form-item label="催收区域">
<el-select v-model="formInline.areaListId" placeholder="请选择催收区域" clearable>
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
    <el-select v-model="formInline.client" placeholder="请选择委托方" clearable>
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
<el-select v-model="formInline.caseType" placeholder="请选择案件类型" clearable>
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
      v-model="formInline.caseTime"
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
      v-model="formInline.returnTime"
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
    <el-input type="textarea" v-model="formInline.remark" style="width: 200%;height: 180px;">></el-input>
  </el-form-item>
   </el-col>
</el-row>
</el-form>

<span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm('formInline')">确 定</el-button>
  </span>
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
		import {dataList,batchList,remoweData,addData,clientList,caseTypeList,areaList,update,downLoadZip,downCaseModule} from '@/common/js/data-case-imported.js'
export default {
  name: 'dataCaseImported',
  data(){
    return {
    	header:{Authorization:localStorage.token},
    	messageForm:{},
    	areaList:[],
    	caseTypeList:[],
      pages:1,
      total:0,
      orderBy:"id",
      sort:"desc",
    	clientList:[],
      batchList:[],
    	deleteList:[],
        formInline:{
        	batchNo:'',
        	targetRate:'',
        	returnTime:'',
        	caseTime:''
        },
        dialogVisible:false,
        dialogVisible2:false,
        DataList:[],
        currentPage4: 1,
    	 form:{
    		time:[],
    		clientList:[],
    		areaList:[],
    		caseTypeList:[],
    	},
       
    }
  },
methods: {
		uploadSuccess(res,file,fileList){
      if (res.code ==100){
  		    this.$message({
            type: 'success',
            message: '导入成功!'
          });
           dataList().then((response)=>{
            this.DataList=response.pageInfo.list
              //this.pages = response.pages
              this.total = response.total
          })
      }else{
        this.$message({
          type: 'error',
          message: res.msg
        });
      }
  	},
	deleteMessage(id){
		let arry=[{id:id}]
      let _self=this
      _self.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {

          remoweData(arry).then((response)=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            _self.search()
          })


      }).catch(() => {

      });

	},
  downLoadZip(){
    downLoadZip().then((response)=> {

    })
  },
  downCaseModule(){
	
    downCaseModule().then((response)=> {

    })
  },
	editMessage(row){
		this.dialogVisible2=true
		this.messageForm=row
    this.messageForm.client = parseInt(row.client)
    this.messageForm.caseType = parseInt(row.caseType)
    this.messageForm.area = parseInt(row.area)
	},
	submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addData(this.formInline).then((response)=>{
            	this.dialogVisible=false
            	this.search()
            	this.$message({
            type: 'success',
            message: '保存成功!'
          });
          this.formInline={
        	batchNo:'',
        	targetRate:'',
        	returnTime:'',
        	caseTime:''
        }
})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
  handleSort( {column,prop,order}){
      let startTime=this.form.time[0]
      let endTime=this.form.time[1]
      this.sort = order==null?"desc":order.replace("ending","")
      this.orderBy = prop==null?"id":prop
      dataList(this.form.area,this.form.batchNos,this.form.clients,this.form.caseType,startTime,endTime,this.orderBy,this.sort,this.pageSize,this.pageNum).then((response)=>{
        this.DataList=response.pageInfo.list
        this.pages = response.pageInfo.pages
        this.total = response.pageInfo.total
      })
  },
	search(){
      	let startTime=this.form.time[0]
      	let endTime=this.form.time[1]

dataList(this.form.area,this.form.batchNos,this.form.clients,this.form.caseType,startTime,endTime,this.orderBy,this.sort,this.pageSize,this.pageNum).then((response)=>{
            this.DataList=response.pageInfo.list
  console.info(response.pageInfo.pages);
           // this.pages = response.pageInfo.pages
            this.total = response.pageInfo.total
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
	row.forEach(function(currentValue, index, arr){
		let Object={"id":""}
	   Object.id=currentValue.id
	   _self.deleteList.push(Object)
	})

},
      resetForm(formName) {
        this.form={time:[]};
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

        });
      },
    },
created() {
            dataList().then((response)=>{
            this.DataList=response.pageInfo.list
              this.total = response.pageInfo.total
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
#data-case-imported{
  .el-dialog__header{
  	background-color: #f8f8f8;
  
  }
  .el-form-item .el-form-item--mini{
  	width:80%
  }
  .upload-demo{
  	display: inline-block;
  }
}
</style>


