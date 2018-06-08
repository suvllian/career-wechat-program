const appInstance = getApp();
const config = require("../../config.js")
import { formatTime } from "../../utils/util.js"

Page({
  data: {
    myPushesList: []
  },
  onLoad: function (options) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      mask: true,
    })
    const that = this;
    const { nickName } = appInstance.globalData.userInfo;
    wx.request({
      url: config.service.getMyPushesUrl,
      data: { nickName },
      success: function (res) {
        wx.hideLoading();
        that.setData({
          myPushesList: res.data.data.map(item => {
            item.publish_time = formatTime(item.publish_time)
            console.log(item.id);
            item.id = `${item.id}`.padStart(6, '0')
            return item
          })
        })
      }
    })
  }
})