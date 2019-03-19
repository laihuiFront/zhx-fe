<template>
  <section id="tab-menu">
    <span class="left-wrap" @click="onClickLeft"><i class="icon el-icon-arrow-left"></i></span>
    <ul class="menu-wrap" ref='tabList'>
      <li 
         @click="gotoPage(menu)"
         class="menu-item" 
         :class="{active:menu.id === currentMenu.id}" 
         v-for="(menu) in tabMenus" 
         :key="'tab'+menu.id"
          @contextmenu.prevent="openMenu(menu,$event)">
        <span class="text">{{menu.menuLabel}}</span>
        <i v-if="menu.menuLabel !== '首页'" @click.stop="closeTab(menu)" class="el-icon-close"></i>
      </li>
    </ul>
    <span class="right-wrap" @click="onClickRight"><i class="icon el-icon-arrow-right"></i></span>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="closeTab(selectedTab)" v-if="selectedTab.menuLabel !== '首页'">关闭当前标签页</li>
      <li @click="closeOthersTags">关闭其他标签页</li>
      <li @click="closeAllTags" v-if="selectedTab.menuLabel !== '首页'">关闭所有标签页</li>
    </ul>
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
  data(){
    return {
      visible:false,
      top: 0,
      left: 0,
      selectedTab: {}
    }
  },
  watch: {
    tabMenus(){
      console.log('123')
      setTimeout(()=>{
        this.$refs.tabList.scrollTo(this.$refs.tabList.scrollWidth, 0)
      },250)
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted(){
    this.$refs.tabList.style.left = '0px'
    this.$refs.tabList.style.right = '0px'
  },
  methods:{
    onClickLeft(){
      // this.$refs.tabList.scrollTo(this.$refs.tabList.scrollWidth, 0)
      // console.log(this.$refs.tabList.scrollLeft)
      this.$refs.tabList.scrollLeft = this.$refs.tabList.scrollLeft - 50
    },
    onClickRight(){
      this.$refs.tabList.scrollLeft = this.$refs.tabList.scrollLeft + 50
    },
    openMenu(tab, e){
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }
      this.top = e.clientY

      this.visible = true
      this.selectedTab = tab
    },
    closeMenu() {
      this.visible = false
    },
    closeOthersTags(){
      this.gotoPage(this.selectedTab)
      this.removeOtherTab(this.selectedTab.id)
    },
    //关闭所有就回到首页，第一个一定是首页
    closeAllTags(){
      this.gotoPage(this.tabMenus[0])
      this.removeOtherTab()
    },
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
      removeTab:'REMOVE_TAB_MENUS',
      removeOtherTab:'REMOVE_TAB_OTHER'
    })
  }
}
</script>

<style lang="scss">
#tab-menu{
  // position: relative;
  width:100%;
  display: flex;
  height: 35px;
  border: 1px solid #e8e8e8;
  .left-wrap{
    padding: 0 20px;
    border-right: 1px solid #e8e8e8;
    height: 35px;
    line-height: 35px;
    background: #fff;
    cursor: pointer;
    // z-index: 100;
  }
  .menu-wrap{
    position: relative;
    flex:1;
    overflow: scroll;
    
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
    background: #fff;
    cursor: pointer;
    // z-index: 100;
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

