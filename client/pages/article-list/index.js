const config = require("../../config.js")

Page({
  data: {
    articles: []
  },
  onLoad:function(){
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      mask: true,
    })
  },
  onShow: function (options) {
    wx.showLoading ()
    this.getArticles()
  },
  getArticles: function() {
    const that = this

    wx.request({
      url: config.service.articlesUrl,
      success: function (res) {
        wx.hideLoading();
        that.setData({
          articles: res.data.data
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  }
})