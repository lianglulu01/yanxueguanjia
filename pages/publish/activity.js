// pages/publish/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   src:'',
   date: '2020-06-01',
   date2:'2020-06-03',
   test:1,
   activeImgArr:[],
   richeng:[{"time":"2020-6-9","desc":"说明111","pic_url":["http://xzq.qiweibang.com/web/uploads/image/store_1/d81de869f081cd2247c6aa56ccccbb381b326b8e.png"]},{"time":"2020-6-10","desc":"说明2222","pic_url":["http://xzq.qiweibang.com/web/uploads/image/store_1/d81de869f081cd2247c6aa56ccccbb381b326b8e.png"]}], 
  },
  gotoShow:function(){
       var _this = this;
       var pic = []
       wx.chooseImage({
        count:9 - this.data.activeImgArr.length,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success:function(res){
          let src = res.tempFilePaths;
          for(var i = 0; i < src.length; i++){
            pic.push(src[i])
          }
          console.log(pic)
          _this.uploadimg({
            url: 'https://yanxue.qiweibang.com/web/index.php?r=api/upload/upload', 
            huodong: pic, //这里是选取的图片的地址数组
          });
        }
       })
  },
  
  uploadimg:function(config){
    let { url, huodong} = config
    let _this = this
    for (let i = 0; i < huodong.length; i++) {
      wx.uploadFile({
        url: url,
        header: {
          "Content-Type": "multipart/form-data",
          'accept': 'application/json'
        },
        filePath: huodong[i],
        name: 'file',
        success (res) {
          const data = JSON.parse(res.data)
          if (data.code == 0) {
            let activeImgArr = _this.data.activeImgArr;
            console.log(data)
            activeImgArr.push(data.data) // 拿到的url 添加到数组中
            _this.setData({
              activeImgArr
            })
          }
        }
      })
    }
   
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let index = e.currentTarget.dataset.index;
    console.log(index)
    if (index == 0) {
      this.setData({
        date: e.detail.value
      })
    } else {
      this.setData({
        date2: e.detail.value
      })
    }
   
  },
  formSubmit:function(e) {
    console.log(e)
    let userinfo = wx.getStorageSync('userinfo')
     e.detail.value.id = userinfo.id
     e.detail.value.pic_url = this.data.activeImgArr
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/sub-activity',
      behaviors: ['wx://form-field'],
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
         
         data:e.detail.value,
  
      // data:{
      //   id:id,
      //   name:"",
      //   price: "",
      //   pic_url:{},
      //   desc:"",
      //   team_num:"",
      //   start_time:"",
      //   end_time: "",
      //   richeng:"",
      //   know:"",
      //   is_open:"",
      //   address:""

      // },
      method:"POST",
      success:function(res) {
        console.log(res)
        wx.showToast({
          title: '发布成功',
        })
        setTimeout(function(){
          wx.navigateBack({
            delta:1
          })
        }, 1500);
      } 
    })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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