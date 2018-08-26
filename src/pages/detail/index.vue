<template>
  <div class="container">
    <wxParse :content="content" />
    <div class="add-cart" @click="addCart">加购物车</div>
    <div class="to-cart" @click="toCart">去购物车</div>
  </div>
</template>

<script>
import {getDetail, cartAdd} from './api'
import wxParse from 'mpvue-wxparse'

export default {
  data () {
    return {
      content: ''
    }
  },
  computed: {
  },
  components: {
    wxParse
  },
  onLoad () {
    getDetail(this.$root.$mp.query.id).then(res => {
      this.content = res.content
      this.good_id = res.good_id
      this.product_id = res.product_id
    })
  },
  methods: {
    addCart () {
      cartAdd({
        goods_id: this.good_id,
        product_id: this.product_id,
        goods_number: 1
      }).then(res => {
        wx.showToast({
          title: '加购成功',
          icon: 'success',
          duration: 2000
        })
      })
    },
    toCart () {
      wx.navigateTo({
        url: '/pages/cart/main'
      })
    }
  }
}
</script>

<style scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
.item{
  margin-bottom: 20px;
}
.test{
  width: 750px;
  background-color: red;
}
img{
  width: 750px;
}
.add-cart{
  position: fixed;
  width: 100px;
  height: 50px;
  background-color: yellowgreen;
  border-radius: 5px;
  left: 20px;
  bottom: 20px;
  z-index: 100;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
}
.to-cart{
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
