// pages/publish/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {
      rolename: '',
      nickName: '',
      phone: '',
      id: ''
    },
    list: {},
    user: {}
  },
  member:function(){
    wx.navigateTo({
      url: '/pages/publish/member',
    })
  },
  xiezhu: function () {
    wx.navigateTo({
      url: '/pages/relatedList/relatedList',
    })
  },
  comment: function () {
    wx.navigateTo({
      url: '/pages/publish/comment',
    })
  },
  takeout: function () {
    wx.navigateTo({
      url: '/pages/publish/activity',
    })
  },
  jilu: function () {
    wx.navigateTo({
      url: '/pages/publish/jilu',
    })
  },
  create_punch: function (e) {
    wx.navigateTo({
      url: '/pages/publish/create_punch?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getlist()
  },
  getlist() {
    let me = this
    let userinfo = wx.getStorageSync('userinfo')
    // console.log(userinfo)
    let id = userinfo.id
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/list&id=' + id + '&page=',
      success: res => {
        console.log(res)
        me.setData({
          list: res.data.data.list,
          user: res.data.data.user
        })
      }
    })
  },
  deletelist: function (e) {
    console.log(e);
    var that = this;
    var list = that.data.list;
    var index = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定要删除此活动吗？',
      success: function (res) {
        if (res.confirm) {
          list.splice(index, 1);
          wx.request({
            url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/delete&id='+index,
            data: {
              id: index
            },
            method: 'GET',
            success(res) {
              console.log(res.data)
            }
          })
        } else if (res.cancel) {
          return false;
        }
        that.setData({
          list: list
        });
      }
    })

  }
})