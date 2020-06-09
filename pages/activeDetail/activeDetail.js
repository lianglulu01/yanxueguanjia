// pages/activeDetail/activeDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    obj:{},
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
        console.log(res)
        that.setData({
          obj:res.data.data
        })
      }
    })
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

  open: function () {
    var that = this 
    console.log(that.data.obj.phone)
    wx.makePhoneCall({

      phoneNumber: that.data.obj.phone,

    })
  }
 
})