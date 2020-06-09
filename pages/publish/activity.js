// pages/publish/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   src:"/images/tongming/add.png",
   date: '2020-06-01',
  },
  gotoShow:function(){
       var _this = this
       wx.chooseImage({
        count:9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success:function(res){
          _this.setData({
            src:res.tempFilePaths
          })
        }
       })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  formSubmit:function(e) {
    console.log(e)
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/sub-activity',
      behaviors: ['wx://form-field'],
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      data:{
        id:"",
        name:"",
        price: "",
        pic_url:["https://meyy.qiweibang.com/static/img/xiaochengxu/turntable/start.png"],
        desc:"",
        team_num:"",
        start_time:"",
        end_time: "",
        richeng:"",
        know:"",
        is_open:"",
        address:""

      },
      method:"POST",
      success:function(res) {
        console.log(res)
        wx.showToast({
          title: '发布成功',
        })
        setTimeout(function(){
          wx.navigateBack({
            delta:1
          })
        }, 1500);
      } 
    })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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