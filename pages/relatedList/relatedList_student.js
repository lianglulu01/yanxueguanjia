// pages/relatedList/relatedList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    list:[],
    page:1,
    teacher_id:'',
    activity_id:''

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        info: wx.getStorageSync('userinfo'),
        teacher_id:options.teacher_id,
        activity_id:options.activity_id
      })
      
      this.addstudent()
  },
  add:function(e){
    wx.navigateTo({
      url: '/pages/relatedList/relatedList_addstudent?activity_id=' + this.data.activity_id  + '&teacher_id=' + this.data.teacher_id,
    })
  },
   addstudent:function(){
     var _this = this
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/assist-teacher/student-list&teacher_id=&activity_id=&page=',
      method:'GET',
      data:{
        teacher_id:this.data.teacher_id,
        activity_id:this.data.activity_id,
        page:1
      },
      success:function(res){
        _this.setData({
          list:res.data.data.list
        })
      }
    })
   },
   delete:function(e){
     var _this = this
     wx.request({
       url: 'https://yanxue.qiweibang.com/web/index.php?r=api/assist-teacher/remove&teacher_id=&id=',
       method:'GET',
       data:{
         teacher_id:this.data.teacher_id,
         id:e.currentTarget.dataset.index
       },
       success:function(){
        _this.onLoad()
       },
     })
     
   },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})