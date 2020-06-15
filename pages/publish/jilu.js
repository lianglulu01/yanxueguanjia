// pages/publish/jilu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    clock_in_id: 0,
    activity_id: 0,
    clock_in_info: {},
    list: [],
    page:1,
    sumPage:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.clock_in_id) {
      this.setData({
        clock_in_id: options.clock_in_id
      })
    }

    if (options.type) {
      this.setData({
        type: options.type
      })
    }


    if (options.activity_id) {
      this.setData({
        activity_id: options.activity_id
      })
    }
    this.getData();
  },
  // 获取数据
  getData() {
    let that = this
    console.log(that.data.page)
    wx.showLoading({
      title: '获取数据中....',
    })
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/debug.php?r=api/clock-in/get-clock-in-user&activity_id=' + that.data.activity_id + '&clock_id=' + that.data.clock_in_id + '&type=' + that.data.type + "&page=" + that.data.page,
      method: 'GET',
      success: res => {
        console.log(res)
        if(that.data.page == 1) {
          that.setData({
            list:res.data.data.list,
            clock_in_info:res.data.data.clock_in_info,
            sumPage:res.data.data.page.sum_page
          })
        }else{
          
          var arr = that.data.list//旧的数组
          let new_arr = res.data.data.list;
          for (var i = 0; i < new_arr.length; i++) {
            arr.push(new_arr[i])
          }

          that.setData({
            list:arr
          })
        }
      },
      complete:()=>{
        wx.hideLoading({
          complete: (res) => {},
        })
      }
    })
  },
/**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("上拉触底")
    let that = this
    if(that.data.page >= that.data.sumPage) {
      wx.showToast({
        title: '已经是最后一页啦!',
        icon:'none'
      })
      return ;
    }
    let page = that.data.page + 1;
    console.log(page)
    that.setData({
      page:page
    },() => {that.getData()})

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