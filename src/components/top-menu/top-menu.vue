<template>
  <div id="top-menu">
    <div class="logo">
      <img src="./logo_1 .png">
      <!-- <img src="./logo_2 .png"> -->
    </div>
    <div class="navMenu">
      <el-menu :router="true" :default-active="currentRoute" background-color="#001529" text-color="#A6ADB4" active-text-color="#fff" class="el-menu-demo">
        <NavMenu :navMenus="menu"></NavMenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  import {findMenuInAll} from '@/store/actions.js'
  import NavMenu from './NavMenu'

  export default {
    name: 'topMenu',
    components: {
      NavMenu
    },
    computed: {
      ...mapGetters([
        'menu',
        'currentMenu'
      ])
    },
    data() {
      return {
        currentRoute: null
      }
    },
    created() {
      this.currentRoute = this.currentMenu.id.toString()
    },
  }
</script>

<style lang="scss">
  #top-menu {
    width: 210px;
    height: 100%;
    background: #001529;
    box-shadow: 2px 0 6px #00152959;
    z-index: 99;

    .logo {
      width: 100%;
      height: 65px;
      position: relative;

      img{
        width: calc(100% - 40px);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
      }
    }

    .el-dropdown {
      .el-dropdown-link {
        color: #A6ADB4;
        font-size: 14px;
        cursor: pointer;
        user-select: none;
      }
    }

    .navMenu{
      width: 100%;
      height: calc(100% - 65px);
      overflow-y: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;

      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }

      .navMenu{
        overflow: hidden;
      }

      .el-menu-demo {
        width: 100%;
        flex: 1;
        border: 0;

        .el-menu-item{
          &.is-active,&:hover{
            color: #fff !important;
            background-color: #5175FA !important;
          }
        }

        .el-submenu{
          width: 210px;
        }
      }
    }
  }

  .ruleForm3 .el-select{
    display: block;
  }
</style>
