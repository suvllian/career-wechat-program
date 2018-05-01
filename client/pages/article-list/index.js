const config = require("../../config.js")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    articles: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArticles()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 获取贴子列表
   */
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