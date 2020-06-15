// pages/publish/index.js
const app = getApp()
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
    list: [],
    user: {
    },
    avatar:'',
    nickname:'',
    phone:'',
    page: 1,
    totalPage: 1,
    type:0
  },
  member: function (event) {
    wx.navigateTo({
      url: '/pages/publish/member?id=' + event.currentTarget.dataset.id,
    })
  },
  xiezhu: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/relatedList/relatedList_teacher?id=' + id,
    })
  },
  comment: function (event) {
    wx.navigateTo({
      url: '/pages/publish/comment?id=' + event.currentTarget.dataset.id ,
    })
  },
  takeout: function () {
    if (!wx.getStorageSync('userinfo')){
      this.setData({
        type:1
      })
    }else{
      wx.navigateTo({
        url: '/pages/publish/activity',
      })
    }
   
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
  onShow: function () {

  },
  getlist(useLoad=true) {
    var  me = this
    let userinfo = wx.getStorageSync('userinfo')
    // console.log(userinfo)
    let id = userinfo.id
    if (me.data.page > me.data.pageTotal) {
      wx.showToast({
        title: '暂无更多',
        icon: 'none'
      })
      return
    }
    if(useLoad)wx.showLoading({title:'加载中'})
    app.get('activity/list', {
      id: id,
      page: me.data.page
    }).then(res => {
      setTimeout(function () {
        wx.hideLoading()
        wx.stopPullDownRefresh()
        me.setData({
          list: me.data.list.concat(res.data.list),
          // user: res.data.user,
          avatar: res.data.user.avatar_url,
          nickname: res.data.user.nickname,
          phone: res.data.user.phone,
          pageTotal: res.data.page_count
        })
      },300)
      
    }).catch(err => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      wx.showToast({
        title: '网络错误，请重试',
      })
    })
    // wx.request({
    //   url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/list&id=' + id + '&page=',
    //   success: res => {
    //     me.setData({
    //       list: res.data.data.list,
    //       user: res.data.data.user
    //     })
    //   }
    // })
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
            url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/delete&id=' + index,
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

  },

  onPullDownRefresh() {
    let t = this
    this.data.page = 1
    setTimeout(function(){
      t.setData({
        list: []
      })
    },200)
    
    this.getlist(false)
  },
  onReachBottom() {
    this.data.page++;
    this.getlist()
  },
  login:function(){
    if (!wx.getStorageSync('userinfo')) {
      this.setData({
        type: 1
      })
    }
  },
  getUserInfo: function (o) {
    // wx.showLoading({
    //   title: '加载中',
    // })
    var that = this;
    "getUserInfo:ok" == o.detail.errMsg && wx.login({
      success: function (e) {
        console.log(e)
        var t = e.code;
        let abc = {
          code: t,
          user_info: o.detail.rawData,
          encrypted_data: o.detail.encryptedData,
          iv: o.detail.iv,
          signature: o.detail.signature
        };

        wx.request({
          url: 'https://yanxue.qiweibang.com/web/index.php?r=api/users/login',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: abc,
          success: function (res) {
            wx.hideLoading()
            wx.setStorageSync('userinfo', res.data.data.info)
            that.setData({
              type: 0,
              // info: res.data.data.info,
              // not: 1
              avatar: res.data.data.info.avatarUrl,
              // user: res.data.data.info,
              nickname: res.data.data.info.nickName,
              phone: res.data.data.info.phone,
            })

          }
        })

      },
      fail: function (e) { }
    });
  },
  closeMsg: function () {
    this.setData({
      type: 0
    })
  }
})