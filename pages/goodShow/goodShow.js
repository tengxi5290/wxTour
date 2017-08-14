Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: {

    },
    // 轮播图控制数据
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    locate: 'cpjs',

    // 蒙版数据
    chosen: true,
    select: false,
    overflow: false,
    svTop: 300,
    fix: false,
    runTo: 'idName',
    isDayNull: true,//日历蒙版提交按钮是否能点

    // 计数器数据
    count: '1',
    childCount: '0',
    calender: [

    ],
    empty: [],
    counts: '',
    // price: '4578',
    month: '',
    currentMonth: '',
    currentYear: '',
    currentDay: '',
    pos: 'one',
    rili: [],
    selectedDay: {
      sDay: '',
      sPrice: '',
      sId: '',
      sGoodId: '',
      sChildPrice: '',
    },
    price: '',
  },
  // 页面加载事件
  onLoad:function(options) {
    var objectId = options.id
    var price = options.price
    this.setData({
      price: price
    })
    wx.request({
      url: 'https://bugentuan.yoroliving.com/api/v1/goods/' + objectId,
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
      },
      fail: function (res) {
        // console.log(res.data)
      },
      complete: function (res) {
        // console.log(res.data)
      }
    })

    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var n = timestamp * 1000;
    var date = new Date(n);
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ?  (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var w = date.getDay(Y,1,1);
    this.setData({
      month: M
    })
    this.setData({
      currentMonth: M
    })
    this.setData({
      currentYear: Y
    })
    this.setData({
      currentDay: D
    })
    this.fillDays();
    this.calDays();
  },
  // 显示隐藏蒙版切换
  hideShow () {
    this.data.chosen = !this.data.chosen;
    this.data.select = !this.data.select;
    this.data.overflow = !this.data.overflow;
    this.data.fix = !this.data.fix;
    this.setData({
      chosen: this.data.chosen,
      select: this.data.select,
      overflow: this.data.overflow,
      fix: this.data.fix,
    })
  },
  // 商品展示页面点击购买按钮事件
  buy: function (options) {
    this.hideShow();
    // 将日历中的每一天存成数组
    for(var h = 0; h < this.data.calender.length; h++) {
      this.data.rili.push(this.data.calender[h].day)
      this.setData({
        rili: this.data.rili
      })
    }
    this.showPrice();
  },
  // 日期蒙版关闭当前蒙版并清空选中日历事件
  closeMask: function () {
    this.hideShow();
    this.data.selectedDay.sDay = ''
    this.data.selectedDay.sPrice = ''
    this.data.selectedDay.sId = ''
    this.data.selectedDay.sGoodId = ''
    this.data.selectedDay.sChildPrice = ''
    this.setData({
      sDay: this.data.selectedDay.sDay,
      sPrice: this.data.selectedDay.sPrice,
      sId: this.data.selectedDay.sId,
      sGoodId: this.data.selectedDay.sGoodId,
      sChildPrice: this.data.selectedDay.sChildPrice,
    })
    console.log(this.data.selectedDay.sDay)
  },
  // 计数器
  computed (e) {
    var baseCount = this.data.count;
    if(e) {
      baseCount --;
      if(baseCount<=0) {
        baseCount = 1
      }
    }
    else {
      baseCount ++;
    }
    this.data.count = baseCount;
    this.setData({
      count: this.data.count
    })
  },
  bcomputed(e) {
    var baseCount = this.data.childCount;
    if (e) {
      baseCount--;
      if (baseCount < 0) {
        baseCount = 0
      }
    }
    else {
      baseCount++;
    }
    this.data.childCount = baseCount;
    this.setData({
      childCount: this.data.childCount
    })
  },
  countPlus: function () {
    this.computed();
  },
  countDesc: function (e) {
    this.computed(e);
  },
  bcountPlus: function () {
    this.bcomputed();
  },
  bcountDesc: function (e) {
    this.bcomputed(e);
  },
  // 点击下一步按钮事件
  fillMsg: function() {
    this.getStorage()
    if(this.data.globalToken == '' || this.data.globalToken == null) {
      wx.navigateTo({
        url: '../login/login'
      })
    }
    else {
      wx.navigateTo({
        url: '../fillMsg/fillMsg?names=' + this.data.dataList.name + '&count=' + this.data.count + '&childCount=' + this.data.childCount + '&format=' + this.data.dataList.format + '&start_address=' + this.data.dataList.start_address + '&price=' + this.data.selectedDay.sPrice + '&id=' + this.data.selectedDay.sId + '&goodid=' + this.data.selectedDay.sGoodId + '&childprice=' + this.data.selectedDay.sChildPrice + '&days=' + this.data.selectedDay.sDay + '&year=' + this.data.currentYear + '&month=' + this.data.currentMonth
      })
    }
  },
  // 导航条滚过以后固定在屏幕顶部
  mainScroll: function (event) {
    var sTop = event.detail.scrollTop;
    var ifFix = this.data.fix;
    if(sTop >= 430) {
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
  // 点击行程介绍按钮触发事件
  toTrip: function () {
    this.data.locate = 'xcjs'
    var theId = this.data.runTo;
    theId = 'xingchengjieshao';
    this.setData({
      runTo: theId,
      locate: this.data.locate
    })
  },
  // 点击费用说明按钮触发事件
  toFee: function () {
    this.data.locate = 'fysm'
    var theId = this.data.runTo;
    theId = 'feiyongshuoming';
    this.setData({
      runTo: theId,
      locate: this.data.locate
    })
  },
  // 点击产品介绍按钮触发事件
  toGoods: function () {
    this.data.locate = 'cpjs'
    var theId = this.data.runTo;
    theId = 'chanpinjieshao';
    this.setData({
      runTo: theId,
      locate: this.data.locate
    })
  },
  // 第一个位置月份点击事件
  one: function () {
    this.data.calender.splice(0,this.data.calender.length);
    this.setData({
      month: this.data.currentMonth,
      pos: 'one'
    })
    this.fillDays();
    this.calDays();
    this.showPrice();
  },
  // 第二个位置月份点击事件
  two: function () {
    this.data.calender.splice(0,this.data.calender.length);
    this.setData({
      month: this.data.currentMonth + 1,
      pos: 'two'
    })
    this.fillDays();
    this.calDays();
    this.showPrice();
  },
  // 第三个位置月份点击事件
  three: function () {
    this.data.calender.splice(0,this.data.calender.length);
    this.setData({
      month: this.data.currentMonth + 2,
      pos: 'three'
    })
    this.fillDays();
    this.calDays();
    this.showPrice();
  },
  // 第四个位置月份点击事件
  four: function () {
    this.data.calender.splice(0,this.data.calender.length);
    this.setData({
      month: this.data.currentMonth + 3,
      pos: 'four'
    })
    this.fillDays();
    this.calDays();
    this.showPrice();
  },
  fillDays () {
     //本月天数
    var  day = new Date(this.data.currentYear,this.data.month,0);
    var daycount = day.getDate();
    for(var d = 1; d <= daycount; d++ ) {
      var obj = {
        day: d,
        price: '',
        eachBlock: false,
        //new add
        id: '',
        good_id: '',
        child_price: '',
      }
      this.data.calender.push(obj)
      for( var cal = 0; cal < this.data.calender.length; cal++ ) {
        if(this.data.currentDay == this.data.calender[cal].day) {
          this.data.calender[cal].eachBlock = true
        }
      }
      this.setData({
        calender: this.data.calender
      })
    }
  },
  calDays () {
    // 获取当月第一天是周几
    var date = new Date(this.data.currentYear,this.data.month,0);
    date.setDate(1);
    var weekday=new Array(7);
    weekday[0]="星期日" ;
    weekday[1]="星期一";
    weekday[2]="星期二";
    weekday[3]="星期三";
    weekday[4]="星期四";
    weekday[5]="星期五";
    weekday[6]="星期六";
    // 计算空白填充数目
    if(weekday[date.getDay()] == '星期日') {
      this.setData({
        counts: 0
      })
    }
    else {
      var week = date.getDay();
      this.setData({
        counts: week
      })
    }
    // 填充空白数据
    for(var m = 0; m <= this.data.counts; m++ ) {
      this.setData({
        empty: m
      })
    }
  },
  // 日历某一天选中效果
  highlight: function (e) {
    var index = parseInt(e.currentTarget.dataset.index)
    for(var e = 0;e<this.data.calender.length; e++){
      this.data.calender[e].eachBlock = false
    }
    this.data.calender[index].eachBlock = true
    if( this.data.calender[index].price == '') {
      this.data.isDayNull = true
    }
    else {
      this.data.selectedDay.sDay = this.data.calender[index].day
      this.data.selectedDay.sPrice = this.data.calender[index].price
      this.data.selectedDay.sId = this.data.calender[index].id
      this.data.selectedDay.sGoodId = this.data.calender[index].good_id
      this.data.selectedDay.sChildPrice = this.data.calender[index].child_price
      this.data.isDayNull = false
    }
    this.setData({
      selectedDay: this.data.selectedDay,
      isDayNull: this.data.isDayNull,
      calender: this.data.calender
    })
  },
  // 有价格的时候才将日期对应的价格显示在日历上
  showPrice () {
    var nian = ''
    var yue = ''
    var ri = ''
    var jiage = ''
    var erTongJiaGe = ''
    var aidi = ''
    var shangPinAiDi = ''
    for(var t = 0; t < this.data.dataList.good_prices.length; t++ ) {
      nian = this.data.dataList.good_prices[t].date.slice(0,4)
      yue = this.data.dataList.good_prices[t].date.slice(5,7)
      ri = this.data.dataList.good_prices[t].date.slice(8,11)
      jiage = this.data.dataList.good_prices[t].price
      erTongJiaGe = this.data.dataList.good_prices[t].child_price
      aidi = this.data.dataList.good_prices[t].id
      shangPinAiDi = this.data.dataList.good_prices[t].good_id
      var hasOrNot = this.data.rili.indexOf(parseInt(ri));
      if( hasOrNot > -1 && this.data.currentYear == nian && this.data.month == yue ) {
        this.data.calender[hasOrNot].price = jiage
        this.data.calender[hasOrNot].child_price = erTongJiaGe
        this.data.calender[hasOrNot].id = aidi
        this.data.calender[hasOrNot].good_id = shangPinAiDi
      }
      else {
        this.data.calender[hasOrNot].price = ''
        this.data.calender[hasOrNot].child_price = ''
        this.data.calender[hasOrNot].id = ''
        this.data.calender[hasOrNot].good_id = ''
      }
    }
    this.setData({
      calender: this.data.calender
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
