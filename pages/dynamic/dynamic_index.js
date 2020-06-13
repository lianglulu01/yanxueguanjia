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
    jump:false,
    tongming:false,
    last:true,
    dynamicArr:[{length:9}]
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
        console.log(options.circel_id);
        var data = {
           user_id:wx.getStorageSync('userinfo').id,
           circel_id:options.circel_id
        }
        wx.request({
          url: 'https://yanxue.qiweibang.com/web/index.php?r=api/circel/circel-detail',
          data:data,
          success:function(res){
               console.log(res)
               that.setData({
                   detail:res.data.data
               })
          }
        })
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