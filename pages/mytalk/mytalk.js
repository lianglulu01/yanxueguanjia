// pages/mytalk/mytalk.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       var that = this;
       that.getTalk();
  },
  del:function(e){
    var that = this;
      console.log(e);
      var data = {
          user_id:wx.getStorageSync("userinfo").id,
          circel_id:e.currentTarget.dataset.id
      };
      app.post('circel/delete-circel', data).then(res => {
        console.log(res);
       if(res.code==0){
           wx.showToast({
             title: '删除成功!',
             icon:'success',
             duration:2000
           })
           that.getTalks();
       }
     }).catch(err => {
       console.log(err)
     })
  },
  getTalk:function(){
    wx.showToast({
      title: '加载中',
      icon: 'loading'
      });
    var that = this;
       var data = {
           user_id:wx.getStorageSync('userinfo').id,
           page:that.data.page
       };
       app.get('circel/my-talk', data).then(res => {
         console.log(res);
        if(res.code==0){
          var array = that.data.list;
          var arr = res.data.list;
          var new_arr =  array.concat(arr);
          if(arr.length<1){
               wx.showToast({
                 title: '暂无更多!',
                 icon:'loading',
                 duration:2000
               })
               return false;
          }
          that.setData({
            list:new_arr
          })
          wx.hideToast();
        }
      }).catch(err => {
        console.log(err)
      })
  },
  getTalks:function(){
    var that = this;
    var data = {
        user_id:wx.getStorageSync('userinfo').id,
        page:that.data.page
    };
    app.get('circel/my-talk', data).then(res => {
      console.log(res);
     if(res.code==0){
       that.setData({
         list:res.data.list
       })
       wx.hideToast();
     }
   }).catch(err => {
     console.log(err)
   })
  },
  bindscrolltolower() {
    var that = this;
    
    that.setData({
      page:that.data.page+1
    })
    console.log(that.data.page+"页");
    that.getTalk();
    
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