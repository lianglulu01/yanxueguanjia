// pages/publish/member.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    more:true,
    less:false,
    list:[],
    activity_id:'',//活动id
    page:1,
    page_count:"",//总共几页
    uhide:0,//第几个显示--隐藏
    inputVal:'',
    is_show:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */pingjia:function(event){
    var user_id = event.currentTarget.dataset.user_id
    var activity_id = this.data.activity_id
     wx.navigateTo({
       url: '/pages/publish/now_comment?activity_id='+activity_id+'&user_id='+user_id,
     })
   },
   // 显示更多
  more:function(event){
    var key = event.currentTarget.dataset.key
    var list = this.data.list
    list[key].is_show = true;
    this.setData({
      list:list
    })
  },
  less:function(event){
    var key = event.currentTarget.dataset.key
    var list = this.data.list
    list[key].is_show = false;
    this.setData({
      list:list
    })
  },
  onLoad: function (options) {
    var that = this;
    if(options.id){
      that.setData({
        activity_id:options.id
      })
      console.log(options);
      that.getList();
    }
  },
  getList(){
    var that = this;
    var id = that.data.activity_id;
    var page = that.data.page;
    var inputVal = that.data.inputVal;
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/all-people&activity_id=' + id + '&page='+page,
      data:{
        keyword:inputVal
      },
      success: res => {
        console.log(res)
        if(res.data.data.list.length>0){
          that.setData({
            list: res.data.data.list,
            page_count:res.data.data.page_count,
            is_show:true,
          })
        }
      }
    })
  },
  inputTyping:function(event){
    var value = event.detail.value;
    this.setData({
      inputVal:value,
    })
  },
  search:function(){
    var page = 1;
    this.setData({
      page:page
    });
    this.getList();
  },
  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh:function(){
    var page = 1;
    this.setData({
      page:page
    });
    this.getList();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
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
    var inputVal = that.data.inputVal;
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/all-people&activity_id=' + id + '&page='+page,
      data:{
        keyword:inputVal
      },
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})