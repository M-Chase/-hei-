// pages/navbarData.js
const app = getApp()
Component({
  properties: {
    navbarData: {   //navbarData   由父页面传递的数据，变量名字自命名
      type: Object,
      value: {},
      observer: function (newVal, oldVal) {}
    }
  },
  data: {
    height: '',
    //默认值  默认显示左上角
    navbarData: {
      showCapsule: 1
    },
    near:app.globalData.near
  },
  attached: function () {
    // 获取是否是通过分享进入的小程序
    this.setData({
      share: app.globalData.share
    })
    // 定义导航栏的高度   方便对齐
    this.setData({
      height: app.globalData.height
    })
    this.setData({
      near: app.globalData.near
    })
    console.log(app.globalData.near)
  },
  ready:function (){
    this.setData({
      near: app.globalData.near
    })
    console.log('ready'+app.globalData.near)
  },
  moved:function (){
    console.log('moved'+app.globalData.near)
  },
  methods: {
  // 返回上一页面
    _navback() {
      wx.navigateBack()
    },
  //返回到首页
    _backhome() {
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }
  }
 
}) 
