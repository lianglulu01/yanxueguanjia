// pages/publish/now_comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   one:true,
   one2:false,
   two:true,
   two2:false,
   three:true,
   three2:false,
   four:true,
   four2:false,
   five:true,
   five2:false,
   six:true,
   six2:false,
   show:false,//控制下拉列表的显示隐藏，false隐藏、true显示
   selectData:['2020年6月9日','2020年6月10日','2020年6月11日','2020年6月12日','2020年6月13日','2020年6月14日'],//下拉列表的数据
   index:0//选择的下拉列表下标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  selectTap(){
    this.setData({
     show: !this.data.show
    });
    },
    // 点击下拉列表
    optionTap(e){
    let Index=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
     index:Index,
     show:!this.data.show
    });
    },
  one:function(){
    this.setData({
      one:false,
      one2:true
    })
  },
  two:function(){
    this.setData({
      two:false,
      two2:true
    })
  },
  three:function(){
    this.setData({
      three:false,
      three2:true
    })
  },
  four:function(){
    this.setData({
      four:false,
      four2:true
    })
  },
  five:function(){
    this.setData({
      five:false,
      five2:true
    })
  },
  six:function(){
    this.setData({
      six:false,
      six2:true
    })
  },
  onLoad: function (options) {

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

  }
})