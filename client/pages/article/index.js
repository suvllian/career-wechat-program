const appInstance = getApp()
const config = require("../../config.js")
import { formatTime } from "../../utils/util.js"

Page({
  data: {
    articleId: 0,
    article: {},
    commentList: [],
    commentValue: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id: articleId } = options
    // 获取文章内容
    this.getContent(articleId)
    // 获取评论内容
    this.getComment(articleId)
    this.addReadingQuantity(articleId)

    this.setData({
      articleId
    })
  },
  // 增加文章阅读量
  addReadingQuantity: function (id) {
    wx.request({
      url: `${config.service.addReadingQuantityUrl}?articleId=${id}`,
      success: function (res) {
        console.log(res)
      },
      fail: function (err) {
        console.log(err)
      }
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

    if (!articleId) {
      return
    }

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
        that.setData({
          commentValue: ''
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  }
})