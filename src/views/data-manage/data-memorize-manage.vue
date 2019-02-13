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
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>   
  </el-form-item>
  <el-form-item >
<el-select v-model="form.dept" placeholder="部门" clearable>
    <el-option
      v-for="item in departmentList"
      :key="item.id"
      :label="item.orgName"
      :value="item.id">
    </el-option>
  </el-select>   </el-form-item>
   <el-form-item >
 <el-select v-model="form.odv" filterable  placeholder="请选择催收员" clearable>
    <el-option
      v-for="item in form.PersonList"
      :key="item.createTime"
      :label="item.userName"
      :value="item.id">
    </el-option>
  </el-select>   </el-form-item>
   <el-form-item >
  <el-select v-model="form.measure" placeholder="催收措施" clearable>
    <el-option
      v-for="item in form.options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
   <el-form-item>
  <el-button type="text" icon="el-icon-caret-bottom" @click="dialogVisible1 = true"></el-button> 
  </el-form-item>
  <el-form-item>
  <el-button type="text" icon="el-icon-search" @click="search">查询</el-button> 
  </el-form-item>
  <el-form-item>
  <el-button type="text" icon="el-icon-refresh" @click="resetForm">重置</el-button> 
  </el-form-item>
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
  <!--<el-col :span="8">
  	<div class="grid-content bg-purple">
  <el-form :inline="true">
  	
</el-form>
  	</div>
  </el-col>-->
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
      label="ID"
      >
      <template slot-scope="scope">{{ scope.row.id }}</template>
    </el-table-column>
    <el-table-column
      prop="seqno"
      label="个案序列号"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="measure"
      label="催收措施"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="collectTime"
      label="催收时间"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="targetName"
      label="对象姓名"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="relation"
      label="与案人关系"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="telType"
      label="电话类型"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话号码"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="collectInfo"
      label="催收记录"
      show-overflow-tooltip>
    </el-table-column><el-table-column
      prop="result"
      label="催收结果"
      show-overflow-tooltip>
    </el-table-column><el-table-column
      prop="method"
      label="谈判方式"
      show-overflow-tooltip>
    </el-table-column><el-table-column
      prop="repayTime"
      label="承诺还款日期"
      show-overflow-tooltip>
    </el-table-column><el-table-column
      label="承诺还款金额"
      show-overflow-tooltip>
      <template slot-scope="scope">
                ￥{{scope.row.repayAmt}}
      </template>
    </el-table-column><el-table-column
      label="减免金额"
      show-overflow-tooltip>
      <template slot-scope="scope">
                ￥{{scope.row.reduceAmt}}
      </template>
    </el-table-column><el-table-column
      prop="reduceStatusMsg"
      label="减免状态"
      show-overflow-tooltip>
    </el-table-column><el-table-column
      prop="odv"
      label="催收员"
      show-overflow-tooltip>
    </el-table-column><el-table-column
      prop="collectStatusMsg"
      label="催收状态"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="操作"
      show-overflow-tooltip>
      <template slot-scope="scope">
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
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
  <el-dialog
  title="查询条件"
  :visible.sync="dialogVisible1"
  width="66%"
  >
 
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
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  		  <el-form-item label="预计退案日期">
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
    <el-button @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="Listsearch">确 定</el-button>
  </span>
</el-dialog>
  <el-dialog
  title="导出查询结果"
  :visible.sync="dialogVisible2"
  width="30%"
 >
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
import {search,dataList,areaList,caseTypeList,clientList,EndList,PersonList,departmentList} from '@/common/js/data-memorize-manage.js'
export default {
  name: 'dataMemorizeManage',
  data(){
    return {
    	  caseStatusList:[{name:"未退案",id:0},{name:"正常",id:1},{name:"暂停",id:2},{name:"关档",id:3},{name:"退档",id:4},{name:"全部",id:5}],
    	  EndList:[],
    	  departmentList:[],
    	  PersonList:[],
    	  clientList:[],
    	  caseTypeList:[],
    	  pageSize:10,
    	  pageNum:1,
    	  deleteList:[],
    	  areaList:[],
        dynamicValidateForm:{},
        dialogVisible:false,
         dialogVisible1:false,
        dialogVisible2:false,
        tableData3:[],
        currentPage4: 1,
    	  form:{PersonList:[]},
    	  formInline:{
    	  	collectTime:[],
    	  	expectTime:[],
    	  	bailTime:[]
    	  },
    }
  },
  methods: {
  	search(){
		search(this.form.area,this.form.dept,this.form.odv,this.form.measure,this.pageSize,this.pageNum).then((response)=>{
          	this.tableData3=response
          })
  	},
  	Listsearch(){
  let bailStartDate=this.formInline.bailTime[0]
  let bailEndDate=this.formInline.bailTime[1]
  let expectStartTime=this.formInline.expectTime[0]
  let expectEndTime=this.formInline.expectTime[1]
  let collectStartTime=this.formInline.collectTime[0]
  let collectEndTime=this.formInline.collectTime[1]
	dataList(this.formInline.area,this.formInline.dept,this.formInline.batchNo,this.formInline.client,this.formInline.odv,this.formInline.caseStatus,this.formInline.measure,this.formInline.result,this.formInline.identNo,this.formInline.cardNo,this.formInline.collectInfo,this.formInline.color,this.formInline.seqno,this.formInline.bailStartDate,this.formInline.bailEndDate,this.formInline.expectStartTime,this.formInline.expectEndTime,this.formInline.collectStartTime,this.formInline.collectEndTime,this.pageSize,this.pageNum).then((response)=>{
          	this.tableData3=response
          	this.dialogVisible1=false
          })
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
  	resetForm(){
  		this.form={}
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
#data-memorize-manage{
  .el-dialog__header{
  	background-color: #f8f8f8;
  
  }
}
</style>


