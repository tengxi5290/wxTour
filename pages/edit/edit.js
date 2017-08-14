// pages/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iValue: '',
    state: '',
  },
  onLoad:function(options) {
    console.log(options)
    this.setData({
      iValue: options.value,
      state: options.state
    })
  },
  // 输入框后面清空按钮事件
  clears: function () {
    this.setData({
      iValue: '',
    })
  },
  // 保存按钮点击事件
  save: function () {
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]
    if(this.data.state == 'mail') {
      prevPage.data.dataList.email = this.data.iValue
    }
    else if(this.data.state == 'name') {
      prevPage.data.dataList.name = this.data.iValue
    }
    prevPage.setData({
      dataList: prevPage.data.dataList
    })
    wx.navigateBack({
      delta: 1
    })
  },
  ready: function (e) {
    console.log(e.detail.value)
    this.setData({
      iValue: e.detail.value
    })
  }
})