// pages/my/mychange/address/address.js
var request = require("../../../../utils/request.js")
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '地址信息', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20,
    address:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      address:options.address
    })
  },
  submit:function(event){
    var address=event.detail.value.address
    var openid = app.globalData.userInfo.openid
    var data = {'goods_address': address}
    request.request('https://www.yunluheishi.cn:443/wx_code/updateUser?openId=' + openid, 'POST', data).then(function(res){
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