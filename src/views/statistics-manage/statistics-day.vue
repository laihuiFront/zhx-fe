<template>
  <div id="statistics-day"
       v-loading="loading"
       element-loading-text="拼命加载中"
       v-loading.fullscreen.lock="fullscreenLoading"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.7)">
    <el-form ref="form" :model="formInline" :inline="true" class="query-wrap queryStyle">
      <el-form-item label="催收员：">
        <el-input v-model="formInline.odvName" width="200" @focus="onClickSelectUser" clearable placeholder="请选择催收员"></el-input>
      </el-form-item>
      <el-form-item label="催收区域：">
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
      <el-form-item label="委托方：">
        <el-select v-model="formInline.clients" placeholder="请选择委托方" filterable multiple collapse-tags clearable>
          <el-option
            v-for="item in clientList"
            :key="item.id"
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
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="query2">开始统计</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-refresh" @click="clench">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">导出查询结果</el-button>
      </el-form-item>
    </el-form>

    <el-table highlight-current-row v-loading="tableLoad"
              :data="tableData3"
              show-summary
              :summary-method="getSummaries">
      <el-table-column
        prop="odv"
        align="center"
        label="催收员"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column label="8:00以前" align="center">
        <el-table-column
          prop="countConPhoneNum"
          label="有效通电"
          align="center"
          min-width="80"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="showCase(scope.row,time0,1)"
            >{{scope.row.list[0].countConPhoneNum}}
            </el-button>     
          </template>
        </el-table-column>

        <el-table-column
          prop="countInvalidPhoneNum"
          label="未接通"
          align="center"
          min-width="80"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="showCase(scope.row,time0,2)"
            >{{scope.row.list[0].countInvalidPhoneNum}}
            </el-button> 
          </template>
        </el-table-column>
        <el-table-column
          prop="countPhoneNum"
          label="总通电量"
          align="center"
          min-width="80"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="showCase(scope.row,time0,3)"
            >{{scope.row.list[0].countPhoneNum}}
            </el-button> 
          </template>
        </el-table-column>
        <el-table-column
          prop="countCasePhoneNum"
          label="个案量"
          align="center"
          min-width="80"
          show-overflow-tooltip
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
          min-width="80"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="showCase(scope.row,time1,1)"
            >{{scope.row.list[1].countConPhoneNum}}
            </el-button> 
          </template>
        </el-table-column>

           <el-table-column
          prop="countInvalidPhoneNum"
          label="未接通"
          align="center"
          min-width="80"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="showCase(scope.row,time1,2)"
            >{{scope.row.list[1].countInvalidPhoneNum}}
            </el-button> 
          </template>
        </el-table-column>
        <el-table-column
          prop="countPhoneNum"
          label="总通电量"
          align="center"
          min-width="80"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="showCase(scope.row,time1,3)"
            >{{scope.row.list[1].countPhoneNum}}
            </el-button> 
          </template>
        </el-table-column>
        <el-table-column
          prop="countCasePhoneNum"
          label="个案量"
          align="center"
          min-width="80"
          show-overflow-tooltip
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
          min-width="80"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="showCase(scope.row,time2,1)"
            >{{scope.row.list[2].countConPhoneNum}}
            </el-button> 
          </template>
        </el-table-column>

           <el-table-column
          prop="countInvalidPhoneNum"
          label="未接通"
          align="center"
          min-width="80"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="showCase(scope.row,time2,2)"
            >{{scope.row.list[2].countInvalidPhoneNum}}
            </el-button> 
          </template>
        </el-table-column>
        <el-table-column
          prop="countPhoneNum"
          label="总通电量"
          align="center"
          min-width="80"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="showCase(scope.row,time2,3)"
            >{{scope.row.list[2].countPhoneNum}}
            </el-button> 
          </template>
        </el-table-column>
        <el-table-column
          prop="countCasePhoneNum"
          label="个案量"
          align="center"
          min-width="80"
          show-overflow-tooltip
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
          min-width="80"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="showCase(scope.row,time3,1)"
            >{{scope.row.list[3].countConPhoneNum}}
            </el-button> 
          </template>
        </el-table-column>
        <el-table-column
          prop="countInvalidPhoneNum"
          label="未接通"
          align="center"
          min-width="80"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="showCase(scope.row,time3,2)"
            >{{scope.row.list[3].countInvalidPhoneNum}}
            </el-button> 
          </template>
        </el-table-column>
        <el-table-column
          prop="countPhoneNum"
          label="总通电量"
          align="center"
          min-width="80"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="showCase(scope.row,time3,3)"
            >{{scope.row.list[3].countPhoneNum}}
            </el-button> 
          </template>
        </el-table-column>
        <el-table-column
          prop="countCasePhoneNum"
          label="个案量"
          align="center"
          min-width="80"
          show-overflow-tooltip
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
          min-width="80"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="sumInvalidPhoneNum"
          label="未接通"
          align="center"
          min-width="80"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="sumPhoneNum"
          label="总通电量"
          align="center"
          min-width="80"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="sumCasePhoneNum"
          label="个案量"
          align="center"
          min-width="80"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-pagination
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

    <el-dialog
      title="催记详情"
      :visible.sync="dialogDetailsVisible"
      width="60%"
      v-dialogDrag
      class="dialog-wrap"
      :close-on-click-modal="false"
    >
  <el-table
      v-loading="tableLoad"
      stripe
      border
      :data="tableDataDetails"
      highlight-current-row     
    >
      <el-table-column
        min-width="4"
        label="通话时间"
        align="center"
        prop="collectTime"
        show-overflow-tooltip
      />
      <el-table-column
        min-width="3"
        label="通话对象"
        align="center"
        prop="targetName"
        show-overflow-tooltip
      />
      <el-table-column
        min-width="4"
        label="电话号码"
        align="center"
        prop="mobile"
        show-overflow-tooltip
      />
      <el-table-column
        min-width="3"
        label="电话类型"
        align="center"
        prop="telType"
        show-overflow-tooltip
      />
      <el-table-column
        min-width="5"
        label="通话类容"
        align="center"
        prop="collectInfo"
        show-overflow-tooltip
      />
      <el-table-column
        min-width="3"
        label="通话结果"
        align="center"
        prop="result"
        show-overflow-tooltip
      />
      <el-table-column
        min-width="4"
        label="承诺日期"
        align="center"
        prop="repayTime"
        show-overflow-tooltip
      />
      <el-table-column
        min-width="4"
        label="承诺金额"
        align="center"
        prop="repayAmt"
        show-overflow-tooltip
      />
      <el-table-column
        min-width="4"
        label="催收员"
        align="center"
        prop="odv"
        show-overflow-tooltip
      />
    </el-table>
    <el-pagination
      @size-change="handleSizeChange2"
      @current-change="handleCurrentChange2"
      :current-page.sync="currentPage5"
      :page-sizes="pageSizes"
      :page-size="pages2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total2">
    </el-pagination>

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
    selectDataCaseExport,
    getCollectionDayDetails
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
        pageSize:pageSizes[0],
        total: 0,
        formInline: {
          odvName: '',
          odv: [],
          areas:[],
          clients:[],
          time: []
        },
        PersonList: [],
        areaList: [],
        clientList: [],
        tableData3: [],
        pageSizes,
        time0:'00:00:00-08:00:00',
        time1:'08:00:00-12:00:00',
        time2:'12:00:00-18:00:00',
        time3:'18:00:00-23:59:59',
        tableDataDetails:[],
        dialogDetailsVisible:false,
        total2:0,
        pages2:1,
        currentPage5:1,
        pageSize2:100,
        pageNum2:1,
        rowinfo:'',
        timeinfo:'',
        statusinfo:''
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
        this.$set(this.formInline, 'odvName', selectUserNames.join(','))
        this.$set(this.formInline, 'odv', selectUserIds)
        this.selectUserVisible = false
      },
      onClickSelectUser() {
        this.selectUserVisible = true
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(this.formInline.odv);
        })
      },
      getSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        let step = 0;
        let y = num => num % 4 === 0;
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
        if (this.formInline.odvName==null || this.formInline.odvName==""){
          this.$set(this.formInline, 'odv', [])
        }
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
      showCase2(row,time,status){
        this.rowinfo =row
        this.timeinfo=time
        this.statusinfo=status
        getCollectionDayDetails(this.formInline,row.id,time,status,this.pageSize2, this.pageNum2).then((data)=>{
          this.tableDataDetails=data.list
          this.total2=data.total
          this.dialogDetailsVisible=true
        })
      },
      showCase(row,time,status){
        this.rowinfo =row
        this.timeinfo=time
        this.statusinfo=status
        getCollectionDayDetails(this.formInline,row.id,time,status,this.pageSize2, 1).then((data)=>{
          this.currentPage5=1
          this.tableDataDetails=data.list
          this.total2=data.total
          this.dialogDetailsVisible=true
        })
      },
      handleSizeChange2(val) {
        this.pageSize2 = val
        this.currentPage5=1
        this.pageNum2=1
        this.showCase2(this.rowinfo,this.timeinfo,this.statusinfo)
      },
      handleCurrentChange2(val) {
        this.pageNum2 = val;
        this.showCase2(this.rowinfo,this.timeinfo,this.statusinfo)
      },    
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
    min-width: 1400px !important;
  }
</style>
