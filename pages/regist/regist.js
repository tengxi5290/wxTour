// pages/regist/regist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible: false,
    enable: true,/*验证码按钮是否被禁用*/
    getNode: '获取验证码',/*获取验证码按钮文字*/
    second: 5,/*多少秒后重新获取验证码*/
    can: true,/*注册按钮是否禁用*/
    warningMsg: '警示信息',
    survive: true,/*警示信息是否显示*/
    dataList: {

    }
  },
  // 验证码按钮变化状态
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
        phone: this.data.dataList.phone,
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
  // 切换密码明文暗文
  cache: function () {
    this.data.visible = !this.data.visible;
    this.setData({
      visible: this.data.visible,
    })
  },
  // 点击注册按钮事件
  goRegist: function (e) {
    wx.request({
      url: 'https://bugentuan.yoroliving.com/api/v1/register',
      method: 'POST',
      data: {
        phone: this.data.dataList.phone,
        code: this.data.dataList.code,
        password: this.data.dataList.password,
      },
      header: {
      'content-type': 'application/json'
      },
      success: (res) => {
        console.log(res.data)
        wx.showToast({
          title: '注册成功',
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
  // 手机号码输入框表单事件
  phoneNo: function (e) {
    this.data.dataList.phone = e.detail.value;
    var mobile = /^1\d{10}$/;
    if (mobile.test(this.data.dataList.phone)) {
        this.data.survive = true;
        this.data.enable = false;
    } else {
        this.data.can = true;
        this.data.warningMsg = '请输入正确的11位手机号码';
        this.data.survive = false;
    }
    this.setData({
      can: this.data.can,
      warningMsg: this.data.warningMsg,
      survive: this.data.survive,
      enable: this.data.enable,
    });
  },
  // 密码输入框表单事件
  pwdLength: function (e) {
    this.data.dataList.password = e.detail.value;
    var length = this.data.dataList.password.length;
    if ( length < 8 || length > 18 ) {
        this.data.can = true;
        this.data.warningMsg = '密码要8到18位嗷';
        this.data.survive = false;
    } else {
        this.data.can = false;
        this.data.survive = true;
    }
    this.setData({
      can: this.data.can,
      warningMsg: this.data.warningMsg,
      survive: this.data.survive,
    });
  },
  //验证码输入框事件
  node: function (e) {
    this.data.dataList.code = e.detail.value;
  }
})