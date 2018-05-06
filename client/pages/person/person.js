var appInstance = getApp()
const config = require("../../config.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nameFlag:true,
    userInfo: {},
    name:'',
    phone:0,
    wechatId:'wx',
    gender:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: config.service.professionUrl,
        data:appInstance.globalData.userInfo,
        success:function(ctx){
        console.log(ctx);
        that.setData({
          userInfo: appInstance.globalData.userInfo,
          name: ctx.data.data[0].name,
          phone: ctx.data.data[0].phone,
          wechatId: ctx.data.data[0].wechatId,
          gender: ctx.data.data[0].gender
        })
      },
      fail:function(){

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
  changeName:function(){
      this.setData({
        nameFlag:false
      });
  },
  confirmName:function(e){
    let newName=e.detail.value;
    var that= this;
      wx.request({
        url:config.service.changeNameUrl ,
        data:{
          newName:newName,
          nickName:appInstance.globalData.userInfo
        },
        success:function(ctx){
          console.log(ctx);
        //  that.setData({
        //    name:ctx.data[0].name
        //  })
        },
        fail:function(){

        }
      })
  }
})