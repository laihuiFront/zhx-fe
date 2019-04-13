<template>
  <div id="synergistic-repayment-record" class="page-wraper-sub"
  		v-loading="loading2"
  	  v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
   element-loading-background="rgba(0, 0, 0, 0.7)">
    <el-tabs v-model="queryForm.recordStatus" @tab-click="onClickQuery">
      <el-tab-pane label="还款记录" name="0"></el-tab-pane>
      <el-tab-pane label="已撤销" name="1"></el-tab-pane>
    </el-tabs>
    <repay-record-query 
      @reset="onClickReset"
      @query="onClickQuery"
      :queryForm="queryForm">
      <el-button type="primary" v-if="queryForm.recordStatus==='0'" @click="onClickAdd" v-has="'新建还款记录'">新建还款记录</el-button>
      <el-button type="primary" v-if="queryForm.recordStatus==='0'" @click="onClickBatchRevoke" v-has="'撤销还款'">撤销还款</el-button>
      <el-upload
        class="upload-demo upload-btn"
        :action="action+'/repayRecord/import'"
        :headers="header"
        :show-file-list="false"
        :on-success="uploadSuccess"
        :on-progress="onProgress"
        style="display:inline-block;margin-left:10px;"
        >
        <el-button type="primary" v-if="queryForm.recordStatus==='0'" style="margin-right:24px;" v-has="'导入还款记录'">导入还款记录</el-button>
      </el-upload>
      <el-button type="primary" @click="onClickExportSelectedRecord" style="display:inline-block;margin-left:-14px;" v-has="'导出选中数据'">导出选中数据</el-button>
      <el-button type="primary" @click="handleCommand('all')" v-has="'导出查询结果'">导出查询结果</el-button>
    </repay-record-query>
    <div class="statistics-wrap" v-if="queryForm.recordStatus==='0'">
      <span class="title">查询结果统计：</span>
      <span class="item" style="margin-right:0px;">总还款额：{{sumForm.repayMoneyMsg?sumForm.repayMoneyMsg:0}}，</span>
      <span class="item" style="margin-right:0px;">总提成值：{{sumForm.dataCase.mVal?parseFloat(sumForm.dataCase.mVal).toFixed(2):0}}，</span>
      <span class="item" style="margin-right:0px;">总佣金额：{{sumForm.dataCase.commissionMoneyMsg?sumForm.dataCase.commissionMoneyMsg:0}}</span>
    </div>
      <el-table highlight-current-row v-loading="tableLoad"
      @selection-change="onSelectRow"
      @sort-change="handleSort"
      border
      stripe
      :data="recordList"
      height="1"
      style="width: 100%;min-height: 400px;margin-bottom: 40px;"
      class="table-wrap">
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column width="120"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="dataCase.batchNo" label="批次号" show-overflow-tooltip></el-table-column>
      <el-table-column width="160" sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="dataCase.cardNo" label="卡号" show-overflow-tooltip></el-table-column>
      <el-table-column width="160"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="dataCase.identNo" label="证件号" show-overflow-tooltip></el-table-column>
      <el-table-column width="120"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="dataCase.name" label="姓名" show-overflow-tooltip></el-table-column>
      <el-table-column min-width="160"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="dataCase.seqNo" label="个案序列号" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editCase(scope.row.dataCase.id, scope.row.dataCase.name,scope.row.dataCase.seqNo)">{{scope.row.dataCase.seqNo}}</el-button>
        </template>
      </el-table-column>
      <el-table-column width="120"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="dataCase.client" label="委托方" show-overflow-tooltip></el-table-column>
      <el-table-column width="120"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="dataCase.overdueBillTime" label="账龄" show-overflow-tooltip></el-table-column>
      <el-table-column width="120"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="dataCase.moneyMsg" label="委案金额" show-overflow-tooltip></el-table-column>
      <el-table-column width="140"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="bankReconciliation.cpMoneyMsg" label="待银行查账金额" show-overflow-tooltip></el-table-column>
      <el-table-column width="140"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="bankReconciliation.cpDate" label="待银行查账日期" show-overflow-tooltip></el-table-column>
      <el-table-column width="120"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="collectUser.userName" label="回收催收员" show-overflow-tooltip></el-table-column>
      <el-table-column width="120"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="repayMoneyMsg" label="还款金额" show-overflow-tooltip></el-table-column>
      <el-table-column width="120"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="dataCase.balanceMsg" label="余额" show-overflow-tooltip></el-table-column>
      <el-table-column width="120"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="repayDate" label="还款日期" show-overflow-tooltip></el-table-column>
      <el-table-column width="120"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="repayUser" label="还款人" show-overflow-tooltip></el-table-column>
      <el-table-column width="130"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="repayType.name" label="还款方式" show-overflow-tooltip></el-table-column>
      <el-table-column width="120"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="confirmUser.userName" label="确认人" show-overflow-tooltip></el-table-column>
      <el-table-column width="130"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="confirmTime" label="确认时间" show-overflow-tooltip></el-table-column>
      <el-table-column min-width="150"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="remark" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column width="120"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="dataCase.mVal" label="提成值" show-overflow-tooltip></el-table-column>
      <el-table-column width="130"  sortable="custom" align="center" :sort-orders="['ascending','descending']" prop="dataCase.commissionMoneyMsg" label="公司佣金" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="100"  v-if="queryForm.recordStatus==='0'"  align="center">
        <template slot-scope="scope">
          <el-button
            v-has="'撤销还款'"
            type="text"
            @click="onClickRevoke(scope.row)"
          >撤销还款</el-button>
        </template>
      </el-table-column>
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
      :title="dialogData.title"
      class="dialog-wrap"
      :visible.sync="dialogData.editVisible"
      :close-on-click-modal="false"
      width="50%"
    >
      <el-form
        :model="recordInfo"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="add-form"
      >
        <el-form-item label="个案案序列号" prop="dyga">
          <el-select
            v-model="recordInfo.dataCase.id"
            filterable
            remote
            @change="selectCase"
            placeholder="请选择个案序列号"
            :remote-method="seqNoQuery"
            :loading="loadingSeqNo">
            <el-option
              v-for="item in seqNoList"
              :key="item.id"
              :label="item.seqNo"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="回收催收员" prop="dyga">
          <el-select v-model="recordInfo.collectUser.id" filterable clearable placeholder="请选择回收催收员">
            <el-option
              v-for="item in collectionUserList"
              :key="item.id"
              :label="item.userName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="还款日期" prop="dyga">
          <el-date-picker
            clearable
            v-model="recordInfo.repayDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择还款日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="确认还款金额" prop="dyga">
          <el-input v-model="recordInfo.repayMoney" clearable placeholder="确认还款金额"></el-input>
        </el-form-item>
        <el-form-item label="还款人" prop="dyga">
           <el-input v-model="recordInfo.repayUser" clearable placeholder="请输入还款人"></el-input>
        </el-form-item>
        <el-form-item label="还款方式" prop="dyga">
          <el-select v-model="recordInfo.repayType.id" clearable placeholder="请选择还款方式">
            <el-option
              v-for="item in payMethod"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="还款备注" prop="dyga" class="whole">
          <el-select v-model="recordInfo.remark" clearable placeholder="请选择还款备注">
            <el-option
              v-for="item in payRemark"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="footer">
        <el-button @click="onClickCancel">取 消</el-button>
        <el-button type="primary" @click="onClickSave">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="导出查询结果"
      :visible.sync="dialogExportVisible"
      width="30%"
      center
    >
      <el-form :inline="true">
        <el-form-item>
          <el-radio label="1" v-model="radio" @click="handleCommand('all')">按查询条件全部导出</el-radio>
        </el-form-item>
        <el-form-item>
          <el-radio label="2" v-model="radio" @click="handleCommand('current')">按查询条件导出当前分页</el-radio>
        </el-form-item>
       
      </el-form>
       <span slot="footer" class="dialog-footer">
          <el-button @click="dialogExportVisible = false">取 消</el-button>
                        <el-button type="primary" @click="changeRadio">确 定</el-button>  
        </span>
    </el-dialog>

    <el-dialog
      title="导出选择"
      :visible.sync="showExportConfVisible"
      width="60%"
      center
    >
      <div style="margin-bottom: 10px;"><span @click="selectAllExport" style="cursor: pointer;">全选</span></div>
      <el-row class="pad" ref="boxWrapper">
        <el-checkbox v-model="exportConf.id" label="2">ID</el-checkbox>
        <el-checkbox v-model="exportConf.batchNo" label="3">批次号</el-checkbox>
        <el-checkbox v-model="exportConf.cardNo" label="3">卡号</el-checkbox>
        <el-checkbox v-model="exportConf.identNo" label="3">证件号</el-checkbox>
        <el-checkbox v-model="exportConf.name" label="1">姓名</el-checkbox>
        <el-checkbox v-model="exportConf.seqNo" label="1">个案序列号</el-checkbox>
        <el-checkbox v-model="exportConf.client" label="4">委托方</el-checkbox>
        <el-checkbox v-model="exportConf.money" label="5">委案金额</el-checkbox>
        <el-checkbox v-model="exportConf.balance" label="2">当前委案余额</el-checkbox>
        <el-checkbox v-model="exportConf.account" label="4">账号</el-checkbox>
        <el-checkbox v-model="exportConf.archiveNo" label="5">档案号</el-checkbox>
        <el-checkbox v-model="exportConf.applyOrderNo" label="5">申请单号</el-checkbox>
        <el-checkbox v-model="exportConf.cpMoney" label="5">CP金额</el-checkbox>
        <el-checkbox v-model="exportConf.cpDate" label="5">CP日期</el-checkbox>
        <el-checkbox v-model="exportConf.caseOdv" label="5">案件催收员</el-checkbox>
        <el-checkbox v-model="exportConf.backOdv" label="5">回收催收员</el-checkbox>
        <el-checkbox v-model="exportConf.backDept" label="5">回收部门</el-checkbox>
        <el-checkbox v-model="exportConf.submitUser" label="5">提交人</el-checkbox>
        <el-checkbox v-model="exportConf.submitTime" label="5">提交时间</el-checkbox>
        <el-checkbox v-model="exportConf.enRepayAmt" label="5">还款金额</el-checkbox>
        <el-checkbox v-model="exportConf.repayDate" label="5">还款日期</el-checkbox>
        <el-checkbox v-model="exportConf.repayBalance" label="5">还款余额</el-checkbox>
        <el-checkbox v-model="exportConf.mMoney" label="5">M值金额</el-checkbox>
        <el-checkbox v-model="exportConf.mVal" label="5">M值系数</el-checkbox>
        <el-checkbox v-model="exportConf.repayUser" label="5">还款人</el-checkbox>
        <el-checkbox v-model="exportConf.repayType" label="5">还款方式</el-checkbox>
        <el-checkbox v-model="exportConf.confirmUser" label="5">确认人</el-checkbox>
        <el-checkbox v-model="exportConf.ConfirmTime" label="5">确认时间</el-checkbox>
        <el-checkbox v-model="exportConf.repayRemark" label="5">还款备注</el-checkbox>
        <el-checkbox v-model="exportConf.accountAge" label="5">逾期账龄</el-checkbox>
        <el-checkbox v-model="exportConf.overduePeriods" label="5">逾期期数</el-checkbox>
        <el-checkbox v-model="exportConf.overdueDate" label="5">逾期日期</el-checkbox>
        <el-checkbox v-model="exportConf.overdueDays" label="5">逾期天数</el-checkbox>
        <el-checkbox v-model="exportConf.caseDate" label="5">委案日期</el-checkbox>
        <el-checkbox v-model="exportConf.expectTime" label="5">预计退案日</el-checkbox>
        <el-checkbox v-model="exportConf.province" label="5">省份</el-checkbox>
        <el-checkbox v-model="exportConf.city" label="5">城市</el-checkbox>
        <el-checkbox v-model="exportConf.county" label="5">区县</el-checkbox>
        <el-checkbox v-model="exportConf.tel" label="5">手机</el-checkbox>
        <el-checkbox v-model="exportConf.currencyType" label="5">币种</el-checkbox>
        <el-checkbox v-model="exportConf.distributeHistory" label="5">分配历史</el-checkbox>
        <el-checkbox v-model="exportConf.defaultLevel" label="5">拖欠级别</el-checkbox>
        <el-checkbox v-model="exportConf.latestOverdueMoney" label="5">案件最新欠款</el-checkbox>
        <el-checkbox v-model="exportConf.inteviewStatus" label="5">外访状态</el-checkbox>
        <el-checkbox v-model="exportConf.commissionMoney" label="5">公司佣金</el-checkbox>
        <el-checkbox v-model="exportConf.commissionRate" label="5">公司佣金比率</el-checkbox>
        <el-checkbox v-model="exportConf.caseRemarks0" label="5">案件备注1</el-checkbox>
        <el-checkbox v-model="exportConf.caseRemarks1" label="5">案件备注2</el-checkbox>
        <el-checkbox v-model="exportConf.caseRemarks2" label="5">案件备注3</el-checkbox>
        <el-checkbox v-model="exportConf.caseRemarks3" label="5">案件备注4</el-checkbox>
        <el-checkbox v-model="exportConf.caseRemarks4" label="5">案件备注5</el-checkbox>
        <el-checkbox v-model="exportConf.caseRemarks5" label="5">案件备注6</el-checkbox>
        <el-checkbox v-model="exportConf.collectionArea" label="5">催收区域</el-checkbox>
      </el-row>
      <span slot="footer" class="footer">
        <el-button @click="showExportConfVisible = false">取 消</el-button>
        <el-button type="primary" @click="exportExcel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {baseURL} from '@/common/js/request.js';
