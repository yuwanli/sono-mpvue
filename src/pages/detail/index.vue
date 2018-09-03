<template>
  <div class="container">
    <sono-header></sono-header>
    <div class="baseInfo">
      <h1>{{data.title}}</h1>
      <p>{{data.price}}</p>
    </div>
    <div class="content">
      <wxParse :content="data.content" />
    </div>
    <div class="add-cart" @click="addCart">加购物车</div>
    <div class="to-cart" @click="toCart">去购物车</div>
  </div>
</template>

<script>
import {getDetail, cartAdd} from './api'
import header from 'src/components/header.vue'
import wxParse from 'mpvue-wxparse'
import {base} from 'src/mixins/base.js'
export default {
  data () {
    return {
      data: {
        content: '<p style="text-align:center">sono</p>'
      }
    }
  },
  computed: {
  },
  components: {
    wxParse,
    'sono-header': header
  },
  mixins: [base],
  onLoad () {
    getDetail(this.$root.$mp.query.id).then(res => {
      this.data = res
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
      wx.switchTab({
        url: '/pages/cart/main'
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~src/utils/less/var.less';
@import url("~mpvue-wxparse/src/wxParse.css");
.container{
  background-color: @grayBg;
}
.content{
  background-color: #fff;
}

.baseInfo{
  display:flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 15/@bs;
  height: 140/@bs;
  background-color: #fff;
  h1{
    color: @blackColor;
    font-size: 30/@bs;
    line-height: 42/@bs;
  }
  p{
    color: @darkRed;
    font-size: 30/@bs;
    line-height: 42/@bs;
  }
}
.add-cart{
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 100;
  width: 100px;
  height: 50px;
  border-radius: 5px;
  background-color: yellowgreen;
  color: #fff;
  text-align: center;
  font-size: 20px;
  line-height: 50px;
}
.to-cart{
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 100;
  width: 100px;
  height: 50px;
  border-radius: 5px;
  background-color: rebeccapurple;
  color: #fff;
  text-align: center;
  font-size: 20px;
  line-height: 50px;
}
</style>
