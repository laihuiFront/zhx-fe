<template>
  <div id="setting-reward" class="page-wraper-sub"
  	v-loading="loading"
   	 element-loading-text="拼命加载中"
   	 v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.7)">

    <div slot="header" style="text-align: right;margin-right: 20px;margin-bottom: 20px;">
      <el-button type="primary" @click="onclickSave" >保存</el-button>
    </div>
   <el-table  v-loading ="tableLoad"
    :data="dataList"
    border
    :header-cell-style="discountHeaderStyle1"
    style="width: 100%;"
    highlight-current-row
    height="1"
    class="table-wrap">
    <el-table-column
      prop="client"
      align="center"
      label="提成计算方式"
     >
    </el-table-column>

     <el-table-column label="业务员提成" align="center">
      <el-table-column
        prop="enable"
        label="基础提成"
        align="center"
       >
      </el-table-column>
      <el-table-column
        prop="odvLowMsg"
        label="低标"
        align="center"
       >
        <template slot-scope="scope">
          <span v-if="scope.row.id ===108">委案金额 </span>
          <span v-if="scope.row.id ===109">超过委案金额 </span>
          <el-input
            v-if="scope.row.editType==='edit' "
            align="center"
            v-model="scope.row.odvLowMsg"
          ></el-input>
          <span v-else>{{scope.row.odvLowMsg}}</span>
          <span v-if="scope.row.enable ==='阶梯累加'">%</span>
          <span v-if="scope.row.enable ==='特殊1'">%</span>
          <span v-if="scope.row.enable ==='特殊2'">元/户</span>
        </template>
      </el-table-column>
       <el-table-column label="低标提成" align="center">
      <el-table-column
        prop="odvBasicMsg"
        label="hide1"
        align="center"
       >
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.editType==='edit' "
            align="center"
            v-model="scope.row.odvBasicMsg"
          ></el-input>
          <span v-else>{{scope.row.odvBasicMsg}}</span>
          <span v-if="scope.row.enable ==='特殊2'">户</span>
          <span v-else>万</span>
        </template>
      </el-table-column>
       <el-table-column
         prop="odvRewardMsg"
         label="hide2"
         min-width="150"
         align="center"
       >
         <template slot-scope="scope">
           <span v-if="scope.row.id ===108">委案金额 </span>
           <span v-if="scope.row.id ===109">超过委案金额 </span>
           <el-input
             v-if="scope.row.editType==='edit' &&  scope.row.id!=110 && scope.row.id!=170"
             align="center"
             v-model="scope.row.odvRewardMsg"
           ></el-input>
           <span v-if="scope.row.editType!='edit' &&  scope.row.id!=110  && scope.row.id!=170">{{scope.row.odvRewardMsg}}</span>
           <span v-if="scope.row.enable ==='阶梯累加'">%</span>
           <span v-if="scope.row.enable ==='特殊1'">%</span>
           <span v-if="(scope.row.id===110 || scope.row.id===170) && scope.row.editType==='edit'" >
             <el-input  align="center" v-model="scope.row.odvRewardRange1Msg"></el-input>%≤综合户达率<<el-input  align="center" v-model="scope.row.odvRewardRange2Msg"></el-input>%  <el-input  align="center" v-model="scope.row.manageRewardMsg"></el-input>元/户<br>
             <el-input  align="center" v-model="scope.row.odvRewardRange3Msg"></el-input>%≤综合户达率<<el-input  align="center" v-model="scope.row.odvRewardRange4Msg"></el-input>%  <el-input  align="center" v-model="scope.row.odvReward2Msg"></el-input>元/户<br>
             综合户达率≥<el-input  align="center" v-model="scope.row.odvRewardRange5Msg"></el-input>%  <el-input  align="center" v-model="scope.row.odvReward3Msg"></el-input>元/户
           </span>
           <span v-if="(scope.row.id===110 || scope.row.id===170) && scope.row.editType!='edit'" >
             {{scope.row.odvRewardRange1Msg}}%≤综合户达率<{{scope.row.odvRewardRange2Msg}}%  {{scope.row.manageRewardMsg2Msg}}元/户<br>
             {{scope.row.odvRewardRange3Msg}}%≤综合户达率<{{scope.row.odvRewardRange4Msg}}%  {{scope.row.odvReward2Msg}}元/户<br>
             综合户达率≥{{scope.row.odvRewardRange5Msg}}%  {{scope.row.odvReward3Msg}}元/户
           </span>
         </template>
       </el-table-column>
       </el-table-column>
       <el-table-column
         prop="odvHighBasicMsg"
         label="高标"
         align="center">
         <template slot-scope="scope">
           <el-input
             v-if="scope.row.editType==='edit' && scope.row.id!=110 && scope.row.id!=170"
             align="center"
             v-model="scope.row.odvHighBasicMsg"
           ></el-input>
           <span v-if="scope.row.editType!='edit' && scope.row.id!=110 && scope.row.id!=170">{{scope.row.odvHighBasicMsg}}</span>
           <span v-if="scope.row.id!=110 && scope.row.id!=170">万</span>
         </template>
       </el-table-column>
       <el-table-column
         prop="odvHighRewardMsg"
         label="高标提成"
         align="center">
         <template slot-scope="scope">
           <el-input
             v-if="scope.row.editType==='edit'  &&  scope.row.id!=110 && scope.row.id!=170"
             align="center"
             v-model="scope.row.odvHighRewardMsg"
           ></el-input>
           <span v-if="scope.row.editType!='edit' &&  scope.row.id!=110 && scope.row.id!=170">{{scope.row.odvHighRewardMsg}}</span>
           <span v-if="scope.row.id!=110 && scope.row.id!=170">%</span>
         </template>
       </el-table-column>
    </el-table-column>
      <el-table-column
        prop="manageRewardMsg"
        label="经理提成（以业务员提成/业绩为低标标准）"
        min-width="180"
        align="center"
       >
        <el-table-column
          prop="manageMethod"
          label="提成方式"
          align="center"
        >
          <template slot-scope="scope">
            <el-select class="selectClass" v-if="scope.row.editType==='edit'" v-model="scope.row.manageMethod"  placeholder="请选择提成方式" clearable>
              <el-option
                v-for="item in methodList"
                :key="item.id"
                :label="item.userName"
                :value="item.id">
              </el-option>
            </el-select>
            <span v-else>{{scope.row.manageMethod}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="odvBasicMsg"
          label="提成"
          min-width="160"
          align="center"
        >
        <template slot-scope="scope">
          <span v-if="scope.row.editType==='edit' &&  scope.row.id!=110 && scope.row.id!=170">
            <el-input  align="center" v-model="scope.row.manageRewardMsg"></el-input>
            低标<br>
            过低标人数*
            <el-input  align="center" v-model="scope.row.manageRewardRange1Msg"></el-input>元/人+过低标员工提成*
            <el-input  align="center" v-model="scope.row.manageRewardRange2Msg"></el-input>%
          </span>
          <span v-if="scope.row.editType==='edit' &&  (scope.row.id===110 || scope.row.id===170)">
            上汽短期 综合户达率≥
            <el-input  align="center" v-model="scope.row.manageRewardRange1Msg"></el-input>% 提成
            <el-input  align="center" v-model="scope.row.manageRewardMsg"></el-input>元<br>
            安吉蓝海 综合户达率≥<el-input  align="center" v-model="scope.row.manageRewardRange2Msg"></el-input>% 提成
            <el-input  align="center" v-model="scope.row.manageRewardRange3Msg"></el-input>元<br>
            上汽短期 总回款完成率≥<el-input  align="center" v-model="scope.row.manageRewardRange4Msg"></el-input>%
            提成<el-input  align="center" v-model="scope.row.manageRewardRange5Msg"></el-input>元<br>
            以上3个指标全部达成  奖励<el-input  align="center" v-model="scope.row.manageRewardRange6Msg"></el-input>元</span>
          <span v-if="scope.row.editType!='edit' &&  (scope.row.id===110 || scope.row.id===170)">上汽短期 综合户达率≥{{scope.row.manageRewardRange1Msg}}% 提成{{scope.row.manageRewardMsgMsg}}元<br>
安吉蓝海 综合户达率≥{{scope.row.manageRewardRange2Msg}}% 提成{{scope.row.manageRewardRange3Msg}}元<br>上汽短期 总回款完成率≥{{scope.row.manageRewardRange4Msg}}% 提成{{scope.row.manageRewardRange5Msg}}元<br>以上3个指标全部达成  奖励{{scope.row.manageRewardRange6Msg}}元</span>
          <span v-if="scope.row.editType!='edit' &&  scope.row.id!=110 && scope.row.id!=170">{{scope.row.manageRewardMsg}}低标<br>
过低标人数*{{scope.row.manageRewardRange1Msg}}元/人+过低标员工提成*{{scope.row.manageRewardRange2Msg}}%</span>
        </template>
        </el-table-column>
      </el-table-column>

     <el-table-column prop="address" label="操作" align="center">
       <template slot-scope="scope">
         <el-button
           type="text"
           @click="onClickEdit(scope.row)"
         >修改</el-button>
       </template>
     </el-table-column>
  </el-table>
    <div style="margin-top:30px;text-align: center;">
      <el-input type="textarea" v-model="tips" style="width: 400px;" placeholder="请输入备注"
              rows="4"></el-input>
    </div>
  </div>
</template>

<script>
	import {clientList,updatePercent,updateRemark,findRemark} from '@/common/js/api-reward.js'
  export default {
    name: 'setting-reward',
    data(){
      return {
        tableLoad:false,
        detailVisible:false,
        tips:"",
        disableSave:true,
        loading:false,
        methodList:[{"id":"按业务员","userName":"按业务员"},{"id":"按业绩","userName":"按业绩"}],
        fullscreenLoading:false,
        dataList:[]
      }
  },
 methods: {
   discountHeaderStyle1({ row, column, rowIndex, columnIndex }) {
    if (rowIndex == 2) {
      return { display: 'none' }
    }
  },
   objectSpanMethod({ row, column, rowIndex, columnIndex }) {
     if (columnIndex === 0) {
       if (rowIndex === 0 || rowIndex === 11){
         return {
           rowspan: 1,
           colspan: 1
         };
       }else if (rowIndex === 1) {
         return {
           rowspan: 3,
           colspan: 1
         };
       }else if(rowIndex === 4) {
         return {
           rowspan: 5,
           colspan: 1
         };
       }else if(rowIndex ===9) {
         return {
           rowspan: 2,
           colspan: 1
         };
       } else {
         return {
           rowspan: 1,
           colspan: 0
         };
       }
     }else if (columnIndex === 1) {
       if(rowIndex ===9) {
         return {
           rowspan: 2,
           colspan: 1
         };
       } else  if(rowIndex ===10){
         return {
           rowspan: 1,
           colspan: 0
         };
       }else {
         return {
           rowspan: 1,
           colspan: 1
         };
       }
     }
   },


   onclickSave(){
     updatePercent(this.dataList).then((response)=>{
       updateRemark(this.tips).then((response)=>{

       })
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

   },
 },
 created() {
          clientList().then((response)=>{
          	this.dataList=response
          })
          findRemark().then((response)=>{
           this.tips=response.remark
         })

  },
 }
</script>

<style lang="scss">
#setting-reward{
   .el-input{
     width:20px;
   }
  .selectClass .el-input{
    width:100px !important;
    text-align: center;
  }
    .el-select .el-input__inner{
      text-align: center;
      width:100px !important;
    }
  .el-input .el-input__inner{
    text-align: center;
    width:20px;
    padding-left: 0px;
    padding-right: 0px;
  }

  .has-gutter .gutter{
    display:block !important;
  }
}
</style>


