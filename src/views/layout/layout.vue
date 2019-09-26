<template>
  <div id="layout">
    <top-menu class="menu"></top-menu>
    <div class="page">
      <tab-menu class="tab-wrap"></tab-menu>
      <section class="page-wrap">
        <keep-alive :exclude="exclude">
          <router-view/>
        </keep-alive>
        <!--<router-view/>-->
      </section>
    </div>
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  .menu{
    width: 210px;
    height: 100%;
  }
  .page{
    width: calc(100% - 210px);
  }
  .page-wrap{
    width: 100%;
    height: calc(100% - 65px);
    padding: 24px;
    overflow: auto;
    background-color: #F0F2F5;

    > div{
      min-width: 100%;
      min-height: 100%;
      padding: 24px;
      background-color: #fff;
      border-radius: 3px;
      position: relative;
    }
  }
}
</style>
