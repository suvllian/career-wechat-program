const config = require("../../config.js")

Page({
  data: {
    articles: []
  },
  onLoad:function(){
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  },
  onShow: function (options) {
    this.getArticles()
  },
  onReady: function () {
    wx.hideLoading()
  },
  getArticles: function() {
    const that = this

    wx.request({
      url: config.service.professionUrl,
      success: function (res) {
        console.log(res)
      },
      fail: function (err) {
        console.log(err)
      }
    })

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