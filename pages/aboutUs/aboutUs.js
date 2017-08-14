// pages/aboutUs/aboutUs.js
// var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  	calender: [
  		
  	],
  	empty: [],
  	count: '',
  	// price: '4578',
  	month: '',
  	currentMonth: '',
  	currentYear: '',
  },
  onLoad: function () {
  	var timestamp = Date.parse(new Date());  
    timestamp = timestamp / 1000;  
    // console.log("当前时间戳为：" + timestamp); 
    var n = timestamp * 1000;  
    var date = new Date(n);  
    //年  
    var Y = date.getFullYear();  
    //月  
    var M = (date.getMonth() + 1 < 10 ?  (date.getMonth() + 1) : date.getMonth() + 1);  
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();  
    //时  
    var h = date.getHours();  
    //分  
    var m = date.getMinutes();  
    //秒  
    var s = date.getSeconds();  
    //周
    var w = date.getDay(Y,1,1);
    // console.log(w)

    this.setData({
    	month: M
    })

    this.setData({
    	currentMonth: M
    })

    this.setData({
    	currentYear: Y
    })

    this.fillDays();
   
    this.calDays();
    
  },
  one: function () {
  	this.data.calender.splice(0,this.data.calender.length);
  	this.setData({
  		month: this.data.currentMonth
  	})
  	console.log(this.data.month)
  	console.log('==================')
  	this.fillDays();
   
    this.calDays();
  },
  two: function () {
  	this.data.calender.splice(0,this.data.calender.length);
  	this.setData({
  		month: this.data.currentMonth + 1
  	})
  	console.log(this.data.month)
  	console.log('==================')
  	this.fillDays();
   
    this.calDays();
  },
  three: function () {
  	this.data.calender.splice(0,this.data.calender.length);
  	this.setData({
  		month: this.data.currentMonth + 2
  	})
  	console.log(this.data.month)
  	console.log('==================')
  	this.fillDays();
   
    this.calDays();
  },
  four: function () {
  	this.data.calender.splice(0,this.data.calender.length);
  	this.setData({
  		month: this.data.currentMonth + 3
  	})
  	console.log(this.data.month)
  	console.log('==================')
  	this.fillDays();
   
    this.calDays();
  },
  fillDays () {
  	 //本月天数
    var  day = new Date(this.data.currentYear,this.data.month,0); 
    var daycount = day.getDate();    
    for(var d = 1; d <= daycount; d++ ) {
    	var obj = {
	    	day: d,
	    	price: '2350', 
	    	eachBlock: false,
	    }
    	this.data.calender.push(obj)
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
    		count: 0
    	})
    	console.log('right')
    }
    else {
    	var week = date.getDay();
    	this.setData({
    		count: week
    	})
    	console.log('wrong')
    }
    // 填充空白数据
    for(var m = 0; m <= this.data.count; m++ ) {
    	this.setData({
    		empty: m
    	})
    }
  },
  highlight: function (e) {
  	var index = parseInt(e.currentTarget.dataset.index);
  	this.data.calender[index].eachBlock = !this.data.calender[index].eachBlock
  	this.setData({
  		eachBlock: this.data.calender[index].eachBlock
  	})
  }
})