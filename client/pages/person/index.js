const appInstance = getApp()
const config = require("../../config.js")

Page({
  data: {
    nameFlag: false,
    userInfo: {},
    name: '',
    phone: 0,
    gender: 1,
    isShow: false,
    sessionFlag: false
  },
  fold: function () {
    this.setData({
      nameFlag: false,
      isShow: false
    })
  },
  addMine: function () {
    this.setData({
      nameFlag: true,
      isShow: true
    })
  },
  changeFLag: function () {
    this.setData({
      sessionFlag: true
    })
  },
  changePhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  changeName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  changeFlag:function(){
    this.setData({
      sessionFlag: true
    })
  },
  changeSuc: function () {
    const that = this;
    const { phone, name, userInfo } = this.data;

    if (!phone || !name || !userInfo) {
      wx.showToast({
        title: '请填写完整的用户信息',
        icon: 'none'
      })
      return
    }

    wx.request({
      url: config.service.changeNameUrl,
      method: "POST",
      data: { phone, name, userInfo },
      success: function (res) {
        that.setData({
          sessionFlag: false
        })
      }
    })
  },
  onLoad: function (options) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      mask: true,
    })
    const baiscUserInfo = appInstance.globalData.userInfo
    const that = this

    wx.request({
      url: config.service.professionUrl,
      data: {
        nickName: baiscUserInfo.nickName
      },
      success: function (res) {
        const { data = {} } = res
        const { data: userInfo = {} } = data
        wx.hideLoading()

        that.setData({
          userInfo: baiscUserInfo,
          name: userInfo.name,
          phone: userInfo.phone,
          gender: userInfo.gender
        })
      },
      fail: function (err) {
        that.setData({
          userInfo: baiscUserInfo
        })
      }
    })

  },
  onReady: function () {

  }
})