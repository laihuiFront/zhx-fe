<template>
  <div id="data-case-imported" 
  	 v-loading="loading2"
  	  v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
   element-loading-background="rgba(0, 0, 0, 0.7)"
   class="page-wraper-sub">
   <el-form ref="form" :model="form" :inline="true" class="query-wrap">
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
      <el-select v-model="form.batchNos" filterable collapse-tags  multiple placeholder="请输入批次号" clearable>
        <el-option
          v-for="item in batchList"
          :key="item.id"
          :label="item.batchNo"
          :value="item.batchNo">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item >
      <el-select v-model="form.clients" filterable collapse-tags  multiple placeholder="请选择委托方" clearable>
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
      <el-button type="primary" icon="el-icon-search" @click=search>查询</el-button> 
      <el-button type="primary" icon="el-icon-refresh" @click="resetForm()">重置</el-button> 
    </el-form-item>
    <el-form-item >
      <el-button type="primary" @click="downLoadZip">导入模板下载</el-button>
      <el-button type="primary" @click="dialogVisible = true" v-has="'新增批次'">新增批次</el-button> 
      <el-button type="primary"  @click="open7" v-has="'删除批次'">删除批次</el-button>
      <el-upload
        class="upload-demo"
        :action="action+'/updateCase/import'"
        :headers="header"
        :show-file-list=false
        :on-success="uploadSuccess"
        :on-progress="onProgress"
        >
        <el-button size="small" style="padding: 7px 15px;margin-left:10px;" type="primary" v-has="'导入更新案件'">导入更新案件</el-button>
      </el-upload>
      <el-upload
        class="upload-demo"
        :action="action+'/comment/import'"
        :headers="header"
        :show-file-list=false
        :on-success="uploadSuccess"
        :on-progress="onProgress"

        >
        <el-button size="small" style="padding: 7px 15px;margin-left:10px;" type="primary" v-has="'导入案件评语'">导入案件评语</el-button>
      </el-upload>
      <el-upload
        class="upload-demo"
        :action="action+'/interest/import'"
        :headers="header"
        :show-file-list=false
        :on-success="uploadSuccess"
        :on-progress="onProgress"

        >
        <el-button size="small" style="padding: 7px 15px;margin-left:10px;" type="primary" v-has="'导入案件利息'">导入案件利息</el-button>
      </el-upload>
      <el-upload
        class="upload-demo"
        :action="action+'/tel/import'"
        :headers="header"
        :show-file-list=false
        :on-success="uploadSuccess"
        :on-progress="onProgress"

        >
        <el-button size="small" style="padding: 7px 15px;margin-left:10px;" type="primary" v-has="'导入案件电话'">导入案件电话</el-button>
      </el-upload>
      <el-upload
        class="upload-demo"
        :action="action+'/address/import'"
        :headers="header"
        :show-file-list=false
        :on-success="uploadSuccess"
        :on-progress="onProgress"

        >
        <el-button size="small" style="padding: 7px 15px;margin-left:10px;" type="primary" v-has="'导入案件地址'">导入案件地址</el-button>
      </el-upload>
      <el-upload
        class="upload-demo"
        :action="collectAction+'/dataCollect/import'"
        :headers="header"
        :show-file-list=false
        :on-success="uploadSuccess"
        :on-progress="onProgress"
        >
        <el-button size="small" style="padding: 7px 15px;margin-left:10px;" type="primary" v-has="'导入案件记录'">导入催收记录</el-button>
      </el-upload>
    </el-form-item>
   </el-form>
    <el-table highlight-current-row v-loading="tableLoad"
   	class="table-wrap"
    height="1"
    ref="multipleTable"
    :data="DataList"
    border
    stripe
    style="width: 100%"
     @selection-change="handleSelectionChange"
    @sort-change="handleSort"
  >
  <el-table-column
      type="selection"
      align="center"
      width="55">
    </el-table-column>
    <el-table-column
      sortable="custom"
      :sort-orders="['ascending','descending']"
      label="批次号"
      align="center"
      prop="batchNo">
    </el-table-column>
    <el-table-column
      prop="clientMsg"
      sortable="custom"
      align="center"
      label="委托方"
      :sort-orders="['ascending','descending']"
      width="140">
    </el-table-column>
    <el-table-column
      prop="statusMsg"
      align="center"
      sortable="custom"
      label="批次状态"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      sortable="custom"
      :sort-orders="['ascending','descending']"
      prop="caseTime"
      label="委案日期"
      width="120"
      align="center"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      sortable="custom"
      :sort-orders="['ascending','descending']"
      prop="userCount"
      align="center"
      label="户数"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      sortable="custom"
      :sort-orders="['ascending','descending']"
      label="总金额"
      align="center"
      width="120"
      prop="totalAmtMsg"
      show-overflow-tooltip>
      <template slot-scope="scope">
        {{scope.row.totalAmtMsg}}
      </template>
    </el-table-column>
    <el-table-column
      sortable="custom"
      align="center"
      :sort-orders="['ascending','descending']"
      prop="uploadTime"
      width="140"
      label="上传时间"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="remark"
      label="批次备注"
      align="center"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="操作"
      align="center"
      width="200"
      >
       <template slot-scope="scope">
       <el-upload
        class="upload-demo"
        :action="action+'/newCase/import'"
        :headers="header"
        :show-file-list=false
        :on-success="uploadSuccess"
        :data="{batchNo:scope.row.batchNo}"
        :on-progress="onProgress"
  >
        <el-button type="text" size="small" v-has="'导入'">导入</el-button>
