Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentId: 0,
    selectData: [],
    acitivity_id:0,
    page:1,
    list:[],
    page_count:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      activity_id:options.id
    })
    this.getData()
  },
  getData:function(){
    var that = this;
    var id = that.data.activity_id;
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/print-dates&activity_id=' + id,
      success: res => {
        console.log(res)
        that.setData({
          selectData: res.data.data,
        })
        that.getDetail();
      }
    })
  },
  // 详情---
  getDetail:function(){
    var that = this;
    var id = that.data.activity_id;
    var page = 1;//that.data.page;
    var time = that.data.selectData[that.data.currentId];
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/teacher-comment/comment-list&activity_id=' + id + '&page='+page+'&time='+time,
      success: res => {
        console.log(res)
        that.setData({
          list: res.data.data.list,
          page_count:res.data.data.page_count,
        })
      }
    })
  },
//点击每个导航的点击事件
  handleTap: function(e) {
    let id = e.currentTarget.id;
    if(id){
      this.setData({
        currentId:id
      })
    }
    this.getDetail();
  },
 more:function(event){
   wx.navigateTo({
     url: '/pages/publish/comment_more?id='+event.currentTarget.dataset.id,
   })
 },
 onReachBottom:function(){
  var page = this.data.page+1;
  if(this.data.page_count < page){
    return ;
  }
  this.setData({
    page:page
  });
  var that = this;
  var id = that.data.activity_id;
  var page = that.data.page;
  var time = that.data.selectData[that.data.currentId];
  wx.request({
    url: 'https://yanxue.qiweibang.com/web/index.php?r=api/teacher-comment/comment-list&activity_id=' + id + '&page='+page+'&time='+time,
    success: res => {
      console.log(res)
      var list = that.data.list;
      var new_list = list.concat(res.data.data.list)
      that.setData({
        list: new_list,
      })
    }
  })
 },
})