<template>
  <div id="data-memorize-manage"
  	v-loading="loading"	 
  	element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(248, 248, 248, 0.8)"
    class="page-wraper-sub">
    <el-form id="repay-record-query" :model="formInline" :inline="true" class="query-wrap">
      <el-form-item >
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
        <el-select v-model="formInline.dept" placeholder="部门" clearable>
          <el-option
            v-for="item in departmentList"
            :key="item.id"
            :label="item.orgName"
            :value="item.id">
          </el-option>
        </el-select>   </el-form-item>
      <el-form-item >
        <el-select v-model="formInline.odvs" filterable collapse-tags multiple  placeholder="请选择催收员" clearable>
          <el-option
            v-for="item in PersonList"
            :key="item.id"
            :label="item.userName"
            :value="item.id">
          </el-option>
        </el-select>   </el-form-item>
      <el-form-item >
        <el-select v-model="formInline.measure" placeholder="催收措施" clearable>
          <el-option
            v-for="item in sectionList"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-popover
          placement="bottom-end"
          width="700"
          trigger="click">
          <ul class="condition-wrap">
            <li class="condition-item">
              <el-input v-model="formInline.batchNo" placeholder="请输入批次号"></el-input>
            </li>
            <li class="condition-item">
              <el-input v-model="formInline.identNo" placeholder="请输入证件号"></el-input>
            </li>
            <li class="condition-item">
              <el-input v-model="formInline.cardNo" placeholder="请输入卡号"></el-input>
            </li>
            <li class="condition-item">
              <el-input v-model="formInline.collectInfo" placeholder="请输入催收记录"></el-input>
            </li>
            <li class="condition-item">
              <el-input v-model="formInline.seqno" placeholder="请输入个案序列号"></el-input>
            </li>
            <li class="condition-item">
              <el-select v-model="formInline.dept" placeholder="请选择部门" clearable>
                <el-option
                  v-for="item in departmentList"
                  :key="item.id"
                  :label="item.orgName"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>
            <li class="condition-item">
              <el-select v-model="formInline.area" placeholder="请选择催收区域" clearable>
                <el-option
                  v-for="item in areaList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>
            <li class="condition-item">
              <el-select v-model="formInline.odvs" collapse-tags  filterable multiple  placeholder="请选择催收员" clearable>
                <el-option
                  v-for="item in PersonList"
                  :key="item.createTime"
                  :label="item.userName"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>
            <li class="condition-item">
              <el-select v-model="formInline.result" placeholder="请选择催收结果" clearable>
                <el-option
                  v-for="item in EndList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>
            <li class="condition-item">
              <el-select v-model="formInline.clients" collapse-tags  filterable multiple placeholder="请选择委托方" clearable>
                <el-option
                  v-for="item in clientList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>
            <li class="condition-item">
              <el-select v-model="formInline.measure" placeholder="请选择催收措施" clearable>
                <el-option
                  v-for="item in EndList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>
            <li class="condition-item">
              <el-select v-model="formInline.caseStatus" filterable  placeholder="请选择案件状态" clearable>
                <el-option
                  v-for="item in caseStatusList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>
            <li class="condition-item">
              <el-select v-model="formInline.color" filterable  placeholder="请选择标色状态" clearable>
                <el-option
                  v-for="item in val14_data"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </li>
            <li class="condition-item half">
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
            </li>
            <li class="condition-item half">
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
            </li>
            <li class="condition-item half">
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
            </li>
          </ul>
          <img src="./down.png" width="12" height="12" alt="更多" slot="reference">
        </el-popover>
        <el-button type="text" icon="el-icon-search" @click="search">查询</el-button>
        <el-button type="text" icon="el-icon-refresh" @click="resetForm">重置</el-button>
      </el-form-item>
      <el-form-item class="operation-item">
        <el-button type="primary" @click="open7" v-has="'删除催记'">删除催记</el-button>
        <el-button type="primary" @click="selectDataCollectExport" v-has="'导出所选借改'">导出所选催记</el-button>
        <el-button type="primary" @click="dialogVisible2 = true" v-has="'导出查询结果'">导出查询结果</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="tableLoad"
      class="table-wrap"
      ref="multipleTable"
      :data="tableData3"
      border
      stripe
      tooltip-effect="dark"
      @row-dblclick="showCase"
      style="width: 100%"
      @sort-change="handleSort"
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
        sortable="custom"
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
        :sort-orders="['ascending','descending']"
        label="姓名"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="measure"
        sortable="custom"
        min-width="120"
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
        label="对象姓名"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="relation"
        label="与案人关系"
        min-width="120"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="telType"
        label="电话类型"
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
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip>
    </el-table-column><el-table-column
      prop="repayTime"
      label="承诺还款日期"
      width="140"
      align="center"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip>
    </el-table-column><el-table-column
      label="承诺还款金额"
      width="140"
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
      width="140"
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
    >
      <el-form :inline="true">
        <el-form-item>
          <el-button @click=totalDataCollectExport>按查询条件全部导出</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click='pageDataCollectExport'>按查询条件导出当前分页</el-button>
        </el-form-item>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
  </span>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {search,dataList,areaList,pageDataExport,selectDataExport,totalDataExport,remoweData,caseTypeList,clientList,EndList,PersonList,departmentList,deleteDataCollectRecord,updateDataCollectRecord} from '@/common/js/data-memorize-manage.js'
  export default {
    name: 'dataMemorizeManage',
    data(){
      return {
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
        EndList:[],
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
        if(this.selectDataCollectExportList.length>=1) {
          selectDataExport(this.selectDataCollectExportList).then((response) => {
            this.loading = false;
            this.$message({
              type: 'success',
              message: '导出成功!'
            });
          })
        }else{
          this.loading = false;
          this.$message({
            type: 'info',
            message: '请选择数据!'
          });
        }
      },
      totalDataCollectExport(){
        this.loading=true;
        let bailStartDate=this.formInline.bailTime[0]
        let bailEndDate=this.formInline.bailTime[1]
        let expectStartTime=this.formInline.expectTime[0]
        let expectEndTime=this.formInline.expectTime[1]
        let collectStartTime=this.formInline.collectTime[0]
        let collectEndTime=this.formInline.collectTime[1]
        totalDataExport(this.formInline.area,this.formInline.dept,this.formInline.batchNo,this.formInline.clients,this.formInline.odvs,this.formInline.caseStatus,this.formInline.measure,this.formInline.result,this.formInline.identNo,this.formInline.cardNo,this.formInline.collectInfo,this.formInline.color,this.formInline.seqno,this.formInline.bailStartDate,this.formInline.bailEndDate,this.formInline.expectStartTime,this.formInline.expectEndTime,this.formInline.collectStartTime,this.formInline.collectEndTime,this.orderBy,this.sort,this.pageSize,this.pageNum).then((response)=>{
          this.loading=false;
          this.$message({
            type: 'success',
            message: '导出成功!'
          });
        })
      },
      pageDataCollectExport(){
        this.loading=true;
        let bailStartDate=this.formInline.bailTime[0]
        let bailEndDate=this.formInline.bailTime[1]
        let expectStartTime=this.formInline.expectTime[0]
        let expectEndTime=this.formInline.expectTime[1]
        let collectStartTime=this.formInline.collectTime[0]
        let collectEndTime=this.formInline.collectTime[1]
        pageDataExport(this.formInline.area,this.formInline.dept,this.formInline.batchNo,this.formInline.clients,this.formInline.odvs,this.formInline.caseStatus,this.formInline.measure,this.formInline.result,this.formInline.identNo,this.formInline.cardNo,this.formInline.collectInfo,this.formInline.color,this.formInline.seqno,this.formInline.bailStartDate,this.formInline.bailEndDate,this.formInline.expectStartTime,this.formInline.expectEndTime,this.formInline.collectStartTime,this.formInline.collectEndTime,this.orderBy,this.sort,this.pageSize,this.pageNum).then((response)=>{
          this.loading=false;
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
        _self.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          console.info(1)
          if(_self.deleteList.length>0){
            console.info(2)
            remoweData(_self.deleteList).then((response)=>{
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
        });
      },
    },
    created() {
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
  }
</style>
