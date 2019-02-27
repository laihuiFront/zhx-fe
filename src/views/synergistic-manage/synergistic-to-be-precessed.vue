<template>
  <div id="synergistic-to-be-precessed" class="page-wraper-sub">
    <el-tabs v-model="tabName">
      <el-tab-pane label="协催申请" name="1"></el-tab-pane>
      <el-tab-pane label="待办协催" name="2"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'synergisticToBePrecessed',
  components:{},
  data(){
    return {
      tabName:'1',
      recordList: [],
      total:0,
      queryForm:{
        pageNum: 1,
        pageSize: 10,
      }
    }
  },
  methods: {
    onSelectRow(){},
    onClickQuery(){},
    handleCommand(){}
  }
}
</script>

<style lang="scss">
#synergistic-to-be-precessed{}
</style>

