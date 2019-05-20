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
              :header-cell-style="discountHeaderStyle1"
              style="width: 100%;margin-top:50px;"
              highlight-current-row
              height="1"
              class="table-wrap">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="条线">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="累计还款金额">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="提成">
              <span>{{ props.row.id }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="业务员"
      >
      </el-table-column>

      <el-table-column
        prop="amount"
        label="回款总额"
        align="center"
      >
      </el-table-column>

      <el-table-column
        prop="commission"
        label="提成总额"
        align="center"
      >
      </el-table-column>


    </el-table>

  </div>
</template>


<script>
  import {loadDataManage} from '@/common/js/collect-director.js'

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
        tableData: [],
      }
    },
    methods: {

    },

    created() {
      clientList().then((response) => {
        this.dataList = response
      })
    },
  }
</script>

<style lang="scss" scoped>
  #collect-director-manage {
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
