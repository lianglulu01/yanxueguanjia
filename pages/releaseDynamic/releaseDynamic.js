// pages/releaseDynamic/releaseDynamic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAction:0,
    isWatch:0,
    content:'',
    images:[],
    page:1,
    activity:'',
     xz:'',
     xz_name:'',
     check_look:''
  },
  role:function(e){
        var that = this;
         that.setData({
           check_look:e.currentTarget.dataset.id,
           role_name:e.currentTarget.dataset.name
         })
  },
  check:function(e){
    var that = this;
        console.log(e.currentTarget.dataset.id);
        that.setData({
            xz:e.currentTarget.dataset.id,
            xz_name:e.currentTarget.dataset.name,
            order_id:e.currentTarget.dataset.order_id
        })
  },
       //上传正面身份证
   addImg: function (e) {
        var that = this;
        // that.setData({
        //   images:[]
        // })
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            let tempFilePaths = res.tempFilePaths;//没转换之前的图片格式
            let shuzuA = that.data.images.concat(tempFilePaths);//声明变量把图片放在原来的数组里
            wx.showToast({
              title: '正在上传...',
              icon: 'loading',
              mask: true,
            })
            // 当为9张了就插不进去了
            // if (images.length == 1) {
            //   that.setData({ showUpload: false })
            // }
            // that.setData({
            //   images: shuzuA,//声明的图片渲染到页面上
            // })
            console.log(that.data.images)
            var pic_list = that.data.images//用于放转换格式后的图片
            for (var i = 0; i < shuzuA.length; i++) {
              wx.uploadFile({
                url: 'https://yanxue.qiweibang.com/web/index.php?r=api/upload/upload',//把数组里的图片格式转换一下
                filePath: shuzuA[i],
                name: 'file',
                method: "POST",
                header: { "Content-Type": "application/json" },
                success: function (res) {
                  console.log(res);
              
                  var data = JSON.parse(res.data);
                  console.log(data);
                  if(data.errno==1){
                    wx.showToast({
                      title: '上传的格式不正确',
                      icon: 'none',
                      duration: 1000
                      })
                      return false;
                  }
                  pic_list.push(data.data)
                  console.log("上传图片的数组".pic_list)
                  that.setData({
                    images: pic_list//img_url是最后用户提交的图片数组
                  })
                    if (res.data.msg == "success") {
                      wx.hideToast();
                    }
                },
                fail: function (res) {//失败返回
                  console.log(res)
                }
              })
            }
          }
        })
      },
      //活动到底触发
  getdata:function(){
    var that = this;
            console.log("触底");
            var page = this.data.page+1;
            that.setData({
                 page:page
            })
            var user_id = wx.getStorageSync("userinfo").id;
       var data = {
           user_id:user_id,
           page:that.data.page
       };
       wx.request({
         url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/join-activity-list',
         data:data,
         success:function(res){
               console.log(res.data.data.list)
               if(res.data.data.list.length<1){
                      wx.showToast({
                        title: '暂无更多！',
                        icon:'loading',
                        duration:2000
                      })
                      return false;
               }
               var array = that.data.activity;
               var arr1 = res.data.data.list;
               array.push(arr1);
               that.setData({
                   activity:array
               })
         },
       })
      },
  fb:function(){
    var that = this;
    if(that.data.xz==""){
       wx.showToast({
         title: '请选择所属活动！',
         icon:'none',
         duration:2000
       })
       return false;
    }
    if(that.data.check_look==""){
      wx.showToast({
        title: '请选择谁可以看！',
        icon:'none',
        duration:2000
      })
      return false;
   }
        var data = {
            user_id:wx.getStorageSync("userinfo").id,
            content:that.data.content,
            images:JSON.stringify(that.data.images),
            activity_id:that.data.xz,
            check_look:that.data.check_look,
            order_id:that.data.order_id
        };
        wx.request({
          url: 'https://yanxue.qiweibang.com/web/index.php?r=api/circel/save-data',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data:data,
          method:'POST',
          success:function(e){
                 console.log(e);
                 if(e.data.code==0){
                  wx.showToast({
                    title: '发布成功!',
                    icon:'success',
                    duration:2000
                  })
                  setTimeout(function () {
                    wx.navigateBack({//返回
                      delta: 1
                    })
                    }, 2000)
                 }else{
                  wx.showToast({
                    title: '发布失败!',
                    icon:'success',
                    duration:2000
                  })
                 }
          },
        })
  },
  getValue:function(e){
        console.log(e.detail.value);
       var that = this;
       that.setData({
           content:e.detail.value
       })
  },
  getActivity:function(){
         var that = this;
         var userinfo = wx.getStorageSync("userinfo");
         console.log(userinfo.id);
         var data = {
             user_id:userinfo.id,
             page:that.data.page
         };
         wx.request({
           url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/join-activity-list',
           data:data,
           success:function(res){
                 console.log(res.data.data.list)
                 that.setData({
                     activity:res.data.data.list
                 })
           },
         })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this;
     that.getActivity();
  },
  active:function(){
    this.setData({
      isAction: 1
    })
  },
  cancel:function(){
    this.setData({
      isAction:0,
    })
  },
  sure:function(){
    this.setData({
      isAction: 0
    })
  },
  watch:function(){
    this.setData({
      isWatch:1
    })
  },
cancelMsg:function(){
  this.setData({
    isWatch:0
  })
},
sureMsg:function(){
  this.setData({
    isWatch: 0
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