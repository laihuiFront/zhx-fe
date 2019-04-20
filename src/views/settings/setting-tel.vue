<template>
  <div id="setting-tel" class="page-wraper-sub"
       v-loading="loading"
       element-loading-text="拼命加载中"
       v-loading.fullscreen.lock="fullscreenLoading"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.7)">

    <div slot="header" style="text-align: right;margin-right: 20px;margin-bottom: 20px;">
      <el-button type="primary" :disabled="disableSave" @click="onclickSave" >保存</el-button>
    </div>
    <el-table v-loading ="tableLoad"
              border
              stripe
              style="width: 100%;"
              highlight-current-row
              :data="tableData"
              height="1"
              class="table-wrap">
      <el-table-column
        prop="address"
        align="center"
        label="拨号服务器地址"
      >
        <template slot-scope="scope">
          <el-input
            v-if="editType==='edit' "
            clearable
            align="center"
            v-model="scope.row.address"
          ></el-input>
          <span v-else>{{scope.row.address}}</span>
        </template>
      </el-table-column>

      <el-table-column  label="操作" align="center" width="100px">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="onClickEdit(scope.row)"
          >修改</el-button>
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
        disableSave:true,
        loading:false,
        editType:"",
        fullscreenLoading:false,
        tableData:[],
      }
    },
    methods: {
      onclickSave(){
        update(this.tableData).then((response)=>{
          this.disableSave = true
          this.editType="";
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
        })
      },
      onClickEdit(row){
        this.editType = "edit";
        this.disableSave = false
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
    }

    .has-gutter .gutter{
      display:block !important;
    }
  }
</style>


