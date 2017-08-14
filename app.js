//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  //判断是否登录, 如果没有登录跳转到登录页面
  needToken: function() {
    var token = wx.getStorageSync('key');
    if(token == null || token == '')
      wx.navigateTo({ url: '../login/login' })
  },
  //拿到token
  getToken: function() {
    var token = wx.getStorageSync('key');
    return token;
  },
  //存储token
  putToken: function(token) {
    wx.setStorage({
      key: "key",
      data: token
    });
  },

  globalData: {
    userInfo: null,
  }
})
