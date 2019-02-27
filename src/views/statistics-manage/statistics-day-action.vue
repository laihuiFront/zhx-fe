<template>
  <div id="statistics-day-action">
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
      type="daterange"
      range-separator="至"
      start-placeholder="催收开始日期"
      end-placeholder="催收结束日期">
    </el-date-picker>
  </div>
  
  </el-form-item>
  <el-form-item>
  <el-button type="text" icon="el-icon-search" 开始统计</el-button> 
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
     :summary-method="getSummaries"
     style="width: 100%">
    <el-table-column
      prop="odv"
      align="center"
      label="催收员"
     >
    </el-table-column>
   <el-table-column
      prop="countSearchNo"
      align="center"
      label="114查询无效"
     >
    </el-table-column><el-table-column
      prop="countDX1"
      align="center"
      label="DX1"
     >
    </el-table-column><el-table-column
      prop="countDX2"
      align="center"
      label="DX2"
     >
    </el-table-column><el-table-column
      prop="countDX3"
      align="center"
      label="DX3"
     >
    </el-table-column><el-table-column
      prop="countDX4"
      align="center"
      label="DX4"
     >
    </el-table-column><el-table-column
      align="center"
      label="承诺还款"
      prop="countRepay"
     >
     <template slot-scope="scope">
        <el-button type="text" size="small" @click="showMessage(scope)">{{scope.row.countRepay}}</el-button>
      </template>
    </el-table-column><el-table-column
      align="center"
      label="可联系本人"
       prop="countConSelf"
     >
     <template slot-scope="scope">
        <el-button type="text" size="small" @click="showMessage(scope)">{{scope.row.countConSelf}}</el-button>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      label="可联村委"
      prop="countConVillage"
     >
     <template slot-scope="scope">
        <el-button type="text" size="small" @click="showMessage(scope)">{{scope.row.countConVillage}}</el-button>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      label="可联系第三人"
       prop="countConThird"
     >
     <template slot-scope="scope">
        <el-button type="text" size="small" @click="showMessage(scope)">{{scope.row.countConThird}}</el-button>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      label="可联系家人"
      prop="countConFamily"
     >
     <template slot-scope="scope">
        <el-button type="text" size="small" @click="showMessage(scope)">{{scope.row.countConFamily}}</el-button>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      label="空号错号"
      prop="countDeadNumber"
     >
     <template slot-scope="scope">
        <el-button type="text" size="small" @click="showMessage(scope)">{{scope.row.countDeadNumber}}</el-button>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      label="网搜无效"
       prop="countSearchInvalid"
     >
     <template slot-scope="scope">
        <el-button type="text" size="small" @click="showMessage(scope)">{{scope.row.countSearchInvalid}}</el-button>
      </template>
    </el-table-column>
     <el-table-column
      align="center"
      label="无人接听"
      prop="countNoAnswer"
     >
     <template slot-scope="scope">
        <el-button type="text" size="small" @click="showMessage(scope)">{{scope.row.countNoAnswer}}</el-button>
      </template>
    </el-table-column>
     <el-table-column
      align="center"
      label="无效电话"
      prop="countInvalidCall"
     >
     <template slot-scope="scope">
        <el-button type="text" size="small" @click="showMessage(scope)" >{{scope.row.countInvalidCall}}</el-button>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      label="合计"
     >
     <template slot-scope="scope">
        <el-button type="text" size="small" >{{scope.row.name}}</el-button>
      </template>
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
  <el-dialog :title="dialogTitle" :visible.sync="dialogTableVisible"  width="80%">
  <el-table :data="gridData">
    <el-table-column property="date" label="通话时间" ></el-table-column>
    <el-table-column property="name" label="通话对象" ></el-table-column>
    <el-table-column property="address" label="电话号码"></el-table-column>
    <el-table-column property="address" label="电话类型"></el-table-column>
    <el-table-column property="address" label="通话内容"></el-table-column>
    <el-table-column property="address" label="通话结果"></el-table-column>
    <el-table-column property="address" label="承诺日期"></el-table-column>
    <el-table-column property="address" label="承诺金额"></el-table-column>
    <el-table-column property="address" label="催收员"></el-table-column>
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
</el-dialog>
  </div>
</template>

<script>
		import {areaList,clientList,PersonList,dataList,messageList} from '@/common/js/statistics-day-action.js'
export default {
  name: 'statisticsDayAction',
  data(){
    return {
    	dialogTitle:'',
    	dialogTableVisible:false,
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
    	 tableData3: [],
    	  gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
    }
    },
    methods: {
    	showMessage(row){
    		this.dialogTableVisible=true
    		this.dialogTitle=row.column.label
    		messageList(row,this.formInline).then((response)=>{
          	this.gridData=response
          })
    		
    	},
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
                        sums[index];
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
#statistics-day-action{
	.el-dialog__header{
  	background-color: #f8f8f8;
  
  }
}
</style>

