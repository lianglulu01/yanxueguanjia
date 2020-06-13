// pages/personalData/personalData.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let info = wx.getStorageSync('userinfo'), t = this
    app.get('user-info/get-user', {
      id: info.id
    }).then(res => {
      if (res.code == 0) {
        t.setData({
          info: res.data.info
        })
      }
    }).catch(err => {
      console.log(err)
    })

  },
  saveInfo(e) {
    let _d = this.data
    let d = e.detail.value
    d.open_id = _d.info.open_id
    d.id = _d.info.id
    app.post('user-info/set-user', d).then(res => {
      if (res.code == 0) {
        wx.showToast({
          title: '保存成功',
          icon: 'none',
          duration:1600,
          success(e) {
            setTimeout(function(){
              wx.navigateBack()
            },1600)
          }
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    }).catch(err => {
      wx.showToast({
        title: '网络错误，请重试',
      })
    })
    console.log(e)
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