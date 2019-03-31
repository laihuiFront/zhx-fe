<template>
  <div id="statistics-month" class="page-wraper-sub"
  		v-loading="loading"
   	 element-loading-text="拼命加载中"
   	   	  	  v-loading.fullscreen.lock="fullscreenLoading"

    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.7)">
    <el-form ref="form" :model="formInline" :inline="true" class="query-wrap">
      <el-form-item>
        <el-input v-model="odvName" width="200" @focus="onClickSelectUser" clearable placeholder="请选择催收员"></el-input>
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
      <el-form-item>
        <el-select v-model="formInline.client" placeholder="请选择委托方" clearable>
          <el-option
            v-for="item in clientList"
            :key="item.value"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="formInline.time"
          type="month"
          value-format="yyyy-MM"
          placeholder="选择开始月份"
          >
        </el-date-picker>至
        <el-date-picker
          v-model="formInline.time2"
          type="month"
          value-format="yyyy-MM"
          placeholder="选择结束月份"
          >
        </el-date-picker>
      </el-form-item>
      <el-form-item style="margin-left:10px;">
        <el-button type="primary" icon="el-icon-search" @click="query">开始统计</el-button>
        <el-button type="primary" icon="el-icon-refresh" @click="clench">重置</el-button> 
      </el-form-item>
      <el-form-item class="operation-item">
        <el-button type="primary" @click="onSubmit">导出查询结果</el-button>
      </el-form-item>
    </el-form>
     <el-table highlight-current-row v-if="tableData3.length>0"
      v-loading="tableLoad"
      :data="tableData3"
      border
      stripe
      show-summary
      height="350"
      style="width: 100%"
      class="table-wrap">
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
          prop="countConPhoneNum"
        >
          <template slot-scope="scope">
            {{ scope.row.list[index].countConPhoneNum }}
          </template>
        </el-table-column>
        <el-table-column
          label="总通电量"
          align="center"
          prop="countPhoneNum"
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
    <p v-else style="text-align:center">暂无数据</p>
    <el-pagination
      v-if="total>0"
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
      title="选择催收员"
      class="dialog-wrap"
      :visible.sync="selectUserVisible"
      :close-on-click-modal="false"
      width="600px"
    >
      <el-tree
        :data="selectUserTree"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps">
      </el-tree>
      <span slot="footer" class="footer">
        <el-button @click="selectUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="onClickSaveUser">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
		import {areaList,clientList,PersonList,getUserTree,dataList,selectDataCaseExport} from '@/common/js/statistics-month.js'

export default {
  name: 'statisticsMonth',
  data(){
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      selectUserTree: [],
      selectUserVisible: false,
    	fullscreenLoading:false,
    	loading:false,
      tableLoad:false,
    	 currentPage4: 1,
        pages:1,
        total:0,
      odvName: "",
        dataList:[],
    	formInline:{time:"",time2:""},
    	PersonList:[],
    	areaList:[],
    	clientList:[],
    	 tableData3: []
    }
    },
    methods: {

      onClickSaveUser() {
        let selectDataArr = this.$refs.tree.getCheckedNodes()
        let selectUserNames = ''
        let selectUserIds = []
        if(selectDataArr.length > 0){
          selectUserNames = selectDataArr.filter((item)=>{
            return item.type === 'user'
          }).map((item) => {
            return item.name
          })
          selectUserIds = selectDataArr.filter((item)=>{
            return item.type === 'user'
          }).map((item) => {
            return item.id
          })
        }
        this.odvName = selectUserNames.join(',')
        this.$set(this.formInline,'odv', selectUserIds)
        this.selectUserVisible = false
      },
      onClickSelectUser() {
        this.selectUserVisible = true
        if(!this.odvName){
          this.$set(this.formInline, 'odv', [])
        }

        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(this.formInline.odv);
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

                    const values1 = data[0].list.map(item => Number(item[column.property]));

                    const values = values1[Math.ceil(index/3)-1];
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        sums[index] += ' ';
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

      if ((this.formInline.time==null || this.formInline.time=="") ||  (this.formInline.time2==null  || this.formInline.time2=="")){
        this.$message({
          type: 'error',
          message: '请选择查询时间段!'
        });
        return;
      }
  			this.loading=true
			this.fullscreenLoading=true
 		selectDataCaseExport(this.formInline,this.pageSize,this.pageNum).then((response)=>{
 		  console.info(response)
          	this.$message({
              type: 'success',
              message: '导出成功!'
            });
          	this.loading=false
			      this.fullscreenLoading=false
          })
 	},
 	clench(){
 		this.formInline={}
 	},
      query(){
        if ((this.formInline.time==null || this.formInline.time=="") ||  (this.formInline.time2==null  || this.formInline.time2=="")){
          this.$message({
            type: 'error',
            message: '请选择查询时间段!'
          });
          return;
        }
        this.tableLoad = true
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
          this.tableLoad = false

        }).catch(()=>{
          this.tableLoad = false
        })
      }
 },
 created() {
// this.tableLoad = true
// 	 dataList(this.formInline).then((response)=>{
// 	 	         this.total=response.totalNum
//        	this.tableData3=response.list
//        	this.dataList=[]
//        	for(var i=0;i<=response.list[0].list.length;i++){
//         for(var j in response.list[0].list[i]) {
//         	// debugger
//         	if(j==="area"){
//         		let item={area:''}
//        		item.area=response.list[0].list[i].area
//        		this.dataList.push(item)
//         	}
//}
//        		
//        	}
//        	   this.tableLoad = false
//          console.log(this.dataList)
//        })
          areaList().then((response)=>{
          	this.areaList=response
          })
       
            clientList().then((response)=>{
          	this.clientList=response
          })
           
             PersonList().then((response)=>{
          	this.PersonList=response
          })

   getUserTree().then(data => {
     this.selectUserTree = [data]
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


