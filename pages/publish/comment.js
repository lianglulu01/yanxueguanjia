Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentId: '1',
    section: [{
      name: '2020.06.10',
      typeId: '1'
    }, {
      name: '2020.06.11',
      typeId: '2'
    }, {
      name: '2020.06.12',
      typeId: '3'
    },{
      name: '2020.06.12',
      typeId: '4'
    },{
      name: '2020.06.12',
      typeId: '5'
    }],
  },
//点击每个导航的点击事件
  handleTap: function(e) {
    let id = e.currentTarget.id;
    if(id){
      this.setData({
        currentId:id
      })
    }
  },
 more:function(){
   wx.navigateTo({
     url: '/pages/publish/comment_more',
   })
 },
})