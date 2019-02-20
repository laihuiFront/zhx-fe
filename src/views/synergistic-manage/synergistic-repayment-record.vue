<template>
  <div id="synergistic-repayment-record" class="page-wraper-sub">
    <repay-record-query 
      :queryForm="queryForm">
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


