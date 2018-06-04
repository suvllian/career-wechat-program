// function of this page: get user's permission
const appInstance = getApp()
var config = require("../../config.js")
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function (options) {
    
  },
  onReady: function () {
    this.bindGetUserInfo()
  },
  bindGetUserInfo: function () {
    const that = this

    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              const { userInfo } = res;
              console.log(userInfo);
              appInstance.globalData.userInfo = userInfo

              wx.request({
                url: config.service.addUserUrl,
                method: 'POST',
                data: { users: userInfo },
                success: function (res) {
                  console.log(res);
                },
                fail: function () {

                }
              })

              wx.switchTab({
                url: '../../pages/index/index',
              })
            }
          })
        }
      }
    })
  }
})