// pages/registrationDetail/registrationDetail.js
//获取应用实例
const app = getApp()

Page({

  /* 页面的初始数据 */
  data: {
    registrationDetail:{},
    registrationDetailId:[],
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      id: options.id
    })
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/join-activity-list',
      data: {
        user_id: wx.getStorageSync('userinfo').id,
        page: 1
      },
      success: res => {
        console.log(res.data.data)
        this.setData({
          registrationDetail: res.data.data,
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