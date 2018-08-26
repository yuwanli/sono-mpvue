<template>
  <div class="container">
    <div class="item" v-for="item in list" v-bind:key="item.id" @click="clickHandle(item.id)">
      <div>{{item.title}}{{item.price}}</div>
    </div>
    <div class="order_list" @click="orderList">订单列表</div>
  </div>
</template>

<script>
import {getIndexList} from './api'
export default {
  data () {
    return {
      list: []
    }
  },
  computed: {
  },
  onLoad (options) {
    this.mid = options.mid
  },
  created () {
    getIndexList().then(res => {
      this.list = res.list
    })
  },
  methods: {
    clickHandle (id) {
      wx.navigateTo({
        url: `/pages/detail/main?id=${id}`
      })
    },
    orderList () {
      wx.navigateTo({
        url: '/pages/order_list/main'
      })
    }

  }
}
</script>

<style scoped>
.item{
  margin-bottom: 20px;
}
.order_list{
  position: fixed;
  width: 100px;
  height: 50px;
  background-color: rebeccapurple;
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
