// pages/publish/create_punch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity_id:'',
    user_id:'',
    weizhi:'',
    latitude:'',
    longitude:'',
     dis:''
  },
  weizhi:function(){
    var that = this
    wx.chooseLocation({
      success (res) {
       let weizhi = res.name
       let latitude = res.latitude
       let longitude = res.longitude

       that.setData({
         weizhi:weizhi,
         latitude:latitude,
         longitude:longitude
       })
      }
     })
  },
  dis:function(e){
    var dis = e.detail.value
    this.setData({
      dis:dis
    })
  },
  submit:function(){
    let weizhi = this.data.weizhi
    let longitude = this.data.longitude
    let latitude =this.data.latitude
    let dis = this.data.dis
    let userinfo = wx.getStorageSync('userinfo')
    let id = userinfo.id
    let activity_id = this.data.activity_id
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/clock-in/create',
      data:{
        activity_id:activity_id,
        address:weizhi,
        user_id:id,
        longitude:longitude,
        latitude:latitude,
        distance:dis
      },
      method:"POST",
      success:function(res){
        wx.showToast({
          title: '创建成功',
        })
       console.log(res.data)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var activity_id = options.id
    this.setData({
      activity_id:activity_id
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