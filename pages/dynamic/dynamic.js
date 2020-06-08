// pages/dynamic/dynamic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: true,
    selected1: false,
    length:5,
    list:5,
    dynamicArr:[{length:1},{length:4},{length:9}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  selectedFn: function () {
    var that = this;
    that.setData({
      selected1: false,
      selected: true
    })
    // that.companyFieldFn();
  },
  selectedFn1: function () {
    var that = this;
    that.setData({
      selected1: true,
      selected: false
    })
   
  },

 
})