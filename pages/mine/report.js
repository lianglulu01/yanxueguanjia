// pages/index/m y.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mylist: [

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  xiangqing:function(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/mine/report_index?id=' + e.currentTarget.dataset.id
    })

  },
  onLoad: function (options) {
    this.getMylist()
  },

  getMylist() {
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/join-activity-list',
      data: {
        user_id: wx.getStorageSync('userinfo').id,
        page: 1
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