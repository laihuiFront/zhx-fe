<template>
  <div id="data-file-manage" class="page-wraper-sub"
  	v-loading="loading2"
  	v-loading.fullscreen.lock="fullscreenLoading"
    :element-loading-text="loadinText"
    element-loading-spinner="el-icon-loading"
   element-loading-background="rgba(0, 0, 0, 0.7)">
    <el-form ref="form" :model="form" :inline="true" class="query-wrap">
      <el-form-item >
     <el-input v-model="form.identNo" placeholder="请输入证件号" clearable></el-input>
  </el-form-item>
  <el-form-item >
   <el-input v-model="form.name" placeholder="请输入姓名" clearable></el-input>
  </el-form-item>
   <el-form-item >
     <el-input v-model="form.mobile" placeholder="请输入电话号码" clearable></el-input>
  </el-form-item>
   <el-form-item >
       <el-input v-model="form.address" placeholder="请输入地址" clearable></el-input>
  </el-form-item>
   <el-form-item >
 <el-date-picker
      v-model="form.time"
      type="daterange"
      align="right"
      unlink-panels
      value-format="yyyy-MM-dd"
      range-separator="至"
      start-placeholder="档案更新开始日期"
      end-placeholder="档案更新结束日期"
      
      >
    </el-date-picker>
  </el-form-item>
      <el-row>
  <el-form-item>
  <el-button type="primary" icon="el-icon-search" @click=search>查询</el-button> 
  <el-button type="primary" icon="el-icon-refresh" @click=clench>重置</el-button> 
  </el-form-item>
  <el-form-item>
  <el-upload
  :action="action+'/dataArchive/import'"
  :headers="header"
  :show-file-list=false
  style="display:inline-block;margin-right:5px;"
  :on-success="uploadSuccess"
  :on-progress="onProgress"
  >
  <el-button size="small" type="primary" style="padding: 7px 15px;" v-has="'导入'" >导入</el-button>
</el-upload> 
 </el-form-item>
  <el-form-item style="margin-left: -6px;">
      <el-button type="primary" @click="downModule" v-has="'模板下载'">模板下载</el-button>
       </el-form-item>
  <el-form-item>
      <el-button type="primary" @click="dialogVisible2 = true" v-has="'新增'">新增</el-button> 
       </el-form-item>
  <el-form-item>
      <el-button type="primary" @click="open7" v-has="'删除'">删除</el-button> 
       </el-form-item>
      </el-row>
    </el-form>
    <el-table highlight-current-row v-loading="tableLoad"
    class="table-wrap"
    height="1"
     border
     stripe
    ref="multipleTable"
    :data="DataList"
    tooltip-effect="dark"
    style="width: 100%"
    @sort-change="handleSort"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      align="center"
      width="55">
    </el-table-column>
    <el-table-column
      label="证件号"
      align="center"
      min-width="160"
      sortable="custom"
      :sort-orders="['ascending','descending']"
       prop="identNo"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      align="center"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      label="姓名"
      >
    </el-table-column>
    <el-table-column
      label="电话号码"
      align="center"
      show-overflow-tooltip>
      <template slot-scope="scope" >
      	<div v-for="(domain, index) in scope.row.telList">
        <span >{{domain.tel}}</span> <br />
      	</div>
      </template>
    </el-table-column>
    <el-table-column
      label="地址"
      align="center"
      min-width="200"
      show-overflow-tooltip>
      <template slot-scope="scope" >
      	<div v-for="(domain, index) in scope.row.addressList">
        <span >{{domain.address}}</span> <br />
      	</div>
      </template>
    </el-table-column>
     <el-table-column
       label="档案变更日期"
       prop="updateTime"
       sortable="custom"
       width="140"
       align="center"
       :sort-orders="['ascending','descending']"
       show-overflow-tooltip>
     </el-table-column>
    <el-table-column
      label="备注"
      align="center"
      min-width="200"
      show-overflow-tooltip>
      <template slot-scope="scope" >
        <div v-for="(domain, index) in scope.row.remarkList">
          <span >{{domain.remark}}</span> <br />
        </div>
      </template>
    </el-table-column>
     <el-table-column
       label="操作"
       align="center">
       <template slot-scope="scope">
         <el-button type="text" size="small" @click="showMessage(scope.row)">查看</el-button>
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
  title="导入"
  :visible.sync="dialogVisible"
  width="30%"
  >
  导入
  <span slot="footer" class="dialog-footer" id="EndFooter">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
<el-dialog
  class="dialog-wrap"
  title="新增档案"
  :visible.sync="dialogVisible2"
  width="70%"
  >
