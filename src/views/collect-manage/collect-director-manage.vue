<template>
  <div id="collect-director-manage" class="page-wraper-sub"
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
        prop="odvName"
        align="center"
        label="业务员"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showOdv(scope.row.odv)">
            {{scope.row.odvName}}
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
        prop="repayAmt"
        label="回款总额"
        align="center"
      >
      </el-table-column>

      <el-table-column
        prop="percentage"
        label="提成总额"
        align="center"
      >
      </el-table-column>


    </el-table>

    <el-dialog
      title="催收员提成"
      class="dialog-wrap"
      :visible.sync="detailVisible"
      :close-on-click-modal="false"
      width="800px"
      v-dialogDrag
    >
      <el-table highlight-current-row
                :data="odvList"
                border
                stripe
      >

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
      <span slot="footer" class="footer">
        <el-button @click="detailVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
  import {manageList,showOdv} from '@/common/js/collect-director.js'

  export default {
    name: 'collect-director-odv',
    data() {
      return {
        tableLoad: false,
        detailVisible: false,
        disableSave: true,
        activeName: "tab1",
        loading: false,
        fullscreenLoading: false,
        dataList: [],
        odvList:[]
      }
    },
    methods: {
      showOdv(odv){
        showOdv({"odv":odv}).then((response) => {
          this.odvList = response
          this.detailVisible = true
        })

      }
    },

    created() {
      manageList().then((response) => {
        this.dataList = response
      })
    },
  }
</script>

<style lang="scss">
  #collect-director-manage {
    overflow-y: hidden !important;

    .el-table__body-wrapper {
      overflow-x: hidden;
    }


    .has-gutter .gutter {
      display: block !important;
    }
    tr.current-row > td{
      border-top: 1px solid #0080ff  !important;
      border-bottom: 1px solid #0080ff  !important;
    }

  }
</style>
