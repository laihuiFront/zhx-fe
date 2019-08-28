<template>
  <div id="statistics-day"
       v-loading="loading"
       element-loading-text="拼命加载中"
       v-loading.fullscreen.lock="fullscreenLoading"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.7)">
    <el-form ref="form" :model="formInline" :inline="true" class="query-wrap queryStyle">
      <el-form-item>
        <el-input v-model="odvName" width="200" @focus="onClickSelectUser" clearable placeholder="请选择催收员"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.areas" placeholder="请选择催收区域" filterable
                   multiple
                   collapse-tags clearable>
          <el-option
            v-for="item in areaList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.clients" placeholder="请选择委托方" filterable multiple collapse-tags clearable>
          <el-option
            v-for="item in clientList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
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
        <el-button type="primary" icon="el-icon-search" @click="query2">开始统计</el-button>
        <el-button type="primary" icon="el-icon-refresh" @click="clench">重置</el-button>
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
        prop="odv"
        align="center"
        label="催收员"
      >
      </el-table-column>
      <el-table-column label="8:00前" align="center">
        <el-table-column
          prop="countConPhoneNum"
          label="有效通电"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.list[0].countConPhoneNum}}
          </template>
        </el-table-column>
        <el-table-column
          prop="countPhoneNum"
          label="总通电量"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.list[0].countPhoneNum}}
          </template>
        </el-table-column>
        <el-table-column
          prop="countCasePhoneNum"
          label="个案量"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.list[0].countCasePhoneNum}}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="8:00-12:00" align="center">
        <el-table-column
          prop="countConPhoneNum"
          label="有效通电"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.list[1].countConPhoneNum}}
          </template>
        </el-table-column>
        <el-table-column
          prop="countPhoneNum"
          label="总通电量"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.list[1].countPhoneNum}}
          </template>
        </el-table-column>
        <el-table-column
          prop="countCasePhoneNum"
          label="个案量"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.list[1].countCasePhoneNum}}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="12:00-18:00" align="center">
        <el-table-column
          prop="countConPhoneNum"
          label="有效通电"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.list[2].countConPhoneNum}}
          </template>
        </el-table-column>
        <el-table-column
          prop="countPhoneNum"
          label="总通电量"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.list[2].countPhoneNum}}
          </template>
        </el-table-column>
        <el-table-column
          prop="countCasePhoneNum"
          label="个案量"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.list[2].countCasePhoneNum}}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="18:00以后" align="center">
        <el-table-column
          prop="countConPhoneNum"
          label="有效通电"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.list[3].countConPhoneNum}}
          </template>
        </el-table-column>
        <el-table-column
          prop="countPhoneNum"
          label="总通电量"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.list[3].countPhoneNum}}
          </template>
        </el-table-column>
        <el-table-column
          prop="countCasePhoneNum"
          label="个案量"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.list[3].countCasePhoneNum}}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="合计" align="center">
        <el-table-column
          prop="sumConPhoneNum"
          label="有效通电"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="sumPhoneNum"
          label="总通电量"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="sumCasePhoneNum"
          label="个案量"
          align="center"
        >
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination-wrap"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage4"
      :page-sizes="pageSizes"
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
  import {
    getUserTree,
    areaList,
    clientList,
    PersonList,
    dataList,
    selectDataCaseExport
  } from '@/common/js/statistics-day.js'
   import {pageSizes} from "@/common/js/const"

  export default {
    name: 'statisticsDay',
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        selectUserTree: [],
        selectUserVisible: false,
        fullscreenLoading: false,
        loading: false,
        tableLoad: false,
        dataList: [],
        currentPage4: 1,
        pages: 1,
        pageNum:1,
        pageSize:100,
        total: 0,
        formInline: {
          odv: [],
          areas:[],
          clients:[],
          time: []
        },
        odvName: "",
        PersonList: [],
        areaList: [],
        clientList: [],
        tableData3: [],
        pageSizes
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
      getSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        let step = 0;
        let y = num => num % 3 === 0;
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }

          // const values = data[0].list.map(item => Number(item[column.property]));
          // const values = data.map(item => item.list[step][column.property]);
          const values = data.map(item => {
            if(step < item.list.length) {
              return item.list[step][column.property]
            } else {
              return item[column.property]
            }
          });

          y(index) && step++;

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
        this.currentPage4=1
        this.pageNum=1
        this.query()
      },
      handleCurrentChange(val) {
        this.pageNum = val;
         this.query()
      },
      onSubmit() {

        if (this.formInline.time == null || this.formInline.time.length == 0) {
          this.$message({
            type: 'error',
            message: '请选择查询时间段!'
          });
          return;
        }
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
        if (this.formInline.time == null || this.formInline.time.length == 0) {
          this.$message({
            type: 'error',
            message: '请选择查询时间段!'
          });
          return;
        }
        this.loading = true;
        this.fullscreenLoading = true;
        dataList(this.formInline,this.pageSize, this.pageNum).then((response) => {
          this.tableData3 = response.list
          this.total=response.total
          this.loading = false;
          this.fullscreenLoading = false;
        })
       /* setTimeout(() => {
          this.tableLoad = false;
        }, 2000);*/
      },
      query2() {
        if (this.formInline.time == null || this.formInline.time.length == 0) {
          this.$message({
            type: 'error',
            message: '请选择查询时间段!'
          });
          return;
        }
        this.loading = true;
        this.fullscreenLoading = true;
        dataList(this.formInline,this.pageSize, 1).then((response) => {
          this.tableData3 = response.list
          this.total=response.total
          this.currentPage4=1
          this.loading = false;
          this.fullscreenLoading = false;
        })
       /* setTimeout(() => {
          this.tableLoad = false;
        }, 2000);*/
      },
  // queryMethod(){
  //   // this.pageNum=1
  //   this.currentPage4=1
  //   this.query2()
  // }

    },
    created() {
 /*     areaList().then((response) => {
        this.areaList = response
      })*/
      this.areaList = this.$store.getters.caseType.催收区域;
    /*  clientList().then((response) => {
        this.clientList = response
      })*/
      this.clientList = this.$store.getters.caseType.委托方;
      PersonList().then((response) => {
        this.PersonList = response
      })
      getUserTree().then(data => {
        this.selectUserTree = [data]
      })
      //  this.tableLoad = true
      //      dataList(this.formInline).then((response)=>{
      //    this.tableData3=response.list
      //    this.tableLoad = false
      //    this.total=response.totalNum
      //  })


    },
  }
</script>

<style lang="scss">
  #statistics-day {
    .el-form--inline .el-form-item {
      margin-right: 0px;
    }

    .el-table .el-table__body-wrapper {
      overflow-x: hidden !important;
    }
    .el-table__body tr.current-row > td{
      border-top: 1px solid #0080ff  !important;
      border-bottom: 1px solid #0080ff  !important;
    }
  }
</style>
