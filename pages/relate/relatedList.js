// pages/relatedList/relatedList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'' //邀请人的id
  },
toPerson:function(){
  // wx.navigateTo({
  //   url: '../personalData/personalData',
  // })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(wx.getStorageSync('userinfo').id)
    this.setData({
      id: wx.getStorageSync('userinfo').id
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
    return {
      

      title:'邀请你成为好友,更多好玩的夏令营在等着你哟~~' ,
      imageUrl: 'https://yanxue.qiweibang.com/web/uploads/image/store_1/72f7415d6d701faf8d13bec85b7b710a4a9a07f7.png',
      path: '/pages/index/index?id='+this.id
  }
  }
})