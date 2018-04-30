// pages/discuss/discuss.js
Page({
  data: {
    hiddenmodalput: true, 
    focus: false,
    modalFlag:true,
    info:'',
    number2:'',
    content: [
      { image: '../../images/user.jpeg', name: '小明', time: '2018-03-24', content_info:'洒家卡恢复健'},
      { image: '../../images/user.jpeg', name: '小红', time: '2018-02-25', content_info: '帖子不错' },
      { image: '../../images/user.jpeg', name: '小绿', time: '2018-10-10', content_info: '真的啊' },
    ],
    number2:'',
    error:'请输入内容',
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