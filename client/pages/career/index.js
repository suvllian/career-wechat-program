// pages/career/career.js
var config = require("../../config");
Page({
  data: {
    career: []
  },
  onLoad: function (options) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      mask: true,
    })
    const ind = options.id;
    var that = this;

    wx.request({
      url: config.service.middleUrl,
      data: { ind },
      success: function (res) {
        wx.hideLoading();
        that.setData({
          career: res.data.data
        })
      },
      fail: function () {
        console.log(2)
      }
    })
  }
})