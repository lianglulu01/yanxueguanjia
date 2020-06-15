Page({
 
  /**
   * 页面的初始数据
   */
  data: {
      currentData : 0,
      list:[],
      page:1,
      pageSize:0,
      id:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(wx.getStorageSync("userinfo").id)
    if (wx.getStorageSync("userinfo").id){
      this.setData({
        id: wx.getStorageSync("userinfo").id
      })
      this.getList()
    }
  },
  //获取当前滑块的index
  bindchange:function(e){
    const that  = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent:function(e){
    const that = this;
 
    if (that.data.currentData === e.target.dataset.current){
        return false;
    }else{
 
      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  member:function(){
    wx.navigateTo({
      url: '/pages/publish/member?user_id=' + wx.getStorageSync("userinfo").id,
    })
  },
  getList:function(){
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    // that.data.page++
    // var page = that.data.page
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/assist-teacher/list',
      data:{
        id:that.data.id,
        page:that.data.page
      },
      success:function(res){
        console.log(res)
        wx.hideLoading()
        that.setData({
          list:that.data.list.concat(res.data.data.list),
          pageSize: res.data.data.page_count
        })
      }
    })
  },
  onReachBottom:function(){
    var that = this
    var page = that.data.page+1
    that.setData({
      page:page,

    })
    var pageSize = parseInt(that.data.pageSize)
    console.log(page)
    console.log(pageSize)
    if(page>pageSize){
      wx.showToast({
        title: '无更多数据',
        icon:'none'
      })
      return
    }
    that.getList()
  }
})