<el-form :inline="true" :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
	<el-row :gutter="20">
  <el-col :span="12"><div class="grid-content bg-purple">
  	<el-form-item
    label="姓名"
    prop="name"
   :rules="{
      required: true, message: '姓名不能为空', trigger: 'blur'
    }"
  >
    <el-input v-model="dynamicValidateForm.name" clearable></el-input>
  </el-form-item>
  </div>
  </el-col>
  <el-col :span="12"><div class="grid-content bg-purple">
  	<el-form-item
    label="证件号"
    prop="identNo"
    :rules="{
      required: true, message: '证件号不能为空', trigger: 'blur'
    }"
  >
    <el-input v-model="dynamicValidateForm.identNo" clearable></el-input>
  </el-form-item>
  </div>
  </el-col>
</el-row>
<el-row :gutter="20" class="addNew">
	<el-col :span="12"><div class="grid-content bg-purple">
  	<span>电话信息</span>
  </el-form-item>
  </div>
  </el-col>
  <el-col :span="12"><div class="grid-content bg-purple layout">
<el-button type="text" icon="el-icon-plus" @click="addDomainPhone">新增电话</el-button>  </el-form-item>
  </div>
  </el-col>
</el-row>
<el-row :gutter="20" class="addNewData" v-for="(domain, index) in dynamicValidateForm.telList" :key="domain.key"> 
<el-col :span="12" ><div class="grid-content bg-purple">
  <el-form-item
    label="电话类型"
    
  >
    <el-input v-model="domain.teltype" clearable></el-input>

  </el-form-item>
    </div>
  </el-col>
  <el-col :span="12" ><div class="grid-content bg-purple">
  <el-form-item
    label="电话号码"
  >
    <el-input v-model="domain.tel" clearable></el-input>
    </el-form-item>
    <el-form-item>
    <el-button type="text" @click.prevent="removeDomainPhone(domain)">删除</el-button>

  </el-form-item>
    </div>
  </el-col>
</el-row>
<el-row :gutter="20" class="addNew">
	<el-col :span="12"><div class="grid-content bg-purple">
  	<span>地址信息</span>
  </el-form-item>
  </div>
  </el-col>
  <el-col :span="12"><div class="grid-content bg-purple layout">
<el-button type="text" icon="el-icon-plus" @click="addDomainAddress">新增地址</el-button>  </el-form-item>
  </div>
  </el-col>
</el-row>
<el-row :gutter="20" class="addNewData" v-for="(domain, index) in dynamicValidateForm.addressList" :key="domain.key">
  <el-col :span="12" ><div class="grid-content bg-purple">
  <el-form-item
    label="地址信息"
    :key="domain.key"
  >
    <el-input v-model="domain.address" clearable></el-input>
    </el-form-item>
    <el-form-item>
    <el-button type="text" @click.prevent="removeDomainAddress(domain)">删除</el-button>
  </el-form-item>
    </div>
  </el-col>
</el-row>
<el-row :gutter="20" class="addNew">
	<el-col :span="12"><div class="grid-content bg-purple">
  	<span>备注信息</span>
  </el-form-item>
  </div>
  </el-col>
  <el-col :span="12"><div class="grid-content bg-purple layout">
<el-button type="text" icon="el-icon-plus" @click="addDomainremark">新增备注</el-button>  </el-form-item>
  </div>
  </el-col>
</el-row>
<el-row :gutter="20" class="addNewData" v-for="(domain, index) in dynamicValidateForm.remarksList" :key="domain.key">
  <el-col :span="12" ><div class="grid-content bg-purple">
  <el-form-item
    label="备注信息"
    :key="domain.key"
  >
    <el-input v-model="domain.remark" clearable></el-input>
    </el-form-item>
    <el-form-item>
    <el-button type="text" @click.prevent="removeDomainremark(domain)">删除</el-button>
  </el-form-item>
    </div>
  </el-col>
</el-row>
</el-form>  
<span slot="footer" class="footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="submitForm('dynamicValidateForm')">确 定</el-button>
  </span>
</el-dialog>
    <el-dialog
      class="dialog-wrap"
      title="查看档案"
      :visible.sync="dialogVisible3"
      width="70%"
    >
      <el-form :inline="true" disabled :model="dynamicValidateForm2" ref="dynamicValidateForm2" label-width="100px" class="demo-dynamic">
        <el-row :gutter="20">
          <el-col :span="12"><div class="grid-content bg-purple">
            <el-form-item
              label="姓名"
              prop="name"
              :rules="{
      required: true, message: '姓名不能为空', trigger: 'blur'
    }"
            >
              <el-input v-model="dynamicValidateForm2.name" clearable></el-input>
            </el-form-item>
          </div>
          </el-col>
          <el-col :span="12"><div class="grid-content bg-purple">
            <el-form-item
              label="证件号"
              prop="identNo"
              :rules="{
      required: true, message: '证件号不能为空', trigger: 'blur'
    }"
            >
              <el-input v-model="dynamicValidateForm2.identNo" clearable></el-input>
            </el-form-item>
          </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="addNew">
          <el-col :span="12"><div class="grid-content bg-purple">
            <span>电话信息</span>
            </el-form-item>
          </div>
          </el-col>
          <el-col :span="12"><div class="grid-content bg-purple layout">
