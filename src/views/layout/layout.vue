<template>
  <div id="layout">
    <top-menu></top-menu>
    <tab-menu></tab-menu>
    <router-view/>
  </div>
</template>

<script>
const TopMenu = () => import('@/components/top-menu/top-menu')
const TabMenu = () => import('@/components/tab-menu/tab-menu')
export default {
  name: 'layout',
  components: {
    TopMenu,
    TabMenu
  }
}
</script>

<style lang="scss">
#layout{
  height: 100%;
}
</style>

