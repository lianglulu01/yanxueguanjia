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
  // getUserInfo: function (o) {
  //   // wx.showLoading({
  //   //   title: '加载中',
  //   // })
  //   var that = this;
  //   "getUserInfo:ok" == o.detail.errMsg && wx.login({
  //     success: function (e) {
  //       console.log(e)
  //       var t = e.code;
  //       let abc = {
  //         code: t,
  //         user_info: o.detail.rawData,
  //         encrypted_data: o.detail.encryptedData,
  //         iv: o.detail.iv,
  //         signature: o.detail.signature
  //       };
  //       console.log(abc)

  //       wx.request({
  //         url: 'https://yanxue.qiweibang.com/web/index.php?r=api/users/login',
  //         method: 'POST',
  //         header: {
  //           'content-type': 'application/x-www-form-urlencoded'
  //         },
  //         data: abc,
  //         success: function (res) {
  //           console.log(res)
  //           console.log(res.data.data.info)
  //           // if (res.data.data.info){
  //           wx.hideLoading()
  //           wx.setStorageSync('userinfo', res.data.data.info)
  //           that.setData({
  //             type: 0,
  //             info: res.data.data.info,
  //             not: 1
  //             // info: wx.getStorageSync('userinfo')
  //           })
  //           // }

  //         }
  //       })

  //     },
  //     fail: function (e) { }
  //   });
  // },
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
  signUp: function (e) {
    console.log(e.currentTarget.dataset.id)
    // this.getUserInfo()
    wx.navigateTo({
      url: '../signUp/signUp?id=' + e.currentTarget.dataset.id,
    })
  },
})