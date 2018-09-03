
// import store from 'src/store'
export const getWxData = (mid) => {
  wx.login({
    success (res) {
      if (res.code) {
        wx.setStorageSync('sono_code', res.code)
        if (!wx.getStorageSync('sono_token')) {
          wx.navigateTo({
            url: `/pages/login/main?mid=${mid}`
          })
        }
      }
    },
    fail () {
      wx.showToast({
        title: '1111',
        icon: 'success',
        duration: 2000
      })
    },
    complete () {
      wx.showToast({
        title: '2222',
        icon: 'success',
        duration: 2000
      })
    }
  })
}
