<template>
  <div id="setting-log">
    <el-form ref="form" :model="queryForm" :inline="true">
      <el-form-item>
        <el-input v-model="queryForm.name" clearable placeholder="请输入日志类型"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryForm.name" clearable placeholder="请输入用户ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryForm.name" clearable placeholder="请输入操作人名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryForm.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">重置</el-button>
        <el-button type="primary">删除</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getLogType} from '@/common/js/api-setting'
export default {
  name: 'settingLog',
  data() {
    return {
      queryForm: {
      },
      logType:[]
    }
  },
  watch: {
    logType: {
      immediate: true,
      handler: () => {
        getLogType().then((response)=>this.logType = response)
      }
    }
  }
}
</script>

<style lang="scss">
#setting-log{}
</style>


