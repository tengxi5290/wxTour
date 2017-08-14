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
  },
  submitting: function () {
    var pages = getCurrentPages()
    console.log(pages)
    var prevPage = pages[pages.length - 2]
    prevPage.setData({
      feedback: this.data.text
    })
    wx.navigateBack({
      delta: 1
    })
  }
})