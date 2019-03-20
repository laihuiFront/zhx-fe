<template>
  <div id="layout">
    <top-menu class="top-wrap"></top-menu>
    <tab-menu class="tab-wrap"></tab-menu>
    <section class="page-wrap">
      <keep-alive :exclude="exclude">
        <router-view/>
      </keep-alive>
      <!--<router-view/>-->
    </section>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex';

const TopMenu = () => import('@/components/top-menu/top-menu')
const TabMenu = () => import('@/components/tab-menu/tab-menu')
export default {
  name: 'layout',
  data(){
    return{

    }
  },
  components: {
    TopMenu,
    TabMenu
  },
  methods:{
    ...mapMutations(['SET_CACHEFLUSHFLAG'])
  },
  watch:{
    exclude(n){
      if (n) {
        this.$nextTick(()=>{
          this.SET_CACHEFLUSHFLAG(false);
        })
      }
    },
  },
  computed:{
    ...mapState(['cacheflushFlag']),
    exclude(){
      return this.cacheflushFlag ? /.+/ : '';
    },
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
    position: relative;
  	overflow-x:hidden;
  	overflow-y:auto;
    flex:1;
    margin: 16px;
	  border-radius: 5px;
  }
}
</style>

