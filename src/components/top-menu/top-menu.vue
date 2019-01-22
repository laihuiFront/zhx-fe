<template>
  <section id="top-menu">
    <img src="./group.png" alt="" class="logo">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#132c51"
      text-color="#fff"
      active-text-color="#fff">
        <component v-for="(item) in menu" :data="item" :is="item.children?'two-level':'one-level'" :key="item.id"></component>
      <!-- <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item> -->
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
    .el-menu-item{
      height: 80px;
      line-height: 80px;
      padding: 0 15px;
    }
    .el-submenu{
      height: 80px;
      .el-submenu__title{
        height: 80px;
        line-height: 80px;
      }
    }
  }
}
</style>
