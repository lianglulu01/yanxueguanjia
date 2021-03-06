// pages/active/active.js
import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

let chart;
let option = {
  backgroundColor: "#ffffff",
  color: ["#37A2DA", "#FF9F7F"],
  xAxis: {
    show: false
  },
  yAxis: {
    show: false
  },
  radar: {
    // shape: 'circle',
    indicator: [{
        name: '综合能力',
        max: 5
      },
      {
        name: '活动态度',
        max: 5
      },
      {
        name: '积极表现',
        max: 5
      },
      {
        name: '团队贡献',
        max: 5
      },
      {
        name: '成果评价',
        max: 5
      }
    ]
  },
  series: [{
    name: '预算 vs 开销',
    type: 'radar',
    data: [{
        value: [0, 0, 0, 0, 0],
        name: '预算'
      },
    ]
  }]
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    circles:[],
    latitude:23.099994,
    longitude:113.324520,


    ec: {
      onInit: function(canvas, width, height, dpr){
        chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        console.log("hellojiangning")
        canvas.setChart(chart);

        chart.setOption(option);
      },//initChart
    },
    xiaokeai:[1,2,3,4,5,6,7,8,9],
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
    explanation: ['中国人民银行副行长、国家外汇管理局局长潘功胜回应，海南自由贸易港与香港的定位不同，重点发展产业也不同，互补大于竞争', '中国人民银行副行长、国家外汇管理局局长潘功胜回应，海南自由贸易港与香港的定位不同，重点发展产业也不同，互补大于竞争', '中国人民银行副行长、国家外汇管理局局长潘功胜回应，海南自由贸易港与香港的定位不同，重点发展产业也不同，互补大于竞争'],

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
    that.getActivity();
    console.log(id, '头部名称---变了的下标')

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
  immediately: function() {
    wx.navigateTo({
      url: '../activeDetail/activeDetail',
    })
  },
  punch: function() {
    wx.navigateTo({
      url: '../punchList/punchList',
    })
  },
  onLoad: function() {
    let me = this
     me.getNavlist()
  },
  onShow:function() {
    console.log("show/show")
    this.getLocationWit()
  },
  //获取当前位置
  getLocationWit:function(obj = null){
    let me = this
    wx.showLoading({
      title: '定位最新位置....',
    })
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        let latitude = res.latitude
        let longitude = res.longitude
        me.setData({
          latitude:latitude,
          longitude:longitude
        },() => {
          if(obj != null) {
            obj.dakaInfo()
          }
        })
      },
      complete:() => {
        wx.hideLoading({
          complete: (res) => {},
        })
      }
    })
  },

  //点击打卡按钮
  dakaBtn:function(){
    let me = this
    console.log("btn-打卡")
    me.getLocationWit(me)
  },
  //发送请求 , 打卡
  dakaInfo:function(){
    let me = this
    let user = wx.getStorageSync('userinfo')

    let data = {
      activity_id:me.data.activity.id,
      longitude:me.data.longitude,
      latitude:me.data.latitude,
      clock_in_id:me.data.activity.daka_last.id,
      user_id:user.id
    };
    // data.user_id = 0
    app.post('activity/set-da-ka',data).then(res => {
      console.log(res)
      if(res.code == 1) {
          wx.showToast({
              title: res.data.msg, 
              icon: 'none',
              duration: 1500   
          })
      }else{
        wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 1500
        })
      }

    }).catch(err => {
      console.log(err)
          wx.showToast({
              title: '系统异常', 
              icon: 'none',
              duration: 1500   
          })
    })
  },
  //设置位置
  updateMap:function(latitude,longitude,jvli){

    let me = this
    me.setData({
      latitude:latitude,
      longitude:longitude,
      circles:[{
        latitude: latitude,
        longitude: longitude,
        color: '#7cb5ec88',
        fillColor: '#7cb5ec88',
        radius: jvli,
        strokeWidth: 1
      }],
    })
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
          that.getActivity();
        }
      }
    })
  },
  // 获取用户当前获取的活动
  getActivity:function(){
    var that = this;
    var activity_id = that.data.nav_list[that.data.idx].id;
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/get-now-activity&id='+activity_id,
      success:function(res){
        // console.log(res.data.data)
        that.setData({
          activity: res.data.data,
          imgArr: res.data.data.richeng[0].pic_url,
        })
        that.updateMap(res.data.data.daka_last.latitude,res.data.data.daka_last.longitude,res.data.data.daka_last.distance / 2)
        that.getComment();
      }
    })
  },
  // 获取用户当前的评价
  getComment:function(){
    var that = this;
    var time = that.data.activity.richeng[that.data.idxx].time;
    var user_id = that.data.nav_list[that.data.idx].user_id;
    var activity_id = that.data.nav_list[that.data.idx].id;
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/activity-comment&user_id='+user_id+'&time='+time+'&activity_id='+activity_id,
      success:function(res){
        // console.log(res.data.data)
        // series: [{
        //   name: '预算 vs 开销',
        //   type: 'radar',
        //   data: [{
        //       value: [5, 4, 3, 2, 1],
        //       name: '预算'
        //     },
        //   ]
        // }]
        if(res.data.code==0){
          // var serier = option.series
          // console.log(serier);
          var new_data = res.data.data
          var score = [new_data.zong_score,new_data.huo_score,new_data.jiji_score,new_data.tuan_score,new_data.cheng_score];
          
          // 重新赋值画图！！！
          option.series[0].data[0].value = score
          option.radar.indicator[0].name = new_data.zong_title
          option.radar.indicator[1].name = new_data.huo_title
          option.radar.indicator[2].name = new_data.jiji_title
          option.radar.indicator[3].name = new_data.tuan_title
          option.radar.indicator[4].name = new_data.cheng_title
          
          that.setData({
            comment: res.data.data,
            is_comment:1,
            score:score
          })
        }else{
          that.setData({
            is_comment: 0,
          })
        }
      }
    })
  },
})