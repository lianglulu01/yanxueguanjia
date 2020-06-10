// pages/userList/userList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:1,
    list:[{},{},{},{},{}],
    idx:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  select:function(e){
    console.log(e.currentTarget.dataset.index)
    this.setData({
      idx: e.currentTarget.dataset.index
    })

  }
})