const appInstance = getApp()
const config = require("../../config.js")

Page({
  data: {
    articles: []
  },
  onLoad: function (options) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      mask: true,
    })
    this.getMyArticles()
  },
  getMyArticles: function() {
    const { nickName } = appInstance.globalData.userInfo
    const that = this

    wx.request({
      url: config.service.getMyArticleUrl,
      data: { nickName },
      success: function (res) {
        wx.hideLoading();
        that.setData({
          articles: res.data.data
        })
      }
    })
  }
})