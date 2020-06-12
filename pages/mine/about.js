 var WxParse = require("../wxParse/wxParse.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
  content:''
  },
  jiekou:function(){
    var _this = this
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?store_id=1&r=api/base/about ',
        data:{
        },
        method:"GET",
    success:function(res){
      console.log(res.data.data.content)
      _this.setData({
        content:res.data.data.content
      })
      WxParse.wxParse("content", "html", res.data.data.content, _this, 5);
    }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.jiekou()
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