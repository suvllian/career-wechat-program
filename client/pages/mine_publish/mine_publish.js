const appInstance = getApp()
const config = require("../../config.js")

Page({
  data: {
    articles: []
  },
  onLoad: function (options) {
    const baiscUserInfo = appInstance.globalData.userInfo
    const that = this

    wx.request({
      url: config.service.getMyArticleUrl,
      data: {
        nickName: baiscUserInfo.nickName
      },
      success: function (res) {
        const { data } = res
        const { data: articles = [] } = data

        that.setData({
          articles
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  onReady: function () {
  
  }
})