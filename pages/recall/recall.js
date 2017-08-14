// pages/needs/needs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tLength: 150,
    cLength: 0,
    text: '',
  },
  getLength: function (event) {
    var tlength = this.data.tLength;
    var clength = this.data.cLength;
    var txt = this.data.text;
    txt = event.detail.value;
    if( txt.length > 150 ) {
      clength = 150;
      txt = txt.substring(0,150);
      console.log(txt)
      // clength = event.detail.value.length;
    }
    else {
      clength = event.detail.value.length;
    }
    this.setData({
      cLength: clength,
      text: txt,
    });
    console.log(txt)
  },
  submitting: function () {
    wx.request({
      url: 'https://bugentuan.yoroliving.com/api/v1/suggestions',
      method: 'POST',
      data: {
        content: this.data.text
      },
      header: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + getApp().getToken()
      },
      success: (res) => {
        console.log(res.data)
        wx.showToast({
          title: '成功',
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
