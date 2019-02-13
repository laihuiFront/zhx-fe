<template>
  <div id="data-file-manage">
  <el-row :gutter="24">
  <el-col :span="24">
  	<div class="grid-content bg-purple">
  		<el-form :inline="true" ref="form" :model="form" label-width="80px">
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
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      
      >
    </el-date-picker>
  </el-form-item>
  <el-form-item>
  <el-button type="text" icon="el-icon-search" @click=search>查询</el-button> 
  </el-form-item>
  <el-form-item>
  <el-button type="text" icon="el-icon-refresh" @click=clench>重置</el-button> 
  </el-form-item>
  </el-form>
  	</div>
  </el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  <el-form :inline="true">
  		<el-form-item>
      <el-button type="primary" @click="dialogVisible = true">导入</el-button> 
      </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="dialogVisible2 = true">新增</el-button>  </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="open7">删除</el-button> 
      </el-form-item>
     
</el-form>
  	</div>
  </el-col>
   </el-row>
   <el-table
    ref="multipleTable"
    :data="DataList"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="证件号"
       prop="identNo"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      >
    </el-table-column>
    <el-table-column
      label="电话类型"
      prop="identNo"
      show-overflow-tooltip>
      
    </el-table-column>
    <el-table-column
      label="电话号码"
      show-overflow-tooltip>
      <template slot-scope="scope" >
      	<div v-for="(domain, index) in scope.row.telList">
        <span >{{domain.tel}}</span> <br />
      	</div>
      </template>
    </el-table-column>
    <el-table-column
      label="地址"
      show-overflow-tooltip>
      <template slot-scope="scope" >
      	<div v-for="(domain, index) in scope.row.addressList">
        <span >{{domain.address}}</span> <br />
      	</div>
      </template>
    </el-table-column>
    <el-table-column
      prop="remark"
      label="备注"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
  <div class="block">
  	 <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
  <el-dialog
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
</el-form>  
<span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="submitForm('dynamicValidateForm')">确 定</el-button>
  </span>
</el-dialog>
  </div>
    </div>
</template>

<script>
	import {dataList,remoweData,addData} from '@/common/js/data-file-manage.js'
export default {
  name: 'dataFileManage',
   data(){
    return {
    	deleteList:[],
    	  pageNum:"",
    	  pageSize:"",
        dynamicValidateForm:{name:"",identNo:"", 
        addressList: [{
            address: ''
          }],
        telList: [{
            teltype: '',
            tel:''
          }],},
        dialogVisible:false,
        dialogVisible2:false,
        currentPage4: 1,
    	  form:{time:[]},
        DataList:[],
    }
  },
  methods: {
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
      search(){
      	let startTime=this.form.time[0]
      	let endTime=this.form.time[1]
      	 dataList(this.form.name,this.form.identNo,this.form.mobile,this.form.address,startTime,endTime,this.pageSize,this.pageNum).then((response)=>{
            this.DataList=response.list
})
      },
       submitForm(formName) {
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
          }],}
})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
    created() {
            dataList().then((response)=>{
            this.DataList=response.list
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
}
</style>

