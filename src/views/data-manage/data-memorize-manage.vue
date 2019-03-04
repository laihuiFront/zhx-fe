<template>
  <div id="data-memorize-manage">
    <el-row :gutter="24">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-form :inline="true" ref="form" :model="form" label-width="80px">
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
              <el-select v-model="formInline.odvs" filterable multiple  placeholder="请选择催收员" clearable>
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
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="text" :style="images" @click="dialogVisible = true"></el-button>     </el-form-item>
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
              <el-button type="primary" @click="selectDataCollectExport">导出所选催记</el-button>
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
      v-loading="loading"
      ref="multipleTable"
      :data="tableData3"
      tooltip-effect="dark"
      style="width: 100%"
      height="530"
      sortable="custom"
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
        :sortable='true'
        min-width="120"
        :sort-orders="['ascending','descending']"
        label="个案序列号"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        :sortable='true'
        :sort-orders="['ascending','descending']"
        label="姓名"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="measure"
        :sortable='true'
        min-width="120"
        :sort-orders="['ascending','descending']"
        label="催收措施"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="collectTime"
        label="催收时间"
        width="140"
        :sortable='true'
        :sort-orders="['ascending','descending']"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="targetName"
        :sortable='true'
        :sort-orders="['ascending','descending']"
        min-width="120"
        label="对象姓名"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="relation"
        label="与案人关系"
        min-width="120"
        :sortable='true'
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="telType"
        label="电话类型"
        min-width="120"
        :sortable='true'
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="mobile"
        width="120"
        align="center"
        :sortable='true'
        :sort-orders="['ascending','descending']"
        label="电话号码"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="collectInfo"
        label="催收记录"
        min-width="120"
        :sortable='true'
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column><el-table-column
      prop="result"
      label="催收结果"
      min-width="160"
      align="center"
      :sortable='true'
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip>
    </el-table-column><el-table-column
      prop="method"
      label="谈判方式"
      min-width="120"
      :sortable='true'
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip>
    </el-table-column><el-table-column
      prop="repayTime"
      label="承诺还款日期"
      width="140"
      align="center"
      :sortable='true'
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip>
    </el-table-column><el-table-column
      label="承诺还款金额"
      width="140"
      align="center"
      :sortable='true'
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip>
      <template slot-scope="scope">
        ￥{{scope.row.repayAmt}}
      </template>
    </el-table-column><el-table-column
      label="减免金额"
      width="140"
      :sortable='true'
      :sort-orders="['ascending','descending']"
      align="center"
      show-overflow-tooltip>
      <template slot-scope="scope">
        ￥{{scope.row.reduceAmt}}
      </template>
    </el-table-column><el-table-column
      prop="reduceStatusMsg"
      label="减免状态"
      :sortable='true'
      min-width="130"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip>
    </el-table-column><el-table-column
      prop="odv"
      label="催收员"
      :sortable='true'
      min-width="130"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip>
    </el-table-column><el-table-column
      prop="collectStatusMsg"
      label="催收状态"
      min-width="130"
      :sortable='true'
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip>
    </el-table-column>
      <el-table-column
        label="操作"
        width="120"
        align="center">
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
        :page-sizes="[100, 500, 2000, 10000, 1000000]"
        :page-size="pages"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
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
        <el-form-item label="催收时间" prop="createTime">
          <el-date-picker
            v-model="recordInfo.collectTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="催收结果" prop="result">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="recordInfo.result">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="footer">
        <el-button @click="onClickCancel">取 消</el-button>
        <el-button type="primary" @click="onClickSave">保 存</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="查询条件"
      :visible.sync="dialogVisible"
      width="66%"
    >

      <el-form :inline="true" :model="formInline" class="demo-form-inline">

        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="批次号">
                <el-input v-model="formInline.batchNo" placeholder="请输入批次号"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="证件号">
                <el-input v-model="formInline.identNo" placeholder="请输入证件号"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>


        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label=" 卡  号  ">
                <el-input v-model="formInline.cardNo" placeholder="请输入卡号"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="催收记录">
                <el-input v-model="formInline.collectInfo" placeholder="请输入催收记录"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>


        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="个案序列号">
                <el-input v-model="formInline.seqno" placeholder="请输入个案序列号"></el-input>
              </el-form-item>
            </div>
          </el-col>
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
              <el-form-item label="催收结果">
                <el-select v-model="formInline.client" placeholder="请选择催收结果" clearable>
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
    <el-button @click="dialogVisible = false">取 消</el-button>
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
  import {search,dataList,areaList,pageDataExport,selectDataExport,totalDataExport,sectionList,remoweData,caseTypeList,clientList,EndList,PersonList,departmentList,deleteDataCollectRecord,updateDataCollectRecord} from '@/common/js/data-memorize-manage.js'
  export default {
    name: 'dataMemorizeManage',
    data(){
      return {
        images:{background: "url(" + require("./down.png") + ") repeat-x",padding:"8px 5px 3px 6px",},
        loading:false,
        caseStatusList:[{name:"未退案",id:0},{name:"正常",id:1},{name:"暂停",id:2},{name:"关档",id:3},{name:"退档",id:4},{name:"全部",id:5}],
        EndList:[],
        selectDataCollectExportList:[],
        departmentList:[],
        PersonList:[],
        clientList:[],
        caseTypeList:[],
        sectionList:[],
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
          collectTime:[],
          expectTime:[],
          bailTime:[]
        },
      }
    },
    methods: {
      editMessage(record){
        this.recordInfo = {
          id: record.id,
          result: record.result,
          collectTime: record.collectTime
        }
        this.dialogVisible1 = true
      },
      onClickCancel(){
        this.dialogVisible1 = false
      },
      onClickSave(){
        updateDataCollectRecord(this.recordInfo).then(res=>{
          this.$message('修改记录成功成功')
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
            this.$message('删除成功')
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
        search(this.formInline.area,this.formInline.dept,this.formInline.odvs,this.formInline.measure,this.orderBy,this.sort,this.pageSize,this.pageNum).then((response)=>{
          this.tableData3=response.list
          //this.pages = response.pages
          this.total = response.total
        })
      },
      search(){
        search(this.formInline.area,this.formInline.dept,this.formInline.odvs,this.formInline.measure,this.orderBy,this.sort,this.pageSize,this.pageNum).then((response)=>{
          this.tableData3=response.list
          //this.pages = response.pages
          this.total = response.total
        })
      },
      Listsearch(){
        let bailStartDate=this.formInline.bailTime[0]
        let bailEndDate=this.formInline.bailTime[1]
        let expectStartTime=this.formInline.expectTime[0]
        let expectEndTime=this.formInline.expectTime[1]
        let collectStartTime=this.formInline.collectTime[0]
        let collectEndTime=this.formInline.collectTime[1]
        dataList(this.formInline.area,this.formInline.dept,this.formInline.batchNo,this.formInline.clients,this.formInline.odvs,this.formInline.caseStatus,this.formInline.measure,this.formInline.result,this.formInline.identNo,this.formInline.cardNo,this.formInline.collectInfo,this.formInline.color,this.formInline.seqno,this.formInline.bailStartDate,this.formInline.bailEndDate,this.formInline.expectStartTime,this.formInline.expectEndTime,this.formInline.collectStartTime,this.formInline.collectEndTime,this.orderBy,this.sort,this.pageSize,this.pageNum).then((response)=>{
          this.tableData3=response.list
          this.total=response.total
          this.dialogVisible=false
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
      dataList(this.formInline.area,this.formInline.dept,this.formInline.batchNo,this.formInline.clients,this.formInline.odvs,this.formInline.caseStatus,this.formInline.measure,this.formInline.result,this.formInline.identNo,this.formInline.cardNo,this.formInline.collectInfo,this.formInline.color,this.formInline.seqno,this.formInline.bailStartDate,this.formInline.bailEndDate,this.formInline.expectStartTime,this.formInline.expectEndTime,this.formInline.collectStartTime,this.formInline.collectEndTime,this.orderBy,this.sort,this.pageSize,this.pageNum).then((response)=>{
        this.tableData3=response.list
        //this.pages = response.pages
        this.total = response.total
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
      sectionList().then((response)=>{
        this.sectionList=response
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
