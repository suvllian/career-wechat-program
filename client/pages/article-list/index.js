const config = require("../../config.js")

Page({
  data: {
    articles: []
  },
  onShow: function (options) {
    this.getArticles()
  },
  onReady: function () {
    
  },
  getArticles: function() {
    const that = this

    wx.request({
      url: config.service.articlesUrl,
      success: function (res) {
        const { data } = res
        // 按日期进行分类

        that.setData({
          articles: data.data
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  }
})