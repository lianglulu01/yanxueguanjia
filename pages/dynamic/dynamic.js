// pages/dynamic/dynamic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: true,
    selected1: false,
    length: 5,
    list: 5,
    dynamicArr: [{
      length: 1
    }],
    page: 1,
    type: 0
  },
  //点赞
  dz: function(e) {
    console.log(e);
    var that = this;
    var key = e.currentTarget.dataset.key;
    var data = {
      circel_id: e.currentTarget.dataset.circel_id,
      user_id: wx.getStorageSync("userinfo").id,
    }
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/circel/agreen',
      data: data,
      success: function(res) {
        console.log(res);
        if (that.data.selected) {
          // that.getQz();
          var list = that.data.myList;
          if (list[key].is_agreen) {
            list[key].is_agreen = false;
            list[key].like = parseInt(list[key].like) - parseInt(1);
          } else {
            list[key].is_agreen = true;
            list[key].like = parseInt(list[key].like) + parseInt(1);
            console.log(parseInt(list[key].like) + parseInt(1));
          }
          that.setData({
            myList: list
          })
        } else {
          var list = that.data.myList;
          if (list[key].is_agreen) {
            list[key].is_agreen = false;
            list[key].like = parseInt(list[key].like) - parseInt(1);
          } else {
            list[key].is_agreen = true;
            list[key].like = parseInt(list[key].like) + parseInt(1);
          }
          that.setData({
            myList: list
          })
        }

      },
    })
  },
  //全部 收起
  sq: function() {
    this.setData({
      showMore: !this.data.showMore
    })
  },
  dynamic_index: function(res) {
    console.log(res);
    wx.navigateTo({
      url: '../../pages/dynamic/dynamic_index?circel_id=' + res.currentTarget.dataset.id,
    })
  },
  detail: function(e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/activeDetail/activeDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.getQz();
  },
  getQz: function() {
    var that = this;
    var user_id = wx.getStorageSync("userinfo").id;
    var data = {
      user_id: user_id,
      // page:that.data.page
    };
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/circel/my-circel',
      data: data,
      success: function(res) {
        console.log(res);
        that.setData({
          myList: res.data.data.list
        })
      }
    })
  },
  //获取广场数据
  getGc: function() {
    var that = this;
    var user_id = wx.getStorageSync("userinfo").id;
    var data = {
      user_id: user_id,
      page: that.data.page
    };
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/circel/circel-list',
      data: data,
      success: function(res) {
        console.log(res);
        var array = that.data.myList;
        var arr = res.data.data.list;
        var new_arr = array.concat(arr);
        if (arr.length < 1) {
          wx.showToast({
            title: '暂无更多!',
            icon: 'loading',
            duration: 2000
          })
          return false;
        }
        console.log(array)
        that.setData({
          myList: new_arr
        })
      }
    })
  },
  selectedFn: function() {
    var that = this;
    that.setData({
      selected1: false,
      selected: true,
      myList: []
    })
    // that.companyFieldFn();
    that.getQz();
  },
  selectedFn1: function() {
    var that = this;
    that.setData({
      selected1: true,
      selected: false,
      myList: []
    })
    that.getGc();
  },
  onShow: function() {
    var that = this;
    if (that.data.selected) {
      that.getQz();
    } else {
      that.getGc();
    }

  },
  fbqz: function() {
    var that = this
    if (!wx.getStorageSync('userinfo')) {
      that.setData({
        type: 1
      })
    } else {
      wx.navigateTo({
        url: '../releaseDynamic/releaseDynamic',
      })
    }

  },

  bindscrolltolower() {
    var that = this;

    if (that.data.selected1) {
      that.setData({
        page: that.data.page + 1
      })
      console.log(that.data.page + "页");
      that.getGc();
    }

  },
  toComment: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../comment/comment?user_id=' + e.currentTarget.dataset.user_id + "&circel_id=" + e.currentTarget.dataset.id + "&activity_id=" + e.currentTarget.dataset.activity_id + "&circel_id=" + e.currentTarget.dataset.circel_id + "&comment_id=" + e.currentTarget.dataset.comment_id,
    })
  },
  getUserInfo: function(o) {
    // wx.showLoading({
    //   title: '加载中',
    // })
    var that = this;
    "getUserInfo:ok" == o.detail.errMsg && wx.login({
      success: function(e) {
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
          success: function(res) {
            wx.hideLoading()
            wx.setStorageSync('userinfo', res.data.data.info)
            that.setData({
              type: 0,
              // info: res.data.data.info,
              // not: 1
              // info: wx.getStorageSync('userinfo')
            })

          }
        })

      },
      fail: function(e) {}
    });
  },
  closeMsg: function() {
    this.setData({
      type: 0
    })
  }


})