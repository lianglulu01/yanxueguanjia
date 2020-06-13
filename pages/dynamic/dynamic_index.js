// pages/dynamic/dynamic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: true,
    selected1: false,
    length:5,
    list:5,
    jump:false,
    tongming:false,
    last:true,
    dynamicArr:[{length:9}],
    text:'',
    comment_id:'',
    user_id:''
  },
  hqz:function(e){
     console.log(e);
     var that  = this;
     that.setData({
       text:e.detail.value,
       user_id:e.currentTarget.dataset.user_id,
       comment_id:e.currentTarget.dataset.comment_id
     })
  },
  hqz1:function(e){
    console.log(e);
    var that  = this;
    that.setData({
      text:e.detail.value,
    })
 },
  send:function(){
    var that = this;
    if(!that.data.text){
       wx.showToast({
         title: '评论内容不能为空!',
         icon:"loading",
         duration:2000
       })
       return false;
   }
   console.log(that.data.user_id);
    var  data  = {
        circel_id:that.data.detail.id,
        activity_id:that.data.detail.activity_id,
        to_user_id:that.data.user_id,
        user_id:wx.getStorageSync("userinfo").id,
        text:that.data.text,
        comment_id:that.data.comment_id
    }
     wx.request({
       url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity-comment/add-comment',
       data:data,
       method:'POST',
       header: {
         "Content-Type": "application/x-www-form-urlencoded"
       },
       success:function(e){
           console.log(e)
           if(e.data.code==0){
             wx.showToast({
               title: '评论成功!',
               icon:'success',
               duration:2000,
             })
             that.setData({
               text:''
             })
            that.getDetail();
           }else{
             wx.showToast({
               title: '评论失败!',
               icon:'error',
               duration:2000,
             })
           }
       }
     })
},
  detail:function(e){
    console.log(e);
    wx.navigateTo({
      url: '/pages/activeDetail/activeDetail?id='+e.currentTarget.dataset.id,
    })
  },
    //点赞
    dz:function(e){
      console.log(e);
      var that = this;
       var data = {
        circel_id:e.currentTarget.dataset.circel_id,
        user_id:wx.getStorageSync("userinfo").id,
       }
       wx.request({
         url: 'https://yanxue.qiweibang.com/web/index.php?r=api/circel/agreen',
         data:data,
         success:function(res){
               var detail = that.data.detail;
               if(detail.is_agreen){
                detail.is_agreen = false;
                detail.like = parseInt(detail.like)-1;
               }else{
                detail.is_agreen = true;
                detail.like = parseInt(detail.like)+1;
               }
               that.setData({
                   detail:detail
               })
         },
       })
  },
  getDetail:function(){
    var that = this;
    var data = {
      user_id:wx.getStorageSync('userinfo').id,
      circel_id:that.data.circel_id
   }
   wx.request({
     url: 'https://yanxue.qiweibang.com/web/index.php?r=api/circel/circel-detail',
     data:data,
     success:function(res){
          console.log(res)
          that.setData({
              detail:res.data.data
          })
     }
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        var that = this;
        console.log(options.circel_id);
        that.setData({
            circel_id:options.circel_id
        })
        var data = {
           user_id:wx.getStorageSync('userinfo').id,
           circel_id:that.data.circel_id
        }
        wx.request({
          url: 'https://yanxue.qiweibang.com/web/index.php?r=api/circel/circel-detail',
          data:data,
          success:function(res){
               console.log(res)
               that.setData({
                   detail:res.data.data
               })
          }
        })
  },
  tongming:function(e){
    console.log(e.currentTarget.dataset.user_id);
    this.setData({
      tongming:true,
      jump:true,
      last:false,
      user_id:e.currentTarget.dataset.user_id,
      comment_id:e.currentTarget.dataset.comment_id,
    })
  },
  huifu:function(){
    this.setData({
      last:true,
      jump:false,
      tongming:false
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
  toComment:function(){
    wx.navigateTo({
      url: '../comment/comment',
    })
  }

 
})