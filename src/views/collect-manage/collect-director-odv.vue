<template>
  <div id="collect-director-odv" class="page-wraper-sub"
       v-loading="loading"
       element-loading-text="拼命加载中"
       v-loading.fullscreen.lock="fullscreenLoading"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.7)">
        <el-table v-loading="tableLoad"
                  :data="dataList"
                  border
                  style="width: 100%;margin-top:50px;"
                  highlight-current-row
                  height="1"
                  class="table-wrap">
          <el-table-column
            prop="line"
            align="center"
            label="条线"
          >
          </el-table-column>

            <el-table-column
              prop="repayAmt"
              label="累计还款金额"
              align="center"
            >
            </el-table-column>

            <el-table-column
              prop="percentage"
              label="提成"
              align="center"
            >
            </el-table-column>
        </el-table>

  </div>
</template>


<script>
  import {loadDataOdv} from '@/common/js/collect-director.js'

  export default {
    name: 'collect-director-odv',
    data() {
      return {
        tableLoad: false,
        detailVisible: false,
        loading: false,
        fullscreenLoading: false,
        dataList: [],
      }
    },
    methods: {

    },

    created() {
      loadDataOdv().then((response) => {
        this.dataList = response
      })
    },
  }
</script>

<style lang="scss" scoped>
  #collect-director-odv {
    overflow-y: hidden !important;

    .el-input {
      width: 40px;
    }


    .el-table__body-wrapper {
      overflow-x: hidden;
    }


    .has-gutter .gutter {
      display: block !important;
    }

  }
</style>
