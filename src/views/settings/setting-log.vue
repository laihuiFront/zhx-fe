<template>
  <div id="setting-log" class="page-wraper">
    <el-form ref="form" :model="queryForm" :inline="true">
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
          start-placeholder="日志开始日期"
          end-placeholder="日志结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onClickQuery">查询</el-button>
        <el-button type="primary" @click="onClickReset">重置</el-button>
        <el-button type="primary" @click="onClickDelete">删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      @selection-change="onSelectRow"
      :data="logList"
      style="width: 100%"
      class="table-wrap">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="日志时间">
      </el-table-column>
      <el-table-column
        prop="logContent"
        label="日志内容"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="userName"
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
      :total="1000"
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
      queryForm: {
        pageNum: 1,
        pageSize: 10,
        date:[]
      },
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
      getOperationLog(data).then(response => this.logList = response)
    },
    onSelectRow(val){
      this.deleteList = val
    }
  }
}
</script>

<style lang="scss">
#setting-log{
}
</style>


