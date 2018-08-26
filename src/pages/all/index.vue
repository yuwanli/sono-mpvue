<template>
  <div class="container" >
    <div class="listCon">
      <item v-for="item in list" v-bind:key="item.id" :item='item'></item>
    </div>
    <div class="order_list" @click="orderList">订单列表</div>
  </div>
</template>

<script>
import {getIndexList} from './api'
import item from 'src/components/item.vue'
export default {
  data () {
    return {
      list: []
    }
  },
  components: {
    item
  },
  computed: {
  },
  onLoad (options) {
  },
  created () {
    getIndexList().then(res => {
      this.list = res.list
    })
  },
  methods: {

    orderList () {
      wx.navigateTo({
        url: '/pages/order_list/main'
      })
    }

  }
}
</script>

<style lang="less" scoped>
@import '~src/utils/less/var.less';
.swiper{
  width: 640/@bs;
  height: 330/@bs;
  &-img{
    width: 640/@bs;
    height: 330/@bs;
  }
}
.title{
  text-align: center;
  font-size: 30/@bs;
  line-height: 60/@bs;
}
.listCon{
  border-top: 1/@bs solid #d9d9d9;
}
.order_list{
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 100;
  width: 100px;
  height: 50px;
  border-radius: 5px;
  background-color: @baseColor;
  color: #fff;
  text-align: center;
  font-size: 20px;
  line-height: 50px;
}
</style>
