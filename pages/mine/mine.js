//logs.js
// const util = require('../../utils/util.js')

Page({
  data: {
   
  },
  onLoad: function () {
   
  },
  release:function(){
    wx.navigateTo({
      url: '../releaseDynamic/releaseDynamic',
    })
  },
  toDynamic:function(){
    // wx.navigateTo({
    //   url:'../dynamic/dynamic'
    // })
  },
  associate:function(){
    wx.navigateTo({
      url: '../relatedList/relatedList',
    })
  }
})
