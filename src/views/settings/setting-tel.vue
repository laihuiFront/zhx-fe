<template>
  <div id="setting-tel" class="page-wraper-sub"
       v-loading="loading"
       element-loading-text="拼命加载中"
       v-loading.fullscreen.lock="fullscreenLoading"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.7)">

    <div slot="header" style="margin-bottom: 20px;">
      <el-button type="primary" @click="addCallCenter">新增</el-button>
      <el-button type="primary" @click="delCallCenters">删除</el-button>
    </div>
    <el-table v-loading ="tableLoad"
              :data="tableData"
              @selection-change="selectionChange">
      <el-table-column type="selection" align="center" width="55"></el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="名称"
        min-width="80"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="IP"
        min-width="80"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="customer"
        align="center"
        label="账号"
        min-width="80"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="psw"
        align="center"
        label="密码"
        min-width="120"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="editCallCenter(scope.row.id)">修改</el-button>
          <el-button type="text" @click="deleteCallCenter(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="450px"
      v-dialogDrag
      class="dialog-wrap"
    >
      <el-form :model="callCenter" status-icon :rules="rules" ref="callCenter" label-width="60px" class="callCenter">
        <el-form-item label="名称" prop="name">
          <el-input v-model="callCenter.name"></el-input>
        </el-form-item>
        <el-form-item label="IP" prop="address">
          <el-input v-model="callCenter.address"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="customer">
          <el-input v-model="callCenter.customer"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="psw">
          <el-input v-model="callCenter.psw"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveCallCenter">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {queryCallCenters,updateCallCenter,addCallCenter,deleteCallCenters,queryCallCenter} from '@/common/js/api-tel.js'
  export default {
    name: 'setting-tel',
    data(){
      return {
        tableLoad:false,
        loading:false,
        fullscreenLoading:false,
        tableData:[],
        selectedIDs: [],
        dialogTitle: '',
        dialogVisible: false,
        saveType: null, // 0:新增 1:编辑
        callCenter: {
          id: null,
          name: null,
          address: null,
          customer: null,
          psw: null
        },
        callCenterInit: null,
        rules:{
          name: [
            { required: true, message: '请输入呼叫中心名称', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入IP', trigger: 'blur' }
          ],
          customer: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          psw: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      query(){
        this.tableLoad = true
        queryCallCenters().then((response)=>{
          this.tableData = response
          this.tableLoad = false
        })
      },
      selectionChange(selection){
        this.selectedIDs = selection.map(row => row.id)
      },
      addCallCenter(){
        const form = this.$refs.callCenter
        if(form){
          form.resetFields()
        }
        this.callCenter = {... this.callCenterInit}

        this.saveType = 0
        this.dialogTitle = '新增呼叫中心'
        this.dialogVisible = true
      },
      saveCallCenter(){
        this.loading = true
        if(this.saveType == 0){
          addCallCenter(this.callCenter).then(()=>{
            this.$message({
              type: 'success',
              message: '保存成功！'
            })
            this.dialogVisible = false
            this.query()
          }).catch(() => {

          }).finally(() => {
            this.loading = false
          })
        }else{
          updateCallCenter(this.callCenter).then((response)=>{
            this.$message({
              type: 'success',
              message: '保存成功！'
            })
            this.dialogVisible = false
            this.query()
          }).catch(() => {

          }).finally(() => {
            this.loading = false
          })
        }
      },
      delCallCenters(){
        if(this.selectedIDs.length > 0){
          this._deleteCallCenters(this.selectedIDs)
        }else{
          this.$message({
            type: 'error',
            message: '请先在表格中勾选数据！'
          })
        }
      },
      editCallCenter(callCenterID){
        this.loading = true
        queryCallCenter({callCenterID}).then(response => {
          this.callCenter = response
          this.saveType = 1
          this.dialogTitle = '编辑呼叫中心'
          this.dialogVisible = true
        }).catch(() => {

        }).finally(() => {
          this.loading = false
        })
      },
      deleteCallCenter(callCenterID){
        this._deleteCallCenters([callCenterID])
      },
      _deleteCallCenters(callCenterIDs){
        this.$confirm('此操作将删除已勾选的呼叫中心, 是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          deleteCallCenters(callCenterIDs).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
            this.query()
          }).catch(() => {

          }).finally(() => {
            this.loading = false
          })
        }).catch(() => {})
      }
    },
    created() {
      this.callCenterInit = {...this.callCenter}
      this.query()
    },
  }
</script>

<style lang="scss">
  #setting-tel{
    min-height: 100%;

    .has-gutter .gutter{
      display:block !important;
    }
    .el-table__body tr.current-row > td{
      border-top: 1px solid #0080ff  !important;
      border-bottom: 1px solid #0080ff  !important;
    }

    .callCenter .el-select{
      display: block;
    }
  }
</style>
