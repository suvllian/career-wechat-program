var appInstance = getApp()

Page({
  data: {
    userInfo: {},
    modalAboutFlag:false
  },
  onLoad: function (options) {
    this.setData({
      userInfo: appInstance.globalData.userInfo
    })
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
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
  }
})