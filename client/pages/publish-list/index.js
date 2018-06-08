const appInstance = getApp()
const config = require("../../config.js")
import { formatTime } from "../../utils/util.js"

Page({
  data: {
    careerId: 0,
    jobsList: []
  },
  onLoad: function (options) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      mask: true,
    })
    this.setData({
      careerId: options.id
    })
    this.getJobsByProfession()
  },
  onReady: function () {
    
  },
  onShow: function () {

  },
  getJobsByProfession: function() {
    const that = this;
    const userInfo = appInstance.globalData.userInfo
    const { nickName } = userInfo
    const { careerId } = this.data

    wx.request({
      url: config.service.getJobsByProfessionUrl,
      data: { 
        careerId,
        nickName
      },
      success: function (res) {
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          mask: true,
        })
        that.setData({
          jobsList: res.data.data.map(item => {
            item.publish_time = formatTime(item.publish_time)
            item.id = `${item.id}`.padStart(6, '0')
            return item
          })
        })
      }
    })
  },
  applyJob: function (e) {
    const { jobId } = e.currentTarget.dataset
    const userInfo =  appInstance.globalData.userInfo
    const { nickName } = userInfo
    const that = this
    
    wx.request({
      url: config.service.applyJobUrl,
      method: 'POST',
      data: {
        jobId,
        nickName
      },
      success: function(res) {
        that.getJobsByProfession()
      },
      fail: function(err) {
        console.log(err)
      }
    })
  }
})