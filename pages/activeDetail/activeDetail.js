// pages/activeDetail/activeDetail.js
Page({

  /* 页面的初始数据 */
  data: {
    details:{},
    type:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.id)
    var that = this
    wx.request({
      
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/detail',
      data:{
        id: options.id
      },
      
      success:function(res){
        console.log(res.data.data)
        that.setData({
          details:res.data.data
        })
      }
    })
  },

  toAuth: function () {
    if (!wx.getStorageSync('userinfo')) {
      this.setData({
        type: 1
      })
    }
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  // 电话老师
  open: function () {
    var that = this 
    console.log(that.data.details.phone)
    wx.makePhoneCall({

      phoneNumber: that.data.details.phone,

    })
  },
 
  // 跳转至订单页
  toSignUp: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../signUp/signUp?id=' + e.currentTarget.dataset.id,
    })
  },
})