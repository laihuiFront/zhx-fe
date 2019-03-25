<template>
  <div id="synergistic-record" class="page-wraper-sub"
  	v-loading="loading2"
  	   	   	  	  v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
   element-loading-background="rgba(0, 0, 0, 0.7)">
    <syn-record-query 
      @reset="onClickReset"
      @query="onClickQuery"
      :queryForm="queryForm">
      <el-button type="primary" @click="dialogExportVisible = true" v-has="'导出查询结果'">导出查询结果</el-button>
    </syn-record-query>
     <el-table highlight-current-row v-loading="tableLoad"
      @sort-change="handleSort"
      :data="recordList"
      border
      stripe
      style="width: 100%"
      height="1"
      class="table-wrap">
      <el-table-column  sortable="custom" :sort-orders="['ascending','descending']" min-width="120" align="center" prop="synergisticType.name" label="协催类型" show-overflow-tooltip></el-table-column>
      <el-table-column  sortable="custom" :sort-orders="['ascending','descending']" min-width="120" align="center" prop="dataCase.collectStatusMsg" label="催收状态" show-overflow-tooltip></el-table-column>
      <el-table-column  sortable="custom" :sort-orders="['ascending','descending']" min-width="130" align="center" prop="dataCase.seqNo" label="个案序列号" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editCase(scope.row.dataCase.id, scope.row.dataCase.name,scope.row.dataCase.seqNo)">{{scope.row.dataCase.seqNo}}</el-button>
        </template>
      </el-table-column>
      <el-table-column  sortable="custom" :sort-orders="['ascending','descending']" min-width="200" align="center" prop="dataCase.identNo" label="证件号" show-overflow-tooltip></el-table-column>
      <el-table-column  sortable="custom" :sort-orders="['ascending','descending']" min-width="130" align="center" prop="dataCase.name" label="姓名" show-overflow-tooltip></el-table-column>
      <el-table-column  sortable="custom" :sort-orders="['ascending','descending']" min-width="120" align="center" prop="dataCase.moneyMsg" label="委案金额" show-overflow-tooltip></el-table-column>
      <el-table-column  sortable="custom" :sort-orders="['ascending','descending']" min-width="120" align="center" prop="dataCase.repayMoneyMsg" label="还款金额" show-overflow-tooltip></el-table-column>
      <el-table-column  sortable="custom" :sort-orders="['ascending','descending']" min-width="150" align="center" prop="applyContent" label="申请内容" show-overflow-tooltip></el-table-column>
      <el-table-column  sortable="custom" :sort-orders="['ascending','descending']" min-width="180" align="center" prop="applyTime" label="申请时间" show-overflow-tooltip></el-table-column>
      <el-table-column   sortable="custom" :sort-orders="['ascending','descending']" min-width="120" align="center" prop="applyUser.userName" label="催收员" show-overflow-tooltip></el-table-column>
      <el-table-column  sortable="custom" :sort-orders="['ascending','descending']" min-width="180" align="center" prop="synergisticTime" label="协催时间" show-overflow-tooltip></el-table-column>
      <el-table-column  sortable="custom" :sort-orders="['ascending','descending']" min-width="120" align="center" prop="synergisticUser.name" label="协催人" show-overflow-tooltip></el-table-column>
      <el-table-column  sortable="custom" :sort-orders="['ascending','descending']" min-width="130" align="center" prop="synergisticResult" label="协催结果" show-overflow-tooltip></el-table-column>
    </el-table>
    <el-pagination
      @size-change="onClickQuery"
      @current-change="onClickQuery"
      :current-page.sync="queryForm.pageNum"
      :page-size.sync="queryForm.pageSize"
      layout="prev, pager, next, jumper,total, sizes"
      :page-sizes="[100, 500, 2000, 10000, 1000000]"
      :total="total"
      class="pagination-wrap"
    ></el-pagination>
    <el-dialog
      title="导出查询结果"
      :visible.sync="dialogExportVisible"
      width="30%"
      center
    >
      <el-form :inline="true">
        <el-form-item>
          <el-radio label="1" v-model="radio" >按查询条件全部导出</el-radio>
        </el-form-item>
        <el-form-item>
          <el-radio label="2" v-model="radio" >按查询条件导出当前分页</el-radio>
        </el-form-item>
      
      </el-form>
        <span slot="footer" class="dialog-footer">
   <el-button @click="dialogExportVisible = false">取 消</el-button>
    <el-button type="primary" @click="changeRadio">确 定</el-button>  
        </span>
    </el-dialog>
  </div>
</template>

<script>
import {SynRecordQuery} from './components'
import {getSynergisticRecordList,expAllSynergisticRecord,expCurrentSynergisticRecord} from '@/common/js/api-sync'
export default {
  name: 'synergisticRecord',
  components:{
    SynRecordQuery
  },
  data(){
    return {
    	radio:'1',
    	loading2:false,
    	fullscreenLoading:false,
      dialogExportVisible:false,
      tableLoad:false,
      recordList: [],
      total:0,
      queryForm:{
        pageNum: 1,
        pageSize: 100,
        applyStatus:1,
        finishStatus:1,
        synergisticType:{},
        dataCase:{
          collectionArea:{},
        },
        applyUser:{}
      }
    }
  },
  created() {
    this.onClickQuery()
  },
  methods: {
  	changeRadio(){
  				if(this.radio==1){
			this.handleCommand('all')
		}else{
			this.handleCommand('current')
		}
  	},
    editCase(id, name, seqNo){
      this.$router.push({
        path:'case-detail',
        query:{
          id,
          name,
          seqNo
        }
      })
    },
    onClickReset(){
      this.queryForm = {
        pageNum: this.queryForm.pageNum,
        pageSize: this.queryForm.pageSize,
        applyStatus:1,
        finishStatus:1,
        synergisticType:{name:null},
        dataCase: {
          collectionArea:{id: null},
        },
        applyUser:{name:null}
      }
    },
    onClickQuery(){
      this.tableLoad = true
      this.recordList = []
      getSynergisticRecordList(this.queryForm).then(data => {
        this.recordList = data.list
        this.total = data.total
        this.tableLoad = false
      })
    },
    handleSort({column,prop,order}){
      // console.log(prop,'@',order)
      this.queryForm.orderBy = prop
      this.queryForm.sort = order === 'ascending' ? 'asc':'desc'
      this.onClickQuery()
    },
    handleCommand(command){
    	this.loading2=true
					this.fullscreenLoading=true
      if(command === 'current'){
        expCurrentSynergisticRecord(this.queryForm).then(res => {
          this.$message('导出成功')
          this.loading2=false
					this.fullscreenLoading=false
        })
      }else {
        expAllSynergisticRecord(this.queryForm).then(res => {
          this.$message('导出成功')
          this.loading2=false
					this.fullscreenLoading=false
        })
      }
      this.dialogExportVisible = false
    },
  }
}
</script>

<style lang="scss">
#synergistic-record{
	
}
</style>


