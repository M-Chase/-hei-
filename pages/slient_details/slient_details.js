// pages/Details/Details.js
const app = getApp();
var request = require("../../utils/request.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    product_info: {},//用户发布的信息
    actionSheetHidden: true,
    buysum: 0,
    address: '',
    deliverytime: '',
    mem_name:2,
    nickName: '',
    active: 0,
    form_info: ''
  },
  buysum: function (e) {   //获取input输入的值
    var that = this;
    that.setData({
      buysum: e.detail.value
    })
  },
  address: function (e) {    //获取input输入的值
    var that = this;
    that.setData({
      address: e.detail.value
    })
  },
  deliverytime: function (e) {    //获取input输入的值
    var that = this;
    that.setData({
      deliverytime: e.detail.value
    }) 
  },

//寻求帮助函数
/*
get_help:function(){

  var other_info = {}
  other_info['openid'] =app.globalData.kf_openid
  other_info['avatarUrl'] = app.globalData.kf_img
  other_info['nickname'] = app.globalData.kf_nick
  app.globalData.other_info = other_info
  wx.navigateTo({ url: '../private_chat/private_chat'})
},
*/
  formSubmit: function (e) {
    var that = this;
    console.log(e)
    var buysum = e.detail.value.buysum;         //获取input初始值
   // console.log(buysum)
    var address = e.detail.value.address;    //获取input初始值
    var deliverytime = e.detail.value.deliverytime;    //获取input初始值
    var data = {
      openid: app.globalData.openid,
      buysum: buysum,
      address: address,
      deliverytime: deliverytime
  }
    var formdata = data;
   // console.log(formdata);
  //  var data = JSON.stringify(data1)
  if(buysum&&address&&deliverytime){
    wx.request({
      method: 'POST',
      url: 'https://www.yunluheishi.cn:443/wx_Code/addFestival', //接口地址
      data ,
      header: { "content-Type": "application/x-www-form-urlencoded"},
     /* header: { 'content-type': 'application/json' },*/
      success: function (res) {
        console.log(res);
        wx.showToast({
          title: '提交成功',
          duration: 2000
        }),
        /*
        wx.setStorage({
          key: 'formdata',
          data: formdata
        }),*/
        wx.setStorageSync('formdata', formdata);
       
      },
      fail: function (res) {
        console.log('cuowu' + ':' + res)
      }
    })
    this.get_help();
  }else{
    wx.showToast({
      title: '请填写完整信息',
      duration: 2000
    })
  }
    
   
   
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
   console.log(app.globalData.userInfo)
    this.setData({
      my_img: app.globalData.userInfo.avatarUrl,
      nickName: app.globalData.userInfo.nickName
    })
    wx.setNavigationBarTitle({
      title: "云麓hei市",
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var data = {
      openid: app.globalData.openid
    }
    var that = this
    request.request('https://www.yunluheishi.cn:443/wx_Code/num_publishcommentcollect', 'GET', data).then(function (res) {
      console.log("bbbbbbbbbbbbbbbbbbb")
      console.log(res)
      that.setData({ 
        nums_colpubcom: res
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  onShareAppMessage: function () {
    return {
      title: '云麓hei市',
      desc: '云麓hei市',
      imageUrl: '/pages/image/slient_night2.jpg',
      path: "/pages/index/index" // 路径，传递参数到指定页面。
      
    }
  }

})