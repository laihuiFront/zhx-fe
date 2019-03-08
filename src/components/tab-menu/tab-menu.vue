<template>
  <section id="tab-menu">
    <span class="left-wrap"><i class="icon el-icon-arrow-left"></i></span>
    <ul class="menu-wrap">
      <li @click="gotoPage(menu)" class="menu-item" :class="{active:menu.id === currentMenu.id}" v-for="(menu) in tabMenus" :key="'tab'+menu.id">
        <span class="text">{{menu.menuLabel}}</span>
        <i v-if="menu.menuLabel !== '首页'" @click.stop="closeTab(menu)" class="el-icon-close"></i>
      </li>
    </ul>
    <span class="right-wrap"><i class="icon el-icon-arrow-right"></i></span>
  </section>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'tabMenu',
  computed: {
    ...mapGetters([
      'tabMenus',
      'currentMenu'
    ])
},
  methods:{
    gotoPage(menu){
      if(menu.isDetail){
        this.$router.push({
          path:'case-detail',
          query: menu.query
        })
      }else{
        this.$router.push('/zhx' + menu.menuUrl)
      }
    },
    closeTab(menu){
      const tabIndex = this.$store.getters.getTabIndex(menu.id)
      let nextPath = null
      let nextMenu = null
      if (menu.id === this.currentMenu.id) {
        if (this.tabMenus.length > 1) {
          if(tabIndex===0){
            nextMenu = this.tabMenus[1]
          }else{
            nextMenu = this.tabMenus[tabIndex-1]
          }
          nextPath = nextMenu.menuUrl
        } else {
          this.$router.push('/zhx'+'/home-page')
          return
        }
      }
      this.removeTab(menu.id)
      if(nextMenu){
        if(nextMenu.isDetail){
          this.$router.push({
            path:'case-detail',
            query: nextMenu.query
          })
        }else{
          this.$router.push('/zhx'+nextPath)
        }
      }
    },
    ...mapMutations({
      removeTab:'REMOVE_TAB_MENUS'
    })
  }
}
</script>

<style lang="scss">
#tab-menu{
  display: flex;
  height: 35px;
  border: 1px solid #e8e8e8;
  .left-wrap{
    padding: 0 20px;
    border-right: 1px solid #e8e8e8;
    height: 35px;
    line-height: 35px;
    cursor: pointer;
  }
  .menu-wrap{
    flex:1;
    overflow: auto;
    white-space: nowrap;
    &::-webkit-scrollbar{
      display: none;
    }
    .menu-item{
      display: inline-block;
      padding: 0 20px;
      height: 33px;
      line-height: 33px;
      border-right: 1px solid #e8e8e8;
      cursor: pointer;
      background: #f2f2f2;
      color:#666;
      font-size: 14px;
      box-sizing: border-box;
      &.active{
        background: #fff;
        color: #1e1f24
        border-bottom：1px solid #fff;

      }
      .text{
        display: inline-block;
        margin-right: 10px;
      }
    }
  }
  .right-wrap{
    border-left: 1px solid #e8e8e8;
    padding: 0 20px;
    height: 35px;
    line-height: 35px;
    cursor: pointer;
  }
}
</style>

