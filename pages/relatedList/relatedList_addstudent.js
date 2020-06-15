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
      this.add()
  },
  add:function(){
    var _this = this
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/assist-teacher/student-list&teacher_id=&activity_id=&page=&type=1',
      method:'GET',
      data:{
        teacher_id:this.data.teacher_id,
        activity_id:this.data.activity_id,
        page:1
      },
      success(res){
        console.log(res.data.data.list)
        _this.setData({
          list:res.data.data.list
        })
      }
    })
  },
   addstudent:function(e){
     console.log(true)
     var _this = this
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/assist-teacher/distribution&id=&teacher_id=',
      method:'GET',
      data:{
        teacher_id:this.data.teacher_id,
        id:e.currentTarget.dataset.id
      },
      success:function(res){

        // _this.onLoad()
      
    }
    })
   },
})