<!--            <el-button type="text" icon="el-icon-plus" @click="addDomainPhone">新增电话</el-button> 
-->            </el-form-item>
          </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="addNewData" v-for="(domain, index) in dynamicValidateForm2.telList" :key="domain.key">
          <el-col :span="12" ><div class="grid-content bg-purple">
            <el-form-item
              label="电话类型"

            >
              <el-input v-model="domain.teltype" clearable></el-input>

            </el-form-item>
          </div>
          </el-col>
          <el-col :span="12" ><div class="grid-content bg-purple">
            <el-form-item
              label="电话号码"
            >
              <el-input v-model="domain.tel" clearable></el-input>
            </el-form-item>
            <el-form-item>
<!--              <el-button type="text" @click.prevent="removeDomainPhone(domain)">删除</el-button>
-->
            </el-form-item>
          </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="addNew">
          <el-col :span="12"><div class="grid-content bg-purple">
            <span>地址信息</span>
            </el-form-item>
          </div>
          </el-col>
          <el-col :span="12"><div class="grid-content bg-purple layout">
<!--            <el-button type="text" icon="el-icon-plus" @click="addDomainAddress">新增地址</el-button>  
-->            </el-form-item>
          </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="addNewData" v-for="(domain, index) in dynamicValidateForm2.addressList" :key="domain.key">
          <el-col :span="12" ><div class="grid-content bg-purple">
            <el-form-item
              label="地址信息"
              :key="domain.key"
            >
              <el-input v-model="domain.address" clearable></el-input>
            </el-form-item>
            <el-form-item>
<!--              <el-button type="text" @click.prevent="removeDomainAddress(domain)">删除</el-button>
-->            </el-form-item>
          </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="addNew">
          <el-col :span="12"><div class="grid-content bg-purple">
            <span>备注信息</span>
            </el-form-item>
          </div>
          </el-col>
          <el-col :span="12"><div class="grid-content bg-purple layout">
<!--            <el-button type="text" icon="el-icon-plus" @click="addDomainremark">新增备注</el-button> 
-->            </el-form-item>
          </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="addNewData" v-for="(domain, index) in dynamicValidateForm2.remarkList" :key="domain.key">
          <el-col :span="12" ><div class="grid-content bg-purple">
            <el-form-item
              label="备注信息"
              :key="domain.key"
            >
              <el-input v-model="domain.remark" clearable></el-input>
            </el-form-item>
            <el-form-item>
<!--              <el-button type="text" @click.prevent="removeDomainremark(domain)">删除</el-button>
-->            </el-form-item>
          </div>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible3 = false">关 闭</el-button>

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
	import {dataList,remoweData,addData,downModule} from '@/common/js/data-file-manage.js'
  import {baseURL} from '@/common/js/request.js';

