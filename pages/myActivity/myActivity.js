// pages/index/m y.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mylist: [],
    modalHidden2: true,
    signIn_ewmsrc: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMylist()
  },

  getMylist() {
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/join-activity-list',
      data: {
        user_id: wx.getStorageSync('userinfo').id,
      },
      success: res => {
        console.log(res)
        this.setData({
          mylist: res.data.data.list
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  // 去签到
  alertEWM: function (e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      modalHidden2: false
    })
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/sign-in/sub&user_id=' + wx.getStorageSync('userinfo').id + '&activity_id=' + e.currentTarget.dataset.id,
      success: res => {
        console.log(res.data.data)
        this.setData({
          signIn_ewmsrc: res.data.data
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  modalCandel2: function () {
    this.setData({
      modalHidden2: true
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  // 立即查看-跳转-活动详情
  toDetail: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../activeDetail/activeDetail?id=' + e.currentTarget.dataset.id,
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})