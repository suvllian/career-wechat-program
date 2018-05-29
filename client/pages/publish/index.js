const config = require("../../config.js")
const appInstance = getApp()

Page({
  data: {
    articleTitle: '',
    articleContent: ''
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  // 贴子标题
  bindTitleInput: function(e) {
    this.setData({
      articleTitle: e.detail.value
    })
  },
  // 贴子内容
  bindContentInput: function(e) {
    this.setData({
      articleContent: e.detail.value
    })
  },
  // 发布贴子
  publishArticle: function() {
    const { articleTitle, articleContent } = this.data

    if (!articleContent || !articleTitle) {
      wx.showToast({
        title: '请输入完整的内容',
        icon: 'none'
      })
      return 
    }

    wx.request({
      method: 'POST',
      url: `${config.service.addArticleUrl}`,
      data: {
        articleTitle,
        articleContent,
        nickName: appInstance.globalData.userInfo.nickName
      },
      success: function (res) {
        const { data } = res

        if (!data.code) {
          wx.showToast({
            title: '请求失败',
            icon: 'none'
          })
        }

        wx.navigateBack({})
      },
      fail: function (err) {
        console.log(err)
      }
    })

  }
})