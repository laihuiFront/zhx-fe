<template>
  <div
    id="statistics-month"
    v-loading="loading"
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.7)"
    :style="{minWidth:pageWidth}"
  >
    <el-form ref="form" :model="formInline" :inline="true" class="query-wrap queryStyle">
      <el-form-item label="催收员：">
        <el-input
          v-model="odvName"
          clearable
          placeholder="请选择催收员"
          @focus="onClickSelectUser"
        />
      </el-form-item>
      <el-form-item label="催收区域：">
        <el-select
          v-model="formInline.areas"
          placeholder="请选择催收区域"
          filterable
          multiple
          collapse-tags
          clearable
        >
          <el-option
            v-for="item in areaList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="委托方：">
        <el-select
          v-model="formInline.clients"
          placeholder="请选择委托方"
          filterable
          multiple
          collapse-tags
          clearable
        >
          <el-option
            v-for="item in clientList"
            :key="item.value"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="催收月份开始：">
        <el-date-picker
          v-model="formInline.time"
          type="month"
          value-format="yyyy-MM"
          placeholder="催收月份开始"
        />
      </el-form-item>
      <el-form-item label="催收月份结束：">
        <el-date-picker
          v-model="formInline.time2"
          type="month"
          value-format="yyyy-MM"
          placeholder="催收月份结束"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="query">开始统计</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-refresh" @click="clench">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">导出查询结果</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-if="tableData3.length > 0"
      v-loading="tableLoad"
      highlight-current-row
      :data="tableData3"
      show-summary
      :summary-method="getSummaries"
    >
      <el-table-column prop="odv" align="center" label="催收员" min-width="100" show-overflow-tooltip />
      <el-table-column
        v-for="(item, index) in dataList"
        :key="item.area"
        :label="item.area"
        align="center"
      >
        <el-table-column
          label="有效通电"
          align="center"
          prop="countConPhoneNum"
          min-width="80"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.list[index].countConPhoneNum }}
          </template>
        </el-table-column>
        <el-table-column
          label="总通电量"
          align="center"
          prop="countPhoneNum"
          min-width="80"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.list[index].countPhoneNum }}
          </template>
        </el-table-column>
        <el-table-column
          label="个案量"
          align="center"
          prop="countCasePhoneNum"
          min-width="80"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.list[index].countCasePhoneNum }}
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <p v-else style="text-align:center">暂无数据</p>
    <!--<el-pagination
      v-if="total > 0"
      class="pagination-wrap"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[50, 100, 200, 500, 1000]"
      :page-size="pages"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>-->

    <el-dialog
      v-dialogDrag
      title="选择催收员"
      class="dialog-wrap"
      :visible.sync="selectUserVisible"
      :close-on-click-modal="false"
      width="600px"
    >
      <div>
        <el-radio v-model="radio" label="1" fixed>按部门分组</el-radio>
        <el-radio v-model="radio" label="2" fixed>按角色分组</el-radio>
      </div>
      <div class="treeHeight">
        <el-tree
          v-show="radio=='1'"
          ref="tree"
          :data="selectUserTree"
          show-checkbox
          default-expand-all
          node-key="id"
          highlight-current
          :props="defaultProps"
        />
        <el-tree
          v-show="radio=='2'"
          ref="tree2"
          :data="selectUserRoleTree"
          show-checkbox
          default-expand-all
          node-key="id"
          highlight-current
          :props="defaultProps"
        />
      </div>
      <span slot="footer" class="footer">
        <el-button @click="selectUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="onClickSaveUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { PersonList, getUserTree, dataList, selectDataCaseExport } from '@/common/js/statistics-month.js'
import { getUserRoleTree } from '@/common/js/statistics-day.js'

export default {
  name: 'StatisticsMonth',
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
      currentPage4: 1,
      pages: 1,
      total: 0,
      odvName: '',
      dataList: [],
      formInline: { time: '', time2: '' },
      PersonList: [],
      areaList: [],
      clientList: [],
      tableData3: [],
      selectUserRoleTree: [],
      radio: '1'
    }
  },
  computed: {
    pageWidth: function() {
      return `${300 + 240 * this.dataList.length}px`
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
    // }
    //
    //        	}
    //        	   this.tableLoad = false
    //          console.log(this.dataList)
    //        })
  /*  areaList().then(response => {
      this.areaList = response;
    });*/
    this.areaList = this.$store.getters.caseType.催收区域
    /*    clientList().then(response => {
      this.clientList = response;
    });*/
    this.clientList = this.$store.getters.caseType.委托方
    PersonList().then(response => {
      this.PersonList = response
    })

    getUserTree().then(data => {
      this.selectUserTree = [data]
    })

    getUserRoleTree().then(data => {
      this.selectUserRoleTree = data
    })
  },
  methods: {
    onClickSaveUser() {
      let selectDataArr
      if (this.radio === '1') {
        selectDataArr = this.$refs.tree.getCheckedNodes()
      } else {
        selectDataArr = this.$refs.tree2.getCheckedNodes()
      }
      let selectUserNames = ''
      let selectUserIds = []
      if (selectDataArr.length > 0) {
        selectUserNames = selectDataArr
          .filter(item => {
            return item.type === 'user'
          })
          .map(item => {
            return item.name
          })
        selectUserIds = selectDataArr
          .filter(item => {
            return item.type === 'user'
          })
          .map(item => {
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
        this.$refs.tree.setCheckedKeys(this.formInline.odv)
      })
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      let step = 0
      const y = num => num % 3 === 0
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => item.list[step][column.property])

        y(index) && step++

        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        } else {
          sums[index] = 'N/A'
        }
      })
      return sums
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.pageNum = val
    },
    onSubmit() {
      if (
        this.formInline.time == null ||
        this.formInline.time === '' ||
        (this.formInline.time2 == null || this.formInline.time2 === '')
      ) {
        this.$message({
          type: 'error',
          message: '请选择查询时间段!'
        })
        return
      }
      this.loading = true
      this.fullscreenLoading = true
      selectDataCaseExport(this.formInline, this.pageSize, this.pageNum).then(
        response => {
          this.$message({
            type: 'success',
            message: '导出成功!'
          })
          this.loading = false
          this.fullscreenLoading = false
        }
      )
    },
    clench() {
      this.formInline = {
        areas: [],
        clients: []
      }
      this.odvName = null
    },
    query() {
      if (
        this.formInline.time == null ||
        this.formInline.time === '' ||
        (this.formInline.time2 == null || this.formInline.time2 === '')
      ) {
        this.$message({
          type: 'error',
          message: '请选择查询时间段!'
        })
        return
      }
      this.loading = true
      this.fullscreenLoading = true
      dataList(this.formInline)
        .then(response => {
          this.tableData3 = response.list
          this.dataList = []
          for (var i = 0; i <= response.list[0].list.length; i++) {
            for (var j in response.list[0].list[i]) {
              if (j === 'area') {
                const item = { area: '' }
                item.area = response.list[0].list[i].area
                this.dataList.push(item)
              }
            }
          }
          this.loading = false
          this.fullscreenLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
#statistics-month {
  .selectMonthStyle{
    width: 350px;
  }
}
</style>
