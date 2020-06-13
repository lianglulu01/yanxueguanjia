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
    jump:true,
    tongming:false,
    last:true,
    dynamicArr:[{length:9}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tongming:function(){
    this.setData({
      tongming:true,
      jump:true,
      last:false
    })
  },
  huifu:function(){
    this.setData({
      last:true,
      jump:false,
      tongming:false
    })
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
  toComment:function(){
    wx.navigateTo({
      url: '../comment/comment',
    })
  }

 
})