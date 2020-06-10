// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      info: wx.getStorageSync('userinfo')
    })
  },
  select:function(){
    wx.navigateTo({
      url: '../userList/userList',
    })
  }
 
})