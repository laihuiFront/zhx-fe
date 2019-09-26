<template>
  <div id="setting-remind" class="page-wraper-sub">

     <el-table highlight-current-row class="table-wrap"
      :data="tableData"
      v-loading="tableLoad">
      <el-table-column
        prop="statusMsg"
        align="center"
        label="是否可以复制证件号码">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-if = "scope.row.status==1" @click="handleClick(2)">禁用</el-button>
          <el-button type="text" size="small" v-if = "scope.row.status==2"  @click="handleClick(1)">启用</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {list,update} from '@/common/js/setting-copy';

export default {
  name: 'settingCopy',
  data(){
    return{
      tableLoad:false,
      tableData:[],
    }
  },
  created(){
    this.init();
  },
  methods:{
    getMainData(){
      this.tableLoad = true
      list().then((data)=>{
        this.tableData = data
        this.tableLoad = false
      });
    },
    handleClick(status){
        this.tableLoad = true
        update({"status":status}).then((data)=>{
          this.getMainData();
          if (status==1){
            this.$message({
              message: '启用成功',
              type: 'success'
            });
          }else if(status==2){
            this.$message({
              message: '禁用成功',
              type: 'success'
            });
          }
        });
    },
    init(){
      this.getMainData();
    },
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
