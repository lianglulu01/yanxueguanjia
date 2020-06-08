// pages/active/active.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav_list: [{ name: '李超', id: 0 }, { name: '李超', id: 1 }, { name: '李超', id: 2 }, { name: '李超', id: 3}],
    date_list: [{ name: '6月6号', id: 0 }, { name: '6月6号', id: 1}, { name: '6月6号', id: 2 }],
    x: 0, //为了nav滚动
    idx:0,
    key:0,
    idxx:0,
    explanation: ['中国人民银行副行长、国家外汇管理局局长潘功胜回应，海南自由贸易港与香港的定位不同，重点发展产业也不同，互补大于竞争', '中国人民银行副行长、国家外汇管理局局长潘功胜回应，海南自由贸易港与香港的定位不同，重点发展产业也不同，互补大于竞争','中国人民银行副行长、国家外汇管理局局长潘功胜回应，海南自由贸易港与香港的定位不同，重点发展产业也不同，互补大于竞争']
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
    
    })
    console.log(id, '变了的下标')
   
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
  immediately:function(){
    wx.navigateTo({
      url: '../activeDetail/activeDetail',
    })
  },
  punch:function(){
    wx.navigateTo({
      url: '../punchList/punchList',
    })
  }

})