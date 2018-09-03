<template>
    <div class="container">
      <sono-header></sono-header>
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
import header from 'src/components/header.vue'
import {base} from 'src/mixins/base.js'
export default {
  data () {
    return {
      list: [],
      images: []
    }
  },
  mixins: [base],
  components: {
    item,
    'sono-header': header
  },
  computed: {
  },
  onShow () {
    getIndexList().then(res => {
      this.list = res.recommend
      this.images = res.image
      console.log(this.list)
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
.swiper{
  width: 640/@bs;
  height: 330/@bs;
  background-color: #d9d9d9;
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
