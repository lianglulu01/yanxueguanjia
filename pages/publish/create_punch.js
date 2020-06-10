// pages/publish/create_punch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity_id:1,
    user_id:1,
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
    let weizhi = this.weizhi
    let longitude = this.longitude
    let latitude =this.latitude
    let dis = this.dis
    let userinfo = wx.getStorageSync('userinfo')
    let user_id = wx.getStorageSync('user.data.list.id')
    // console.log(userinfo)
    let id = userinfo.id
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/clock-in/create',
      data:{
        activity_id:user_id,
        address:weizhi,
        user_id:id,
        longitude:longitude,
        latitude:latitude,
        distance:dis
      },
      methods:"POST",
      success:function(res){
       console.log(res.data)
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