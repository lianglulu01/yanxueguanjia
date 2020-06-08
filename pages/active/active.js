// pages/active/active.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav_list: [{ name: '李超', id: 0 }, { name: '李超', id: 1 }, { name: '李超', id: 2 }, { name: '李超', id: 3}],
    x: 0, //为了nav滚动
    idx:0,
    key:0
  },
  switchTap(e) { //导航
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
      idx: id,
      // key: id
    })
    console.log(id, '变了的下标')
   
  },

})