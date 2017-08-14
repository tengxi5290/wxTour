// pages/coupon/coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  	status: '',
  	coupon: '',
  	dataList: {},
    couponList: [],
    checkCouponList: [],
    tcPrice: 0,
    couponVerify: {
      id: '',
      user_id: '',
      price: '',
      lowest_price: '',
      scope: '',
      status: '',
      begining: '',
      deadline: '',
      tips: '',
      key: '',
    },
  },
  onLoad:function(options) {
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
    wx.request({
      url: 'https://bugentuan.yoroliving.com/api/v1/coupons',
      data: {
        status: 'usable',
      },
      header: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + this.data.globalToken
      },
      success: (res) => {
        console.log(res.data)
        this.setData({
          couponList: res.data.data,
        })
        if(this.data.couponList.length>0) {
          this.data.status = 'usable'
        }
        else {
          this.data.status = 'xxx'
        }
        this.setData({
          status: this.data.status
        })
        // 截取日期字符串
        for(var i=0; i<this.data.couponList.length; i++) {
          this.data.couponList[i].begining = this.data.couponList[i].begining.slice(0,10)
          this.data.couponList[i].deadline = this.data.couponList[i].deadline.slice(0,10)
        }
        this.setData({
            couponList: this.data.couponList
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
  // 验证按钮事件
  couponCheck: function () {
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
      wx.request({
      url: 'https://bugentuan.yoroliving.com/api/v1/coupon-verify',
      data: {
        key: this.data.coupon,
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
        this.data.couponList.push(this.data.couponVerify)
        console.log(this.data.couponList[this.data.couponList.length-1])
        console.log(this.data.dataList)
        this.data.couponList[this.data.couponList.length-1].id = this.data.dataList.id
        this.data.couponList[this.data.couponList.length-1].user_id = this.data.dataList.user_id
        this.data.couponList[this.data.couponList.length-1].price = this.data.dataList.price
        this.data.couponList[this.data.couponList.length-1].lowest_price = this.data.dataList.lowest_price
        this.data.couponList[this.data.couponList.length-1].scope = this.data.dataList.scope
        this.data.couponList[this.data.couponList.length-1].status = this.data.dataList.status
        this.data.couponList[this.data.couponList.length-1].begining = this.data.dataList.begining
        this.data.couponList[this.data.couponList.length-1].deadline = this.data.dataList.deadline
        this.data.couponList[this.data.couponList.length-1].tips = this.data.dataList.tips
        this.data.couponList[this.data.couponList.length-1].key = this.data.dataList.key
        this.setData({
          couponList: this.data.couponList
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
  // 获取输入框值事件
  comeOn: function (e) {
  	this.data.coupon = e.detail.value;
  	this.setData({
  		coupon: this.data.coupon,
  	})
  },
  // 点击使用按钮事件
  use: function (e) {
    var index = parseInt(e.currentTarget.dataset.index)
    var cObj = {
      cPrice: 0,
      cId: '',
    }
    for(var f = 0; f < this.data.couponList.length; f++ ) {
      this.data.couponList[f].status = 'usable'
    }
    this.data.checkCouponList.length = 0
    this.setData({
      checkCouponList: this.data.checkCouponList,
    })
    this.data.couponList[index].status = 'used'
    this.data.checkCouponList.push(cObj)
    this.data.checkCouponList[0].cPrice = this.data.couponList[index].price
    this.data.checkCouponList[0].cId = this.data.couponList[index].id
    this.setData({
      couponList: this.data.couponList,
      checkCouponList: this.data.checkCouponList
    })
  },
  // 取消优惠券事件
  cancelCoupon: function (e) {
    var index = parseInt(e.currentTarget.dataset.index)
    this.data.checkCouponList.length = 0
    this.data.couponList[index].status = 'usable'
    this.setData({
      couponList: this.data.couponList,
      checkCouponList: this.data.checkCouponList
    })
  },
  selectCoupon: function () {
    for(var c = 0; c<this.data.checkCouponList.length; c++) {
      this.data.tcPrice = this.data.tcPrice + parseInt(this.data.checkCouponList[0].cPrice)
    }
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]
    prevPage.setData({
      totalCoupon: this.data.tcPrice,
      coupon_id: this.data.checkCouponList[0].cId
    })
    wx.navigateBack({
      delta: 1
    })
  }
})
