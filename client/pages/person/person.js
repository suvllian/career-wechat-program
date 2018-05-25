const appInstance = getApp()
const config = require("../../config.js")

Page({
  data: {
    nameFlag: false,
    userInfo: {},
    name: '',
    phone: 0,
    wechatId: 'wx',
    gender: 1,
    isShow: false,
  },
  fold: function () {
    this.setData({
      nameFlag: false,
      isShow: false
    })
  },
  addMine: function () {
    this.setData({
      nameFlag: true,
      isShow: true
    })
  },
  onLoad: function (options) {
    const baiscUserInfo = appInstance.globalData.userInfo
    const that = this

    wx.request({
      url: config.service.professionUrl,
      data: {
        nickName: baiscUserInfo.nickName
      },
      success: function (res) {
        const { data = {} } = res
        const { data: userInfo = {} } = data

        that.setData({
          userInfo: baiscUserInfo,
          name: userInfo.name,
          phone: userInfo.phone,
          wechatId: userInfo.wechatId,
          gender: userInfo.gender
        })
      },
      fail: function (err) {
        that.setData({
          userInfo: baiscUserInfo
        })
      }
    })
  }
})