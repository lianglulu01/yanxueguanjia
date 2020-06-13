// pages/active/active.js
import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
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
          name: '食品',
          max: 500
        },
        {
          name: '玩具',
          max: 500
        },
        {
          name: '服饰',
          max: 500
        },
        {
          name: '绘本',
          max: 500
        },
        {
          name: '医疗',
          max: 500
        }
      ]
    },
    series: [{
      name: '预算 vs 开销',
      type: 'radar',
      data: [{
          value: [430, 340, 500, 300, 490, 400],
          name: '预算'
        },
        {
          value: [300, 430, 150, 300, 420, 250],
          name: '开销'
        }
      ]
    }]
  };

  chart.setOption(option);
  return chart;
}





Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    },
    nav_list: [{
      name: '李超',
      id: 0
    }],
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
    this.getNavlist()
  },
  getNavlist:function(){
    var that = this;
    let userinfo = wx.getStorageSync('userinfo')
    var user_id = userinfo.id
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/activity&user_id='+user_id,
      success:function(res){
        // console.log(res.data.data)
        that.setData({
          nav_list: res.data.data
        })
      }
    })
  },

})