<template>
  <section id="home-page">
    <div class="item-wrap">
      <p class="header">锁定账号数量</p>
      <div class="content">
        10
      </div>
    </div>
    <div class="item-wrap">
      <p class="header">协催申请数量</p>
      <div class="content">
        5
      </div>
    </div>
    <div class="item-wrap">
      <p class="header">新分配案件数</p>
      <div class="content">
        2
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'homePage'
}
</script>

<style lang="scss">
#home-page{
  display: flex;
  justify-content: center;
  .item-wrap{
    margin-right: 24px;
    // box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.34);
    border: 1px solid #409eff;
    width: 250px;
    height: 250px;
    .header{
      padding-left: 24px;
      font-size: 24px;
      line-height: 60px;
      border-bottom: 1px solid #409eff;
    }
    .content{
      line-height: 190px;
      text-align: center;
      font-size: 50px;
    }
  }
}
</style>

