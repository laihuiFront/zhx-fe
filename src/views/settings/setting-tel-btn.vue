<template>
  <div id="setting-remind" class="page-wraper-sub" v-loading="tableLoad">
    <div class="settingStyle">
      <span class="nameStyle">显示停止跟进和恢复跟进按钮</span>
      <div class="switchStyle">
        <el-switch
          v-model="status"
          active-value="1"
          inactive-value="2"
          @change="changeStatus">
        </el-switch>  
      </div>
    </div>
  </div>
</template>

<script>
import {find,update} from '@/common/js/setting-tel-btn';
export default {
  name: 'settingTelBtn',
  data(){
    return{
      status:'1',
      tableLoad:false    
    }
  },
  created(){
    this.init();
  },
  methods:{
    changeStatus(status){
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
      find().then((data)=>{
        if(data.status==2){
          this.status='2'
        }
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
  .settingStyle{
    display: flex;
    .switchStyle{
      margin-left: 50px;
    }
  }
}
</style>

