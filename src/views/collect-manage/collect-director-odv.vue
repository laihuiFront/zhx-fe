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
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="showRepay(scope.row.line)">
                {{scope.row.line}}
              </el-button>
            </template>
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

    <el-dialog
      title="还款详情"
      class="dialog-wrap"
      :visible.sync="detailVisible"
      :close-on-click-modal="false"
      width="800px"
      v-dialogDrag
    >
      <el-table highlight-current-row
                :data="repayList"
                class="table-wrap"
                height="1"
                border
                style="margin-top:10px;min-height:390px;margin-bottom: 40px;"
                stripe
      >

        <el-table-column
          prop="dataCase.seqNo"
          align="center"
          label="个案序列号"
        >
        </el-table-column>

        <el-table-column
          prop="repayDate"
          label="还款日期"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="repayMoneyMsg"
          label="还款金额"
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
  import {loadDataOdv,showRepay} from '@/common/js/collect-director.js'

  export default {
    name: 'collect-director-odv',
    data() {
      return {
        tableLoad: false,
        detailVisible: false,
        loading: false,
        fullscreenLoading: false,
        dataList: [],
        repayList:[]
      }
    },
    methods: {
      showRepay(line){
        showRepay({"line":line}).then((response) => {
          this.repayList = response
          this.detailVisible = true
        })
      }
    },

    created() {
      loadDataOdv().then((response) => {
        this.dataList = response
      })

    },
  }
</script>

<style lang="scss" >
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
    tr.current-row > td{
      border-top: 1px solid #0080ff  !important;
      border-bottom: 1px solid #0080ff  !important;
    }
  }
</style>
