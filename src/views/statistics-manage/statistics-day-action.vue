<template>
  <div id="statistics-day-action"
       v-loading="loading"
       element-loading-text="拼命加载中"
       v-loading.fullscreen.lock="fullscreenLoading"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.7)">
    <el-form ref="form" :model="formInline" :inline="true" class="query-wrap queryStyle">
      <el-form-item label="催收员：">
        <el-input v-model="odvName" width="200" @focus="onClickSelectUser" clearable placeholder="请选择催收员"></el-input>
      </el-form-item>
      <el-form-item label="催收区域：">
        <el-select v-model="formInline.areas" placeholder="请选择催收区域" filterable multiple collapse-tags clearable>
          <el-option
            v-for="item in areaList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="委托方：">
        <el-select v-model="formInline.clients" placeholder="请选择委托方" filterable multiple collapse-tags clearable>
          <el-option
            v-for="item in clientList"
            :key="item.value"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="催收日期：">
        <el-date-picker
          v-model="formInline.time"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="催收日期开始"
          end-placeholder="催收日期结束">
        </el-date-picker>
      </el-form-item>
      <el-form-item style="margin-left:10px;">
        <el-button type="primary" icon="el-icon-search" @click=query> 开始统计</el-button>
        <el-button type="primary" icon="el-icon-refresh" @click=clench>重置</el-button>
      </el-form-item>
      <el-form-item class="operation-item">
        <el-button type="primary" @click="onSubmit">导出查询结果</el-button>
      </el-form-item>
    </el-form>
    <el-table highlight-current-row v-loading="tableLoad"
              :data="tableData3"
              border
              stripe
              show-summary
              :summary-method="getSummaries"
              style="width: 100%">
      <el-table-column
        prop="odvName"
        align="center"
        label="催收员"
      >
      </el-table-column>
      <el-table-column
        prop="countSearchNo"
        align="center"
        label="114查询无效"
      >
      </el-table-column>
      <el-table-column
        prop="countDX1"
        align="center"
        label="DX1"
      >
      </el-table-column>
      <el-table-column
        prop="countDX2"
        align="center"
        label="DX2"
      >
      </el-table-column>
      <el-table-column
        prop="countDX3"
        align="center"
        label="DX3"
      >
      </el-table-column>
      <el-table-column
        prop="countDX4"
        align="center"
        label="DX4"
      >
      </el-table-column>
      <el-table-column
        align="center"
        label="承诺还款"
        prop="countRepay"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showMessage(scope)">{{scope.row.countRepay}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="可联本人"
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
        label="可联第三人"
        prop="countConThird"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showMessage(scope)">{{scope.row.countConThird}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="可联家人"
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
          <el-button type="text" size="small" @click="showMessage(scope)">{{scope.row.countInvalidCall}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="合计"
        prop="countResult"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showMessage(scope)">{{scope.row.countResult}}</el-button>
        </template>
      </el-table-column>
    </el-table>
   <!-- <el-pagination
      class="pagination-wrap"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[50, 100, 200, 500, 1000]"
      :page-size="pages"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogTableVisible" class="dialog-wrap" width="80%" v-dialogDrag>
      <el-table :data="gridData" border
                stripe>
        <el-table-column property="phoneTime" label="通话时间"></el-table-column>
        <el-table-column property="targetName" label="通话对象"></el-table-column>
        <el-table-column property="phone" label="电话号码"></el-table-column>
        <el-table-column property="connectionType" label="电话类型"></el-table-column>
        <el-table-column property="content" label="通话内容"></el-table-column>
        <el-table-column property="collectionResult" label="通话结果"></el-table-column>
        <el-table-column property="repayTime" label="承诺日期"></el-table-column>
        <el-table-column property="repayAmtP" label="承诺金额"></el-table-column>
        <el-table-column property="odv" label="催收员"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="pageSizes"
        :page-size="pages"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-dialog>

    <el-dialog
      title="选择催收员"
      class="dialog-wrap"
      :visible.sync="selectUserVisible"
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
        <el-button @click="selectUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="onClickSaveUser">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    areaList,
    clientList,
    PersonList,
    getUserTree,
    dataList,
    messageList,
    selectDataCaseExport
  } from '@/common/js/statistics-day-action.js'
  import {pageSizes} from "@/common/js/const"

  export default {
    name: 'statisticsDayAction',
    data() {
      return {
        pageSizes,
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        selectUserTree: [],
        selectUserVisible: false,
        fullscreenLoading: false,
        loading: false,
        tableLoad: false,
        dialogTitle: '',
        dialogTableVisible: false,
        currentPage4: 1,
        pages: 1,
        total: 0,
        formInline: {
          odv: [],
          time: []
        },
        PersonList: [],
        odvName: "",
        areaList: [],
        clientList: [],
        tableData3: [],
        gridData: [],
      }
    },
    methods: {
      onClickSaveUser() {
        let selectDataArr = this.$refs.tree.getCheckedNodes()
        let selectUserNames = ''
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
        this.odvName = selectUserNames.join(',')
        this.$set(this.formInline, 'odv', selectUserIds)
        this.selectUserVisible = false
      },
      onClickSelectUser() {
        this.selectUserVisible = true
        if (!this.odvName) {
          this.$set(this.formInline, 'odv', [])
        }

        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(this.formInline.odv);
        })
      },

      showMessage(row) {
        this.dialogTableVisible = true
        this.dialogTitle = row.column.label
        messageList(row, this.formInline).then((response) => {
          this.gridData = response.list
        })

      },
      getSummaries(param) {
        const {columns, data} = param;
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
      handleSizeChange(val) {
        this.pageSize = val
      },
      handleCurrentChange(val) {
        this.pageNum = val;
      },
      onSubmit() {
        this.loading = true
        this.fullscreenLoading = true
        selectDataCaseExport(this.formInline, this.pageSize, this.pageNum).then((response) => {
          this.$message({
            type: 'success',
            message: '导出成功!'
          });
          this.loading = false
          this.fullscreenLoading = false
        })
      },
      clench() {
        this.formInline = {
          areas:[],
          clients:[]
        }
        this.odvName = null
      },
      query() {
        if (this.formInline.time==null || this.formInline.time.length==0){
          this.$message({
            type: 'info',
            message: '请输入查询的时间段!'
          });
          return;
        }

        this.loading = true
        this.fullscreenLoading = true
        dataList(this.formInline, this.pageSize, this.pageNum).then((response) => {
          this.tableData3 = response.list
          this.loading = false
          this.fullscreenLoading = false
        })

      }
    },
    created() {
    /*  areaList().then((response) => {
        this.areaList = response
      })*/
      this.areaList = this.$store.getters.caseType.催收区域;
      /*clientList().then((response) => {
        this.clientList = response
      })*/
      this.clientList = this.$store.getters.caseType.委托方;
      PersonList().then((response) => {
        this.PersonList = response
      })

      getUserTree().then(data => {
        this.selectUserTree = [data]
      })
//        this.tableLoad = true
//             dataList(this.formInline).then((response)=>{
//          this.tableData3=response.list
//          this.tableLoad = false
//          this.total=response.totalNum
//        })
//
    },
  }
</script>

<style lang="scss">
  #statistics-day-action {
    .el-dialog__header {
      background-color: #f8f8f8;

    }
    .el-table__body tr.current-row > td{
      border-top: 1px solid #0080ff  !important;
      border-bottom: 1px solid #0080ff  !important;
    }
  }
</style>
