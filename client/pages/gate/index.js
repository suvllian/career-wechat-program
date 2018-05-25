// function of this page: get user's permission
const appInstance = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function (options) {

  },
  onReady: function () {
    const that = this

    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
            }
          })
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    const { userInfo } = e.detail.userInfo

    appInstance.globalData.userInfo = userInfo

    wx.switchTab({
      url: '../../pages/index/index',
    })
  }
})