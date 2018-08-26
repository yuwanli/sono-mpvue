<template>
  <div class="container">
    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>
    <button @click="test_cart_list">test_cart_list</button>
    <button @click="test1">getUser</button>
    <button @click="test2">test_cart</button>
    <button @click="test3">test_order</button>
    <button @click="test4">test_buy</button>
    <!-- <button  open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="onGotUserInfo">获取</button> -->
    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>
  </div>
</template>

<script>
import card from 'src/components/card'
import store from 'src/store'
import {ajax} from 'src/utils/ajax'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
    }
  },
  computed: {
    count () {
      return store.state.count
    }
  },
  components: {
    card
  },
  methods: {
    test_cart_list () {
      ajax({
        sono: 'cart/list',
        method: 'POST'
      }).then(res => {
        console.log(res)
      })
    },
    test1 () {
      ajax({
        sono: 'user/info',
        method: 'POST',
        data: {
          user_id: '21'
        }
      }).then(res => {
        console.log('获取成功')
        console.log(res)
      })
    },
    test2 () {
      ajax({
        sono: 'cart/add',
        method: 'POST',
        data: {
          goods_id: 23,
          product_id: 43,
          goods_number: 1,
          address_id: 35
        }
      }).then(res => {
        console.log(res)
      })
    },
    test3 () {
      ajax({
        sono: 'order/add',
        method: 'POST',
        data: {
          address_id: 35
        }
      }).then(res => {
        console.log('111')
        this.orderId = res.order_id
      })
    },
    test4 () {
      ajax({
        sono: 'order/jssdkOrder',
        method: 'POST',
        data: {
          id: this.orderId
        }
      }).then(res => {
        console.log(res)
        wx.requestPayment({
          ...res,
          success: function (res) {
            console.log(res)
          },
          fail: function (res) {
          }
        })
      })
    }
  },
  mounted () {
    console.log('111')
  },
  created () {

  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
