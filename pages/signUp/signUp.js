// pages/signUp/signUp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityInfo: {},
    joinUserId: [],
    joinUserName: [],
    phone: 0,
    id: 1
  },

  /*  生命周期函数--监听页面加载 */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id
    })
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/show-join-activity&id=' + options.id,
      success: res => {
        // console.log(res)
        this.setData({
          activityInfo: res.data.data
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  // 获取手机号
  bindKeyInput(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  pay(e) {
    console.log(this)
    console.log(e)
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/join-activity',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: wx.getStorageSync('userinfo').id,
        join_user: JSON.stringify(this.data.joinUserId),
        mobile: this.data.phone,
        activity_id: this.data.id,
      },
      success: (res) => {
        console.log(res)
        if (res.data.msg == "请选择参加人") {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        } else if (res.data.msg == "手机号错误") {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        } else if (res.data.msg == "操作成功") {
          wx.request({
            url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/pay-data',
            data: {
              order_id: res.data.data,
              id: wx.getStorageSync('userinfo').id
            },
            success: res => {
              console.log(res)
              wx.requestPayment({
                timeStamp: res.data.data.timeStamp,
                nonceStr: res.data.data.nonceStr,
                package: res.data.data.package,
                signType: res.data.data.signType,
                paySign: res.data.data.paySign,
                success(res) {

                },
                fail(res) { console.log(res) }
              })
            },
            fail: err => {

            }
          })
        }
        // console.log(wx.getStorageSync('userinfo').id)  
      }
    })
  },
  
  // 跳转关联用户列表
  chooseUser: function () {
    wx.navigateTo({
      url: '../chooseUser/chooseUser',
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