//index.js
//获取应用实例
var app = getApp()
// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      
    dataList: [
      
    ],
    listState: 'selled',
    listType: 'normal',
    page: 'index',
  },
  onLoad:function(options) {
    wx.request({
      url: 'https://bugentuan.yoroliving.com/api/v1/goods',
      data: {
        type: 'normal',
        status: 'selled'
      },
      header: {
      'content-type': 'application/json'
      },
      success: (res) => {
        console.log(res.data)
        this.setData({
          dataList: res.data.data,
        })
      },
      fail: function (res) {
        // console.log(res.data)
      },
      complete: function (res) {
        // console.log(res.data)
      }
    })
  },
  toGoods: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var id = this.data.dataList[index].id;
    wx.navigateTo({
      url: '../goodShow/goodShow?id='+id + '&price=' + this.data.dataList[index].lowPrice
    })
  },
  toIndex: function () {
    this.data.page = 'index'
    this.setData({
      page: this.data.page
    })
    wx.navigateTo({
      url: '../index/index'
    })
  },
  toOrder: function () {
    var token = app.getToken();
    if(token == null || token == ''){
      wx.navigateTo({ url: '../login/login' })
    }else{
      wx.redirectTo({ url: '../orderlist/orderlist' })
    }
  },
  toMine: function () {
    var token = app.getToken();
    if(token == null || token == ''){
      wx.navigateTo({ url: '../login/login' })
    }else{
      wx.redirectTo({ url: '../mine/mine' })
    }
  }
})
