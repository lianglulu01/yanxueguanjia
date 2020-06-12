// pages/chooseUser/chooseUser.js
Page({

  /* 页面的初始数据 */
  data: {
    userList: [],
    checked:false,
  },

  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    console.log(options)
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/choose-user&id=1',
      data: '',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success:res=>{
        console.log(res.data.data)
        this.setData({
          userList: res.data.data.list
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    
  },
  isChoose(){
    if (!this.data.checked){
      this.setData({
        checked:true
      })
      // console.log(this.data.checked)
    }else{
      this.setData({
        checked: false
      })
      // console.log(this.data.checked)
    }
  },

  backPay:function(){
    if (this.data.checked){
       wx.navigateBack({
         delta: 1,
       })
    }
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
