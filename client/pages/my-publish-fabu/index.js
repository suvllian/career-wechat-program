const appInstance = getApp()
const config = require("../../config.js")

Page({
  data: {
    content: "",
    array: [],
    index: "",
  },
  onLoad: function (options) {
    const that = this;
    wx.request({
      url: config.service.getCareerName,
      success: function (res) {
        const arr = [];
        const result = res.data.data;
        result.forEach((item) => {
          arr.push(item.name);
        })
        that.setData({
          array: arr
        })
      }
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  publishPushes: function () {
    const that = this;
    const { nickName } = appInstance.globalData.userInfo;
    const index = parseInt(this.data.index) + 1;
    const content = this.data.content;

    if (!content || !nickName || !index) {
      wx.showToast({
        title: '请填写完整的内推信息',
        icon: 'none'
      })
      return
    }

    wx.request({
      url: config.service.addPushesUrl,
      method: "POST",
      data: { content, nickName, index },
      success: function (res) {
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
  }
})