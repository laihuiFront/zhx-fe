<template>
  <div id="setting-remind" class="page-wraper-sub">
     <el-table highlight-current-row class="table-wrap"
      :data="tableData" 
      ref="tableData"    
      v-loading="tableLoad">
      <el-table-column
        prop="statusMsg"
        align="center"
        label="是否显示停止跟进和恢复跟进按钮">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="120" prop="status">         
          <el-switch
            v-model="status"
            active-color="#13ce66"
            active-value="1"
            inactive-value="2"
            @change="changeStatus">
          </el-switch>          
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {list,update} from '@/common/js/setting-tel-btn';
export default {
  name: 'settingTelBtn',
  data(){
    return{
      tableLoad:false,
      tableData:[],   
      status:'1'    
    }
  },
  created(){
    this.init();
  },
  methods:{
    changeStatus(status){
      this.tableLoad = true
        update({"status":status}).then((data)=>{
          this.getMainData();         
            this.$message({
              message: '操作成功',
              type: 'success'
            });   
        });
    },
    getMainData(){     
      this.tableLoad = true
      list().then((data)=>{
        if(data[0].status==2){
          this.status='2'
        }
        this.tableData=data
        this.tableLoad = false
      });
    },
    init(){
      this.getMainData();
    }
  }
}
</script>

<style lang="scss">
#setting-remind{
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
}
</style>

