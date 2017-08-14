// pages/addTraveller/addTraveller.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      items: [
          { name: 'male', value: '男', checked: 'true' },
          { name: 'female', value: '女'},
      ],
      id: 0, //编辑时 出行人的 id
      date: '请选择有效期',
      dates: '请选择出生日期',
      index: 0,
      array: ['身份证', '护照', '其他'],
      fullName: '',
      lastName: '',
      firstName: '',
      cardno: '',
      addnew: '',
  },
  // 页面加载的时候根据联系人列表传的值为编辑联系人列表赋值
  onLoad:function(options) {
    console.log(options)
    if(options.addnew == 'true') {
      console.log('addnew')
      this.data.addnew = 'true'
      this.setData({
        addnew: this.data.addnew
      })
    }
    else {
      this.setData({
        id: options.id,
        fullName: options.name,
        firstName: options.fname,
        lastName: options.lname,
        cardno: options.cardNo,
        date: options.date,
        dates: options.dates,
        key: options.key,
      })
      if( options.cardType == 'passport') {
        this.data.index = 1
      }
      else if(options.cardType == 'idcard') {
        this.data.index = 0
      }
      else {
        this.data.index = 2
      }
      if( options.sex == 'girl' ) {
        this.data.items[1].checked = true
        this.data.items[0].checked = false
      }
      else {
        this.data.item[0].checked = true
        this.data.items[1].checked = false
      }
      this.setData({
        index: this.data.index,
        items: this.data.items
      })
    }
  },
  // 立即保存按钮点击事件
  save: function () {
    console.log(this.data.addnew)
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]
    var index = this.data.index
    var newObj = {
      name: '',
      first_name: '',
      last_name: '',
      card_type: '',
      card_number: '',
      valid_date: '',
      gender: '',
      birth: '',
    }
    if(this.data.addnew == 'true') {
      wx.request({
        url: 'https://bugentuan.yoroliving.com/api/v1/travelers',
        method: 'POST',
        data: {
          name: this.data.fullName,
          first_name: this.data.firstName,
          last_name: this.data.lastName,
          card_type: this.data.array[index] == '身份证' ? 'idcard' : 'passport',
          card_number: this.data.cardno,
          valid_date: this.data.date,
          gender: this.data.items.value,
          birth: this.data.dates
        },
        header: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + getApp().getToken()
        },
        success: (res) => {
          console.log(res.data)
          prevPage.data.staffArray[prevPage.data.staffArray.length-1].id = res.data.data.id
          prevPage.data.staffArray = prevPage.data.dataList
          prevPage.data.staffArray.push(newObj)
          prevPage.data.staffArray[prevPage.data.staffArray.length-1].name = this.data.fullName
          prevPage.data.staffArray[prevPage.data.staffArray.length-1].first_name = this.data.firstName
          prevPage.data.staffArray[prevPage.data.staffArray.length-1].last_name = this.data.lastName
          prevPage.data.staffArray[prevPage.data.staffArray.length-1].card_type = this.data.array[index]
          prevPage.data.staffArray[prevPage.data.staffArray.length-1].card_number = this.data.cardno
          prevPage.data.staffArray[prevPage.data.staffArray.length-1].valid_date = this.data.date
          prevPage.data.staffArray[prevPage.data.staffArray.length-1].gender = this.data.items.value
          prevPage.data.staffArray[prevPage.data.staffArray.length-1].birth = this.data.dates
        },
      })

    }else {
      prevPage.data.staffArray = prevPage.data.dataList
      prevPage.data.staffArray[this.data.key].card_number = this.data.cardno
      prevPage.data.staffArray[this.data.key].birth = this.data.dates
      prevPage.data.staffArray[this.data.key].valid_date = this.data.date
      prevPage.data.staffArray[this.data.key].card_type = this.data.array[index]
      prevPage.data.staffArray[this.data.key].first_name = this.data.firstName
      prevPage.data.staffArray[this.data.key].last_name = this.data.lastName
      prevPage.data.staffArray[this.data.key].gender = this.data.items.value

      wx.request({
        url: 'https://bugentuan.yoroliving.com/api/v1/travelers/' + this.data.id,
        method: 'PUT',
        data: {
          name: this.data.fullName,
          first_name: this.data.firstName,
          last_name: this.data.lastName,
          card_type: this.data.array[index] == '身份证' ? 'idcard' : 'passport',
          card_number: this.data.cardno,
          valid_date: this.data.date,
          gender: this.data.items.value,
          birth: this.data.dates
        },
        header: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + getApp().getToken()
        },
        success: (res) => {
          console.log(res.data)
        },
      })

    }
    prevPage.setData({
      dataList: prevPage.data.staffArray
    })
    wx.navigateBack({
      delta: 1
    })
  },
  bindPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
          index: e.detail.value
      })
  },
  bindDateChange: function (e) {
      this.setData({
          date: e.detail.value
      })
  },
  bindDateChanges: function (e) {
      this.setData({
          dates: e.detail.value
      })
  },
  bindTimeChange: function (e) {
      this.setData({
          time: e.detail.value
      })
  },
  radioChange: function (e) {
    console.log(e.detail.value)
  },
  fullNameChange: function (e) {
    this.data.fullName = e.detail.value
    this.setData({
      fullName: this.data.fullName
    })
  },
  lastChange: function (e) {
    this.data.lastName = e.detail.value
    this.setData({
      lastName: this.data.lastName
    })
  },
  firstChange: function (e) {
    this.data.firstName = e.detail.value
    this.setData({
      firstName: this.data.firstName
    })
  },
  cardChange: function (e) {
    this.data.cardno = e.detail.value
    this.setData({
      cardno: this.data.cardno
    })
  }
})
