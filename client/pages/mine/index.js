var appInstance = getApp()

Page({
  data: {
    userInfo: {}
  },
  onLoad: function (options) {
    this.setData({
      userInfo: appInstance.globalData.userInfo
    })
  }
})