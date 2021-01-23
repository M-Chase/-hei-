// pages/other_info/other_info.js
const app = getApp();
var request = require("../../utils/request.js")
var util = require("../../utils/util.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    other_publish_info: [],//该用户发布的信息
    other_info: {},
    rank:3,
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '', //导航栏 中间的标题
    },
 
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20 
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var other_info = app.globalData.other_info
    this.setData({other_info:other_info})
    this.publish(other_info.openid)
    this.setData({
      nvabarData: {
        showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
        title: other_info.nickname //导航栏 中间的标题
      }
    })



  },
  publish: function (openid) {
    var that = this
    var data = { openid: openid }
    request.request('https://www.yunluheishi.cn:443/wx_Code/mypublish', 'GET', data).then(function (res) {
      console.log(res)
      var other_publish_info = res
      for (var i = 0; i < other_publish_info.length; i++) {
        other_publish_info[i].time = util.formatDate(other_publish_info[i].timestamp)
        if (other_publish_info[i].price==-1){
          other_publish_info[i].price = '可商议'
        }
        other_publish_info[i].imgUrl1 =other_publish_info[i].imgUrl.split(",")
      }
      that.setData({ other_publish_info: other_publish_info })
    })


  },

  detail_info:function(e)
  {
    var cur_id = e.currentTarget.id
    var product_info = this.data.other_publish_info[cur_id];

    app.globalData.product_info = product_info
    wx.navigateTo({url:'../details/details'})

  },

  /*跳转到私信页面 */
  gotoprivatechat: function (event) {
    wx.navigateTo({
      url: '../private_chat/private_chat'
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
    app.globalData.near = false
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    app.globalData.near = true
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    app.globalData.near = true
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})