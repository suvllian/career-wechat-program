//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
  globalData: {
    userInfo: {}
  },
  onLaunch: function () {
    qcloud.setLoginUrl(config.service.loginUrl)
  },
  onShow: function () {
    const that = this

    wx.getUserInfo({
      success: function (res) {
        const { userInfo } = res

        that.globalData.userInfo = userInfo
      }
    })
  }
})