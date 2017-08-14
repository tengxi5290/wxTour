// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数据
    imgUrls: [
      'http://jinqiu.oss-cn-beijing.aliyuncs.com/miniTour/1.jpg',
      'http://jinqiu.oss-cn-beijing.aliyuncs.com/miniTour/2.jpg',
      'http://jinqiu.oss-cn-beijing.aliyuncs.com/miniTour/3.jpg'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    circular: true,
    lMask: true,/*登录蒙版是否显示*/
    // phone: '',/*用户输入的手机号码预设值*/
    // password: '',/*用户输入的密码预设值*/
    forbidden: true,/*忘记密码按钮是否禁用*/
    go: true,/*是否禁用蒙版上登录按钮*/
    wrong: 'error',/*蒙版上表单验证错误提示信息*/
    // attentionMask: true,/*蒙版上错误提示信息是否显示*/
    dataList: {
      password: '313640962',
    },
  },
  // 控制蒙版显示或者隐藏事件
  mask () {
    this.data.lMask = !this.data.lMask;
    this.setData({
      lMask: this.data.lMask,
    })
  },
  // 点击登录按钮事件
  goLogin: function () {
    this.mask();
  },
  // 点击去注册按钮事件
  goRegist: function () {
    wx.navigateTo({
        url: '../regist/regist'
    });
  },
  // 点击忘记密码按钮事件
  forgetP: function (e) {
    wx.navigateTo({
        url: '../changePwd/changePwd?phone=' + this.data.dataList.phone
    });
  },
  // 登录按钮事件
  biu: function (e) {
    wx.request({
      url: 'https://bugentuan.yoroliving.com/api/v1/login',
      method: 'POST',
      data: {
        grant_type: 'password',
        client_id: 1,
        client_secret: 'oCF9FSZRbVDYXKH1d7NTlUDspuCH4EyTLeMsYfH6',
        scope: "",
        phone: this.data.dataList.phone,
        password: this.data.dataList.password,
      },
      header: {
      'content-type': 'application/json'
      },
      success: (res) => {
        console.log(res.data)
        if(res.data.code == null){
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000,
          });
          setTimeout(function() {
            wx.navigateBack({
                delta: 1
            });
          }.bind(this), 2000);
          getApp().putToken(res.data.access_token);
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'loading',
            duration: 2000,
          });
        }
      },
      fail: function (res) {
        // console.log(res.data)
        wx.showToast({
          title: '登录失败，请重试',
          icon: 'success',
          duration: 2000,
        });
        setTimeout(function() {
          // wx.navigateTo({
          //     url: '../login/login'
          // });
        }.bind(this), 2000);
      },
      complete: function (res) {
        // console.log(res.data)
      }
    })
  },
  // 蒙版上关闭按钮事件
  shut: function () {
    this.mask();
    this.empty();
  },
  // 手机号码输入框表单事件
  phoneNo: function (e) {
    this.data.dataList.phone = e.detail.value;
    var mobile = /^1\d{10}$/;
    if (mobile.test(this.data.dataList.phone)) {
        this.data.forbidden = false;
        this.data.attentionMask = true;
    } else {
        this.data.forbidden = true;
        this.data.attentionMask = false;
        // this.data.wrong = '手机号码不正确';
        wx.showToast({
          title: '手机号码不正确',
          icon: 'loading',
          duration: 2000,
        });
    }
    this.setData({
      forbidden: this.data.forbidden,
      wrong: this.data.wrong,
      attentionMask: this.data.attentionMask,
    });
  },
  //密码输入框表单事件
  passwd: function (e) {
    this.data.dataList.password = e.detail.value;
    if(this.data.dataList.password != '' && this.data.dataList.password.length >= 8 && this.data.dataList.password.length < 18) {
      this.data.go = false;
    }
    else {
      this.data.go = true;
      wx.showToast({
        title: '8-18位密码',
        icon: 'loading',
        duration: 2000,
      });
    }
    this.setData({
      go: this.data.go,
    })
  },
  // 清空输入框数据
  empty() {
    this.data.dataList.phone = ''
    this.data.dataList.password = ''
    this.data.go = true
    this.setData({
      phone: this.data.dataList.phone,
      password: this.data.dataList.password,
      go: this.data.go
    })
  }
})