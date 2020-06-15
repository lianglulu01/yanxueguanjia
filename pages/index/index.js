//index.js
//获取应用实例
const app = getApp()
var QQMapWX = require('../../utils/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    bnrUrl: [],
    selected: true,
    selected1: false,
    type:0,
    id:null,     //这个人的id,要被关联人id
    userId:null,
    sort:1,
    page:1,
    list:[],
    invite:{
      type:0,
      user_id:null,
      activity_id:0,  //协助教师相关，活动id
      data_type:0,
      sq:false
    },
    activity:{},
    modalHidden: true,
    ewmsrc:'',
    activity:{}
   
  },
  freeTell:function(){
    wx.makePhoneCall({
      phoneNumber: '110',
    })
  },
  onLoad:function(option){
     // 实例化API核心类
     qqmapsdk = new QQMapWX({
      key: 'IOFBZ-O4M6P-MIPDM-LCTE7-NJOCJ-LKBOD'
  })
  // var userId = wx.getStorageSync('userinfo').id;
  if (!wx.getStorageSync('userinfo')){
        this.setData({
           sq:false
        })
  }else{
    this.setData({
      sq:true
   })
  }
    var that = this
    if(option.id){
      that.setData({
        userId: option.id,
        type:1,
        invite:{
          type:1,
          user_id:option.id,
        }
      })
    }

    if(option.activity_id){
      that.data.invite.activity_id = option.activity_id
    }
    if(option.data_type){
      that.data.invite.data_type = option.data_type
    }

    // wx.getLocation({
    //   altitude: 'altitude',
    //   success(e){
    //     console.log(e)
    //   }
    // })


    that.getImg()
    // that.getMyActivity()
    
    that.getImg()
    that.getMyActivity()
    that.getCurrentLocal();
  },
  // 获取当前地理位置 授权验证
  getCurrentLocal(){
    let that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userLocation'] == false){// 如果已拒绝授权，则打开设置页面
          wx.openSetting({
            success(res) {}
          })
        }  else { // 第一次授权，或者已授权，直接调用相关api
          that.getMyLocation()
        }
      }
    })
  },
  // 获取当前地理位置
  getMyLocation(){
    let that = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res)
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            console.log(addressRes);
            var address = addressRes.result.formatted_addresses.recommend;
            console.log(address);
            that.setData({
                 address:address
            })
            // app.globalData.address = address;
          }

      })
    }
  })
  },
  onShow:function(){
    var that = this
    that.getList()
    that.getMyActivity()
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  selectedFn: function (e) {
    console.log(e)
    var that = this;
    that.setData({
      selected1: false,
      selected: true,
      sort:1
    })
    that.getList()
    // that.companyFieldFn();
  },
  selectedFn1: function (e) {
    console.log(e)
    var that = this;
    that.setData({
      selected1: true,
      selected: false,
      sort: 2
    })
    that.getList()
  },
  getImg:function(){
    var that = this

    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?store_id=1&r=api/base/banner',
      data:{},
      success:function(res){
        // console.log(res.data.data)
        that.setData({
          bnrUrl: res.data.data
        })
      }
    })
  },
  getUserInfo: function (o) {
    wx.showLoading({
      title: '加载中',
    })
    var n = this;
    "getUserInfo:ok" == o.detail.errMsg && wx.login({
      success: function (e) {
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
            console.log(res.data.data.info)
            if (res.data.data.info) {
              wx.hideLoading()
              wx.setStorageSync('userinfo', res.data.data.info)
             
              n.setData({
                type: 0,
                id: wx.getStorageSync('userinfo').id,
                info: wx.getStorageSync('userinfo'),
                sq:true
              })
              n.related()
            }

          }
        })

      },
      fail: function (e) { }
    });
  },
  related:function(){
    var that = this
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/relation/set-relation',
      data:{
        type:1,
        relation_id:that.data.id, //被关联人的id
        user_id:that.data.invite.user_id,
        data_type:that.data.invite.data_type,
        activity_id:that.data.invite.activity_id
      },
      success:function(res){
        console.log(res)
        wx.showToast({
          title: '关联成功',
        })
      }
    })
  },



  // 确认打卡的按钮
  punch: function () {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        const latitude = res.latitude
        const longitude = res.longitude
        // console.log(latitude, longitude)
        wx.request({
          url: 'https://yanxue.qiweibang.com/web/index.php?r=api/clock-in/user-clock-in',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            user_id: wx.getStorageSync('userinfo').id,
            address: this.data.activity.address,
            clock_in_id: this.data.activity.sign.clock_in_id,
            longitude: longitude,
            latitude: latitude
          },
          success: (res) => { console.log(res) },
          fail: (err) => { }
        })
      }
    })
  },

  // 首页-我的活动
  getMyActivity(){
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.request({
          url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/join-activity-one&user_id=' + wx.getStorageSync('userinfo').id + '&latitude=' + latitude + '&longitude=' + longitude,
          success: res => {
            console.log(res)
            this.setData({
              activity: res.data.data
            })
          },
          fail: err => {
            console.log(err)
          }
        })
      },
    })
  },
  // 查看活动 跳转
  toMyActivity() {
    wx.navigateTo({
      url: '../myActivity/myActivity',
    })
  },

  // 去签到
  alertEWM: function () {
    this.setData({
      modalHidden: false
    })
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/sign-in/sub&user_id=' + wx.getStorageSync('userinfo').id + '&activity_id=' + this.data.activity.id,
      success: res => {
        console.log(res.data.data)
        this.setData({
          ewmsrc: res.data.data
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  // 打卡 按钮
  punch:function(){
    if (!wx.getStorageSync('userinfo')){
      this.setData({
        type: 1
      })
      return false;
    }
    wx.getLocation({
      type: 'wgs84',
      success:(res)=> {
        const latitude = res.latitude
        const longitude = res.longitude
        // console.log(latitude, longitude)
        wx.request({
          url: 'https://yanxue.qiweibang.com/web/index.php?r=api/clock-in/user-clock-in',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            user_id: wx.getStorageSync('userinfo').id,
            // address:
            // clock_in_id:
            longitude: longitude,
            latitude: latitude
            // join_user: JSON.stringify(this.data.joinUserId),
            // mobile: this.data.phone,
            // activity_id: this.data.id,
          },
          success: (res) => { console.log(res) },
          fail: (err) => { }
        })
      }
    })
  },

  getList:function(){
    var that = this
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/all-activity',
      data:{
        sort:that.data.sort,
        page:that.data.page
      },
      success:function(res){
        // console.log(res)
        that.setData({
          list:res.data.data.list
        })
      }
    })
    
  }
  
})
