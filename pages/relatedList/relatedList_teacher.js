const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity_id: '',
    info: {},
    list: [],
    page: 1
  },
  student: function (e) {
    console.log(e)
    // var that = this
    // var list = that.data.list
    wx.navigateTo({
      url: '/pages/relatedList/relatedList_student?activity_id=' + this.data.activity_id  + '&teacher_id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.activity_id = options.id //活动id
    this.setData({
      info: wx.getStorageSync('userinfo')
    })
    this.getList()
  },

  getList: function () {
    let t = this, d = t.data
    app.get(
      'activity/activity-teacher', { user_id: d.info.id, activity_id: d.activity_id }
    ).then(res => {
      t.setData({
        list: res.list
      })
    }).catch(err => {
      wx.showToast({
        title: '网络错误，请返回重试',
      })
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let d = this.data
    let p = '/pages/index/index?id=' + d.info.id + "&activity_id=" + d.activity_id
    return {
      title: '邀请你成为好友,更多好玩的夏令营在等着你哟~~',
      imageUrl: 'https://yanxue.qiweibang.com/web/uploads/image/store_1/72f7415d6d701faf8d13bec85b7b710a4a9a07f7.png',
      path: '/pages/index/index?id=' + d.info.id + "&activity_id=" + d.activity_id + '&data_type=1'
    }
  }
})