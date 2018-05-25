// index page
const config = require("../../config.js")

Page({
  data: {
    content_top5: [
      { id: '1', text_info: '如何深度思考你的职业生涯（原来很多人都被误导了）' },
      { id: '2', text_info: '如何深度思考你的职业生涯（原来很多人都被误导了）' },
      { id: '3', text_info: '如何深度思考你的职业生涯（原来很多人都被误导了）' },
      { id: '4', text_info: '如何深度思考你的职业生涯（原来很多人都被误导了）' },
    ],
    imgUrls: [
      './../../images/banner2.jpg',
      './../../images/banner1.jpg',
      './../../images/banner3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  },
  onReady: function () {
    wx.hideLoading()
  },
  onShow: function () {

  },
  toDetail: function () {
    wx.navigateTo({
      url: '../career/career',
    })
  }
})