// pages/history_detail/history_detail.js
const app = getApp()
var request = require("../../utils/request.js")
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '资讯详情', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20 ,
    history_info:[],
    content: "",
    title: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.setData({ history_info: app.globalData.history_info})
    console.log(this.data.history_info)
    // var pos = app.globalData.history_info.title.indexOf(' ')
    var noDataTitle = app.globalData.history_info.title
    this.setData({
      //调图片大小
      content:  app.globalData.history_info.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto;margin:3px 0;"'),
      title: noDataTitle
    })
    this.setData({
      //调字体颜色
      content:  this.data.content.replace(/\<p/gi, '<p style="color:#666666"')
    })
    this.setData({
      //调字体大小
      content:  this.data.content.replace(/\h2/gi, 'h3')
    })
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