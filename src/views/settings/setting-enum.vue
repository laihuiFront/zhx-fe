<template>
  <div id="setting-enum">
    <el-card class="box-card-left">
      <template slot="header">配置项目</template>
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
    <el-card class="box-card-right">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮1</el-button>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮2</el-button>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'settingEnum'
}
</script>

<style lang="scss">
#setting-enum{
  height: 100%;
  display: flex;
  .box-card-left{
    flex: 0 0 300px;
    margin-right: 20px;
    padding: 20px;
    width: 300px;
    height: 100%;
    .el-card__header{
      color: #1e1f24;
      font-size: 14px;
      padding: 0;
      border-bottom: 0;
    }
  }
  .box-card-right{
    flex: 1;
    height: 100%;
  }
}
</style>


