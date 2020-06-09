//logs.js
// const util = require('../../utils/util.js')

Page({
  data: {
   
  },
  onLoad: function () {
      this.abc()
  },
  abc:function() {
      wx.request({
        url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/sub-activity',
        data:{
          id:1,
          name:"江宁小可爱",
          price:88888888888,
          pic_url:[],
          desc:"123456",
          team_num:66,
          start_num:"2020-06-09",
          end_time:"2020-06-10",
          richeng:8,
          know:"我也不知道",
          is_open:0,
          address:"北京市三里屯KKK酒吧"

        },
        method:"POST",
        success:function(res) {
          console.log(res)
        }
      })
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
