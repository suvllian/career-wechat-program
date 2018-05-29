const config = require("../../config.js")
import { formatTime } from "../../utils/util.js"

Page({
  data: {
    article: {},
    hiddenmodalput: true,
    focus: false,
    modalFlag: true,
    info: '',
    number2: '',
    commentList: [],
    number2: '',
    error: '请输入内容',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取文章内容
    this.getContent(options.id)
    // 获取评论内容
    this.getComment(options.id)
    this.addReadingQuantity(options.id)
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
  // 增加文章阅读量
  addReadingQuantity: function(id) {
    wx.request({
      url: `${config.service.addReadingQuantityUrl}?articleId=${id}`,
      success: function(res) {
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
      url: `${config.service.specialArticleUrl}?id=${id}`,
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
      url: `${config.service.getArticleCommentUrl}?articleId=${id}`,
      success: function (res) {
        const { data } = res
        const { data: commentList } = data

        that.setData({
          commentList
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  input: function (e) {
    this.setData({
      info: e.detail.value,
    })
  },
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
      focus: true,
    });
  },
  close: function () {
    this.setData({ modalFlag: true })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true,
      error: '请输入内容',
      info: ''
    });
  },
  //确认 
  confirm: function (e) {
    if (this.data.info == 0) {
      this.setData({
        error: '提示：输入不能为空！',
      })
    } else {
      this.setData({
        hiddenmodalput: true,
        modalFlag: false,
      })
    }

  },
})