// pages/punch/punch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date_list: [{ name: '6月6号', id: 0 }, { name: '6月6号', id: 1 }, { name: '6月6号', id: 2 }, { name: '6月6号', id: 3 }, { name: '6月6号', id: 4}, { name: '6月6号', id: 5 }],
    x: 0, //为了nav滚动
    idxx:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  dateTap(e) { //导航
    // console.log(e)
    var that = this
    let screenWidth = wx.getSystemInfoSync().windowWidth;
    let itemWidth = screenWidth / 5;
    let {
      index,
      type
    } = e.currentTarget.dataset;
    const {
      nav_list
    } = that.data;
    let scrollX = itemWidth * index - itemWidth * 2;
    let maxScrollX = (nav_list.length + 1) * itemWidth;
    if (scrollX < 0) {
      scrollX = 0;
    } else if (scrollX >= maxScrollX) {
      scrollX = maxScrollX;
    }
    let id = e.currentTarget.dataset.index
    that.setData({
      x: scrollX,
      idxx: id,

    })
    console.log(id, '变了的下标')

  },
  
})