// pages/orderlist/orderlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: '', //all
    // orderState: '退款啊',
    listData: [

    ],
    fix: false,/*导航是否相对屏幕固定*/
    page: 'order',
    globalToken: '',
  },

  onLoad:function(options) {
    if(options.status == undefined || options.status == null)
      options.status = '';
    this.setData({
      state: options.status,
      globalToken: getApp().getToken(),
    })
    this.getData();
  },
  getData: function() {
    wx.request({
      url: 'https://bugentuan.yoroliving.com/api/v1/orders',
      data: {
        status: this.data.state,  //before_pay  代付款  before_tour 未出行  cancel 退款单  空 全部
        self: true,
        //perPage: '',  //每页条数
        //page: '',  //请求页数
      },
      header: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.data.globalToken
      },
      success: (res) => {
        console.log(res.data)
        this.setData({
          listData: res.data.data,
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

  // 申请退款按钮
  repay: function (e) {
    wx.showModal({
      title: '确定要退款吗',
      content: '退款后订单不能恢复, 你支付的金额将在审核通过后按原支付方式退回.',
      success: (res) => {
        if (res.confirm) {
          var index = parseInt(e.currentTarget.dataset.index);
          var order = this.data.listData[index];
          wx.request({
            url: 'https://bugentuan.yoroliving.com/api/v1/refunds',
            data: {
              order_id: order.id
            },
            header: {
              'content-type': 'application/json',
              'Authorization': 'Bearer ' + this.data.globalToken
            },
            success: (res) => {
              wx.showToast({
                title: '申请成功',
                icon: 'success',
                duration: 1000,
              });
              this.getData();
            },
          })
        } else if (res.cancel) {

        }
      }
    })
  },
  // 查看订单详情按钮
  orderDetails: function (e) {
    console.log('订单详情')
  },
  // 删除按钮
  deleteOrder: function (e) {
    wx.showModal({
      title: '确定要删除吗',
      content: '删除后订单不能恢复, 不会出现在订单列表中.',
      success: (res) => {
        if (res.confirm) {
          var index = parseInt(e.currentTarget.dataset.index);
          var order = this.data.listData[index];
          wx.request({
            url: 'https://bugentuan.yoroliving.com/api/v1/orders/' + order.id,
            method: 'DELETE',
            header: {
              'content-type': 'application/json',
              'Authorization': 'Bearer ' + this.data.globalToken
            },
            success: (res) => {
              wx.showToast({
                title: '已删除',
                icon: 'success',
                duration: 1000,
              });
              this.getData();
            },
          })
        } else if (res.cancel) {

        }
      }
    })
  },
  // 立即支付按钮
  pay: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var order = this.data.listData[index];
    wx.showModal({
      title: '支付',
      content: '支付金额 ' + order.total_price + ' 元.',
      success: (res) => {
        if (res.confirm) {
          wx.request({
            url: 'https://bugentuan.yoroliving.com/api/v1/pay',
            data: {
              order_id: order.id
            },
            header: {
              'content-type': 'application/json',
              'Authorization': 'Bearer ' + this.data.globalToken
            },
            success: (res) => {
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 1000,
              });
              this.getData();
            },
          })
        } else if (res.cancel) {

        }
      }
    })
  },
  // 退款详情按钮
  repayDetails: function (e) {
    console.log('退款详情')
  },


  // 导航全部按钮
  all: function () {
      this.setData({
        state: '',
      })
      this.getData();
  },
  // 导航未出行按钮
  underGo: function () {
    this.setData({
      state: 'before_tour',
    })
    this.getData();
  },
  // 导航待支付按钮
  underPay: function () {
    this.setData({
      state: 'before_pay',
    })
    this.getData();
  },
  // 导航退款单按钮
  repayList: function () {
    this.setData({
      state: 'refunded',
    })
    this.getData();
  },
  // 导航条滚过以后固定在屏幕顶部
  scrollVerticle: function (event) {
    var sTop = event.detail.scrollTop;
    var ifFix = this.data.fix;
    if(sTop >= 50) {
      ifFix = true;
    }
    else {
      ifFix = false;
    }
    this.data.fix = ifFix;
    this.setData({
      fix: this.data.fix,
    })
  },
  listDetail: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var id = this.data.listData[index].id;
    wx.navigateTo({
        url: '../underpay/underpay?id='+id
    });
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
  }
})
