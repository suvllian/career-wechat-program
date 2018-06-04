const appInstance = getApp()
const config = require("../../config.js")

Page({
  data: {
    articles: []
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
    this.getMyArticles()
  },
  getMyArticles: function() {
    const { nickName } = appInstance.globalData.userInfo
    const that = this

    wx.request({
      url: config.service.getMyArticleUrl,
      data: { nickName },
      success: function (res) {
        that.setData({
          articles: res.data.data
        })
      }
    })
  }
})