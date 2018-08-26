<template>
  <div class="container">
    <div class="item" v-for="item in data.orderGood" v-bind:key="item.id">
      <div>{{item.good_name}} 价格：{{item.shop_price}}</div>
    </div>
    <div class="to-buy" @click="toBuy">去支付</div>
  </div>
</template>

<script>
import {getOrderDetail, getOrderJssdk} from './api.js'
export default {
  data () {
    return {
      data: {}
    }
  },
  onLoad () {
    getOrderDetail(this.$root.$mp.query.id).then(res => {
      this.data = res
    })
  },
  computed: {
  },
  methods: {
    toBuy () {
      getOrderJssdk(this.data.orderInfo.id).then(res => {
        wx.requestPayment({
          ...res,
          success: function (res) {
            wx.showToast({
              title: '支付成功'
            })
          },
          fail: function (res) {
          }
        })
      })
    }
  },

  created () {

  }
}
</script>

<style scoped>
.to-buy{
  position: fixed;
  width: 100px;
  height: 50px;
  background-color: yellowgreen;
  border-radius: 5px;
  right: 20px;
  bottom: 20px;
  z-index: 100;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
}
</style>
