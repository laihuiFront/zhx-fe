<template>
  <div id="statistics-day">
  	<el-row :gutter="20">
  <el-col :span="20">
  	<div class="grid-content bg-purple">
  		<el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item >
    <el-select v-model="formInline.odv" multiple collapse-tags  filterable  placeholder="请选择催收员" clearable>
    <el-option
      v-for="item in PersonList"
      :key="item.id"
      :label="item.userName"
      :value="item.id">
    </el-option>
  </el-select> 
  </el-form-item>
  <el-form-item>
    <el-select v-model="formInline.area" placeholder="请选择催收区域" clearable>
    <el-option
      v-for="item in areaList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>   
  </el-form-item>
  <el-form-item >
  <el-select v-model="formInline.client" placeholder="请选择委托方" clearable>
    <el-option
      v-for="item in clientList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item >
   <div class="block">
    <el-date-picker
      v-model="formInline.time"
      type="daterange"
      range-separator="至"
      start-placeholder="催收开始日期"
      end-placeholder="催收结束日期">
    </el-date-picker>
  </div>
  
  </el-form-item>
  <el-form-item>
  <el-button type="text" icon="el-icon-search" @click=dataList()>开始统计</el-button> 
  </el-form-item>
  <el-form-item>
  <el-button type="text" icon="el-icon-refresh" @click=clench>重置</el-button> 
  </el-form-item>

</el-form>
  	</div></el-col>
  <el-col :span="4">
  	<div class="grid-content bg-purple">
 <el-form :inline="true"  class="demo-form-inline">
  <el-form-item>
    <el-button type="primary" @click="onSubmit">导出查询结果</el-button>
  </el-form-item>
</el-form>
  	</div></el-col>
</el-row>
  
  <el-table
    :data="tableData3"
     show-summary
    style="width: 100%">
    <el-table-column
      prop="odv"
      align="center"
      label="催收员"
     >
    </el-table-column>   	
       <el-table-column label="8:00前" align="center">
      <el-table-column
        prop="list[0].countConPhoneNum"
        label="有效通电"
        align="center"
       >
      </el-table-column>
      <el-table-column
        prop="list[0].countPhoneNum"
        label="总通电量"
        align="center"
       >
      </el-table-column>
      <el-table-column
        prop="list[0].countCasePhoneNum"
        label="个按量"
        align="center"
       >
      </el-table-column>
    </el-table-column> 
       <el-table-column label="8:00-12:00" align="center">
      <el-table-column
        prop="list[1].countConPhoneNum"
        label="有效通电"
        align="center"
       >
      </el-table-column>
      <el-table-column
        prop="list[1].countPhoneNum"
        label="总通电量"
        align="center"
       >
      </el-table-column>
      <el-table-column
        prop="list[1].countCasePhoneNum"
        label="个按量"
        align="center"
       >
      </el-table-column>
    </el-table-column>  <el-table-column label="12:00-18:00" align="center">
      <el-table-column
        prop="list[2].countConPhoneNum"
        label="有效通电"
        align="center"
       >
      </el-table-column>
      <el-table-column
        prop="list[2].countPhoneNum"
        label="总通电量"
        align="center"
       >
      </el-table-column>
      <el-table-column
        prop="list[2].countCasePhoneNum"
        label="个按量"
        align="center"
       >
      </el-table-column>
    </el-table-column>  <el-table-column label="18:00以后" align="center">
      <el-table-column
        prop="list[3].countConPhoneNum"
        label="有效通电"
        align="center"
       >
      </el-table-column>
      <el-table-column
        prop="list[3].countPhoneNum"
        label="总通电量"
        align="center"
       >
      </el-table-column>
      <el-table-column
        prop="list[3].countCasePhoneNum"
        label="个按量"
        align="center"
       >
      </el-table-column>
    </el-table-column> 
    <el-table-column label="合计" align="center">
      <el-table-column
        prop="sumConPhoneNum"
        label="有效通电"
        align="center"
       >
      </el-table-column>
      <el-table-column
        prop="sumPhoneNum"
        label="总通电量"
        align="center"
       >
      </el-table-column>
      <el-table-column
        prop="sumCasePhoneNum"
        label="个案量"
        align="center"
       >
      </el-table-column>
    </el-table-column>
  </el-table>
    <div class="block">
  	 <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pages"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  </div>
</template>

<script>
	import {areaList,clientList,PersonList,dataList} from '@/common/js/statistics-day.js'
export default {
  name: 'statisticsDay',
  data(){
    return {
    	dataList:[],
    	 currentPage4: 1,
        pages:1,
        total:100,
    	formInline:{
    		odv:[],
    		time:[]
    	},
    	PersonList:[],
    	areaList:[],
    	clientList:[],
    	 tableData3: [{
          date: '2016-05-03',
          name:  1,
          
        }, {
          date: '2016-05-02',
          name:  1,
          
        }, {
          date: '2016-05-04',
          name:  1,
          
        }, {
          date: '2016-05-01',
          name:  1,
         
        },]
    }
},
 methods: {
 	handleSizeChange(val){
	this.pageSize=val
	              dataList(this.formInline,this.pageSize,this.pageNum).then((response)=>{
          	this.tableData3=response
          })
},
handleCurrentChange(val){
this.pageNum=val;
              dataList(this.formInline,this.pageSize,this.pageNum).then((response)=>{
          	this.tableData3=response
          })
},
 	onSubmit(){
 		
 	},
 	clench(){
 		this.formInline={}
 	}
 },
 created() {
          areaList().then((response)=>{
          	this.areaList=response
          })
       
            clientList().then((response)=>{
          	this.clientList=response
          })
           
             PersonList().then((response)=>{
          	this.PersonList=response
          })
              dataList(this.formInline).then((response)=>{
          	this.tableData3=response.list
          })
            
            
},
 }
</script>

<style lang="scss">
#statistics-day{
	.el-form--inline .el-form-item{
	margin-right:0px;
}
}
</style>


