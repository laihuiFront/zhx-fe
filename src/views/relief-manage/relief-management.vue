<template>
  <div id="relief-management">
  	<el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="批次号">
    <el-input v-model="formInline.batchNo" placeholder="请输入批次号"></el-input>
  </el-form-item>
    <el-form-item label="个案序列号">
    <el-input v-model="formInline.seqno" placeholder="请输入个案序列号"></el-input>
  </el-form-item>
  <el-form-item label="对象姓名">
    <el-input v-model="formInline.targetName" placeholder="请输入对象姓名"></el-input>
  </el-form-item>
   <!--<el-form-item label="催收员">
                <el-select v-model="formInline.odv" filterable  placeholder="请选择催收员" clearable>
                  <el-option
                    v-for="item in PersonLists"
                    :key="item.id"
                    :label="item.userName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>-->
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
   <el-form-item label="委托方">
              <el-select v-model="formInline.client" filterable   placeholder="请选择委托方" clearable>
                <el-option
                  v-for="item in clientList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="逾期账龄">
                <el-select v-model="formInline.accountAge" filterable  placeholder="请选择逾期账龄" clearable>
                  <el-option
                    v-for="item in accountAgeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="减免状态">
                <el-select v-model="formInline.reduceStatus" filterable  placeholder="请选择减免状态" clearable>
                  <el-option
                    v-for="item in deleteStatusList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="催收状态">
                <el-select v-model="formInline.collectStatus" filterable  placeholder="请选择催收状态" clearable>
                  <el-option
                    v-for="item in collectStatusList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
               <el-form-item label="提交日期">
                <el-date-picker
                  v-model="formInline.time1"
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
               <el-form-item label="有效日期">
                <el-date-picker
                  v-model="formInline.time2"
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
               <el-form-item label="完成日期">
                <el-date-picker
                  v-model="formInline.time3"
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
  <el-form-item>
    <el-button type="primary" @click="search">查询</el-button>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click=clear>重置</el-button>
  </el-form-item>
   <el-form-item v-show="istrue1">
    <el-button type="primary" @click=addData >新增减免</el-button>
  </el-form-item>
  <el-form-item v-show="istrue2">
    <el-button type="primary" @click=moreDataList >批量撤销</el-button>
  </el-form-item>
   <el-form-item v-show="istrue3">
    <el-button type="primary" @click=moreDataList >批量审核</el-button>
  </el-form-item>
   <el-form-item v-show="istrue4">
    <el-button type="primary" @click=moreDataList >批量下载附件</el-button>
  </el-form-item>
  <el-form-item v-show="istrue5">
    <el-button type="primary"  >导出减免结果</el-button>
  </el-form-item>
