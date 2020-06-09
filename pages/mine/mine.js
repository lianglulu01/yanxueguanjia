//logs.js
// const util = require('../../utils/util.js')

Page({
  data: {
    type: 0,
    info:{}
  },

  onLoad: function() {
    this.setData({
      info: wx.getStorageSync('userinfo')
    })
  },
  release: function() {
    wx.navigateTo({
      url: '../releaseDynamic/releaseDynamic',
    })
  },
  editPeople: function() {
    wx.navigateTo({
      url: '../personalData/personalData',
    })
  },
  toDynamic: function() {
    // wx.navigateTo({
    //   url:'../dynamic/dynamic'
    // })
  },
  associate: function() {
    wx.navigateTo({
      url: '../relatedList/relatedList',
    })
  },
  toAuth: function() {
    this.setData({
      type: 1
    })
  },
  getUserInfo: function(o) {
    wx.showLoading({
      title: '加载中',
    })
    var n = this;
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
        console.log(abc)

        wx.request({
          url: 'https://yanxue.qiweibang.com/web/index.php?r=api/users/login',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: abc,
          success: function(res) {
            console.log(res.data.data.info)
            if (res.data.data.info){
              wx.hideLoading()
              wx.setStorageSync('userinfo', res.data.data.info)
              n.setData({
                type:0,
                info: wx.getStorageSync('userinfo')
              })
            }
           
          }
        })

      },
      fail: function(e) {}
    });
  },
})