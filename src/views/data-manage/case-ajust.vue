<template>
  <div id="case-adjust"
       v-loading="loading2"
       v-loading.fullscreen.lock="fullscreenLoading"
       element-loading-text="正在加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.7)">
    <el-form ref="form" :model="formInline" :inline="true" class="query-wrap queryStyle">
      <el-form-item v-if="queryConf.wtf || queryConfFlag" label="委托方：">
        <el-select v-model="formInline.clients" filterable collapse-tags multiple  placeholder="请选择委托方" clearable>
          <el-option
            v-for="item in clientList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="queryConf.gaxlh || queryConfFlag" label="个案序列号：">
        <el-input type="textarea" v-model="formInline.seqNo" clearable placeholder="请输入个案序列号" style="width: 100%;"
                  rows="3"></el-input>
      </el-form-item>
      <el-form-item v-if="queryConf.hth || queryConfFlag" label="合同号：">
        <el-input v-model="formInline.contractNo" placeholder="请输入合同号" clearable></el-input>
      </el-form-item>
      <el-form-item v-if="queryConf.zjh || queryConfFlag" label="证件号：">
        <el-input type="textarea" v-model="formInline.identNo" style="width: 100%;"  clearable placeholder="请输入证件号"
                  rows="3"></el-input>
      </el-form-item>
      <el-form-item v-if="queryConf.xm || queryConfFlag" label="姓名：">
        <el-input type="textarea" v-model="formInline.name" placeholder="请输入姓名" clearable style="width: 100%;"
                  rows="3"></el-input>
      </el-form-item>
      <el-form-item v-if="queryConf.ajzt || queryConfFlag" label="案件状态：">
        <el-select v-model="formInline.statuss" filterable collapse-tags multiple placeholder="请选择案件状态" clearable>
          <el-option
            v-for="item in caseStatusList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="queryConf.cszt || queryConfFlag" label="催收状态：">
        <el-select v-model="formInline.collectStatuss" filterable collapse-tags multiple placeholder="请选择催收状态" clearable>
          <el-option
            v-for="item in collectStatusList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="queryConf.csy || queryConfFlag" label="催收员：">
        <el-input v-model="formInline.odvNames" width="160" @focus="onClickSelectUser2" clearable placeholder="请选择催收员"></el-input>
      </el-form-item>
      <el-form-item v-if="queryConf.warq || queryConfFlag" label="操作时间：">
        <el-date-picker
          v-model="formInline.createTime"
          type="daterange"
          align="right"
          unlink-panels
          clearable
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="操作时间开始"
          end-placeholder="操作时间结束"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item v-if="queryConf.bm || queryConfFlag" label="部门：">
        <el-input v-model="deptName" width="200" @focus="onClickSelectDept" clearable placeholder="请选择部门"></el-input>
      </el-form-item>
      <el-form-item v-if="queryConf.csy || queryConfFlag" label="操作员：">
        <el-input v-model="formInline.odvNameFiter" width="160" @focus="onClickSelectUser3" clearable placeholder="请选择操作员"></el-input>
      </el-form-item>
      <el-form-item v-if="queryConf.warq || queryConfFlag" label="委案日期：">
        <el-date-picker
          v-model="formInline.time2"
          type="daterange"
          align="right"
          unlink-panels
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="委案日期开始"
          end-placeholder="委案日期结束"
          clearable
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item v-if="queryConf.yjtarq || queryConfFlag" label="预计退案日期：">
        <el-date-picker
          v-model="formInline.time3"
          type="daterange"
          align="right"
          value-format="yyyy-MM-dd"
          unlink-panels
          range-separator="至"
          start-placeholder="预计退案日期开始"
          end-placeholder="预计退案日期结束"
          clearable
        >
        </el-date-picker>
      </el-form-item>
      <el-row>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-refresh" @click="resetFormInline">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="showQueryConf">查询条件配置</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <el-table highlight-current-row v-loading="tableLoad"
              ref="multipleTable"
              :data="tableData3"
              @row-dblclick="showCase"
              @sort-change="handleSort"
    >
      <el-table-column
        min-width="140"
        prop="client"
        align="center"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        label="委托方"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="180"
        prop="seqNo"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        align="center"
        label="个案序列号"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==3" type="text" style ="color:#999999;" size="small" @click="showCase(scope.row)">
            {{scope.row.seqNo}}
          </el-button>
          <el-button v-if="scope.row.status==4" type="text" style ="color:#999999;text-decoration:line-through;" size="small" @click="showCase(scope.row)">
            {{scope.row.seqNo}}
          </el-button>
          <el-button v-if="scope.row.status!=3 && scope.row.status!=4" type="text" size="small" @click="showCase(scope.row)">
            {{scope.row.seqNo}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        min-width="160"
        prop="contractNo"
        align="center"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        label="合同号"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="120"
        prop="name"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        label="姓名"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="180"
        prop="identNo"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        align="center"
        label="身份证"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="160"
        prop="statusMsg"
        align="center"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        label="案件状态"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="100"
        prop="collectStatusMsg"
        align="center"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        label="催收状态"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="140"
        prop="createTime"
        align="center"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        label="操作时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="140"
        prop="creatorName"
        align="center"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        label="操作人"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="140"
        prop="lastOdv"
        align="center"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        label="上一级催收员"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="140"
        prop="odv"
        align="center"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        label="现催收员"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="140"
        prop="dept"
        align="center"
        label="催收部门"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="140"
        prop="context"
        align="center"
        label="操作内容"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination-wrap"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="pageSizes"
      :page-size="pages"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <el-dialog
      title="选择催收员"
      class="dialog-wrap"
      :visible.sync="selectUserVisible2"
      :close-on-click-modal="false"
      width="600px"
      v-dialogDrag
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
        <el-button @click="selectUserVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="onClickSaveUser2">保 存</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="选择操作员"
      class="dialog-wrap"
      :visible.sync="selectUserVisible3"
      :close-on-click-modal="false"
      width="600px"
      v-dialogDrag
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
        <el-button @click="selectUserVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="onClickSaveUser3">保 存</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="查询条件配置"
      :visible.sync="showQueryConfVisible"
      width="60%"
      center
      :close-on-click-modal="false"
      v-dialogDrag
      class="dialog-wrap"
    >
      <div class="selectAllBtn">
        <el-button type="primary" @click="selectMethod(true)" >全部选中</el-button>
        <el-button type="primary" @click="selectMethod(false)" >全部取消</el-button>
      </div>
      <el-row class="pad" ref="boxWrapper">
        <el-checkbox v-model="queryConf.wtf" label="3">委托方</el-checkbox>
        <el-checkbox v-model="queryConf.gaxlh" label="3">个案序列号</el-checkbox>
        <el-checkbox v-model="queryConf.hth" label="1">催收区域</el-checkbox>
        <el-checkbox v-model="queryConf.zjh" label="4">证件号</el-checkbox>
        <el-checkbox v-model="queryConf.xm" label="4">姓名</el-checkbox>
        <el-checkbox v-model="queryConf.ajzt" label="5">案件状态</el-checkbox>
        <el-checkbox v-model="queryConf.cszt" label="5">催收状态</el-checkbox>
        <el-checkbox v-model="queryConf.csy" label="2">催收员</el-checkbox>
        <el-checkbox v-model="queryConf.bm" label="1">催收部门</el-checkbox>
        <el-checkbox v-model="queryConf.czsj" label="1">操作时间</el-checkbox>
        <el-checkbox v-model="queryConf.czy" label="1">操作员</el-checkbox>
        <el-checkbox v-model="queryConf.warq" label="5">委案日期</el-checkbox>
        <el-checkbox v-model="queryConf.yjtarq" label="5">预计退案日期</el-checkbox>
      </el-row>
      <span slot="footer" class="footer">
        <el-button @click="showQueryConfVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveConf">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      width="400px"
      title="选择部门"
      class="dialog-wrap department-wrap"
      :visible.sync="departmentVisible"
      :close-on-click-modal="false"
      append-to-body
      v-dialogDrag
    >
        <el-tree
          :data="departmentTree"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultDeptProps">
      </el-tree>
      <span slot="footer" class="footer">
          <el-button @click="departmentVisible=false">取 消</el-button>
          <el-button type="primary" @click="onClickSaveDept">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  const CaseDetail = () => import('@/views/data-manage/detail');
  import {
    clientCurrent,
    saveSelectFilter,
    selectByModule,
    getUserTree,
    PersonList,
    areaStepList,
    listOrganization,
    departmentList,
    searchList,
    caseStatus
  } from '@/common/js/case-ajust.js'
  import {pageSizes} from "@/common/js/const"

  export default {
    name: 'dataCaseManage',
    components: {
      CaseDetail
    },
    data() {
      return {
        pageSizes,
        radio: "1",
        formInline1: {},
        tableLoad: false,
        dialogVisibleCase: false,
        showQueryConfVisible: false,
        deptName:"",
        queryConf: {},
        queryConfFlag: true,

        collectArea: '',
        collectStatus: '',
        value12: '',
        images: {background: "url(" + require("./down.png") + ") repeat-x", padding: "8px 5px 3px 6px"},
        props: {
          label: 'name',
          value: 'id',
          children: 'children'
        },
        caseStatusList: [{name: "未退案", id: 0}, {name: "正常", id: 1}, {name: "暂停", id: 2}, {
          name: "关档",
          id: 3
        }, {name: "退档", id: 4}, {name: "全部", id: 5}],
        departmentList: [],
        accountAgeList: [],
        collectStatusList: [],
        collectStatusList2:[],
        selectUserTree: [],
        selectUserVisible: false,
        selectUserVisible2: false,
        selectUserVisible3:false,
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        defaultDeptProps: {
          children: 'children',
          label: 'orgName'
        },
        deleteStatusList: [],
        pageSize: 100,
        pageNum: 1,
        clientList: [],
        total: 0,
        pages: 1,
        orderBy: "id",
        sort: "desc",
        caseTypeList: [],
        departmentVisible:false,
        departmentTree: [],
        formInline: {
          odvNameFiter:null,
          odvNames:null,
          statuss:[1],
          odvs: [],
          clients: [],
          creators:[],
          createTime:[],
          time2: [],
          time3: []
        },
        dialogVisible: false,
        tableData3: [],
        currentPage4: 1,
        PersonList: [],
        form: {
          time: []
        },
        detailTitle: '案件详情',
        odvName:'',
        loading2: true,
        fullscreenLoading: true,

      }
    },

    methods: {
      onClickSaveDept() {
        let selectDataArr = this.$refs.tree.getCheckedNodes()
        let selectUserNames = []
        let selectUserIds = []

        if (selectDataArr.length > 0) {
          selectUserNames = selectDataArr.map((item) => {
            return item.orgName
          })
          selectUserIds = selectDataArr.map((item) => {
            return item.id
          })
        }

        this.$set(this, 'deptName', selectUserNames.join(','))
        this.$set(this.formInline, 'depts', selectUserIds)

        this.departmentVisible = false
      },

      showBatchList(query){
        this.$set(this, 'batchList', [])
        batchList2({"batchNo":query}).then((response) => {
          this.$set(this, 'batchList', response)
        })
      },


      saveConf() {
        this.showQueryConfVisible = false;
        let queryObj = {module: "data-case-manage", menu: this.queryConf}
        saveSelectFilter(queryObj).then(data => {
          this.$message({
            message: "配置成功",
            type: "success"
          });
          this.queryConfList();
        });
      },



      queryConfList() {
        this.$set(this, 'loading2', true)
        this.$set(this, 'fullscreenLoading', true)
        let queryObj = {module: "data-case-manage", menu: this.queryConf}
        selectByModule(queryObj).then(data => {
          if (data) {
            this.$set(this, 'queryConf', false)
            this.queryConf = JSON.parse(data.menu);
            this.queryConfFlag = false;
          } else {
            this.queryConfFlag = true;
          }
          this.$set(this, 'loading2', false)
          this.$set(this, 'fullscreenLoading', false)
        });
      },
      showQueryConf() {
        this.showQueryConfVisible = true;
      },
      onClickSelectUser2() {
        this.selectUserVisible2 = true
      },
      onClickSelectUser3(){
        this.selectUserVisible3 = true
      },

      onClickSaveUser2() {
        let selectDataArr = this.$refs.tree.getCheckedNodes()
        let selectUserNames = []
        let selectUserIds = []
        if (selectDataArr.length > 0) {
          selectUserNames = selectDataArr.filter((item) => {
            return item.type === 'user'
          }).map((item) => {
            return item.name
          })
          selectUserIds = selectDataArr.filter((item) => {
            return item.type === 'user'
          }).map((item) => {
            return item.id
          })

        }

        this.$set(this.formInline, 'odvNames', selectUserNames.join(','))
        this.$set(this.formInline, 'odvs', selectUserIds)

        this.selectUserVisible2 = false
      },
      onClickSaveUser3() {
        let selectDataArr = this.$refs.tree.getCheckedNodes()
        let selectUserNames = []
        let selectUserIds = []
        if (selectDataArr.length > 0) {
          selectUserNames = selectDataArr.filter((item) => {
            return item.type === 'user'
          }).map((item) => {
            return item.name
          })
          selectUserIds = selectDataArr.filter((item) => {
            return item.type === 'user'
          }).map((item) => {
            return item.id
          })
        }

        this.$set(this.formInline, 'odvNameFiter', selectUserNames.join(','))
        this.$set(this.formInline, 'creators', selectUserIds)
        this.selectUserVisible3 = false
      },




      handleSort({column, prop, order}) {
        if (this.formInline.odvNames==null || this.formInline.odvNames==""){
          this.$set(this.formInline, 'odvs', [])
        }
        if (this.deptName==null || this.deptName==""){
          this.$set(this.formInline, 'depts', [])
        }
        if (this.formInline.odvNameFiter ==null || this.odvNameFiter==""){
          this.$set(this.formInline, 'creators', [])
        }
        this.sort = order == null ? "desc" : order.replace("ending", "")
        this.orderBy = prop == null ? "id" : prop

        this.tableLoad = true
        searchList(this.formInline, this.orderBy, this.sort, this.pageSize, this.pageNum).then((response) => {
          this.tableData3 = response.list
          this.total = response.total
          this.tableLoad = false
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.search()
      },
      search() {
        this.tableLoad = true

        if (this.formInline.odvNames==null || this.formInline.odvNames==""){
          this.$set(this.formInline, 'odvs', [])
        }
        if (this.deptName==null || this.deptName==""){
          this.$set(this.formInline, 'depts', [])
        }
        if (this.formInline.odvNameFiter ==null || this.odvNameFiter==""){
          this.$set(this.formInline, 'creators', [])
        }
        searchList(this.formInline, this.orderBy, this.sort, this.pageSize, this.pageNum).then((response) => {
          this.tableData3 = response.list
          this.total = response.total
          this.tableLoad = false
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.search()
      },
      handleCurrentChange(val) {
        this.pageNum = val;
        this.search()
      },
      resetFormInline() {
        this.deptName = ''
        this.formInline = {
          odvNameFiter:"",
          deptFiter:'',
          odvs: [],
          depts:[],
          statuss:[1],
          collectStatuss:[],
          clients: [],
          createTime:[],
          time2: [],
          time3: []
        }
      },
      showCase(row) {
        window.open(`#/zhx/case-detail?id=${row.caseId}`)
      },
      editCase(id, name, seqNo) {
        this.$router.push({
          path: 'case-detail',
          query: {
            id,
            name,
            seqNo
          }
        })
      },
      onClickSelectDept() {
        if (this.departmentVisible){
          return;
        }
        this.departmentTree = []
        listOrganization({"orgName":this.formInline.deptFiter}).then((data)=>{
          this.departmentTree = data;
          this.departmentVisible = true
        });
      },
      selectMethod(param){
        this._selectAllInit('queryConf');
        Object.keys(this.queryConf).map(x=>this.queryConf[x]=param)
      }
    },
    created() {
      this.queryConfList();
      this.tableLoad = true
      searchList(this.formInline, this.orderBy, this.sort, this.pageSize, this.pageNum).then((response) => {
        this.tableData3 = response.list
        this.total = response.total
        this.tableLoad = false
      })

      this.clientList = this.$store.getters.caseType.委托方;

      PersonList().then((response) => {
        this.PersonList = response
        this.form.PersonList = response
      })
      getUserTree().then(data => {
        this.selectUserTree = [data]
      })
      departmentList().then((response) => {
        this.departmentList = response
      })


      this.collectStatusList = this.$store.getters.caseType.催收状态;
      this.collectStatusList2 = this.$store.getters.caseType.催收状态.slice(0);
      this.collectStatusList2.shift();



    },
  }
</script>

<style lang="scss">
  #case-adjust {
    min-width: 2450px !important;

    .el-loading-mask{
      z-index:3000 !important;
    }
    .el-table th>.cell{
      white-space: nowrap;
    }
  /*  .el-table .el-table__body-wrapper {
      overflow-x: hidden;
    }*/
    // .pagination-wrap {
    //   position: fixed;
    //   bottom: 0;
    //   z-index: 100;
    //   min-height: 40px;
    //   background-color: white;
    //   width: 100%;
    // }

    .pad {
      .el-checkbox {
        width: 24%;
        margin-right: 0px;
      }
    }

    .el-form-item--mini .el-form-item__content, .el-form-item--mini .el-form-item__labe
    .el-form--inline .el-form-item {
      // margin-right: -10px;
      line-height: 21px;
    }

    .el-loading-spinner .el-loading-text {
      font-size: 18px;
    }

    // .el-table__body-wrapper {
    //   height: calc(100% - 74px);
    // }

    .el-dialog__header {
      background-color: #f8f8f8;

    }

    .textColor {
      display: inline-block;
      color: #66b1ff;

    }
    .color_3 {
      color: #999999;
    }
    .color_4 {
      text-decoration:line-through;
      color: #999999;
    }
    .color_gray {
      color: #b2adb2;
    }

    .color_BLACK {
      color: #000000;
    }

    .color_RED {
      color: #FF0000;
    }

    .color_BLUE {
      color: #0000FF;
    }

    .color_ORANGE {
      color: #FA8072;
    }

    .color_ZI {
      color: #A020F0;
    }

    .color_ZONG {
      color: #D2B48C;
    }
    .data-case-condition-wrap {
      height: 350px;
      overflow-y: scroll;
    }
    .top>div{
      display: flex;

    }
    .top>div p{
      flex: 1;
      margin-bottom: 10px;
    }
    .top>div p .title{
      font-weight: 800;
    }
    .filter{
      margin-bottom: 10px;
    }
    .filter h1{
      background: gray;
      margin-bottom: 10px;
      padding:10px 0;
      color: #fff;
      font-size: 14px;
      font-weight: 700;
    }
    .filter h1 p{
      display: inline-block;
      margin-left: 20px;
      cursor:pointer;
      color: deepskyblue;
    }
    .salesman-ul li{
      text-align: center;
      padding:10px 0;
      border-bottom:1px solid #000 ;
    }
    .salesman-ul .el-input--mini{
      width: 25%;
    }
    // .el-table__body tr.current-row > td{
    //   border-top: 1px solid #0080ff  !important;
    //   border-bottom: 1px solid #0080ff  !important;
    // }
    .selectAllBtn{
      margin-bottom: 10px;
    }
  }
</style>
