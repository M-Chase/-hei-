//app.js
var request = require("./utils/request.js")

App({
  onLaunch: function (options) {
    // 获取客服信息
    this.get_systemInfo()
    // 判断是否由分享进入小程序
     if (options.scene == 1007 || options.scene == 1008) {
      this.globalData.share = true
     } else {
      this.globalData.share = false
     };
  //获取设备顶部窗口的高度（不同设备窗口高度不一样，根据这个来设置自定义导航栏的高度）
  //这个最初我是在组件中获取，但是出现了一个问题，当第一次进入小程序时导航栏会把
  //页面内容盖住一部分,当打开调试重新进入时就没有问题，这个问题弄得我是莫名其妙
  //虽然最后解决了，但是花费了不少时间
  wx.getSystemInfo({
    success: (res) => {
      this.globalData.height = res.statusBarHeight
    }
  })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    var that = this
    //获取发布信息
    // this.get_publishinfo()
    wx.login({
      success: res => {
        //获取openid
        if (res.code) {
          var that = this
          var data = {
            code: res.code,
          } 
          request.request('https://www.yunluheishi.cn:443/wx_Code/getOpenId', 'GET', data = data).then(function (res) {

            request.request('https://www.yunluheishi.cn:443/wx_Code/is_black', 'GET', data = {openid:res}).then(function (black) {
              if (black.length>0)
                that.to_black(black[0])
      

            })
            var openid = res
            console.log('app onLaunch onpenid')
            console.log(openid)
            that.globalData.openid = openid
            wx.setStorage({
              key: "openid",
              data: openid
            })
            that.publish_collectid(openid)
            that.get_userInfo(openid)
          }
          )
        }
      }
    })


    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框


    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        that.globalData.canIUse = true
        // that.globalData.userInfo = res.userInfo
        console.log('app onLaunch userInfo')
        console.log(res.userInfo)


        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      }
    })

    


},
 onShow: function(options){
  // 判断是否由分享进入小程序
  if (options.scene == 1007 || options.scene == 1008) {
    this.globalData.share = true
  } else {
    this.globalData.share = false
  };
  //获取设备顶部窗口的高度（不同设备窗口高度不一样，根据这个来设置自定义导航栏的高度）
  //这个最初我是在组件中获取，但是出现了一个问题，当第一次进入小程序时导航栏会把
  //页面内容盖住一部分,当打开调试重新进入时就没有问题，这个问题弄得我是莫名其妙
  //虽然最后解决了，但是花费了不少时间
  wx.getSystemInfo({
    success: (res) => {
      this.globalData.height = res.statusBarHeight
    }
  })

  this.get_history()
 },
 // 获取历史消息
 get_history:function(){
  var data = {}
  var that = this
  request.request('https://www.yunluheishi.cn/history', 'GET', data).then(function (res) {
    console.log(res)
    that.globalData.history_info = res.data
  }
  )
},
publish_collectid:function(openid)
{
  var that = this
  //获取收藏
  var data = {openid:openid}
  request.request('https://www.yunluheishi.cn:443/wx_Code/collectid','GET',data).then(function(res)
  {
    that.globalData.star_ids = res

  })

},

  get_userInfo: function (openid)
{
  var that = this
  var data = {openid:openid}
    request.request('https://www.yunluheishi.cn:443/wx_Code/get_userInfo', 'GET', data).then(function (res)
    {
      console.log(res)
      var userInfo = res['user_info']
      if(userInfo!=null)
      {
     //   that.globalData.kf_openid = res['kf_openid']
     //   that.globalData.kf_img = res['kf_img']
     //   that.globalData.kf_nick = res['kf_nick']
        userInfo['avatarUrl'] = userInfo['image']
        userInfo['nickName'] = userInfo['nickname']
        delete userInfo['image']
        delete userInfo['nickname']
        that.globalData.userInfo = userInfo

        wx.setStorage({
          key: "userInfo",
          data: userInfo
        })
        /*
        wx.setStorage({
          key: "title_text",
          data: res['title_text']
        })
        */
      }

    })

},

get_systemInfo: function ()
{
  var that = this
  var data = {}
    request.request('https://www.yunluheishi.cn:443/wx_Code/get_systemInfo', 'GET', data).then(function (res)
    {
    //  var userInfo = res['user_info']
    //  if(userInfo!=null)
        console.log(res)
        that.globalData.kf_openid = res['kf_openid']
        that.globalData.kf_img = res['kf_img']
        that.globalData.kf_nick = res['kf_nick']
      //  userInfo['avatarUrl'] = userInfo['image']
      //  userInfo['nickName'] = userInfo['nickname']
      //  delete userInfo['image']
     //   delete userInfo['nickname']
     //   that.globalData.userInfo = userInfo
        /*
        wx.setStorage({
          key: "userInfo",
          data: userInfo
        })
        */
        wx.setStorage({
          key: "title_text",
          data: res['title_text']
        })
        
    })

},

  get_publishinfo: function () {
    //用户登录后，即可获取发布信息
    var that = this
    var data = { 'all_sell_buy': '全部' }
    request.request('https://www.yunluheishi.cn:443/wx_Code/agian', 'POST', data).then(function (res) {
      var publish_info = res['publish']
      wx.setStorage({
        key: "publish_info",
        data: publish_info
      })
      that.globalData.id_pos = res['id_pos']
    })
  },


  to_black:function(black_info)
  {
    var that = this
    wx.showModal({
      title: '您已被拉入黑名单',
      content: "原因是:"+black_info.reason,
      showCancel: true,//是否显示取消按钮
      cancelText: "离开",//默认是“取消”
      cancelColor: 'skyblue',//取消文字的颜色
      confirmText: "联系我们",//默认是“确定”
      confirmColor: 'skyblue',//确定文字的颜色
      success: function (res) {
        if (res.cancel) {
          that.globalData.isblack = true
          wx.reLaunch({
            url: '../index/index',
          })  

        } else {
          var other_info = {}
          other_info['openid'] = that.globalData.kf_openid
          other_info['avatarUrl'] = that.globalData.kf_img
          other_info['nickname'] = that.globalData.kf_nick
          that.globalData.other_info = other_info
          that.globalData.isblack = true
          wx.navigateTo({ url: '../private_chat/private_chat' })


        }
      },
    })
  },
  globalData: {
    userInfo:'',
    openid:'',
    click_goods:{},
    cur_id:0,
    star_ids:[],
    publish_ids:[],
    is_star:-1,
    openids_userinfo:[],
    floor:0,
    floor_id:'',
    product_id:'',
    collect:[],
    publish:[],
    id_pos:[],
    other_info:{},
    data_pos:{},
    mycomment:[],
    mypublish_info:[],
    collect:[],
    kf_openid:"",
    kf_img:"",
    kf_nick:"",
    isblack:false,
    search_info:[],
    product_info:'',
    floor_comment1:[],
    floor_comment:"",
    notices:{},
    share: false,  // 分享默认为false
    height: 0,
    near: true,
    canIUse: false,
    //second: false
    history_info: []
  }
})