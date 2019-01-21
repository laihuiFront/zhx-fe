<template>
  <section id="home-page">
    <button @click="logout">tuichu</button>
  </section>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'homePage',
  methods: {
    logout() {
      this.logoutAction().then(()=>{
        this.$router.replace({path:'/login'})
      })
    },
    ...mapActions([
      'logoutAction'
    ])
  }
}
</script>

<style lang="scss">
#home-page{
  
}
</style>

