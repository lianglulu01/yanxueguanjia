// pages/mine/my.js
//获取应用实例
const app = getApp()

Page({

  /* 页面的初始数据 */
  data: {
    list: [],
    page:1,
  },

  /** 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    // console.log(wx.getStorageSync('userinfo'))

<<<<<<< HEAD
    this.getMySignUp()
  },
  // 跳转-活动详情
  toRegistrationDetail(e){
    // console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../registrationDetail/registrationDetail?id='+e.currentTarget.dataset.id,
    })
=======
    this.mySignUp()
>>>>>>> master
  },
  // 获取我的活动
<<<<<<< HEAD
  getMySignUp() {
=======
  mySignUp() {
>>>>>>> master
    let id = wx.getStorageSync('userinfo').id
    let page = 1
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/my-order&id=' + id + '&page=' + page,
      success: res => {
        console.log(res)
        this.setData({
          list: res.data.data.list
        })
      },
      fail: err => {
        console.log(err)
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

  getMySignUpList(){
    let id = wx.getStorageSync('userinfo').id
    let page = this.data.page
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/my-order&id='+id+'&page='+page,

    })
    // https://yanxue.qiweibang.com/web/index.php?r=api/activity/my-order&id=1&page=1
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