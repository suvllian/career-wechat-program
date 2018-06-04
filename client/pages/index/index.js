// index page
const config = require("../../config.js")

Page({
  data: {
    imgUrls: [
      './../../images/banner2.jpg',
      './../../images/banner1.jpg',
      './../../images/banner3.jpg'
    ],
    hotArticles: [],
    hotJobs: [],
    industries: []
  },
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    wx.request({
      url: config.service.directionUrl,
      success: function (res) {
        that.setData({
          industries: res.data.data
        })
      }
    })
    this.getHotArticle()
    this.getHotApply()
  },
  onReady: function () {
    wx.hideLoading()
  },
  // 获取热门帖子
  getHotArticle: function () {
    const that = this

    wx.request({
      url: config.service.getHotArticleUrl,
      success: function (res) {
        that.setData({
          hotArticles: res.data.data
        })
      }
    })
  },
  // 获取热门内推
  getHotApply: function () {
    const that = this

    wx.request({
      url: config.service.getHotApplyListUrl,
      success: function (res) {
        that.setData({
          hotJobs: res.data.data
        })
      }
    })
  }
})