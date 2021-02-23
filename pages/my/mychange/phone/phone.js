// pages/my/mychange/phone/phone.js
const app = getApp()
var request = require("../../../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '手机信息', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 50,
    newPhone:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  changePhone:function(){
    var newPhone = this.data.newPhone
    console.log(newPhone)
    var openid = app.globalData.userInfo.openid
    var data = { 'phone': newPhone }
    request.request('https://www.yunluheishi.cn:443/wx_code/updateUser?openId=' + openid, 'POST', data).then(function (res) {
      console.log(res)
      if (res.message == 1) {
        wx.showToast({
          title: '修改成功',
          success(res) {
            setTimeout(function () {
              wx.navigateBack({
              })
            }, 1000)
          }
        })
      }
    })
  },
  onChange(event) {
    // event.detail 为当前输入的值
    this.setData({
      newPhone: event.detail
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