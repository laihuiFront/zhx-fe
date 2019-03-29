<template>
  <div id="setting-reward" class="page-wraper-sub"
  	v-loading="loading"
   	 element-loading-text="拼命加载中"
   	 v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.7)">

    <div slot="header" style="text-align: right;margin-right: 20px;margin-bottom: 20px;">
      <el-button type="primary" :disabled="disableSave" @click="onclickSave" >保存</el-button>
    </div>
   <el-table highlight-current-row v-loading ="tableLoad"
    :data="dataList"
    border
    stripe
    style="width: 100%;overflow-x: hidden;"
    highlight-current-row>
    <el-table-column
      prop="client"
      align="center"
      label="委托方"
     >
      <template slot-scope="scope">
        <span v-if="1===2">{{scope.row.client}}</span>
        <span v-else>{{scope.row.clientMsg}}</span>
      </template>
    </el-table-column>
     <el-table-column
       prop="enable"
       align="center"
       label="适用"
     >
       <template slot-scope="scope">
         <el-select v-model="scope.row.enable" align="center" style="text-align: center;" v-if="scope.row.editType==='edit'" clearable @change="changeEnable(scope.row)">
           <el-option
             v-for="item in enableList"
             :key="item.id"
             align="center"
             :label="item.name"
             :value="item.id">
           </el-option>
         </el-select>
         <span v-else>{{scope.row.enableMsg}}</span>
       </template>
     </el-table-column>
     <el-table-column label="催收员" align="center">
      <el-table-column
        prop="odvLowMsg"
        label="低标（万）"
        align="center"
       >
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.editType==='edit' "
            clearable
            align="center"
            @input="changeLow(scope.row)"
            v-model="scope.row.odvLowMsg"
          ></el-input>
          <span v-else>{{scope.row.odvLowMsg}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="odvBasic"
        label="基础提成（%）"
        align="center"
       >
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.editType==='edit'"
            clearable
            align="center"
            v-model="scope.row.odvBasic"
          ></el-input>
          <span v-else>{{scope.row.odvBasic}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="odvReward"
        label="奖励提成（%）"
        align="center"
       >
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.editType==='edit'"
            clearable
            align="center"
            :disabled="scope.row.rewardDisable"
            v-model="scope.row.odvReward"
          ></el-input>
          <span v-else>{{scope.row.odvReward}}</span>
        </template>
      </el-table-column>
       <el-table-column
         prop="odvRemark"
         label="提成说明"
         align="center">
         <template slot-scope="scope">
           <el-input
             v-if="scope.row.editType==='edit'"
             clearable
             align="center"
             :disabled="scope.row.remarkDisable"
             v-model="scope.row.odvRemark"
           ></el-input>
           <span v-else>{{scope.row.odvRemark}}</span>
         </template>
       </el-table-column>
    </el-table-column> 
     <el-table-column label="经理" align="center">
      <el-table-column
        prop="manageReward"
        label="提成（%）"
        align="center"
       >
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.editType==='edit'"
            clearable
            align="center"
            v-model="scope.row.manageReward"
          ></el-input>
          <span v-else>{{scope.row.manageReward}}</span>
        </template>

      </el-table-column>
      <el-table-column
        prop="manageRemark"
        label="提成说明"
        align="center"
       >
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.editType==='edit'"
            clearable
            align="center"
            :disabled="scope.row.remarkDisable"
            v-model="scope.row.manageRemark"
          ></el-input>
          <span v-else>{{scope.row.manageRemark}}</span>
        </template>
      </el-table-column>
    </el-table-column>

     <el-table-column prop="address" label="操作">
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
	import {clientList,updatePercent} from '@/common/js/api-reward.js'
  export default {
    name: 'setting-reward',
    data(){
      return {
        tableLoad:false,
        disableSave:true,
        loading:false,
        fullscreenLoading:false,
        dataList:[],
        enableList:[{id:1,name:"是"},{id:2,name:"否"}],
      }
  },
 methods: {
   changeLow(row){
     let odvLow = row.odvLowMsg.replace(/\s\r/g, "");
     if (odvLow=="-"){
       row.rewardDisable = true
      // this.$set(row,'rewardDisable',true);
     }else{
       row.rewardDisable = false
      // this.$set(row,'rewardDisable',false);
     }
   },

   arraySpanMethod({ row, column, rowIndex, columnIndex }) {
     if (row.odvLow){
       let odvLow = row.odvLowMsg.replace(/\s\r/g, "");
       if (odvLow=="-"){
         if (columnIndex === 3) {
           return [1, 2];
         } else if (columnIndex === 4) {
           return [0, 0];
         }
       }
     }
   },
   changeEnable(row){

     if(row.enable==1){
       row.remarkDisable = false;
     }else{
       row.remarkDisable = true;
     }


   },
   onclickSave(){
     updatePercent(this.dataList).then((response)=>{
       this.$message({
         type: 'success',
         message: '保存成功!'
       });
       clientList().then((response)=>{
         this.dataList=response
       })
     })
   },
   onClickEdit(row){
     row.editType = "edit";
     this.disableSave = false;
     if (row.odvReward=="" || row.odvReward=="-"){
       row.rewardDisable = true
     }else{
       row.rewardDisable = false
     }
     if(row.enable==1){
       row.remarkDisable = false;
     }else{
       row.remarkDisable = true;
     }
   }
 },
 created() {
          clientList().then((response)=>{
          	this.dataList=response
          })

  },
 }
</script>

<style lang="scss">
#setting-reward{
    .el-select .el-input__inner{
      text-align: center;
    }
  .el-input .el-input__inner{
    text-align: center;
  }
}
</style>


