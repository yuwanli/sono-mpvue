<template>
  <div class="container">
    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo='onGotUserInfo'>授权登陆</button>
  </div>
</template>

<script>
import { ajax } from 'src/utils/ajax'
export default {
  data () {
    return {
      mid: ''
    }
  },
  computed: {
  },
  onLoad (options) {
    this.mid = options.mid
  },
  methods: {
    onGotUserInfo (res) {
      if (res.target.userInfo) {
        let data = {
          encryptedData: res.target.encryptedData,
          iv: res.target.iv,
          code: wx.getStorageSync('sono_code')
        }
        ajax({
          sono: 'app/auth',
          method: 'POST',
          data
        }).then(resp => {
          wx.setStorageSync('sono_token', resp.token)
          wx.navigateBack()
          if (wx.callbacks[this.mid]) {
            wx.callbacks[this.mid]()
            delete wx.callbacks[this.mid]
            console.log(wx.callbacks)
          }
        })
      } else {

      }
    },
    test (res) {
      console.log(res)
    }

  },

  created () {

  }
}
</script>

<style scoped>

</style>
