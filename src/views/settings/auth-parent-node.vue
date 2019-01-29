<template>
  <li class="parent-item">
    <p class="text">
      {{data.menuLabel}}
    </p>
    <ul class="child-wrap">
      <component v-for="(item) in data.children" :data="item" :editType="editType" :is="item.leafNode === 1 ?'auth-leaf-node':'auth-parent-node'" :key="item.id"></component>
    </ul>
  </li>
</template>

<script>
import authLeafNode from './auth-leaf-node'
export default {
  name: 'authParentNode',
  components:{
    authLeafNode
  },
  props:{
    data:{},
    editType: ''
  }
}
</script>

<style lang="scss">
.parent-item{
  .text{
    line-height: 28px;
    background: #f8f8f8;
  }
  .child-wrap{
    margin:12px 0 12px 24px;
  }
}
</style>