export default {
  name: 'dataFileManage',
   data(){
    return {
    	fullscreenLoading:false,
      tableLoad:false,
      loadinText:"正在导入中",
    	ImportMsg:'',
    	ImportdialogVisible:false,
    	loading2:false,
      action:baseURL,
    	deleteList:[],
      dialogVisible:false,
    	  pageNum:"",
    	  pageSize:"",
      orderBy:"id",
      sort:"desc",
        dynamicValidateForm:{name:"",identNo:"", 
        addressList: [{
            address: ''
          }],
        telList: [{
            teltype: '',
            tel:''
          }],
          remarksList:[{
          	remark:''
          }]
        },
        dynamicValidateForm2:{name:"",identNo:"", 
        addressList: [{
            address: ''
          }],
        telList: [{
            teltype: '',
            tel:''
          }],
          remarksList:[{
          	remark:''
          }]
        },
        dialogVisible:false,
        dialogVisible2:false,
      dialogVisible3:false,
        currentPage4: 1,
        pages:1,
        total:0,
    	  form:{time:[]},
        DataList:[],
        header:{Authorization:localStorage.token}
    }
  },
  methods: {
  	ImportdialogVisibleWay(){
		this.loading2=false
		this.ImportdialogVisible=false
					this.fullscreenLoading=false
	},
  	handleClose(){
  			this.loading2=false
  						this.fullscreenLoading=false
		this.ImportdialogVisible=false
  	},
  	onProgress(){
      this.loadinText = "正在导入中"
		this.loading2=true
		this.fullscreenLoading=true

	},
  	showMessage(row){
  		console.log(row)
  		this.dialogVisible3=true
  		this.dynamicValidateForm2=row
  	},

  	
  		uploadSuccess(res,file,fileList){
      if (res.code ==100){
  		    this.$message({
            type: 'success',
            message: "导入成功"
          });
          this.tableLoad = true
           dataList().then((response)=>{
            this.DataList=response.list
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
  	removeDomainAddress(item) {
        var index = this.dynamicValidateForm.addressList.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.addressList.splice(index, 1)
        }
      },
      removeDomainPhone(item) {
        var index = this.dynamicValidateForm.telList.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.telList.splice(index, 1)
        }
      },
      removeDomainremark(item) {
        var index = this.dynamicValidateForm.remarksList.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.remarksList.splice(index, 1)
        }
      },
      addDomainAddress() {
        this.dynamicValidateForm.addressList.push({
          address: '',
          key: Date.now()
        });
      },
      addDomainPhone() {
        this.dynamicValidateForm.telList.push({
          teltype: '',
          tel:'',
          key: Date.now()
        });
      },
      addDomainremark(){
      	 this.dynamicValidateForm.remarksList.push({
          remark:'',
          key: Date.now()
        });
      },
  	handleSelectionChange(row){
  		let _self=this
  		_self.deleteList=[]
	row.forEach(function(currentValue, index, arr){
		let Object={"id":""}
	   Object.id=currentValue.id
	   _self.deleteList.push(Object)
	})
	console.log(_self.deleteList)
},
handleSizeChange(val){
	this.pageSize=val
	this.search()
},
handleCurrentChange(val){
this.pageNum=val;
this.search()
},
  	clench(){
    	  this.form={time:[]}
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
        }else{
          _self.$message({
            type: 'info',
            message: '请选择需要删除的数据!'
          });
        }


      },
    handleSort( {column,prop,order}){
      this.sort = order==null?"desc":order.replace("ending","")
      this.orderBy = prop==null?"id":prop
      let startTime=this.form.time[0]
      let endTime=this.form.time[1]
      this.tableLoad = true
      dataList(this.form.name,this.form.identNo,this.form.mobile,this.form.address,startTime,endTime,this.orderBy,this.sort,this.pageSize,this.pageNum).then((response)=>{
        this.DataList=response.list
        //this.pages = response.pages
        this.total = response.total
        this.tableLoad = false
      })
    },
    downModule(){
    	this.loading2=true
      this.loadinText = "正在导出中"
      this.fullscreenLoading=true
      downModule().then((response)=> {
          this.loading2=false
					this.fullscreenLoading=false
      })
    },
      search(){
      	let startTime=this.form.time[0]
        let endTime=this.form.time[1]
        this.tableLoad = true
        dataList(this.form.name,this.form.identNo,this.form.mobile,this.form.address,startTime,endTime,this.orderBy,this.sort,this.pageSize,this.pageNum).then((response)=>{
          this.DataList=response.list
          //this.pages = response.pages
          this.total = response.total
          this.tableLoad = false
        })
      },
       submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	console.log(this.dynamicValidateForm)
            addData(this.dynamicValidateForm).then((response)=>{
            	this.dialogVisible2=false
            	this.search()
            	this.$message({
            type: 'success',
            message: '保存成功!'
          });
          this.dynamicValidateForm={name:"",identNo:"", 
        addressList: [{
            address: ''
          }],
        telList: [{
            teltype: '',
            tel:''
          }],
           remarksList:[{
          	remark:''
          }]}
})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    created() {
      this.tableLoad = true
            dataList().then((response)=>{
            this.DataList=response.list
             // this.pages = response.pages
              this.total = response.total
              this.tableLoad = false
})    
             
},
}

</script>

<style lang="scss">
#data-file-manage{
  .el-dialog__header{
  	background-color: #f8f8f8;
  
  }
  .layout{
  	text-align: right;
  }
  .addNew{
  	margin-left:30px !important;
  	margin-right:30px !important;
  	border-bottom: 2px solid #f1f1f1;
  	margin-bottom: 10px;
  	
  }
    .addNewData{
  	margin-left:25px !important;
  	margin-right:25px !important;
  	margin-bottom: 10px;
  	
  }
   .el-loading-spinner .el-loading-text {
    font-size: 18px;
    }
}
</style>

