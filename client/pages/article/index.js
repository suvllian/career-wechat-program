const appInstance = getApp()
const config = require("../../config.js")
import { formatTime } from "../../utils/util.js"

Page({
  data: {
    articleId: 0,
    article: {},
    commentList: [],
    commentValue: '',
    commitInput: false
  },
  onLoad: function (options) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      mask: true,
    })
    const { id: articleId } = options

    this.getContent(articleId)
    this.getComment(articleId)
    this.setData({
      articleId
    })
  },
  // 获取文章内容
  getContent: function (id) {
    const that = this

    wx.request({
      url: config.service.specialArticleUrl,
      data: { id },
      success: function (res) {
        const { data } = res
        const article = data.data && data.data[0]
        article.publishTime = formatTime(article.publish_time)
        wx.hideLoading();
        that.setData({
          article
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  // 获取评论内容
  getComment: function (id) {
    const that = this

    wx.request({
      url: config.service.getArticleCommentUrl,
      data: {
        articleId: id
      },
      success: function (res) {
        const { data } = res
        const { data: commentList } = data

        commentList.forEach(item => item.comment_time = formatTime(item.comment_time))
        wx.hideLoading();
        that.setData({
          commentList
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  inputComment: function (e) {
    this.setData({
      commentValue: e.detail.value
    })
  },
  submitComment: function (e) {
    const { commentValue, articleId } = this.data
    const { nickName } = appInstance.globalData.userInfo
    const that = this
    that.setData({
      commitInput: true
    })
    if (!articleId) {
      return
    }
    if (commentValue) {
      wx.request({
        url: config.service.addCommentUrl,
        method: 'POST',
        data: {
          articleId,
          nickName,
          commentValue
        },
        success: function (res) {
          that.getComment(articleId)
          wx.showModal({
            content: '发布成功',
            showCancel: false
          });
          that.setData({
            commitInput: false
          })
        },
        fail: function (err) {
          console.log(err)
        }
      })
    } else {
      wx.showModal({
        content: '评论不能为空！',
        showCancel: false
      })
    }
  },
  onReady: function () {
    setTimeout(function () {
      
    }, 1000)
  },
})