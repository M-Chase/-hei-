// pages/my/mychange/mychange.js
var request = require("../../../utils/request.js")
const app=getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		nvabarData:{
			showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
			title: '个人信息', //导航栏 中间的标题
		},
		height: app.globalData.height * 2 + 20,
		userInfo:{},
    address:"",
    introduction:""
	},
	

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that=this;
	// console.log(app.globalData)
    var openid = app.globalData.userInfo.openid
    var data = { 'openId': openid}
    console.log(data)
    request.request('https://www.yunluheishi.cn:443/wx_code/getUserById', 'GET', data).then(function (res) {
		  console.log(res)
		  console.log(res.userInfo)
      that.setData({
        userInfo:res.userInfo
      })
      var address = res.userInfo.goods_address.substring(0,8)+"..."
      var introduction = res.userInfo.introduction.substring(0,8)+"..."
      that.setData({
        address:address,
        introduction:introduction
      })
		  // console.log(that.data.userInfo)
		})

	},
  navtoImg:function(){
    wx.navigateTo({
      url: 'avatar/avatar',
    })
  },
  navtoNickname:function(){
    wx.navigateTo({
      url: 'nickname/nickname',
    })
  },
  navtoSchool:function(){
    wx.navigateTo({
      url: 'school/school',
    })
  },
  navtoInsti:function(){
    wx.navigateTo({
      url: 'institute/institute',
    })
  },
  navtoNumber:function(){
    wx.navigateTo({
      url: 'stu_num/stu_num',
    })
  },
  navtoGender:function(){
    wx.navigateTo({
      url: 'sex/sex?sex=' + this.data.userInfo.sex,
    })
  },
  navtoPhone:function(){
    wx.navigateTo({
      url: 'phone/phone',
    })
  },
  navtoPlace:function(){
    wx.navigateTo({
      url: 'address/address?address='+this.data.userInfo.goods_address,
    })
  },
  navtoInfo:function(){
    wx.navigateTo({
      url: 'summary/summary?introduction='+this.data.userInfo.introduction,
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
    var that = this;
    // console.log(app.globalData)
    var openid = app.globalData.userInfo.openid
    var data = { 'openId': openid }
    console.log(data)
    request.request('https://www.yunluheishi.cn:443/wx_code/getUserById', 'GET', data).then(function (res) {
      console.log(res)
      console.log(res.userInfo)
      that.setData({
        userInfo: res.userInfo
      })
      // console.log(that.data.userInfo)
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