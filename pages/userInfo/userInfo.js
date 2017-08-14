// pages/userInfo/userInfo.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    date: '',
    dates: '',
    // image: '',
    // nickname: '',
    // gender: '',
    // mail: '',
    // birthday: '',
    globalToken: '',
    dataList: {},
  },
  onLoad:function(options) {
    try {
      var value = getApp().getToken();
      if (value) {
          this.setData({
            globalToken: value,
          })
      }
    } catch (e) {
      console.log('wrong')
    }
    wx.request({
      url: 'https://bugentuan.yoroliving.com/api/v1/userinfo', 
      data: {
        
      },
      header: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + this.data.globalToken
      },
      success: (res) => {
        console.log(res.data)
        this.data.dates = this.data.dataList.date_birth
        this.setData({
          dataList: res.data.data,
          dates: this.data.dates 
        })
        if(this.data.dataList.gender == 'boy') {
          this.data.dataList.gender = 1
        }
        else if(this.data.dataList.gender == 'girl'){
          this.data.dataList.gender = 2
        }
        else {
          this.data.dataList.gender = 0
        }
        this.setData({
          dataList: this.data.dataList
        })
      },
      fail: function (res) {
        // console.log(res.data)
      },
      complete: function (res) {
        // console.log(res.data)
      }
    })
  },
  onUnload: function () {
    wx.request({
      url: 'https://bugentuan.yoroliving.com/api/v1/userinfo', 
      method: 'POST',
      data: {
        name: this.data.dataList.name,
        phone: this.data.dataList.phone,
        date_birth: this.data.dataList.date_birth,
        avatar: this.data.dataList.avatar,
        email: this.data.dataList.email,
        gender: this.data.dataList.gender,
      },
      header: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + this.data.globalToken
      },
      success: (res) => {
        console.log(res.data)
        this.setData({
          dataList: res.data.data,
        })
      },
      fail: function (res) {
        // console.log(res.data)
      },
      complete: function (res) {
        // console.log(res.data)
      }
    })
  },
  toChange: function () {
    wx.navigateTo({
      url: '../edit/edit?value=' + this.data.dataList.email + '&state=mail'
    });
  },
  toChangeName: function () {
    wx.navigateTo({
      url: '../edit/edit?value=' + this.data.dataList.name + '&state=name'
    });
  },
  toChangeSex: function () {
    wx.navigateTo({
      url: '../sex/sex?value=' + this.data.dataList.gender
    });
  },
  bindPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
          index: e.detail.value
      })
  },
  bindDateChanges: function (e) {
      this.setData({
          dates: e.detail.value
      })
  },
  // 上传头像图片事件
  uploadImg: function (res) {
    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData:{
            'user': 'test'
          },
          success: function(res){
            var data = res.data
            //do something
            console.log(data)
          },
          // fail: function (res) {
          fail: (res) => {
            console.log('wrong')
            console.log(res.data)
          }
        })
      }
    })
  },
  weInfo: function () {
    wx.getUserInfo({
      success: (res) => {
        var userInfo = res.userInfo
        this.data.dataList.avatar = userInfo.avatarUrl
        this.data.dataList.name = userInfo.nickName
        this.data.dataList.mail = ''
        this.data.dataList.gender = userInfo.gender
        this.data.dataList.date_birth = this.data.dates
        console.log(this.data.dates)
        this.setData({
          dataList: this.data.dataList
        })
      }
    })
  }
})