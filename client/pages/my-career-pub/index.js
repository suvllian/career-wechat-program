const appInstance = getApp();
const config = require("../../config.js")
import { formatTime } from "../../utils/util.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myPushesList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var { nickName } = appInstance.globalData.userInfo;
    wx.request({
      url: config.service.getMyPushesUrl,
      data: { nickName },
      success: function (res) {
        that.setData({
          myPushesList: res.data.data.map(item => {
            item.publish_time = formatTime(item.publish_time)
            item.id = `${item.id}`.padStart(6, '0')
            return item
          })
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})