import {RepayRecordQuery} from './components'
import {getRepayRecordList, 
        getRepayRecordQuerySum,
        getCollectionUserList, 
        saveRepayRecord,
        getEnum,
        saveSelectFilter,
        selectByModule,
        revokeRepayRecord,
        expSelectedRepayRecord,
        expAllRepayRecord,
        expCurrentRepayRecord,
        getSeqNoList,
        getRepayTypeList} from '@/common/js/api-sync'
export default {
  name: 'synergisticRepaymentRecord',
  components:{
    RepayRecordQuery
  },
  data(){
    return {
    	radio:"1",
    	loading2:false,
    	fullscreenLoading:false,
      dialogExportVisible:false,
      showExportConfVisible: false,
      exportType:0,
      exportConf:{},
      tableLoad:false,
      action:baseURL,
      header:{Authorization:localStorage.token},
      sumForm:{dataCase:{}},
      recordList: [],
      payMethod:[],
      payRemark:[],
      collectionUserList: [],
      total:0,
      dialogData:{
        title:'新建还款记录',
        editVisible: false
      },
      rules: {

      },
      recordInfo:{
        dataCase:{id:null},
        collectUser:{id:null},
        repayType:{id:null}
      },
      queryForm:{
        recordStatus: '0',
        pageNum: 1,
        pageSize: 100,
        dataCase: {
          collectionArea:{},
          collectionUser:{},
          caseArea:{},
        },
        confirmUser:{}
      },
      loadingSeqNo: false,
      seqNoList: [],
      selectList:[],
      repayTypeList:[]
    }
  },
  created() {
    this.tableLoad = true
    getEnum('还款方式').then(data => {
      this.payMethod = data
    })
    getEnum('还款备注').then(data => {
      this.payRemark = data
    })
    getRepayRecordList(this.queryForm).then(data => {
      this.recordList = data.list
      this.total = data.total
      this.tableLoad = false
    })
    getRepayRecordQuerySum(this.queryForm).then(data=>{
      this.sumForm = data
    })
    getCollectionUserList().then(data => {
      this.collectionUserList = data
    })
    getRepayTypeList().then(data=>{
      this.repayTypeList = data
    })

    this.seqNoQuery()
  },
  methods: {
    selectCase(){
      let id = this.recordInfo.dataCase.id;
      for(var i=0;i<this.seqNoList.length;i++){
        if (this.seqNoList[i].id == id && this.seqNoList[i].odv!=null && this.seqNoList[i].odv!=""){
          this.recordInfo.collectUser.id = parseInt(this.seqNoList[i].odv);
          break;
        }
      }

    },
  	changeRadio(){
  			if(this.radio==1){
			this.handleCommand('all')
		}else{
			this.handleCommand('current')
		}
  	},
    onProgress(){
      this.loading2=true
      this.fullscreenLoading=true
    },
    uploadSuccess(res,file,fileList){
      if (res.code ==100){
  		    this.$message({
            type: 'success',
            message: "导入成功"
          });
           this.onClickQuery()
            this.loading2=false
					this.fullscreenLoading=false
      }else{
        this.$message({
          type: 'error',
          message: res.msg
        });
        this.loading2=false
        this.fullscreenLoading=false
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
        recordStatus: this.queryForm.recordStatus,
        pageNum: this.queryForm.pageNum,
        pageSize: this.queryForm.pageSize,
        dataCase: {
          collectionArea:{id: null},
          collectionUser:{id: null},
          caseArea:{id: null},
        },
        confirmUser:{name: null}
      }
    },
    handleSort({column,prop,order}){
      // console.log(prop,'@',order)
      this.queryForm.orderBy = prop
      this.queryForm.sort = order === 'ascending' ? 'asc':'desc'
      this.onClickQuery()
    },
    onClickQuery(){
      this.tableLoad  = true
      this.recordList = []
      getRepayRecordList(this.queryForm).then(data => {
        this.recordList = data.list
        this.total = data.total
        this.tableLoad = false
      })
      getRepayRecordQuerySum(this.queryForm).then(data=>{
        this.sumForm = data
      })
    },
    onClickAdd(){
      this.recordInfo = {
        dataCase:{id:null},
        collectUser:{id:null},
        repayType:{id:null}
      }
      this.seqNoQuery("")
      this.$set(this.dialogData, 'editVisible', true)
    },
    onClickBatchRevoke(){
      if(!this.selectList.length){
        this.$message('请选择需要撤销的还款记录')
        return
      }
      this.$confirm('此操作将撤销还款记录，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = this.selectList.map(item => item.id)
        revokeRepayRecord(ids).then(() => {
          this.$message('还款记录撤销成功')
          this.onClickQuery()
        })
      }).catch(() => { })
    },
    onClickRevoke(record){
      this.$confirm('此操作将撤销该还款记录，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        revokeRepayRecord([record.id]).then(() => {
          this.$message('还款记录撤销成功')
          this.onClickQuery()
        })
      }).catch(() => { })
    },
    saveExportRepayConf() {
      let queryObj = {module: "data-repay-record-exportRepay", menu: this.exportConf}
      saveSelectFilter(queryObj).then(data => {
      });
    },
    queryExportRepayConfList() {
      let queryObj = {module: "data-repay-record-exportRepay", menu: this.exportConf}
      selectByModule(queryObj).then(data => {
        if (data) {
          this.exportConf = JSON.parse(data.menu);
        }
      });
    },
    selectAllExport(){
      this._selectAllInit('exportConf');
      for(var p in this.exportConf){//遍历json对象的每个key/value对,p为key
        this.exportConf[p] = true;
      }
    },
    exportExcel(){
      let successNum =0;
      for(var p in this.exportConf){//遍历json对象的每个key/value对,p为key
        if (this.exportConf[p]){
          successNum = successNum+1;
        }
      }
      if (successNum==0){
        this.$message({
          type: 'error',
          message: '请先选择导出项!'
        });
        this.fullscreenLoading = false
        this.loading2 = false
        return ;
      }
       if (this.exportType==1){
         if(!this.selectList.length){
           this.$message('请选择需要导出的记录')
           return
         }
         this.loading2=true
         this.fullscreenLoading=true
         const ids = this.selectList.map(item => item.id)
         expSelectedRepayRecord(ids,this.exportConf).then(() => {
           this.$message('导出成功')
           this.loading2=false
           this.fullscreenLoading=false

         }).catch(() => { })
       }else if (this.exportType ==2){
         this.loading2=true
         this.fullscreenLoading=true
         this.queryForm.exportConf = this.exportConf
         expCurrentRepayRecord(this.queryForm).then(res => {
           this.$message('导出成功')
           this.loading2=false
           this.fullscreenLoading=false
         })
       }else if (this.exportType==3){
         this.loading2=true
         this.fullscreenLoading=true
         this.queryForm.exportConf = this.exportConf
         expAllRepayRecord(this.queryForm).then(res => {
           this.$message('导出成功')
           this.loading2=false
           this.fullscreenLoading=false
         })
       }
       this.saveExportRepayConf();
      this.showExportConfVisible = false;
    },
    onClickExportSelectedRecord(){
      if(!this.selectList.length){
        this.$message('请选择需要导出的记录')
        return
      }
      this.queryExportRepayConfList();
      this.showExportConfVisible = true;
      this.exportType = 1;
    },
    handleCommand(command){
      this.queryExportRepayConfList();
      this.showExportConfVisible = true;
      if(command === 'current'){
        this.exportType = 2;

      }else {
        this.exportType = 3;

      }
      this.dialogExportVisible = false
    },
    onSelectRow(val){
      this.selectList = val
    },
    onClickCancel(){
      this.$set(this.dialogData, 'editVisible', false)
    },
    onClickSave(){
      saveRepayRecord(this.recordInfo).then(data => {
        this.$message('新增还款记录成功')
        this.onClickQuery()
        this.$set(this.dialogData, 'editVisible', false)
      })
    },
    seqNoQuery(query){
      this.loadingSeqNo = true
      getSeqNoList({
        seqNo: query,
        pageNum: 1,
        pageSize:10000
      }).then(data => {
        this.seqNoList = data.list
        this.loadingSeqNo = false
      })
    }
  }
}
</script>

<style lang="scss">
#synergistic-repayment-record{
  .pad {
    .el-checkbox {
      width: 24%;
      margin-right: 0px;
    }
  }
  .el-tabs__content{

    overflow-y: auto;
  }
  .pagination-wrap{
    position: fixed;
    bottom: 0;
    z-index: 100;
    min-height: 40px;
    background-color: white;
    width: 100%;
  }
  .statistics-wrap{
    margin: 12px 0 24px;
  }
  .item{
    margin-right: 12px;
    display: inline-block;
    color: #66b1ff;
  }
  .add-form {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      display: flex;
      width: 50%;
      &.whole{
        width: 100%;
      }
      .el-form-item__content {
        flex: 1;
        margin-left: 0 !important;
        .el-select {
          width: 100%;
        }
        .el-date-editor{
          width: 100%;
        }
      }
    }
  }
    .el-loading-spinner .el-loading-text {
    font-size: 18px;
    }
}
</style>


