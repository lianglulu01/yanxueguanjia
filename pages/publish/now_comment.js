// pages/publish/now_comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   one:true,
   one2:false,
   two:true,
   two2:false,
   three:true,
   three2:false,
   four:true,
   four2:false,
   five:true,
   five2:false,
   six:true,
   six2:false,
   show:false,//控制下拉列表的显示隐藏，false隐藏、true显示
   selectData:[],//下拉列表的数据
   index:0,//选择的下拉列表下标
   user_id:0,//用户id,
   activity_id:0,//活动id,
   is_show_pingjia:false,//是否显示可以评价的信息
   score:5,
   huo_score:0,
   zong_score:0,
   jiji_score:0,
   tuan_score:0,
   cheng_score:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  selectTap(){
    this.setData({
     show: !this.data.show
    });
    },
    // 点击下拉列表
    optionTap(e){
    let Index=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
     index:Index,
     show:!this.data.show
    });
    // 判断是否已经评价
    this.isComment();
    },
  one:function(){
    this.setData({
      one:false,
      one2:true
    })
  },
  two:function(){
    this.setData({
      two:false,
      two2:true
    })
  },
  three:function(){
    this.setData({
      three:false,
      three2:true
    })
  },
  four:function(){
    this.setData({
      four:false,
      four2:true
    })
  },
  five:function(){
    this.setData({
      five:false,
      five2:true
    })
  },
  six:function(){
    this.setData({
      six:false,
      six2:true
    })
  },
  onLoad: function (options) {
    console.log(options);
    this.setData({
      user_id:options.user_id,
      activity_id:options.activity_id,
    })
    this.getData()
  },
  getData:function(){
    var that = this;
    var id = that.data.activity_id;
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/print-dates&activity_id=' + id,
      success: res => {
        console.log(res)
        that.setData({
          selectData: res.data.data,
        })
        // 判断是否已经评价
        that.isComment();
      }
    })
  },
  isComment:function(){
    var that = this;
    var index = that.data.index;
    var time = that.data.selectData[index];
    var user_id = that.data.user_id;
    var activity_id = that.data.activity_id;
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/teacher-comment/is-comment',
      data:{
        user_id:user_id,
        activity_id:activity_id,
        time:time,
      },
      success: res => {
        console.log(res)
        // 已经评价过--不可以评价
        if(res.data.code==1){
          that.setData({
            is_show_pingjia:false
          })
        }else{
          that.setData({
            is_show_pingjia:true
          })
        }
      }
    })
  },
  // 活动评分分
  change_huo:function(event){
    var index = event.currentTarget.dataset.index;
    var type = event.currentTarget.dataset.type;
    if(type==1){
      this.setData({
        huo_score:index,
      })
    }else if(type==2){
      this.setData({
        zong_score:index,
      })
    }else if(type==3){
      this.setData({
        jiji_score:index,
      })
    }else if(type==4){
      this.setData({
        tuan_score:index,
      })
    }else if(type==5){
      this.setData({
        cheng_score:index,
      })
    }
  },
  //提交
  submit_form:function(e){
    console.log(e.detail.value);
    var that = this;
    var index = that.data.index;
    let userinfo = wx.getStorageSync('userinfo')
    e.detail.value.teacher_id = userinfo.id
    e.detail.value.comment_time = that.data.selectData[index];
    e.detail.value.user_id = that.data.user_id;
    e.detail.value.activity_id = that.data.activity_id;

    e.detail.value.zong_score = that.data.zong_score;
    e.detail.value.huo_score = that.data.huo_score;
    e.detail.value.jiji_score = that.data.jiji_score;
    e.detail.value.tuan_score = that.data.tuan_score;
    e.detail.value.cheng_score = that.data.cheng_score;
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/teacher-comment/sub-comment',
      data:e.detail.value,
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      method:"POST",
      success: res => {
        console.log(res)
        if(res.data.code==0){
          wx.showToast({
            title: '操作成功',
            icon: 'none',
            duration: 1500
          })
          wx.navigateBack({})
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})