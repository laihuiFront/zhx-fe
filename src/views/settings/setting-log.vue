<template>
  <div id="setting-log" class="page-wraper-sub">
    <el-form ref="form" :model="queryForm" :inline="true" class="query-wrap queryStyle">
      <el-form-item>
        <el-select v-model="queryForm.url" placeholder="请选择日志类型">
          <el-option
            v-for="item in logTypeList"
            :key="item.key"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryForm.userId" clearable placeholder="请输入用户ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryForm.userName" clearable placeholder="请输入操作人名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="queryForm.date"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="daterange"
          range-separator="至"
          start-placeholder="日志日期开始"
          end-placeholder="日志日期结束">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="onClickQuery">查询</el-button>
        <el-button icon="el-icon-refresh" type="primary" @click="onClickReset">重置</el-button>
      </el-form-item>
      <el-form-item class="operation-item">
        <el-button type="primary" @click="onClickDelete" v-has="'删除'">删除</el-button>
      </el-form-item>
    </el-form>
     <el-table highlight-current-row v-loading="tableLoad"
      @selection-change="onSelectRow"
      border stripe
      :data="logList"
      style="width: 100%"
      height="1"
      class="table-wrap">
      <el-table-column
        type="selection"
        align="center"
        width="55">
      </el-table-column>
      <el-table-column
        prop="createTime"
        align="center"
        label="日志时间">
      </el-table-column>
      <el-table-column
        prop="logContent"
        align="center"
        label="日志内容"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="userName"
        align="center"
        label="操作人"
        width="200">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="getLogList"
      @current-change="getLogList"
      :current-page.sync="queryForm.pageNum"
      :page-size.sync="queryForm.pageSize"
      layout="prev, pager, next, jumper,total, sizes"
      :page-sizes="[50, 100, 200, 500]"
      :total="total"
      class="pagination-wrap">
    </el-pagination>
  </div>
</template>

<script>
import {getLogType, getOperationLog, deleteLogs} from '@/common/js/api-setting'
export default {
  name: 'settingLog',
  data() {
    return {
      tableLoad:false,
      queryForm: {
        pageNum: 1,
        pageSize: 50,
        date:[]
      },
      total: 0,
      logTypeList:[],
      logList: [],
      deleteList:[]
    }
  },
  created(){
    getLogType().then((response) => this.logTypeList = response)
    this.getLogList()
  },
  methods: {
    onClickQuery() {
      this.getLogList()
    },
    onClickReset() {
      this.queryForm = {
        date:[],
        pageNum: this.queryForm.pageNum,
        pageSize: this.queryForm.pageSize
      }
    },
    onClickDelete() {
      if(!this.deleteList.length){
        this.$message('请选择需要删除的日志记录')
        return
      }

      this.$confirm('此操作将永久删除日志记录，是否继续？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        const ids = this.deleteList.map(item => item.id)
        deleteLogs(ids).then(()=>{
          this.configData.splice(index,1)
          this.$message('操作日志项删除成功')
        })
      }).catch(()=>{})
    },
    getLogList(){
      const data = {
        pageNum: this.queryForm.pageNum,
        pageSize: this.queryForm.pageSize,
        url: this.queryForm.url,
        userId: this.queryForm.userId,
        userName: this.queryForm.userName,
        createTimeBegin: this.queryForm.date[0],
        createTimeEnd: this.queryForm.date[1]
      }
      this.tableLoad = true
      getOperationLog(data).then(response => {
        this.logList = response.list
        this.total = response.total
        this.tableLoad = false
      })
    },
    onSelectRow(val){
      this.deleteList = val
    }
  }
}
</script>

<style lang="scss">
#setting-log{
  .el-table__body tr.current-row > td{
    border-top: 1px solid #0080ff  !important;
    border-bottom: 1px solid #0080ff  !important;
  }
}
</style>


