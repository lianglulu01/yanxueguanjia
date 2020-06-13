// pages/chooseUser/chooseUser.js
Page({

  /* 页面的初始数据 */
  data: {
    userList: [],
    joinUserId: [],
    joinUserName: [],
    is_check: "",
  },

  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    let user_id = wx.getStorageSync('userinfo').id
    console.log(options)
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/choose-user&id=1&user_id=1',
      // https://yanxue.qiweibang.com/web/index.php?r=api/activity/choose-user&id=1&user_id=1
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: res => {
        console.log(res)
        this.setData({
          userList: res.data.list
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  // 选择参加活动用户
  checkbox: function (e) {
    // console.log(e)
    console.log(e.currentTarget.dataset.id)
    var index = e.currentTarget.dataset.index;//获取当前点击的下标
    var userList = this.data.userList;//选项集合
    userList[index].is_check = !userList[index].is_check;//改变当前选中的checked值
    var joinUserId = this.data.joinUserId.push(e.currentTarget.dataset.id)
    // console.log(this.data.joinUserId)
    this.setData({
      userList: userList,
      joinUserId: this.data.joinUserId
    });
  },
  checkboxChange: function (e) {
    console.log(e)
    this.setData({
      checkValue: e.detail.value,
    });
  },
  // 确定选择后 返回付款页
  confirm: function () {
    // console.log(this.data.checkValue)//所有选中的项的value
    console.log(this.data)
    this.setData({
      joinUserId: this.data.joinUserId,
      joinUserName: this.data.checkValue,
    })
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //获取上一个页面
    prevPage.setData({
      joinUserId: this.data.joinUserId,
      joinUserName: this.data.checkValue,
    })
    wx.navigateBack({
      delta: 1
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
