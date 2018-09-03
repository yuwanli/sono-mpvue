<template>
  <div class="container">
    <div class="item" v-for="item in cart" v-bind:key="item.id">
      <div>
        {{item.goods_name}} 数量：{{item.goods_number}}
      </div>
    </div>
     <div v-if="cart && cart.length === 0">购物车数据为空</div>
    <div class="to-order" @click="toOrder">去下单</div>
  </div>
</template>

<script>
import {getCartList, addOrder} from './api'
import wxParse from 'mpvue-wxparse'

export default {
  data () {
    return {
      cart: ''
    }
  },
  computed: {
  },
  components: {
    wxParse
  },
  onShow () {
    getCartList().then(res => {
      this.cart = res.cart
      this.addressId = res.address.id
    })
  },
  methods: {
    toOrder () {
      addOrder(this.addressId).then(res => {
        wx.navigateTo({
          url: `/pages/order_detail/main?id=${res.order_id}`
        })
      })
    }
  }
}
</script>

<style scoped>
.to-order{
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
