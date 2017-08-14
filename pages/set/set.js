Page({
  data: {
    storage: '',
    globalToken: '',
    dataList: {},
  },
  onLoad: function () {
    wx.getStorageInfo({
      success: (res) => {
        this.setData({
          storage: res.currentSize,
        })
        console.log(this.data.storage)
      }
    })
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
  // 关于我们点击事件
  toAboutUs: function () {
    wx.navigateTo({
        url: '../aboutUs/aboutUs'
    });
  },
  // 退出登录按钮点击事件
  logout: function () {
    wx.clearStorage()
    wx.showToast({
      title: '退出成功',
      icon: 'success',
      duration: 2000,
    });
    setTimeout(function() {
      wx.redirectTo({
        url: '../index/index'
    });
    }.bind(this), 2000);
  },
  // 修改个人资料按钮点击事件
  changeSelf: function () {
    wx.navigateTo({
        url: '../userInfo/userInfo'
    });
  },
  // 修改登录密码按钮点击事件
  changePwd: function () {
    wx.navigateTo({
        url: '../newPwd/newPwd'
    });
  },
  // 常用旅客信息按钮点击事件
  travellerMsg: function () {
    wx.navigateTo({
        url: '../selectTraveller/selectTraveller?have=no'
    });
  },
  // 清除缓存按钮点击事件
  clear: function () {
    wx.clearStorage()
    this.onLoad()
    console.log(this.data.storage)
  }
})