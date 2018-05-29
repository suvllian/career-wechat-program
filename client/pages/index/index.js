// index page
const config = require("../../config.js")

Page({
  data: {
    hotArticles: [],
    imgUrls: [
      './../../images/banner2.jpg',
      './../../images/banner1.jpg',
      './../../images/banner3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
   industries:[]
  },
  onLoad: function (options) {
    var that=this;
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    wx.request({
      url: config.service.directionUrl,
      success:function(res){
        that.setData({
          industries:res.data.data
        })
      }
    })
    this.getHotArticle()
  },
  onReady: function () {
    wx.hideLoading()
  },
  onShow: function () {

  },
  // 获取热门帖子
  getHotArticle: function() {
    const that = this
    
    wx.request({
      url: config.service.getHotArticleUrl,
      success: function (res) {
        that.setData({
          hotArticles: res.data.data
        })
      }
    })
  }
})