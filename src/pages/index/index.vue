<template>
  <div class="container" >
    <div class="header"></div>
    <swiper class="swiper" :indicator-dots="true" :circular="true" indicator-color="rgba(0,0,0,0.5)" indicator-active-color="#b6e429">
      <block v-for="item in images" v-bind:key="item.id" @click="itemClick(item.id)">
        <swiper-item>
          <img mode="aspectFill" class="swiper-img" :src="item.image" />
        </swiper-item>
      </block>
    </swiper>
    <div class="title">精选推荐</div>
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
      list: [],
      images: []
    }
  },
  components: {
    item
  },
  computed: {
  },
  onLoad (options) {
    this.mid = options.mid
  },
  created () {
    getIndexList().then(res => {
      this.list = res.recommend
      this.images = res.image
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

<style lang="less" scoped>
@import '~src/utils/less/var.less';
.header{
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  width: 640/@bs;
  height: 100/@bs;
  background-color: yellowgreen;
}
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
