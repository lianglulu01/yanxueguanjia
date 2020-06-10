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
   hudong:[]
  },
  gotoShow:function(){
       var _this = this;
       var pic = []
       wx.chooseImage({
        count:9 - this.data.hudong.length,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success:function(res){
          let src = res.tempFilePaths;
          for(var i = 0; i < src.length; i++){
            pic.push(src[i])
          }
          console.log(pic)
          _this.uploadimg({
            url: 'https://yanxue.qiweibang.com/web/index.php?r=api/upload/upload', //这里是你图片上传的接口
            huodong: pic, //这里是选取的图片的地址数组
          });
        }
       })
  },
  // 上传图片  搞几张图片试试
  uploadimg:function(config){
    let { url, huodong} = config
    console.log(huodong)
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
          const data = res.data
          if (data.code == 0) {
            let hudong = this.data.hudong;
            console.log(data)
            hudong.push(data.data) // 拿到的url 添加到数组中
            this.setData({
              huodong
            })
          }
        }
      })
    }
   
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  formSubmit:function(e) {
    console.log(e)
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/sub-activity',
      behaviors: ['wx://form-field'],
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        // data:e.detail.value,
      data:{
        id:"1",
        name:"",
        price: "",
        pic_url:{},
        desc:"33",
        team_num:"33",
        start_time:"44",
        end_time: "55",
        richeng:"66",
        know:"77",
        is_open:"88",
        address:"99"

      },
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