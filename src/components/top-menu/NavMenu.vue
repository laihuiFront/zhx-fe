<template>
  <div class="navMenu">
    <label v-for="navMenu in navMenus" :key="navMenu.id.toString()">
      <el-menu-item v-if="!navMenu.children" :key="navMenu.id.toString()" :data="navMenu" :index="navMenu.id.toString()" :route="`/zhx${navMenu.menuUrl}`">
        <i :class="navMenu.menuIcon"></i>
        <span slot="title">{{navMenu.menuLabel}}</span>
      </el-menu-item>

      <el-submenu v-else :key="navMenu.id.toString()" :data="navMenu" :index="navMenu.id.toString()">
        <template slot="title">
          <i :class="navMenu.menuIcon"></i>
          <span> {{navMenu.menuLabel}}</span>
        </template>
        <NavMenu :navMenus="navMenu.children"></NavMenu>
      </el-submenu>
    </label>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  props: ['navMenus']
}
</script>

<style scoped>

</style>