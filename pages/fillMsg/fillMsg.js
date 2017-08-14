// pages/fillMsg/fillMsg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: true,/*费用说明蒙版*/
    overflow: false,/*背景网页是否能滚动*/
    chosen: true,/*保险说明蒙版*/
    checkOrNot: false,/*点选使用优惠*/
    // hasCoupon: true,/*判断有没有优惠券可用*/
    status: '',
    agreeOrNot: false,/*点选勾选协议*/
    enable: true,/*验证码按钮是否被禁用*/
    getNode: '获取验证码',/*获取验证码按钮文字*/
    second: 5,/*多少秒后重新获取验证码*/
    totalPrice: 0,
    totalCoupon: 0,
    totalCouponPrice: 0,
    // cVal: '',
    // cCheck: false,
    feedback: '',//反馈信息
    insTotal: 0,//保险总价格
    globalToken: '',
    // 存放成人的数组
    inputsGroup: [

    ],
    // 存放儿童的数组
    inputsGroups: [

    ],
    //保险对象
    listData: {

    },
    insData: {},
    //存放保险id的数组
    insuranceArray: [

    ],
    // 存放选中的保险的数组
    wanted: [

    ],
    //存放优惠券的数组
    couponsArray: [],
    coupon_id: 0,
    //存放选择的出行人数组
    tourist: [],
    //存放联系人的对象
    contactPeople: {
      name: '',
      phone: '',
      email: '',
      node: '',
    },
  },
  onLoad:function(options) {
    console.log(options)
    this.setData({
      names: options.names,
      count: parseInt(options.count),
      childCount: parseInt(options.childCount),
      format: options.format,
      start_address: options.start_address,
      price: options.price,
      id: options.id,
      goodid: options.goodid,
      childprice: options.childprice,
      days: options.days,
      year: options.year,
      month: options.month
    })
    var obj = {
      num: '',
      title: '成人',
    }
    var objChild = {
      num: '',
      title: '儿童',
    }
    for(var j = 1; j <= options.count; j++ ) {
      this.data.inputsGroup.push(obj);
    }
    for(var i = 0; i < options.childCount; i++) {
      this.data.inputsGroups.push(objChild);
    }
    this.setData({
      inputsGroup: this.data.inputsGroup,
      inputsGroups: this.data.inputsGroups,
    })
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
      url: 'https://bugentuan.yoroliving.com/api/v1/insurances',
      data: {

      },
      header: {
      'content-type': 'application/json',
      },
      success: (res) => {
        console.log(res.data)
        this.setData({
          listData: res.data.data,
        })
        for(var k = 0; k<this.data.listData.length; k++){
          this.data.listData[k].bingo = false
        }
        this.setData({
          listData: this.data.listData
        })
      },
      fail: function (res) {
        // console.log(res.data)
      },
      complete: function (res) {
        // console.log(res.data)
      }
    })
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
        console.log(this.data.globalToken)
        console.log(res.data)
        this.setData({
          couponsArray: res.data.data,
        })
        if(this.data.couponsArray.length>0) {
          // this.data.checkOrNot = true
          this.data.status = 'usable'
        }
        else {
          // this.data.checkOrNot = false
          this.data.status = 'used'
        }
        this.setData({
          // checkOrNot: this.data.checkOrNot,
          status: this.data.status
        })
      },
      fail: function (res) {
        // console.log(res.data)
      },
      complete: function (res) {
        // console.log(res.data)
      }
    })
    this.calculateTotalPrice ();
  },
  goProtocol: function () {
    wx.navigateTo({
        url: '../protocol/protocol'
    });
  },
  // 控制蒙版的打开或关闭以及背景网页是否能滚动
  shutOrOpen (n) {
    if(n) {
      this.data.chosen = !this.data.chosen;
      this.data.overflow = !this.data.overflow;
      this.setData({
        chosen: this.data.chosen,
        overflow: this.data.overflow,
      })
    }
    else {
      this.data.select = !this.data.select;
      this.data.overflow = !this.data.overflow;
      this.setData({
        select: this.data.select,
        overflow: this.data.overflow,
      });
    }
  },
  // 打开费用说明蒙版
  showMask: function () {
    this.shutOrOpen();
  },
  // 关闭费用说明蒙版
  shutMask: function () {
    this.shutOrOpen();
  },
  // 打开保险说明蒙版
  showTip: function (e) {
      // this.shutOrOpen(n);
      this.data.chosen = !this.data.chosen;
      this.data.overflow = !this.data.overflow;
      this.setData({
        chosen: this.data.chosen,
        overflow: this.data.overflow,
      })
      var index = parseInt(e.currentTarget.dataset.index);
      var insId = this.data.listData[index].id;
      console.log(insId)
      wx.request({
        url: 'https://bugentuan.yoroliving.com/api/v1/insurances/' + insId,
        data: {

        },
        header: {
          'content-type': 'application/json',
        },
        success: (res) => {
          console.log('obj:'+res.data)
          this.setData({
            insData: res.data.data,
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
  // 关闭保险说明蒙版
  shutTip: function (n) {
      this.shutOrOpen(n);
  },
  // 点选是否使用优惠
  barginOrNot: function () {
    this.data.checkOrNot = !this.data.checkOrNot;
    if(this.data.checkOrNot == false) {
      this.data.totalCoupon = 0
    }
    else {
      this.data.totalCoupon = this.data.totalCouponPrice
    }
    this.setData({
      checkOrNot: this.data.checkOrNot,
      totalCoupon: this.data.totalCoupon
    })
    this.calculateTotalPrice()
  },
  // 跳转到优惠券页面
  goCoupon: function () {
    wx.navigateTo({
        url: '../coupon/coupon'
    });
  },
  // 是否同意协议按钮
  changeAgree: function () {
    this.data.agreeOrNot = !this.data.agreeOrNot;
    this.setData({
      agreeOrNot: this.data.agreeOrNot,
    })
  },
  // 验证码按钮变化状态
  changeCheck () {
    var text = this.data.getNode;
    var time = this.data.second;
    var able = this.data.enable;
    if(time > 0) {
      text = '重新获取验证码' + time;
      able = true;
      time = time - 1;
    }
    else {
      text = '重新获取验证码';
      able = false;
      time = 5;
    }
    this.data.getNode = text;
    this.data.enable = able;
    this.data.second = time;
    this.setData ({
      getNode: this.data.getNode,
      enable: this.data.enable,
      second: this.data.second,
    })
    if(time == 5)
      return;
    setTimeout(function() {
       this.changeCheck();
    }.bind(this), 1000)
    console.log(text)
  },
  // 获取验证码按钮事件
  getCheckNode: function () {
    this.changeCheck();
  },
  needs: function () {
      wx.navigateTo({
          url: '../needs/needs'
      })
  },
  // 保险改变选中效果时处理保险id数组事件
  checken: function (e) {
    var index = parseInt(e.currentTarget.dataset.index)
    var insurancesId = this.data.listData[index].id
    if(this.data.listData[index].bingo == true) {
      this.data.listData[index].bingo = false
      for(var i = 0; i < this.data.insuranceArray.length; i++){
        if(this.data.insuranceArray[i].iId == insurancesId){
          this.data.insuranceArray.splice(i,1)
          break
        }
      }
    }
    else {
      var iObj = {
        iprice: this.data.listData[index].price,
        iId: this.data.listData[index].id,
        bingo: this.data.listData[index].bingo,
        iName: this.data.listData[index].name,
        iCompany: this.data.listData[index].company
      }
      this.data.insuranceArray.push(iObj)
      this.data.listData[index].bingo = true
    }
    this.setData({
      listData: this.data.listData,
      insuranceArray: this.data.insuranceArray
    })
    this.calculateTotalPrice()
    console.log(this.data.insuranceArray)
  },
  // 选择出行人按钮点击事件
  chooseTraveller: function () {
    wx.navigateTo({
        url: '../selectTraveller/selectTraveller?num=' + this.data.count + '&year=' + this.data.year
    });
  },
  // 计算商品总价
  calculateTotalPrice () {
    this.data.insTotal = 0
    for(var ins=0;ins<this.data.insuranceArray.length;ins++) {
      this.data.insTotal = this.data.insTotal + this.data.insuranceArray[ins].iprice
    }
    this.setData({
      insTotal: this.data.insTotal
    })
    this.data.totalPrice = this.data.price * this.data.count + this.data.childprice * this.data.childCount + this.data.insTotal*(this.data.count+this.data.childCount) - this.data.totalCoupon
    this.setData({
      totalPrice: this.data.totalPrice
    })
  },
  // 立即预订提交按钮
  bought: function () {
    if (this.data.contactPeople.name == null || this.data.contactPeople.name == '' ||
        this.data.contactPeople.phone == null || this.data.contactPeople.phone == '' ||
        this.data.tourist.length == 0
      ) {
        wx.showToast({
          title: '信息不完整',
          icon: 'success',
          duration: 2000,
        });
        return;
    }
    for(var w =0; w<this.data.insuranceArray.length; w++) {
      this.data.wanted.push(this.data.insuranceArray[w].iId)
    }
    this.setData({
      wanted: this.data.wanted
    })
    console.log(this.data.wanted)
    var goDate = this.data.year + '-' + this.data.month + '-' + this.data.days
    wx.request({
      url: 'https://bugentuan.yoroliving.com/api/v1/orders',
      method: 'POST',
      data: {
        good_id: this.data.goodid,
        date: goDate,
        contact: this.data.contactPeople,
        travelers: this.data.tourist,
        insurance_ids: this.data.wanted,
        coupon_id: this.data.coupon_id,
        remark: this.data.feedback,
        childcount: this.data.childcount
      },
      header: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + this.data.globalToken
      },
      success: (res) => {
        // console.log(res.data)
        if(res.data.code == 200){
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000,
          });
          setTimeout(function() {
            wx.redirectTo({
                url: '../orderlist/orderlist'
            });
          }.bind(this), 2000);
        }else{
          wx.showToast({
            title: '提交出错',
            icon: 'success',
            duration: 2000,
          });
        }


        /*
        if(this.data.contactPeople.name == '' || this.data.contactPeople.phone == '' || this.data.contactPeople.node == '') {
          wx.showToast({
            title: '请补全联系人信息',
            icon: 'info',
            duration: 2000,
          });
        }else {
          //这里面写链
        }
        */
      },
      fail: (res) => {
        // console.log(res.data)
        console.log('fail')
      },
      complete: (res) => {
        // console.log(res.data)
        console.log('over')
      }
    })
  },
  // 联系人姓名
  fillTourName: function (e) {
    this.data.contactPeople.name = e.detail.value
    this.setData({
      name: this.data.contactPeople.name
    })
  },
  // 联系人电话
  fillTourPhone: function (e) {
    this.data.contactPeople.phone = e.detail.value
    if(this.data.contactPeople.phone == '') {
      this.data.enable = true
    }
    else {
      this.data.enable = false
    }
    this.setData({
      phone: this.data.contactPeople.phone,
      enable: this.data.enable
    })
  },
  // 联系人邮箱
  fillTourMail: function (e) {
    this.data.contactPeople.email = e.detail.value
    this.setData({
      email: this.data.contactPeople.email
    })
  },
  // 验证码
  fillTourNode: function (e) {
    this.data.contactPeople.node = e.detail.value
    this.setData({
      node: this.data.contactPeople.node
    })
  },

});
