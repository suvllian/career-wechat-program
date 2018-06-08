// pages/Career_details/Career_details.js
var config = require("../../config.js")
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    careerDetail: [],
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      mask: true,
    })
    this.setData({
      userInfo: appInstance.globalData.userInfo
    });
    const ind = options.id;
    var that = this;
    wx.request({
      url: config.service.finalUrl,
      data: { ind},
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        that.setData({
          careerDetail: res.data.data
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  toArticle: function () {
    wx.navigateTo({
      url: '../../pages/publish/publish',
    })
  }
})