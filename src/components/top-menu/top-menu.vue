<template>
  <section id="top-menu">
    <img src="./group.png" alt="" class="logo">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#132c51"
      text-color="#fff"
      active-text-color="#fff"
      :default-active="$route.path">
        <component v-for="(item) in menu" :data="item" :is="item.children?'two-level':'one-level'" :key="item.id"></component>
    </el-menu>
    <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        {{userInfo.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logOut">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </section>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import oneLevel from './one-level'
import twoLevel from './two-level'
export default {
  name: 'topMenu',
  components: {
    oneLevel,
    twoLevel
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'menu'
    ])
  },
  methods: {
    handleCommand(command) {
      if (command === 'logOut') {
        this.logoutAction().then(()=>{
          this.$router.replace({path:'/login'})
        })
      }
    },
    ...mapActions([
      'logoutAction'
    ])
  }
}
</script>

<style lang="scss">
#top-menu{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 80px;
  background: #132c51;
  .logo{
    width: 247px;
    height: 34px;
  }
  .el-dropdown{
    .el-dropdown-link{
      color:#fff;
      font-size: 14px;
    }
  }
  .el-menu-demo{
    border: 0;
    height: 80px;
    // .el-submenu. .el-submenu__title
    .el-menu-item{
      height: 80px;
      &.is-active{
        border-bottom: 0;
        background: #409eff !important;
      }
    }
    .el-submenu{
      height: 80px;
      &.is-active{
        .el-submenu__title{
          border-bottom: 0;
          background: #409eff !important;
        }
      }
      .el-submenu__title{
        height: 80px;
      }
    }
    .first-wrap{
      height: 80px;
      padding: 16px 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      .icon{
        width: 24px;
        height: 24px;
      }
      .text{
        color:#fff;
        font-size: 14px;
        line-height: 14px;
      }
      .label{
        line-height: 14px;
        color:#fff;
        font-size: 14px;
      }
    }
    .el-submenu__icon-arrow{
      display: none;
    }
  }
}
</style>
