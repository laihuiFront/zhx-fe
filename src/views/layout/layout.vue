<template>
  <div id="layout">
    <top-menu class="menu" :class="{'is-active':isActive}"></top-menu>
      <div class="arrowBtn">
        <el-button 
          icon="el-icon-d-arrow-left" 
          :class="{'is-active':isActive}"
          @click="hideClick"
        ></el-button>
      </div>
    <div class="page" :class="{'is-active':isActive}">
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
      isActive:false
    }
  },
  components: {
    TopMenu,
    TabMenu
  },
  methods:{
    ...mapMutations(['SET_CACHEFLUSHFLAG']),
    hideClick() {
      if(this.isActive==true){
        this.isActive=false
      }else{
        this.isActive=true
      }
    }
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
  .menu.is-active{
    display: none;
  }
  .page{
    width: calc(100% - 240px);
  }
  .page.is-active {
    width: calc(100% - 30px);
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
  .arrowBtn{
    margin-top: 230px;
    .el-button{
      width: 30px;
      padding: unset;
      height: 50px;      
      background: #edf0ff;
    }
    .el-button.is-active {
        transform: rotate(180deg);
    }
     .el-icon-d-arrow-left{
       font-size: 20px;
     }
  }
}
</style>
