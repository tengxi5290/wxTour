// pages/mine/mine.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: '',
    globalToken: '',
    page: 'mine',
    dataList: {},
  },
  onLoad: function () {
    try {
      var value = getApp().getToken();
      if (value) {
          this.setData({
            globalToken: value,
          })
      }
    } catch (e) {
      console.log('wrong')
    }
    wx.request({
      url: 'https://bugentuan.yoroliving.com/api/v1/userinfo', 
      data: {
        
      },
      header: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + this.data.globalToken
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
  // 优惠券按钮点击事件
  toCoupon: function() {
    wx.navigateTo({
        url: '../couponList/couponList'
    });
  },
  // 设置按钮点击事件
  toSet: function () {
    wx.navigateTo({
        url: '../set/set'
    });
  },
  // 意见反馈按钮点击事件
  toRecall: function () {
    wx.navigateTo({
        url: '../recall/recall'
    });
  },
  // 全部订单按钮事件
  allOrders: function () {
    wx.redirectTo({
        url: '../orderlist/orderlist'
    });
  },
  // 待付款订单按钮事件
  noPay: function () {
    this.setData({
      status: 'before_pay'
    })
    var url = '../orderlist/orderlist?status=' + this.data.status
    wx.redirectTo({
        url: url
    });
  },
  // 未出行订单按钮事件
  noOut: function () {
    this.setData({
      status: 'before_tour'
    })
    var url = '../orderlist/orderlist?status=' + this.data.status
    wx.redirectTo({
        url: url
    });
  },
  // 退款订单按钮事件
  repays: function () {
    this.setData({
      status: 'cancel'
    })
    var url = '../orderlist/orderlist?status=' + this.data.status
    wx.redirectTo({
        url: url
    });
  },
  getStorage () {
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
  },
  toIndex: function () {
    this.data.page = 'index'
    this.setData({
      page: this.data.page
    })
    wx.redirectTo({
      url: '../index/index'
    })
  },
  toOrder: function () {
    this.getStorage();
    this.data.page = 'order'
    this.setData({
      page: this.data.page
    })
    wx.redirectTo({
      url: '../orderlist/orderlist'
    })
  },
  toMine: function () {
    this.getStorage
    this.data.page = 'mine'
    this.setData({
      page: this.data.page
    })
    wx.redirectTo({
      url: '../mine/mine'
    })
  },
})