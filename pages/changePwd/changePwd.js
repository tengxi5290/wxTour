// pages/regist/regist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible: false,/*判断密码明文或者密文显示*/
    enable: false,/*验证码按钮是否被禁用*/
    getNode: '获取验证码',/*获取验证码按钮文字*/
    second: 5,/*多少秒后重新获取验证码*/
    available: true,/*重置密码按钮是否可用*/
    newpass: '',/*用户输入新密码的预设值*/
    checknodes: '',/*用户输入验证码的预设值*/
    warningMsg: 'error',/*表单验证提示信息*/
    survive: true,/*提示信息是否可见*/
  },
  onLoad: function (options) {
    this.setData({
      phone: options.phone
    })
    console.log(this.data.phone)
  },
  // 验证码运算逻辑
  changeCheck () {
    var text = this.data.getNode;
    var time = this.data.second;
    var able = this.data.enable;
    if(time > 0) {
      text = '重新获取验证码' + time;
      able = true;
      time = time - 1;
    }
    else {
      text = '重新获取验证码';
      able = false;
      time = 5;
    }
    this.data.getNode = text;
    this.data.enable = able;
    this.data.second = time;
    this.setData ({
      getNode: this.data.getNode,
      enable: this.data.enable,
      second: this.data.second,
    })
    if(time == 5)
      return;
    setTimeout(function() {
       this.changeCheck();
    }.bind(this), 1000)
  },
  // 获取验证码按钮事件
  getCheckNode: function () {
    this.changeCheck();
    wx.request({
      url: 'https://bugentuan.yoroliving.com/api/v1/code',
      data: {
        phone: this.data.phone,
      },
      header: {
      'content-type': 'application/json'
      },
      success: (res) => {
        console.log(res.data)
        wx.showToast({
          title: '发送成功',
          icon: 'success',
          duration: 2000,
        });
      },
      fail: function (res) {
        // console.log(res.data)
      },
      complete: function (res) {
        // console.log(res.data)
      }
    })
  },
  // 转化密码明文暗文事件
  cache: function () {
    this.data.visible = !this.data.visible;
    this.setData({
      visible: this.data.visible,
    })
  },
  // 点击重置密码按钮事件
  resetMySecret: function () {
    console.log('电话：'+ this.data.phone+ '验证码：'+this.data.checknodes+'密码：'+this.data.newpass)
    wx.request({
      url: 'https://bugentuan.yoroliving.com/api/v1/reset',
      data: {
        phone: this.data.phone,
        code: this.data.checknodes,
        password: this.data.newpass,
      },
      header: {
      'content-type': 'application/json'
      },
      success: (res) => {
        console.log(res.data)
        wx.showToast({
          title: '密码修改成功',
          icon: 'success',
          duration: 2000,
        });
        setTimeout(function() {
          wx.navigateBack({
              delta: 1
          });
        }.bind(this), 2000);
      },
      fail: function (res) {
        // console.log(res.data)
      },
      complete: function (res) {
        // console.log(res.data)
      }
    })
  },
  // 设置新密码输入框值变化事件
  newPwd: function (e) {
    this.data.newpass = e.detail.value;
    if(this.data.newpass.length >= 8 && this.data.newpass.length <= 18) {
      this.data.available = false;
      this.data.survive = true;
    }
    else {
      this.data.available = true;
      this.data.survive = false;
      this.data.warningMsg = '请输入8到18位密码';
    }
    this.setData({
      available: this.data.available,
      warningMsg: this.data.warningMsg,
      survive: this.data.survive,
    })
  },
  // 验证码输入框值变化事件
  newCheckNode: function (e) {
    this.data.checknodes = e.detail.value;
    // if(this.data.checknodes.length == 6) {
    //   this.data.survive = true;
    // }
    // else {
    //   this.data.survive = false;
    //   this.data.warningMsg = '验证码错误';
    // }
    this.setData({
      available: this.data.available,
      // warningMsg: this.data.warningMsg,
      // survive: this.data.survive,
    })
  }
})
