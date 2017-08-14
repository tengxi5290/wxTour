// pages/selectTraveller/selectTraveller.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      x: 0,
      y: 0,
      xx: 130,
      whole: '',
      dataList: [],
      staffArray: [],//占位数组，编辑联系人时候用
      peopleCheck: [],//选中的联系人
  },
  onLoad:function(options) {
    this.setData({
      num: options.num,
      have: options.have,
      year: options.year
    })
    console.log(this.data.num)
    wx.request({
      url: 'https://bugentuan.yoroliving.com/api/v1/travelers',
      header: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + getApp().getToken()
      },
      success: (res) => {
        console.log(res.data)
        this.setData({
          dataList: res.data.data,
        })
        for(var k = 0; k<this.data.dataList.length; k++){
          this.data.dataList[k].bingo = false
        }
        this.setData({
          dataList: this.data.dataList
        })
        this.isFullfill();
      },
      fail: function (res) {
        // console.log(res.data)
      },
      complete: function (res) {
        // console.log(res.data)
      }
    })
  },
  // 新增出行人按钮点击事件
  addNewTraveller: function () {
      // console.log('add new travellers')
      wx.navigateTo({
        url: '../addTraveller/addTraveller?addnew=true'
      });
  },
  // 删除按钮点击事件
  deleteTraveller: function (event) {
      var index = parseInt(event.currentTarget.dataset.index);
      var travelerId = this.data.dataList[index].id;
      this.data.dataList.splice(index,1);
      this.setData(
        { dataList: this.data.dataList}
      )
      wx.request({
        url: 'https://bugentuan.yoroliving.com/api/v1/travelers/' + travelerId,
        method: 'DELETE',
        header: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + getApp().getToken()
        }
      })


  },
  // 编辑按钮点击事件
  editTraveller: function (event) {
    var index = parseInt(event.currentTarget.dataset.index);
    var info = this.data.dataList[index];
    console.log(info)
    var url = '../addTraveller/addTraveller?name=' + info.name +
    '&fname=' + info.first_name + '&lname=' + info.last_name +
    '&sex=' + info.gender + '&cardType=' + info.card_type +
    '&cardNo=' + info.card_number + '&key=' + index +
    '&id=' + info.id + '&date=' + info.valid_date + '&dates=' + info.birth;
    console.log(url)
    wx.navigateTo({
      url: url
    });
  },
  onReachBottom: function () {
    console.log('ok')
  },
  checking: function (e) {
    var index = parseInt(e.currentTarget.dataset.index)
    var peopleId = this.data.dataList[index].id

    console.log(this.data.dataList[index].bingo)
    if(this.data.dataList[index].bingo == true) {
      this.data.dataList[index].bingo = false
      for(var i = 0; i < this.data.peopleCheck.length; i++){
        if(this.data.peopleCheck[i].id == peopleId){
          this.data.peopleCheck.splice(i,1)
          break
        }
      }

    }
    else {
      if(this.data.peopleCheck.length< this.data.num) {
        var pObj = {
          id: this.data.dataList[index].id,
          name: this.data.dataList[index].name,
          first_name: this.data.dataList[index].first_name,
          last_name: this.data.dataList[index].last_name,
          gender: this.data.dataList[index].gender,
          birth: this.data.dataList[index].birth,
          card_number: this.data.dataList[index].card_number,
          card_type: this.data.dataList[index].card_type,
          valid_date: this.data.dataList[index].valid_date,
          bingo: this.data.dataList[index].bingo
        }
          this.data.peopleCheck.push(pObj)
          this.data.dataList[index].bingo = true
      }else {
        this.data.dataList[index].bingo = false
      }
    }
    this.setData({
      dataList: this.data.dataList,
      peopleCheck: this.data.peopleCheck
    })
  },
  // 补充信息按钮点击事件
  fullfillMsg: function () {
    wx.navigateTo({
      url: '../addTraveller/addTraveller'
    });
  },
  // 判断信息是否填充完全
  isFullfill () {
    var dataGroups = this.data.dataList;
    var isFull = this.data.whole;
    for(var i = 0; i < dataGroups.length; i++ ) {
      if( dataGroups[i].name == '' || dataGroups[i].gender == '' || dataGroups[i].card_type == '' || dataGroups[i].card_number == '' ) {
        isFull = false;
      }
      else {
        isFull = true;
      }
    }
    this.setData({
      whole: isFull,
    })
    console.log(this.data.whole)
  },
  // 选择联系人的确定按钮
  selected: function () {
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]
    for(var t=0;t<prevPage.data.inputsGroup.length;t++){
      var birthYear = this.data.dataList[t].birth.slice(0,4)
      if(this.data.year - birthYear >= 18) {
        prevPage.data.inputsGroup[t].num = this.data.peopleCheck[t].name
      }
      else {
        prevPage.data.inputsGroups[t].num = this.data.peopleCheck[t].name
      }
    }
    prevPage.setData({
      tourist: this.data.peopleCheck,
      inputsGroup: prevPage.data.inputsGroup,
      inputsGroups: prevPage.data.inputsGroups
    })
    wx.navigateBack({
      delta: 1
    })
  }
})
