<template>
  <div id="data-memorize-manage"
  	v-loading="loading"	 
  	element-loading-text="拼命加载中"
  	  	  v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    class="page-wraper-sub">
    <el-form id="repay-record-query" :model="formInline" :inline="true" class="query-wrap">
      <el-form-item  v-if="queryConf.csqy || queryConfFlag">
        <el-select v-model="formInline.area" placeholder="请选择催收区域" clearable>
          <el-option
            v-for="item in areaList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item  v-if="queryConf.bm || queryConfFlag">
        <el-select v-model="formInline.dept" placeholder="部门" clearable>
          <el-option
            v-for="item in departmentList"
            :key="item.id"
            :label="item.orgName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="queryConf.csy || queryConfFlag">
        <el-select v-model="formInline.odvs" filterable collapse-tags multiple  placeholder="请选择催收员" clearable>
          <el-option
            v-for="item in PersonList"
            :key="item.id"
            :label="item.userName"
            :value="item.id">
          </el-option>
        </el-select>   </el-form-item>
      <el-form-item v-if="queryConf.cscs || queryConfFlag">
        <el-select v-model="formInline.measure"  placeholder="催收措施" clearable>
          <el-option
            v-for="item in sectionList"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="queryConf.pch || queryConfFlag">
              <el-input v-model="formInline.batchNo"  placeholder="请输入批次号"></el-input>
      </el-form-item>
        <el-form-item v-if="queryConf.zjh || queryConfFlag">
              <el-input v-model="formInline.identNo"  placeholder="请输入证件号"></el-input>
        </el-form-item>
          <el-form-item v-if="queryConf.kh || queryConfFlag">
              <el-input v-model="formInline.cardNo"  placeholder="请输入卡号"></el-input>
          </el-form-item>
            <el-form-item v-if="queryConf.csjl || queryConfFlag">
              <el-input v-model="formInline.collectInfo"  placeholder="请输入催收记录"></el-input>
            </el-form-item>
            <el-form-item v-if="queryConf.gaxlh || queryConfFlag">
              <el-input v-model="formInline.seqno"  placeholder="请输入个案序列号"></el-input>
            </el-form-item>
            <el-form-item v-if="queryConf.csjg || queryConfFlag">
              <el-select v-model="formInline.result"  placeholder="请选择催收结果" clearable>
                <el-option
                  v-for="item in EndList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="queryConf.wtf || queryConfFlag">
              <el-select v-model="formInline.clients" collapse-tags   filterable multiple placeholder="请选择委托方" clearable>
                <el-option
                  v-for="item in clientList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item v-if="queryConf.ajzt || queryConfFlag">
              <el-select v-model="formInline.caseStatus" filterable  placeholder="请选择案件状态" clearable>
                <el-option
                  v-for="item in caseStatusList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="queryConf.bszt || queryConfFlag">
              <el-select v-model="formInline.color" filterable   placeholder="请选择标色状态" clearable>
                <el-option
                  v-for="item in val14_data"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
           <el-form-item v-if="queryConf.csrq || queryConfFlag">
              <el-date-picker
                  v-model="formInline.collectTime"
                  type="daterange"
                  align="right"
                  value-format="yyyy-MM-dd"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="催收开始日期"
                  end-placeholder="催收结束日期"
                >
                </el-date-picker>
           </el-form-item>
            <el-form-item v-if="queryConf.warq || queryConfFlag">
              <el-date-picker
                v-model="formInline.bailTime"
                type="daterange"
                align="right"
                value-format="yyyy-MM-dd"
                unlink-panels
                range-separator="至"
                start-placeholder="委案开始日期"
                end-placeholder="委案结束日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item v-if="queryConf.yjtarq || queryConfFlag">
              <el-date-picker
                  v-model="formInline.expectTime"
                  type="daterange"
                  align="right"
                  value-format="yyyy-MM-dd"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="预计退案开始日期"
                  end-placeholder="预计退案结束日期"
                >
                </el-date-picker>
          </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        <el-button type="primary" icon="el-icon-refresh" @click="resetForm">重置</el-button>
        <el-button type="primary" @click="showQueryConf">查询条件配置</el-button>
        <el-button type="primary" @click="open7" v-has="'删除催记'">删除催记</el-button>
        <el-button type="primary" @click="selectDataCollectExport" v-has="'导出所选借改'">导出所选催记</el-button>
        <el-button type="primary" @click="dialogVisible2 = true" v-has="'导出查询结果'">导出查询结果</el-button>
      </el-form-item>

    </el-form>
     <el-table highlight-current-row height="1"
      v-loading="tableLoad"
      class="table-wrap"
      :data="tableData3"
      border
      stripe
      tooltip-effect="dark"
      @row-dblclick="showCase"
      style="width: 100%;margin-bottom: 40px;"
      @sort-change="handleSort"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        align="center"
        width="55">
      </el-table-column>
      <el-table-column
        sortable="custom"
        align="center"
        :sort-orders="['ascending','descending']"
        prop="id"
        label="ID"
      >
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column
        prop="seqno"
        sortable="custom"
        align="center"
        min-width="120"
        :sort-orders="['ascending','descending']"
        label="个案序列号"
      >
        <template slot-scope="scope">
          <el-button
            style="text-decoration: underline"
            type="text"
            size="small"
            @click="showCase(scope.row)"
          >{{ scope.row.seqno }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        sortable="custom"
        align="center"
        :sort-orders="['ascending','descending']"
        label="姓名"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="measure"
        sortable="custom"
        min-width="120"
        align="center"
        :sort-orders="['ascending','descending']"
        label="催收措施"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="collectTime"
        label="催收时间"
        width="140"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="targetName"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        min-width="120"
        align="center"
        label="对象姓名"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="relation"
        label="与案人关系"
        min-width="120"
        align="center"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="telType"
        label="电话类型"
        align="center"
        min-width="120"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="mobile"
        width="120"
        align="center"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        label="电话号码"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="collectInfo"
        label="催收记录"
        min-width="120"
        align="center"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column><el-table-column
      prop="result"
      label="催收结果"
      min-width="160"
      align="center"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip>
    </el-table-column><el-table-column
      prop="methodMsg"
      label="谈判方式"
      min-width="120"
      align="center"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip>
    </el-table-column><el-table-column
      prop="repayTime"
      label="承诺还款日期"
      width="180"
      align="center"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip>
    </el-table-column><el-table-column
      label="承诺还款金额"
      width="160"
      align="center"
      prop="repayAmtMsg"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip>
      <template slot-scope="scope">
        {{scope.row.repayAmtMsg}}
      </template>
    </el-table-column><el-table-column
      label="减免金额"
      width="160"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      align="center"
      prop="reduceAmtMsg"
      show-overflow-tooltip>
      <template slot-scope="scope">
        {{scope.row.reduceAmtMsg}}
      </template>
    </el-table-column><el-table-column
      prop="reduceStatusMsg"
      label="减免状态"
      sortable="custom"
      min-width="130"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip>
    </el-table-column><el-table-column
      prop="odv"
      label="催收员"
      sortable="custom"
      min-width="130"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip>
    </el-table-column><el-table-column
      prop="collectStatusMsg"
      label="催收状态"
      min-width="130"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip>
    </el-table-column>
      <el-table-column
        label="操作"
        width="120"
        align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editMessage(scope.row)" v-has="'编辑'">编辑</el-button>
          <el-button type="text" size="small" @click="deleteMessage(scope.row.id)" v-has="'删除催记'">删除</el-button>
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
    <div class="block">
    </div>
    <el-dialog
      title="编辑催记记录"
      class="dialog-wrap"
      :visible.sync="dialogVisible1"
      :close-on-click-modal="false"
      width="50%"
    >
      <el-form
        :model="recordInfo"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="通话时间" prop="createTime">
          <el-date-picker
            v-model="recordInfo.collectTime"
            value-format="yyyy-MM-dd HH:mm"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="通话结果" prop="result">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="recordInfo.collectInfo">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="footer">
        <el-button @click="onClickCancel">取 消</el-button>
        <el-button type="primary" @click="onClickSave">保 存</el-button>
      </span>
    </el-dialog>


    <el-dialog
      title="导出查询结果"
      :visible.sync="dialogVisible2"
      width="30%"
      center
    >
      <el-form :inline="true">
        <el-form-item>
          <el-radio v-model="radio" label="1" >按查询条件全部导出</el-radio>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="radio" label="2" >按查询条件导出当前分页</el-radio>
        </el-form-item>

      </el-form>
       <span slot="footer" class="footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="changeRadio">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog
      title="查询条件配置"
      :visible.sync="showQueryConfVisible"
      width="60%"
      center
    >
      <el-row class="pad">

        <el-checkbox v-model="queryConf.csqy" label="1" >催收区域</el-checkbox>
        <el-checkbox v-model="queryConf.bm" label="2" >部门</el-checkbox>
        <el-checkbox v-model="queryConf.csy" label="3" >催收员</el-checkbox>
        <el-checkbox v-model="queryConf.cscs" label="4" >催收措施</el-checkbox>
        <el-checkbox v-model="queryConf.pch" label="5" >批次号</el-checkbox>

        <el-checkbox v-model="queryConf.zjh" label="2" >证件号</el-checkbox>
        <el-checkbox v-model="queryConf.kh" label="3" >卡号</el-checkbox>
        <el-checkbox v-model="queryConf.csjl" label="4" >催收记录</el-checkbox>
        <el-checkbox v-model="queryConf.gaxlh" label="5" >个案序列号</el-checkbox>

        <el-checkbox v-model="queryConf.csjg" label="1" >催收结果</el-checkbox>
        <el-checkbox v-model="queryConf.wtf" label="2" >委托方</el-checkbox>
        <el-checkbox v-model="queryConf.ajzt" label="4" >案件状态</el-checkbox>
        <el-checkbox v-model="queryConf.bszt" label="5" >标色状态</el-checkbox>

        <el-checkbox v-model="queryConf.csrq" label="1" >催收日期</el-checkbox>
        <el-checkbox v-model="queryConf.wtrq" label="2" >委托日期</el-checkbox>
        <el-checkbox v-model="queryConf.yjtarq" label="3" >预计退案日期</el-checkbox>

      </el-row>
      <span slot="footer" class="footer">
        <el-button @click="showQueryConfVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveConf">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {search,dataList,areaList,saveSelectFilter, selectByModule,pageDataExport,selectDataExport,totalDataExport,remoweData,caseTypeList,clientList,EndList,PersonList,departmentList,deleteDataCollectRecord,updateDataCollectRecord} from '@/common/js/data-memorize-manage.js'
  export default {
    name: 'dataMemorizeManage',
    data(){
      return {
      	radio:"1",
        tableHeight:50,
        tableLoad:false,
        images:{background: "url(" + require("./down.png") + ") repeat-x",padding:"8px 5px 3px 6px",},
        loading:false,
        caseStatusList:[{name:"未退案",id:0},{name:"正常",id:1},{name:"暂停",id:2},{name:"关档",id:3},{name:"退档",id:4},{name:"全部",id:5}],
        val14_data: [
          {
            label:'正常',
            value:'黑'
          },
          {
            label:'红色',
            value:'红'
          },
          {
            label:'蓝色',
            value:'蓝'
          },
          {
            label:'橙色',
            value:'橙'
          },
          {
            label:'紫色',
            value:'紫'
          },
          {
            label:'棕色',
            value:'棕'
          },
        ],
        fullscreenLoading:false,
        EndList:[],
        showQueryConfVisible:false,
        queryConf:{},
        queryConfFlag:true,
        selectDataCollectExportList:[],
        departmentList:[],
        PersonList:[],
        clientList:[],
        caseTypeList:[],
        sectionList:[{id:1,name:"电话催收"},{id:2,name:"信函"},{id:3,name:"辅助渠道"}],
        pageSize:100,
        pageNum:1,
        orderBy:"id",
        sort:"desc",
        deleteList:[],
        areaList:[],
        dynamicValidateForm:{},
        dialogVisible:false,
        dialogVisible1:false,
        dialogVisible2:false,
        recordInfo:{},
        tableData3:[],
        currentPage4: 1,
        pages:1,
        total:0,
        form:{PersonList:[]},
        formInline:{
        	odvs:[],
        	clients:[],
          collectTime:[],
          expectTime:[],
          bailTime:[]
        },
      }
    },
    methods: {
      saveConf(){
        this.showQueryConfVisible = false;
        let queryObj = {module:"data-memorize-manage",menu:this.queryConf}
        saveSelectFilter(queryObj).then(data => {
          this.$message({
            message: "配置成功",
            type: "success"
          });
          this.queryConfList();
        });
      },
      queryConfList(){

        let queryObj = {module:"data-memorize-manage",menu:this.queryConf}
        selectByModule(queryObj).then(data => {
          if (data){
            this.queryConf = JSON.parse(data.menu);
            this.queryConfFlag = false;
          }else{
            this.queryConfFlag = true;
          }
        });
      },
      showQueryConf(){
        this.showQueryConfVisible = true;
      },
    	 	changeRadio(){
		if(this.radio==1){
			this.totalDataCollectExport()
		}else{
			this.pageDataCollectExport()
		}
	},
      showCase(row){
        let id = row.caseId
        let name = row.name
        let seqNo = row.seqno
        this.$router.push({
          path:'case-detail',
          query:{
            id,
            name,
            seqNo
          }
        })
      },
      editMessage(record){
        this.recordInfo = {
          id: record.id,
          collectInfo: record.collectInfo,
          collectTime: record.collectTime
        }
        this.dialogVisible1 = true
      },
      onClickCancel(){
        this.dialogVisible1 = false
      },
      onClickSave(){
        updateDataCollectRecord(this.recordInfo).then(res=>{
          this.$message({
            type: 'success',
            message: '修改记录成功成功!'
          });
          this.search()
          this.dialogVisible1 = false
        })
      },
      deleteMessage(id){
        this.$confirm('此操作将永久删除改记录,是否继续', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteDataCollectRecord([{id}]).then(res=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.search()
          })
        }).catch(() => {
        });
      },
      selectDataCollectExport(){
        this.loading=true
        		this.fullscreenLoading=true
        if(this.selectDataCollectExportList.length>=1) {
          selectDataExport(this.selectDataCollectExportList).then((response) => {
            this.loading = false;
            		this.fullscreenLoading=false
            this.$message({
              type: 'success',
              message: '导出成功!'
            });
          })
        }else{
          this.loading = false;
          		this.fullscreenLoading=false
          this.$message({
            type: 'info',
            message: '请选择数据!'
          });
        }
      },
      totalDataCollectExport(){
        this.loading=true;
        		this.fullscreenLoading=true

        let bailStartDate=this.formInline.bailTime[0]
        let bailEndDate=this.formInline.bailTime[1]
        let expectStartTime=this.formInline.expectTime[0]
        let expectEndTime=this.formInline.expectTime[1]
        let collectStartTime=this.formInline.collectTime[0]
        let collectEndTime=this.formInline.collectTime[1]
        totalDataExport(this.formInline.area,this.formInline.dept,this.formInline.batchNo,this.formInline.clients,this.formInline.odvs,this.formInline.caseStatus,this.formInline.measure,this.formInline.result,this.formInline.identNo,this.formInline.cardNo,this.formInline.collectInfo,this.formInline.color,this.formInline.seqno,this.formInline.bailStartDate,this.formInline.bailEndDate,this.formInline.expectStartTime,this.formInline.expectEndTime,this.formInline.collectStartTime,this.formInline.collectEndTime,this.orderBy,this.sort,this.pageSize,this.pageNum).then((response)=>{
          this.loading=false;
          		this.fullscreenLoading=false

          this.$message({
            type: 'success',
            message: '导出成功!'
          });
        })
      },
      pageDataCollectExport(){
        this.loading=true;
        		this.fullscreenLoading=true
        let bailStartDate=this.formInline.bailTime[0]
        let bailEndDate=this.formInline.bailTime[1]
        let expectStartTime=this.formInline.expectTime[0]
        let expectEndTime=this.formInline.expectTime[1]
        let collectStartTime=this.formInline.collectTime[0]
        let collectEndTime=this.formInline.collectTime[1]
        pageDataExport(this.formInline.area,this.formInline.dept,this.formInline.batchNo,this.formInline.clients,this.formInline.odvs,this.formInline.caseStatus,this.formInline.measure,this.formInline.result,this.formInline.identNo,this.formInline.cardNo,this.formInline.collectInfo,this.formInline.color,this.formInline.seqno,this.formInline.bailStartDate,this.formInline.bailEndDate,this.formInline.expectStartTime,this.formInline.expectEndTime,this.formInline.collectStartTime,this.formInline.collectEndTime,this.orderBy,this.sort,this.pageSize,this.pageNum).then((response)=>{
          this.loading=false;
          		this.fullscreenLoading=false

          this.$message({
            type: 'success',
            message: '导出成功!'
          });
        })
      },
      handleSort( {column,prop,order}){
        this.sort = order==null?"desc":order.replace("ending","")
        this.orderBy = prop==null?"id":prop
        this.tableLoad = true
        search(this.formInline,this.orderBy,this.sort,this.pageSize,this.pageNum).then((response)=>{
          this.tableData3=response.list
          //this.pages = response.pages
          this.total = response.total
          this.tableLoad = false
        })
      },
      search(){
        this.tableLoad = true
        search(this.formInline,this.orderBy,this.sort,this.pageSize,this.pageNum).then((response)=>{
          this.tableData3=response.list
          //this.pages = response.pages
          this.total = response.total
          this.tableLoad = false
        })
      },
      Listsearch(){
        let bailStartDate=this.formInline.bailTime[0]
        let bailEndDate=this.formInline.bailTime[1]
        let expectStartTime=this.formInline.expectTime[0]
        let expectEndTime=this.formInline.expectTime[1]
        let collectStartTime=this.formInline.collectTime[0]
        let collectEndTime=this.formInline.collectTime[1]
        this.tableLoad = true
        dataList(this.formInline,this.orderBy,this.sort,this.pageSize,this.pageNum).then((response)=>{
          this.tableData3=response.list
          this.total=response.total
          this.dialogVisible=false
          this.tableLoad = false
        })
      },
      handleSelectionChange(row){
        let _self=this
        _self.deleteList=[]
        _self.selectDataCollectExportList=[]
        row.forEach(function(currentValue, index, arr){
          let Object={"id":""}
          Object.id=currentValue.id
          _self.deleteList.push(Object)
          _self.selectDataCollectExportList.push(Object)
          console.log(_self.selectDataCollectExportList)
        })
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
        this.formInline={
        	odvs:[],
        	clients:[],
          collectTime:[],
          expectTime:[],
          bailTime:[]
        }
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
                     remoweData(_self.deleteList).then((response)=>{
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
    },
    created() {
      this.queryConfList();
      this.tableLoad = true
      dataList(this.formInline,this.sort,this.orderBy,this.pageSize,this.pageNum).then((response)=>{
        this.tableData3=response.list
        //this.pages = response.pages
        this.total = response.total
        this.tableLoad = false
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
  /*  .el-tabs__content{
      margin-bottom: 50px;
      overflow-y: auto;
    }*/
    .pagination-wrap{
      position: fixed;
      bottom: 0;
      z-index: 100;
      min-height: 40px;
      background-color: white;
      width: 100%;
    }
    .pad{
      .el-checkbox{
        width:24%;
        margin-right: 0px;
      }
    }
    .el-form-item--mini .el-form-item__content, .el-form-item--mini .el-form-item__labe
    .el-form--inline .el-form-item{
      line-height: 21px;
    }
    .dialog-wrap {
      .el-dialog__body {
        .el-form {
          display: flex;
          flex-wrap: wrap;
          .el-form-item {
            display: flex;
            width: 100%;
            .el-form-item__content {
              flex: 1;
              margin-left: 0 !important;
              .el-select {
                width: 100%;
              }
            }
          }
        }
      }
    }
    .el-loading-spinner .el-loading-text {
    font-size: 18px;
    }
  }
</style>
