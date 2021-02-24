// pages/my/mychange/avatar/avatar.js
const app = getApp()
var request = require("../../../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '头像信息', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20,
    newAvatar:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
  },
  changAvatar:function(){
    var that=this;
    wx.chooseImage({
      count:1,
      success: function(res) {
        console.log(res)
        that.setData({
          newAvatar: res.tempFilePaths[0]
        })
        that.uploadImg(res.tempFilePaths[0])
      },
    })
  },
  uploadImg:function(avatarUrl){
    var openid = app.globalData.userInfo.openid
    var data = { "openId": openid, "MultiparFile": avatarUrl}
    console.log(avatarUrl)
    wx.uploadFile({
      url: 'https://www.yunluheishi.cn:443/wx_code/changeImg',
      header: {
        "Content-Type": "application/json"
      },
      filePath: avatarUrl,
      name: app.globalData.userInfo.nickName,
      formData: { "openId": openid},
      success(res){
        console.log(res)
      },
      fail(res){
        console.log(res)
      }
      
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