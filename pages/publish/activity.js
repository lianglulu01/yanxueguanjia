// pages/publish/index.js
const app = getApp()
// import formatTime  from '../../utils/util'
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    date: util.formateDate(),
    date2: util.formateDate(7),
    test: 1,
    activeImgArr: [
      // 'https://yanxue.qiweibang.com/web/uploads/image/store_1/20200612184057CdWq7oDFeA.png'
    ],
    richeng: [
      // {
      //   "time": "2020-6-9",
      //   "desc": "说明111",
      //   "pic_url": ["http://xzq.qiweibang.com/web/uploads/image/store_1/d81de869f081cd2247c6aa56ccccbb381b326b8e.png", ]
      // },
      // {
      //   "time": "2020-6-9",
      //   "desc": "说明111",
      //   "pic_url": ["http://xzq.qiweibang.com/web/uploads/image/store_1/d81de869f081cd2247c6aa56ccccbb381b326b8e.png"]
      // }
    ],
  },

  gotoShow: function () {
    var _this = this;
    var pic = []
    wx.chooseImage({
      count: 9 - this.data.activeImgArr.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let src = res.tempFilePaths;
        for (var i = 0; i < src.length; i++) {
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
  delShow(e) {
    let index = e.currentTarget.dataset.index
    let arr = this.data.activeImgArr
    arr.splice(index, 1)
    this.setData({
      activeImgArr: arr
    })
  },
  uploadimg: function (config) {
    let {
      url,
      huodong
    } = config
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
        success(res) {
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


  addImg: function (e) {
    var _this = this;
    let index = e.currentTarget.dataset.index
    let obj = _this.data.richeng[index].pic_url
    wx.chooseImage({
      count: 9 - this.data.activeImgArr.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let src = res.tempFilePaths,
          pic = [];
        for (var i = 0; i < src.length; i++) {
          pic.push(src[i])
        }

        _this.upItemImg({
          that: obj,
          huodong: pic, //这里是选取的图片的地址数组
        });
      }
    })
  },

  delImg(e) {
    let index = e.currentTarget.dataset.index
    let index2 = e.currentTarget.dataset.index2
    let arr = this.data.richeng
    arr[index].pic_url.splice(index2, 1)
    this.setData({
      richeng: arr
    })
  },

  upItemImg: function (config) {
    let {
      that,
      huodong
    } = config
    let _this = this
    for (let i = 0; i < huodong.length; i++) {
      wx.uploadFile({
        url: app.globalData.api + 'upload/upload',
        header: {
          "Content-Type": "multipart/form-data",
          'accept': 'application/json'
        },
        filePath: huodong[i],
        name: 'file',
        success(res) {
          var data = JSON.parse(res.data)
          if (data.code == 0) {
            that.push(data.data)
            let _d = _this.data
            _this.setData(_d)
          }
        }
      })
    }
  },

  addRicheng() {
    let arr = this.data.richeng
    arr.push({
      time: '',
      desc: '',
      pic_url: []
    })
    this.setData({
      richeng: arr
    })
  },
  delRicheng(e) {
    let index = e.currentTarget.dataset
    let arr = this.data.richeng
    arr.splice(index, 1)
    this.setData({
      richeng: arr
    })
  },

  bindTimeChange: function (e) {
    let index = e.currentTarget.dataset.index
    let d = e.detail.value
    let arr = this.data.richeng
    arr[index].time = d
    this.setData({
      richeng: arr
    })
  },

  bindDateChange: function (e) {
    let t = this,
      start = t.data.date,
      end = t.data.date2,
      arr = app.deepClone(t.data.richeng)
    let index = e.currentTarget.dataset.index;

    if (index == 0) {
      start = e.detail.value
    } else {
      end = e.detail.value
    }
    let check = false;
    let length = arr.length
    if (start && end && start > end) {
      wx.showToast({
        title: '开始日期不可大于结束日期',
        icon: 'none'
      })
      return
    }
    for (let i = 0; i < arr.length; i++) {
      if (start && arr[i].time && arr[i].time < start) {
        arr.splice(i, 1);
        check = true;
        i--;
        continue;
      }
      if (end && arr[i].time && arr[i].time > end) {
        arr.splice(i, 1);
        check = true;
        i--;
        continue;
      }
    }
    if (check) {
      wx.showModal({
        title: "提示",
        content: "已添加的行程不在您修改的时间内，如修改时间，行程将会取消，确认修改时间吗？",
        success: function (res) {
          if (res.confirm) {
            console.log('change')
            t.setData({
              date: start,
              date2: end,
              richeng: arr
            })
          }
        }
      })
    } else {
      t.setData({
        date: start,
        date2: end
      })
    }
  },
  changeDesc(e) {
    let index = e.currentTarget.dataset.index
    let arr = this.data.richeng
    arr[index].desc = e.detail.value
  },
  formSubmit: function (e) {

    let userinfo = wx.getStorageSync('userinfo')
    e.detail.value.id = userinfo.id
    e.detail.value.pic_url = this.data.activeImgArr
    e.detail.value.richeng = JSON.stringify(this.data.richeng)
    console.log(e)
    wx.request({
      url: 'https://yanxue.qiweibang.com/web/index.php?r=api/activity/sub-activity',
      behaviors: ['wx://form-field'],
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },

      data: e.detail.value,

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
      method: "POST",
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          wx.showToast({
            title: '发布成功',
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1500);
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }

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