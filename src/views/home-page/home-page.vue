<template>
  <div id="home-page">
    <div class="item-wrap" v-if="userData.roleName.indexOf('member')>=0">
      <p class="header">锁定账号数量</p>
      <div class="content" @click="toAccount">
        {{userData.lockAccountNum}}
      </div>
    </div>
    <div class="item-wrap" v-if="userData.roleName.indexOf('synergy')>=0">
      <p class="header">协催申请数量</p>
      <div class="content" @click="toSynergy">
        {{userData.sysnergyNum}}
      </div>
    </div>
    <div class="item-wrap" v-if="userData.roleName.indexOf('mycase')>=0">
      <p class="header">新分配案件数</p>
      <div class="content" @click="toCase">
        {{userData.distributeNum}}
      </div>
    </div>
  </div>
</template>

<script>
  import { getUserHomeInfo} from '@/common/js/api-member'

  export default {
  name: 'homePage',
    data () {
      return {
        userData:{
          roleName:""
        }
      }
    },
  created () {
    getUserHomeInfo().then(response => {
      this.userData = response
    })
  },
  methods: {
    toAccount(){
      this.$router.push({
        path:'member-in'
      })
    },
    toSynergy(){
      this.$router.push({
        path:'synergistic-application'
      })
    },
    toCase(){
      this.$router.push({
        path:'collect-my-case'
      })
    }
  }
}

</script>

<style lang="scss">
#home-page{
  display: flex;
  justify-content: center;
  .item-wrap{
    margin-top: 30px;
    margin-right: 24px;
    // box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.34);
    border: 1px solid #409eff;
    width: 250px;
    height: 250px;
    .header{
      text-align: center;
      font-size: 24px;
      line-height: 60px;
      border-bottom: 1px solid #409eff;
    }
    .content{
      cursor: pointer;
      line-height: 190px;
      text-align: center;
      font-size: 50px;
    }
  }
}
</style>
