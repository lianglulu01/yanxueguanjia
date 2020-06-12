// pages/publish/member.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    more:true,
    less:false,
    list:[0,1,2,3]
  },

  /**
   * 生命周期函数--监听页面加载
   */pingjia:function(){
     wx.navigateTo({
       url: '/pages/publish/comment',
     })
   },
  more:function(){
    this.setData({
      more:false,
      less:true
    })
  },
  less:function(){
     this.setData({
       more:true,
       less:false
     })
  },
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