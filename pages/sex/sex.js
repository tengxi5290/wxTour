// pages/sex/sex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {name: 'male', value: '男'},
      {name: 'female', value: '女'},
      {name: 'unknow', value: '保密'},
    ],
    selectedGender: '',
  },
  onLoad:function(options) {
    console.log(options.value)
    if(options.value == 'boy') {
      // this.data.items[0].checked = 'true'
      // this.data.items[1].checked = 'false'
      // this.data.items[2].checked = 'false'
      this.data.items[0].checked = 'true'
      console.log('boy')
    }
    else if(options.value == 'girl') {
      // this.data.items[0].checked = 'false'
      // this.data.items[1].checked = 'true'
      // this.data.items[2].checked = 'false'
      this.data.items[1].checked = 'true'
      console.log('girl')
    }
    else {
      // this.data.items[0].checked = 'false'
      // this.data.items[1].checked = 'false'
      // this.data.items[2].checked = 'true'
      this.data.items[2].checked = 'true'
      console.log('unknow')
    }
    // this.data.items.value = options.value
    this.setData({
      items: this.data.items
    })
    console.log(this.data.items)
  },
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.selectedGender = e.detail.value
    this.setData({
      selectedGender: this.data.selectedGender
    })
  },
  save: function () {
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]
    if(this.data.selectedGender == 'female') {
      prevPage.data.dataList.gender = 2
    }
    else if(this.data.selectedGender == 'male') {
      prevPage.data.dataList.gender = 1
    }
    else {
      prevPage.data.dataList.gender = 0
    }
    prevPage.setData({
      dataList: prevPage.data.dataList
    })
    wx.navigateBack({
      delta: 1
    })
  }
})