</el-upload>
        <el-button type="text" size="small" v-if="scope.row.batchStatus!=0" @click="downCaseModule(scope.row)" v-has="'下载'">下载</el-button>
        <el-button type="text" size="small" @click="editMessage(scope.row)" v-has="'编辑'">编辑</el-button>
        <el-button type="text" size="small" @click="deleteMessage(scope.row.id,scope.row.batchNo)" v-has="'删除批次'">删除</el-button>
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
    <el-input v-model="formInline.batchNo" :disabled=true placeholder="请输入批次号" clearable></el-input>
  </el-form-item>
  </div>
  </el-col>
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
</el-row>
<el-row :gutter="24">
  <el-col :span="12">
  	<div class="grid-content bg-purple">
      <el-form-item label="委  托  方"
                    prop="client"
                    :rules="{required: true, message: '委托方不能为空', trigger: 'blur'}">
        <el-select v-model="formInline.client" placeholder="请选择委托方" clearable @change="changeBotno">
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
</el-row><el-row :gutter="24">
  <el-col :span="12">
  	<div class="grid-content bg-purple">
      <el-form-item label="委案日期"
                    prop="caseTime"
                    :rules="{required: true, message: '请选择日期', trigger: 'change'}">
        <div class="block">
          <el-date-picker
            @change="changeBotno"
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
  <el-col :span="12">
  	<div class="grid-content bg-purple">

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

<span slot="footer" class="footer">
    <el-button @click="backForm">取 消</el-button>
    <el-button type="primary" @click="submitForm('formInline')">确 定</el-button>
  </span>
</el-dialog>
<el-dialog
  class="dialog-wrap"
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
    <el-input v-model="messageForm.batchNo" :disabled=true placeholder="请输入批次号" clearable></el-input>
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
    <el-select v-model="messageForm.client" @change="changeBotno2" placeholder="请选择委托方" clearable>
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
    	@change="changeBotno3"
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
    <el-button @click="backForm2">取 消</el-button>
    <el-button type="primary" @click="submitmsgForm('messageForm')">确 定</el-button>
  </span>
</el-dialog>
<el-dialog
  class="dialog-wrap"
  title="提示"
  :visible.sync="ImportdialogVisible"
  width="30%"
  :before-close="handleClose"
  >
  <span>{{ImportMsg}}</span>
  <span slot="footer" class="footer">
    <el-button type="primary" @click=ImportdialogVisibleWay >确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
	  import {baseURL} from '@/common/js/request.js';
		import {dataList,batchList,remoweData,addData,clientList,caseTypeList,areaList,update,downLoadZip,downCaseModule} from '@/common/js/data-case-imported.js';
export default {
  name: 'dataCaseImported',
  data(){
    return {
    	fullscreenLoading:false,
      tableLoad:false,
    	action:baseURL+'/dataCase',
      collectAction:baseURL,
    	ImportdialogVisible:false,
    	ImportMsg:'',
    	loading2:false,
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
    		clients:[],
    		batchNos:[],
    	},
       clientValue:''
    }
  },
