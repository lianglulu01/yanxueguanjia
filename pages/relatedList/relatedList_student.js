// pages/relatedList/relatedList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    list:[],
    page:1,
    yichu:true,
    tianjia:false
  },
tianjia:function(){
   this.setData({
     yichu:false,
     tianjia:true
   })
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
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/relation/get-relation',
      data:{
        // user_id:that.data.info.id,
        user_id:1,
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

  }
})