</el-form>
 <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
    <el-tab-pane label="待审核" name="first"><el-table
      ref="multipleTable"
      :data="tableData3"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
     
    >
      <el-table-column
      	fixed
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="seqno"
        align="center"
        label="个人序列号"
      >
      </el-table-column>
      <el-table-column
        prop="targetName"
        align="center"
       label="案人姓名"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="collectStatus"
        align="center"
        label="催收状态"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="accountAge"
        align="center"
        label="委案金额"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="completeTime"
       align="center"
        label="完成时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="completeUser"
        label="完成人"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="approveRepayAmt"
      align="center"
        label="批复还款金额"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="reduceValidTime"
      align="center"
        label="有效日期"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="reduceStatus" 
        align="center"
        label="减免状态"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="reduceResult"
      label="减免结果"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="enRepayAmt"
      align="center"
        label="实际还款金额"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="reduceUpdateTime"
        align="center"
        label="减免状态更新时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="newCase"
        label="附件"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
  
      <el-table-column
        label="操作"
         fixed="right"
         width="170"
        show-overflow-tooltip>
        <template slot-scope="scope">
        <el-button type="text" size="small" @click="showMessage(scope.row)">审核</el-button>
        <el-button type="text" size="small" @click="showMessage(scope.row)">查看</el-button>
        <el-button type="text" size="small" @click="showMessage(scope.row)">修改</el-button>
           <el-button type="text" size="small" @click="deteleList(scope.row.id)">删除</el-button>
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
    </div></el-tab-pane>
    <el-tab-pane label="已审核" name="second"><el-table
      ref="multipleTable"
      :data="tableData3"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
     
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="seqno"
        align="center"
        label="个人序列号"
      >
      </el-table-column>
      <el-table-column
        prop="targetName"
        align="center"
       label="案人姓名"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="collectStatus"
        align="center"
        label="催收状态"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="accountAge"
        align="center"
        label="委案金额"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="completeTime"
       align="center"
        label="完成时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="completeUser"
        label="完成人"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="approveRepayAmt"
      align="center"
        label="批复还款金额"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="reduceValidTime"
      align="center"
        label="有效日期"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="reduceStatus" 
        align="center"
        label="减免状态"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="reduceResult"
      label="减免结果"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="enRepayAmt"
      align="center"
        label="实际还款金额"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="reduceUpdateTime"
        align="center"
        label="减免状态更新时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="newCase"
        label="附件"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
  
      <el-table-column
        label="操作"
        show-overflow-tooltip>
        <template slot-scope="scope">
         <el-button type="text" size="small" @click="showMessage(scope.row)">修改</el-button>
           <el-button type="text" size="small" @click="deteleList(scope.row.id)">删除</el-button>
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
    </div></el-tab-pane>
    <el-tab-pane label="已完成" name="third"><el-table
      ref="multipleTable"
      :data="tableData3"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
     
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="seqno"
        align="center"
        label="个人序列号"
      >
      </el-table-column>
      <el-table-column
        prop="targetName"
        align="center"
       label="案人姓名"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="collectStatus"
        align="center"
        label="催收状态"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="accountAge"
        align="center"
        label="委案金额"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="completeTime"
       align="center"
        label="完成时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="completeUser"
        label="完成人"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="approveRepayAmt"
      align="center"
        label="批复还款金额"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="reduceValidTime"
      align="center"
        label="有效日期"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="reduceStatus" 
        align="center"
        label="减免状态"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="reduceResult"
      label="减免结果"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="enRepayAmt"
      align="center"
        label="实际还款金额"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="reduceUpdateTime"
        align="center"
        label="减免状态更新时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="newCase"
        label="附件"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
  
      <el-table-column
        label="操作"
        width="120"
        show-overflow-tooltip>
        <template slot-scope="scope">
         <el-button type="text" size="small" @click="showMessage(scope.row)">查看</el-button>
           <el-button type="text" size="small" @click="deteleList(scope.row.id)">下载附件</el-button>
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
    </div></el-tab-pane>
  </el-tabs>

    <el-dialog
  :title="dialogTitle"
  :visible.sync="dialogVisible"
  width="40%"
  >
  <el-form :model="ruleForm" ref="ruleForm" :inline=true label-width="100px" class="demo-ruleForm">
 	<el-form-item label="个案序列号"
 		prop="seqno"
 		:rules="{
      required: true, message: '请输入个案序列号', trigger: 'blur'  
    }">
    <el-input v-model="ruleForm.seqno" placeholder="请输入个案序列号"></el-input>
  </el-form-item>
  <el-form-item label="批复还款金额">
    <el-input v-model="ruleForm.approveRepayAmt" placeholder="请输入批复还款金额"></el-input>
  </el-form-item>
  <el-form-item label="减免结果">
    <el-input v-model="ruleForm.reduceResult" placeholder="请输入减免结果"></el-input>
  </el-form-item>
   <el-form-item label="有效期"
   		prop="reduceValidTime"
 		:rules="{
       type: 'string', required: true, message: '请选择时间', trigger: 'blur' 
    }">
     <div class="block">
    <el-date-picker
    	value-format="yyyy-MM-dd"
      v-model="ruleForm.reduceValidTime"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </div>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
	import {areaList,clientList,PersonList,dataList,deleteStatusList,accountAgeList,collectStatusList,remoweData,addDataform,remoweDataList} from '@/common/js/relief-management.js'
