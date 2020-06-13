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
  member:function(event){
    wx.navigateTo({
      url: '/pages/publish/member?id='+event.currentTarget.dataset.id,
    })
  },
  xiezhu: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/relatedList/relatedList_teacher?id='+id,
    })
  },
  comment: function (event) {
    wx.navigateTo({
      url: '/pages/publish/comment?id='+event.currentTarget.dataset.id,
    })
  },
  takeout: function () {
    wx.navigateTo({
      url: '/pages/publish/activity',
    })
  },
  jilu: function (event) {
    wx.navigateTo({
      // url: '/pages/publish/jilu',
      url:"/pages/punch/punch?id=" +event.currentTarget.dataset.id
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
  onShow:function(){
   this.onLoad()
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
              that.onLoad()
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