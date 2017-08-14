// pages/newPwd/newPwd.js
Page({
  data: {
    password: true,/*密码明文密文形式显示*/
    newP: '',/*用户输入的新密码*/
    sureP: '',/*用户输入的确认密码*/
    warnings: '验证错误提示信息',
    globalToken: '',
    warn: true,/*是否显示验证错误提示信息*/
  },
  // 控制密码明文密文显示
  screat: function () {
    this.data.password = !this.data.password;
    this.setData({
      password: this.data.password,
    })
  },
  // 当前密码输入框失去焦点事件
  currentPwd: function (e) {
    this.data.newP = e.detail.value
    this.pwdLengthCheck(e);
  },
  // 新密码输入框失去焦点事件
  newPwd: function (e) {
    this.data.sureP = e.detail.value
    this.pwdLengthCheck(e);
    var newps = this.data.newP;
    newps = e.detail.value;
    this.setData({
      newP: newps
    })
  },
  // 确认密码输入框失去焦点事件
  surePwd: function (e) {
    this.pwdLengthCheck(e);
    var sups = this.data.sureP;
    sups = e.detail.value;
    this.setData({
      sureP: sups
    })
    this.same();
  },
  // 验证用户输入密码长度是否合法
  pwdLengthCheck (e) {
    var length = e.detail.value.length;
    if( length >= 8 && length <= 16) {
      console.log('right')
      this.data.warn = true;
    }
    else {
      console.log('wrong')
      this.data.warn = false;
      this.data.warnings = '请输入8到16位密码';
    }
    this.setData({
      warn: this.data.warn,
      warnings: this.data.warnings,
    })
  },
  // 判断两次输入密码是否一致
  same () {
    console.log(this.data.sureP);
    console.log(this.data.newP);
    if(this.data.sureP === this.data.newP) {
      this.data.warn = true;
    }
    else {
      this.data.warn = false;
      this.data.warnings = '请重新确认密码';
    }
    this.setData({
      warn: this.data.warn,
      warnings: this.data.warnings,
    })
  },
  // 确定按钮点击事件
  sureBut: function () {
    same();
    if(!this.data.warn)return;
    try {
      var value = wx.getStorageSync('key')
      if (value) {
          this.setData({
            globalToken: value,
          })
      }
    } catch (e) {
      console.log('wrong')
    }
    wx.request({
      url: 'https://bugentuan.yoroliving.com/api/v1/modify',
      data: {
        nowPassword: this.data.newP,
        password: this.data.sureP,
      },
      header: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + this.data.globalToken
      },
      success: (res) => {
        console.log(res.data)
        wx.showToast({
          title: '修改成功',
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
  }
})
