// pages/Details/Details.js
const app = getApp();
var request = require("../../utils/request.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
     // title: app.globalData.history_info[0].month_day, //导航栏 中间的标题
      title: 'XX年月日'
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20 ,
    index: 0,
    currentIndex: 0,  //当前所在页面的 index
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔
    duration: 800, //滑动动画时长
    circular: true, //是否采用衔接滑动
    imgUrls: [
      '../image/history.jpg',
      '../image/myheishi.jpg',
      '../image/keyboard.png'
    ],
    links: [
      '/pages/second/register',
      '/pages/second/register',
      '/pages/second/register'
    ],
    summary: '',
    history_info: [],
    lunbo_info: []
  },
  /*
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
   
      success: function (res) {
        console.log(res);
        wx.showToast({
          title: '提交成功',
          duration: 2000
        }),
     
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
    
   
   
  },*/
  
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
    /*
    app.globalData.history_info = this.data.history_info
   this.setData({
    history_info : app.globalData.history_info
  })*/
  app.globalData.near = false
    var data = {}
    var that = this
    request.request('https://www.yunluheishi.cn/history', 'GET', data).then(function (res) {
      console.log(res.data.slice(0,5))
      that.setData({
        history_info : res.data
      })
      var count = 0
      var data = res.data
      var lunbo = []
        for(var i=data.length-1;i>=0,count<5;i--){
          if(data[i].pic){
            lunbo.push(data[i])
            console.log(lunbo)
            count++
          }
        }
      that.setData({
        lunbo_info: lunbo
      })
      that.setData({
        summary: that.data.lunbo_info[0].title
      })
    app.globalData.history_info = res.data
    that.setData({
      nvabarData:{
        showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
        title: res.data[0].month+'月'+res.data[0].day+'日'
      }
    })
    })
   // console.log(this.data.lunbo_info)
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
  },

  //轮播图的切换事件
  swiperChange: function(e) {
    this.setData({
      currentIndex: e.detail.current
    })

  },

  //点击指示点切换
  chuangEvent: function(e) {
    console.log(e)
    this.setData({
      currentIndex: e.currentTarget.id
    })
  },

  //点击图片触发事件
  swipclick: function(e) {
    var cur_id =this.data.currentIndex;
    var history_info = this.data.lunbo_info[parseInt(cur_id)];
    app.globalData.history_info = history_info
    wx.navigateTo({
      url: '../history_detail/history_detail'
    })
  },

  /* 这里实现控制中间凸显图片的样式 */
handleChange: function (e) {
  let curnow = e.detail.current
  if(curnow==0){
    this.setData({
      summary: this.data.lunbo_info[0].title,
      currentIndex: e.detail.current
    })
  }else if(curnow==1){
    this.setData({
      summary: this.data.lunbo_info[1].title,
      currentIndex: e.detail.current
    })
  }else if(curnow==2){
    this.setData({
      summary: this.data.lunbo_info[2].title,
      currentIndex: e.detail.current
    })
  }else if(curnow==3){
    this.setData({
      summary: this.data.lunbo_info[3].title,
      currentIndex: e.detail.current
    })
  }else{
    this.setData({
      summary: this.data.lunbo_info[4].title,
      currentIndex: e.detail.current
    })
  }
  /*
  this.setData({
  currentIndex: e.detail.current
  })
  */
},

// 点击查看详情
detail_info: function(e){
  var cur_id = e.currentTarget.id;
  console.log(cur_id,typeof(cur_id))
  var history_info = app.globalData.history_info[parseInt(cur_id)];
  app.globalData.history_info = history_info
  wx.setStorage({
    key: "history_info",
    data: history_info
  })
  wx.navigateTo({
    url: '../history_detail/history_detail'
  })
}

})