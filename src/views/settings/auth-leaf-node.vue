<template>
  <li class="leaf-node-wrap">
    <p class="text" :class="{'top-level':data.menuLevel==='1'}">
      <el-checkbox :disabled="data.menuLabel==='首页' || editType === 'query'" v-model="data.select">{{data.menuLabel}}</el-checkbox>
    </p>
    <ul class="button-wrap" v-if="data.buttonList">
      <li class="button-item" v-for="(btn) in data.buttonList" :key="btn.id">
        <el-checkbox :disabled="editType === 'query'" @change="onSelectChange" v-model="btn.select">{{btn.buttonLabel}}</el-checkbox>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'authLeafNode',
  props: {
    data:{},
    editType: ''
  },
  methods:{
    onSelectChange(val){
      if(val){
        this.$set(this.data, 'select', true)
      }
    }
  }
}
</script>

<style lang="scss">
.leaf-node-wrap{
  .text{
    line-height: 28px;
    margin-bottom: 12px;
    &.top-level{
      background: #f8f8f8;
    }
  }
  .button-wrap{
    margin:12px 0 12px 24px;
  }
}
</style>

