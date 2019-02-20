<template>
  <div id="statistics-month">
<el-row :gutter="20">
  <el-col :span="22">
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
      :key="item.value"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item >
   <div class="block">
    <el-date-picker
    	
      v-model="formInline.time"
      type="month"
      placeholder="选择开始月份"
      >
    </el-date-picker>至
    <el-date-picker
    	
      v-model="formInline.time2"
      type="month"
      placeholder="选择结束月份"
      >
    </el-date-picker>
  </div>
  
  </el-form-item>
  <el-form-item>
  <el-button type="text" icon="el-icon-search">开始统计</el-button> 
  </el-form-item>
  <el-form-item>
  <el-button type="text" icon="el-icon-refresh" @click=clench>重置</el-button> 
  </el-form-item>

</el-form>
  	</div></el-col>
  <el-col :span="2">
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
     :summary-method="getSummaries"
    style="width: 100%">
    <el-table-column
      prop="odv"
      align="center"
      label="催收员"
     >
    </el-table-column>
    <el-table-column :label="item.area" align="center" v-for="(item,index) in dataList" :key="item.area">
      <el-table-column
        label="有效通电"
        align="center"
        prop="list[index].countConPhoneNum"
       >
        <template slot-scope="scope">
          {{ scope.row.list[index].countConPhoneNum }}
        </template>
      </el-table-column>
      <el-table-column
        label="总通电量"
        align="center"
        prop="list[index].countPhoneNum"
       >
        <template slot-scope="scope">
          {{ scope.row.list[index].countPhoneNum }}
        </template>
      </el-table-column>
      <el-table-column
        label="个按量"
        align="center"
        prop="countCasePhoneNum"
       >
        <template slot-scope="scope">
          {{ scope.row.list[index].countCasePhoneNum }}
        </template>
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
		import {areaList,clientList,PersonList,dataList} from '@/common/js/statistics-month.js'

export default {
  name: 'statisticsMonth',
  data(){
    return {
    	 currentPage4: 1,
        pages:1,
        total:100,
        dataList:[],
    	formInline:{time:"",time2:""},
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
    	  getSummaries(param) {
 	     const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计';
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        sums[index] += ' 元';
                    } else {
                        sums[index] = 'N/A';
                    }
                });

                return sums;
            },
    	handleSizeChange(val){
	this.pageSize=val
},
handleCurrentChange(val){
this.pageNum=val;
},
 	onSubmit(){
 		console.log(this.formInline.odv)
 	},
 	clench(){
 		this.formInline={}
 	}
 },
 created() {
 	 dataList(this.formInline).then((response)=>{
          	this.tableData3=response.list
          	this.dataList=[]
          	for(var i=0;i<=response.list[0].list.length;i++){
           for(var j in response.list[0].list[i]) {
           	// debugger
           	if(j==="area"){
           		let item={area:''}
          		item.area=response.list[0].list[i].area
          		this.dataList.push(item)
           	}
}
          		
          	}
          	console.log(this.dataList)
          })
          areaList().then((response)=>{
          	this.areaList=response
          })
       
            clientList().then((response)=>{
          	this.clientList=response
          })
           
             PersonList().then((response)=>{
          	this.PersonList=response
          })
            
},
}
</script>

<style lang="scss">
#statistics-month{
	.el-form--inline .el-form-item{
	margin-right:0px;
}
}
</style>


