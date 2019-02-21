<template>
  <div id="synergistic-repayment-record" class="page-wraper-sub">
    <repay-record-query 
      :queryForm="queryForm">
      <el-button type="primary">导入还款记录</el-button>
      <el-button type="primary">新建还款记录</el-button>
      <el-button type="primary">导出选中数据</el-button>
      <el-button type="primary">导出查询结果</el-button>
    </repay-record-query>
  </div>
</template>

<script>
import {RepayRecordQuery} from './components'
export default {
  name: 'synergisticRepaymentRecord',
  components:{
    RepayRecordQuery
  },
  data(){
    return {
      queryForm:{
        pageNum: 1,
        pageSize: 10,
      }
    }
  }
}
</script>

<style lang="scss">
#synergistic-repayment-record{}
</style>


