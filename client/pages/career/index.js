// pages/career/career.js
var config=require("../../config");
Page({

  /**
   * 页面的初始数据
   */
  data: {
   career:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const ind=options.id;
    var that=this;
    console.log(ind);
      wx.request({
        url:config.service.middleUrl,
        data:{ind},
        success:function(res){
          that.setData({
            career:res.data.data
          })
        },
        fail:function(){
          console.log(2)
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

  toDetail: function () {
    wx.navigateTo({
      url: '../Career_details/Career_details',
    })

  }
})