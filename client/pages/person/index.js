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
    var that = this;
    var { phone, name, userInfo } = this.data;
    wx.request({
      url: config.service.changeNameUrl,
      method: "POST",
      data: { phone, name, userInfo },
      success: function (res) {
        console.log(res);
        that.setData({
          sessionFlag: false
        })
      }
    })
  },
  onLoad: function (options) {
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

})