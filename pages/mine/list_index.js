Page({

  /**
   * 页面的初始数据
   */
  data: {
    details:{},
    type:1,
    imgArr:[],
    nav_list: [{
      name: '李超',
      id: 0
    }],
    activity:[],//活动展示数组
    comment:[],//评价管理
    is_comment:0,//是否评价
    is_content:false,
    date_list: [{
      name: '6月6号',
      id: 0
    }, {
      name: '6月6号',
      id: 1
    }, {
      name: '6月6号',
      id: 2
    }],
    x: 0, //为了nav滚动
    idx: 0,
    key: 0,
    idxx: 0,

  },
  previewImg:function(e){
    console.log(e.currentTarget.dataset.key);
    let that = this;
    var key = e.currentTarget.dataset.key
    wx.previewImage({
     current:that.data.imgArr[key],   //当前图片地址
     urls: that.data.imgArr,        //所有要预览的图片的地址集合 数组形式
    })
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
    var imgArr = that.data.activity.richeng[id].pic_url
    that.setData({
      x: scrollX,
      idxx: id,
      imgArr:imgArr
    })
    that.getComment();//更新评价
    console.log(id, '日期---变了的下标')
  },


  onLoad: function(options) {
    this.getNavlist()
    var that = this
    let userinfo = wx.getStorageSync('userinfo')
    if(userinfo){
      that.setData({
        userinfo:userinfo
      })
    }
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/detail',
      data:{
        id: options.id
      },
      method:'GET',
      success:function(res){
        console.log(res.data.data)
        that.setData({
          details:res.data.data
        })
      }
    })
  },
  toAuth: function () {
    if (!wx.getStorageSync('userinfo')) {
      this.setData({
        type: 1
      })
    }
  },
  getNavlist:function(){
    var that = this;
    let userinfo = wx.getStorageSync('userinfo')
    var user_id = userinfo.id
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/activity&user_id='+user_id,
      success:function(res){
        // console.log(res.data.data)
        if(res.data.data.length>0){
          that.setData({
            nav_list: res.data.data,
            is_content:true
          })
        }
      }
    })
  },
})