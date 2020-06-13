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
    dynamicArr:[{length:1}],
    page:1
  },
  detail:function(e){
    console.log(e);
    wx.navigateTo({
      url: '/pages/activeDetail/activeDetail?id='+e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this;
     that.getQz();
  },
  getQz:function(){
        var that = this;
        var user_id = wx.getStorageSync("userinfo").id;
        var data = {
          user_id:user_id,
          page:that.data.page
        };
        wx.request({
          url: 'https://yanxue.qiweibang.com/web/index.php?r=api/circel/my-circel',
          data:data,
          success:function(res){
              console.log(res);
              that.setData({
                   myList:res.data.data.list
              })
          }
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
  fbqz:function(){
     wx.navigateTo({
       url: '../releaseDynamic/releaseDynamic',
     })
  },
  toComment:function(){
    wx.navigateTo({
      url: '../comment/comment',
    })
  }

 
})