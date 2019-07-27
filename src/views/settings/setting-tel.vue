<template>
  <div id="setting-tel" class="page-wraper-sub"
       v-loading="loading"
       element-loading-text="拼命加载中"
       v-loading.fullscreen.lock="fullscreenLoading"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.7)">

    <div slot="header" style="text-align: right;margin-right: 20px;margin-bottom: 20px;">
      <el-button type="primary" @click="onclickSave" >保存</el-button>
    </div>
    <el-table v-loading ="tableLoad"
              border
              style="width: 100%;"
              :data="tableData"
              height="1"
              class="table-wrap">
      <el-table-column
        prop="address"
        align="center"
        label="呼叫中心IP"
      >
        <template slot-scope="scope">
          <el-input
            clearable
            align="center"
            v-model="scope.row.address"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="customer"
        align="center"
        label="账号"
      >
        <template slot-scope="scope">
          <el-input
            clearable
            align="center"
            v-model="scope.row.customer"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="psw"
        align="center"
        label="密码"
      >
        <template slot-scope="scope">
          <el-input
            clearable
            align="center"
            v-model="scope.row.psw"
          ></el-input>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  import {findOne,update} from '@/common/js/api-tel.js'
  export default {
    name: 'setting-tel',
    data(){
      return {
        tableLoad:false,
        loading:false,
        fullscreenLoading:false,
        tableData:[],
      }
    },
    methods: {
      onclickSave(){
        update(this.tableData).then((response)=>{
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
        })
      }
    },
    created() {
      findOne().then((response)=>{
        this.tableData.push(response)
      })

    },
  }
</script>

<style lang="scss">
  #setting-tel{
    .el-select .el-input__inner{
      text-align: center;
    }
    .el-input .el-input__inner{
      text-align: center;
      padding: 0;
    }

    .has-gutter .gutter{
      display:block !important;
    }
    .el-table__body tr.current-row > td{
      border-top: 1px solid #0080ff  !important;
      border-bottom: 1px solid #0080ff  !important;
    }
  }
</style>