methods: {
	handleClose(){
		this.loading2=false
		this.fullscreenLoading=false
		this.ImportdialogVisible=false
	},
	changeBotno(){
	    for(var i=0;i<=this.clientList.length;i++){
	    	if(this.formInline.client===this.clientList[i].id){
	    		this.clientValue=this.clientList[i].name
	    				      this.$set(this.formInline, 'batchNo', this.clientValue +'-'+this.formInline.caseTime)
	    		return
	    	}
	    }
	},
	changeBotno2(){
	    for(var i=0;i<=this.clientList.length;i++){
	    	if(this.messageForm.client===this.clientList[i].id){
	    		this.clientValue=this.clientList[i].name
	    				      this.$set(this.messageForm, 'batchNo', this.clientValue +'-'+this.messageForm.caseTime)
	    		return
	    	}
	    }
	},
	changeBotno3(){
	    for(var i=0;i<=this.clientList.length;i++){
	    	if(this.messageForm.client===this.clientList[i].id){
	    		this.clientValue=this.clientList[i].name
	    				      this.$set(this.messageForm, 'batchNo', this.clientValue +'-'+this.messageForm.caseTime)
	    		return
	    	}
	    }
	},
	changeBotno1(){
	   for(var i=0;i<=this.clientList.length;i++){
	    	if(this.formInline.client===this.clientList[i].id){
	    		this.clientValue=this.clientList[i].name
	    				      this.$set(this.formInline, 'batchNo', this.clientValue +'-'+this.formInline.caseTime)
	    		return
	    	}
	    }
	},
	ImportdialogVisibleWay(){
		this.loading2=false
				this.fullscreenLoading=false
		this.ImportdialogVisible=false
	},
	onProgress(){
		this.loading2=true
		this.fullscreenLoading=true
	},
	backForm(){
		this.dialogVisible=false;
		this.formInline={
        	batchNo:'',
        	targetRate:'',
        	returnTime:'',
        	caseTime:''
        }
	},
		backForm2(){
		this.dialogVisible2=false;
		this.messageForm={
        	batchNo:'',
        	targetRate:'',
        	returnTime:'',
        	caseTime:''
        }
	},
		uploadSuccess(res,file,fileList){
      if (res.code ==100){
  		    this.$message({
            type: 'success',
            message: "导入成功"
          });
          this.tableLoad = true
           dataList().then((response)=>{
            this.DataList=response.pageInfo.list
              //this.pages = response.pages
              this.total = response.total
              this.loading2=false
              this.fullscreenLoading=false
              this.tableLoad = false
          })
      }else{
        this.ImportdialogVisible=true
        this.ImportMsg= res.msg
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
  downCaseModule(row){
    this.loading2=true
              this.fullscreenLoading=true
    downCaseModule(row.batchNo).then((response)=> {
     this.loading2=false
              this.fullscreenLoading=false
    })
  },
	editMessage(row){
		this.dialogVisible2=true
		console.log(row)
		this.messageForm=row
		if(this.messageForm.client ){
			this.messageForm.client = parseInt(row.client)
		}
		if(this.messageForm.caseType ){
			this.messageForm.caseType = parseInt(row.caseType)
		}
		if(this.messageForm.area ){
			this.messageForm.area = parseInt(row.area)
		}

	},
	submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addData(this.formInline).then((response)=>{
            	this.dialogVisible=false
            	this.search()
            	 batchList().then((response)=>{
    this.batchList=response;
  })
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
            	 batchList().then((response)=>{
    this.batchList=response;
  })
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
     /* this.$refs.multipleTable.clearSort()*/
     this.tableLoad = true
      dataList(this.form.area,this.form.batchNos,this.form.clients,this.form.caseType,startTime,endTime,this.orderBy,this.sort,this.pageSize,this.pageNum).then((response)=>{
        this.DataList=response.pageInfo.list
        this.pages = response.pageInfo.pages
        this.total = response.pageInfo.total
        this.tableLoad = false
      })
  },
	search(){
      	let startTime=this.form.time[0]
      	let endTime=this.form.time[1]
        this.tableLoad = true
dataList(this.form.area,this.form.batchNos,this.form.clients,this.form.caseType,startTime,endTime,this.orderBy,this.sort,this.pageSize,this.pageNum).then((response)=>{
            this.DataList=response.pageInfo.list
  console.info(response.pageInfo.pages);
           // this.pages = response.pageInfo.pages
            this.total = response.pageInfo.total
            this.tableLoad = false
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
     Object.batchNo = currentValue.batchNo
	   _self.deleteList.push(Object)
	})

},
      resetForm(formName) {
        this. form={
    		time:[],
    		clients:[],
    		batchNos:[]
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
    },
created() {
            this.tableLoad = true
            dataList().then((response)=>{
            this.DataList=response.pageInfo.list
              this.total = response.pageInfo.total
              this.tableLoad = false
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
.el-loading-spinner .el-loading-text {
    font-size: 18px;
    }
}
</style>


