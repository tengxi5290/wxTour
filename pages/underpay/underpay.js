// pages/underpay/underpay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: true,/*费用说明蒙版*/
    overflow: false,/*背景网页是否能滚动*/
    // status: 'nopay',
    warning: true,/*取消订单警示蒙版*/
    tel: true,/*打电话蒙版*/
    ifPlane: 'yes',/*飞机票出票状态*/
    dataList: {

    },
    orderId: '',
  },
  // 页面加载事件
  onLoad:function(options) {
    var objectId = options.id
    this.data.orderId = options.id
    this.setData({
      orderId: this.data.orderId
    })
    wx.request({
      url: 'https://bugentuan.yoroliving.com/api/v1/orders/' + objectId, 
      data: {
        
      },
      header: {
      'content-type': 'application/json'
      },
      success: (res) => {
        console.log(res.data)
        this.setData({
          dataList: res.data.data,
        })
        console.log(this.data.dataList.tickets)
        if(this.data.dataList.tickets == '') {
          this.data.ifPlane = 'no'
        }
        else {
          this.data.ifPlane = 'yes'
        }
        this.setData({
          ifPlane: this.data.ifPlane
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
  // 控制蒙版的打开或关闭以及背景网页是否能滚动
  shutOrOpen () {
      this.data.select = !this.data.select;
      this.data.overflow = !this.data.overflow;
      this.setData({
        select: this.data.select,
        overflow: this.data.overflow,
      });
  },
  // 控制取消警示蒙版打开与关闭
  cancelOrNot () {
    this.data.warning = !this.data.warning;
    this.data.overflow = !this.data.overflow;
    this.setData({
      warning: this.data.warning,
      overflow: this.data.overflow,
    })
  },
  // 控制客服电话蒙版打开与关闭
  telOrNot () {
    this.data.tel = !this.data.tel;
    this.data.overflow = !this.data.overflow;
    this.setData({
      tel: this.data.tel,
      overflow: this.data.overflow,
    })
  },
   // 打开费用说明蒙版
  showMask: function () {
    this.shutOrOpen();
  },
  // 关闭费用说明蒙版
  shutMask: function () {
    this.shutOrOpen();
  },
  // 点击商品标题触发事件
  toGoodShow: function () {
    wx.navigateTo({
      url: '../goodShow/goodShow'
    })
  },
  // 点击取消订单按钮事件
  cancelOrder: function () {
    this.cancelOrNot();
  },
  // 点击联系我们按钮事件
  contactUs: function () {
    this.telOrNot();
  },
  // 点击立即支付按钮事件
  bought: function () {
    wx.requestPayment({
      'timeStamp': '',
      'nonceStr': '',
      'package': '',
      'signType': 'MD5',
      'paySign': '',
      'success':function(res){},
      'fail':function(res){},
      'complete':function(res){}
    }) 
  },
  //点击取消警示蒙版上取消按钮
  maskCancel: function () {
    this.cancelOrNot();
  },
  //点击取消警示蒙版上确定按钮
  maskSure: function () {
    this.cancelOrNot();
    // 删除订单啊
    wx.request({
        url: 'https://bugentuan.yoroliving.com/api/v1/orders/' + this.data.orderId,
        method: 'delete',
        header: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + getApp().getToken()
        }
      })
  },
  // 点击客服电话蒙版取消按钮
  telCancel: function () {
    this.telOrNot();
  },
  // 点击客服电话蒙版确定按钮
  telSure: function () {
    this.telOrNot();
    wx.makePhoneCall({
      phoneNumber: '400-6667-997',
      success: function () {
        console.log('成功调用接口')
      },
      fail: function () {
        console.log('调用接口失败')
      },
      complete: function () {
        console.log('接口调用完成')
      }
    })
  }
})