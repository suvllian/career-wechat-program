// pages/my-publish-fabu/index.js
const appInstance = getApp()
var config = require("../../config.js")
Page({
  data: {
    content: "",
    array: [],
    index: "",
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  publishPushes: function () {
    var that = this;
    var { nickName } = appInstance.globalData.userInfo;
    var index = parseInt(this.data.index) + 1;

    var content = this.data.content;
    wx.request({
      url: config.service.addPushesUrl,
      method: "POST",
      data: { content, nickName, index },
      success: function (res) {
        console.log(res);
        wx.switchTab({
          url: '../../pages/index/index',
        })
      }
    })
  },
  bindContentInput: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: config.service.getCareerName,
      success: function (res) {
        console.log(res.data.data);
        var arr = [];
        var result = res.data.data;
        result.forEach((item) => {
          arr.push(item.name);
        })
        that.setData({
          array: arr
        })
      }
    })
  }
})