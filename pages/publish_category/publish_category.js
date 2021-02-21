// pages/publish_category/publish_category.js
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
      title: '发布', //导航栏 中间的标题
    },
    publish_info_my:0,
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20 
  },
  publish_purchase:function(event) {
    if(event.detail=='0')
    {
      this.to_otherpage('../upload/upload')
    //this.to_otherpage('../publish_category/publish_category')

    }
    else if(event.detail=='1')
    {
      this.to_otherpage('../my_info/my_info')

    }
    else
    {
      this.to_otherpage('../my/my')

    }
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