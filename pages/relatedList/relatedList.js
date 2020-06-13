// pages/relatedList/relatedList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    list:[],
    page:1
  },
toPerson:function(){

},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      this.setData({
        info: wx.getStorageSync('userinfo')
      })
      this.getList()
  },

  getList:function(){
    var that = this 
    wx.request({
      url: app.globalData.api+'relation/get-relation',
      data:{
        user_id:that.data.info.id,
        // user_id:1,
        page:that.data.page,
        relation_id:0  //学生关联学生是0  老师关联老师是1
      },success:function(res){
        console.log(res.data.data.list)
        that.setData({
          list: res.data.data.list
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      

      title:'邀请你成为好友,更多好玩的夏令营在等着你哟~~' ,
      imageUrl: 'https://yanxue.qiweibang.com/web/uploads/image/store_1/72f7415d6d701faf8d13bec85b7b710a4a9a07f7.png',
      path: '/pages/index/index?id=1'
  }
  }
})