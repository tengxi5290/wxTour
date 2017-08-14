// pages/needs/needs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tLength: 300,
    cLength: 0,

    array: ['请选择退款原因', '我不想买了', '信息填写错误，重新拍', '其他原因'],
    index: 0,
  },
  onShareAppMessage: function () {
  
  },
  getLength: function (event) {
    var tlength = this.data.tLength;
    var clength = this.data.cLength;
    if( event.detail.value.length > 150 ) {
      clength = 150;
    }
    else {
      clength = event.detail.value.length;
    }
    this.setData({
      cLength: clength,
    });
  },
  reason: function () {

  },
  bindPickerChange: function(e) {
   console.log('picker发送选择改变，携带值为', e.detail.value)
   this.setData({
    index: e.detail.value
  })
 },
 bindDateChange: function(e) {
   this.setData({
    date: e.detail.value
  })
 },
 bindTimeChange: function(e) {
   this.setData({
    time: e.detail.value
  })
 }
})