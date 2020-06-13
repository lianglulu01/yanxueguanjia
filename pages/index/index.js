//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bnrUrl: [
    //   {
    //   "url": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1816366408,1729518576&fm=26&gp=0.jpg"
    // }, {
    //     "url": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2902760319,1082246374&fm=26&gp=0.jpg"
    // }, {
    //     "url": "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3836010369,196474655&fm=26&gp=0.jpg"
    // },
     ],
    selected: true,
    selected1: false,
    type:0,
    id:null, //这个人的id,要被关联人id
    userId:null,
    sort:1,
    page:1,
    list:[],
    invite:{
      type:0,
      user_id:null,
      activity_id:0,  //协助教师相关，活动id
      data_type:0
    }
  },

  onLoad:function(option){
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
      that.data.invite.data_type = option.activity_id
    }
    that.getImg()
     
  },
  onShow:function(){
    var that = this
    that.getList()
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
                info: wx.getStorageSync('userinfo')
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
  toDetail:function(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../activeDetail/activeDetail?id=' + e.currentTarget.dataset.id,
    })
  },

  // 往期活动跳转
  toHistoryActivity() {
    wx.navigateTo({
      url: './myActivity',
    })
  },
  // 签到
  signIn() {

  },
  
  punch:function(){
    wx.navigateTo({
      url: '../punch/punch',
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
        console.log(res)
        that.setData({
          list:res.data.data.list
        })
      }
    })
    
  }
  
})
