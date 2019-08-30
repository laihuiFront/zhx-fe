<template>
  <div id="setting-remind" class="page-wraper-sub">

     <el-table highlight-current-row class="table-wrap"
      height="1"
      :data="tableData"
      border stripe
      v-loading="tableLoad"
      style="width: 100%">

      <el-table-column
        prop="seeFlagMsg"
        align="center"
        label="是否可见">
      </el-table-column>
       <el-table-column
         prop="timeAreaMg"
         align="center"
         label="间隔天数">
       </el-table-column>

      <el-table-column
        align="center"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="600px"
      custom-class="dia-top"
      :close-on-click-modal="false"
      v-dialogDrag
    >
      <el-form
        :model="saveForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="是否可见" prop="roleId">
          <el-select v-model="saveForm.seeFlag" placeholder="请选择是否可见" @change="showDays()"
                     clearable>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="间隔天数" prop="receiveUserName" v-if="daysVisble">
          <el-input  v-model="saveForm.timeArea" type="number" oninput="if(value<0)value=''" style="width:140px;" placeholder="请输入间隔天数"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer" style="display: flex;justify-content: center">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false;saveContent()">发送</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
import {list,update} from '@/common/js/setting-return';

export default {
  name: 'settingRemind',
  data(){
    return{
      daysVisble:true,
      tableLoad:false,
      tableData:[],
      roleList:[{id:0,label:"可见"},{id:1,label:"不可见"}],
      total:0,
      dialogVisible:false,
      saveForm:{id:0,seeFlag:null,timeArea:0}
    }
  },
  created(){
    this.init();
  },
  methods:{
    showDays(){
      if (this.saveForm.seeFlag==null || this.saveForm.seeFlag==0){
        this.daysVisble = true;
      }else{
        this.daysVisble = false;
      }
    },
    saveContent(){
      this.tableLoad = true
      update(this.saveForm).then((data)=>{
        this.getMainData();
        this.$message({
          message: '提交成功',
          type: 'success'
        });
      });
    },
    getMainData(){
      this.tableLoad = true
      list(this.saveForm).then((data)=>{
        this.tableData = data
        this.tableLoad = false
      });
    },
    handleClick(row){
      this.$set(this.saveForm, 'id', row.id);
      this.$set(this.saveForm, 'seeFlag', row.seeFlag);
      this.$set(this.saveForm, 'timeArea', row.timeArea);
      if (row.seeFlag==null || row.seeFlag==0){
        this.daysVisble = true;
      }else{
        this.daysVisble = false;
      }
       this.dialogVisible = true;
    },


    init(){
      this.getMainData();
    },
  }
}
</script>

<style lang="scss">
#setting-remind{
  .el-table__body-wrapper{
    overflow-y: auto;
    overflow-x:hidden;
  }
  .r-list{
    min-width: 220px;
    box-sizing: border-box;
    margin-left: 10px;
    max-width: 220px;
    padding: 10px;
    border: 2px solid #FFDB9B;
    overflow: auto;
    background-color:#FDFBC4 ;
    .tit{
      color: #FFBB52;
      font-size: 18px;
    }
    .cont{
      line-height: 33px;
      color: #D09F6D;
    }
  }
  .dia-top{
    .edui-editor{
      height: 100%;
    }
    #edui1{
      height: 100%;
    }
  }
  .dia-top-inp{
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    align-items: flex-start;

  }
  .el-table__body tr.current-row > td{
    border-top: 1px solid #0080ff  !important;
    border-bottom: 1px solid #0080ff  !important;
  }
}
</style>

