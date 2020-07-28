<template>
  <div class="header">
    <image @click="indexClick" v-if="showIndex" class="icon home" src="/assets/images/home.png"></image>
    <!-- <image @click="openWeb" class="icon like" src="/assets/images/like.png"></image> -->
    <div class="center">
      <image class="icon logo" src="/assets/images/logo.png"></image>
      <p>南北农产品 优选平台</p>
    </div>
    <div @click="goToInfo" class="message">
      <image class="icon info" src="/assets/images/info.png"></image>
      <div v-if="user.message" class="message-label"></div>
    </div>

  </div>
</template>

<script>
import store from 'src/store'
export default {
  props: {
    showIndex: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  computed: {
    user: () => {
      return store.state.user
    }
  },
  methods: {
    indexClick () {
      wx.switchTab({
        url: `/pages/index/main`
      })
    },
    // openWeb () {
    //   wx.navigateTo({
    //     url: `/pages/web_view/main`
    //   })
    // },
    goToInfo () {
      wx.navigateTo({
        url: `/pages/info/main`
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~src/utils/less/var.less';
.header{
  position: fixed;
  top:0;
  left: 0;
  z-index:1000;
  display: flex;
  align-items:center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 30/@bs;
  width: 100%;
  height: 100/@bs;
  background-color: #91bb35;
  box-shadow: 0 0 10/@bs #91bb35;
  color: #fff;
  .icon{
    &.home{
      width: 45/@bs;
      height: 45/@bs;
    }
    &.info{
      width: 28/@bs;
      height: 32/@bs;
    }
    &.logo{
      width: 132/@bs;
      height: 38/@bs;
    }
  }
  .message{
    position: relative;
    width: 28/@bs;
    height: 32/@bs;
    transform-origin: top center;
    &-label{
      position: absolute;
      top:0;
      right: 0;
      width: 16/@bs;
      height: 16/@bs;
      border-radius: 50%;
      background-color: red;
    }
  }
  .center{
    display: flex;
    align-items: center;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    p{
      margin-top: 10/@bs;
      color: #181a1b;
      font-size: 20/@bs;
    }
  }
}

</style>
