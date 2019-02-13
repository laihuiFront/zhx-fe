<template>
  <div id="layout">
    <top-menu class="top-wrap"></top-menu>
    <tab-menu class="tab-wrap"></tab-menu>
    <section class="page-wrap">
      <router-view/>
    </section>
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
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .top-wrap{
    flex: 0 0 80px;
    height: 80px;
  }
  .tab-wrap{
    flex: 0 0 35px;
    height: 35px;
  }
  .page-wrap{
  	overflow-x:hidden;
  	overflow-y:auto;
    flex:1;
    margin: 16px;
	  border-radius: 5px;
  }
}
</style>

