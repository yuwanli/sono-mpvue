<template>
  <div class="sku">
    <div class="sku_icons">
      <div class="sku_icons-item" @click="shareClick">
        <image class="icon home" src="/assets/images/share.png"></image>
        <p>分享</p>
      </div>
      <div class="sku_icons-item" @click="iconClick('cart')">
        <image class="icon cart" src="/assets/images/cart.png"></image>
        <p>购物车</p>
      </div>
      <div class="sku_icons-item" @click="iconClick('user')">
        <image class="icon user" src="/assets/images/user.png"></image>
        <p>个人中心</p>
      </div>
    </div>
    <template v-if="data.remained_number == 0">
      <div class="sku_item noMore" @click="noMoreClick">
        该产品已售罄  <span>我要预定</span>
      </div>
    </template>
    <template v-else>
       <div class="sku_item cart" @click="openSku">
        加入购物车
      </div>
      <div class="sku_item buy" @click="addAndPay">
        立即购买
      </div>
    </template>

    <sku-modal v-if="ifSku" :data="data" @hideSku="hideSku"></sku-modal>
    <share v-if="ifShare" :detail="data" :icon="icon" @hideShare="hideShare"></share>
  </div>
</template>

<script>
import skuModal from './sku-modal.vue'
import share from './share.vue'
import {cartAdd, getCode} from './api.js'

export default {
  data () {
    return {
      ifSku: false,
      ifShare: false,
      icon: ''
    }
  },
  props: ['data'],
  components: {
    'sku-modal': skuModal,
    share
  },
  methods: {
    hideShare () {
      this.ifShare = false
    },
    async shareClick () {
      const res = await getCode(this.data.good_id)
      this.icon = res
      this.ifShare = true
    },
    iconClick (str) {
      wx.switchTab({
        url: `/pages/${str}/main`
      })
    },
    noMoreClick () {
      wx.navigateTo({
        url: `/pages/reserve/main?id=${this.data.good_id}`
      })
    },
    openSku () {
      this.ifSku = true
    },
    hideSku () {
      this.ifSku = false
    },
    addAndPay () {
      if (parseInt(this.data.remained_number) === 0) {
        wx.showToast({
          title: '商品暂无库存',
          icon: 'none'
        })
        return
      }
      cartAdd({
        goods_id: this.data.good_id,
        product_id: this.data.product_id,
        goods_number: 1
      }).then(res => {
        // wx.showToast({
        //   title: '加购成功',
        //   icon: 'success',
        //   duration: 2000
        // })
        wx.switchTab({
          url: `/pages/cart/main`
        })
      })
    }
  }

}
</script>

<style lang="less" scoped>
@import '~src/utils/less/var.less';
.sku{
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  flex-direction: row;
  height: 80/@bs;
  background-color: @themeBlack;
  box-shadow: 0 0 10/@bs @themeBlack;
  color: #fff;
  &_item{
    display: flex;
    align-items: center;
    flex: 0 0 160/@bs;
    justify-content: center;
    box-sizing: border-box;
    color: rgba(255,255,255,0.5);
    font-size: 24/@bs;
    &.cart{
      border-left: 1/@bs solid rgba(180, 40, 45, 0.1);
    }
    &.buy{
      background-color: @darkRed;
      color: #fff;
    }
    &.noMore{
      flex: 0 0 320/@bs;
      background-color: #90bb34;
      color: #fff;
      span{
        margin-left: 20/@bs;
        text-decoration: underline;
      }
    }
  }
  &_icons{
    display: flex;
    align-items: center;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    padding-right: 10/@bs;
    padding-left: 20/@bs;
    &-item{
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      padding: 0 20/@bs;
      .icon{
        width: 45/@bs;
        height: 45/@bs;
      }
      p{
        font-size: 18/@bs;
      }

    }
  }
}
</style>
