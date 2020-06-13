// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      text:'',
      user_id:''
  },
  content:function(e){
     console.log(e.detail.value);
     var that = this;
     that.setData({
         text:e.detail.value
     })
  },
  send:function(){
         var that = this;
         if(!that.data.text){
            wx.showToast({
              title: '评论内容不能为空!',
              icon:"loading",
              duration:2000
            })
            return false;
        }
         var  data  = {
             circel_id:that.data.circel_id,
             activity_id:that.data.activity_id,
             to_user_id:that.data.user_id,
             user_id:wx.getStorageSync("userinfo").id,
             text:that.data.text,
             comment_id:that.data.comment_id
         }
          wx.request({
            url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity-comment/add-comment',
            data:data,
            method:'POST',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success:function(e){
                console.log(e)
                if(e.data.code==0){
                  wx.showToast({
                    title: '评论成功!',
                    icon:'success',
                    duration:2000,
                  })
                    setTimeout(function(){
                      wx.navigateBack({//返回
                        delta: 1
                      })
                    },2000)
                }else{
                  wx.showToast({
                    title: '评论失败!',
                    icon:'error',
                    duration:2000,
                  })
                }
            }
          })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
       var  that = this;
       that.setData({
             user_id:options.user_id,
             circel_id:options.circel_id,
             activity_id:options.activity_id,
             comment_id:options.comment_id
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