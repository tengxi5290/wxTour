// pages/orderlist/orderlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fix: false,/*导航是否相对屏幕固定*/
    status: 'usable',
    globalToken: '',
    dataList: [

    ],
  },
  onLoad:function(options) {
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

    this.getData();
  },
  getData: function() {
    wx.request({
      url: 'https://bugentuan.yoroliving.com/api/v1/coupons',
      data: {
        status: this.data.status,
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
        // 截取日期字符串
        // for(var i=0; i<this.data.dataList.length; i++) {
        //   this.data.dataList[i].begining = this.data.dataList[i].begining.slice(0,10)
        //   this.data.dataList[i].deadline = this.data.dataList[i].deadline.slice(0,10)
        // }
        // this.setData({
        //     dataList: this.data.dataList
        // })
      },
      fail: function (res) {
        // console.log(res.data)
      },
      complete: function (res) {
        // console.log(res.data)
      }
    })
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
  // 导航按钮点击事件
  underUse: function () {
    this.setData({
      status: 'usable',
    })
    this.getData();
  },
  used: function () {
    this.setData({
      status: 'used',
    })
    this.getData();
  },
  useless: function () {
    this.setData({
      status: 'destroyed',
    })
    this.getData();
  },
  // 点击每个优惠券跳转到商品列表页面
  toList: function () {
    wx.navigateTo({
        url: '../index/index'
    });
  }
})
