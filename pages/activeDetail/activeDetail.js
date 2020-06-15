// pages/activeDetail/activeDetail.js
Page({

  /* 页面的初始数据 */
  data: {
    details:{},
    type:1,
    userinfo:{},
    loginType:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this
    var  userinfo = wx.getStorageSync('userinfo')
    if(userinfo){
      that.setData({
        userinfo:userinfo
      })
    }
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
  signUp: function (e) {
    if (!wx.getStorageSync('userinfo')){
      this.setData({
        loginType:1
      })
    }
    console.log(this.data.userinfo)
    // console.log(this.data.userinfo.id)
    if(this.data.userinfo && this.data.userinfo.id){
      wx.navigateTo({
        url: '../signUp/signUp?id=' + e.currentTarget.dataset.id,
      })
    }else{
      // this.setData({
      //   type:0
      // })
    }
  },
  getUserInfo: function(o) {
    console.log(o)
    // wx.showLoading({
    //   title: '加载中',
    // })
    var that = this;
    if(o.detail.errMsg == 'getUserInfo:fail auth deny'){
      // this.setData({
      //   loginType:0
      // })
    }
    "getUserInfo:ok" == o.detail.errMsg && wx.login({
      success: function(e) {
        var t = e.code;
        let abc = {
          code: t,
          user_info: o.detail.rawData,
          encrypted_data: o.detail.encryptedData,
          iv: o.detail.iv,
          signature: o.detail.signature
        };
        wx.showLoading({
          title: '请稍后',
        })
        wx.request({
          url: 'https://yanxue.qiweibang.com/web/index.php?r=api/users/login',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: abc,
          success: function(res) {
              wx.hideLoading()
              wx.setStorageSync('userinfo', res.data.data.info)
              that.setData({
                loginType:0,
                userinfo: res.data.data.info
              })
          }
        })

      },
      fail: function(e) {
        console.log(e)
      }
    });
  },
  closeMsg: function () {
    this.setData({
      loginType: 0
    })
  }
})