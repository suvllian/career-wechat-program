const appInstance = getApp()
const config = require("../../config.js")

Page({
  data: {
    nameFlag: true,
    userInfo: {},
    name: '',
    phone: 0,
    wechatId: 'wx',
    gender: 1
  },
  onLoad: function (options) {
    const baiscUserInfo = appInstance.globalData.userInfo
    const that = this

    if (!baiscUserInfo.nickName) {
      wx.showToast({
        title: '未登录',
        icon: 'none'
      })

      return
    }

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
          wechatId: userInfo.wechatId,
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
  changeName: function () {
    this.setData({
      nameFlag: false
    });
  },
  confirmName: function (e) {
    let newName = e.detail.value;
    var that = this;
    wx.request({
      url: config.service.changeNameUrl,
      data: {
        newName: newName,
        nickName: appInstance.globalData.userInfo
      },
      success: function (ctx) {
        console.log(ctx);
        //  that.setData({
        //    name:ctx.data[0].name
        //  })
      },
      fail: function () {

      }
    })
  }
})