export default {
  name: 'reliefManagement',
  data(){
    return {
    	istrue1:true,
    	istrue2:false,
    	istrue3:true,
    	istrue4:true,
    	istrue5:false,
    	activeName2:"first",
    	dialogTitle:'新增减免',
    	ruleForm:{
    		reduceValidTime:'',
    		seqno:''	
    	},
    	dialogVisible:false,
    	accountAgeList:[],
    	dataList:[],
    	 currentPage4: 1,
        pages:1,
        total:100,
    	formInline:{
    		time1:[],
    		time2:[],
    		time3:[]
    	},
    	PersonLists:[],
    	areaList:[],
    	clientList:[],
    	 tableData3: [],
    	 collectStatusList:[],
    	 deleteStatusList:[],
    	 deleteList:[]
    }
},
 methods: {
 	handleClick(tab, event) {
       if(this.activeName2==="first"){
	     this.istrue1=true
    	this.istrue2=false
    	this.istrue3=true
    	this.istrue4=true
    	this.istrue5=false
       } else if(this.activeName2==="second"){
       	 this.istrue1=false
    	   this.istrue2=true
        	this.istrue3=false
        	this.istrue4=false
    	   this.istrue5=true
       } else{
       	this.istrue1=false
    	   this.istrue2=false
        	this.istrue3=false
        	this.istrue4=true
    	   this.istrue5=false
       }   },
 	showMessage(row){
 		this.ruleForm=row
 		this.dialogTitle="修改减免"
 		this.dialogVisible=true
 	},
 	moreDataList(){
 		if(this.deleteList.length>=1){
 			remoweDataList(this.deleteList).then((response)=>{
          this.$message({
            type: 'success',
            message: '撤销成功!'
          });
         dataList(this.formInline).then((response)=>{
          	this.tableData3=response.list
          	this.formInline={	time1:[],time2:[],time3:[]}
          })
          })    
 		}else{
 			this.$message({
            type: 'error',
            message: '请选择数据!'
          });
 		}
 	},
 	search(){
 		 dataList(this.formInline).then((response)=>{
          	this.tableData3=response.list
          	this.formInline={	time1:[],time2:[],time3:[]}
          
          })
 	},
 	deteleList(id){
 		this.deleteList.push(id)
 		remoweData(this.deleteList).then((response)=>{
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          dataList(this.formInline).then((response)=>{
          	this.tableData3=response.list
          	this.formInline={	time1:[],time2:[],time3:[]}
          })
          })    
 	},
 	 submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           addDataform(this.ruleForm).then((response)=>{
              this.$message({
                 type: 'success',
                 message: '新增成功!'
             });
             this.dialogVisible=false;
          dataList(this.formInline).then((response)=>{
          	this.tableData3=response.list
          	this.formInline={	time1:[],time2:[],time3:[]}
          })
          })     
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
 	addData(){
 		this.dialogTitle='新增减免',
 		this.dialogVisible=true
 		this.ruleForm={
    		reduceValidTime:'',
    		seqno:''	
    	}
 	},
 	clear(){
 			this.formInline={
    		time1:[],
    		time2:[],
    		time3:[]
    	}
 	},
 		handleSelectionChange(row){
  		let _self=this
  		_self.deleteList=[]
	row.forEach(function(currentValue, index, arr){
	   _self.deleteList.push(currentValue.id)
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
 },
 created() {
 	
         	accountAgeList().then((response)=>{
            this.accountAgeList=response
          })
          areaList().then((response)=>{
          	this.areaList=response
          })
       
            clientList().then((response)=>{
          	this.clientList=response
          })
           
             PersonList().then((response)=>{
          	this.PersonLists=response
          })
              dataList(this.formInline).then((response)=>{
          	this.tableData3=response.list
          	this.formInline={	time1:[],time2:[],time3:[]}
          })
               collectStatusList().then((response)=>{
                this.collectStatusList=response
           }) 
            deleteStatusList().then((response)=>{
             this.deleteStatusList=response
          })
            
            
},
}
</script>

<style lang="scss">
#relief-management{
	.el-dialog__header{
  	background-color: #f8f8f8;
  }
}
</style>


