<template>
  <div class="header">
    <!-- <div class="icon like"></div> -->
    <image class="icon like" src="/assets/images/like.png"></image>
    <div class="center">
      <image class="icon logo" src="/assets/images/logo.png"></image>
      <p>南北农产品 优选平台</p>
    </div>
    <image class="icon info" src="/assets/images/info.png"></image>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
@import '~src/utils/less/var.less';
.header{
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  height: 100/@bs;
  background-color: #91bb35;
  color: #fff;
  z-index:1000;
  box-shadow: 0 0 10/@bs #91bb35;
  display: flex;
  padding: 0 30/@bs;
  justify-content: space-between;
  align-items:center;
  left: 0;
  top:0;
  .icon{
    &.like{
      width: 32/@bs;
      height: 28/@bs;
    }
    &.info{
      height: 32/@bs;
      width: 28/@bs;
    }
    &.logo{
      width: 132/@bs;
      height: 38/@bs;
    }
  }
  .center{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    p{
      font-size: 20/@bs;
      color: #181a1b;
      margin-top: 10/@bs;
    }
  }
}
</style>
