//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    "bnrUrl": [{
      "url": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1816366408,1729518576&fm=26&gp=0.jpg"
    }, {
        "url": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2902760319,1082246374&fm=26&gp=0.jpg"
    }, {
        "url": "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3836010369,196474655&fm=26&gp=0.jpg"
    }, ],
    selected: true,
    selected1: false,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  selectedFn: function () {
    var that = this;
    that.setData({
      selected1: false,
      selected: true
    })
    // that.companyFieldFn();
  },
  selectedFn1: function () {
    var that = this;
    that.setData({
      selected1: true,
      selected: false
    })

  },
  
})
