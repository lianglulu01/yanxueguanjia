// pages/punch/punch.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    navData:[],
    currentTab: 0,
    navScrollLeft: 0,
    date_list: [],
    activity_id : 0,
    one_list:[]
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let me = this
    if(options.id) {
        me.setData({
          activity_id:options.id
        })
        me.getData()
    }



    if (app.globalData.userInfo) {
      this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
      })
  } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
          this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
          })
      }
  } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
          success: res => {
              app.globalData.userInfo = res.userInfo
              this.setData({
                  userInfo: res.userInfo,
                  hasUserInfo: true
              })
          }
      })
  }


  wx.getSystemInfo({
      success: (res) => {
          this.setData({
              pixelRatio: res.pixelRatio,
              windowHeight: res.windowHeight,
              windowWidth: res.windowWidth
          })
      },
  })  




  },

  //获取列表数据
  getData() {
    let me = this
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/debug.php?r=api/clock-in/da-ka-xin-xi&activity_id=' + me.data.activity_id,
      method:'GET',
      success:res => {
        console.log(res)
        me.setData({
          date_list:res.data.data.list,
          navData:res.data.data.tab,
          one_list:res.data.data.one_list
        })
      }
    })
  },
  // 跳转用户列表页面
  GoUserList:function(e) {
    let type = e.currentTarget.dataset.type
    let id = e.currentTarget.dataset.id
    let activity_id = e.currentTarget.dataset.activity_id
    wx.navigateTo({
        url: '/pages/publish/jilu?clock_in_id=' + id +  '&type=' + type + '&activity_id=' + activity_id,
    })
  },



  switchNav(event){
    var cur = event.currentTarget.dataset.current; 
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
        navScrollLeft: (cur - 2) * singleNavWidth
    })      
    if (this.data.currentTab == cur) {
        return false;
    } else {
        this.setData({
            currentTab: cur,
        })
        let one_list;
        one_list = this.data.date_list[this.data.navData[this.data.currentTab]]
        console.log(one_list)
        console.log(this.data.navData[this.data.currentTab])
        this.setData({
          one_list:one_list
        })
    }
},
switchTab(event){
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
        currentTab: cur,
        navScrollLeft: (cur - 2) * singleNavWidth
    });
}

  
})