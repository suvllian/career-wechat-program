const appInstance = getApp()
const config = require("../../config.js")
import { formatTime } from "../../utils/util.js"

Page({
  data: {
    jobsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyApplyList()
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
    
  },
  getMyApplyList: function () {
    const that = this
    const userInfo = appInstance.globalData.userInfo
    const { nickName } = userInfo

    wx.request({
      url: config.service.getMyApplyListUrl,
      data: { nickName },
      success: function(res) {
        that.setData({
          jobsList: res.data.data.map(item => {
            item.apply_time = formatTime(item.apply_time)
            item.id = `${item.id}`.padStart(6, '0')
            if (item.apply_status === 'pending') {
              item.applyStatus = '内推成功'
            } else {
              item.applyStatus = '申请中'
            }
            return item
          })
        })
      },
      fail: function(err) {
        console.log(err)
      }
    })
  }
})