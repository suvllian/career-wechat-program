// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalAboutFlag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  tomy_publish_in: function () {
    wx.navigateTo({
      url: '../my_publish_in/my_publish_in',
    })
  },
  tomine_publish: function () {
    wx.navigateTo({
      url: '../mine_publish/mine_publish',
    })
  },
  toPerson:function(){
    wx.navigateTo({
      url: '../person/person',
    })
  },
  closeAbout: function () {
    this.setData({
      modalAboutFlag: false
    })
  },
  about:function(){
    this.setData({
      modalAboutFlag:true
    })
  }
})