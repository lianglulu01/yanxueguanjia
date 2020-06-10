// pages/publish/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userinfo:{
        rolename:'',
        nickName:'',
        phone:'',
        id:''
      },
      list:{},
      user:{}
  },
  takeout:function(){
     wx.navigateTo({
       url: '/pages/publish/activity',
     })
  },
  jilu:function(){
    wx.navigateTo({
      url: '/pages/publish/jilu',
    })
  },
  create_punch:function(){
    wx.navigateTo({
      url: '/pages/publish/create_punch',
    })
  },
//   user:function(e) {
//     console.log(e)
//     wx.request({
//       url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/list&id=&page=',
//       data:{
//         id:"",
//         page:2
//       },
//       method:"GET",
//       success:function(res) {
//         console.log(res)
//       } 
//     })
// },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getlist()
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

  },

getlist(){
  let me = this

  let userinfo = wx.getStorageSync('userinfo')
  
  // console.log(userinfo)
  let id = userinfo.id

  wx.request({
    url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/list&id='+id+'&page=',
    success:res => {
      console.log(res)
      me.setData({
        list:res.data.data.list,
        user:res.data.data.user
      })
    }
  })
},

  bindGetUserInfo: function(res) {
 
        if (res.detail.userInfo) {
    
          //用户按了允许授权按钮
    
          var that = this;
    
          // 获取到用户的信息了，打印到控制台上看下
    
          console.log("用户的信息如下：");
    
          console.log(res.detail.userInfo);

          let userinfo = res.detail.userInfo
          that.setData({
            userinfo:userinfo
          })
          //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
    
          that.setData({
    
            isHide: false
    
          });
    
        } else {
    
          //用户按了拒绝按钮
    
          wx.showModal({
    
            title: '警告',
    
            content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
    
            showCancel: false,
    
            confirmText: '返回授权',
    
            success: function(res) {
    
              // 用户没有授权成功，不需要改变 isHide 的值
    
              if (res.confirm) {
    
                console.log('用户点击了“返回授权”');
    
              }
    
            }
    
          });
    
        }
    
     }
    
    

  
})